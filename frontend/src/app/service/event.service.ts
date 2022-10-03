import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

const baseUrl = 'http://localhost:3000/event'

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  create(event: any): Observable<any> {
    return this.http.post(`${baseUrl}`, event);
  }

  findAll(): Observable<Event[]> {
    return this.http.get<Event[]>(`${baseUrl}`);
  }

  findOne(id: number): Observable<any> {
    return this.http.get<any>(`${baseUrl}/${id}`);
  }

  findAllByUser(idUser: number): Observable<any> {
    return this.http.get<any>(`${baseUrl}/user/${idUser}`);
  }

  update(event: any, idEvent: number): Observable<any> {
    return this.http.put(`${baseUrl}/${idEvent}`, event);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

}
