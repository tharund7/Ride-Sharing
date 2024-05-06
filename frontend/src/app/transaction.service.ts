import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private baseUrl = 'http://localhost:3000/api/v1/transactions';

  constructor(private http: HttpClient) { }

  createTransaction(payFormData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, payFormData);
  }

  getTransactions(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`);
  }

  getTransactionById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getTransactionsByRideId(rideId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/by-ride/${rideId}`);
  }

  updateTransaction(id: string, updatedTransaction: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, updatedTransaction);
  }

  updateTransactionByRideId(rideId: string, updatedTransaction: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/by-ride/${rideId}`, updatedTransaction);
  }

  deleteTransaction(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
