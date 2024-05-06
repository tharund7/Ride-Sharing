import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-rating-sys',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-rating-sys.component.html',
  styleUrl: './review-rating-sys.component.css'
})
export class ReviewRatingSysComponent {
  stars: number[] = [1, 2, 3, 4, 5];
  highlightedStars: number = 0;

  highlightStars(event: MouseEvent): void {
    const starIndex = (event.target as HTMLSpanElement).getAttribute('data-index');
    this.highlightedStars = starIndex ? +starIndex : 0;
  }

  selectRating(event: MouseEvent): void {
    const starIndex = (event.target as HTMLSpanElement).getAttribute('data-index');
    this.highlightedStars = starIndex ? +starIndex : 0;
  }

  submitReview(): void {
    const selectedRating = this.highlightedStars;
    const reviewText = (document.querySelector('.review-textarea') as HTMLTextAreaElement).value;

    console.log(`Selected Rating: ${selectedRating}`);
    console.log(`Review Text: ${reviewText}`);
  }
}
