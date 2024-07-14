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

  constructor(private data_service: DataService) {}

  ngOnInit() {
    this.data_service.getAllPosts().subscribe({
      next: (posts) => {
        this.messages = posts;
        console.log(this.messages);
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }

}
