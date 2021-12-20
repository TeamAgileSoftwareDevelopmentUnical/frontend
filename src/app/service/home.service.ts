import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account';
import { CustomerAccount } from '../models/customeraccount';
import { SellerAccount } from '../models/selleraccount';

@Injectable({
  providedIn: 'root'
})
export class HomeService {


  constructor(private http: HttpClient) { }


  h = environment.apiBaseUrl;

  createCustomer(request: CustomerAccount )
  {
    return this.http.post(this.h+'/create-customer', request);
  }

  createSeller(request: SellerAccount )
  {
    return this.http.post(this.h+'/create-seller', request);
  }

  login(c : Account)
  {
    return this.http.post(this.h+'/authenticate' , {"username": c.username, "password": c.password});
  }
}
