import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../messages-categories/message/models/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  apiUrl = '/api/messages';

  constructor(private http: HttpClient) {}

  getMessages(slug: string): Observable<Message[]> {
    if (slug === 'all') {
      return this.http.get<Message[]>(this.apiUrl);
    } else {
      return this.http.get<Message[]>(`${this.apiUrl}?slug=${slug}`);
    }
  }
}
