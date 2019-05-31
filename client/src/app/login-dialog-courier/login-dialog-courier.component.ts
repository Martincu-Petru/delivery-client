import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {GetCourierService} from '../get-courier.service';
import {PostSessionCourierService} from '../post-session-courier.service';

@Component({
  selector: 'app-login-dialog-courier',
  templateUrl: './login-dialog-courier.component.html',
  styleUrls: ['./login-dialog-courier.component.css']
})
export class LoginDialogCourierComponent implements OnInit {

  email = new FormControl('martincu.petru@gmail.com', [Validators.required, Validators.email]);
  password = new FormControl('12345678', [Validators.required, Validators.pattern(('^[a-zA-Z0-9]{8,}$'))]);

  constructor(
    private getCourierService: GetCourierService,
    private postSessionCourierService: PostSessionCourierService,
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
    this.getCourierService.get_courier(this.email.value, this.password.value).subscribe(
      response => {
        console.log('GET courier is successful ', response.body);
        this.postSessionCourierService.insert_session_courier_database(response.body.courier_id).subscribe(
          data => {
            console.log('POST session courier is successful ', data);
            const session: any = data;
            this.cookieManager.set('session_courier', session.session_id, 0.25);
            this.routerService.navigateByUrl('/courier/home').then(() => console.log('Navigated to courier home screen'));
          });
      }
    );
  }

}
