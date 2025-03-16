import {Component, Input} from '@angular/core';
import {Message} from "./models/message";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  @Input() message: Message | undefined;

  constructor() {
  }

  showContent = true;

  showMessageContent(): void {
    this.showContent = !this.showContent;
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
