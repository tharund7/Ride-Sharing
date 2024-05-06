import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewRatingSysComponent } from './review-rating-sys.component';

describe('ReviewRatingSysComponent', () => {
  let component: ReviewRatingSysComponent;
  let fixture: ComponentFixture<ReviewRatingSysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewRatingSysComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewRatingSysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
