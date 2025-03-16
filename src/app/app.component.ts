import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent} from "./header/header.component";
import {MessagesComponent} from "./messages-categories/messages/messages.component";
import {LoginComponent} from "./login/login.component";
import {NgIf, CommonModule} from "@angular/common";
import {SendComponent} from "./send/send.component";
import {RegisterComponent} from "./register/register.component";
import {LogoutComponent} from "./logout/logout.component";
import { CookieService } from 'ngx-cookie-service';
import {CategoriesComponent} from "./messages-categories/categories/categories.component";
import {TopbarComponent} from "./topbar/topbar.component";
import {MessagesCategoriesContainerComponent} from "./messages-categories/messages-categories-container.component";

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        HeaderComponent,
        MessagesComponent,
        LoginComponent,
        NgIf,
        CommonModule,
        SendComponent,
        RegisterComponent,
        LogoutComponent,
        CategoriesComponent,
        TopbarComponent,
        MessagesCategoriesContainerComponent
    ],
    providers: [CookieService],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sf2-fe';

}
