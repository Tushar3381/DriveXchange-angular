import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SellCarService } from '../../service/sell-car.Service';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-used-car-details',
   standalone: true,
  imports: [CommonModule],
  templateUrl: './used-car-details.html',
  styleUrl: './used-car-details.css'
})
export class UsedCarDetails implements OnInit {

  car: any;
  images: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: SellCarService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.service.getCarById(id).subscribe(data => {
      this.car = data;

      if (data.images) {
        this.images = data.images.split(',');
      }
    });
  }

  getImageUrl(img: string): string {
    return 'http://localhost:8080/car-uploads/' + img;
  }
}
