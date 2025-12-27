import {Component, OnInit} from '@angular/core';
import {MessagesComponent} from "./messages/messages.component";
import {CategoriesComponent} from "./categories/categories.component";
import {AllMessagesButtonComponent} from "./all-messages-button/all-messages-button.component";
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-messages-categories',
    imports: [
        MessagesComponent,
        CategoriesComponent,
        AllMessagesButtonComponent
    ],
    templateUrl: './messages-categories-container.component.html',
    styleUrl: './messages-categories-container.component.css'
})
export class MessagesCategoriesContainerComponent implements OnInit {
  activeCategory = 'all'

  constructor(private cookieService: CookieService) {}

  ngOnInit() {
    const storedCategory = this.cookieService.get('category');
    if (storedCategory) {
      this.activeCategory = storedCategory;
    }
  }

  receiveCategoryEvent(event: string) {
    this.activeCategory = event
  }
}
