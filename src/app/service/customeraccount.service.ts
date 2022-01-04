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
      const headers = new HttpHeaders({
        'Authorization': 'Bearer '+sessionStorage.getItem('token')
      });
      return this.http.post(this.host+'/create', request, {headers});
    }

    getCustomerAccount(id)
    {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer '+sessionStorage.getItem('token')
      });
      return this.http.get(this.host+'/get-account/'+[id] ,{headers});
    }


    update(request: Account )
    {//to do
      const headers = new HttpHeaders({
        'Authorization': 'Bearer '+sessionStorage.getItem('token')
      });
      return this.http.post(this.host+'/update', request,{headers});
    }

    delete(user_id:number){
      const headers = new HttpHeaders({
        'Authorization': 'Bearer '+sessionStorage.getItem('token')
      });
      return this.http.get(this.h+'/remove-account?user_id='+user_id,{headers});
    }
    isAuthenticated(){
      return !!sessionStorage.getItem('token');
    }
}
