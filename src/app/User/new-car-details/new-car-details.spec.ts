import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCarDetails } from './new-car-details';

describe('NewCarDetails', () => {
  let component: NewCarDetails;
  let fixture: ComponentFixture<NewCarDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCarDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCarDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
