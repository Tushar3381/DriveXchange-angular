import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsedCarDetails } from './used-car-details';

describe('UsedCarDetails', () => {
  let component: UsedCarDetails;
  let fixture: ComponentFixture<UsedCarDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsedCarDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsedCarDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
