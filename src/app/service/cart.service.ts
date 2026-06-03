import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MEDIA_ENDPOINTS } from '../core/api.config';

export interface CartCar {
  id: number;
  brand: string;
  model: string;
  price: number;
  color?: string;
  imageUrl?: string;
  addedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly storageKey = 'drivexchange_new_car_cart';
  private readonly carsSubject = new BehaviorSubject<CartCar[]>(this.readCars());

  readonly cars$ = this.carsSubject.asObservable();

  getCars(): CartCar[] {
    return this.carsSubject.value;
  }

  addCar(car: any): boolean {
    const id = Number(car.id);

    if (!id || this.isInCart(id)) {
      return false;
    }

    const selectedCar: CartCar = {
      id,
      brand: car.brand || 'Unknown brand',
      model: car.model || 'Unknown model',
      price: Number(car.price) || 0,
      color: car.color || '',
      imageUrl: car.imageUrl ? `${MEDIA_ENDPOINTS.uploads}/${car.imageUrl}` : '/car1.jpg',
      addedAt: new Date().toISOString()
    };

    this.saveCars([...this.getCars(), selectedCar]);
    return true;
  }

  removeCar(id: number): void {
    this.saveCars(this.getCars().filter((car) => car.id !== id));
  }

  isInCart(id: number): boolean {
    return this.getCars().some((car) => car.id === Number(id));
  }

  clear(): void {
    this.saveCars([]);
  }

  private readCars(): CartCar[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private saveCars(cars: CartCar[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(cars));
    this.carsSubject.next(cars);
  }
}
