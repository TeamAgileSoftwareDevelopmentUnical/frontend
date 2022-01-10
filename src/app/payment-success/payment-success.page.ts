import {Component, OnDestroy, OnInit} from '@angular/core';
import {PaymentService} from '../service/payment.service';
import {PayPalConfirmPaymentRequest} from '../models/request/payPalConfirmPaymentRequest';
import {PayPalConfirmPaymentResponse} from '../models/response/payPalConfirmPaymentResponse';
import { StorePage } from '../store/store.page';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.page.html',
  styleUrls: ['./payment-success.page.scss'],
})
export class PaymentSuccessPage implements OnInit {

  request: PayPalConfirmPaymentRequest = new PayPalConfirmPaymentRequest();
  counter = 10;
  amountPaid = 0;
  payment_id: string = null;
  mode = false;

  constructor(private paymentService: PaymentService) { }

  ngOnInit() {
    if (document.URL.indexOf('?')){
      const splitUrl = document.URL.split('?');
      const splitParams = splitUrl[1].split('&');
      let i: any;
      for (i in splitParams){
        const singleURLParam = splitParams[i].split('=');
        if (singleURLParam[0]==='paymentId'){
          this.request.paymentId = singleURLParam[1].trim();
        }
        if (singleURLParam[0]==='PayerID'){
          this.request.payerId = singleURLParam[1].trim();
        }
      }
    }

    // call to successPayment service
    this.paymentService.confirmPayment(this.request)
      .subscribe((response: PayPalConfirmPaymentResponse)=>{
        console.log(response.status);
        if (response.status==='approved'){
          this.mode = true;
          this.payment_id = response.paymentID;
          this.amountPaid = response.amount;
          setInterval(()=>{
            --this.counter;
            if (this.counter===0){
              console.log(response);
              // redirect to store page and resetting the cart
              StorePage.instance.resetCart();
              location.replace('http://localhost:4200/store');
              //window.close();
            }
          },1000);
        }
    });
  }
}
