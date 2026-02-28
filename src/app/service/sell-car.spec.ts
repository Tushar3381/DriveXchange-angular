import { TestBed } from '@angular/core/testing';

import { SellCar } from './sell-car';

describe('SellCar', () => {
  let service: SellCar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellCar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
