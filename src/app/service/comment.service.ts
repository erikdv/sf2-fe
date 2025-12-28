import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentResponse, CommentCountResponse, NewCommentRequest } from '../messages-categories/message/models/comment';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private readonly baseUrl = '/api/comments';

  constructor(private http: HttpClient) {}

  getComments(messageId: string): Observable<CommentResponse[]> {
    const params = new HttpParams().set('messageId', messageId);
    return this.http.get<CommentResponse[]>(this.baseUrl, { params });
  }

  getCommentCount(messageId: string): Observable<CommentCountResponse> {
    const params = new HttpParams().set('messageId', messageId);
    return this.http.get<CommentCountResponse>(`${this.baseUrl}/count`, { params });
  }

  postComment(req: NewCommentRequest): Observable<void> {
    return this.http.post<void>(this.baseUrl, req);
  }
}
