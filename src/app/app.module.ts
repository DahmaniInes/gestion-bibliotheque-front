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
import { FormsModule } from '@angular/forms';
import { StockComponent } from './Components/stock/stock.component';
import { BookComponent } from './Components/book/book.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PanierComponent } from './panier/panier.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommandeComponent } from './commande/commande.component';
import { AddEventComponent } from './Event/add-event/add-event.component';
import { ShowAllEventsComponent } from './Event/show-all-events/show-all-events.component';
import { ShowEventComponent } from './Event/show-event/show-event.component';
import { EditEventComponent } from './Event/edit-event/edit-event.component';
import { ShowEventAdminComponent } from './Event/show-event-admin/show-event-admin.component';
import { PaymentCancelComponent } from './Event/payment-cancel/payment-cancel.component';
import { PaymentSuccessComponent } from './Event/payment-success/payment-success.component';
import { LivreurListComponent } from './livraison/Components/Livreur/livreur-list/livreur-list.component';
import { LivreurDetailComponent } from './livraison/Components/Livreur/livreur-detail/livreur-detail.component';
import { LivreurFormComponent } from './livraison/Components/Livreur/livreur-form/livreur-form.component';
import { LivraisonListComponent } from './livraison/Components/Livraison/livraison-list/livraison-list.component';
import { LivraisonDetailComponent } from './livraison/Components/Livraison/livraison-detail/livraison-detail.component';
import { LivraisonFormComponent } from './livraison/Components/Livraison/livraison-form/livraison-form.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'test', component: TestComponent },

  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, HomeComponent, TestComponent,StockComponent,BookComponent,PanierComponent, CommandeComponent,  ShowEventComponent,
    ShowAllEventsComponent,
    AddEventComponent,
    ShowEventAdminComponent,
    EditEventComponent,
    PaymentSuccessComponent,
    PaymentCancelComponent,
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
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }