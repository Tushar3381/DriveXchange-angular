import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  loggedUserName: string = '';
  userId: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {

    const user = localStorage.getItem('user');

    if (user) {
      const userData = JSON.parse(user);

      this.loggedUserName = userData.name;
      this.userId = userData.id;

    } else {
      this.router.navigate(['/User/login']);
    }
  }

  goToProfile() {
    this.router.navigate(['/User/user-profile']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/User/login']);
  }
}
