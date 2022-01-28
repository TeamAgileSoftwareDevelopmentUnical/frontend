import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StorePage} from '../store/store.page';
import {LoadingService} from '../service/loading.service';
import {ProductService} from '../service/product.service';
import {ProductInfo} from '../models/request/productInfo';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  public cartInfo: ProductInfo[] = [];
  constructor(private loadingService: LoadingService,
              private productService: ProductService,
              private alertCtrl: AlertController,
              private route: Router) { }

  ngOnInit() {
    if (StorePage.instance==null){
      location.replace('/store');
    }
    this.checkProductQuantity();
  }

  checkProductQuantity(){
    if (StorePage.instance.cart.length>0){

      StorePage.instance.cart.forEach(cart=>{
        const info: ProductInfo = new ProductInfo();
        info.quantity = cart.getQuantity();
        info.productId = cart.id;
        this.cartInfo.push(info);
        this.productService.checkProductQuantity(cart.id,cart.getQuantity())
          .subscribe((response: any)=>{
            console.log(response);
            if (!response.status){
              // FIXME: Why there should be a shipping address error within the productService request?
              this.showAlert('Payment Issue',response.message,'/store');
            }
          });
      });
      sessionStorage.setItem('cart',JSON.stringify(this.cartInfo));
    }
  }

  async showAlert(headers: string, messages: string, redirectTo: string){
    const alert = await this.alertCtrl.create({
      header: headers,
      message: messages,
      buttons: [
        {
          text: 'Okay',
          handler: ()=>{
            if (messages === 'Shipping address not found!\nUpdate your shipping address in your profile!') {
              StorePage.instance.getNavCtrl().navigateForward(`/profile/${sessionStorage.getItem('id')}`);
            } else {
              sessionStorage.removeItem('cart');
              this.route.navigate([redirectTo]);
            }
          }
        }
      ]
    });
    await alert.present();
  }

}
