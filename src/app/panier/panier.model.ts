export interface Panier {
    id?: number;
    clientId: number;
    prixTotal: number;
    statut: 'ACTIF' | 'VALIDE' | 'ABANDONNE';
  }
  