import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidedetailsComponent } from './ridedetails.component';

describe('RidedetailsComponent', () => {
  let component: RidedetailsComponent;
  let fixture: ComponentFixture<RidedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RidedetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RidedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
