import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LivreurListComponent } from './Components/livreur/livreur-list/livreur-list.component';
import { LivreurDetailComponent } from './Components/livreur/livreur-detail/livreur-detail.component';
import { LivreurFormComponent } from './Components/livreur/livreur-form/livreur-form.component';
import { LivraisonListComponent } from './Components/livraison/livraison-list/livraison-list.component';
import { LivraisonDetailComponent } from './Components/livraison/livraison-detail/livraison-detail.component';
import { LivraisonFormComponent } from './Components/livraison/livraison-form/livraison-form.component';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'test', component: TestComponent },
  { path: 'livreurs', component: LivreurListComponent },
  { path: 'livreurs/form', component: LivreurFormComponent },
  { path: 'livreurs/:id', component: LivreurDetailComponent },

  { path: 'livraisons', component: LivraisonListComponent },
  { path: 'livraisons/form', component: LivraisonFormComponent },
  { path: 'livraisons/:id', component: LivraisonDetailComponent },


  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
