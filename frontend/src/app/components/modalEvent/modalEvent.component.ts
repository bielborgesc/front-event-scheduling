import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { NgToastService } from 'ng-angular-popup';
import { EventService } from 'src/app/views/events/event.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modalEvent.component.html',
  styleUrls: ['./modalEvent.component.css']
})
export class ModalEventComponent implements OnInit {

  @Input() event: any

  constructor(
    public activateModal: NgbActiveModal,
    private eventService: EventService,
    private toast: NgToastService
  ) { }

  ngOnInit() {
  }

  removeItem(){
    this.eventService.delete(this.event.id)
    .subscribe(
      success => {
        this.activateModal.close()
        location.reload();
        this.toast.success({detail: "Mensagem de Sucesso", summary: "Evento excluido com sucesso", duration: 5000})
      },
      error => {
        this.toast.error({detail: "Mensagem de Erro", summary: "", duration: 5000})
      }
    )
  }

}
