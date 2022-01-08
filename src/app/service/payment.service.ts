import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PaypalPaymentRequest} from '../models/request/paypalPaymentRequest';
import {PayPalConfirmPaymentRequest} from "../models/request/payPalConfirmPaymentRequest";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  host = environment.apiBaseUrl+'/payment';
  constructor(private httpClient: HttpClient) { }

  payWithPayPal(request: PaypalPaymentRequest){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+sessionStorage.getItem('token')
    });
    return this.httpClient.post(this.host+'/pay',request,{headers});
  }

  confirmPayment(request: PayPalConfirmPaymentRequest){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+sessionStorage.getItem('token')
    });
    return this.httpClient.post(this.host+'/success',request,{headers});
  }
}
