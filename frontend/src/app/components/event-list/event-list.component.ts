import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events:any;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.findAllEvents();
  }

  findAllEvents(): void {
    this.eventService.findAll()
      .subscribe(
        data => {
          this.events = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      )
  }

}
