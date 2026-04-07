
import { ToastService } from '../../service/toast.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../service/login-service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
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
  returnUrl = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastService  
  ) {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '';
  }

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

        // Navigate back to the last page/section when available.
        this.redirectAfterLogin();
      },
      error: () => {

        this.loading = false;
        this.errorMessage = 'Invalid email or password.';
        this.toast.show("Invalid credentials", "error");

      }
    });
  }

  goBack(): void {
    const target = this.sanitizedReturnUrl;
    if (target) {
      this.router.navigateByUrl(target);
      return;
    }

    this.router.navigateByUrl('/');
  }

  private redirectAfterLogin(): void {
    const target = this.sanitizedReturnUrl;
    if (target) {
      this.router.navigateByUrl(target);
      return;
    }

    this.router.navigate(['/User/dashboard']);
  }

  private get sanitizedReturnUrl(): string {
    const target = (this.returnUrl || '').trim();

    if (!target || !target.startsWith('/') || target.startsWith('//')) {
      return '';
    }

    if (target.startsWith('/User/login')) {
      return '';
    }

    return target;
  }
}
