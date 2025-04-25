import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Livreur } from '../models/livreur.model';


@Injectable({
  providedIn: 'root'
})
export class LivreurService {
  private apiUrl = 'http://localhost:8093/livreurs'; // Backend API URL for livreurs

  // Fallback data in case the backend API is unavailable
  private fallbackLivreurs: Livreur[] = [
    {
      id: 1, nom: 'Dupont', prenom: 'Jean', telephone: '123456789', email: 'jean.dupont@example.com',
      vehicule: '',
      disponible: false,
      livraisons: []
    },
    {
      id: 2, nom: 'Martin', prenom: 'Sophie', telephone: '987654321', email: 'sophie.martin@example.com',
      vehicule: '',
      disponible: false,
      livraisons: []
    },
    {
      id: 3, nom: 'Lefevre', prenom: 'Paul', telephone: '456789123', email: 'paul.lefevre@example.com',
      vehicule: '',
      disponible: false,
      livraisons: []
    }
  ];

  constructor(private http: HttpClient) {}

  /** Récupère la liste des livreurs */
  getLivreurs(): Observable<Livreur[]> {
    return this.http.get<Livreur[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching livreurs, using fallback data:', error);
        return of(this.fallbackLivreurs);
      })
    );
  }

  /** Récupère un livreur par ID */
  getLivreurById(id: number): Observable<Livreur | undefined> {
    return this.http.get<Livreur>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error fetching livreur with ID ${id}, using fallback data:`, error);
        const livreur = this.fallbackLivreurs.find(l => l.id === id);
        return of(livreur);
      })
    );
  }

  /** Crée un nouveau livreur */
  createLivreur(livreur: Livreur): Observable<Livreur> {
    return this.http.post<Livreur>(this.apiUrl, livreur).pipe(
      catchError((error) => {
        console.error('Error creating livreur, adding to fallback data:', error);
        const newId = this.fallbackLivreurs.length > 0
          ? Math.max(...this.fallbackLivreurs.map(l => l.id)) + 1
          : 1;
        const newLivreur = { ...livreur, id: newId };
        this.fallbackLivreurs.push(newLivreur);
        return of(newLivreur);
      })
    );
  }

  /** Met à jour un livreur existant */
  updateLivreur(id: number, livreur: Livreur): Observable<Livreur> {
    return this.http.put<Livreur>(`${this.apiUrl}/${id}`, livreur).pipe(
      catchError((error) => {
        console.error(`Error updating livreur with ID ${id}, updating fallback data:`, error);
        const index = this.fallbackLivreurs.findIndex(l => l.id === id);
        if (index !== -1) {
          this.fallbackLivreurs[index] = { ...livreur, id };
        }
        return of({ ...livreur, id });
      })
    );
  }

  /** Supprime un livreur par ID */
  deleteLivreur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error deleting livreur with ID ${id}:`, error);
        this.fallbackLivreurs = this.fallbackLivreurs.filter(livreur => livreur.id !== id);
        return of(undefined);
      })
    );
  }
}
