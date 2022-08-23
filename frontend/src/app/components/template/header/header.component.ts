import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../modal/modal.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  title = 'Event Scheduling';

  constructor(
    private auth: AuthService,
    private modalService: NgbModal
  ) { }

  getVisibility(){
    if(this.auth.isAuthenticated()){
      return 'block';
    }
    return 'none'
  }

  openModal(){
    const modalRef = this.modalService.open(ModalComponent)
  }

}
