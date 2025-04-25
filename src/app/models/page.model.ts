// src/app/models/page.model.ts
export interface Page<T> {
    content: T[];           // liste des éléments
    totalElements: number;  // nombre total d’éléments
    totalPages: number;     // nombre total de pages
    size: number;           // taille d’une page (éléments par page)
    number: number;         // index de la page courante (0-based)
    // vous pouvez ajouter d’autres champs si vous en avez besoin :
    // first?: boolean;
    // last?: boolean;
    // numberOfElements?: number;
  }
  