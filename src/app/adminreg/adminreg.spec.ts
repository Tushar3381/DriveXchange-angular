import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adminreg } from './adminreg';

describe('Adminreg', () => {
  let component: Adminreg;
  let fixture: ComponentFixture<Adminreg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adminreg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adminreg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
