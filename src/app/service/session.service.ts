import {inject, Injectable} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {AuthResponseInterface} from "../interface/authresponse.interface";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  http = inject(HttpClient);
  constructor(private cookieService: CookieService) {}

  public isLoggedIn(): boolean {

    const sessionExpirationCookieValue = this.cookieService.get('sessionExpirationTime');
    const sessionRefreshExpirationCookieValue = this.cookieService.get('sessionRefreshExpirationTime');

    if (!sessionExpirationCookieValue) {
      return false;
    }

    const sessionExpirationTime = Number(sessionExpirationCookieValue)
    const sessionRefreshExpirationTime = Number(sessionRefreshExpirationCookieValue)

    const currentTime = Math.floor(Date.now());
    if (currentTime < sessionExpirationTime) {
      return true
    }
    else if(currentTime < sessionRefreshExpirationTime ) {
      this.http
        .post<AuthResponseInterface>(
          '/api/auth/refresh',
          { withCredentials: true }
        )
        .subscribe((response: AuthResponseInterface) => {
          document.cookie = `username=${response.username}`;
          document.cookie = `sessionExpirationTime=${response.sessionExpirationTime.toString()}`;
        });
      return true
    }
    else {
      return false
    }
  }

}
