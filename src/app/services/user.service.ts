import { Injectable } from '@angular/core';
import { Locker } from "angular2-locker";
import { isNull } from "util";
import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthHttp } from "angular2-jwt";
import { AuthenticatedRequest } from "./authenticated-request";

@Injectable()
export class UserService {

  constructor(private locker: Locker, private regHttp: Http, public ahttp: AuthHttp) {
  }

  loggedIn(): Boolean {
    return !isNull(this.locker.get('token'));
  }

  notLoggedIn(): Boolean {
    return !this.loggedIn();
  }

  getToken(bearer=false): string {
    return (bearer) ? 'Bearer ' + this.locker.get('token') : this.locker.get('token');
  }

  logout(): void {
    this.locker.remove('refresh');
    this.locker.remove('token');
  }

  login(user: string, password: string) {
    return this.http().post('oauth/token', {
      grant_type: 'password',
      client_id: process.env.LOGIN_ID,
      client_secret: process.env.LOGIN_SECRET,
      username: user,
      password: password
    })
      .map((data) => {
        this.locker.set('token', data.access_token);
        this.locker.set('refresh', data.refresh_token);

        return data;
      })
  }

  auth(url?:string) {
    return new AuthenticatedRequest(this.ahttp, url || process.env.API_URL);
  }

  http(url?:string) {
    return new AuthenticatedRequest(this.regHttp, url || process.env.API_URL);
  }

  getUrl(url: string){
    if(url === '/') return process.env.API_URL;
    return process.env.API_URL+'/'+ url;
  }
}
