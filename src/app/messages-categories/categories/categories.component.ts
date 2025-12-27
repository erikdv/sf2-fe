import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CategoryService} from "../../service/category.service";
import {Category} from "./models/category";
import {NgForOf, NgStyle} from "@angular/common";

@Component({
    selector: 'app-categories',
    imports: [
        NgForOf,
        NgStyle
    ],
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  @Output() categorySelectedEvent = new EventEmitter<string>();

  categories : Category[] = [];
  errorMessage!: string;
  @Input() selectedCategory!: string;

  constructor(private dataService:CategoryService) {}

  selectCategory(category: string) {
    this.selectedCategory = category
    this.categorySelectedEvent.emit(this.selectedCategory);
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
