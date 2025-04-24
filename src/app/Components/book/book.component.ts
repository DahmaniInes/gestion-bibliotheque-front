import { Component, OnInit } from '@angular/core';
import {Livre, LivreService } from '../services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  livres: Livre[] = [];
  livre: Livre = { titre: '', isbn: '', anneePublication: 0, editeur: '', nombrePages: 0, resume: '', prix: 0, stockDisponible: 0, imageCouverture: '' };
  isEditMode = false;
  currentId: number | null | undefined = undefined;


  constructor(private livreService: LivreService) {}

  ngOnInit(): void {
    this.loadLivres();
  }

  loadLivres() {
    this.livreService.getAllLivres().subscribe((data) => {
      this.livres = data;
    });
  }

  onCreateLivre() {
    this.livreService.createLivre(this.livre).subscribe((newLivre) => {
      this.livres.push(newLivre);
      this.resetForm();
    });
  }

  onEditLivre(livre: Livre) {
    this.isEditMode = true;
    this.livre = { ...livre };
    this.currentId = livre.id;
  }

  onUpdateLivre() {
    if (this.currentId !== null) {
      this.livreService.updateLivre(this.currentId!, this.livre).subscribe((updatedLivre) => {
        const index = this.livres.findIndex((l) => l.id === this.currentId);
        if (index !== -1) {
          this.livres[index] = updatedLivre;
          this.resetForm();
        }
      });
    }
  }

  onDeleteLivre(id: number) {
    this.livreService.deleteLivre(id).subscribe(() => {
      this.livres = this.livres.filter((livre) => livre.id !== id);
    });
  }

  resetForm() {
    this.livre = { titre: '', isbn: '', anneePublication: 0, editeur: '', nombrePages: 0, resume: '', prix: 0, stockDisponible: 0, imageCouverture: '' };
    this.isEditMode = false;
    this.currentId = null;
  }
}
