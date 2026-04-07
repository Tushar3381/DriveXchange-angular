import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SellCarService } from '../../service/sell-car.Service';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { MEDIA_ENDPOINTS } from '../../core/api.config';
import {
  DescriptionDetailItem,
  getDescriptionDetailItems,
  getDescriptionNarrativeParagraphs
} from '../../utils/car-description';

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
  activeImage = '';
  descriptionDetailItems: DescriptionDetailItem[] = [];
  descriptionParagraphs: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: SellCarService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.service.getCarById(id).subscribe(data => {
      this.car = data;
      this.descriptionDetailItems = getDescriptionDetailItems(data?.description);
      this.descriptionParagraphs = getDescriptionNarrativeParagraphs(data?.description);

      if (data.images) {
        this.images = data.images.split(',');
        this.activeImage = this.images[0] || '';
      }
    });
  }

  selectImage(img: string): void {
    this.activeImage = img;
  }

  getActiveImage(): string {
    if (!this.activeImage) {
      return '/car1.jpg';
    }

    return this.getImageUrl(this.activeImage);
  }

  getImageUrl(img: string): string {
    return `${MEDIA_ENDPOINTS.carUploads}/${img}`;
  }
}
