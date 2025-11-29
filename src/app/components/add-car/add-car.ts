import { Component } from '@angular/core';
import { CarService } from '../../service/car.service';
import { Car } from '../../Models/car';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-car.html',
  styleUrls: ['./add-car.css']
})
export class AddCarComponent {
  car: Car = { id: 0, brand: '', model: '', color: '', price: 0, description:'' };
  selectedFile: File | null = null;
  successMsg: string = '';

  constructor(private carService: CarService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.selectedFile) {
      // Upload with image
      const formData = new FormData();
      formData.append('id', this.car.id.toString());
      formData.append('brand', this.car.brand);
      formData.append('model', this.car.model);
      formData.append('color', this.car.color);
      formData.append('price', this.car.price.toString());
      formData.append('description', this.car.description || '');
      formData.append('image', this.selectedFile);

      this.carService.addCarWithImage(formData).subscribe({
        next: (res) => {
          this.successMsg = 'Car added successfully!';
          this.car = { id: 0, brand: '', model: '', color: '', price: 0, description:"" }; // reset form
        },
        error: (err) => {
          console.error(err);
          this.successMsg = 'Error adding car!';
        }
      });
    } else {
      // Upload without image
      this.carService.addCar(this.car).subscribe({
        next: (res) => {
          this.successMsg = 'Car added successfully!';
          this.car = { id: 0, brand: '', model: '', color: '', price: 0 , description:""};
        },
        error: (err) => {
          console.error(err);
          this.successMsg = 'Error adding car!';
        }
      });
    }
  }
}
