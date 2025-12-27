import {Component} from '@angular/core';
import { HeaderComponent} from "./header/header.component";
import {CommonModule} from "@angular/common";
import { CookieService } from 'ngx-cookie-service';
import {TopbarComponent} from "./topbar/topbar.component";
import {MessagesCategoriesContainerComponent} from "./messages-categories/messages-categories-container.component";
import {provideMarkdown} from "ngx-markdown";

@Component({
    selector: 'app-root',
    imports: [
        HeaderComponent,
        CommonModule,
        TopbarComponent,
        MessagesCategoriesContainerComponent,
    ],
    providers: [CookieService, provideMarkdown()],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sf2-fe';

}
