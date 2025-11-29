import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Admihome } from './admihome';

describe('Admihome', () => {
  let component: Admihome;
  let fixture: ComponentFixture<Admihome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Admihome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Admihome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
