import { HttpClient } from '@angular/common/http';
import {Component, EventEmitter, inject, Input, Output, output} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {AuthResponseInterface} from "../authresponse.interface";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, FormsModule, NgIf],
})
export class LoginComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  @Input({required: true}) showLoginFields!: boolean;
  @Output() select = new EventEmitter()


  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onLoginClick(): void {
      this.select.emit(true)
      this.showLoginFields = true;
  }

  onSubmit(): void {
    this.http
      .post<AuthResponseInterface>(
        '/api/auth',
        {
          username: this.form.getRawValue().username,
          password: this.form.getRawValue().password
        }
      )
      .subscribe((response: AuthResponseInterface) => {
        localStorage.setItem('accessToken', response.accessToken);
      })
  }
}
