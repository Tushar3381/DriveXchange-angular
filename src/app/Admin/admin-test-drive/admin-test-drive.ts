import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError, forkJoin, map, of } from 'rxjs';
import Swal from 'sweetalert2';
import { TestDriveService } from '../../service/test-drive-service';
import { BuyNewCarService } from '../../service/buy-new-car-service';

@Component({
  selector: 'app-admin-test-drive',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-test-drive.html',
  styleUrls: ['./admin-test-drive.css']
})
export class AdminTestDrive implements OnInit {
  requests: any[] = [];
  filteredRequests: any[] = [];
  filterStatus = 'ALL';
  readonly filterOptions = ['ALL', 'PENDING', 'APPROVED', 'REJECTED'];

  constructor(
    private testDriveService: TestDriveService,
    private carService: BuyNewCarService
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests() {
    this.testDriveService.getAllRequests().subscribe((data: any) => {
      const requests = Array.isArray(data) ? data : [];

      if (!requests.length) {
        this.requests = [];
        this.applyFilter();
        return;
      }

      forkJoin(
        requests.map((request) =>
          this.carService.getCarById(request.carId).pipe(
            map((car: any) => ({
              ...request,
              carBrand: car?.brand || 'Car',
              carModel: car?.model || `#${request.carId}`
            })),
            catchError(() =>
              of({
                ...request,
                carBrand: 'Car',
                carModel: `#${request.carId}`
              })
            )
          )
        )
      ).subscribe((enrichedRequests) => {
        this.requests = enrichedRequests;
        this.applyFilter();
      });
    });
  }

  applyFilter() {
    if (this.filterStatus === 'ALL') {
      this.filteredRequests = this.requests;
      return;
    }

    this.filteredRequests = this.requests.filter((request) => request.status === this.filterStatus);
  }

  updateStatus(id: number, status: string) {
    this.testDriveService.updateStatus(id, status)
      .subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Request updated',
          text: `The request was marked as ${status.toLowerCase()}.`,
          timer: 1600,
          showConfirmButton: false
        });
        this.loadRequests();
      });
  }

  get totalRequests() {
    return this.requests.length;
  }

  get pendingRequests() {
    return this.requests.filter((request) => !request.status || request.status === 'PENDING').length;
  }

  get approvedRequests() {
    return this.requests.filter((request) => request.status === 'APPROVED').length;
  }

  get rejectedRequests() {
    return this.requests.filter((request) => request.status === 'REJECTED').length;
  }

  trackByRequestId(_: number, request: any) {
    return request.id;
  }
}
