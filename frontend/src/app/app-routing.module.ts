import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { EditEventComponent } from './views/events/edit-event/edit-event.component';
import { EventListComponent } from './views/events/event-list/event-list.component';
import { LoginComponent } from './views/user/login/login.component';
import { NewEventComponent } from './views/events/new-event/new-event.component';
import { RegisterComponent } from './views/user/register/register.component';
import { InvitationsComponent } from './views/invitations/invitations.component';

const routes: Routes = [

  {
    path: 'new-event',
    component: NewEventComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'edit-event/:id',
    component: EditEventComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'invitations/:idEvent',
    component: InvitationsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    component: EventListComponent,
    canActivate: [AuthGuardService]
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
    path: '**',
    redirectTo: '',
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule { }
