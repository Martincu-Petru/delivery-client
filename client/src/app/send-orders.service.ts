import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SendOrdersService {

  constructor(private http: HttpClient) { }

  send_orders(orders) {
    const body = JSON.stringify(orders);

    const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

    return this.http.post(environment.postOrdersURL, {body}, options);
  }
}
