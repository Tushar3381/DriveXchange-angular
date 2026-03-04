import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home';

// Admin Components
import { Adminreg } from './adminreg/adminreg';

import { Adminlogin } from './adminlogin/adminlogin';

import { Admindash } from './admindash/admindash';

import { Admihome } from './admihome/admihome';

// Admin Car Components
import { AddCarComponent } from './components/add-car/add-car';

import { CarListComponent } from './components/car-list/car-list';

import { EditCarComponent } from './components/editcar/editcar';

import { ManageCarsComponent } from './Admin/manage-cars/manage-cars';

import { AdminTestDrive } from './Admin/admin-test-drive/admin-test-drive';


// User Components
import { RegisterComponent } from './User/register/register';

import { Login } from './User/login/login';

import { DashboardComponent } from './User/dashboard/dashboard';

import { UserProfileComponent } from './User/user-profile/user-profile';

import { ChangePasswordComponent } from './User/change-password/change-password';

import { ForgotPassword } from './User/forgotpassword/forgotpassword';


// USER CAR COMPONENTS 
import { BuyNewCarComponent } from './User/buy-new-car/buy-new-car';               // BUY NEW CAR

import { BuySecondHandCar } from './User/buy-second-hand-car/buy-second-hand-car'; //BUY OLD CAR

import { SellCar } from './User/sellcar/sellcar';                                //SELL YOUR OLD CAR

import { CarDetailsComponent } from './User/new-car-details/new-car-details';  //NEW CAR DETAILS

import { UsedCarDetails } from './User/used-car-details/used-car-details';    //OLD CAR DETAILS

import { TestDriveComponent } from './User/test-drive/test-drive';           //TEST DRIVE BOKKING

import { PaymentComponent } from './User/payment/payment';

// Guards
import { AuthGuard } from './auth/auth.guard';


export const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "home", redirectTo: "", pathMatch: "full" },

  // -------------------------
  // USER ROUTES
  // -------------------------
  { path: "User/register", component: RegisterComponent },                //USER REGISTRATION

  { path: "User/login", component: Login },                              //USER LOGIN

  {
  path: 'User/dashboard', component:DashboardComponent},//USER DASHBOARD

  {path: "User/buy-second-hand", component:BuySecondHandCar},          //USER BUY SECOND HAND CAR

  {path:'User/buy-new-car', component:BuyNewCarComponent},            //USER BUY NEW CAR

  {path:'User/buy-new-car/:id',component:CarDetailsComponent},       //NEW CAR DTAILS

  { path: "User/sellcar", component: SellCar },                     //SELL OLD CAR

  {path:"User/buy-second-hand/:id",component: UsedCarDetails},      //OLD CAR DETAILS

  {path:"User/test-drive/:id",component: TestDriveComponent},      //TEST DRIVE REQUEST TO ADMIN

  {path:'User/user-profile', component:UserProfileComponent},      //User Profile VISIT

  {path:"User/change-password", component:ChangePasswordComponent},  //User Change The Password
  
 {path:"User/payment/:id", component:PaymentComponent},             //User PAYMENT

 {path:"User/forgotpassword", component:ForgotPassword},            //USER FORGOT-PASSWORD


  // -------------------------
  // ADMIN ROUTES
  // -------------------------
  { path: "Admin/signup", component: Adminreg },

  { path: "Admin/login", component: Adminlogin },

  {path: "dash",component: Admindash,
    canActivate: [AuthGuard],
    children: [
      { path: "home", component: Admihome },

      { path: "add-car", component: AddCarComponent },

      { path: "carslist", component: CarListComponent },

      {path:"adminapprove-car",component:ManageCarsComponent},

      { path: "editcar/:id", component: EditCarComponent },

      {path: "testdrive-requests", component:AdminTestDrive},

    


      // Default child route
      { path: "", redirectTo: "home", pathMatch: "full" }
    ]
  },

  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
