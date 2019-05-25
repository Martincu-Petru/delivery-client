import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { User } from './models/User';

@Injectable({
  providedIn: 'root'
})

export class GetUserService {

  constructor(private http: HttpClient) { }

  get_user(email: string, password: string): Observable<HttpResponse<User>> {
    return this.http.get<User>(environment.getUserURL + 'email=' + email + '&user_password=' + password, { observe: 'response' });
  }

}
