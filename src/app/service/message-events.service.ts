import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageEventsService {
  private messagePostedSubject = new Subject<void>();

  // Observable that components can subscribe to in order to know when a new message was posted
  get messagePosted$(): Observable<void> {
    return this.messagePostedSubject.asObservable();
  }

  // Call this after successfully posting a message
  notifyMessagePosted(): void {
    this.messagePostedSubject.next();
  }
}
