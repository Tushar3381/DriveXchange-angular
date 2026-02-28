import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfileService } from '../../service/user-profile.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './change-password.html',
  styleUrls: ['./change-password.css']
})
export class ChangePasswordComponent {

  oldPassword = '';
  newPassword = '';
  confirmPassword = '';

  showOld = false;
  showNew = false;
  showConfirm = false;

  constructor(
    private service: UserProfileService,
    private router: Router
  ) {}


  changePassword() {

    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      alert("Session expired. Please login again.");
      this.router.navigate(['/User/login']);
      return;
    }

    const user = JSON.parse(storedUser);

    if (this.newPassword !== this.confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    const data = {
      id: user.id,
      oldPassword: this.oldPassword,
      newPassword: this.newPassword
    };

    this.service.changePassword(data).subscribe(
      res => {
        alert("Password Changed Successfully!");

        // After password change force logout
        localStorage.clear();
        this.router.navigate(['/User/login']);
      },
      err => {
        alert(err.error);
      }
    );
  }

  back() {
    this.router.navigate(['/User/dashboard']);
  }
}
