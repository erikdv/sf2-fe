import {Component, Input, OnInit} from '@angular/core';
import {Message} from "./models/message";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from "ngx-markdown";
import { CommentService } from '../../service/comment.service';
import { CommentResponse } from './models/comment';

@Component({
    selector: 'app-message',
    imports: [
        RouterLink,
        NgIf,
        NgForOf,
        FormsModule,
        MarkdownModule
    ],
    templateUrl: './message.component.html',
    styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit {
  @Input() message: Message | undefined;

  constructor(private commentService: CommentService) {}

  showContent = true;

  // comments state
  commentsVisible = false;
  comments: CommentResponse[] = [];
  commentCount: number | null = null;
  loadingComments = false;
  posting = false;
  newComment = '';
  error?: string;

  ngOnInit(): void {
    if (this.message?.id) {
      this.loadCommentCount();
    }
  }

  showMessageContent(): void {
    this.showContent = !this.showContent;
  }

  toggleComments(): void {
    this.commentsVisible = !this.commentsVisible;
    if (this.commentsVisible && this.comments.length === 0) {
      this.fetchComments();
    }
  }

  fetchComments(): void {
    if (!this.message?.id) return;
    this.loadingComments = true;
    this.commentService.getComments(this.message.id).subscribe({
      next: (comments) => {
        this.comments = comments;
        this.loadingComments = false;
      },
      error: (e) => {
        this.error = 'Failed to load comments';
        this.loadingComments = false;
      }
    });
  }

  loadCommentCount(): void {
    if (!this.message?.id) return;
    this.commentService.getCommentCount(this.message.id).subscribe({
      next: (res) => this.commentCount = res.count,
      error: () => this.commentCount = 0
    });
  }

  submitComment(): void {
    if (!this.message?.id || !this.newComment.trim() || this.posting) return;
    this.posting = true;
    this.commentService.postComment({ messageId: this.message.id, content: this.newComment.trim() }).subscribe({
      next: () => {
        this.newComment = '';
        this.posting = false;
        // refresh list and count
        this.fetchComments();
        this.loadCommentCount();
        if (!this.commentsVisible) this.commentsVisible = true;
      },
      error: () => {
        this.error = 'Failed to post comment';
        this.posting = false;
      }
    });
  }

  options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    month: '2-digit',
    day: '2-digit',
  };

  formatDate(date: Date | string): string {
    const d = new Date(date);
    return d.toLocaleString("nl-NL", this.options).replace(",", "");
  }
}
