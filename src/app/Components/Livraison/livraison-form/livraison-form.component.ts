import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EtatLivraison } from 'src/app/models/etat-livraison.model';
import { Livraison } from 'src/app/models/livraison.model';
import { Livreur } from 'src/app/models/livreur.model';
import { LivraisonService } from 'src/app/services/livraison.service';

@Component({
  selector: 'app-livraison-form',
  templateUrl: './livraison-form.component.html',
  styleUrls: ['./livraison-form.component.css']
})
export class LivraisonFormComponent implements OnInit {
  livraisonForm: FormGroup;
  etatLivraisons: EtatLivraison[] = [];
  livreurs: Livreur[] = [];
  isEditMode: boolean = false;
  livraisonId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private livraisonService: LivraisonService
  ) {
    this.livraisonForm = this.fb.group({
      dateLivraison: ['', Validators.required],
      commandeId: ['', Validators.required],
      adresseLivraison: ['', Validators.required],
      telephoneClient: [''],
      methodePaiement: ['', Validators.required],
      prixTotal: ['', Validators.required],
      livreur: ['', Validators.required],
      etatLivraison: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.livraisonId = Number(id);
      this.loadLivraison(this.livraisonId);
    }

    this.livraisonService.getEtatLivraisons().subscribe({
      next: (etats) => {
        this.etatLivraisons = etats;
        if (this.etatLivraisons.length > 0 && !this.isEditMode) {
          this.livraisonForm.patchValue({ etatLivraison: this.etatLivraisons[0].id });
        }
      },
      error: (err) => console.error('Error fetching EtatLivraison:', err)
    });

    this.livraisonService.getLivreurs().subscribe({
      next: (livreurs) => {
        this.livreurs = livreurs;
        if (this.livreurs.length > 0 && !this.isEditMode) {
          this.livraisonForm.patchValue({ livreur: this.livreurs[0].id });
        }
      },
      error: (err) => console.error('Error fetching Livreurs:', err)
    });
  }

  loadLivraison(id: number): void {
    this.livraisonService.getLivraisonById(id).subscribe({
      next: (livraison) => {
        this.livraisonForm.patchValue({
          dateLivraison: livraison.dateLivraison,
          commandeId: livraison.commandeId,
          adresseLivraison: livraison.adresseLivraison,
          telephoneClient: livraison.telephoneClient,
          methodePaiement: livraison.methodePaiement,
          prixTotal: livraison.prixTotal,
          livreur: livraison.livreur,
          etatLivraison: livraison.etatLivraison
        });
      },
      error: (err) => {
        console.error('Error loading livraison:', err);
        this.router.navigate(['/livraisons']);
      }
    });
  }

  onSubmit(): void {
    if (this.livraisonForm.valid) {
      const formValue = this.livraisonForm.value;
      const livraisonData: Livraison = {
        ...formValue,
        etatLivraison: formValue.etatLivraison,
        livreur: formValue.livreur
      };

      if (this.isEditMode && this.livraisonId) {
        this.livraisonService.updateLivraison(this.livraisonId, livraisonData).subscribe({
          next: () => this.router.navigate(['/livraisons']),
          error: (err) => console.error('Error updating livraison:', err)
        });
      } else {
        this.livraisonService.createLivraison(livraisonData).subscribe({
          next: () => this.router.navigate(['/livraisons']),
          error: (err) => console.error('Error creating livraison:', err)
        });
      }
    } else {
      this.livraisonForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.router.navigate(['/livraisons']);
  }

  get dateLivraison() { return this.livraisonForm.get('dateLivraison'); }
  get commandeId() { return this.livraisonForm.get('commandeId'); }
  get adresseLivraison() { return this.livraisonForm.get('adresseLivraison'); }
  get telephoneClient() { return this.livraisonForm.get('telephoneClient'); }
  get methodePaiement() { return this.livraisonForm.get('methodePaiement'); }
  get prixTotal() { return this.livraisonForm.get('prixTotal'); }
  get livreur() { return this.livraisonForm.get('livreur'); }
  get etatLivraison() { return this.livraisonForm.get('etatLivraison'); }
}
