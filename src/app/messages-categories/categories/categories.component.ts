import {Component, EventEmitter, Output} from '@angular/core';
import {CategoryService} from "../../service/category.service";
import {Category} from "./models/category";
import {MessageComponent} from "../message/message.component";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    MessageComponent,
    NgForOf,
    RouterLink
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  @Output() categoryEvent = new EventEmitter<string>();

  categories : Category[] = [];
  errorMessage!: string;
  selectedCategory: string = "all"

  constructor(private dataService:CategoryService) {}

  selectCategory(category: string) {
    this.selectedCategory = category
    this.categoryEvent.emit(this.selectedCategory);
    console.log(this.selectedCategory)
  }

  ngOnInit() {
    this.dataService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories.sort((a, b) => {
          return a.order - b.order;
        });
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }

}
