import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livreur } from 'src/app/models/livreur.model';
import { LivreurService } from 'src/app/services/livreur.service';


@Component({
  selector: 'app-livreur-detail',
  templateUrl: './livreur-detail.component.html',
  styleUrls: ['./livreur-detail.component.css']
})
export class LivreurDetailComponent implements OnInit {
  livreur: Livreur | undefined;
  loading: boolean = true; // Add loading state
  error: string | null = null; // Add error state for better UX

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private livreurService: LivreurService // Inject the service
  ) {}

  ngOnInit(): void {
    // Get the livreur ID from the route parameters
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      this.error = 'ID de livreur invalide';
      this.loading = false;
      this.router.navigate(['/livreurs']);
      return;
    }

    // Fetch the livreur by ID using the service
    this.livreurService.getLivreurById(id).subscribe({
      next: (livreur) => {
        this.loading = false;
        if (livreur) {
          this.livreur = livreur;
        } else {
          this.error = `Livreur avec l'ID ${id} non trouvé`;
          this.router.navigate(['/livreurs']);
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Erreur lors du chargement du livreur';
        console.error('Error fetching livreur:', err);
        this.router.navigate(['/livreurs']);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/livreurs']); // Fixed syntax error
  }
}
