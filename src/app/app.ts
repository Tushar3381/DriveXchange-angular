import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('DriveXchange');
  currentUrl = '';
  mobileMenuOpen = false;

  constructor(private router: Router) {
    this.currentUrl = this.router.url;

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects;
        this.mobileMenuOpen = false;
      }
    });
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  get showGlobalShell(): boolean {
    const hiddenShellRoutes = [
      '/dash',
      '/Admin/login',
      '/Admin/signup',
      '/User/login',
      '/User/register',
      '/User/forgotpassword',
      '/User/forgot-password'
    ];

    return !hiddenShellRoutes.some((route) => this.currentUrl.startsWith(route));
  }

  get authReturnUrl(): string {
    if (typeof window === 'undefined') {
      return this.currentUrl || '/';
    }

    const { pathname, search, hash } = window.location;
    return `${pathname}${search}${hash}` || '/';
  }
}
