import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverAssignmentMngComponent } from './driver-assignment-mng.component';

describe('DriverAssignmentMngComponent', () => {
  let component: DriverAssignmentMngComponent;
  let fixture: ComponentFixture<DriverAssignmentMngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverAssignmentMngComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DriverAssignmentMngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
