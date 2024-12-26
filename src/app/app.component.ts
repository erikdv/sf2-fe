import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent} from "./header/header.component";
import {MessagesComponent} from "./messages/messages.component";
import {LoginComponent} from "./login/login.component";
import {AuthService} from "./auth.service";
import {NgIf} from "@angular/common";
import {SendComponent} from "./send/send.component";
import {RegisterComponent} from "./register/register.component";
import {LogoutComponent} from "./logout/logout.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MessagesComponent, LoginComponent, NgIf, SendComponent, RegisterComponent, LogoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  authServive = inject(AuthService);
  title = 'sf2-fe';
}
