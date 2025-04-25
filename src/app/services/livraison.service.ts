// src/app/services/livraison.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Livraison } from '../models/livraison.model';
import { Observable } from 'rxjs';
import { Page } from '../models/page.model'; // À créer si besoin

const API = 'http://localhost:8093/livraisons';

@Injectable({ providedIn: 'root' })
export class LivraisonService {
  constructor(private http: HttpClient) {}

  getAll(page = 0, size = 10, sort = 'id,asc'): Observable<Page<Livraison>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);
    return this.http.get<Page<Livraison>>(API, { params });
  }
  getById(id: number): Observable<Livraison> {
    return this.http.get<Livraison>(`${API}/${id}`);
  }
  create(data: Livraison): Observable<Livraison> {
    return this.http.post<Livraison>(API, data);
  }
  update(id: number, data: Livraison): Observable<Livraison> {
    return this.http.put<Livraison>(`${API}/${id}`, data);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API}/${id}`);
  }
  // PDF
  downloadPdf(id: number): Observable<Blob> {
    return this.http.get(`${API}/${id}/pdf`, { responseType: 'blob' });
  }
}
