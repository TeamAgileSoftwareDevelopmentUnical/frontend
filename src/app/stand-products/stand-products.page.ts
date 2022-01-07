import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductResponse } from '../models/response/productResponse';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-stand-products',
  templateUrl: './stand-products.page.html',
  styleUrls: ['./stand-products.page.scss'],
})
export class StandProductsPage implements OnInit {

  standProducts: ProductResponse[] = [];
  category: string;

  constructor(private route: ActivatedRoute, private service: ProductService) {

  }

  ngOnInit() {
    this.route.params.subscribe(param=>{
      this.category = param['category'];

      console.log(this.category);

      this.service.getProductsByCategory(this.category)
      .subscribe((response: ProductResponse[]) => {
        this.standProducts = response;
        console.log(this.standProducts);
      });
    });
    
  }

}
