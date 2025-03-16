import {Component, inject} from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {LogoutComponent} from "../logout/logout.component";
import {NgIf} from "@angular/common";
import {RegisterComponent} from "../register/register.component";
import {SendComponent} from "../send/send.component";
import {SessionService} from "../service/session.service";

@Component({
    selector: 'app-topbar',
    imports: [
        LoginComponent,
        LogoutComponent,
        NgIf,
        RegisterComponent,
        SendComponent
    ],
    templateUrl: './topbar.component.html',
    styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  sessionService = inject(SessionService);

  showLogin = false
  showRegister = false

  onSelectRegister() {
    this.showRegister = true
    this.showLogin = false
  }

  onSelectLogin() {
    this.showLogin = true
    this.showRegister = false
  }
}
