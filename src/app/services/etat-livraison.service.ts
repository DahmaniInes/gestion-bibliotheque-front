// src/app/services/etat-livraison.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EtatLivraison } from '../models/etat-livraison.model';
import { Observable } from 'rxjs';

const API = 'http://localhost:8093/api/etat-livraisons';

@Injectable({ providedIn: 'root' })
export class EtatLivraisonService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<EtatLivraison[]> {
    return this.http.get<EtatLivraison[]>(API);
  }
  // getById, create, update, delete → même pattern que pour LivreurService
}
