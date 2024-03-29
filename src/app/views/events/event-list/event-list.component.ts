import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/service/event.service';
import {ActivatedRoute, Router} from '@angular/router';
import decode from 'jwt-decode';
import { NgToastService } from 'ng-angular-popup';
import { ModalService } from 'src/app/service/modal.service';
import { catchError, delay, EMPTY, finalize, Observable, switchMap, take, tap } from 'rxjs';
import { InvitationService } from 'src/app/service/invitation.service';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events$!: Observable<any>;
  token: any = decode(localStorage.getItem('token')!);
  invitesAccepted$!: Observable<any>;

  constructor(
    private eventService: EventService,
    private modalService: ModalService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toast: NgToastService,
    private invitationService: InvitationService
  ) { }

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh() {
    this.events$ = this.eventService.findAllByUser(this.token.sub).pipe(
      catchError( async (err) => {
        this.toast.error({detail: "Mensagem de Erro", summary: err.error.message, duration: 5000})
        return EMPTY;
      })
    );

    this.invitesAccepted$ = this.invitationService.findAllByUserAndStatus(this.token.sub, 'ACCEPT').pipe(
      catchError( async (err) => {
        this.toast.error({detail: "Mensagem de Erro", summary: err.error.message, duration: 5000})
        return EMPTY;
      })
    );

  }

  editEvent(id: number): void{
    this.router.navigate([`/edit-event/${id}`], {relativeTo: this.activatedRoute})
  }

  invitationsEvent(idEvent: any) {
    this.router.navigate([`/invitations/${idEvent}`], {relativeTo: this.activatedRoute})
  }

  deleteEvent(id: number): void {
    const result$ = this.modalService.showConfirm("Confrimação", "Tem certeza que deseja apagar o evento?");
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(
          async (result) => result ?
          this.eventService.delete(id)
            .pipe(
              tap(() => this.toast.success({detail: "Mensagem de sucesso", summary: "Evento excluido com sucesso", duration: 5000})),
              catchError(async (err) => this.toast.error({detail: "Mensagem de Erro", summary: err.error.message, duration: 5000}))
            )
            .subscribe()
          : EMPTY
        ),
        delay(500),
        tap(() => {
          this.onRefresh()
        }),
      )
      .subscribe()
  }

}
