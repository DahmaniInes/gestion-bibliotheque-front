import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EtatLivraison } from '../models/etat-livraison.model';


@Injectable({
  providedIn: 'root'
})
export class EtatLivraisonService {
  private apiUrl = 'http://localhost:8093/livraisons/api/etat-livraisons'; // URL du gateway

  constructor(private http: HttpClient) { }

  /** Récupère tous les états de livraison */
  getAllEtatLivraisons(): Observable<EtatLivraison[]> {
    return this.http.get<EtatLivraison[]>(this.apiUrl);
  }

  /** Récupère un état de livraison par ID */
  getEtatLivraisonById(id: number): Observable<EtatLivraison> {
    return this.http.get<EtatLivraison>(`${this.apiUrl}/${id}`);
  }

  /** Crée un nouvel état de livraison */
  createEtatLivraison(etatLivraison: EtatLivraison): Observable<EtatLivraison> {
    return this.http.post<EtatLivraison>(this.apiUrl, etatLivraison);
  }

  /** Met à jour un état de livraison existant */
  updateEtatLivraison(id: number, etatLivraison: EtatLivraison): Observable<EtatLivraison> {
    return this.http.put<EtatLivraison>(`${this.apiUrl}/${id}`, etatLivraison);
  }

  /** Supprime un état de livraison */
  deleteEtatLivraison(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
