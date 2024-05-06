import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RideRequestService {

  private baseUrl = 'http://localhost:3000/api/v1/ride-requests';
  constructor(private http: HttpClient) { }

  createRideRequest(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, request);
  }

  getRideRequests(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`);
  }

  getRideRequestById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getRideRequestsByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${userId}`);
  }

  updateRideRequest(id: string, updatedRequest: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, updatedRequest);
  }

  deleteRideRequest(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
