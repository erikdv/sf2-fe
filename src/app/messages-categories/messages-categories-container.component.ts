import {Component, OnInit, OnDestroy} from '@angular/core';
import {MessagesComponent} from "./messages/messages.component";
import {CategoriesComponent} from "./categories/categories.component";
import {AllMessagesButtonComponent} from "./all-messages-button/all-messages-button.component";
import { CookieService } from 'ngx-cookie-service';
import { MessageEventsService } from '../service/message-events.service';
import { Subscription } from 'rxjs';

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
export class MessagesCategoriesContainerComponent implements OnInit, OnDestroy {
  activeCategory = 'all'
  private messageEventsSub?: Subscription;

  constructor(
    private cookieService: CookieService,
    private messageEvents: MessageEventsService
  ) {}

  ngOnInit() {
    const storedCategory = this.cookieService.get('category');
    if (storedCategory) {
      this.activeCategory = storedCategory;
    }

    // When a message is posted, the SendComponent stores the selected category in cookies.
    // Mirror the previous reload behavior by updating the activeCategory from the cookie.
    this.messageEventsSub = this.messageEvents.messagePosted$.subscribe(() => {
      const current = this.cookieService.get('category');
      this.activeCategory = current && current.length > 0 ? current : 'all';
    });
  }

  ngOnDestroy(): void {
    if (this.messageEventsSub) {
      this.messageEventsSub.unsubscribe();
    }
  }

  receiveCategoryEvent(event: string) {
    this.activeCategory = event
  }
}
