import { TestBed } from '@angular/core/testing';

import { BuyNewCarService } from './buy-new-car-service';

describe('BuyNewCarService', () => {
  let service: BuyNewCarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyNewCarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
