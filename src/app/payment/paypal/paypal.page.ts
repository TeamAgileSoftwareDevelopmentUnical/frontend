import { Component, OnInit } from '@angular/core';
import {PaymentService} from '../../service/payment.service';
import {FormBuilder, Validators} from '@angular/forms';
import {PaypalPaymentRequest} from '../../models/request/paypalPaymentRequest';
import {PayPalPaymentResponse} from '../../models/response/PayPalPaymentResponse';
import {StorePage} from '../../store/store.page';
import {LoadingService} from '../../service/loading.service';
import {ProductService} from '../../service/product.service';
import { PurchaseService } from 'src/app/service/purchase.service';
import { ProductResponse } from 'src/app/models/response/productResponse';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.page.html',
  styleUrls: ['./paypal.page.scss'],
})
export class PaypalPage implements OnInit {

  private loading;
  request: PaypalPaymentRequest;
  amount: number;
  description: string;

  paymentForm =  this.formBuilder.group({
    price: ['',[Validators.required,Validators.nullValidator]],
    description: ['',[Validators.required,Validators.nullValidator]]
  });

  constructor(private paymentService: PaymentService,
              private productService: ProductService,
              private formBuilder: FormBuilder,
              private loadingService: LoadingService,
              private purchaseService: PurchaseService,
              ) { }

  ngOnInit() {
    this.amount = StorePage.instance.getTotalCartPrice();
  }

  paymentWithPayPal() {
    this.loadingService.showLoading('Please Wait...');
    this.request = this.paymentForm.value;
    this.request.intent = 'Sale';
    this.request.currency = 'EUR';
    this.request.method = 'paypal';
    this.request.cancelURL = 'http://localhost:8100/payment-cancel';
    this.request.successURL = 'http://localhost:8100/payment-success';

    //this.deleteFromDBAndCreatePurchase();

    this.paymentService.payWithPayPal(this.request)
      .subscribe((response: PayPalPaymentResponse)=>{
        if (response.status){
          this.loadingService.hideLoading();
          console.log(response.url);
          location.replace(response.url);
        }
      });
  }

  /*private deleteFromDBAndCreatePurchase() {
    const customer = Number(sessionStorage.getItem('id'));
    const date = new Date();
    // FIXME: add a non hardcoded shipping address
    const shippingAddress = 'Via Verdi 16';
    const paymentMethod = 'paypal';
    StorePage.instance.cart.forEach(element => {
      let soldProduct: ProductResponse;
      this.productService.getProductBy(element.id).subscribe((response: ProductResponse) => {
        if (response) {
          soldProduct = response;
        }
        else
        {
          console.log("error in modify DB for a new purchase");
          StorePage.instance.showAlert('Error','Error in creating a new Purchase!')
        }
        const productQuantity = element.getQuantity();
        const total = Number(element.getPrice()) * Number(productQuantity);

        //this.purchaseService.createPurchase(
        //  customer,
        //  date,
        //  soldProduct,
        //  productQuantity,
        //  shippingAddress,
        //  paymentMethod,
        //  total
        //);

        this.productService.updateAvailableQuantity(
          {
            product_id: element.id,
            availability: soldProduct.batch.availableQuantity - element.getQuantity()
          })
      });

    });
  }*/
}
