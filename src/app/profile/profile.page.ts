import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

  customerAccount: CustomerAccount;
  sellerAccount: SellerAccount;
  // FIXME: get `id` from localstorage or whatever
  id = 1; //it's a Long in Java

  name: string;
  surname: string;
  mail: string;

  constructor(private customerAccountService: CustomerAccountService, private sellerAccountService: SellerAccountService) { }

  ngOnInit() {
    this.getAccount();
  }

  getAccount(){
    //TO DO: same but with seller account and add an IF?
    this.customerAccountService.getCustomerAccount(this.id).subscribe(
      (response: CustomerAccount) => {
        console.log('Account: ',response);
        this.customerAccount = response;
      },(error: HttpErrorResponse) => {
        console.log('Error in finding a customer account: ', error);
      }
    );
  }

  modifyAccount(){
    //TO DO: same but with seller account and add an IF?
    this.customerAccountService.update(this.customerAccount).subscribe(
      (response: CustomerAccount) => {
      console.log('Customer : ',response);
      this.customerAccount = response;
    },(error: HttpErrorResponse)=>{
      console.log('Error in updating a customer account: ', error);
    });

    let request = {
      id: this.id,
      name: this.name,
      surname: this.surname,
      mail: this.mail,
    };
    // FIXME: update request needs to be adjusted according to this json format
    this.customerAccountService.update(request);

  }

}
