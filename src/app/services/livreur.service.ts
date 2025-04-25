// src/app/services/livreur.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Livreur } from '../models/livreur.model';
import { Observable } from 'rxjs';

const API = 'http://localhost:8093/api/livreurs';

@Injectable({ providedIn: 'root' })
export class LivreurService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Livreur[]> {
    return this.http.get<Livreur[]>(API);
  }
  getById(id: number): Observable<Livreur> {
    return this.http.get<Livreur>(`${API}/${id}`);
  }
  create(data: Livreur): Observable<Livreur> {
    return this.http.post<Livreur>(API, data);
  }
  update(id: number, data: Livreur): Observable<Livreur> {
    return this.http.put<Livreur>(`${API}/${id}`, data);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API}/${id}`);
  }
}
