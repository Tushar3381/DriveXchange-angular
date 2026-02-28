import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuyNewCarService {

  private baseUrl = 'http://localhost:8080/user/buy-new-car';

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