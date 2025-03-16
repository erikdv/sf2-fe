import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Category {
  slug: string;
  title: string;
  order: number;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiUrl = '/api/category';

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }
}
