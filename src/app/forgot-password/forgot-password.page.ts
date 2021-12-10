import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerAccountService } from '../service/customeraccount.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  email = '';

  constructor(private customerAccountService: CustomerAccountService, private route: ActivatedRoute) { }

  ngOnInit() { }

  cantSend()  {
    if (!this.email)  {
      return false;
    }
    return true;
  }

  submit()  {

  }

}
