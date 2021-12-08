import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { CustomerAccount } from "../models/customeraccount";

@Injectable({
    providedIn: 'root'
  })
  export class CustomerAccountService {
  
    host = environment.apiBaseUrl+"/customer-account";
    h = environment.apiBaseUrl

    constructor(private http: HttpClient) { }
  
    create(request : CustomerAccount )
    {
      return this.http.post(this.host+"/create", request);
    }
    login( c : CustomerAccount )
    {//todo
    return this.http.post(this.h+"/login" , c);
    }
    update(name : string, surname : string, email : string )
    {
      return this.http.get(this.host+"/login" + [name + surname + email]);
    }
}