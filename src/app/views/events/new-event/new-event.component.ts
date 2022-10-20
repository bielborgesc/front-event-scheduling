import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from 'src/app/service/event.service';
import decode from 'jwt-decode';
import { NgToastService } from 'ng-angular-popup';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {

  formEvent = new UntypedFormGroup({
    description: new UntypedFormControl(''),
    start: new UntypedFormControl(''),
    finish: new UntypedFormControl('')
  })

  token: any = decode(localStorage.getItem('token')!);

  constructor(
    private eventService: EventService,
    private router: Router,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
  }

  create(): void{
    const event = {
      user: {
        id: this.token.sub
      },
      description: this.formEvent.value.description,
      start: this.formEvent.value.start,
      finish: this.formEvent.value.finish
    }


    this.eventService.create(event)
      .pipe(
        tap(() => {
          this.router.navigate(['/event-list']);
          this.toast.success({detail: "Mensagem de Sucesso", summary: "Evento cadastrado com sucesso", duration: 5000})
        }),
        catchError(async (err) => this.toast.error({ detail: "Mensagem de Erro", summary: err.error.message, duration: 5000 }) )
      )
      .subscribe()
  }

}
