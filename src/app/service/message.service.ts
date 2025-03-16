import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Message {
  title: string;
  content: string;
  author: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  apiUrl = '/api/messages';

  constructor(private http: HttpClient) {}

  getMessages(slug: String): Observable<Message[]> {
    if (slug === "all") {
      return this.http.get<Message[]>(this.apiUrl);
    } else {
      return this.http.get<Message[]>(this.apiUrl + "?slug=" + slug);
    }
  }
}
