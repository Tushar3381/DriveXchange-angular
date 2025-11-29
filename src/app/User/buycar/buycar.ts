import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-buycar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './buycar.html',
  styleUrl: './buycar.css'
})
export class BuyCar implements OnInit {

  cars: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCars();
  }

  loadCars() {
    this.http.get("http://localhost:8080/cars/fetchcars").subscribe(
      (data: any) => this.cars = data,
      error => console.error("Failed to load cars", error)
    );
  }

  buyNow(car: any) {
    const purchaseData = {
      carId: car.id,
      carBrand: car.brand,
      carModel: car.model,
      amount: car.price,
      buyerName: "Test User",
      buyerEmail: "test@gmail.com",
      buyerContact: "9876543210"
    };

    this.http.post("http://localhost:8080/buycar/purchase", purchaseData)
      .subscribe(
        (response) => {
          alert("Car purchase successful!");
          console.log("Purchase Data:", response);
        },
        (error) => {
          alert("Car purchase failed!");
          console.error(error);
        }
      );
  }
}
