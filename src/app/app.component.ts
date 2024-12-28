import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent} from "./header/header.component";
import {MessagesComponent} from "./messages/messages.component";
import {LoginComponent} from "./login/login.component";
import {SessionService} from "./service/session.service";
import {NgIf, CommonModule} from "@angular/common";
import {SendComponent} from "./send/send.component";
import {RegisterComponent} from "./register/register.component";
import {LogoutComponent} from "./logout/logout.component";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MessagesComponent, LoginComponent, NgIf, CommonModule, SendComponent, RegisterComponent, LogoutComponent],
  providers: [CookieService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  sessionService = inject(SessionService);
  title = 'sf2-fe';
  showLogin = false
  showRegister = false

  onSelectRegister(register: boolean) {
    this.showRegister = true
    this.showLogin = false
  }

  onSelectLogin(login: boolean) {
    this.showLogin = true
    this.showRegister = false
  }
}
