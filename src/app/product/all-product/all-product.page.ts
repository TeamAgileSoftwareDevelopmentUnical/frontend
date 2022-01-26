import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../service/product.service';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {ProductResponse} from '../../models/response/productResponse';
import {AlertController, LoadingController} from '@ionic/angular';
import {LoadingService} from "../../service/loading.service";
import {Subscription} from "rxjs";

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

  allProduct: ProductResponse[] = [];
  product: ProductResponse;
  tokenValue: string;
  //subs: Subscription;

  constructor(private service: ProductService,
              private route: Router,
              private alertCtrl: AlertController,
              private loadingService: LoadingService) {
    this.route.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.getAllProduct();
      }
    });
  }

  ngOnInit() {
    this.getAllProduct();
  }

  getAllProduct(){
    //this.loadingService.showLoading('Product uploading...');
    this.service.getAllProduct()
      .subscribe((response: ProductResponse[]) => {
        console.log(response);
        this.allProduct = response;
      });
    //this.subs.add(()=>{this.loadingService.hideLoading()});
  }

  updateProduct(productId: number) {
    this.route.navigate(['/update-product',productId], {
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
    if(sessionStorage.getItem('role')==='Seller'){
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
    if(sessionStorage.getItem('role')==='Customer'){
      return true;
    }
    return false;
  }
}
