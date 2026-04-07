import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  searchKeyword = '';
  vehicleType: 'new' | 'used' = 'new';
  budget = 'any';

  readonly heroContent = {
    tag: 'DriveXchange Marketplace',
    title: 'A clean, confident way to buy and sell cars.',
    subtitle:
      'Verified listings, simple comparisons, and a guided flow from search to deal.',
    image:
      'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=2000'
  };

  readonly heroStats = [
    { value: '2,500+', label: 'Verified listings' },
    { value: '1,200+', label: 'Happy buyers' },
    { value: '180+', label: 'Dealer partners' }
  ];

  readonly newShowcase = [
    {
      name: 'Hyundai Creta Signature',
      tag: 'New',
      price: '₹16.5L',
      year: '2024',
      location: 'Mumbai',
      image:
        'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=1300'
    },
    {
      name: 'Honda City ZX',
      tag: 'New',
      price: '₹15.2L',
      year: '2024',
      location: 'Pune',
      image:
        'https://images.pexels.com/photos/3874337/pexels-photo-3874337.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=1300'
    },
    {
      name: 'Kia Seltos GTX+',
      tag: 'New',
      price: '₹19.1L',
      year: '2025',
      location: 'Bengaluru',
      image:
        'https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=1300'
    }
  ];

  readonly usedShowcase = [
    {
      name: 'Toyota Innova Crysta',
      tag: 'Used',
      price: '₹13.8L',
      year: '2021',
      location: 'Delhi',
      image:
        'https://images.pexels.com/photos/70912/pexels-photo-70912.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=1300'
    },
    {
      name: 'Mercedes C-Class',
      tag: 'Used',
      price: '₹26.2L',
      year: '2020',
      location: 'Hyderabad',
      image:
        'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=1300'
    },
    {
      name: 'BMW 3 Series',
      tag: 'Used',
      price: '₹31.9L',
      year: '2019',
      location: 'Chennai',
      image:
        'https://images.pexels.com/photos/193021/pexels-photo-193021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=1300'
    }
  ];

  readonly workflowSteps = [
    {
      step: '01',
      icon: 'SR',
      title: 'Search',
      description: 'Browse listings by brand, budget, and segment in seconds.'
    },
    {
      step: '02',
      icon: 'CP',
      title: 'Compare',
      description: 'Review verified details, price bands, and listing confidence.'
    },
    {
      step: '03',
      icon: 'TD',
      title: 'Test Drive',
      description: 'Book a test drive and shortlist the right vehicle faster.'
    },
    {
      step: '04',
      icon: 'DL',
      title: 'Deal',
      description: 'Move to secure transaction flow for buying or selling.'
    }
  ];

  constructor(private router: Router) {}

  onSearch(): void {
    const route = this.vehicleType === 'used' ? '/User/buy-second-hand' : '/User/buy-new-car';

    this.router.navigate([route], {
      queryParams: {
        q: this.searchKeyword || null,
        budget: this.budget !== 'any' ? this.budget : null
      }
    });
  }
}
