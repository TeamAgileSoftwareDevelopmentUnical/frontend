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
  
    create(request : Product )
    {
      return this.http.post(this.host+"/create", request);
    }
}