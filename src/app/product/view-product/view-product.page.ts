import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { listenerCount } from 'process';
import { Product } from 'src/app/models/product';
import { ProductUpdateRequest } from 'src/app/models/request/productUpdateRequest';
import { ViewDetails } from 'src/app/models/request/ViewDetails';
import { ProductResponse } from 'src/app/models/response/productResponse';
import { ProductService } from 'src/app/service/product.service';
import { NamedImportBindings } from 'typescript';
import { isNumber } from 'util';
import { validate } from 'webpack/node_modules/schema-utils';
import { AllProductPageRoutingModule } from '../all-product/all-product-routing.module';
import { ViewProductPageModule } from './view-product.module';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.page.html',
  styleUrls: ['./view-product.page.scss'],
})
export class ViewProductPage implements OnInit {


  productName: ViewDetails  ;
  Id:FormGroup  ;
  ViewProductPage:Product;
 
  constructor(private route: ActivatedRoute, private navRoute: Router, private service: ProductService,  private alertCtrl: AlertController) { }
  
  product_id: number;
  product: ViewDetails = new ViewDetails();
  request: ViewDetails;
  Batch:ViewDetails;

  ngOnInit() { 
    

    this.route.params.subscribe(param=>{
      this.product_id = param['productId'];
      this.service.getProductBy(this.product_id)
        .subscribe((response: ViewDetails)=>{
          this.product = response;
        });
    });
 
        
  }

}