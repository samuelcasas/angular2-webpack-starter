import { Component } from '@angular/core';
import { UserService } from "../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: 'login-form',
  templateUrl: './login-form.template.html',
  styles: [
    require('./login-form.style.scss')
  ]
})
export class LoginFormComponent {
  user = {
    name: null,
    password: null
  };

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((data) => console.log(data));
  }

  login() {
    this.userService.login(this.user.name, this.user.password).subscribe(() => {
      this.router.navigate([''])
    }, (err)=> console.log(err));
  }
}
