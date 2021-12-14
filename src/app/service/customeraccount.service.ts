import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Account } from "../models/account";
import { CustomerAccount } from "../models/customeraccount";

@Injectable({
    providedIn: 'root'
  })
  export class CustomerAccountService {
  
    host = environment.apiBaseUrl+"/customer-account";
    h = environment.apiBaseUrl

    constructor(private http: HttpClient) { }
  
    create(request : Account )
    {
      return this.http.post(this.host+"/create", request);
    }

    getCustomerAccount(id)
    {
      console.log("token = " , sessionStorage.getItem("token"))
      let reqheaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': sessionStorage.getItem('token')});
      let options = { headers: reqheaders };
      // const headers= new HttpHeaders()
      // .set('content-type', 'application/json')
      // .set('Access-Control-Allow-Origin', '*')
      // .set('Authorization', sessionStorage.getItem('token'));
      // console.log("head = ", headers)
      // return this.http.post(this.host+"/get-account/"+[id], {headers : reqheaders});
      return this.http.get(this.h+"/profile/" + id, {headers : reqheaders});
    }

    login( c : Account )
    {//todo

      return this.http.post(this.h+"/login" , c);
    }

    update(request : Account )
    {//to do
      return this.http.post(this.host+"/update-account", request);
    }
}