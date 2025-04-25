import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
// Livreur
import { LivreurListComponent } from './Components/Livreur/livreur-list/livreur-list.component';
import { LivreurDetailComponent } from './Components/Livreur/livreur-detail/livreur-detail.component';
import { LivreurFormComponent } from './Components/Livreur/livreur-form/livreur-form.component';
// État
import { EtatListComponent } from './Components/EtatLivraison/etat-list/etat-list.component';
import { EtatFormComponent } from './Components/EtatLivraison/etat-form/etat-form.component';
// Livraison
import { LivraisonListComponent } from './Components/Livraison/livraison-list/livraison-list.component';
import { LivraisonDetailComponent } from './Components/Livraison/livraison-detail/livraison-detail.component';
import { LivraisonFormComponent } from './Components/Livraison/livraison-form/livraison-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'test', component: TestComponent },
  { path: 'livreurs', component: LivraisonListComponent },
  { path: 'livraisons', component: LivraisonListComponent },


{ path: 'etats', children: [
    { path: '', component: EtatListComponent },
    { path: 'new', component: EtatFormComponent },
    { path: ':id/edit', component: EtatFormComponent },
  ]
},


{ path: '', redirectTo: '/livraisons', pathMatch: 'full' },
{ path: '**', redirectTo: '/livraisons' }
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
