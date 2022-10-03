import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000/invitation'

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  constructor(private http: HttpClient) { }

  create(invitation: any): Observable<any> {
    return this.http.post(`${baseUrl}`, invitation);
  }

  findOne(id: number): Observable<any> {
    return this.http.get<any>(`${baseUrl}/${id}`);
  }

  findAllByUser(id: string): Observable<any> {
    return this.http.get<any>(`${baseUrl}/user/${id}`);
  }

  findAllByEvent(id: number): Observable<any> {
    return this.http.get<any>(`${baseUrl}/event/${id}`);
  }

  update(invitation: any, idInvitation: number): Observable<any> {
    return this.http.put(`${baseUrl}/${idInvitation}`, invitation);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

}
