import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../service/product.service";
import {Router} from "@angular/router";
import {ProductResponse} from "../../models/response/productResponse";

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.page.html',
  styleUrls: ['./all-product.page.scss'],
})
export class AllProductPage implements OnInit {

  constructor(private service: ProductService, private route: Router) { }
  allProduct: ProductResponse[] = [];
  ngOnInit() {
    this.service.getAllProduct(1)
      .subscribe((response: ProductResponse[]) => {
        this.allProduct = response;
      });
  }

}
