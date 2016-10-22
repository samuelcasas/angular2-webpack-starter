import { AuthHttp } from "angular2-jwt";
import { RequestOptionsArgs, Response } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Observable } from "rxjs";

export class AuthenticatedRequest
{
  constructor( public http: any, public url: string)
  {}

  get(url:string, options?:RequestOptionsArgs){
    return this.http.get(this.getUrl(url), options)
      .map(this.successHandler)
      .catch(this.errorHandler);
  }

  post(url:string, body:any, options?:RequestOptionsArgs){
    return this.http.post(this.getUrl(url), body, options)
      .map(this.successHandler)
      .catch(this.errorHandler);
  }

  public errorHandler (error: any){
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw({
      data: error.json(),
      statusCode: error.status,
      message: errMsg
    });
  }

  private successHandler (response: Response){
    return response.json();
  }

  getUrl(url: string){
    if(url === '/') return this.url;
    return this.url+'/'+ url;
  }
}
