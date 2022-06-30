import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditEventComponent } from './components/edit-event/edit-event.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { LoginComponent } from './components/login/login.component';
import { NewEventComponent } from './components/new-event/new-event.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [

  {
    path: 'new-event',
    component: NewEventComponent
  },
  {
    path: 'edit-event/:id',
    component: EditEventComponent
  },
  {
    path: 'event-list',
    component: EventListComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registrar',
    component: RegisterComponent
  },
  {
    path: '',
    redirectTo: 'event-list',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
