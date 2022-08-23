import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from 'src/app/views/events/event.service';
import decode from 'jwt-decode';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {

  formEvent = new FormGroup({
    description: new FormControl(''),
    start: new FormControl(''),
    finish: new FormControl('')
  })


  constructor(
    private eventService: EventService,
    private router: Router,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
  }

  create(): void{
    const token = localStorage.getItem('token');
    const tokenPayload : any = decode(token!);
    const event = {
      user: {
        id: tokenPayload.sub
      },
      description: this.formEvent.value.description,
      start: this.formEvent.value.start,
      finish: this.formEvent.value.finish
    }
    this.eventService.create(event)
      .subscribe(
        response => {
          this.router.navigate(['/event-list']);
          this.toast.success({detail: "Mensagem de Sucesso", summary: "Evento cadastrado com sucesso", duration: 5000})
        },
        error => {
          this.toast.error({detail: "Mensagem de Erro", summary: "Houve um erro tente novamente", duration: 5000})
        }
      )
  }

}
