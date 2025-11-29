import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const user = {
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:8080/users/login', user, { responseType: 'text' })
      .subscribe(res => {

        alert("Login Successful!");

        // Redirect to user dashboard
        this.router.navigate(['/User/dashboard']);

      }, err => {
        alert("Invalid Credentials!");
      });
  }
}
