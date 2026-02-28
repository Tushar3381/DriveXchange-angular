import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SellCarService } from '../../service/sell-car.Service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy-second-hand-car',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buy-second-hand-car.html',
  styleUrl: './buy-second-hand-car.css'
})
export class BuySecondHandCar implements OnInit {

  cars: any[] = [];

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

  getFirstImage(images: string): string {
    if (!images) return 'assets/no-image.png';

    let imageArray = images.split(',');
    return 'http://localhost:8080/car-uploads/' + imageArray[0];
  }
}