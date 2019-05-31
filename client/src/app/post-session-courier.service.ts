import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostSessionCourierService {

  constructor(private http: HttpClient) { }

  insert_session_courier_database(courierId: string) {

    const body = JSON.stringify({
      courier_id: courierId,
      expiry_date: new Date(Date.now()).getFullYear().toString()
        + '-' + (new Date(Date.now()).getMonth().valueOf() + 1).toString()
        + '-' + new Date(Date.now()).getDate().toString()
        + ' ' + (new Date(Date.now()).getHours()).toString()
        + ':' + new Date(Date.now()).getMinutes().toString()
        + ':' + new Date(Date.now()).getSeconds().toString()
    });

    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

    console.log(body);

    return this.http.post(environment.postSessionCourierURL, { body }, options);
  }
}
