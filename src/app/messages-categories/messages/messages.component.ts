import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {MessageService} from '../../service/message.service';
import {Message} from "./models/message";
import {NgForOf} from "@angular/common";
import {MessageComponent} from "../message/message.component";

@Component({
  selector: 'app-messages',
  standalone: true,
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
  @Input() categorySlug!: string;

  constructor(private dataService: MessageService) {
  }

  ngOnInit() {
    this.getMessages("all")
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['categorySlug'] && !changes['categorySlug'].firstChange) {
      this.getMessages(this.categorySlug);
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
