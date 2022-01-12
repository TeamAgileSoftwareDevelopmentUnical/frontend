import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  host = environment.apiBaseUrl+'/purchases';

  constructor(private http: HttpClient) { }

  getPurchasesByCustomerId(id: number){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+sessionStorage.getItem('token')
    });
    return this.http.get(this.host+'/get-purchases?customer_id='+id, {headers});
  }
}
