import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
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
  readonly primaryActions = [
    {
      icon: 'N',
      title: 'Buy New Cars',
      description: 'Discover newly launched models with verified specs and transparent pricing.',
      cta: 'Browse New Inventory',
      link: '/User/buy-new-car'
    },
    {
      icon: 'U',
      title: 'Buy Used Cars',
      description: 'Choose from quality-checked, admin-approved pre-owned vehicles.',
      cta: 'Browse Used Inventory',
      link: '/User/buy-second-hand'
    },
    {
      icon: 'S',
      title: 'Sell Your Car',
      description: 'List your car, get verified, and connect with serious buyers faster.',
      cta: 'Start Selling',
      link: '/User/sellcar'
    }
  ];

  readonly trustStats = [
    { label: 'Verified Listings', value: '2,500+' },
    { label: 'Happy Buyers', value: '1,200+' },
    { label: 'Dealer Partners', value: '180+' },
    { label: 'Cities Served', value: '40+' }
  ];

  readonly valueProps = [
    {
      title: 'Transparent Workflow',
      description: 'From shortlist to booking, every step is visible and trackable.'
    },
    {
      title: 'Curated Inventory',
      description: 'High-quality new and used cars, carefully reviewed before listing.'
    },
    {
      title: 'Fast Lead Matching',
      description: 'Relevant buyer-seller discovery to reduce back-and-forth time.'
    },
    {
      title: 'Support-First Experience',
      description: 'Built for clarity so users can make confident purchase decisions.'
    }
  ];

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
