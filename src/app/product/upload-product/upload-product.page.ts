import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../service/product.service";
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {ProductUploadRequest} from "../../models/request/productUploadRequest";

@Component({
  selector: 'app-upload-product',
  templateUrl: './upload-product.page.html',
  styleUrls: ['./upload-product.page.scss'],
})
export class UploadProductPage implements OnInit {
  request: ProductUploadRequest;
  constructor(private service: ProductService, private route: Router, private formBuilder: FormBuilder) { }
  uploadProductFrom = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required, Validators.min(1)],
    availableQuantity: ['', Validators.required, Validators.min(1)],
    type: ['', Validators.required]
  });
  ngOnInit() {
  }

  uploadProduct() {
    this.request = this.uploadProductFrom.value;
    this.request.sellerID = 1;
    this.service.updateProduct(this.request)
      .subscribe((response: boolean)=>{
        if (response){
          this.route.navigate(['/all-product']);
        }
      });
  }
}
