import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from "../services/user.service";

@Injectable()
export class AlreadyLoggedInGuard implements CanActivate {

  constructor(private user: UserService, private router:Router) {}

  canActivate() {
    if(this.user.loggedIn()){
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
