import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerAccount } from '../models/customeraccount';
import { SellerAccount } from '../models/selleraccount';
import { CustomerAccountService } from '../service/customeraccount.service';
import { SellerAccountService } from '../service/selleraccount.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private customerAccountService : CustomerAccountService, private sellerAccountService: SellerAccountService,
    private route : ActivatedRoute,) { }

  customerAccount : CustomerAccount;
  sellerAccount: SellerAccount;
  id: number; //it's a Long in Java

  ngOnInit() {console.log("token = " , sessionStorage.getItem("token"))
    
    this.route.paramMap.subscribe(paramMap =>{
      this.id = +paramMap.get('id');
      console.log("id = ", this.id)
      this.getAccount();
    });
    
  }

  getAccount(){
    //TO DO: same but with seller account and add an IF?
    this.customerAccountService.getCustomerAccount(this.id).subscribe(
      (response: CustomerAccount) => {
        console.log("Account: ",response);
        this.customerAccount = response;
      },(error: HttpErrorResponse) => {
        console.log("Error in finding a customer account: ", error);
      }
    );
  }

  modifyAccount(){
    //TO DO: same but with seller account and add an IF?
    this.customerAccountService.update(this.customerAccount).subscribe(
      (response: CustomerAccount) => {
      console.log("Customer : ",response);
      this.customerAccount = response;
    },(error : HttpErrorResponse)=>{
      console.log("Error in updating a customer account: ", error);
    }
    );
  }

}
