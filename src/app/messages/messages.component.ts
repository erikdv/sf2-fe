import { Component } from '@angular/core';
import { DataService } from '../service/data.service';
import { Message} from "./models/message";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  messages: Message[] = [];
  errorMessage!: string;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getAllMessages().subscribe({
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

  options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    month: '2-digit',
    day: '2-digit',
  };

  formatDate(date: Date): string {
    date = new Date(date);
    return date.toLocaleString("nl-NL", this.options).replace(",", "");
  }
}
