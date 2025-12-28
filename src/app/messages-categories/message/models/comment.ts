export interface CommentResponse {
  content: string;
  author?: string;
  createdAt?: string | Date;
}

export interface NewCommentRequest {
  messageId: string;
  content: string;
}

export interface CommentCountResponse {
  messageId: string;
  count: number;
}
