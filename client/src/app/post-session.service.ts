import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class PostSessionService {

  constructor(private http: HttpClient) { }

  insert_session_database(userId: string) {

    const body = JSON.stringify({
      user_id: userId,
      expiry_date: new Date(Date.now()).getFullYear().toString()
        + '-' + new Date(Date.now()).getMonth().toString()
        + '-' + new Date(Date.now()).getDay().toString()
        + ' ' + (new Date(Date.now()).getHours()).toString()
        + ':' + new Date(Date.now()).getMinutes().toString()
        + ':' + new Date(Date.now()).getSeconds().toString()
    });

    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

    return this.http.post(environment.postSessionURL, { body }, options);
  }

}
