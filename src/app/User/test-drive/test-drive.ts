import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestDriveService } from '../../service/test-drive-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-test-drive',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './test-drive.html',
  styleUrls: ['./test-drive.css']
})
export class TestDriveComponent implements OnInit {

  formData = {
    carId: 0,
    userId: 0,
    userName: '',
    contactnumber: '',
    preferredDate: ''
  };

  constructor(
    private route: ActivatedRoute,
    private testDriveService: TestDriveService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // Get Car ID from URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.formData.carId = id;

    // Get Logged-in User
    const user = localStorage.getItem('user');

    if (user) {
      const loggedUser = JSON.parse(user);

      this.formData.userId = loggedUser.id;
      this.formData.userName = loggedUser.name;
      this.formData.contactnumber = loggedUser.contactnumber;
    } else {
      alert("Session expired. Please login again.");
      this.router.navigate(['/User/login']);
    }
  }

  submitRequest() {

    if (!this.formData.preferredDate) {
      alert("Please select a preferred date.");
      return;
    }

    this.testDriveService.requestTestDrive(this.formData)
      .subscribe({
        next: () => {
          alert("Test Drive Request Submitted Successfully! Wait for approval.");
          this.router.navigate(['/User/dashboard']);
        },
        error: () => {
          alert("Something went wrong. Please try again.");
        }
      });
  }

  goBack() {
    this.router.navigate(['/User/dashboard']);
  }

}
