import { Component, OnInit } from '@angular/core';
import { StorePage } from '../store/store.page';
import { SellerAccountService } from '../service/selleraccount.service';
import { Account } from '../models/account';



@Component({
  selector: 'app-mailsupport',
  templateUrl: './mailsupport.page.html',
  styleUrls: ['./mailsupport.page.scss'],
})
export class MailsupportPage implements OnInit {

  sellers: Account[] = [];

  userEmail: String = sessionStorage.getItem('email');
  selectedSellerEmail: String = "";
  messageBody: String = "";



  constructor(private service: SellerAccountService) {}

  ngOnInit() {

    this.service.getSellers()
    .subscribe((response: Account[]) => {
      this.sellers = response;
      
      if(this.sellers.length === 0) {
        StorePage.instance.showAlert('Seller', 'There are no registered sellers!');
        StorePage.instance.getNavCtrl().pop();
      }
    });

  }

  submit() {
    if (this.selectedSellerEmail != "" && this.messageBody != "") {
      let result;
      
      this.httpCall(
        'post',
        'http://localhost:3000/sendmail',
        {
          params: {
            "_from": this.userEmail,
            "_to": this.selectedSellerEmail,
            "message": this.messageBody
          }
        },
        result)

      StorePage.instance.showAlert('Mail support','We have successfully forwarded your message for you!')
    }
  }
  
  httpCall(method: string, url:string, data:any, callback:(result:any)=>any) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    if (callback) xhr.onload = function() { callback(JSON.parse(this['responseText'])); };
    if (data != null) {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
    }
    else xhr.send();
  }

}
