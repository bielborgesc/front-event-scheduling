import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { tap, catchError, finalize, delay, Observable, EMPTY } from 'rxjs';
import { EventService } from 'src/app/service/event.service';
import { InvitationService } from 'src/app/service/invitation.service';
import { UserService } from 'src/app/service/user.service';
import { Event } from '../../../model/event.model';
import { User } from '../../../model/user.model';
import { Invitation } from '../../../model/invitation.model';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent implements OnInit {

  inputSearch = new UntypedFormGroup({
    email: new UntypedFormControl(''),
  })

  event: Event = new Event(0, "", new Date(), new Date());
  userSearched: User | any = null;
  loadingB: boolean = false;
  participants$!: Observable<any>;

  constructor(
    private eventService: EventService,
    private userService: UserService,
    private invitationService: InvitationService,
    private activatedRoute: ActivatedRoute,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getEvet();
  }

  addUser() {
    const inputSearch = this.inputSearch.controls['email'].value
    if(inputSearch !== ""){
      this.loadingB = true;
      this.userSearched = null;
      this.userService.findOneByEmail(inputSearch)
        .pipe(
          delay(200),
          tap((user) => this.userSearched = user),
          catchError(async (err) => {
            this.toast.error({detail: "Mensagem de Erro", summary: err.error.message, duration: 5000})
          }),
          finalize(() => this.loadingB = false)
        )
        .subscribe()
    }
    this.userSearched = null;
  }

  sendInvite(){
    const idUser = this.userSearched.id
    const idEvent = this.event.id;

    const invitation = {
      user: {
        id: idUser
      },
      event: {
        id: idEvent
      },
      status: "PENDING"
    }

    this.userSearched = null;
    this.loadingB = true
    this.invitationService.create(invitation)
      .pipe(
        delay(200),
        tap(() => this.getParticipants()),
        tap(() => {
          this.toast.success({detail: "Mensagem de Sucesso", summary: "Convite enviado com sucesso", duration: 5000})
        }),
        catchError(async (err) => this.toast.error({ detail: "Mensagem de Erro", summary: err.error.message, duration: 5000 }) ),
        finalize(() => this.loadingB = false)
      )
      .subscribe();

  }

  getParticipants(){
    this.participants$ = this.invitationService.findAllByEvent(this.event.id)
      .pipe(
        catchError( async (err) => {
          this.toast.error({detail: "Mensagem de Erro", summary: err.error.message, duration: 5000})
          return EMPTY;
        })
      )
  }

  getEvet(){
    this.activatedRoute.params
    .pipe(
      tap(async (params) => this.eventService.findOne(params['idEvent'])
      .pipe(
        tap((event) => this.event = event),
        delay(200),
        tap(() => this.getParticipants()),
        catchError(async (err) => this.toast.error({detail: "Mensagem de erro", summary: err.error.message, duration: 5000}))
      )
      .subscribe()

      ),
    )
    .subscribe();
  }

}
