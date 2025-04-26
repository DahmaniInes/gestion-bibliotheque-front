import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EtatLivraison } from 'src/app/models/etat-livraison.model';
import { Livraison } from 'src/app/models/livraison.model';
import { Page } from 'src/app/models/page.model';
import { LivraisonService } from 'src/app/services/livraison.service';


@Component({
  selector: 'app-livraison-list',
  templateUrl: './livraison-list.component.html',
  styleUrls: ['./livraison-list.component.css']
})
export class LivraisonListComponent implements OnInit {
  livraisons: Livraison[] = [];
  page: number = 0;
  size: number = 10;
  totalPages: number = 0;
  etatLivraisonsMap: Map<number, EtatLivraison> = new Map();

  constructor(private router: Router, private livraisonService: LivraisonService) {}

  ngOnInit(): void {
    this.loadEtatLivraisons();
    this.loadLivraisons();
  }

  loadEtatLivraisons(): void {
    this.livraisonService.getEtatLivraisons().subscribe({
      next: (etats) => {
        etats.forEach(etat => this.etatLivraisonsMap.set(etat.id, etat));
      },
      error: (err) => console.error('Error fetching EtatLivraison:', err)
    });
  }

  loadLivraisons(): void {
    this.livraisonService.getAllLivraisons(this.page, this.size).subscribe({
      next: (pageData: Page<Livraison>) => {
        this.livraisons = pageData.content;
        this.totalPages = pageData.totalPages;
      },
      error: (err) => console.error('Error fetching livraisons:', err)
    });
  }


  getEtatLivraisonLibelle(etatLivraisonId: number): string {
    const etat = this.etatLivraisonsMap.get(etatLivraisonId);
    return etat ? etat.libelle : 'Inconnu';
  }

  changePage(newPage: number): void {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.page = newPage;
      this.loadLivraisons();
    }
  }

  viewDetails(id: number): void {
    this.router.navigate(['/livraisons', id]);
  }

  deleteLivraison(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette livraison ?')) {
      this.livraisonService.deleteLivraison(id).subscribe({
        next: () => {
          console.log(`Livraison with ID ${id} deleted`);
          this.loadLivraisons();
        },
        error: (err) => console.error('Error deleting livraison:', err)
      });
    }
  }

  addLivraison(): void {
    this.router.navigate(['/livraisons/form']);
  }
}
