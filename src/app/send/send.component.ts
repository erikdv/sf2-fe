import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class SendComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    content: ['', Validators.required],
    title: ['', Validators.required],
  });

  onSubmit(): void {
    const token = localStorage.getItem('accessToken');
    const headers = { 'Authorization': `Bearer ${token}` }
    this.http
      .post(
        '/api/message',

        {
          title: this.form.getRawValue().title,
          content: this.form.getRawValue().content
        },
{ headers }
      )
      .subscribe( () => {
        window.location.reload()
      })
  }
}
