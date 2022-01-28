import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account } from '../models/account';
import { Order } from '../models/order';
import { Purchase } from '../models/purchase';
import { PurchaseService } from '../service/purchase.service';
import { SellerAccountService } from '../service/selleraccount.service';
import { StorePage } from '../store/store.page';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.page.html',
  styleUrls: ['./purchases.page.scss'],
})
export class PurchasesPage implements OnInit {
  id: number; //customer id to visualize purchases
  purchases: Purchase[] = [];
  orders: Order[] = [];

  productsInOrder: Purchase[];
  firstDate: Date;
  firstOrder = 0;

  constructor(
    private route: ActivatedRoute,
    private purchaseService: PurchaseService,
    private sellerService: SellerAccountService
  ) {}

  ngOnInit() {
    // this.route.paramMap.subscribe((paramMap) => {
    //   this.id = +paramMap.get('id');
    // });
    this.id = Number(sessionStorage.getItem('id'));
    this.fetchPurchases();
  }

  fetchPurchases() {
    this.purchaseService
      .getPurchasesByCustomerId(this.id)
      .subscribe((response: Purchase[]) => {
        this.purchases = response;
        console.log('in front-end ' + this.purchases);

        if (this.purchases.length === 0) {
          console.log(this.purchases.length);
          StorePage.instance.showAlert(
            'Purchases',
            'You have not yet made any purchase! :('
          );
        }
      });

    if (this.purchases.length !== 0) {
      this.firstDate = this.purchases[0].date;
      this.purchases.forEach((element) => {
        while (element.date === this.firstDate) {
          this.productsInOrder.push(element);
        }
        this.orders.push(
          new Order(
            ++this.firstOrder,
            this.id,
            this.firstDate,
            this.productsInOrder,
            element.shippingAddress,
            element.paymentMethod
          )
        );

        this.firstDate = element.date;
        this.productsInOrder = [];
      });
    }
  }

  getSellerName(sellerID: number): string {
    let returnValue = '';
    this.sellerService.getSellerAccount(sellerID).subscribe((response) => {
      if (response) {
        const account = response as Account;
        returnValue = account.name;
      }
    });
    return returnValue;
  }
}
