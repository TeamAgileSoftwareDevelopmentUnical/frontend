import {Component, OnDestroy, OnInit} from '@angular/core';
import {PaymentService} from '../service/payment.service';
import {PayPalConfirmPaymentRequest} from '../models/request/payPalConfirmPaymentRequest';
import {PayPalConfirmPaymentResponse} from '../models/response/payPalConfirmPaymentResponse';
import { StorePage } from '../store/store.page';
import {LoadingController, NavController} from "@ionic/angular";
import {LoadingService} from "../service/loading.service";
import {ProductInfo} from "../models/request/productInfo";

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.page.html',
  styleUrls: ['./payment-success.page.scss'],
})
export class PaymentSuccessPage implements OnInit {

  private loading;
  request: PayPalConfirmPaymentRequest = new PayPalConfirmPaymentRequest();
  counter = 10;
  amountPaid = 0;
  paymentId: string = null;
  mode = false;

  constructor(private paymentService: PaymentService,
              private navCtrl: NavController,
              private loadingService: LoadingService) { }

  ngOnInit() {
    if (document.URL.indexOf('?')){
      const splitUrl = document.URL.split('?');
      const splitParams = splitUrl[1].split('&');
      let i: any;
      // eslint-disable-next-line guard-for-in
      for (i in splitParams){
        const singleURLParam = splitParams[i].split('=');
        if (singleURLParam[0]==='paymentId'){
          this.request.paymentId = singleURLParam[1].trim();
        }
        if (singleURLParam[0]==='PayerID'){
          this.request.payerId = singleURLParam[1].trim();
        }
      }

      if (StorePage.instance == null){
        console.log('Okay');
      }

      // call to successPayment service
      this.loadingService.showLoading('Please Wait...');
      this.request.customerId = +sessionStorage.getItem('id');
      JSON.parse(sessionStorage.getItem('cart')).forEach(data=>{
        let info: ProductInfo = new ProductInfo();
        info.quantity = data.quantity;
        info.productId = data.productId;
        this.request.productIds.push(info);
      });
      console.log(this.request);

      this.paymentService.confirmPayment(this.request)
        .subscribe((response: PayPalConfirmPaymentResponse)=>{
          console.log(response.status);
          if (response.status==='approved'){
            sessionStorage.removeItem('cart');
            this.loadingService.hideLoading();
            this.mode = true;
            this.paymentId = response.paymentID;
            this.amountPaid = response.amount;
            setInterval(()=>{
              --this.counter;
              if (this.counter <= 0){
                console.log(response);
                // redirect to store page
                location.replace('http://localhost:4200/store');
              }
            },1000);
          }
        });
    }
  }
}
