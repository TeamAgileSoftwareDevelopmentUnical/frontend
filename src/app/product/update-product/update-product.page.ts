import { Component, OnInit } from '@angular/core';
import { ProductResponse } from '../../models/response/productResponse';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductUpdateRequest } from '../../models/request/productUpdateRequest';
import { AlertController } from '@ionic/angular';
import {min} from "rxjs/operators";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.page.html',
  styleUrls: ['./update-product.page.scss'],
})
export class UpdateProductPage implements OnInit {
  product_id: number;
  product: ProductResponse = new ProductResponse();
  request: ProductUpdateRequest;
  updateProductForm = this.form.group({
    productName: ['', Validators.required],
    productDescription: ['', Validators.required],
    productPrice: ['null',[ Validators.required,Validators.min(0.01)]],
    productQuantity: ['null',[ Validators.required, Validators.min(1)]],
  });

  constructor(
    private route: ActivatedRoute,
    private navRoute: Router,
    private service: ProductService,
    private form: FormBuilder,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.product_id = param.productId;
      this.service
        .getProductBy(this.product_id)
        .subscribe((response: ProductResponse) => {
          this.product = response;
        });
    });
  }

  updateProduct() {
    this.request = this.updateProductForm.value;
    this.request.productID = this.product_id;
    this.request.photo = this.product.photo;
    console.log(this.request);
    this.service.updateProduct(this.request).subscribe((response: boolean) => {
      if (response) {
        this.showAlert(
          'Product Update',
          'Product Update Successfully!!',
          'all-product'
        );
      }
    });
  }

  async showAlert(headers: string, messages: string, redirectTo: string) {
    const alert = await this.alertCtrl.create({
      header: headers,
      message: messages,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.navRoute.navigate(['/' + redirectTo]);
          },
        },
      ],
    });
    await alert.present();
  }

  loadImageFromDevice($event) {
    const file = $event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>{
      if (typeof reader.result === 'string') {
        this.product.photo = reader.result;
        console.log(reader.result);
      }
    };
  }
}
