import { Component, OnInit } from '@angular/core';
import { Commande, StatutCommande } from './commande.model';
import { CommandeService } from './commande.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css'],
})
export class CommandeComponent implements OnInit {
  commandes: Commande[] = [];
  newCommande: Commande = this.resetForm();
  isEditMode = false;

  statutValues = Object.values(StatutCommande);

  constructor(private commandeService: CommandeService) {}

  ngOnInit(): void {
    this.loadCommandes();
  }

  loadCommandes(): void {
    this.commandeService.getCommandes().subscribe((data) => {
      this.commandes = data;
    });
  }

  resetForm(): Commande {
    return {
      panierId: 0,
      adresse: '',
      dateCreation: new Date().toISOString().split('T')[0],
      statut: StatutCommande.EN_ATTENTE,
      methodePaiement: '',
      phone: '',
      email: '',
    };
  }

  saveCommande(): void {
    if (this.isEditMode && this.newCommande.id) {
      this.commandeService.updateCommande(this.newCommande.id, this.newCommande).subscribe(() => {
        this.loadCommandes();
        this.newCommande = this.resetForm();
        this.isEditMode = false;
      });
    } else {
      this.commandeService.addCommande(this.newCommande).subscribe(() => {
        this.loadCommandes();
        this.newCommande = this.resetForm();
      });
    }
  }

  editCommande(commande: Commande): void {
    this.newCommande = { ...commande };
    this.isEditMode = true;
  }

  deleteCommande(id: number): void {
    this.commandeService.deleteCommande(id).subscribe(() => {
      this.loadCommandes();
    });
  }
}
