import {Component, Input, SimpleChanges} from '@angular/core';
import {MessageService} from '../../service/message.service';
import {Message} from "./models/message";
import {NgForOf} from "@angular/common";
import {MessageComponent} from "../message/message.component";
import {CookieService} from "ngx-cookie-service";

@Component({
    selector: 'app-messages',
    imports: [
        NgForOf,
        MessageComponent
    ],
    templateUrl: './messages.component.html',
    styleUrl: './messages.component.css'
})
export class MessagesComponent {
  messages: Message[] = [];
  errorMessage!: string;
  @Input() selectedCategory!: string;

  constructor(
    private dataService: MessageService,
    private cookieService: CookieService
  ) {
  }

  ngOnInit() {
    let cookieCategory = this.cookieService.get('category')
    if (!cookieCategory) {
      this.getMessages("all")
    } else {
      this.getMessages(cookieCategory)
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedCategory'] && !changes['selectedCategory'].firstChange) {
      this.getMessages(this.selectedCategory);
    }
  }

  getMessages(slug: string) {

    this.dataService.getMessages(slug).subscribe({
      next: (messages) => {
        this.messages = messages.sort((a, b) => {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }).reverse();
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }
}
