import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminlogin',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './adminlogin.html',
  styleUrls: ['./adminlogin.css']
})
export class Adminlogin {
  aemail: string = '';
  apass: string = '';
  errorMessage: string = '';
  isLoading = false;
  showPassword = false;

  constructor(private router: Router, private adminService: AdminService) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  goToDashboard() {
    if (!this.aemail || !this.apass) {
      this.errorMessage = 'Enter both email and password to continue.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.adminService.login(this.aemail, this.apass).subscribe({
      next: (response) => {
        localStorage.setItem('adminToken', response.token);
        this.isLoading = false;

        Swal.fire({
          icon: 'success',
          title: 'Welcome back',
          text: 'Admin login successful.',
          timer: 1400,
          showConfirmButton: false
        });

        this.router.navigate(['/dash']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = typeof error?.error === 'string'
          ? error.error
          : 'Invalid Email or Password';
      }
    });
  }
}
