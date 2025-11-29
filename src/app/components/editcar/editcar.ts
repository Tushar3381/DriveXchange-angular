import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../service/car.service';
import { Car } from '../../Models/car';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  imageUrl: ''   // still safe here
};
  selectedImage?: File; // hold new image if chosen


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
  }


onSubmit(): void {
    this.carService.updateCar(this.car.id, this.car, this.selectedImage).subscribe({
      next: () => {
        alert('Car updated successfully!');
        this.router.navigate(['/cars']); // back to list
      },
      error: (err) => {
        console.error('Error updating car:', err);
      }
    });
  }
}
