import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sellcar } from './sellcar';

describe('Sellcar', () => {
  let component: Sellcar;
  let fixture: ComponentFixture<Sellcar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sellcar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sellcar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
