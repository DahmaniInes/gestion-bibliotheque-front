import { Livraison } from './livraison.model';

export interface Livreur {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  vehicule: string;
  disponible: boolean;
  livraisons: Livraison[];
}
