import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import decode from 'jwt-decode';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events:any;

  constructor(
    private location: Location,
    private eventService: EventService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.findAllEvents();
  }

  findAllEvents(): void {
    const token = localStorage.getItem('token');
    const tokenPayload : any = decode(token!);
    this.eventService.findAll()
      .subscribe(
        data => {
          this.events = data;
        },
        error => {
          console.log(error);
        }
      )
  }

  editEvent(id: number): void{
    this.router.navigate([`/edit-event/${id}`], {relativeTo: this.activatedRoute})
  }

  removeEvent(id: number): void{
    this.eventService.delete(id)
      .subscribe(
        success => {
          location.reload();
        },
        error => {
          console.log(error);
        }
      )
  }

}
