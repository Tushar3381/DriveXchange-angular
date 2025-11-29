import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { Component, OnInit } from '@angular/core';
import { CarService } from '../../car.service';


@Component({
  selector: 'app-manage-cars',
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
  filterStatus = "ALL";

  constructor(private carservice: CarService) {}

  ngOnInit() {
    this.loadCars();
  }

  loadCars() {
    this.carservice.getAllCars().subscribe((data: any) => {
      this.cars = data;
      this.applyFilter();
    });
  }

  applyFilter() {
    if (this.filterStatus === "ALL") {
      this.filteredCars = this.cars;
    } else {
      this.filteredCars = this.cars.filter(car => car.status === this.filterStatus);
    }
  }

  updateStatus(id: number, status: string) {
  if (status === 'APPROVED') {
    this.carservice.approveCar(id).subscribe(() => {
      alert('Car approved successfully');
      this.loadCars();
    });
  } else {
    this.carservice.rejectCar(id).subscribe(() => {
      alert('Car rejected');
      this.loadCars();
    });
  }
  }
}
