import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Admin Components
import { Adminreg } from './adminreg/adminreg';
import { Adminlogin } from './adminlogin/adminlogin';
import { Admindash } from './admindash/admindash';
import { Admihome } from './admihome/admihome';

// Admin Car Components
import { AddCarComponent } from './components/add-car/add-car';
import { CarListComponent } from './components/car-list/car-list';
import { EditCarComponent } from './components/editcar/editcar';

// User Components
import { RegisterComponent } from './User/register/register';
import { Login } from './User/login/login';
import { DashboardComponent } from './User/dashboard/dashboard';
import { BuyCar } from './User/buycar/buycar';
import { SellCar } from './User/sellcar/sellcar';

// Guards
import { AuthGuard } from './auth/auth.guard';
import { ManageCarsComponent } from './Admin/manage-cars/manage-cars';


export const routes: Routes = [

  // -------------------------
  // USER ROUTES
  // -------------------------
  { path: "User/register", component: RegisterComponent },
  { path: "User/login", component: Login },
  { path: "User/dashboard", component: DashboardComponent },
  { path: "User/buycar", component: BuyCar },
  { path: "User/sellcar", component: SellCar },

  // -------------------------
  // ADMIN ROUTES
  // -------------------------
  { path: "Admin/signup", component: Adminreg },
  { path: "Admin/login", component: Adminlogin },
 // {path: 'admin/manage-cars', component: ManageCarsComponent},

  {
    path: "dash",
    component: Admindash,
    canActivate: [AuthGuard],
    
    children: [
      { path: "home", component: Admihome },
      { path: "add-car", component: AddCarComponent },
      { path: "carslist", component: CarListComponent },
      {path:"adminapprove-car",component:ManageCarsComponent},
      { path: "editcar/:id", component: EditCarComponent },

      // Default child route
      { path: "", redirectTo: "home", pathMatch: "full" }
    ]
  },

  // -------------------------
  // DEFAULT ROOT REDIRECT
  // -------------------------
  { path: "", redirectTo: "User/login", pathMatch: "full" },
  { path: "**", redirectTo: "User/login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
