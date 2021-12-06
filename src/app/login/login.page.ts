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

  ngOnInit() {
  }

  submit(){
    this.customerAccountService.login(this.username, this.password)
    .subscribe((response: CustomerAccount) => {
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
