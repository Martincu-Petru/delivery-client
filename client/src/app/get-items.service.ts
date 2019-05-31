import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {Items} from './models/Items';
import {HttpClient, HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetItemsService {

  constructor(private http: HttpClient) { }

  get_items(restaurant_name: string): Observable<HttpResponse<Items>> {
    console.log(environment.getItemsUrl + 'restaurant_name=' + restaurant_name);
    return this.http.get<Items>(environment.getItemsUrl + 'restaurant_name=' + restaurant_name, { observe: 'response' });
  }
}
