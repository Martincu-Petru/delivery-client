import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})

export class LoginScreenComponent implements OnInit {

  showLoginDialog = false;
  showSignUpDialog = false;

  constructor(private cookieService: CookieService, private router: Router) {
  }

  ngOnInit() {
    if (this.cookieService.check('session'))  {
      this.router.navigateByUrl('/home').then(() => console.log('Navigated to home screen'));
    }
    document.body.style.backgroundImage = 'url(http://bit.do/background-image-login-screen)';
    document.body.style.backgroundSize = 'cover';
  }

  toggleShowLoginDialog() {
    this.showLoginDialog = false;
    this.showSignUpDialog = true;
  }

  toggleShowSignUpDialog() {
    this.showLoginDialog = true;
    this.showSignUpDialog = false;
  }

}

