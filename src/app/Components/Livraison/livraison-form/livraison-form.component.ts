import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EtatLivraison } from 'src/app/models/etat-livraison.model';
import { Livreur } from 'src/app/models/livreur.model';
import { EtatLivraisonService } from 'src/app/services/etat-livraison.service';
import { LivraisonService } from 'src/app/services/livraison.service';
import { LivreurService } from 'src/app/services/livreur.service';

@Component({
  selector: 'app-livraison-form',
  templateUrl: './livraison-form.component.html',
  styleUrls: ['./livraison-form.component.css']
})
export class LivraisonFormComponent implements OnInit {
  form!: FormGroup;
  livreurs: Livreur[] = [];
  // etats: EtatLivraison[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private livraisonSvc: LivraisonService,
    private livreurSvc: LivreurService,
    private etatSvc: EtatLivraisonService
  ) {}

  ngOnInit(): void {
    // 1) build the form
    this.form = this.fb.group({
      dateLivraison:    ['', Validators.required],
      commandeId:       [null, Validators.required],
      adresseLivraison: ['', Validators.required],
      telephoneClient:  [''],
      methodePaiement:  ['', Validators.required],
      prixTotal:        [0, [Validators.required, Validators.min(0)]],
    //  livreurId:        [null, Validators.required],
    //  etatLivraisonId:  [null, Validators.required]
    });

    // 2) load select options
    this.livreurSvc.getAll().subscribe(list => this.livreurs = list);
    // this.etatSvc.getAll().subscribe(list => this.etats = list);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // build payload matching backend shape
    const payload = {
      ...this.form.value,
      livreur: { id: this.form.value.livreurId },
      etatLivraison: { id: this.form.value.etatLivraisonId }
    };

    this.livraisonSvc.create(payload).subscribe(() => {
      this.router.navigate(['/livraisons']);
    });
  }

  cancel(): void {
    this.router.navigate(['/livraisons']);
  }

}
