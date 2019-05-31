import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Courier} from './models/Courier';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompleteOrderService {

  constructor(private http: HttpClient) { }

  complete_order(order_id) {
    console.log(environment.completeOrderURL + 'order_id=' + order_id);
    return this.http.get(environment.completeOrderURL + 'order_id=' + order_id, { observe: 'response' });
  }
}
