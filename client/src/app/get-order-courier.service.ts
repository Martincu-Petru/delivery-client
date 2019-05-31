import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RestaurantDetails} from './models/Restaurant_details';
import {environment} from '../environments/environment';
import {Order} from './models/Order';

@Injectable({
  providedIn: 'root'
})
export class GetOrderCourierService {

  constructor(private http: HttpClient) {
  }

  get_courier_order(session_id): Observable<HttpResponse<Order>> {
    return this.http.get<Order>(environment.getOrderURL + 'session_id=' + session_id, {observe: 'response'});
  }
}
