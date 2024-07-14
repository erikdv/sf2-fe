import { Injectable, signal } from '@angular/core';

interface JwtPayload {
  exp: number;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn(): boolean {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return false;
    }

    const payload = this.parseJwtPayload(token);
    if (!payload) {
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp > currentTime;
  }

  private parseJwtPayload(token: string): JwtPayload | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload) as JwtPayload;
    } catch (e) {
      console.error('Failed to parse JWT payload:', e);
      return null;
    }
  }
}
