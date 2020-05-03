// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: "http://localhost:8080/api/products",
  allProductUrl: "http://localhost:8080/api/products?page=0&size=150",
  productBynameUrl: "http://localhost:8080/api/products?page=0&size=150",
  categoryUrl: "http://localhost:8080/api/product-category",

  //product zuul urls
 // baseUrl: "http://localhost:8011/ecommerce-products/api/products",
  //allProductUrl: "http://localhost:8011/ecommerce-products/api/products?page=0&size=150",
  //productBynameUrl: "http://localhost:8011/ecommerce-products/api/products?page=0&size=150",
  //categoryUrl: "http://localhost:8011/ecommerce-products/api/product-category",

// login zuul url's
basePostUrl: "http://localhost:8011/ecommerce-user/users",

//order service url's
createOrderUrl: "http://localhost:8084/orders",
getOrderByOrderIdUrl: "http://localhost:8084/orders/userid"



};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
