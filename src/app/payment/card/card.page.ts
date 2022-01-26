import { Component, OnInit } from '@angular/core';
import {PaymentService} from '../../service/payment.service';
import {FormBuilder, Validators} from '@angular/forms';
import {StorePage} from '../../store/store.page';
import {StripeCheckoutPaymentRequest} from "../../models/request/stripeCheckoutPaymentRequest";
import {AlertController, LoadingController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {
  private loading;
  amount: number;
  paymentHandler: any = null;
  request: StripeCheckoutPaymentRequest = new StripeCheckoutPaymentRequest();

  constructor(private paymentService: PaymentService,
              private formBuilder: FormBuilder,
              private alert: AlertController,
              private route: Router,
              private loadingCtrl: LoadingController) { }
  paymentForm =  this.formBuilder.group({
    price: ['',[Validators.required,Validators.nullValidator]],
    description: ['', [Validators.required,Validators.nullValidator]]
  });

  ngOnInit() {
    this.amount = StorePage.instance.getTotalCartPrice();
    this.initStrip();
  }

  private initStrip() {
    if(!window.document.getElementById('stripe-script')) {
      const s = window.document.createElement('script');
      s.id = 'stripe-script';
      s.type = 'text/javascript';
      s.src = 'https://checkout.stripe.com/checkout.js';
      window.document.body.appendChild(s);
    }
  }

  private paymentWithCreditCard() {
    const handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51KGA3WAw2GzsVNVa7mrklLtU03XkssV2c3kKtwwaXUqzsuFDC6LnAIuTYZwD8kfG9A6Dm7dDBOAiGH78gLI5xM7O00fq5CtnT6',
      locale: 'auto',
      token: function(token: any) {
        console.log(token);
        checkoutPayment(token);
      }
    });
    const checkoutPayment=(token: any)=>{
      this.loadingCtrl.create({
        message: 'Please Wait...'
      }).then((overlay)=>{
        this.loading = overlay;
        this.loading.present();
      });
      console.log('request for checkout');
      this.request.description = this.paymentForm.value.description;
      this.request.amount = this.amount;
      this.request.stripeToken = token.id;
      this.request.stripeEmail = token.email;
      this.paymentService.checkoutPayment(this.request)
        .subscribe((response: any) => {
          if (response.status==='succeeded'){
            console.log('Payment successfully implemented!');
            this.loading.dismiss();
            this.showSuccessAlert(response);
          }
        });
    };
    handler.open({
      name: 'Amazon',
      description: this.paymentForm.value.description,
      amount: this.amount * 100
    });
  }

  async showSuccessAlert(data: any){
    const alerts = await this.alert.create({
      header: 'Card Payment',
      message: 'Payment successfully completed. Details of the transaction: \nAmount: '+data.amount+'\nPayment ID: '+data.paymentID,
      buttons: [
        {
          text: 'Okay',
          handler: ()=>{
            location.replace('http://localhost:4200/store');
          }
        }
      ]
    });
    await alerts.present();
  }
}
