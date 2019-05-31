import { Component, OnInit } from '@angular/core';
import { GetRestaurantsService } from '../get-restaurants.service';
import {GetRestaurantDetailsService} from '../get-restaurant-details.service';
import {GetItemsService} from '../get-items.service';
import {Item} from '../models/Item';
import {SendOrdersService} from '../send-orders.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.css']
})
export class RestaurantCardComponent implements OnInit {

  currentRestaurantNumber = 0;
  numberOfRestaurants = 0;
  restaurants = null;
  currentRestaurantImage = null;
  currentRestaurantName = null;
  currentRestaurantID = null;
  snippet = undefined;
  rating = 'defined';
  address = 'ADDRESS';
  tags = 'TAGS';
  reviews = ['REVIEWS'];
  foods: Item[];
  orders = [];
  // currentRestaurantAddress = 'Please wait...';
  // currentRestaurantSnippet = 'Loading';
  // h1 = "Just";
  // h2 = "wait";
  // h3 = "please";

  constructor(private restaurantsService: GetRestaurantsService,
              private restaurantsDetailsService: GetRestaurantDetailsService,
              private itemsService: GetItemsService,
              private ordersService: SendOrdersService,
              private cookieService: CookieService) { }

  updateName() {
    this.currentRestaurantName = this.currentRestaurantName.replace('_', ' ').replace('_', ' ').replace('_', ' ').replace('_', ' ');
    this.snippet = undefined;
  }

  ngOnInit() {
    this.restaurants = this.restaurantsService.get_restaurants().subscribe(response => {
      this.restaurants = response.body;
      this.numberOfRestaurants = this.restaurants.restaurants.length;
      this.currentRestaurantImage = this.restaurants.restaurants[this.currentRestaurantNumber].restaurant_image;
      this.currentRestaurantName = this.restaurants.restaurants[this.currentRestaurantNumber].restaurant_name;
      this.currentRestaurantID = this.currentRestaurantName;
      // this.currentRestaurantAddress = this.restaurants.restaurants[this.currentRestaurantNumber].address;
      // this.currentRestaurantSnippet = this.restaurants.restaurants[this.currentRestaurantNumber].snippet;
      // this.h1 = this.restaurants.restaurants[this.currentRestaurantNumber].hashtag[0];
      // this.h2 = this.restaurants.restaurants[this.currentRestaurantNumber].hashtag[1];
      // this.h3 = this.restaurants.restaurants[this.currentRestaurantNumber].hashtag[2];
    });
    console.log(this.numberOfRestaurants);
  }

  decrease_current_number() {
    this.currentRestaurantNumber--;
    this.currentRestaurantImage = this.restaurants.restaurants[this.currentRestaurantNumber].restaurant_image;
    this.currentRestaurantName = this.restaurants.restaurants[this.currentRestaurantNumber].restaurant_name;
    this.currentRestaurantID = this.currentRestaurantName;
    this.updateName();
    // this.currentRestaurantAddress = this.restaurants.restaurants[this.currentRestaurantNumber].address;
    // this.currentRestaurantSnippet = this.restaurants.restaurants[this.currentRestaurantNumber].snippet;
    // this.h1 = this.restaurants.restaurants[this.currentRestaurantNumber].hashtag[0];
    // this.h2 = this.restaurants.restaurants[this.currentRestaurantNumber].hashtag[1];
    // this.h3 = this.restaurants.restaurants[this.currentRestaurantNumber].hashtag[2];
  }

  increase_current_number() {
    this.currentRestaurantNumber++;
    this.currentRestaurantImage = this.restaurants.restaurants[this.currentRestaurantNumber].restaurant_image;
    this.currentRestaurantName = this.restaurants.restaurants[this.currentRestaurantNumber].restaurant_name;
    this.currentRestaurantID = this.currentRestaurantName;
    this.updateName();
    // this.currentRestaurantAddress = this.restaurants.restaurants[this.currentRestaurantNumber].address;
    // this.currentRestaurantSnippet = this.restaurants.restaurants[this.currentRestaurantNumber].snippet;
    // this.h1 = this.restaurants.restaurants[this.currentRestaurantNumber].hashtag[0];
    // this.h2 = this.restaurants.restaurants[this.currentRestaurantNumber].hashtag[1];
    // this.h3 = this.restaurants.restaurants[this.currentRestaurantNumber].hashtag[2];
  }

  getDetailedInfo() {
    this.rating = undefined;
    this.restaurantsDetailsService.get_restaurant_details(this.currentRestaurantID).subscribe(details => {
      console.log('GOT DETAILS', details);
      this.snippet = details.body.snippet;
      this.rating = details.body.rating;
      this.tags = '';
      for (let i = 0; i < details.body.tags.length; i++) {
        this.tags = this.tags.concat(' ').concat(details.body.tags[i]);
      }
      this.address = details.body.address;
      this.reviews = details.body.reviews;
      this.itemsService.get_items(this.currentRestaurantID).subscribe(items => {
        this.foods = [];
        for (let i = 0; i < items.body.items.length; i++) {
          this.foods.push(items.body.items[i]);
        }
      });
    });
  }

  placeOrder(menu) {
    console.log(menu.selectedOptions.selected.length);
    this.orders = [];
    for (let i = 0; i < menu.selectedOptions.selected.length; i++) {
      let words = menu.selectedOptions.selected[i]._text.nativeElement.innerHTML.toString().split(' ');
      // console.log(words[words.length - 2]);
      this.orders.push(words[words.length - 2]);
    }
    this.orders.push(this.cookieService.get('session'));
    this.orders.push(this.currentRestaurantName);
    this.orders.push(this.address);
    console.log(this.orders);
    this.ordersService.send_orders(this.orders).subscribe(result => {
      console.log(result);
      alert('Your order has been placed!');
    },
      error1 => {
      alert('No curiers available. Try again later!');
    });
  }
}
