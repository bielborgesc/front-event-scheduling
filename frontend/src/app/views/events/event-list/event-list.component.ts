import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/service/event.service';
import {ActivatedRoute, Router} from '@angular/router';
import decode from 'jwt-decode';
import { NgToastService } from 'ng-angular-popup';
import { ModalService } from 'src/app/service/modal.service';
import { catchError, delay, EMPTY, Observable, switchMap, take } from 'rxjs';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events$!: Observable<any>;
  token: any = decode(localStorage.getItem('token')!);

  constructor(
    private eventService: EventService,
    private modalService: ModalService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh() {
    this.events$ = this.eventService.findAll().pipe(
      catchError( async (err) => {
        this.toast.success({detail: "Mensagem de Sucesso", summary: "Evento excluido com sucesso", duration: 5000});
        return EMPTY;
      })
    );
    this.events$.subscribe((value) => console.log(value));
  }

  editEvent(id: number): void{
    this.router.navigate([`/edit-event/${id}`], {relativeTo: this.activatedRoute})
  }

  deleteEvent(id: number): void {
    const result$ = this.modalService.showConfirm("Confrimação", "Tem certeza que deseja apagar o evento?");
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(async (result) => result ? this.eventService.delete(id).subscribe() : EMPTY)
      )
      .subscribe({
        next: () => {
          this.onRefresh();
          // setTimeout(() => this.onRefresh(), 500);
        },
        error: () => {
          this.toast.success({detail: "Mensagem de Sucesso", summary: "Evento excluido com sucesso", duration: 5000});
        }
      })
  }

}
