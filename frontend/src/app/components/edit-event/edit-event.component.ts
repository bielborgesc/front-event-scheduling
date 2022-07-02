import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import decode from 'jwt-decode';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  formEventEdit = new FormGroup({
    description: new FormControl(''),
    start: new FormControl(''),
    finish: new FormControl('')
  })

  idEvent = -1;

  constructor(
    private eventService: EventService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.idEvent = params['id']);
    this.eventService.findOne(this.idEvent).subscribe(
      success => {
        let event = success;
        this.formEventEdit.get('description')?.setValue(event.description);
        this.formEventEdit.get('start')?.setValue(event.start.slice(0, 16));
        this.formEventEdit.get('finish')?.setValue(event.finish.slice(0, 16));

      },
      error => this.toast.error({detail: "Mensagem de erro", summary: "Houve um erro tente novamente", duration: 5000}),
    );
  }

  update(): void{
    const token = localStorage.getItem('token');
    const tokenPayload : any = decode(token!);
    const event = {
      user: {
        id: tokenPayload.sub
      },
      description: this.formEventEdit.value.description,
      start: this.formEventEdit.value.start,
      finish: this.formEventEdit.value.finish
    }
    this.eventService.update(event, this.idEvent)
      .subscribe(
        response => {
          this.router.navigate(['/event-list']);
          this.toast.success({detail: "Mensagem de Sucesso", summary: "Evento atualizado com sucesso", duration: 5000})
        },
        error => {
          this.toast.error({detail: "Mensagem de erro", summary: "Houve um erro tente novamente", duration: 5000})
        }
      )
  }




}

