import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PostUserService {

  constructor(private http: HttpClient) { }

  insert_user_database(
    firstName: string,
    lastName: string,
    userEmail: string,
    userPassword: string,
    phoneNumber: string,
    userAddress: string) {

    const body = JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      user_password: userPassword,
      email: userEmail,
      phone_number: phoneNumber,
      address: userAddress
    });

    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

    return this.http.post(environment.postUserURL, { body }, options);
  }
}
