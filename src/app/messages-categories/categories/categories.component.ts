import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CategoryService} from "../../service/category.service";
import {Category} from "./models/category";
import {MessageComponent} from "../message/message.component";
import {NgForOf, NgStyle} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-categories',
    imports: [
        MessageComponent,
        NgForOf,
        RouterLink,
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
