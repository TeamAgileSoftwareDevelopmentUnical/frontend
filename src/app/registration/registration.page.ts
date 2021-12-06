import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerAccount } from '../models/customeraccount';
import { CustomerAccountService } from '../service/customeraccount.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  constructor(private customerAccountService : CustomerAccountService, private route: ActivatedRoute,) { }

  customerAccount : CustomerAccount = new CustomerAccount();

  ngOnInit() {
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
