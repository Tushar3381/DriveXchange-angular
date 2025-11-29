import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from '../../service/car.service'; // path to your service
import { Car } from '../../Models/car'; // your Car model
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-list.html',
  styleUrls: ['./car-list.css']
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];
  successMsg: string = '';

  constructor(private carService: CarService, private router: Router) {}

  ngOnInit(): void {
    this.fetchCars();
  }

  fetchCars() {
    this.carService.getAllCars().subscribe({
      next: (data) => this.cars = data,
      error: (err) => console.error(err)
    });
  }

  editCar(carId: number):void {                                          // Navigate to your edit car page
    this.router.navigate(['/dash/editcar', carId]);
  }

  deleteCar(carId: number) {
    if (confirm('Are you sure you want to delete this car?')) {
      this.carService.deleteCar(carId).subscribe({
        next: () => {
          this.successMsg = 'Car deleted successfully!';
          this.fetchCars();                                         // Refresh list
        },
        error: (err) => console.error(err)
      });
    }
  }
}
