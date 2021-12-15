import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account';

@Injectable({
    providedIn: 'root'
  })
  export class CustomerAccountService {

    host = environment.apiBaseUrl+'/customer-account';
    h = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    create(request: Account )
    {
      return this.http.post(this.host+'/create', request);
    }

    getCustomerAccount(id)
    {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: sessionStorage.getItem('token')});
      const options = { headers };
      return this.http.post(this.host+'/get-account/'+[id], options);
    }

    login( c: Account )
    {//todo
      return this.http.post(this.h+'/login' , c);
    }

    update(request: Account )
    {//to do
      return this.http.post(this.host+'/update-account', request);
    }
}
