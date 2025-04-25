import { Component, OnInit } from '@angular/core';
import { Livraison } from 'src/app/models/livraison.model';
import { Page } from 'src/app/models/page.model';
import { LivraisonService } from 'src/app/services/livraison.service';

@Component({
  selector: 'app-livraison-list',
  templateUrl: './livraison-list.component.html',
  styleUrls: ['./livraison-list.component.css']
})
export class LivraisonListComponent  implements OnInit {
  livraisons: Livraison[] = [];
  page = 0;
  size = 10;
  sort = 'id,asc';
  totalPages = 0;
  totalElements = 0;

  constructor(private livraisonService: LivraisonService) {}

  ngOnInit(): void {
    this.loadLivraisons();
  }

  loadLivraisons(): void {
    this.livraisonService.getAll(this.page, this.size, this.sort)
      .subscribe({
        next: (response: Page<Livraison>) => {
          this.livraisons = response.content;
          this.totalPages = response.totalPages;
          this.totalElements = response.totalElements;
        },
        error: err => console.error('Erreur lors du chargement des livraisons', err)
      });
  }

  delete(id: number): void {
    if (!confirm(`Supprimer la livraison #${id} ?`)) {
      return;
    }
    this.livraisonService.delete(id)
      .subscribe({
        next: () => this.loadLivraisons(),
        error: err => console.error('Erreur lors de la suppression', err)
      });
  }

  // Si vous souhaitez gérer la pagination manuellement :
  changePage(newPage: number): void {
    if (newPage < 0 || newPage >= this.totalPages) return;
    this.page = newPage;
    this.loadLivraisons();
  }

}
