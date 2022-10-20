import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { BsModalRef } from 'ngx-bootstrap/modal';
import decode from 'jwt-decode';
import { catchError, tap } from 'rxjs';
import { Invitation } from 'src/app/model/invitation.model';
import { InvitationService } from '../../../service/invitation.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {


  constructor(
    public bsModalRef: BsModalRef,
    private invitaionService: InvitationService,
    private toast: NgToastService
  ) { }

  invites: Invitation[] = [];
  token: any = decode(localStorage.getItem('token')!);


  ngOnInit(): void {
    this.getInvites();
  }

  getInvites(){
    this.invitaionService.findAllByUserAndStatus(this.token.sub, "PENDING")
      .pipe(
        tap( (list) => this.invites = list),
        catchError(async (err) => this.toast.error({ detail: "Mensagem de Erro", summary: err.error.message, duration: 5000 }) )
      )
      .subscribe()
  }

  updateInvite(status: string, id:number){
    const invite = {
      status: status,
    }
    this.invitaionService.update(invite, id)
      .pipe(
        tap( () => this.toast.success({detail: "Mensagem de Sucesso", summary: "Convite atualizado com sucesso", duration: 5000})),
        tap( () => this.getInvites()),
        catchError(async (err) => this.toast.error({ detail: "Mensagem de Erro", summary: err.error.message, duration: 5000 }) )
      )
      .subscribe()
  }

  onclose() {
    this.bsModalRef.hide();
  }

}
