import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {GetUserNameCourierService} from '../get-user-name-courier.service';
import {GetOrderCourierService} from '../get-order-courier.service';
import {CompleteOrderService} from '../complete-order.service';

@Component({
  selector: 'app-main-screen-courier',
  templateUrl: './main-screen-courier.component.html',
  styleUrls: ['./main-screen-courier.component.css']
})
export class MainScreenCourierComponent implements OnInit {

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private getUserNameCourierService: GetUserNameCourierService,
    private orderService: GetOrderCourierService,
    private completeOrderService: CompleteOrderService) { }

  firstName = '';
  lastName = '';
  orderId: string;
  clientFirstName: string;
  clientLastName: string;
  clientPhone: string;
  clientAddress: string;
  restaurantName: string;
  restaurantAddress: string;
  items: string[];

  ngOnInit() {
    if (this.cookieService.check('session_courier') === false) {
      console.log('No cookie set.');
      this.router.navigateByUrl('/courier').then(() => console.log('Navigated to login screen'));
    } else {
      console.log('Session: ' + this.cookieService.get('session_courier'));
      this.getUserNameCourierService.get_user_name_courier_session(this.cookieService.get('session_courier')).subscribe(
        response => {
          console.log('Courier: ', response.body);
          this.firstName = response.body.first_name;
          this.lastName = response.body.last_name;
        }
      );
      this.orderService.get_courier_order(this.cookieService.get('session_courier')).subscribe(response => {
        console.log(response);
        this.orderId = response.body.order_id;
        this.clientFirstName = response.body.client_first_name;
        this.clientLastName = response.body.client_last_name;
        this.clientPhone = response.body.client_phone_number;
        this.clientAddress = response.body.client_address;
        this.restaurantName = response.body.restaurant_name;
        this.restaurantAddress = response.body.restaurant_address;
        this.items = [];
        if (response.body.items != undefined) {
          for (let i = 0; i < response.body.items.length; i++) {
            this.items.push(response.body.items[i]);
          }
        }
      });
    }

    document.body.style.backgroundImage = 'url(http://bit.do/background-image-main-screen)';
    document.body.style.backgroundSize = 'cover';
  }

  logout() {
    this.cookieService.delete('session_courier');
    this.router.navigateByUrl('/courier').then(() => console.log('Navigated to login screen'));
  }

  completeOrder() {
    this.completeOrderService.complete_order(this.orderId).subscribe(response => {
      console.log('Completed!');
      window.location.reload();
    });
  }
}
