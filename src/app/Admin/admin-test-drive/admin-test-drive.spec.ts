import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTestDrive } from './admin-test-drive';

describe('AdminTestDrive', () => {
  let component: AdminTestDrive;
  let fixture: ComponentFixture<AdminTestDrive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTestDrive]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTestDrive);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
