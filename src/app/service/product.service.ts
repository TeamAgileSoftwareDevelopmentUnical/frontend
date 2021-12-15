import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Product } from "../models/product";
import {ProductUploadRequest} from "../models/request/productUploadRequest";

@Injectable({
    providedIn: 'root'
  })
  export class ProductService {

    host = environment.apiBaseUrl+"/product";

    constructor(private http: HttpClient) { }

    getAllProduct(seller_id: number){
      return this.http.get(this.host+'/get-all?seller_id='+seller_id);
    }

    getProductBy(id){

    }

    updateProduct(request: ProductUploadRequest){
      return this.http.post(this.host+'/upload',request);
    }

    deleteProduct(id){

    }
}
