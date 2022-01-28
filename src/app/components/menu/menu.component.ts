import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorePage } from 'src/app/store/store.page';

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
  isStore(){
    if(window.location.href.includes('store') || window.location.href.includes('all-product'))return true;
    return false;
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
    this.router.navigate(['/upload-product'],{
      replaceUrl : true
     });
  }

  logout(){
    sessionStorage.clear();
    window.location.replace('/home');
  }

}
