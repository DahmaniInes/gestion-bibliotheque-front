import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import { StockComponent } from './Components/stock/stock.component';
import { BookComponent } from './Components/book/book.component';
import { PanierComponent } from './panier/panier.component';
import { CommandeComponent } from './commande/commande.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'test', component: TestComponent },
  { path: 'stock', component: StockComponent },
  { path: 'books', component: BookComponent },
  { path: 'paniers', component: PanierComponent },
  { path: 'commandes', component: CommandeComponent },
  { path: '', loadChildren: () => import('./Components/blogs/blogs.module').then(m => m.BlogModule) },
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
