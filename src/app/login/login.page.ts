import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerAccount } from '../models/customeraccount';
import { CustomerAccountService } from '../service/customeraccount.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private customerAccountService : CustomerAccountService, private route: ActivatedRoute,) { }

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
        sessionStorage.setItem(
          'token',
          btoa(this.respUser + ':' + this.respPass)
        );
        console.log("se", sessionStorage)
        console.log("acc= ",sessionStorage.getItem)
        // this.router.navigate(['']);
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
