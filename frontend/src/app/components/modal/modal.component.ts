import { Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Modal } from 'src/app/model/modal.model';
import { ModalService } from 'src/app/service/modal.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() title!: string;
  @Input() msg!: string;
  @Input() cancelTxt: string = "Cancelar";
  @Input() okTxt: string = "Ok";

  modal: Modal = this.modalService.getModal();
  hasOpenModal: boolean = this.modalService.hasOpenModal();

  constructor(private modalService: ModalService, private router: Router, public bsModalRef: BsModalRef){}

  ngOnInit(): void {}

  onConfirm(){

  }

  onDenied(){
    this.modalService.onClickButton(this.modal.txtBtnDenied);
    this.modalService.close();
  }

  onClose(){
    this.bsModalRef.hide();
  }

}
