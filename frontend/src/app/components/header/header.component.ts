import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modal } from 'src/app/model/modal.model';
import { ModalService } from 'src/app/service/modal.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  modalLogout!: Modal;

  title = 'Event Scheduling';

  constructor(
    private modalService: ModalService,
    private router: Router,
  ) {
    this.configModalLogout();
  }

  openModal(){
    this.modalService.open(this.modalLogout);
    this.modalService.buttonHandler.subscribe(txtBtn => {
      if(txtBtn === this.modalLogout.txtBtnSuccess) this.logout();
      else this.modalService.close();
    });
  }

  logout(){
    this.router.navigate(['/login']);
    localStorage.removeItem("token");
  }

  configModalLogout(){
    this.modalLogout = new Modal(
      "Deseja mesmo realizar essa ação?",
      "Após confirmar você será redirecionado para a tela de login"
    );
  }

}
