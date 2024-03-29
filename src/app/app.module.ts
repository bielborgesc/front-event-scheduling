import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventListComponent } from './views/events/event-list/event-list.component';
import { NewEventComponent } from './views/events/new-event/new-event.component';
import { LoginComponent } from './views/user/login/login.component';
import { RegisterComponent } from './views/user/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt'
import { ReactiveFormsModule } from '@angular/forms';
import { EditEventComponent } from './views/events/edit-event/edit-event.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HttpsRequestInterceptor, Interceptor } from './interceptors/HttpsRequestInterceptor';
import { ModalComponent } from './components/modal/modal.component';
import { NgToastModule } from 'ng-angular-popup';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoutDirective } from './directives/access.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MsgValidationErrorComponent } from './components/msg-validation-error/msg-validation-error.component';
import { InvitationsComponent } from './views/invitations/invite-manager/invitations.component';
import { NotificationsComponent } from './views/invitations/notifications/notifications.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    NewEventComponent,
    LoginComponent,
    RegisterComponent,
    EditEventComponent,
    ModalComponent,
    HeaderComponent,
    FooterComponent,
    LogoutDirective,
    MsgValidationErrorComponent,
    InvitationsComponent,
    NotificationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    Interceptor,
    NgToastModule,
    BrowserAnimationsModule,
    ModalModule.forRoot()
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    { provide: 'HTTP_INTERCEPTORS', useClass: HttpsRequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
