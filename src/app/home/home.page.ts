import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor() { }

  ngOnInit() {
    sessionStorage.clear();
    console.log("session = " , sessionStorage)
  }

}
