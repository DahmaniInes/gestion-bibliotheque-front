// src/app/models/livraison.model.ts
import { Livreur } from './livreur.model';
import { EtatLivraison } from './etat-livraison.model';

export interface Livraison {
  id: number;
  dateLivraison: string;     // ex. "2025-04-21T14:30:00"
  commandeId: number;
  adresseLivraison: string;
  telephoneClient?: string;
  methodePaiement: string;
  prixTotal: number;
  livreur: Livreur;
  etatLivraison: EtatLivraison;
}
