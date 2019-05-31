import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {RestaurantDetails} from './models/Restaurant_details';

@Injectable({
  providedIn: 'root'
})
export class GetRestaurantDetailsService {
  constructor(private http: HttpClient) {
  }

  get_restaurant_details(hotelName): Observable<HttpResponse<RestaurantDetails>> {
    return this.http.get<RestaurantDetails>(environment.getRestaurantDetailsURL + 'name=' + hotelName, {observe: 'response'});
  }
}
