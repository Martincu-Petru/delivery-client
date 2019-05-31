// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  getUsernameURL: 'http://localhost:5000/user/session?',
  getCourierUsernameURL: 'http://localhost:5000/courier/session?',
  getRestaurantsURL: 'http://localhost:5000/restaurants',
  getRestaurantDetailsURL: 'https://tema3cloudcomputing.appspot.com/restaurant?',
  getUserURL: 'http://localhost:5000/user?',
  getCourierURL: 'http://localhost:5000/courier?',
  postUserURL: 'http://localhost:5000/user',
  postCourierURL: 'http://localhost:5000/courier',
  getSessionURL: 'http://localhost:5000/session?',
  getSessionCourierURL: 'http://localhost:5000/get/courier/session?',
  postSessionURL: 'http://localhost:5000/session',
  postSessionCourierURL: 'http://localhost:5000/courier/session',
  getItemsUrl: 'http://localhost:5000/items?',
  postOrdersURL: 'http://localhost:5000/orders',
  getOrderURL: 'http://localhost:5000/orders?',
  completeOrderURL: 'http://localhost:5000/complete?'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
