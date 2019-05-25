import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PostUserService } from '../post-user.service';
import {PostSessionService} from '../post-session.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-up-dialog',
  templateUrl: './sign-up-dialog.component.html',
  styleUrls: ['./sign-up-dialog.component.css']
})
export class SignUpDialogComponent implements OnInit {

  email = new FormControl('martincu.petru@gmail.com', [Validators.required, Validators.email]);
  password = new FormControl('12345678', [Validators.required, Validators.pattern(('^[a-zA-Z0-9]{8,}$'))]);
  phoneNumber = new FormControl('0747809757', [Validators.required, Validators.pattern(('^0[0-9]{9}$'))]);
  address = new FormControl('Romania, Radauti', [Validators.required, Validators.minLength(10)]);
  firstName = new FormControl('Martincu', [Validators.required, Validators.pattern('^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$')]);
  lastName = new FormControl('Petru', [Validators.required, Validators.pattern('^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$')]);

  constructor(
    private postUserService: PostUserService,
    private postSessionService: PostSessionService,
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

  getAddressErrorMessage() {
    return this.address.hasError('required') ? 'You must enter a value' : '';
  }

  signUp() {
    this.postUserService.insert_user_database(
      this.firstName.value,
      this.lastName.value,
      this.email.value,
      this.password.value,
      this.phoneNumber.value,
      this.address.value).subscribe(
      data => {
        console.log('POST user is successful ', data);
        const user: any = data;
        this.postSessionService.insert_session_database(user.user_id).subscribe(
          sessionData => {
            console.log('POST session is successful ', data);
            const session: any = sessionData;
            this.cookieManager.set('session', session.session_id, 0.25);
            this.routerService.navigateByUrl('/home').then(() => console.log('Navigated to home screen'));
          });
      }
    );
  }
}
