import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private baseUrl = 'http://localhost:8080/sellcar';

  constructor(private http: HttpClient) {}

  // Fetch only cars submitted by users (PENDING, for admin)
  getAllCars(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pending`);
  }

  // Approve a car listing
  approveCar(carId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/approve/${carId}`, {});
  }

  // Reject a car listing
  rejectCar(carId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/reject/${carId}`, {});
  }
}

