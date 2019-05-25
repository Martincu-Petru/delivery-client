import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Restaurants } from './models/Restaurants';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetRestaurantsService {

  constructor(private http: HttpClient) { }

  get_restaurants(): Observable<HttpResponse<Restaurants>> {
    return this.http.get<Restaurants>(environment.getRestaurantsURL, { observe: 'response' });
  }
}
