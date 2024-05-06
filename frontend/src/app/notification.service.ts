import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUrl = 'http://localhost:3000/api/v1/notifications';

  constructor(private http: HttpClient) { }

  createNotification(notification: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, notification);
  }

  getNotifications(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`);
  }

  getNotificationById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getNotificationsByUserId(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/by-user/${id}`);
  }

  updateNotification(id: string, updatedNotification: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, updatedNotification);
  }

  markNotificationAsRead(id: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/mark-as-read/${id}`, null);
  }

  deleteNotification(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
