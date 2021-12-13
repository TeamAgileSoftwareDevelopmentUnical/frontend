import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  
  customerAccount: CustomerAccount;
  sellerAccount: SellerAccount;

  constructor(private customerAccountService: CustomerAccountService, private sellerAccountService: SellerAccountService,
              private formBuilder: FormBuilder,private route: Router,) { }

  accountForm = this.formBuilder.group({
    username : '',
    password : '',
    name : '',
    surname : '',
    email : '',
  });
  accountType: string;

  ngOnInit() {
  }

  submit(){
    console.log("form = ", this.accountForm.value)
    if(this.accountType && this.accountType === "s"){
      this.sellerAccount = new SellerAccount();
      this.sellerAccount = this.accountForm.value;
      this.sellerAccountService.create(this.sellerAccount)
      .subscribe((response: SellerAccount) => {
        console.log("Seller : ",response);
        this.route.navigate(['/login']);
      },(error: HttpErrorResponse)=>{
        console.log("Error : ", error);
      }
      );
    }else{
      this.customerAccount = new CustomerAccount();
      this.customerAccount = this.accountForm.value;
      this.customerAccountService.create(this.customerAccount)
      .subscribe((response: CustomerAccount) => {
        console.log("Customer : ",response);
        this.route.navigate(['/login']);
      },(error: HttpErrorResponse)=>{
        console.log("Error : ", error);
      }
      );
    }


  }

  cantSubmit(){//TODO: redo
    if(this.customerAccount && (!this.customerAccount.username || !this.customerAccount.password  || !this.customerAccount.name  || !this.customerAccount.surname)){
      return true;
    }
    return false;
  }
  selectType(event: any){
    this.accountType = event.target.value;
  }

}
