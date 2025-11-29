import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {

  name = '';
  email = '';
  phone = '';
  password = '';
  confirmPassword = '';
  message = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {

    if (this.password !== this.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const user = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      password: this.password
    };

    this.http.post('http://localhost:8080/users/register', user, { responseType: 'text' })
      .subscribe(res => {

        this.message = res;

        alert("Registration Successful!");

        this.router.navigate(['/User/login']);

      }, err => {
        this.message = 'Registration failed';
        alert("Registration Failed!");
      });
  }
}
