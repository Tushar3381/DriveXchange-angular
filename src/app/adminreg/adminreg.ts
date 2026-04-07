import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms'; 
import { NgIf } from '@angular/common';
import { API_ENDPOINTS } from '../core/api.config';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminreg',
  standalone: true,
  imports: [FormsModule, NgIf, RouterModule],
  templateUrl: './adminreg.html',
  styleUrls: ['./adminreg.css']
})
export class Adminreg {
  constructor(private http: HttpClient, private router: Router) {}

  adminName = '';
  adminEmail = '';
  adminPassword = '';
  setupKey = '';
  showPassword = false;
  isSubmitting = false;
  errorMessage = '';

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      this.errorMessage = 'Please fill all the required fields correctly.';
      return;
    }

    this.errorMessage = '';
    this.isSubmitting = true;

    const admin = {
      aname: this.adminName,
      aemail: this.adminEmail,
      apass: this.adminPassword,
      setupKey: this.setupKey
    };

    this.http.post(`${API_ENDPOINTS.admin}/saveAdminInfo`, admin).subscribe(
      (response) => {
        console.log('Signup successful:', response);
        this.isSubmitting = false;
        Swal.fire({
          icon: 'success',
          title: 'Admin account created',
          text: 'You can now sign in to the admin dashboard.',
          timer: 1500,
          showConfirmButton: false
        });
        this.router.navigate(['/Admin/login']); // Redirect to the Admin_Login
      },
      (error) => {
        console.error('Signup failed:', error);
        this.isSubmitting = false;
        this.errorMessage = typeof error?.error === 'string'
          ? error.error
          : 'Signup failed. Please try again.';
      }
    );
  }
}
