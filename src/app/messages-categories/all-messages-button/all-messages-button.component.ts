import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-all-messages-button',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './all-messages-button.component.html',
  styleUrl: './all-messages-button.component.css'
})
export class AllMessagesButtonComponent {

  @Output() categorySelectedEvent = new EventEmitter<string>();
  @Input() selectedCategory!: string;

  selectCategory(category: string) {
    this.selectedCategory = category
    this.categorySelectedEvent.emit(this.selectedCategory);
  }
}
