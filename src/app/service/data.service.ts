import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Message {
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiUrl = '/api/messages';

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<Message[]> {
    return this.http.get<Message[]>(this.apiUrl);
  }
}
