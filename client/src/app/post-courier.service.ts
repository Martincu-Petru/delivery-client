import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostCourierService {


  constructor(private http: HttpClient) { }

  insert_courier_database(
    firstName: string,
    lastName: string,
    courierEmail: string,
    courierPassword: string,
    courierPhoneNumber: string) {

    const body = JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      courier_password: courierPassword,
      email: courierEmail,
      phone_number: courierPhoneNumber,
      busy: false
    });

    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

    return this.http.post(environment.postCourierURL, { body }, options);
  }
}
