import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideRequestMngComponent } from './ride-request-mng.component';

describe('RideRequestMngComponent', () => {
  let component: RideRequestMngComponent;
  let fixture: ComponentFixture<RideRequestMngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RideRequestMngComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RideRequestMngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
