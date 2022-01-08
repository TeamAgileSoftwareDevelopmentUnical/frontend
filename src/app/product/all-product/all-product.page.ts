import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../service/product.service";
import {Router} from "@angular/router";
import {ProductResponse} from "../../models/response/productResponse";
import {AlertController} from "@ionic/angular";

class LoginResponse {
  token: string;
}

class MeResponse {
  value: string;
}

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.page.html',
  styleUrls: ['./all-product.page.scss'],
})
export class AllProductPage implements OnInit {

  constructor(private service: ProductService, private route: Router, private alertCtrl: AlertController) { }

  allProduct: ProductResponse[] = [];
  product: ProductResponse;
  tokenValue: string;

  ngOnInit() {
    this.getAllProduct();
  }

  getAllProduct(){

    this.service.getAllProduct()
      .subscribe((response: ProductResponse[]) => {
        this.allProduct = response;
      });
  }

  updateProduct(productId: number) {
    this.route.navigate(['/update-product',productId],{
      replaceUrl : true
     });
  }

  deleteProduct(productId: number) {
    this.showAlert('Product Delete','Are you really wants to delete this product?',null, productId);
  }

  async showAlert(headers: string, messages: string, redirectTo: string, productId: number){
    const alert = await this.alertCtrl.create({
      header: headers,
      message: messages,
      buttons: [
        {
          text: 'Agree',
          handler: ()=>{
            this.service.deleteProduct(productId)
              .subscribe((response: boolean)=>{
                if (response){
                  this.getAllProduct();
                }
              });
          }
        },
        {
          text: 'Disagree',
          handler: ()=>{
            alert.dismiss();
          }
        }
      ]
    });
    await alert.present();
  }
  getId(){
    return sessionStorage.getItem( 'id');
  }
  isSeller(){
    if(sessionStorage.getItem('role')==="Seller"){
      return true;
    }
    return false;
  }
  canBack(){
    if( document.referrer.indexOf('upload') >= 0){
      return false;
    }
    return true;
  }
  isCustomer(){
    if(sessionStorage.getItem('role')==="Customer"){
      return true;
    }
    return false;
  }
}
