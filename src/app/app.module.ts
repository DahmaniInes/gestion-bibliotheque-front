import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { ShowEventComponent } from './Event/show-event/show-event.component';
import { ShowAllEventsComponent } from './Event/show-all-events/show-all-events.component';
import { CommonModule } from '@angular/common';
import { AddEventComponent } from './Event/add-event/add-event.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowEventAdminComponent } from './Event/show-event-admin/show-event-admin.component';
import { EditEventComponent } from './Event/edit-event/edit-event.component';
import { PaymentSuccessComponent } from './Event/payment-success/payment-success.component';
import { PaymentCancelComponent } from './Event/payment-cancel/payment-cancel.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'test', component: TestComponent },
  { path: 'event/:id', component: ShowEventComponent }, // Dynamic :id parameter
  { path: 'add-event', component: AddEventComponent },
  { path: 'AllEvents', component: ShowAllEventsComponent },
  { path: 'eventAdmin', component: ShowEventAdminComponent },
  { path: 'edit-event/:id', component: EditEventComponent },

  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, HomeComponent, TestComponent, ShowEventComponent, ShowAllEventsComponent, AddEventComponent, ShowEventAdminComponent, EditEventComponent, PaymentSuccessComponent, PaymentCancelComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }