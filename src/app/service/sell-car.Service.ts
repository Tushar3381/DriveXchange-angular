import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../core/api.config';

// CARS FOR THE SELLCAR


@Injectable({
  providedIn: 'root'
})
export class SellCarService {

  private baseUrl = API_ENDPOINTS.sellcar;

  constructor(private http: HttpClient) {}

  // Get all sell cars (admin view)
  getAllCar(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/pending`);
  }

  // Approve sell car
  approveCar(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/approve/${id}`, {});
  }

  // Reject sell car
  rejectCar(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/reject/${id}`, {});
  }

// getAllCar(): Observable<any[]> {
//   return this.http.get<any[]>(`${this.baseUrl}/all`);

// Get only approved second hand cars (for user buy section)
getApprovedCars(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/approved`);
}


// Get car by id (for details page)
getCarById(id: number): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/${id}`);
}





}





