import { Component, OnInit } from '@angular/core';
import { BuyNewCarService } from '../../service/buy-new-car-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MEDIA_ENDPOINTS } from '../../core/api.config';

@Component({
  selector: 'app-buy-new-car',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buy-new-car.html',
  styleUrl: './buy-new-car.css'
})
export class BuyNewCarComponent implements OnInit {

  cars: any[] = [];
  searchTerm = '';
  budgetFilter = 'all';
  sortBy = 'default';
  readonly uploadsBase = MEDIA_ENDPOINTS.uploads;

  constructor(
    private carService: BuyNewCarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars() {
    this.carService.getAllNewCars().subscribe(data => {
      this.cars = data;
    });
  }

  get filteredCars(): any[] {
    let filtered = [...this.cars];

    if (this.searchTerm.trim()) {
      const query = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter((car) =>
        `${car.brand} ${car.model}`.toLowerCase().includes(query)
      );
    }

    if (this.budgetFilter !== 'all') {
      filtered = filtered.filter((car) => {
        const price = Number(car.price) || 0;

        if (this.budgetFilter === 'under10') return price < 1000000;
        if (this.budgetFilter === '10to20') return price >= 1000000 && price <= 2000000;
        if (this.budgetFilter === 'above20') return price > 2000000;

        return true;
      });
    }

    if (this.sortBy === 'priceAsc') {
      filtered.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (this.sortBy === 'priceDesc') {
      filtered.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (this.sortBy === 'brand') {
      filtered.sort((a, b) => String(a.brand).localeCompare(String(b.brand)));
    }

    return filtered;
  }

  viewDetails(id: number) {
  this.router.navigate(['/User/buy-new-car', id]);
}

}
