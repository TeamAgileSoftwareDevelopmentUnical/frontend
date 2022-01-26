import { Component, OnInit } from '@angular/core';
import {PaymentService} from '../../service/payment.service';
import {FormBuilder, Validators} from '@angular/forms';
import {PaypalPaymentRequest} from '../../models/request/paypalPaymentRequest';
import {PayPalPaymentResponse} from '../../models/response/PayPalPaymentResponse';
import {StorePage} from '../../store/store.page';
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.page.html',
  styleUrls: ['./paypal.page.scss'],
})
export class PaypalPage implements OnInit {

  private loading;
  request: PaypalPaymentRequest;
  amount: number;
  description: string;

  paymentForm =  this.formBuilder.group({
    price: ['',[Validators.required,Validators.nullValidator]],
    description: ['',[Validators.required,Validators.nullValidator]]
  });

  constructor(private paymentService: PaymentService,
              private formBuilder: FormBuilder,
              private loadingCtrl: LoadingController
              ) { }

  ngOnInit() {
    this.amount = StorePage.instance.getTotalCartPrice();
  }

  paymentWithPayPal() {
    this.loadingCtrl.create({
      message: 'Please Wait...'
    }).then((overlay)=>{
      this.loading = overlay;
      this.loading.present();
    });
    this.request = this.paymentForm.value;
    this.request.intent = 'Sale';
    this.request.currency = 'EUR';
    this.request.method = 'paypal';
    this.request.cancelURL = 'http://localhost:4200/payment-cancel';
    this.request.successURL = 'http://localhost:4200/payment-success';
    this.paymentService.payWithPayPal(this.request)
      .subscribe((response: PayPalPaymentResponse)=>{
        if (response.status){
          this.loading.dismiss();
          console.log(response.url);
          location.replace(response.url);
        }
      });
  }
}
