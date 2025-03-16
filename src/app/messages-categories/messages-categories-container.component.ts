import {Component} from '@angular/core';
import {MessagesComponent} from "./messages/messages.component";
import {CategoriesComponent} from "./categories/categories.component";
import {AllMessagesButtonComponent} from "./all-messages-button/all-messages-button.component";

@Component({
  selector: 'app-messages-categories',
  standalone: true,
  imports: [
    MessagesComponent,
    CategoriesComponent,
    AllMessagesButtonComponent
  ],
  templateUrl: './messages-categories-container.component.html',
  styleUrl: './messages-categories-container.component.css'
})
export class MessagesCategoriesContainerComponent {
  activeCategory = ''

  receiveCategoryEvent(event: string) {
    this.activeCategory = event
  }
}
