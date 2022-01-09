import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ProductResponse } from '../models/response/productResponse';
import { ProductService } from '../service/product.service';
import { Item } from '../store/add_on/item';
import { StorePage } from '../store/store.page';


@Component({
  selector: 'app-stand-products',
  templateUrl: './stand-products.page.html',
  styleUrls: ['./stand-products.page.scss'],
})
export class StandProductsPage implements OnInit {

  standProducts: ProductResponse[] = [];
  category: string;

  constructor(private route: ActivatedRoute, private service: ProductService, private navCtrl: NavController) {
    
  }

  ngOnInit() {
    this.route.params.subscribe(param=>{
      this.category = param['category'];

      console.log(this.category);

      this.service.getProductsByCategory(this.category)
      .subscribe((response: ProductResponse[]) => {
        this.standProducts = response;
        console.log(this.standProducts);

        if(this.standProducts.length === 0) {
          console.log(this.standProducts.length);
          StorePage.instance.showAlert('Products', 'There are no products in this category! :(');
        }
      });
    });

    
      
  }

  addProductInCart(product: ProductResponse) {
    var id: any = product.productId;
    var selectedQuantity: any = document.getElementById(id).getElementsByTagName('input')[0].value;

    if(selectedQuantity > product.batch.availableQuantity) {
      var availableQuantityInString: any = product.batch.availableQuantity;
      document.getElementById(id).getElementsByTagName('input')[0].value = availableQuantityInString;
    }

    selectedQuantity = document.getElementById(id).getElementsByTagName('input')[0].value;

    StorePage.instance.addItem(new Item(product.productId, product.productName, product.productDesc, product.batch.productPrice, selectedQuantity), product.batch.availableQuantity);
  }
}
