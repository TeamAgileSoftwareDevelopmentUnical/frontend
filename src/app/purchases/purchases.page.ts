import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../models/order';
import { Purchase } from '../models/purchase';
import { PurchaseService } from '../service/purchase.service';
import { StorePage } from '../store/store.page';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.page.html',
  styleUrls: ['./purchases.page.scss'],
})
export class PurchasesPage implements OnInit {

  constructor(private route: ActivatedRoute) { }

  id: number; //customer id to visualize purchases
  purchases: Purchase[] = [];
  service: PurchaseService;
  orders: Order[]=[];

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap =>{
      this.id = +paramMap.get('id');
      console.log("customer id in purchases = ", this.id)
    });
    this.fetchPurchases(this.id);
  }

  fetchPurchases(id: number)
  {
    this.service.getPurchasesByCustomerId(id)
    .subscribe((response: Purchase[]) => {
      this.purchases = response;
      console.log("purchases from service"+this.purchases);

      if(this.purchases.length === 0) {
        console.log(this.purchases.length);
        StorePage.instance.showAlert('Purchases', 'You have not yet made any purchase! :(');
      }
    });
    // if(this.purchases.length === 0) {
    //   console.log(this.purchases.length);
    //   StorePage.instance.showAlert('Purchases', 'You have not yet made any purchase! :(');
    // }
  }

}
