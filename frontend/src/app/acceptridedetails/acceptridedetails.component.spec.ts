import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptridedetailsComponent } from './acceptridedetails.component';

describe('AcceptridedetailsComponent', () => {
  let component: AcceptridedetailsComponent;
  let fixture: ComponentFixture<AcceptridedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptridedetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcceptridedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
