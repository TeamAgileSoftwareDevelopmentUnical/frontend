import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  @Input() title : string;

  ngOnInit() {}

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/home']);
  }
}
