import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from "../services/user.service";

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private user: UserService, private router:Router) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    if(this.user.notLoggedIn()){
      return this.router.navigate(['login',{next: route.url}]);
    }

    return true;
  }
}
