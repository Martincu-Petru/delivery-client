import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { PostSessionService } from './post-session.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class PostUserService {

  constructor(private http: HttpClient, private postSession: PostSessionService, private routerService: Router) { }

  insert_user_database(firstName: string, lastName: string, userEmail: string, userPassword: string, phoneNumber: string, userAddress: string) {

    const body = JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      user_password: userPassword,
      email: userEmail,
      phone_number: phoneNumber,
      address: userAddress
    });

    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

    this.http.post(environment.postUserURL, { body }, options).subscribe(
      data => {
        console.log('POST user is successful ', data);
        const session: any = data;
        this.postSession.insert_session_database(session.user_id);
        console.log(data.valueOf());
        this.routerService.navigateByUrl('/home').then(() => console.log('Navigated to home screen'));
      }
    );
  }
}
