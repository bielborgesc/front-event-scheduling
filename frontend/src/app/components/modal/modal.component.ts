import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { LogoutDirective } from 'src/app/directives/access.directive';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(
    public activateModal: NgbActiveModal,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  logout(){
    localStorage.removeItem("token");
    this.activateModal.close();
    this.router.navigate(['/login']);
  }

}
