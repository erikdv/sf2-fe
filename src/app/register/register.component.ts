import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {RouterLink} from "@angular/router";
import {AuthResponseInterface} from "../interface/authresponse.interface";
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
  @Input({required: true}) showRegisterFields!: boolean;
  @Output() select = new EventEmitter()

  fb = inject(FormBuilder);
  http = inject(HttpClient);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onRegisterClick(): void {
      this.select.emit(true)
      this.showRegisterFields = ! this.showRegisterFields;
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
        document.cookie = `username=${response.username}`;
        document.cookie = `sessionExpirationTime=${response.sessionExpirationTime.toString()}`;
      });
  }
}
