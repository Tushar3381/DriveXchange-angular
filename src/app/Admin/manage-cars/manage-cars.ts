import { Component, OnInit } from '@angular/core';
import { SellCarService } from '../../service/sell-car.Service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MEDIA_ENDPOINTS } from '../../core/api.config';

@Component({
  selector: 'app-manage-cars',

   standalone: true,         
  imports: [
    CommonModule,            
    FormsModule
  ],


  templateUrl: './manage-cars.html',
  styleUrls: ['./manage-cars.css']
})
export class ManageCarsComponent implements OnInit {
  cars: any[] = [];
  filteredCars: any[] = [];
  filterStatus = 'ALL';
  readonly carUploadsBase = MEDIA_ENDPOINTS.carUploads;
  readonly filterOptions = ['ALL', 'PENDING', 'APPROVED', 'REJECTED'];

  constructor(private sellCarService: SellCarService) {}

  ngOnInit() {
    this.loadCars();
  }

  loadCars() {
    this.sellCarService.getAllCar().subscribe(data => {
      this.cars = data;
      this.applyFilter();
    });
  }

  applyFilter() {
    if (this.filterStatus === 'ALL') {
      this.filteredCars = this.cars;
    } else {
      this.filteredCars = this.cars.filter(car => car.status === this.filterStatus);
    }
  }

  updateStatus(id: number, status: string) {
    if (status === 'APPROVED') {
      this.sellCarService.approveCar(id).subscribe(() => {
        this.loadCars();
      });
    } else {
      this.sellCarService.rejectCar(id).subscribe(() => {
        this.loadCars();
      });
    }
  }

  get totalCars() {
    return this.cars.length;
  }

  get pendingCars() {
    return this.cars.filter((car) => car.status === 'PENDING').length;
  }

  get approvedCars() {
    return this.cars.filter((car) => car.status === 'APPROVED').length;
  }

  get rejectedCars() {
    return this.cars.filter((car) => car.status === 'REJECTED').length;
  }

  getPrimaryImage(car: any) {
    if (!car?.images) {
      return '';
    }

    return `${this.carUploadsBase}/${car.images.split(',')[0]}`;
  }

  trackByCarId(_: number, car: any) {
    return car.id;
  }
}
