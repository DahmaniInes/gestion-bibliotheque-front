import { Component, OnInit } from '@angular/core';
import { PanierService } from './panier.service';
import { Panier } from './panier.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  paniers: Panier[] = [];
  panierForm!: FormGroup;
  editMode = false;
  selectedPanierId: number | null = null;

  constructor(private panierService: PanierService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadPaniers();
    this.initForm();
  }

  initForm(): void {
    this.panierForm = this.fb.group({
      clientId: [null, Validators.required],
      prixTotal: [0, [Validators.required, Validators.min(0)]],
      statut: ['ACTIF', Validators.required]
    });
  }

  loadPaniers(): void {
    this.panierService.getAll().subscribe(data => this.paniers = data);
  }

  submit(): void {
    const formValue = this.panierForm.value;

    if (this.editMode && this.selectedPanierId !== null) {
      this.panierService.update(this.selectedPanierId, formValue).subscribe(() => {
        this.loadPaniers();
        this.resetForm();
      });
    } else {
      this.panierService.create(formValue).subscribe(() => {
        this.loadPaniers();
        this.resetForm();
      });
    }
  }

  edit(panier: Panier): void {
    this.editMode = true;
    this.selectedPanierId = panier.id!;
    this.panierForm.patchValue(panier);
  }

  delete(id: number): void {
    this.panierService.delete(id).subscribe(() => this.loadPaniers());
  }

  resetForm(): void {
    this.panierForm.reset({ prixTotal: 0, statut: 'ACTIF' });
    this.editMode = false;
    this.selectedPanierId = null;
  }

  getBadgeClass(statut: string): string {
    return `badge ${statut}`;
  }
  
  getStatusEmoji(statut: string): string {
    switch (statut) {
      case 'ACTIF': return '🟢';
      case 'VALIDE': return '✅';
      case 'ABANDONNE': return '❌';
      default: return '❓';
    }
  }
}
