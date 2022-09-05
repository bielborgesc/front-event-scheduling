import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Modal } from 'src/app/model/modal.model';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  modal: Modal = this.modalService.getModal();
  hasOpenModal: boolean = this.modalService.hasOpenModal();

  constructor(private modalService: ModalService, private router: Router) {}

  ngOnInit(): void {}

  onConfirm(){
    this.modalService.onClickButton(this.modal.txtBtnSuccess);
    this.modalService.close();
  }

  onDenied(){
    this.modalService.onClickButton(this.modal.txtBtnDenied);
    this.modalService.close();
  }

  onClose(){
    this.modalService.close();
  }

}
