import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';



@Injectable({
  providedIn: 'root',
})
export class SessionService {

  constructor(private cookieService: CookieService) {}

  public isLoggedIn(): boolean {

    const sessionExpirationCookieValue = this.cookieService.get('sessionExpirationTime');

    if (!sessionExpirationCookieValue) {
      return false;
    }

    const sessionExpirationTime = Number(sessionExpirationCookieValue)

    const currentTime = Math.floor(Date.now());
    return currentTime < sessionExpirationTime;
  }

}
