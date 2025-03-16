import {Component, EventEmitter, Output} from '@angular/core';
import {CategoryService} from "../../service/category.service";

@Component({
  selector: 'app-all-messages-button',
  standalone: true,
  imports: [],
  templateUrl: './all-messages-button.component.html',
  styleUrl: './all-messages-button.component.css'
})
export class AllMessagesButtonComponent {

  selectedCategory: string = "all"
  @Output() categorySelectedEvent = new EventEmitter<string>();

  selectCategory(category: string) {
    this.selectedCategory = category
    this.categorySelectedEvent.emit(this.selectedCategory);
  }
}
