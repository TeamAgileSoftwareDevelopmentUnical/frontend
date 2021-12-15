import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private productService : ProductService) { }

  ngOnInit() {
  }

  create(){
    /*let p = new Product();
    p.name = "productname";
    this.productService.create(p)
    .subscribe((response: Product) => {
      console.log("Product : ",response);
    },(error : HttpErrorResponse)=>{
      console.log("Error : ", error);
    }
    );*/
  }

}
