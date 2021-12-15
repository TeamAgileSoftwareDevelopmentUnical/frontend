import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../models/account';
import { CustomerAccount } from '../models/customeraccount';
import { CustomerAccountService } from '../service/customeraccount.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private customerAccountService: CustomerAccountService, private route: ActivatedRoute, private router: Router) { }

  username  = '';
  password = '';

  respUser: string;
  respPass: string;

  c: Account = new Account();

  ngOnInit() {
  }

  submit(){
    this.c.username = this.username;
    this.c.password = this.password;
    this.customerAccountService.login(this.c)
    .subscribe((response: any) => {
      if (response) {
        sessionStorage.setItem( 'token', response.token);
        sessionStorage.setItem( 'username', response.username);

        this.router.navigate(['/profile']);
    } else {
        alert('Authentication failed.');
    }
      console.log('Customer : ',response);
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
