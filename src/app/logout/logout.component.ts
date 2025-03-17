import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
    selector: 'app-logout',
    imports: [
        RouterLink
    ],
    templateUrl: './logout.component.html',
    styleUrl: './logout.component.css'
})
export class LogoutComponent {

  constructor(private cookieService: CookieService) {}

  logout(): void {
    this.cookieService.delete("sessionExpirationTime")
    this.cookieService.delete("username")
  }
}
