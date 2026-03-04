import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SellCarService } from '../../service/sell-car.Service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buy-second-hand-car',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buy-second-hand-car.html',
  styleUrl: './buy-second-hand-car.css'
})
export class BuySecondHandCar implements OnInit {

  cars: any[] = [];
  searchTerm = '';
  fuelFilter = 'all';
  sortBy = 'default';

  constructor(
    private sellCarService: SellCarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadApprovedCars();
  }

  loadApprovedCars() {
    this.sellCarService.getApprovedCars().subscribe(data => {
      this.cars = data;
    });
  }

  viewDetails(id: number) {
    this.router.navigate(['/User/buy-second-hand', id]);
  }

  get filteredCars(): any[] {
    let filtered = [...this.cars];

    if (this.searchTerm.trim()) {
      const query = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter((car) =>
        `${car.brand} ${car.model}`.toLowerCase().includes(query)
      );
    }

    if (this.fuelFilter !== 'all') {
      filtered = filtered.filter((car) => String(car.fuelType).toLowerCase() === this.fuelFilter);
    }

    if (this.sortBy === 'priceAsc') {
      filtered.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (this.sortBy === 'priceDesc') {
      filtered.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (this.sortBy === 'yearDesc') {
      filtered.sort((a, b) => Number(b.year) - Number(a.year));
    }

    return filtered;
  }

  getFirstImage(images: string): string {
    if (!images) return '/car1.jpg';

    let imageArray = images.split(',');
    return 'http://localhost:8080/car-uploads/' + imageArray[0];
  }
}
