import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PostUserService } from '../post-user.service';

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

  constructor(private postUserService: PostUserService) {
  }

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
      this.address.value);
  }
}
