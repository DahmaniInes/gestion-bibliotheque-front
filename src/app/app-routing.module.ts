import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import { ShowEventComponent } from './Event/show-event/show-event.component';
import { ShowAllEventsComponent } from './Event/show-all-events/show-all-events.component';
import { AddEventComponent } from './Event/add-event/add-event.component';
import { ShowEventAdminComponent } from './Event/show-event-admin/show-event-admin.component';
import { EditEventComponent } from './Event/edit-event/edit-event.component';

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
imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
