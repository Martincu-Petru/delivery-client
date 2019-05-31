import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { GetUserNameService } from '../get-user-name.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {
  constructor(private cookieService: CookieService, private router: Router, private getUsernameService: GetUserNameService) { }

  firstName = '';
  lastName = '';

  ngOnInit() {
    if (this.cookieService.check('session') === false) {
      console.log('No cookie set.');
      this.router.navigateByUrl('/user').then(() => console.log('Navigated to login screen'));
    } else {
      console.log('Session: ' + this.cookieService.get('session'));
      this.getUsernameService.get_user_name_session(this.cookieService.get('session')).subscribe(
        response => {
          console.log('User: ', response.body);
          this.firstName = response.body.first_name;
          this.lastName = response.body.last_name;
        }
      );
    }

    document.body.style.backgroundImage = 'url(http://bit.do/background-image-main-screen)';
    document.body.style.backgroundSize = 'cover';
  }

  logout() {
    this.cookieService.delete('session');
    this.router.navigateByUrl('/user').then(() => console.log('Navigated to login screen'));
  }

}
