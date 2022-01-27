import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StorePage} from "../store/store.page";
import {LoadingService} from "../service/loading.service";
import {ProductService} from "../service/product.service";
import {ProductInfo} from "../models/request/productInfo";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  public cartInfo: ProductInfo[] = [];
  constructor(private loadingService: LoadingService,
              private productService: ProductService) { }

  ngOnInit() {
    if (StorePage.instance==null){
      location.replace('/store');
    }
    this.checkProductQuantity();
  }

  checkProductQuantity(){
    if (StorePage.instance.cart.length>0){
      this.loadingService.showLoading('Please Wait...');
      StorePage.instance.cart.forEach(cart=>{
        let info: ProductInfo = new ProductInfo();
        info.quantity = cart.getQuantity();
        info.productId = cart.id;
        this.cartInfo.push(info);
        this.productService.checkProductQuantity(cart.id)
          .subscribe((response: boolean)=>{
            this.loadingService.hideLoading();
            if (!response){
              console.log('show error message and back to home page');
            }
          });
      });
      sessionStorage.setItem('cart',JSON.stringify(this.cartInfo));
    }
  }

}
