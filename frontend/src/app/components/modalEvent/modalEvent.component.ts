import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modalEvent.component.html',
  styleUrls: ['./modalEvent.component.css']
})
export class ModalEventComponent implements OnInit {

  @Input() event: any

  constructor(
    public activateModal: NgbActiveModal,
    private eventService: EventService
  ) { }

  ngOnInit() {
  }

  removeItem(){
    this.eventService.delete(this.event.id)
    .subscribe(
      success => {
        this.activateModal.close()
        location.reload();
      },
      error => {
        console.log(error);
      }
    )
  }

}
