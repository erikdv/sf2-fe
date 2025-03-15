import { Component } from '@angular/core';
import {MessagesComponent} from "./messages/messages.component";
import {CategoriesComponent} from "./categories/categories.component";

@Component({
  selector: 'app-messages-categories',
  standalone: true,
  imports: [
    MessagesComponent,
    CategoriesComponent
  ],
  templateUrl: './messages-categories-container.component.html',
  styleUrl: './messages-categories.component.css'
})
export class MessagesCategoriesContainerComponent {

}
