import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerAccountService } from '../service/customeraccount.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRoleGuard implements CanActivate {
  constructor(private auth : CustomerAccountService, private router : Router){}
  canActivate(route : ActivatedRouteSnapshot){
    if(this.auth.isAuthenticated()){
      let role = sessionStorage.getItem('role');
      if(!route.data.role || route.data.role==role)
        return true;
      alert("You have not the permission.")
      window.history.back();
      return false;
    } 
    alert("You are not logged in.")
    this.router.navigate(['/login']);
    return false;
  }
  
}
