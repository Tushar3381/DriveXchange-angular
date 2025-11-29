import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editcar } from './editcar';

describe('Editcar', () => {
  let component: Editcar;
  let fixture: ComponentFixture<Editcar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Editcar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Editcar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
