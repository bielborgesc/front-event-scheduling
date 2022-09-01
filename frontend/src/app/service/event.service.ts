import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000/event'

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  emitDeletedEvent = new EventEmitter<number>();

  findAll(): Observable<Event[]> {
    return this.http.get<Event[]>(`${baseUrl}`);
  }

  create(event: any): Observable<any> {
    return this.http.post(`${baseUrl}`, event);
  }

  update(event: any, idEvent: number): Observable<any> {
    return this.http.put(`${baseUrl}/${idEvent}`, event);
  }

  findOne(id: number): Observable<any> {
    return this.http.get<any>(`${baseUrl}/${id}`);
  }

  delete(id: number): Observable<any> {
    this.emitDeletedEvent.emit(id);
    return this.http.delete(`${baseUrl}/${id}`);
  }

}
