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
  product: ProductResponse;

  ngOnInit() {
    this.getAllProduct();
  }

  getAllProduct(){
    this.service.getAllProduct(1)
      .subscribe((response: ProductResponse[]) => {
        this.allProduct = response;
      });
  }

  updateProduct(productId: number) {
    this.route.navigate(['/update-product',productId]);
  }

  deleteProduct(productId: number) {
    this.service.deleteProduct(productId)
      .subscribe((response: boolean)=>{
        if (response){
          this.getAllProduct();
        }
      });
  }
}
