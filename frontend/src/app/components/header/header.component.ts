import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  title = 'Event Scheduling';

  constructor(
    private modalService: NgbModal
  ) { }


  openModal(){
    const modalRef = this.modalService.open(ModalComponent)
  }

}
