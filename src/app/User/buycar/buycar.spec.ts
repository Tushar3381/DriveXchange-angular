import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Buycar } from './buycar';

describe('Buycar', () => {
  let component: Buycar;
  let fixture: ComponentFixture<Buycar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Buycar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Buycar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
