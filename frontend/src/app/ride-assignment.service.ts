import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RideAssignmentService {

  private baseUrl = 'http://localhost:3000/api/v1/ride-assignments'; 

  constructor(private http: HttpClient) { }

  createRideAssignment(assignment: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, assignment);
  }

  getRideAssignments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`);
  }

  getRideAssignmentById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getRideAssignmentByRequestId(rideRequestId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/by-request/${rideRequestId}`);
  }

  updateRideAssignment(id: string, updatedAssignment: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, updatedAssignment);
  }

  deleteRideAssignment(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
