import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Account } from '../models/account';
import { CustomerAccount } from '../models/customeraccount';
import { CustomerAccountService } from '../service/customeraccount.service';
import { HomeService } from '../service/home.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    username  = '';
    password = '';

    respUser: string;
    respPass: string;

    c: Account = new Account();

  constructor(private homeSrv: HomeService, private alertController: AlertController, private router: Router) { }

  ngOnInit() {
    sessionStorage.clear();
  }

  submit(){
    this.c.username = this.username;
    this.c.password = this.password;
    this.homeSrv.login(this.c)
    .subscribe((response: any) => {
      if (response) {
        console.log(response);
        sessionStorage.setItem( 'token', response.jwtToken);
        sessionStorage.setItem( 'id', response.id);
        sessionStorage.setItem( 'role' , response.role);
        sessionStorage.setItem( 'email', response.email);
        sessionStorage.setItem( 'user_name', this.c.username);

        if (response.role === 'Seller') {
          this.router.navigate(['/all-product'],{
            replaceUrl : true
           });
        }else {
          console.log('loggato, storage = ', sessionStorage);
          this.router.navigate(['/store'],{
            replaceUrl : true
           });
        }
    } else {
        this.showError();
    }
    },(error: HttpErrorResponse)=>{
      console.log('Error : ', error);
    }
    );
  }

  cantSubmit(){
    if(!this.username || !this.password){
      return true;
    }
    return false;
  }
  async showError() {
    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      header: 'Authentication failed.',
      message: 'Wrong username or password. Try again.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
  }

}
