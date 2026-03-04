import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  searchKeyword = '';
  vehicleType: 'new' | 'used' = 'new';
  budget = 'any';
  currentSlide = 0;
  private sliderTimer: ReturnType<typeof setInterval> | null = null;

  readonly heroSlides = [
    {
      tag: 'DriveXchange Marketplace',
      title: 'Find the right car faster, from budget to premium.',
      subtitle:
        'Compare verified listings, shortlist confidently, and move from search to deal with clarity.',
      image:
        'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1800'
    },
    {
      tag: 'Buy Smart',
      title: 'New and used collections curated for every buyer.',
      subtitle:
        'Search by model, budget, and type. Review trusted details before making your next move.',
      image:
        'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1800'
    },
    {
      tag: 'Sell With Confidence',
      title: 'List your car and connect with serious buyers quickly.',
      subtitle:
        'Seller-friendly workflow, premium presentation, and visibility to high-intent users.',
      image:
        'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1800'
    }
  ];

  readonly brandRail = [
    'Hyundai',
    'Kia',
    'Toyota',
    'Maruti',
    'Honda',
    'Tata',
    'Mahindra',
    'BMW'
  ];

  readonly newShowcase = [
    {
      name: 'Hyundai Creta Signature',
      tag: 'New',
      price: '₹16.5L',
      year: '2024',
      location: 'Mumbai',
      image:
        'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=700&w=1100'
    },
    {
      name: 'Honda City ZX',
      tag: 'New',
      price: '₹15.2L',
      year: '2024',
      location: 'Pune',
      image:
        'https://images.pexels.com/photos/100653/pexels-photo-100653.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=700&w=1100'
    },
    {
      name: 'Kia Seltos GTX+',
      tag: 'New',
      price: '₹19.1L',
      year: '2025',
      location: 'Bengaluru',
      image:
        'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=700&w=1100'
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
        'https://images.pexels.com/photos/70912/pexels-photo-70912.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=700&w=1100'
    },
    {
      name: 'Mercedes C-Class',
      tag: 'Used',
      price: '₹26.2L',
      year: '2020',
      location: 'Hyderabad',
      image:
        'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=700&w=1100'
    },
    {
      name: 'BMW 3 Series',
      tag: 'Used',
      price: '₹31.9L',
      year: '2019',
      location: 'Chennai',
      image:
        'https://images.pexels.com/photos/193021/pexels-photo-193021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=700&w=1100'
    }
  ];

  readonly whyChooseFeatures = [
    {
      title: 'Luxury Selection',
      description: 'Premium trims and high-demand models curated for confidence-led decisions.'
    },
    {
      title: 'Verified Ownership',
      description: 'Every used listing follows verification checks before appearing to buyers.'
    },
    {
      title: 'Assisted Journey',
      description: 'From shortlist to test drive and payment, every step is designed for clarity.'
    },
    {
      title: 'Fast Seller Exposure',
      description: 'Sellers gain visibility to active buyers with a clean, frictionless listing path.'
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

  readonly testimonials = [
    {
      quote: 'The interface feels premium and the buying flow is very clear end-to-end.',
      author: 'Rahul S.',
      role: 'Buyer'
    },
    {
      quote: 'I listed my car and got serious leads quickly. The UX is simple and effective.',
      author: 'Priya M.',
      role: 'Seller'
    },
    {
      quote: 'The search and detail pages make comparisons easier than typical portals.',
      author: 'Aman K.',
      role: 'Power User'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.sliderTimer = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.sliderTimer) {
      clearInterval(this.sliderTimer);
      this.sliderTimer = null;
    }
  }

  get activeSlide() {
    return this.heroSlides[this.currentSlide];
  }

  prevSlide(): void {
    this.currentSlide =
      this.currentSlide === 0 ? this.heroSlides.length - 1 : this.currentSlide - 1;
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.heroSlides.length;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

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
