import { Component } from '@angular/core';
import { UserService } from "../../../services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'navbar',
  template: `
    <nav class="navbar navbar-default navbar-fixed-top" *ngIf="user.loggedIn()">
      <div class="container">
        <div class="navbar-header">
          <button type="button"
            (click)="isCollapsed = !isCollapsed"
            class="navbar-toggle collapsed"
            data-toggle="collapse" 
            data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
          </button>
          <a (click)="isCollapsed = true" class="navbar-brand hidden-sm hidden-md hidden-lg logo-holder" [routerLink]=" ['./'] ">
            <div class="logo"></div>
          </a>
        </div>
        <div id="navbar" class="collapse navbar-collapse" [attr.aria-expanded]="!isCollapsed" [ngClass]="{collapse: isCollapsed}">
          <ul class="nav navbar-nav">
          <li (click)="isCollapsed = true" class="nav-item">
            <a class="navbar-brand hidden-xs logo-holder" [routerLink]="['./']">
             <div class="logo"></div>
            </a>
          </li>
            <li (click)="isCollapsed = true" routerLinkActive="active" [routerLinkActiveOptions]="{exact:
true}"><a [routerLink]="['./']">Inicio</a></li>
            <li (click)="isCollapsed = true" routerLinkActive="active"><a [routerLink]="['./orden/nueva']">Crear Orden</a></li>
          </ul>
          <ul class="nav navbar-nav pull-right">
          <li><a href="#" (click)="logout()">Cerrar Sesion</a></li>
</ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
`
})

export class Navbar {
  isCollapsed = true;
  project = {
    name: 'MXP'
  };

  constructor(private user: UserService, private router:Router) {}

  logout(){
    this.user.logout();
    this.router.navigate(['iniciar-sesion']);
  }
}
