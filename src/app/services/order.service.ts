import { Injectable } from '@angular/core';
import { Orderdetails } from '../common/orderdetails';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderDetails:Orderdetails;

  constructor(private router:Router) { }

  placeOrder(orderDetails: Orderdetails) {
    this.orderDetails=orderDetails;
  }


}
