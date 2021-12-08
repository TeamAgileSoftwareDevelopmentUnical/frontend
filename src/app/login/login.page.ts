import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerAccount } from '../models/customeraccount';
import { CustomerAccountService } from '../service/customeraccount.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private customerAccountService : CustomerAccountService, private route: ActivatedRoute, private router: Router) { }

  username : string = "";
  password : string = "";

  respUser : string;
  respPass : string;

  c : CustomerAccount = new CustomerAccount();
  
  ngOnInit() {
  }

  submit(){
    this.c.username = this.username;
    this.c.password = this.password;
    this.customerAccountService.login(this.c)
    .subscribe((response: CustomerAccount) => {
      if (response) {
        sessionStorage.setItem( 'token', btoa(this.username + ':' + this.password) );
        sessionStorage.setItem( 'username', this.username );

        console.log("sessoin details", sessionStorage)

        this.router.navigate(['/profile']);
        console.log(response)
    } else {
        alert("Authentication failed.");
    }
      console.log("Customer : ",response);
    },(error : HttpErrorResponse)=>{
      console.log("Error : ", error);
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
