import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../service/product.service";
import {FormBuilder} from "@angular/forms";
import {Product} from "../../models/product";

@Component({
  selector: 'app-upload-product',
  templateUrl: './upload-product.component.html',
  styleUrls: ['./upload-product.component.scss'],
})
export class UploadProductComponent implements OnInit {

  constructor(private pService: ProductService, private form:FormBuilder) {}

  // variables
  product:Product;
  productType:string;
  productForm = this.form.group({
    name: '',
    description: '',
    price: '',
    availableQuantity: ''
  });

  ngOnInit() {}

  submit() {
    console.log("Request Value is: ", this.productForm.value);
    this.product = new Product();
    this.product = this.productForm.value;
    this.product.type = this.productType;
    this.product.seller = 1;
    this.pService.uploadProduct(this.product)
      .subscribe((response:boolean)=>{
        console.log("product upload response: ",response);
      });
  }


  selectType(event: any) {
    this.productType = event.target.value;
  }
}
