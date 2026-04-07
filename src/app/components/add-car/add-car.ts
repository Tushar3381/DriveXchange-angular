import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from '../../service/car.service';
import { Car } from '../../Models/car';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-car.html',
  styleUrls: ['./add-car.css']
})
export class AddCarComponent {
  car: Car = { id: 0, brand: '', model: '', color: '', price: 0, description:'' };
  selectedFile: File | null = null;
  selectedFileName = '';
  successMsg: string = '';
  messageType: 'success' | 'error' = 'success';

  constructor(private carService: CarService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] || null;
    this.selectedFileName = this.selectedFile ? this.selectedFile.name : '';
  }

  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('id', this.car.id.toString());
      formData.append('brand', this.car.brand);
      formData.append('model', this.car.model);
      formData.append('color', this.car.color);
      formData.append('price', this.car.price.toString());
      formData.append('description', this.car.description || '');
      formData.append('image', this.selectedFile);

      this.carService.addCarWithImage(formData).subscribe({
        next: () => {
          this.messageType = 'success';
          this.successMsg = 'Car added successfully.';
          this.resetForm();
        },
        error: (err) => {
          console.error(err);
          this.messageType = 'error';
          this.successMsg = 'Unable to add the car right now.';
        }
      });
    } else {
      this.carService.addCar(this.car).subscribe({
        next: () => {
          this.messageType = 'success';
          this.successMsg = 'Car added successfully.';
          this.resetForm();
        },
        error: (err) => {
          console.error(err);
          this.messageType = 'error';
          this.successMsg = 'Unable to add the car right now.';
        }
      });
    }
  }

  private resetForm() {
    this.car = { id: 0, brand: '', model: '', color: '', price: 0, description: '' };
    this.selectedFile = null;
    this.selectedFileName = '';
  }
}
