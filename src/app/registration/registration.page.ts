import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerAccount } from '../models/customeraccount';
import { SellerAccount } from '../models/selleraccount';
import { CustomerAccountService } from '../service/customeraccount.service';
import { HomeService } from '../service/home.service';
import { SellerAccountService } from '../service/selleraccount.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  constructor(private homeSrv : HomeService,
              private formBuilder: FormBuilder,private route: Router,) { }

  customerAccount : CustomerAccount;
  sellerAccount: SellerAccount;

  accountForm = this.formBuilder.group({
    username : ['', [Validators.required, Validators.minLength(6)]],
    password : ['', [Validators.required, 
      // Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$@$!%*?&].{8,}"),
                      Validators.minLength(6)]],
    name : ['', Validators.required],
    surname : ['', Validators.required],
    email : ['', Validators.required],
  });
  accountType : string;

  ngOnInit() {
  }

  submit(){
    console.log("form = ", this.accountForm.value);
    if(this.accountType && this.accountType === "s"){
      this.sellerAccount = new SellerAccount();
      this.sellerAccount = this.accountForm.value;
      this.homeSrv.createSeller(this.sellerAccount)
      .subscribe((response: boolean) => {
        if(response){
          this.route.navigate(['/login']);
        }
        else{
          alert('Registration failed.');
        }
      },(error : HttpErrorResponse)=>{
        console.log("Error : ", error);
      }
      );
    }else{
      this.customerAccount = new CustomerAccount();
      this.customerAccount = this.accountForm.value;
      this.homeSrv.createCustomer(this.customerAccount)
      .subscribe((response: boolean) => {
        if(response){
          this.route.navigate(['/login']);
        }else {
          alert('Registration failed.');
      }
      },(error : HttpErrorResponse)=>{
        console.log("Error : ", error);
      }
      );
    }


  }

  cantSubmit(){//TODO: redo
    if(!this.accountForm.value.name || !this.accountForm.value.surname || !this.accountForm.value.email 
        || !this.accountForm.value.username || !this.accountForm.value.password || !this.accountType){
          return true;
        }
    return false;
  }
  selectType(event : any){
    this.accountType = event.target.value;
  }


  

}
