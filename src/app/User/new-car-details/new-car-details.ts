import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuyNewCarService } from '../../service/buy-new-car-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MEDIA_ENDPOINTS } from '../../core/api.config';
import {
  DescriptionDetailItem,
  getDescriptionDetailItems,
  getDescriptionNarrativeParagraphs
} from '../../utils/car-description';



@Component({
  selector: 'app-new-car-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-car-details.html',
  styleUrl: './new-car-details.css'
})
export class CarDetailsComponent implements OnInit {

  car: any;
  readonly uploadsBase = MEDIA_ENDPOINTS.uploads;
  descriptionDetailItems: DescriptionDetailItem[] = [];
  descriptionParagraphs: string[] = [];
  

  constructor(
  private route: ActivatedRoute,
  private carService: BuyNewCarService,
  private router: Router
) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.carService.getCarById(id).subscribe(data => {
      this.car = data;
      this.descriptionDetailItems = getDescriptionDetailItems(data?.description);
      this.descriptionParagraphs = getDescriptionNarrativeParagraphs(data?.description);
    });
  }

  goToTestDrive() {
  this.router.navigate(['/User/test-drive', this.car.id]);
  }
 buyCar() {
  this.router.navigate(['/User/payment', this.car.id]);
}

}
