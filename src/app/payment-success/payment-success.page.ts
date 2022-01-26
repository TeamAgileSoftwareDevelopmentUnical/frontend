import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaymentService } from '../service/payment.service';
import { PayPalConfirmPaymentRequest } from '../models/request/payPalConfirmPaymentRequest';
import { PayPalConfirmPaymentResponse } from '../models/response/payPalConfirmPaymentResponse';
import { StorePage } from '../store/store.page';
import { LoadingController } from "@ionic/angular";
import { PurchaseService } from '../service/purchase.service';
import { Purchase } from '../models/purchase';
import { ProductService } from '../service/product.service';
import { ProductResponse } from '../models/response/productResponse';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.page.html',
  styleUrls: ['./payment-success.page.scss'],
})
export class PaymentSuccessPage implements OnInit {

  private loading;
  request: PayPalConfirmPaymentRequest = new PayPalConfirmPaymentRequest();
  counter = 10;
  amountPaid = 0;
  paymentId: string = null;
  mode = false;

  constructor(private paymentService: PaymentService,
    private loadingCtrl: LoadingController,
    private purchaseService: PurchaseService,
    private productService: ProductService) { }

  ngOnInit() {
    if (document.URL.indexOf('?')) {
      const splitUrl = document.URL.split('?');
      const splitParams = splitUrl[1].split('&');
      let i: any;
      // eslint-disable-next-line guard-for-in
      for (i in splitParams) {
        const singleURLParam = splitParams[i].split('=');
        if (singleURLParam[0] === 'paymentId') {
          this.request.paymentId = singleURLParam[1].trim();
        }
        if (singleURLParam[0] === 'PayerID') {
          this.request.payerId = singleURLParam[1].trim();
        }
      }
      // call to successPayment service
      this.loadingCtrl.create({ message: 'Please Wait...' })
        .then((overlay) => {
          this.loading = overlay;
          this.loading.present();
        });
      this.paymentService.confirmPayment(this.request)
        .subscribe((response: PayPalConfirmPaymentResponse) => {
          console.log(response.status);
          if (response.status === 'approved') {
            this.loading.dismiss();
            this.mode = true;
            this.paymentId = response.paymentID;
            this.amountPaid = response.amount;

            this.deleteFromDBAndCreatePurchase()


            setInterval(() => {
              --this.counter;
              if (this.counter <= 0) {
                console.log(response);
                // redirect to store page
                location.replace('http://localhost:4200/store');
              }
            }, 1000);
          }
          else
            StorePage.instance.showAlert('Payment Error', 'Something get wrong during the payment!');
        });
    }
  }

  private deleteFromDBAndCreatePurchase() {
    const customer = Number(sessionStorage.getItem('id'));
    const date = new Date();
    // FIXME: add a non hardcoded shipping address
    const shippingAddress = 'Via Verdi 16';
    const paymentMethod = this.mode ? 'paypal' : 'credit card';
    StorePage.instance.cart.forEach(element => {
      let soldProduct: ProductResponse;
      this.productService.getProductBy(element.id).subscribe((response: ProductResponse) => {
        if (response) {
          soldProduct = response;
        }
      });
      const productQuantity = element.getQuantity();
      const total = Number(element.getPrice()) * Number(productQuantity);
      this.purchaseService.createPurchase(
        customer,
        date,
        soldProduct,
        productQuantity,
        shippingAddress,
        paymentMethod,
        total
      );
      this.productService.updateAvailableQuantity({ product_id: element.id, availability: soldProduct.batch.availableQuantity - element.getQuantity() })
    });
  }

}
