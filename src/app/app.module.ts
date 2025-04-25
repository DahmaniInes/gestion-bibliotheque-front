import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import { LivreurListComponent } from './Components/livreur/livreur-list/livreur-list.component';
import { LivreurDetailComponent } from './Components/livreur/livreur-detail/livreur-detail.component';
import { LivreurFormComponent } from './Components/livreur/livreur-form/livreur-form.component';
import { LivraisonListComponent } from './Components/livraison/livraison-list/livraison-list.component';
import { LivraisonDetailComponent } from './Components/livraison/livraison-detail/livraison-detail.component';
import { LivraisonFormComponent } from './Components/livraison/livraison-form/livraison-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    TestComponent,
    LivreurListComponent,
    LivreurDetailComponent,
    LivreurFormComponent,
    LivraisonListComponent,
    LivraisonDetailComponent,
    LivraisonFormComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
