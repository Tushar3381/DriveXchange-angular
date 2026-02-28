import { Component, OnInit } from '@angular/core';
import { TestDriveService } from '../../service/test-drive-service';
import { BuyNewCarService } from '../../service/buy-new-car-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-test-drive',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-test-drive.html',
  styleUrls: ['./admin-test-drive.css']
})
export class AdminTestDrive implements OnInit {

  requests: any[] = [];

  constructor(
    private testDriveService: TestDriveService,
    private carService: BuyNewCarService
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests() {
    this.testDriveService.getAllRequests()
      .subscribe((data: any) => {

        this.requests = data;

        for (let req of this.requests) {

          this.carService.getCarById(req.carId)
            .subscribe((car: any) => {
              req.carBrand = car.brand;
              req.carModel = car.model;
            });

        }

      });
  }

  updateStatus(id: number, status: string) {
    this.testDriveService.updateStatus(id, status)
      .subscribe(() => {
        alert("Status Updated Successfully!");
        this.loadRequests();
      });
  }
}
