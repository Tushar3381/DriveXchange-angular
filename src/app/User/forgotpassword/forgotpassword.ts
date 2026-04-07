import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { API_ENDPOINTS } from '../../core/api.config';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './forgotpassword.html',
  styleUrl: './forgotpassword.css'
})
export class ForgotPassword {
  email = '';
  newPassword = '';
  confirmPassword = '';
  message = '';
  developmentResetLink = '';
  errorMessage = '';
  loading = false;
  submitted = false;
  showNewPassword = false;
  showConfirmPassword = false;
  resetToken = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.resetToken = this.route.snapshot.queryParamMap.get('token') || '';
  }

  get isResetMode() {
    return !!this.resetToken;
  }

  toggleNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  requestResetLink() {
    this.submitted = true;
    this.errorMessage = '';
    this.message = '';

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
      this.errorMessage = 'Enter a valid email address.';
      return;
    }

    this.loading = true;

    this.http.post(
      `${API_ENDPOINTS.users}/forgot-password`,
      { email: this.email },
      { responseType: 'text' }
    ).subscribe({
      next: (res) => {
        this.loading = false;
        this.developmentResetLink = this.extractResetLink(res);
        this.message = this.developmentResetLink
          ? 'Email delivery is not configured locally, so your reset link is shown below for testing.'
          : res;
        this.errorMessage = '';
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = typeof error?.error === 'string'
          ? error.error
          : 'Unable to process your request right now.';
      }
    });
  }

  resetPassword() {
    this.submitted = true;
    this.errorMessage = '';
    this.message = '';

    if (!this.resetToken) {
      this.errorMessage = 'This reset link is invalid.';
      return;
    }

    if (this.newPassword.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters.';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.loading = true;

    this.http.post(
      `${API_ENDPOINTS.users}/reset-password`,
      {
        token: this.resetToken,
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword
      },
      { responseType: 'text' }
    ).subscribe({
      next: (res) => {
        this.loading = false;
        this.developmentResetLink = '';
        this.message = res;
        this.errorMessage = '';
        this.newPassword = '';
        this.confirmPassword = '';

        setTimeout(() => {
          this.router.navigate(['/User/login']);
        }, 1400);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = typeof error?.error === 'string'
          ? error.error
          : 'Unable to reset password right now.';
      }
    });
  }

  private extractResetLink(response: string): string {
    const match = response.match(/https?:\/\/\S+/);
    return match ? match[0] : '';
  }
}
