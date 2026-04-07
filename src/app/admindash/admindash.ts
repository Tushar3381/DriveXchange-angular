import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import Swal from 'sweetalert2';

type AdminNavItem = {
  label: string;
  description: string;
  route: string;
  exact: boolean;
};

@Component({
  selector: 'app-admindash',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admindash.html',
  styleUrls: ['./admindash.css']
})
export class Admindash {
  mobileNavOpen = false;
  currentPageTitle = 'Dashboard overview';
  currentPageDescription = 'Track inventory, approvals, and customer requests from one place.';

  readonly navItems: AdminNavItem[] = [
    {
      label: 'Overview',
      description: 'Summary and shortcuts',
      route: '/dash/home',
      exact: true
    },
    {
      label: 'Car inventory',
      description: 'Manage listed new cars',
      route: '/dash/carslist',
      exact: false
    },
    {
      label: 'Add car',
      description: 'Create a fresh listing',
      route: '/dash/add-car',
      exact: false
    },
    {
      label: 'Seller approvals',
      description: 'Review pending used cars',
      route: '/dash/adminapprove-car',
      exact: false
    },
    {
      label: 'Test drives',
      description: 'Handle customer bookings',
      route: '/dash/testdrive-requests',
      exact: false
    }
  ];

  constructor(private router: Router) {
    this.updatePageMeta(this.router.url);

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.updatePageMeta(event.urlAfterRedirects);
        this.closeMobileNav();
      });
  }

  toggleMobileNav() {
    this.mobileNavOpen = !this.mobileNavOpen;
  }

  closeMobileNav() {
    this.mobileNavOpen = false;
  }

  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#203a53',
      cancelButtonColor: '#a63d40',
      confirmButtonText: 'Yes, Logout'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        localStorage.removeItem('adminToken');
        this.closeMobileNav();

        Swal.fire('Logged Out!', 'You have successfully logged out.', 'success');

        this.router.navigate(['Admin/login']);
      }
    });
  }

  private updatePageMeta(url: string) {
    const normalizedUrl = url.replace(/\/$/, '');

    if (normalizedUrl.endsWith('/carslist')) {
      this.currentPageTitle = 'Car inventory';
      this.currentPageDescription = 'Review live listings, update details, and remove outdated entries.';
      return;
    }

    if (normalizedUrl.endsWith('/add-car')) {
      this.currentPageTitle = 'Add new car';
      this.currentPageDescription = 'Create clean, complete listings that are easy for buyers to trust.';
      return;
    }

    if (normalizedUrl.includes('/editcar/')) {
      this.currentPageTitle = 'Edit listing';
      this.currentPageDescription = 'Update pricing, specs, and imagery without leaving the admin workflow.';
      return;
    }

    if (normalizedUrl.endsWith('/adminapprove-car')) {
      this.currentPageTitle = 'Seller approvals';
      this.currentPageDescription = 'Approve or reject incoming used-car submissions with clear status controls.';
      return;
    }

    if (normalizedUrl.endsWith('/testdrive-requests')) {
      this.currentPageTitle = 'Test drive requests';
      this.currentPageDescription = 'Prioritize customer bookings and keep request handling consistent.';
      return;
    }

    this.currentPageTitle = 'Dashboard overview';
    this.currentPageDescription = 'Monitor the marketplace at a glance and jump into the next task fast.';
  }
}
