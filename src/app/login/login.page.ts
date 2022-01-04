import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private homeSrv: HomeService, private route: ActivatedRoute, private router: Router) { }

  username  = '';
  password = '';

  respUser: string;
  respPass: string;

  c: Account = new Account();

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

        if (response.type === 'Seller') {
          this.router.navigate(['/all-product']);
        }else {
          console.log("loggato, storage = ", sessionStorage)
          this.router.navigate(['/store']);
        }
    } else {
        alert('Authentication failed.');
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

}
