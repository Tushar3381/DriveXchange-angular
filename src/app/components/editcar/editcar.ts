import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../service/car.service';
import { Car } from '../../Models/car';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MEDIA_ENDPOINTS } from '../../core/api.config';
import Swal from 'sweetalert2';
import { normalizeCarDescription } from '../../utils/car-description';

@Component({
  selector: 'app-edit-car',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editcar.html',
  styleUrls: ['./editcar.css']
})
export class EditCarComponent implements OnInit {
  car: Car = {
    id: 0,
    brand: '',
    model: '',
    color: '',
    price: 0,
    description: '',
    imageUrl: ''
  };
  selectedImage?: File; // hold new image if chosen
  selectedImageName = '';
  readonly carImagesBase = MEDIA_ENDPOINTS.carImages;
  readonly descriptionPlaceholder =
    'Example:\nEngine: 1.5L Petrol\nMileage: 18 km/l\nSafety: 6 airbags\nComfort: Sunroof and rear AC vents';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.carService.getCarById(id).subscribe({
      next: (data) => {
        this.car = data;
      },
      error: (err) => {
        console.error('Error fetching car details:', err);
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0];
    this.selectedImageName = this.selectedImage ? this.selectedImage.name : '';
  }


  onSubmit(): void {
    this.car = {
      ...this.car,
      description: normalizeCarDescription(this.car.description)
    };

    this.carService.updateCar(this.car.id, this.car, this.selectedImage).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Car updated successfully',
          timer: 1600,
          showConfirmButton: false
        });
        this.router.navigate(['/dash/carslist']); // back to list
      },
      error: (err) => {
        console.error('Error updating car:', err);
        Swal.fire({
          icon: 'error',
          title: 'Unable to update car',
          text: 'Please review the details and try again.'
        });
      }
    });
  }

  get previewImageUrl() {
    return this.car.imageUrl ? `${this.carImagesBase}/${this.car.imageUrl}` : '';
  }
}
