import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/service/event.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import decode from 'jwt-decode';
import { UserService } from '../../../service/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalEventComponent } from '../../../components/modalEvent/modalEvent.component';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events:Event[] | any;
  token: any = decode(localStorage.getItem('token')!);

  constructor(
    private eventService: EventService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.findAllEvents();
    this.eventService.emitDeletedEvent
    .subscribe( async eventId => {
      setTimeout(() => this.userService.findOne(this.token.sub).subscribe((user) => this.events = user.events), 500);
      console.log(`O evento de id: ${eventId} foi excluído!`);
    });
  }

  findAllEvents(): void {
    this.userService.findOne(this.token.sub).subscribe({
      next: (user) => {
        this.events = user.events
        console.log(user.events);
      },
      error: (e) => console.error(e),
    })
  }

  editEvent(id: number): void{
    this.router.navigate([`/edit-event/${id}`], {relativeTo: this.activatedRoute})
  }

  openModal(event: any){
    const modalRef = this.modalService.open(ModalEventComponent)
    modalRef.componentInstance.event = event
  }

}
