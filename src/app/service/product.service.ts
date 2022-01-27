import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import {ProductUploadRequest} from '../models/request/productUploadRequest';
import {ProductUpdateRequest} from '../models/request/productUpdateRequest';
import { ProductUpdateAvailaBilityRequest } from '../models/request/productUpdateAvailabilityRequest';

@Injectable({
    providedIn: 'root'
  })
  export class ProductService {

    host = environment.apiBaseUrl+'/product';

    constructor(private http: HttpClient) { }

    getAllProduct(){
      const headers = new HttpHeaders({
        Authorization: 'Bearer '+sessionStorage.getItem('token')
      });
      if(!sessionStorage.getItem('token')){return;}
      return this.http.get(this.host+'/get-all?seller_id='+sessionStorage.getItem('id'),{headers});
    }

    getProductBy(product_id: number){
      const headers = new HttpHeaders({
        Authorization: 'Bearer '+sessionStorage.getItem('token')
      });
      return this.http.get(this.host+'/get-product?product_id='+product_id,{headers});
    }

    uploadProduct(request: ProductUploadRequest){
      console.log(sessionStorage.getItem('token'));
      const headers = new HttpHeaders({
        Authorization: 'Bearer '+sessionStorage.getItem('token')
      });
      console.log(headers);
      return this.http.post(this.host+'/upload',request,{headers});
    }

    updateProduct(request: ProductUpdateRequest){
      const headers = new HttpHeaders({
        Authorization: 'Bearer '+sessionStorage.getItem('token')
      });
      return this.http.post(this.host+'/update',request,{headers});
    }

    updateAvailableQuantity(request: ProductUpdateAvailaBilityRequest) {
      const headers = new HttpHeaders({
        Authorization: 'Bearer '+sessionStorage.getItem('token')
      });
      return this.http.post(this.host+'/update-availability', request, {headers});
    }

    deleteProduct(productID: number){
      const headers = new HttpHeaders({
        Authorization: 'Bearer '+sessionStorage.getItem('token')
      });
      console.log(productID);
      return this.http.get(this.host+'/delete?id='+productID,{headers});
    }

    getProductsByCategory(category: string){
      const headers = new HttpHeaders({
        Authorization: 'Bearer '+sessionStorage.getItem('token')
      });
      return this.http.get(this.host+'/get-stand-products?category='+category,{headers});
    }
}
