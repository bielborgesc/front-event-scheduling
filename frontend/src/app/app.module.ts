import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { NewEventComponent } from './components/new-event/new-event.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt'
import { ReactiveFormsModule } from '@angular/forms';
import { EditEventComponent } from './components/edit-event/edit-event.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HttpsRequestInterceptor, Interceptor } from './interceptors/HttpsRequestInterceptor';
import { ModalComponent } from './components/modal/modal.component';
import { ModalEventComponent } from './components/modalEvent/modalEvent.component';
import { NgToastModule } from 'ng-angular-popup';


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
    ModalEventComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    Interceptor,
    NgToastModule
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
