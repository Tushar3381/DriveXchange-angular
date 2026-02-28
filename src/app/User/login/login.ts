
import { ToastService } from '../../service/toast.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../service/login-service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';

  showPassword = false;
  submitted = false;
  loading = false;
  errorMessage = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toast: ToastService  
  ) {}

  login() {

    this.submitted = true;
    this.errorMessage = '';

    if (!this.email || !this.password) {
      return;
    }

    this.loading = true;

    const user = {
      email: this.email,
      password: this.password
    };

    this.loginService.login(user).subscribe({
      next: (res) => {

        this.loading = false;

        // Save user
        this.loginService.saveUser(res);

        // Navigate
        this.router.navigate(['/User/dashboard']);
      },
      error: () => {

        this.loading = false;
        this.toast.show("Invalid credentials", "error");

      }
    });
  }
}
