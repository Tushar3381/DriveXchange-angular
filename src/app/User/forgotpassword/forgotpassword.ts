import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgotpassword.html'
})
export class ForgotPassword {

  email = '';
  message = '';
  errorMessage = '';

  constructor(private http: HttpClient) {}

  resetPassword() {

    if (!this.email) {
      this.errorMessage = "Email is required";
      return;
    }

    this.http.post('http://localhost:8080/users/forgot-password',
      { email: this.email },
      { responseType: 'text' }
    ).subscribe({
      next: (res) => {
        this.message = res;
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = "Email not found";
        this.message = '';
      }
    });
  }
}
