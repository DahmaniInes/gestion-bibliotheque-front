import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event'; // Adjust path to your Evenement model

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private endpoint = 'http://localhost:8085/evenement'; // Matches Spring Boot endpoint

  constructor(private http: HttpClient) {}

  addEvenement(formData: FormData): Observable<Event> {
    return this.http.post<Event>(this.endpoint, formData);
  }

  getEvenements(): Observable<Event[]> {
    return this.http.get<Event[]>(this.endpoint);
  }

  getEvenementById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.endpoint}/${id}`);
  }

  updateEvenement(id: number, event: FormData): Observable<Event> {
    return this.http.put<Event>(`${this.endpoint}/${id}`, event);
  }

  removeEvenement(id: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }


  createPaymentIntent(id: number, paymentMethodId: string): Observable<{ client_secret: string; status: string }> {
    const params = new URLSearchParams();
    params.append('paymentMethodId', paymentMethodId);
    return this.http.post<{ client_secret: string; status: string }>(
      `${this.endpoint}/${id}/payment`,
      params.toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
  }
}