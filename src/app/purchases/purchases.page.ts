import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../models/order';
import { Purchase } from '../models/purchase';
import { PurchaseResponse } from '../models/response/purchaseResponse';
import { PurchaseService } from '../service/purchase.service';
import { StorePage } from '../store/store.page';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.page.html',
  styleUrls: ['./purchases.page.scss'],
})
export class PurchasesPage implements OnInit {

  constructor(private route: ActivatedRoute, private service: PurchaseService) { }

  id: number; //customer id to visualize purchases
  purchases: PurchaseResponse[] = [];
  orders: Order[]=[];
  datepipe: DatePipe = new DatePipe('en-US');

  productsInOrder: PurchaseResponse[] = [];
  firstDate: string;
  firstOrder: number = 0;

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap =>{
      this.id = +paramMap.get('id');
    });
    this.fetchPurchases();
  }

  fetchPurchases()
  {
    // console.log("sono in fetch, aspetto il subscribe")
    this.service.getPurchasesByCustomerId(this.id)
    .subscribe((response: PurchaseResponse[]) => {
      this.purchases = response;

      if(this.purchases.length === 0) {
        StorePage.instance.showAlert('Purchases', 'You have not yet made any purchase! :(');
      }
      else
      {
        this.firstDate = this.datepipe.transform(this.purchases[0].purchaseDate, 'dd-MMM-YYYY HH:mm:ss');

        this.purchases.forEach(element => {
          if(this.datepipe.transform(element.purchaseDate, 'dd-MMM-YYYY HH:mm:ss') !== this.firstDate)
          {
            this.orders.push(new Order(
              ++this.firstOrder,
              this.id,
              this.firstDate,
              this.productsInOrder,
              element.shippingAddress,
              element.paymentMethod
              ));
              
              this.firstDate = this.datepipe.transform(element.purchaseDate, 'dd-MMM-YYYY HH:mm:ss');
              this.productsInOrder = [];
          }
          if(this.datepipe.transform(element.purchaseDate, 'dd-MMM-YYYY HH:mm:ss') === this.firstDate)
          {
            this.productsInOrder.push(element);

            if(element === this.purchases[this.purchases.length-1])
            {
              this.orders.push(new Order(
                ++this.firstOrder,
                this.id,
                this.firstDate,
                this.productsInOrder,
                element.shippingAddress,
                element.paymentMethod
                ));
            }
          }
        });
      }
      // console.log('lenght orders: '+this.orders.length)
    });

    
  }

}
