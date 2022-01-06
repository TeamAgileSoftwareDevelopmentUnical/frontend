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
  @Input() id : number;

  @Input() store : boolean;
  @Input() product : boolean;
  @Input() account : boolean;
  @Input() addProd : boolean;

  ngOnInit() {}

  back(){
    window.history.back();
  }
  canBack(){
    if( document.referrer.indexOf('upload') >= 0){
      return false;
    }
    return true;
  }

  storage(){
    this.router.navigate(['/store']);
  }

  products(){
    this.router.navigate(['/all-product']);
  }

  profile(){
    this.router.navigate(['/profile/'+this.id]);
  }

  addProduct(){
    this.router.navigate(['/upload-product']);
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/home']);
  }

}
