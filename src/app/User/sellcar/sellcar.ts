import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sell-car',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './sellcar.html',
  styleUrls: ['./sellcar.css']
})
export class SellCar {

  brand = '';
  model = '';
  year: any;
  price: any;
  ownerName = '';
  contactNumber = '';
  fuelType = '';
  description = '';

  images: File[] = [];

  message = '';

  constructor(private http: HttpClient) {}

  onImageSelected(event: any) {
    this.images = Array.from(event.target.files);
  }

  sellCar() {

    const carData = {
      brand: this.brand,
      model: this.model,
      year: this.year,
      price: this.price,
      ownerName: this.ownerName,
      contactNumber: this.contactNumber,
      fuelType: this.fuelType,
      description: this.description
    };

    const formData = new FormData();
    formData.append("car", new Blob([JSON.stringify(carData)], { type: "application/json" }));

    this.images.forEach(img => {
      formData.append("images", img);
    });

    this.http.post("http://localhost:8080/sellcar/submit", formData)
      .subscribe(
        res => {
          this.message = "Car posted successfully and awaiting admin approval!";
        },
        err => {
          console.error("Error uploading:", err);
        }
      );
  }
}
