import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Panier } from './panier.model';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private apiUrl = 'http://localhost:8082/api/paniers';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Panier[]> {
    return this.http.get<Panier[]>(this.apiUrl);
  }

  getById(id: number): Observable<Panier> {
    return this.http.get<Panier>(`${this.apiUrl}/${id}`);
  }

  create(panier: Panier): Observable<Panier> {
    return this.http.post<Panier>(this.apiUrl, panier);
  }

  update(id: number, panier: Panier): Observable<Panier> {
    return this.http.put<Panier>(`${this.apiUrl}/${id}`, panier);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
