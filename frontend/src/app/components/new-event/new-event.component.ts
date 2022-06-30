import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {

  formEvent = new FormGroup({
    description: new FormControl(''),
    start: new FormControl(''),
    finish: new FormControl('')
  })


  constructor(
    private eventService: EventService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  create(): void{
    const event = {
      user: {
        id: "f35695d9-066b-448e-9cbd-bc087e6f33ee"
      },
      description: this.formEvent.value.description,
      start: this.formEvent.value.start,
      finish: this.formEvent.value.finish
    }
    this.eventService.create(event)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/event-list']);
        },
        error => {
          console.log(error);
        }
      )
  }

}
