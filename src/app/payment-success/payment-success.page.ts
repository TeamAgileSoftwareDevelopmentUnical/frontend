import { Component, OnInit } from '@angular/core';
import {PaymentService} from "../service/payment.service";
import {PayPalConfirmPaymentRequest} from "../models/request/payPalConfirmPaymentRequest";
import {PayPalConfirmPaymentResponse} from "../models/response/payPalConfirmPaymentResponse";

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.page.html',
  styleUrls: ['./payment-success.page.scss'],
})
export class PaymentSuccessPage implements OnInit {

  constructor(private paymentService: PaymentService) { }

  request: PayPalConfirmPaymentRequest = new PayPalConfirmPaymentRequest();

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
          window.close();
        }
    });

  }

}
