import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from '../../service/car.service'; // path to your service
import { Car } from '../../Models/car'; // your Car model
import { Router } from '@angular/router';
import { MEDIA_ENDPOINTS } from '../../core/api.config';
import Swal from 'sweetalert2';
import { getDescriptionPreview } from '../../utils/car-description';

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
  readonly carImagesBase = MEDIA_ENDPOINTS.carImages;

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

  goToAddCar() {
    this.router.navigate(['/dash/add-car']);
  }

  deleteCar(carId: number) {
    Swal.fire({
      title: 'Delete this car?',
      text: 'This listing will be removed from the inventory.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#a63d40',
      cancelButtonColor: '#203a53',
      confirmButtonText: 'Delete car'
    }).then((result) => {
      if (result.isConfirmed) {
        this.carService.deleteCar(carId).subscribe({
          next: () => {
            this.successMsg = 'Car deleted successfully.';
            this.fetchCars();
            Swal.fire({
              icon: 'success',
              title: 'Car deleted',
              timer: 1500,
              showConfirmButton: false
            });
          },
          error: (err) => console.error(err)
        });
      }
    });
  }

  get totalCars() {
    return this.cars.length;
  }

  trackByCarId(_: number, car: Car) {
    return car.id;
  }

  getImageUrl(car: Car) {
    return car.imageUrl ? `${this.carImagesBase}/${car.imageUrl}` : '';
  }

  getCarDescriptionPreview(description: string) {
    return getDescriptionPreview(description);
  }
}
