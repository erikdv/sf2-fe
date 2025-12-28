import {Component, Input, SimpleChanges, OnDestroy} from '@angular/core';
import {MessageService} from '../../service/message.service';
import {Message} from "./models/message";
import {NgForOf} from "@angular/common";
import {MessageComponent} from "../message/message.component";
import {CookieService} from "ngx-cookie-service";
import { MessageEventsService } from "../../service/message-events.service";
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-messages',
    imports: [
        NgForOf,
        MessageComponent
    ],
    templateUrl: './messages.component.html',
    styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnDestroy {
  messages: Message[] = [];
  errorMessage!: string;
  @Input() selectedCategory!: string;

  private messageEventsSub?: Subscription;

  constructor(
    private dataService: MessageService,
    private cookieService: CookieService,
    private messageEvents: MessageEventsService
  ) {}

  ngOnInit() {
    const cookieCategory = this.cookieService.get('category');
    const initialCategory = cookieCategory ? cookieCategory : (this.selectedCategory ? this.selectedCategory : 'all');
    this.getMessages(initialCategory);

    this.messageEventsSub = this.messageEvents.messagePosted$.subscribe(() => {
      const currentCategory = this.cookieService.get('category') || (this.selectedCategory && this.selectedCategory.length > 0 ? this.selectedCategory : 'all');
      this.getMessages(currentCategory);
    });
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

  ngOnDestroy(): void {
    if (this.messageEventsSub) {
      this.messageEventsSub.unsubscribe();
    }
  }
}
