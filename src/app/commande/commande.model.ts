export enum StatutCommande {
    EN_ATTENTE = 'EN_ATTENTE',
    EN_COURS = 'EN_COURS',
    EXPEDIEE = 'EXPEDIEE',
    LIVREE = 'LIVREE',
    ANNULEE = 'ANNULEE'
  }
  
  export interface Commande {
    id?: number;
    panierId: number;
    adresse: string;
    dateCreation: string;
    statut: StatutCommande;
    methodePaiement: string;
    phone: string;
    email: string;
  }
  