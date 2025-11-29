import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adminlogin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './adminlogin.html',
  styleUrls: ['./adminlogin.css']
})
export class Adminlogin {

  aemail: string = '';
  apass: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private adminService: AdminService) {}

  goToDashboard() {
    this.adminService.login(this.aemail, this.apass).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dash']);
      },
      error: () => {
        this.errorMessage = 'Invalid Email or Password';
      }
    });
  }
}
