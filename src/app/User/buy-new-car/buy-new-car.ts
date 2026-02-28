import { Component, OnInit } from '@angular/core';
import { BuyNewCarService } from '../../service/buy-new-car-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buy-new-car',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buy-new-car.html',
  styleUrl: './buy-new-car.css'
})
export class BuyNewCarComponent implements OnInit {

  cars: any[] = [];

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

  viewDetails(id: number) {
  this.router.navigate(['/User/buy-new-car', id]);
}

}