import { Component } from '@angular/core';
import {CategoryService} from "../service/category.service";
import {Category} from "./models/category";
import {MessageComponent} from "../message/message.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    MessageComponent,
    NgForOf
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  categories : Category[] = [];
  errorMessage!: string;

  constructor(private dataService:CategoryService) {}

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
