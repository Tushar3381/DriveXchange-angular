import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuySecondHandCar } from './buy-second-hand-car';

describe('BuySecondHandCar', () => {
  let component: BuySecondHandCar;
  let fixture: ComponentFixture<BuySecondHandCar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuySecondHandCar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuySecondHandCar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
