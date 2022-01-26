import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../service/product.service';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {ProductUploadRequest} from '../../models/request/productUploadRequest';
import {AlertController} from '@ionic/angular';
import {LoadingService} from '../../service/loading.service';

@Component({
  selector: 'app-upload-product',
  templateUrl: './upload-product.page.html',
  styleUrls: ['./upload-product.page.scss'],
})
export class UploadProductPage implements OnInit {
  request: ProductUploadRequest;
  productImage: string;
  defaultImage = 'assets/icon/no_image.jpeg';

  uploadProductFrom = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    availableQuantity: ['', Validators.required],
    type: ['', Validators.required]
  });

  // eslint-disable-next-line max-len
  constructor(private service: ProductService,
              private route: Router,
              private formBuilder: FormBuilder,
              private alertCtrl: AlertController,
              private loading: LoadingService) { }

  ngOnInit() {}

  uploadProduct() {
    this.request = this.uploadProductFrom.value;
    this.request.photo = this.productImage;
    this.request.sellerID = +sessionStorage.getItem('id');
    this.loading.showLoading('Product Uploading...');
    this.service.uploadProduct(this.request)
      .subscribe((response: boolean)=>{
        if (response){
          this.loading.hideLoading();
          this.showAlert('Product Upload','Product Upload Successfully!','all-product');
          this.uploadProductFrom.reset();
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

  loadImageFromDevice($event) {
    const file = $event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>{
      if (typeof reader.result === 'string') {
        this.productImage = reader.result;
        this.defaultImage = reader.result;
        console.log(reader.result);
      }
    };
  }
}
