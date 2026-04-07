import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../core/api.config';

@Injectable({
  providedIn: 'root'
})
export class BuyNewCarService {

  private baseUrl = API_ENDPOINTS.newCars;

  constructor(private http: HttpClient) {}

  // Get all new cars
  getAllNewCars(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Get car details
  getCarById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
