import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admindash',
   standalone: true,
   imports: [CommonModule, RouterModule],
  templateUrl: './admindash.html',
  styleUrls: ['./admindash.css']
})
export class Admindash {

  constructor(private router: Router) {}

  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout'
    }).then((result) => {
      if (result.isConfirmed) {

        // remove session
        localStorage.removeItem('adminToken');

        Swal.fire(
          'Logged Out!',
          'You have successfully logged out.',
          'success'
        );

        // redirect to login
        this.router.navigate(['Admin/login']);
      }
    });
  }

}
