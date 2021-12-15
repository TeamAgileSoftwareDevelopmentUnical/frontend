import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Product } from "../models/product";

@Injectable({
    providedIn: 'root'
  })
  export class ProductService {

    host = environment.apiBaseUrl+"/product";

    constructor(private http: HttpClient) { }

    uploadProduct(request : Product )
    {
      return this.http.post(this.host+"/upload-product", request);
    }

    getAllProduct(){

    }

    getProductBy(id){

    }

    updateProduct(request:Product){

    }

    deleteProduct(id){

    }
}
