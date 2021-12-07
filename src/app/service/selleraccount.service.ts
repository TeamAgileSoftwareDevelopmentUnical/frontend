import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { SellerAccount } from "../models/selleraccount";

@Injectable({
    providedIn: 'root'
  })
  export class SellerAccountService {

      host = environment.apiBaseUrl+"/seller-account";

      constructor(private http: HttpClient){}

      create(sellerAccount: SellerAccount){

        return this.http.post(this.host+"/create-seller", sellerAccount);
      }
  }