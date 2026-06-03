import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { API_ENDPOINTS } from '../../core/api.config';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {

  name = '';
  email = '';
  contactnumber = '';
  gender: string = '';
  password = '';
  confirmPassword = '';

showPassword = false;
showConfirmPassword = false;



  message = '';
  errorMessage = '';
  submitted = false;
  loading = false;
  returnUrl = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '';
  }

  register() {

    this.submitted = true;
    this.errorMessage = '';
    this.message = '';

    // Required field check
    if (!this.name || !this.email || !this.contactnumber || 
        !this.gender || !this.password || !this.confirmPassword) {
      return;
    }

    // Email format check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
      this.errorMessage = "Invalid email format";
      return;
    }

    // Phone validation
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(this.contactnumber)) {
      this.errorMessage = "Contact number must be 10 digits";
      return;
    }

    // Password length
    if (this.password.length < 6) {
      this.errorMessage = "Password must be at least 6 characters";
      return;
    }

    // Password match
    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Passwords do not match";
      return;
    }

    const user = {
      name: this.name,
      email: this.email,
      contactnumber: this.contactnumber,
      gender: this.gender,
      password: this.password,
      confirmPassword: this.confirmPassword
    };

    this.loading = true;

    this.http.post(`${API_ENDPOINTS.users}/register`, user, { responseType: 'text' })
      .subscribe({
        next: (res) => {
          this.loading = false;
          this.message = res;
          setTimeout(() => {
            this.router.navigate(['/User/login'], {
              queryParams: this.sanitizedReturnUrl ? { returnUrl: this.sanitizedReturnUrl } : null
            });
          }, 1500);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = this.getRegistrationErrorMessage(err);
        }
      });
  }

  private getRegistrationErrorMessage(err: HttpErrorResponse): string {
    if (err.status === 0) {
      return 'Cannot connect to the server. Please check that the backend is running and the app URL is allowed by CORS.';
    }

    if (typeof err.error === 'string' && err.error.trim()) {
      return err.error;
    }

    if (err.error?.message) {
      return err.error.message;
    }

    if (err.message) {
      return err.message;
    }

    return 'Registration failed. Please try again.';
  }

  goBack(): void {
    const target = this.sanitizedReturnUrl;
    if (target) {
      this.router.navigateByUrl(target);
      return;
    }

    this.router.navigateByUrl('/');
  }

  private get sanitizedReturnUrl(): string {
    const target = (this.returnUrl || '').trim();

    if (!target || !target.startsWith('/') || target.startsWith('//')) {
      return '';
    }

    if (target.startsWith('/User/register')) {
      return '';
    }

    return target;
  }
}
