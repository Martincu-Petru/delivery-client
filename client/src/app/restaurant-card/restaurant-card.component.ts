import { Component, OnInit } from '@angular/core';
import { GetRestaurantsService } from '../get-restaurants.service';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.css']
})
export class RestaurantCardComponent implements OnInit {

  currentRestaurantNumber = 0;
  numberOfRestaurants = null;
  restaurants = null;
  currentRestaurantImage = 'http://www.festival56.com/images/loading.gif';
  currentRestaurantTitle = null;
  currentRestaurantAddress = 'Please wait...';
  currentRestaurantSnippet = 'Loading';
  // h1 = "Just";
  // h2 = "wait";
  // h3 = "please";

  constructor(private restaurantsService: GetRestaurantsService) { }

  ngOnInit() {
    this.restaurants = this.restaurantsService.get_restaurants().subscribe(response => {
      this.restaurants = response.body;
      this.numberOfRestaurants = this.restaurants.restaurants.length;
      this.currentRestaurantImage = this.restaurants.restaurants[this.currentRestaurantNumber].image_URL;
      this.currentRestaurantTitle = this.restaurants.restaurants[this.currentRestaurantNumber].title;
      this.currentRestaurantAddress = this.restaurants.restaurants[this.currentRestaurantNumber].address;
      this.currentRestaurantSnippet = this.restaurants.restaurants[this.currentRestaurantNumber].snippet;
      // this.h1 = this.restaurants.restaurants[this.currentRestaurantNumber].hashtag[0];
      // this.h2 = this.restaurants.restaurants[this.currentRestaurantNumber].hashtag[1];
      // this.h3 = this.restaurants.restaurants[this.currentRestaurantNumber].hashtag[2];
    });
  }

  decrease_current_number() {
    this.currentRestaurantNumber--;
    this.currentRestaurantImage = this.restaurants.restaurants[this.currentRestaurantNumber].image_URL;
    this.currentRestaurantTitle = this.restaurants.restaurants[this.currentRestaurantNumber].title;
    this.currentRestaurantAddress = this.restaurants.restaurants[this.currentRestaurantNumber].address;
    this.currentRestaurantSnippet = this.restaurants.restaurants[this.currentRestaurantNumber].snippet;
    // this.h1 = this.restaurants.restaurants[this.currentRestaurantNumber].hashtag[0];
    // this.h2 = this.restaurants.restaurants[this.currentRestaurantNumber].hashtag[1];
    // this.h3 = this.restaurants.restaurants[this.currentRestaurantNumber].hashtag[2];
  }

  increase_current_number() {
    this.currentRestaurantNumber++;
    this.currentRestaurantImage = this.restaurants.restaurants[this.currentRestaurantNumber].image_URL;
    this.currentRestaurantTitle = this.restaurants.restaurants[this.currentRestaurantNumber].title;
    this.currentRestaurantAddress = this.restaurants.restaurants[this.currentRestaurantNumber].address;
    this.currentRestaurantSnippet = this.restaurants.restaurants[this.currentRestaurantNumber].snippet;
    // this.h1 = this.restaurants.restaurants[this.currentRestaurantNumber].hashtag[0];
    // this.h2 = this.restaurants.restaurants[this.currentRestaurantNumber].hashtag[1];
    // this.h3 = this.restaurants.restaurants[this.currentRestaurantNumber].hashtag[2];
  }
}
