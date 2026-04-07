import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../Models/car';
import { API_ENDPOINTS } from '../core/api.config';


//ADMIN ADDED CARS ONLY


@Injectable({
  providedIn: 'root'
})
export class CarService {
  private baseUrl = API_ENDPOINTS.cars;

  constructor(private http: HttpClient) {}

  // Get all cars
  getAllCars() {
  return this.http.get<Car[]>(`${API_ENDPOINTS.cars}/fetchcars`);
}

  // Get car by ID
  getCarById(carId: number) {
  return this.http.get<Car>(`${API_ENDPOINTS.cars}/getCarbyId/${carId}`);
}

  // Add car (without image)
  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(`${this.baseUrl}/saveCarInfo`, car);
  }

  // Add car with image
  addCarWithImage(formData: FormData): Observable<Car> {
    return this.http.post<Car>(`${this.baseUrl}/saveCarWithImage`, formData);
  }

  // // Update car
  // updateCar(id: number, car: Car): Observable<Car> {
  //   return this.http.put<Car>(`${this.baseUrl}/update/${id}`, car);   
  // }

// Update car (with or without image)
  updateCar(id: number, car: Car, image?: File): Observable<Car> {
    const formData = new FormData();
    formData.append('car', JSON.stringify(car));
    if (image) {
      formData.append('image', image);
    }

    return this.http.put<Car>(`${this.baseUrl}/update/${id}`, formData);
  }

  // Delete car
  deleteCar(carId: number) {
  return this.http.delete(`${API_ENDPOINTS.cars}/del/${carId}`);
}

  // Search by brand
  searchByBrand(brand: string): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.baseUrl}/search/brand/${brand}`);
  }

  // Search by model
  searchByModel(model: string): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.baseUrl}/search/model/${model}`);
  }
}
