import { Injectable } from '@angular/core';
import { UserDataService } from '../services/user-data.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  userRole: string;

    constructor(private authService: UserDataService, private router: Router) {
       
    }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const  isAuth: boolean = localStorage.getItem('token') !== null;
          if(!isAuth){
              this.router.navigate(['']);
              return false;
          }
          return isAuth;



  }
}

