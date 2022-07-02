import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './auth/auth.service';
import { ModalComponent } from './components/modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
