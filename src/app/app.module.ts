import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { LivreurListComponent } from './Components/Livreur/livreur-list/livreur-list.component';
import { LivreurDetailComponent } from './Components/Livreur/livreur-detail/livreur-detail.component';
import { LivreurFormComponent } from './Components/Livreur/livreur-form/livreur-form.component';
import { EtatListComponent } from './Components/EtatLivraison/etat-list/etat-list.component';
import { EtatFormComponent } from './Components/EtatLivraison/etat-form/etat-form.component';
import { LivraisonListComponent } from './Components/Livraison/livraison-list/livraison-list.component';
import { LivraisonDetailComponent } from './Components/Livraison/livraison-detail/livraison-detail.component';
import { LivraisonFormComponent } from './Components/Livraison/livraison-form/livraison-form.component';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'test', component: TestComponent },

  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, HomeComponent, TestComponent, LivreurListComponent, LivreurDetailComponent, LivreurFormComponent, EtatListComponent, EtatFormComponent, LivraisonListComponent, LivraisonDetailComponent, LivraisonFormComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }