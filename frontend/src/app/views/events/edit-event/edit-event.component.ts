import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/service/event.service';
import decode from 'jwt-decode';
import { NgToastService } from 'ng-angular-popup';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  formEventEdit = new UntypedFormGroup({
    description: new UntypedFormControl(''),
    start: new UntypedFormControl(''),
    finish: new UntypedFormControl('')
  })

  idEvent = -1;

  constructor(
    private eventService: EventService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        tap((params) => this.idEvent = params['id']),
        tap(() => this.eventService.findOne(this.idEvent)
          .pipe(
            tap((event) => {
              this.formEventEdit.get('description')?.setValue(event.description);
              this.formEventEdit.get('start')?.setValue(event.start.slice(0, 16));
              this.formEventEdit.get('finish')?.setValue(event.finish.slice(0, 16));
            }),
            catchError( async (err) => this.toast.error({detail: "Mensagem de erro", summary: err.error.message, duration: 5000}))
          )
          .subscribe()
        ),
        catchError( async (err) => this.toast.error({detail: "Mensagem de erro", summary: err.error.message, duration: 5000}))
      )
      .subscribe();
  }

  update(): void{
    
    const event = {
      description: this.formEventEdit.value.description,
      start: this.formEventEdit.value.start,
      finish: this.formEventEdit.value.finish
    }

    this.eventService.update(event, this.idEvent)
      .pipe(
        tap(() => {
          this.router.navigate(['/event-list']);
          this.toast.success({detail: "Mensagem de Sucesso", summary: "Evento atualizado com sucesso", duration: 5000})
        }),
        catchError(async(err) => this.toast.error({detail: "Mensagem de erro", summary: err.error.message, duration: 5000}))
      )
      .subscribe()
  }




}

