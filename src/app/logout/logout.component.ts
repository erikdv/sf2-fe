import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  logout(): void {
    localStorage.removeItem('accessToken');
  }
}
