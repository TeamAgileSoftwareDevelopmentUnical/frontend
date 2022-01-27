import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { CustomerAccount } from '../models/customeraccount';
import { SellerAccount } from '../models/selleraccount';
import { Account } from '../models/account';
import { CustomerAccountService } from '../service/customeraccount.service';
import { SellerAccountService } from '../service/selleraccount.service';
import {AlertController} from "@ionic/angular";
import { StorePage } from '../store/store.page';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private customerAccountService: CustomerAccountService, private sellerAccountService: SellerAccountService,
              private route: ActivatedRoute, private router: Router,
              private alertCtrl: AlertController) { }

  // customerAccount : CustomerAccount;
  // sellerAccount: SellerAccount;
  id: number; //it's a Long in Java
  account : Account;
  mod: boolean = false;

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap =>{
      this.id = +paramMap.get('id');
      console.log("id = ", this.id)
      console.log("token = ",  sessionStorage.getItem('token'))
    });
     this.getAccount();
  }

  getAccount(){
    //TO DO: same but with seller account and add an IF?
    this.customerAccountService.getCustomerAccount(this.id).subscribe(
      (response: any) => {
        console.log("Account: ",response);
        this.account = response;
      },(error: HttpErrorResponse) => {
        console.log("Error in finding a customer account: ", error);
      }
    );
  }

  modifyAccount(){
    this.mod = !this.mod;

  }

  submitAccount(){console.log("CIAO", this.account);
    //TO DO: same but with seller account and add an IF?
    this.customerAccountService.update(this.account).subscribe(
      (response: any) => {
      console.log("Account : ",response);
      this.mod = false;
    },(error : HttpErrorResponse)=>{
      console.log("Error in updating a customer account: ", error);
    }
    );
  }

  deleteAccount(id: number) {
    this.showAlert('Account Delete','Are you really want to delete this account?','/loin',id);
  }

  showPurchases(){
    StorePage.instance.getNavCtrl().navigateForward('/purchases/'+this.id);
  }

  async showAlert(headers: string, messages: string, redirectTo: string, id: number){
    const alert = await this.alertCtrl.create({
      header: headers,
      message: messages,
      buttons: [
        {
          text: 'Agree',
          handler: ()=>{
            this.customerAccountService.delete(id)
              .subscribe((response: boolean) => {
                if (response){
                  sessionStorage.clear();
                  this.router.navigate(['/login']);
                }
              });
          }
        },
        {
          text: 'Disagree',
          handler: ()=>{
            alert.dismiss();
          }
        }
      ]
    });
    await alert.present();
  }

  changeAddress(id: number) {
    console.log(id);
  }
  getId(){
    return sessionStorage.getItem( 'id');
  }
  isSeller(){
    if(sessionStorage.getItem('role')==="Seller"){
      return true;
    }
    return false;
  }
  notFilled(){
    if(!this.account.name || this.account.name=="" || !this.account.surname || this.account.surname=="" || !this.account.email || 
        !this.account.email.match("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$") || this.account.email==""){
          return true;
        }
    return false;
  }
}
