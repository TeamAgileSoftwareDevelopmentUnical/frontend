import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Purchase } from '../models/purchase';
import { ProductResponse } from '../models/response/productResponse';
import { Item } from '../store/add_on/item';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  host = environment.apiBaseUrl + '/purchases';

  constructor(private http: HttpClient) { }

  getPurchasesByCustomerId(id: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    return this.http.get(this.host + '/get-purchases?customer_id=' + id, { headers });
  }

  createPurchase(
    customer: number,
    date: Date,
    soldProduct: ProductResponse,
    productQuantity: number,
    shippingAddress: string,
    paymentMethod: string,
    total: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    return this.http.post(`${this.host}/purchases-create`, {
      customer,
      date,
      soldProduct,
      productQuantity,
      shippingAddress,
      paymentMethod,
      total
    }, { headers });
  }
}
