// src/app/Components/Livreur/livreur-list/livreur-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Livreur } from '../../../models/livreur.model';
import { LivreurService } from '../../../services/livreur.service';

@Component({
  selector: 'app-livreur-list',
  templateUrl: './livreur-list.component.html'
})
export class LivreurListComponent implements OnInit {
  livreurs: Livreur[] = [];
  constructor(private svc: LivreurService) {}
  ngOnInit() { this.svc.getAll().subscribe(data => this.livreurs = data); }
}
