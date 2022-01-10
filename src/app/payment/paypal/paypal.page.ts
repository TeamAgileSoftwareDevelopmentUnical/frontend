import { Component, OnInit } from '@angular/core';
import {PaymentService} from '../../service/payment.service';
import {FormBuilder, Validators} from '@angular/forms';
import {PaypalPaymentRequest} from "../../models/request/paypalPaymentRequest";
import {PayPalPaymentResponse} from "../../models/response/PayPalPaymentResponse";

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.page.html',
  styleUrls: ['./paypal.page.scss'],
})
export class PaypalPage implements OnInit {

  constructor(private paymentService: PaymentService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {

  }

  request: PaypalPaymentRequest;
  paymentForm =  this.formBuilder.group({
    price: ['',Validators.required],
    description: ['', Validators.required]
  });

  paymentWithPayPal() {
    this.request = this.paymentForm.value;
    this.request.intent = 'Sale';
    this.request.currency = 'EUR';
    this.request.method = 'paypal';
    this.request.cancelURL = 'http://localhost:4200/payment-cancel';
    this.request.successURL = 'http://localhost:4200/payment-success';
    this.paymentService.payWithPayPal(this.request)
      .subscribe((response: PayPalPaymentResponse)=>{
        if (response.status){
          console.log(response.url);
          location.replace(response.url);
          //window.open(response.url,'_blank');
        }
      });
  }
}
