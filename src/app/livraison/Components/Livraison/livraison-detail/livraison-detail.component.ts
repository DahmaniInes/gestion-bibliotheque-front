import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EtatLivraison } from 'src/app/models/etat-livraison.model';
import { Livraison } from 'src/app/models/livraison.model';
import { LivraisonService } from 'src/app/services/livraison.service';


@Component({
  selector: 'app-livraison-detail',
  templateUrl: './livraison-detail.component.html',
  styleUrls: ['./livraison-detail.component.css']
})
export class LivraisonDetailComponent implements OnInit {
  livraison: Livraison | undefined;
  etatLivraison: EtatLivraison | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private livraisonService: LivraisonService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.livraisonService.getLivraisonById(id).subscribe({
      next: (livraison) => {
        this.livraison = livraison;
        this.livraisonService.getEtatLivraisonById(livraison.etatLivraison).subscribe({
          next: (etat) => this.etatLivraison = etat,
          error: (err) => console.error('Error fetching EtatLivraison:', err)
        });
      },
      error: (err) => {
        console.error('Error fetching livraison:', err);
        this.router.navigate(['/livraisons']);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/livraisons']);
  }
}
