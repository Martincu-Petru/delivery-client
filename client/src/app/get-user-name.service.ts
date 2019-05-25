import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User} from './models/User';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetUserNameService {

  constructor(private http: HttpClient) { }

  public get_user_name_session(session: string): Observable<HttpResponse<User>> {
    return this.http.get<User>(environment.getUsernameURL + 'session_id=' + session, { observe: 'response' });
  }

}
