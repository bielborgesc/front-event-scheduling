import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './user';

const baseUrl = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    return this.http.post(`${baseUrl}/user/login`, user);
  }

  create(user: any): Observable<any> {
    return this.http.post(`${baseUrl}/user`, user);
  }

  findOne(id: string): Observable<any> {
    return this.http.get(`${baseUrl}/user/${id}`)
  }


}
