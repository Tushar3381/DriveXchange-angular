import { TestBed } from '@angular/core/testing';

import { BuyUsedCar } from './buy-used-car';

describe('BuyUsedCar', () => {
  let service: BuyUsedCar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyUsedCar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
