import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userName: String;

  constructor() {
    this.userName = sessionStorage.getItem("username");
  }

  ngOnInit() {
    
  }

}
