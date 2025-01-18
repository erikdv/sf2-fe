import {HttpClient} from '@angular/common/http';
import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Category} from "../categories/models/category";
import {CategoryService} from "../service/category.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf],
})
export class SendComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);

  form = this.fb.nonNullable.group({
    content: ['', Validators.required],
    title: ['', Validators.required],
    category: ['', Validators.required]
  });

  categories : Category[] = [];
  errorMessage!: string;

  constructor(private dataService:CategoryService) {}

  ngOnInit() {
    this.getCategories();
  }

  selectedCategory = 'option2';
  onSelected(value:string): void {
    this.selectedCategory = value;
  }

  onSubmit(): void {

    this.http
      .post(
        '/api/message',
        {
          title: this.form.getRawValue().title,
          content: this.form.getRawValue().content,
          category: this.form.getRawValue().category
        }
      )
      .subscribe(() => {
        window.location.reload()
      })
  }

  private getCategories() {
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
