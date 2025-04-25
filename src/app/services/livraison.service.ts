import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Livraison } from '../models/livraison.model';
import { Page } from '../models/page.model';
import { Livreur } from '../models/livreur.model';
import { EtatLivraison } from '../models/etat-livraison.model';


@Injectable({
  providedIn: 'root'
})
export class LivraisonService {
  private apiUrl = 'http://localhost:8093/livraisons'; // Base URL for livraison endpoints
  private etatLivraisonUrl = 'http://localhost:8093/etat-livraisons'; // URL for EtatLivraison endpoints
  private livreurUrl = 'http://localhost:8093/livreurs'; // URL for Livreur endpoints

  // Fallback data for EtatLivraison if the backend endpoint is not available
  private fallbackEtatLivraisons: EtatLivraison[] = [
    { id: 1, libelle: 'En cours' },
    { id: 2, libelle: 'Livré' },
    { id: 3, libelle: 'Annulé' }
  ];

  // Fallback data for Livreurs if the backend endpoint is not available
  private fallbackLivreurs: Livreur[] = [
   
    {
      id: 2, nom: 'Martin', prenom: 'Sophie',
      email: '',
      telephone: '',
      vehicule: '',
      disponible: false,
      livraisons: []
    },

  ];

  constructor(private http: HttpClient) {}

  /** Récupère toutes les livraisons avec pagination */
  getAllLivraisons(page: number = 0, size: number = 10, sort: string = 'id,asc'): Observable<Page<Livraison>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);
    return this.http.get<Page<Livraison>>(this.apiUrl, { params });
  }

  /** Récupère une livraison par ID */
  getLivraisonById(id: number): Observable<Livraison> {
    return this.http.get<Livraison>(`${this.apiUrl}/${id}`);
  }

  /** Crée une nouvelle livraison */
  createLivraison(livraison: Livraison): Observable<Livraison> {
    return this.http.post<Livraison>(this.apiUrl, livraison);
  }

  /** Met à jour une livraison existante */
  updateLivraison(id: number, livraison: Livraison): Observable<Livraison> {
    return this.http.put<Livraison>(`${this.apiUrl}/${id}`, livraison);
  }

  /** Supprime une livraison */
  deleteLivraison(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /** Recherche des livraisons par date */
  searchLivraisonByDate(dateLivraison: string): Observable<Livraison[]> {
    const params = new HttpParams().set('dateLivraison', dateLivraison);
    return this.http.get<Livraison[]>(`${this.apiUrl}/search-by-date`, { params });
  }

  /** Crée une livraison à partir d'une commande */
  creerLivraisonDepuisCommande(commandeId: number): Observable<Livraison> {
    return this.http.post<Livraison>(`${this.apiUrl}/from-commande/${commandeId}`, {});
  }

  /** Génère un PDF pour une livraison */
  generateLivraisonPdf(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/pdf`, { responseType: 'blob' });
  }

  /** Récupère la liste des EtatLivraison */
  getEtatLivraisons(): Observable<EtatLivraison[]> {
    // Attempt to fetch from the backend, fallback to hardcoded list if it fails
    return this.http.get<EtatLivraison[]>(this.etatLivraisonUrl).pipe(
      catchError((error) => {
        console.error('Error fetching EtatLivraisons, using fallback data:', error);
        return of(this.fallbackEtatLivraisons);
      })
    );
  }

  /** Récupère un EtatLivraison par ID */
  getEtatLivraisonById(id: number): Observable<EtatLivraison | undefined> {
    // Attempt to fetch from the backend, fallback to hardcoded list if it fails
    return this.http.get<EtatLivraison>(`${this.etatLivraisonUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error fetching EtatLivraison with ID ${id}, using fallback data:`, error);
        const etat = this.fallbackEtatLivraisons.find(e => e.id === id);
        return of(etat);
      })
    );
  }

  /** Récupère la liste des Livreurs */
  getLivreurs(): Observable<Livreur[]> {
    // Attempt to fetch from the backend, fallback to hardcoded list if it fails
    return this.http.get<Livreur[]>(this.livreurUrl).pipe(
      catchError((error) => {
        console.error('Error fetching Livreurs, using fallback data:', error);
        return of(this.fallbackLivreurs);
      })
    );
  }
}
