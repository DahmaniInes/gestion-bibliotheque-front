import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Livreur } from 'src/app/models/livreur.model';
import { LivreurService } from 'src/app/services/livreur.service';


@Component({
  selector: 'app-livreur-list',
  templateUrl: './livreur-list.component.html',
  styleUrls: ['./livreur-list.component.css']
})
export class LivreurListComponent implements OnInit {
  livreurs: Livreur[] = [];

  constructor(
    private router: Router,
    private livreurService: LivreurService
  ) {}

  ngOnInit(): void {
    this.loadLivreurs();
  }

  loadLivreurs(): void {
    this.livreurService.getLivreurs().subscribe({
      next: (livreurs) => {
        this.livreurs = livreurs;
      },
      error: (err) => {
        console.error('Error loading livreurs:', err);
        this.livreurs = [];
      }
    });
  }

  viewDetails(id: number): void {
    this.router.navigate(['/livreurs', id]);
  }

  editLivreur(id: number): void {
    this.router.navigate(['/livreurs/edit', id]); // Navigate to edit route
  }

  deleteLivreur(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce livreur ?')) {
      this.livreurService.deleteLivreur(id).subscribe({
        next: () => {
          this.livreurs = this.livreurs.filter(livreur => livreur.id !== id);
          console.log(`Livreur with ID ${id} deleted`);
        },
        error: (err) => {
          console.error(`Error deleting livreur with ID ${id}:`, err);
          this.loadLivreurs();
        }
      });
    }
  }

  addLivreur(): void {
    this.router.navigate(['/livreurs/form']);
  }
}
