import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule],
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

  constructor(private http: HttpClient, private router: Router) {}

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

    this.http.post('http://localhost:8080/users/register', user, { responseType: 'text' })
      .subscribe({
        next: (res) => {
          this.loading = false;
          this.message = res;
          setTimeout(() => {
            this.router.navigate(['/User/login']);
          }, 1500);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error || "Registration failed";
        }
      });
  }
}
