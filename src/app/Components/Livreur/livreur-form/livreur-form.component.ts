import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Livreur } from 'src/app/models/livreur.model';
import { LivreurService } from 'src/app/services/livreur.service';

@Component({
  selector: 'app-livreur-form',
  templateUrl: './livreur-form.component.html',
  styleUrls: ['./livreur-form.component.css']
})
export class LivreurFormComponent implements OnInit {
  livreurForm: FormGroup;
  isEditMode: boolean = false;
  livreurId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private livreurService: LivreurService // Inject the service
  ) {
    this.livreurForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]{8,15}$')]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    // Check if we're in edit mode
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.livreurId = Number(id);
      this.loadLivreur(this.livreurId);
    }
  }

  loadLivreur(id: number): void {
    this.livreurService.getLivreurById(id).subscribe({
      next: (livreur) => {
        if (livreur) {
          this.livreurForm.patchValue({
            nom: livreur.nom,
            prenom: livreur.prenom,
            telephone: livreur.telephone,
            email: livreur.email
          });
        } else {
          console.error(`Livreur with ID ${id} not found`);
          this.router.navigate(['/livreurs']);
        }
      },
      error: (err) => {
        console.error(`Error loading livreur with ID ${id}:`, err);
        this.router.navigate(['/livreurs']);
      }
    });
  }

  onSubmit(): void {
    if (this.livreurForm.valid) {
      const livreurData: Livreur = {
        ...this.livreurForm.value,
        id: this.livreurId || 0 // ID will be set by the backend for new livreurs
      };

      if (this.isEditMode && this.livreurId) {
        this.livreurService.updateLivreur(this.livreurId, livreurData).subscribe({
          next: () => {
            console.log(`Livreur with ID ${this.livreurId} updated`);
            this.router.navigate(['/livreurs']);
          },
          error: (err) => console.error('Error updating livreur:', err)
        });
      } else {
        this.livreurService.createLivreur(livreurData).subscribe({
          next: (newLivreur) => {
            console.log('Livreur created:', newLivreur);
            this.router.navigate(['/livreurs']);
          },
          error: (err) => console.error('Error creating livreur:', err)
        });
      }
    } else {
      this.livreurForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.router.navigate(['/livreurs']);
  }

  get nom() { return this.livreurForm.get('nom'); }
  get prenom() { return this.livreurForm.get('prenom'); }
  get telephone() { return this.livreurForm.get('telephone'); }
  get email() { return this.livreurForm.get('email'); }
}
