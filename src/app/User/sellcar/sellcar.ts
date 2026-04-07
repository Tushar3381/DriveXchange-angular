import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { API_ENDPOINTS } from '../../core/api.config';

@Component({
  selector: 'app-sell-car',
  standalone: true,
  imports: [FormsModule, CommonModule],
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
  const formData = new FormData();

  formData.append('brand', this.brand);
  formData.append('model', this.model);
  formData.append('year', this.year?.toString() ?? '');
  formData.append('price', this.price?.toString() ?? '');
  formData.append('ownerName', this.ownerName);
  formData.append('contactNumber', this.contactNumber);
  formData.append('fuelType', this.fuelType);
   formData.append('description', this.description);

  this.images.forEach(img => {
    formData.append('images', img);
  });

  this.http.post(
    `${API_ENDPOINTS.sellcar}/submit`,
    formData,
    { responseType: 'text' }
  ).subscribe({
  next: (res) => {
    alert('Car is submitted. Please wait for approval from DriveXchange.');
    this.message = res;
  },
  error: err => {
    console.error(err);
  }
});


}

}
