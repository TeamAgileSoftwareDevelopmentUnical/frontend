import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Product } from "../models/product";
import {ProductUploadRequest} from "../models/request/productUploadRequest";
import {ProductUpdateRequest} from "../models/request/productUpdateRequest";

@Injectable({
    providedIn: 'root'
  })
  export class ProductService {

    //host = environment.apiBaseUrl+"/product";
    host = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    getAllProduct(seller_id: number){
      return this.http.get(this.host+'/get-all?seller_id='+seller_id);
    }

    getProductBy(product_id: number){
      return this.http.get(this.host+'/get-product?product_id='+product_id);
    }

    uploadProduct(request: ProductUploadRequest){
      return this.http.post(this.host+'/upload',request);
    }

    updateProduct(request: ProductUpdateRequest){
      return this.http.post(this.host+'/update',request);
    }

    deleteProduct(productID: number){
      return this.http.delete(this.host+'/delete?id='+productID);
    }
}
