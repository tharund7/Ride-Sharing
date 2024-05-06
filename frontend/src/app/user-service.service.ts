import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private baseUrl = 'http://localhost:3000/api/v1/users';

  constructor(private http: HttpClient, private router: Router) { }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  verifyEmail(verificationToken: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/verify-email/${verificationToken}`);
  }

  loginUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, user);
  }

  storeUserData(token: string): void {
    const decodedToken: any = jwtDecode(token);
    localStorage.setItem('currentUser', JSON.stringify(decodedToken));
    console.log('Decoded Token:', decodedToken);
    console.log('User data stored successfully:', decodedToken);
  }

  getCurrentUser(): any | null {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateUser(id: string, userData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, userData);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgot-password`, { email });
  }

  resetPassword(resetToken: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password/${resetToken}`, { newPassword });
  }

  updateUserRole(id: string, newRole: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, { role: newRole });
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  isAuthenticated(): boolean {
    const currentUser = this.getCurrentUser();
    return currentUser !== null;
  }
}
