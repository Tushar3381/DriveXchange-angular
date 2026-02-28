import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserProfileService } from '../../service/user-profile.service';
import { Router } from '@angular/router';

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

  constructor(
    private profileService: UserProfileService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      this.router.navigate(['/User/login']);
      return;
    }
    const userData = JSON.parse(storedUser);
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
  const file = event.target.files?.[0]; // safely get the file
  if (file) {
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.user.profileImage = e.target.result; // Base64 string
    };
    reader.readAsDataURL(file); // use the non-null file here
  }
}


  updateProfile() {
    this.profileService.updateUserProfile(this.user).subscribe(
      data => {
        alert('Profile Updated Successfully');
        localStorage.setItem('user', JSON.stringify(data));
      },
      error => {
        console.log('Error updating profile', error);
      }
    );
  }

  goToChangePassword() {
    this.router.navigate(['/User/change-password']);
  }

  backToDashboard() {
    this.router.navigate(['/User/dashboard']);
  }

}
