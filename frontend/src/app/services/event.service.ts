import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<any> {
    return this.http.get(`${baseUrl}/event`)
  }

  create(event: any): Observable<any> {
    return this.http.post(`${baseUrl}/event`, event)
  }

}
