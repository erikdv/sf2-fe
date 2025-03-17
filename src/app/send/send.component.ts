import {HttpClient} from '@angular/common/http';
import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Category} from "../messages-categories/categories/models/category";
import {CategoryService} from "../service/category.service";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-send',
    templateUrl: './send.component.html',
    styleUrls: ['./send.component.css'],
    imports: [ReactiveFormsModule, NgForOf, RouterLink, NgIf]
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
  showNewMessageForm : boolean = false
  selectedCategory = '';

  constructor(
    private dataService:CategoryService,
    private cookieService: CookieService
  ) {}

  @Output() categorySelectedEvent = new EventEmitter<string>();

  ngOnInit() {
    this.getCategories();
  }

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
        this.categorySelectedEvent.emit(this.selectedCategory);
        this.cookieService.set('category', this.selectedCategory, { expires: 7, path: '/' });
        window.location.reload()
      })
  }

  showForm() {
    this.showNewMessageForm = ! this.showNewMessageForm
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
