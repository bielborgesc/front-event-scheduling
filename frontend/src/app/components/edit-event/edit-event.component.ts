import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  formEventEdit = new FormGroup({
    description: new FormControl(''),
    start: new FormControl(''),
    finish: new FormControl('')
  })

  idEvent = -1;

  constructor(
    private eventService: EventService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.idEvent = params['id']);
    this.eventService.findOne(this.idEvent).subscribe(
      success => {
        let event = success;
        this.formEventEdit.get('description')?.setValue(event.description);
        this.formEventEdit.get('start')?.setValue(event.start);
        this.formEventEdit.get('finish')?.setValue(event.finish);
        console.log('2022-07-01T01:00')
        console.log(event.start)
      },
      error => console.error(error),
    );
  }

  update(): void{
    const event = {
      user: {
        id: "f35695d9-066b-448e-9cbd-bc087e6f33ee"
      },
      description: this.formEventEdit.value.description,
      start: this.formEventEdit.value.start,
      finish: this.formEventEdit.value.finish
    }
    this.eventService.update(event, this.idEvent)
      .subscribe(
        response => {
          this.router.navigate(['/event-list']);
        },
        error => {
          console.log(error);
        }
      )
  }




}

