// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { FormsModule } from '@angular/forms'; 

// @Component({
//   selector: 'app-adminreg',
//   standalone: true, 
//   imports: [FormsModule], 
//   templateUrl: './adminreg.html',
//   styleUrls: ['./adminreg.css']
// })
// export class Adminreg {

//   constructor(private http: HttpClient, private router: Router) {}

//   adminName = '';
//   adminEmail = '';
//   adminPassword = '';

//   onSubmit() {
//     const admin = {
//       aname: this.adminName,
//   aemail: this.adminEmail,
//   apass: this.adminPassword
//     };

//     this.http.post('http://localhost:8080/admin/saveAdminInfo', admin).subscribe(
//       (response) => {
//         console.log('Signup successful:', response);
//         this.router.navigate(['/Login']);
//       },
//       (error) => {
//         console.error('Signup failed:', error);
//         alert("Signup failed. Please try again.");
//       }
//     );
//   }
// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms'; 
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-adminreg',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './adminreg.html',
  styleUrls: ['./adminreg.css']
})
export class Adminreg {

  handleclick(){
   this.router.navigate(['Login']);
  }

  constructor(private http: HttpClient, private router: Router) {}

  adminName = '';
  adminEmail = '';
  adminPassword = '';

  onSubmit(form: NgForm) {
    if (!form.valid) {
      alert("Please fill all the required fields correctly.");
      return;
    }

    const admin = {
      aname: this.adminName,
      aemail: this.adminEmail,
      apass: this.adminPassword
    };

    this.http.post('http://localhost:8080/admin/saveAdminInfo', admin).subscribe(
      (response) => {
        console.log('Signup successful:', response);
        alert("Signup successful!");
        this.router.navigate(['Login']); // make sure 'login' route is correctly configured
      },
      (error) => {
        console.error('Signup failed:', error);
        alert("Signup failed. Please try again.");
      }
    );
  }
}
