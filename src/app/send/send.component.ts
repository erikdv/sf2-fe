import {HttpClient} from '@angular/common/http';
import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';

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

  form = this.fb.nonNullable.group({
    content: ['', Validators.required],
    title: ['', Validators.required],
  });

  onSubmit(): void {

    this.http
      .post(
        '/api/message',
        {
          title: this.form.getRawValue().title,
          content: this.form.getRawValue().content
        }
      )
      .subscribe(() => {
        window.location.reload()
      })
  }
}
