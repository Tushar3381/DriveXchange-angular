import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Admindash } from './admindash';

describe('Admindash', () => {
  let component: Admindash;
  let fixture: ComponentFixture<Admindash>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Admindash]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Admindash);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
