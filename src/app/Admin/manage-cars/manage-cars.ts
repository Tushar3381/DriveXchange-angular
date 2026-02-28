import { Component, OnInit } from '@angular/core';
import { SellCarService } from '../../service/sell-car.Service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  filterStatus = "ALL";

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
}
