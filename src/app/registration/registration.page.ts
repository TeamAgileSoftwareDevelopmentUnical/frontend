import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
              private formBuilder: FormBuilder,private route: Router, private alertController:AlertController) { }

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
  accountType: string;

  ngOnInit() {}

  submit(){
    // console.log('form = ', this.accountForm.value);
    if(this.accountType && this.accountType === 's'){
      this.sellerAccount = new SellerAccount();
      this.sellerAccount = this.accountForm.value;
      this.homeSrv.createSeller(this.sellerAccount)
      .subscribe((response: any) => {
        this.showSuccess();
      },(error: HttpErrorResponse)=>{
        if(error){
          // console.log('Error : ', error);
          this.showError(error.error);
        }
      }
      );
    }else{
      this.customerAccount = new CustomerAccount();
      this.customerAccount = this.accountForm.value;
      this.homeSrv.createCustomer(this.customerAccount)
      .subscribe((response: Response) => {
          this.showSuccess();
      },(error : HttpErrorResponse)=>{
        if(error){
          // console.log("Error : ", error.error);
          this.showError(error.error);
        }
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
  selectType(event: any){
    this.accountType = event.target.value;
  }
  async showError(error: string) {
    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      header: 'Registration failed.',
      message: error+' already exist.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
  }
  async showSuccess() {
    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      header: 'Registration success.',
      message: 'Account created, you can login.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.route.navigate(['/login']);
    // console.log('onDidDismiss resolved with role', role);
  }


  

}
