import { Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home').then((m) => m.HomeComponent),
    pathMatch: 'full'
  },
  { path: 'home', redirectTo: '', pathMatch: 'full' },

  // -------------------------
  // USER ROUTES
  // -------------------------
  {
    path: 'User/register',
    loadComponent: () => import('./User/register/register').then((m) => m.RegisterComponent)
  },
  {
    path: 'User/login',
    loadComponent: () => import('./User/login/login').then((m) => m.Login)
  },
  {
    path: 'User/dashboard',
    loadComponent: () => import('./User/dashboard/dashboard').then((m) => m.DashboardComponent)
  },
  {
    path: 'User/buy-second-hand',
    loadComponent: () => import('./User/buy-second-hand-car/buy-second-hand-car').then((m) => m.BuySecondHandCar)
  },
  {
    path: 'User/buy-new-car',
    loadComponent: () => import('./User/buy-new-car/buy-new-car').then((m) => m.BuyNewCarComponent)
  },
  {
    path: 'User/buy-new-car/:id',
    loadComponent: () => import('./User/new-car-details/new-car-details').then((m) => m.CarDetailsComponent)
  },
  {
    path: 'User/sellcar',
    loadComponent: () => import('./User/sellcar/sellcar').then((m) => m.SellCar)
  },
  {
    path: 'User/buy-second-hand/:id',
    loadComponent: () => import('./User/used-car-details/used-car-details').then((m) => m.UsedCarDetails)
  },
  {
    path: 'User/test-drive/:id',
    loadComponent: () => import('./User/test-drive/test-drive').then((m) => m.TestDriveComponent)
  },
  {
    path: 'User/user-profile',
    loadComponent: () => import('./User/user-profile/user-profile').then((m) => m.UserProfileComponent)
  },
  {
    path: 'User/change-password',
    loadComponent: () => import('./User/change-password/change-password').then((m) => m.ChangePasswordComponent)
  },
  {
    path: 'User/payment/:id',
    loadComponent: () => import('./User/payment/payment').then((m) => m.PaymentComponent)
  },
  {
    path: 'User/forgotpassword',
    loadComponent: () => import('./User/forgotpassword/forgotpassword').then((m) => m.ForgotPassword)
  },

  // -------------------------
  // ADMIN ROUTES
  // -------------------------
  {
    path: 'Admin/signup',
    loadComponent: () => import('./adminreg/adminreg').then((m) => m.Adminreg)
  },
  {
    path: 'Admin/login',
    loadComponent: () => import('./adminlogin/adminlogin').then((m) => m.Adminlogin)
  },
  {
    path: 'dash',
    canActivate: [AuthGuard],
    loadComponent: () => import('./admindash/admindash').then((m) => m.Admindash),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./admihome/admihome').then((m) => m.Admihome)
      },
      {
        path: 'add-car',
        loadComponent: () => import('./components/add-car/add-car').then((m) => m.AddCarComponent)
      },
      {
        path: 'carslist',
        loadComponent: () => import('./components/car-list/car-list').then((m) => m.CarListComponent)
      },
      {
        path: 'adminapprove-car',
        loadComponent: () => import('./Admin/manage-cars/manage-cars').then((m) => m.ManageCarsComponent)
      },
      {
        path: 'editcar/:id',
        loadComponent: () => import('./components/editcar/editcar').then((m) => m.EditCarComponent)
      },
      {
        path: 'testdrive-requests',
        loadComponent: () => import('./Admin/admin-test-drive/admin-test-drive').then((m) => m.AdminTestDrive)
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: '' }
];
