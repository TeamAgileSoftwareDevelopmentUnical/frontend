import { Component, OnInit } from '@angular/core';
import {PaymentService} from '../../service/payment.service';
import {FormBuilder, Validators} from '@angular/forms';
import {PaypalPaymentRequest} from '../../models/request/paypalPaymentRequest';
import {PayPalPaymentResponse} from '../../models/response/PayPalPaymentResponse';
import {StorePage} from '../../store/store.page';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.page.html',
  styleUrls: ['./paypal.page.scss'],
})
export class PaypalPage implements OnInit {

  request: PaypalPaymentRequest;
  amount: number;

  paymentForm =  this.formBuilder.group({
    price: ['',Validators.required],
    description: ['', Validators.required]
  });

  constructor(private paymentService: PaymentService,
              private formBuilder: FormBuilder,
              ) { }

  ngOnInit() {
    this.amount = StorePage.instance.getTotalCartPrice();
  }

  paymentWithPayPal() {
    this.request = this.paymentForm.value;
    this.request.intent = 'Sale';
    this.request.currency = 'EUR';
    this.request.method = 'paypal';
    this.request.cancelURL = 'http://localhost:8100/payment-cancel';
    this.request.successURL = 'http://localhost:8100/payment-success';
    this.paymentService.payWithPayPal(this.request)
      .subscribe((response: PayPalPaymentResponse)=>{
        if (response.status){
          console.log(response.url);
          location.replace(response.url);
        }
      });
  }
}
