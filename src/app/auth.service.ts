import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private cookie:CookieService
  ) { }

  isLoggedIn():boolean{
    let auth=this.cookie.get('LOGGED_IN')
    if(auth!='TRUE'){
      return false
    }

    return true
  }
}
