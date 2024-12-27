import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth.service";
import {Router, RouterLink} from "@angular/router";
import {AuthResponseInterface} from "../authresponse.interface";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  showRegisterFields = false;

  onLoginClick(): void {
    this.showRegisterFields = !this.showRegisterFields;
  }
  onSubmit(): void {
    this.http
      .post<AuthResponseInterface>(
        '/api/account',
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
