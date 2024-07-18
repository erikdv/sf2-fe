import { Component } from '@angular/core';
import { DataService } from '../service/data.service';
import { Message} from "./models/message";
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

}
