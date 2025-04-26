
export interface Livraison {
  id: number;
  dateLivraison: string;
  commandeId: number;
  adresseLivraison: string;
  telephoneClient: string;
  methodePaiement: string;
  prixTotal: number;
  livreur: string;
  etatLivraison: number; // Backend returns an ID
}
