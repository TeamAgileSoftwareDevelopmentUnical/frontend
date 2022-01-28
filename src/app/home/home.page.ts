import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private router: Router) { 
  }

  ngOnInit() {
    sessionStorage.clear();
    // console.log("session = " , sessionStorage)
  }
  registration(){
    this.router.navigate(['/registration'],{
      replaceUrl : true
     });
  }
  login(){
    this.router.navigate(['/login'],{
      replaceUrl : true
     });
  }

}
