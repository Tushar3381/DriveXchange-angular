import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyNewCar } from './buy-new-car';

describe('BuyNewCar', () => {
  let component: BuyNewCar;
  let fixture: ComponentFixture<BuyNewCar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyNewCar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyNewCar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
