import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../service/product.service";
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {ProductUploadRequest} from "../../models/request/productUploadRequest";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-upload-product',
  templateUrl: './upload-product.page.html',
  styleUrls: ['./upload-product.page.scss'],
})
export class UploadProductPage implements OnInit {
  request: ProductUploadRequest;
  constructor(private service: ProductService, private route: Router, private formBuilder: FormBuilder, private alertCtrl: AlertController) { }
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
    this.service.uploadProduct(this.request)
      .subscribe((response: boolean)=>{
        if (response){
          this.showAlert('Product Upload','Product Upload Successfully!','all-product');
        }
      });
  }

  async showAlert(headers: string, messages: string, redirectTo: string){
    const alert = await this.alertCtrl.create({
      header: headers,
      message: messages,
      buttons: [
        {
          text: 'Okay',
          handler: ()=>{
            this.route.navigate(['/'+redirectTo]);
          }
        }
      ]
    });
    await alert.present();
  }
}
