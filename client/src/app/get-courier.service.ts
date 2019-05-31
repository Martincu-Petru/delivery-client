import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './models/User';
import {environment} from '../environments/environment';
import {Courier} from './models/Courier';

@Injectable({
  providedIn: 'root'
})
export class GetCourierService {

  constructor(private http: HttpClient) { }

  get_courier(email: string, password: string): Observable<HttpResponse<Courier>> {
    console.log(environment.getCourierURL + 'email=' + email + '&user_password=' + password);
    return this.http.get<Courier>(environment.getCourierURL + 'email=' + email + '&courier_password=' + password, { observe: 'response' });
  }
}
