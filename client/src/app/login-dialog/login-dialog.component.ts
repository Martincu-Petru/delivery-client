import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GetUserService } from '../get-user.service';
import { PostSessionService } from '../post-session.service';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  email = new FormControl('martincu.petru@gmail.com', [Validators.required, Validators.email]);
  password = new FormControl('12345678', [Validators.required, Validators.pattern(('^[a-zA-Z0-9]{8,}$'))]);

  constructor(
    private getUserService: GetUserService,
    private postSessionService: PostSessionService,
    private routerService: Router,
    private cookieManager: CookieService) { }

  ngOnInit() {
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  getPasswordErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.password.hasError('password') ? 'Not a valid password' :
        '';
  }

  login() {
    this.getUserService.get_user(this.email.value, this.password.value).subscribe(
      response => {
        console.log('GET user is successful ', response.body);
        this.postSessionService.insert_session_database(response.body.user_id).subscribe(
          data => {
            console.log('POST session is successful ', data);
            const session: any = data;
            this.cookieManager.set('session', session.session_id, 0.25);
            this.routerService.navigateByUrl('/home').then(() => console.log('Navigated to home screen'));
          });
      }
    );
  }
}
