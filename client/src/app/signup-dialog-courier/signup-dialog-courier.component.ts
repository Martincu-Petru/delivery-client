import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {PostCourierService} from '../post-courier.service';
import {PostSessionCourierService} from '../post-session-courier.service';

@Component({
  selector: 'app-signup-dialog-courier',
  templateUrl: './signup-dialog-courier.component.html',
  styleUrls: ['./signup-dialog-courier.component.css']
})
export class SignupDialogCourierComponent implements OnInit {

  email = new FormControl('martincu.petru@gmail.com', [Validators.required, Validators.email]);
  password = new FormControl('12345678', [Validators.required, Validators.pattern(('^[a-zA-Z0-9]{8,}$'))]);
  phoneNumber = new FormControl('0747809757', [Validators.required, Validators.pattern(('^0[0-9]{9}$'))]);
  firstName = new FormControl('Martincu', [Validators.required, Validators.pattern('^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$')]);
  lastName = new FormControl('Petru', [Validators.required, Validators.pattern('^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$')]);

  constructor(
    private postCourierService: PostCourierService,
    private postSessionCourierService: PostSessionCourierService,
    private routerService: Router,
    private cookieManager: CookieService) { }

  ngOnInit() { }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  getPasswordErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' : '';
  }

  getFirstNameErrorMessage() {
    return this.firstName.hasError('required') ? 'You must enter a value' : '';
  }

  getLastNameErrorMessage() {
    return this.lastName.hasError('required') ? 'You must enter a value' : '';
  }

  getPhoneNumberErrorMessage() {
    return this.phoneNumber.hasError('required') ? 'You must enter a value' : '';
  }


  signUp() {
    this.postCourierService.insert_courier_database(
      this.firstName.value,
      this.lastName.value,
      this.email.value,
      this.password.value,
      this.phoneNumber.value).subscribe(
      data => {
        console.log('POST courier is successful ', data);
        const user: any = data;
        this.postSessionCourierService.insert_session_courier_database(user.user_id).subscribe(
          sessionData => {
            console.log('POST session courier is successful ', data);
            const session: any = sessionData;
            this.cookieManager.set('session_courier', session.session_id, 0.25);
            this.routerService.navigateByUrl('/courier/home').then(() => console.log('Navigated to courier home screen'));
          });
      }
    );
  }
}
