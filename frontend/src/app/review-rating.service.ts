import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewRatingService {

  private baseUrl = 'http://localhost:3000/api/v1/review-ratings'; 

  constructor(private http: HttpClient) { }

  createReviewRating(reviewRating: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, reviewRating);
  }

  getReviewRatings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`);
  }

  getReviewsByRideId(rideId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/by-ride/${rideId}`);
  }

  getReviewRatingById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateReviewRating(id: string, updatedReviewRating: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, updatedReviewRating);
  }

  deleteReviewRating(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
