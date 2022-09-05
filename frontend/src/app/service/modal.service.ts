import { EventEmitter, Injectable} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../components/modal/modal.component';
import { Modal } from '../model/modal.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private modalService: NgbModal,
  ) { }

  buttonHandler = new EventEmitter<string>();

  modalIsOpen: boolean = false;
  modal!: Modal;

  open(modal: Modal){
    this.modal = modal;
    this.modalIsOpen = true;
    this.modalService.open(ModalComponent);
  }

  onClickButton(btnName: string){
    this.buttonHandler.emit(btnName);
  }

  close(){
    this.modalIsOpen = false;
    this.modalService.dismissAll(ModalComponent);
  }

  hasOpenModal(){
    return this.modalIsOpen;
  }

  getModal(){
    return this.modal;
  }

}
