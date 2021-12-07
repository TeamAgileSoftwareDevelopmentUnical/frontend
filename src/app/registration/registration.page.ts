import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerAccount } from '../models/customeraccount';
import { SellerAccount } from '../models/selleraccount';
import { CustomerAccountService } from '../service/customeraccount.service';
import { SellerAccountService } from '../service/selleraccount.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  constructor(private customerAccountService : CustomerAccountService, private sellerAccountService: SellerAccountService) { }

  customerAccount : CustomerAccount = new CustomerAccount();
  sellerAccount: SellerAccount = new SellerAccount();

  ngOnInit() {
  }

  submitSeller(){
    this.sellerAccount.name="Pippo";
    this.sellerAccount.surname="Pluto";
    this.sellerAccount.username="pippopluto";
    this.sellerAccount.password="ciaopippo";
    this.sellerAccountService.create(this.sellerAccount).subscribe((response: SellerAccount) => { console.log("Seller: ",response);},
    (error : HttpErrorResponse)=>{
      console.log("Error : ", error);}
    );
  }

  submit(){
    this.customerAccountService.create(this.customerAccount)
    .subscribe((response: CustomerAccount) => {
      console.log("Customer : ",response);
    },(error : HttpErrorResponse)=>{
      console.log("Error : ", error);
    }
    );

  }

  cantSubmit(){
    if(this.customerAccount && (!this.customerAccount.username || !this.customerAccount.password  || !this.customerAccount.name  || !this.customerAccount.surname)){
      return true;
    }
    return false;
  }

}
