import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { catchError, forkJoin, of } from 'rxjs';
import { BuyNewCarService } from '../service/buy-new-car-service';
import { SellCarService } from '../service/sell-car.Service';
import { TestDriveService } from '../service/test-drive-service';

@Component({
  selector: 'app-admihome',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admihome.html',
  styleUrls: ['./admihome.css']
})
export class Admihome implements OnInit {
  isLoading = true;
  lastUpdated = new Date();
  overview = {
    pendingCars: 0,
    totalNewCars: 0,
    totalRequests: 0,
    pendingRequests: 0,
    approvedRequests: 0
  };

  readonly quickActions = [
    {
      title: 'Review pending sellers',
      description: 'Keep used-car approvals moving quickly for faster marketplace updates.',
      route: '/dash/adminapprove-car',
      actionLabel: 'Open approvals'
    },
    {
      title: 'Manage car inventory',
      description: 'Edit pricing, descriptions, and photos from the active inventory list.',
      route: '/dash/carslist',
      actionLabel: 'View inventory'
    },
    {
      title: 'Add a fresh listing',
      description: 'Create a new car entry with complete specs and polished presentation.',
      route: '/dash/add-car',
      actionLabel: 'Add car'
    }
  ];

  readonly workflowTips = [
    'Start with seller approvals so new inventory reaches customers faster.',
    'Check pending test drives after approvals to keep follow-up response times low.',
    'Use the inventory screen for quick cleanup of prices, photos, and outdated cars.'
  ];

  constructor(
    private sellCarService: SellCarService,
    private testDriveService: TestDriveService,
    private buyNewCarService: BuyNewCarService
  ) {}

  ngOnInit() {
    this.loadOverview();
  }

  get summaryCards() {
    return [
      {
        label: 'Pending seller approvals',
        value: this.overview.pendingCars,
        tone: 'accent',
        detail: 'Used cars waiting for review'
      },
      {
        label: 'Active new-car listings',
        value: this.overview.totalNewCars,
        tone: 'primary',
        detail: 'Cars visible in the catalog'
      },
      {
        label: 'All test drive requests',
        value: this.overview.totalRequests,
        tone: 'soft',
        detail: 'Customer requests across statuses'
      },
      {
        label: 'Pending test drives',
        value: this.overview.pendingRequests,
        tone: 'warning',
        detail: 'Bookings still needing a decision'
      }
    ];
  }

  private loadOverview() {
    this.isLoading = true;

    forkJoin({
      pendingCars: this.sellCarService.getAllCar().pipe(catchError(() => of([]))),
      testDriveRequests: this.testDriveService.getAllRequests().pipe(catchError(() => of([]))),
      newCars: this.buyNewCarService.getAllNewCars().pipe(catchError(() => of([])))
    }).subscribe(({ pendingCars, testDriveRequests, newCars }) => {
      const requests = Array.isArray(testDriveRequests) ? testDriveRequests : [];

      this.overview = {
        pendingCars: Array.isArray(pendingCars) ? pendingCars.length : 0,
        totalNewCars: Array.isArray(newCars) ? newCars.length : 0,
        totalRequests: requests.length,
        pendingRequests: requests.filter((request) => !request.status || request.status === 'PENDING').length,
        approvedRequests: requests.filter((request) => request.status === 'APPROVED').length
      };

      this.lastUpdated = new Date();
      this.isLoading = false;
    });
  }
}
