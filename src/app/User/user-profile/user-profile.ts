import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserProfileService } from '../../service/user-profile.service';
import { Router } from '@angular/router';
import { CartCar, CartService } from '../../service/cart.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css']
})
export class UserProfileComponent implements OnInit {

  user: any = {};
  selectedFile: File | null = null;
  savedCars: CartCar[] = [];

  constructor(
    private profileService: UserProfileService,
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      this.router.navigate(['/User/login']);
      return;
    }
    const userData = JSON.parse(storedUser);
    this.savedCars = this.cartService.getCars();
    this.loadUserProfile(userData.id);
  }

  loadUserProfile(id: number) {
    this.profileService.getUserProfile(id).subscribe(
      data => {
        this.user = data;
      },
      error => {
        console.log('Error loading profile', error);
      }
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files?.[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.profileImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
}


  updateProfile() {
    const payload = {
      id: this.user.id,
      name: this.user.name,
      contactnumber: String(this.user.contactnumber || '')
    };

    this.profileService.updateUserProfile(payload).subscribe(
      data => {
        alert('Profile Updated Successfully');
        localStorage.setItem('user', JSON.stringify(data));
        this.user = data;
      },
      error => {
        console.log('Error updating profile', error);
        alert('Profile update failed. Please try again.');
      }
    );
  }

  goToChangePassword() {
    this.router.navigate(['/User/change-password']);
  }

  backToDashboard() {
    this.router.navigate(['/User/dashboard']);
  }

  browseNewCars() {
    this.router.navigate(['/User/buy-new-car']);
  }

  viewCarDetails(id: number) {
    this.router.navigate(['/User/buy-new-car', id]);
  }

  removeSavedCar(id: number) {
    this.cartService.removeCar(id);
    this.savedCars = this.cartService.getCars();
  }

  get savedCarsTotal(): number {
    return this.savedCars.reduce((total, car) => total + (Number(car.price) || 0), 0);
  }

  get profileInitials(): string {
    const parts = String(this.user.name || 'User')
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    const first = parts[0]?.charAt(0) || 'U';
    const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : '';

    return `${first}${last}`.toUpperCase();
  }

}
