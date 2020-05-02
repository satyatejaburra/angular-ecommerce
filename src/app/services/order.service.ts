import { Injectable } from '@angular/core';
import { Orderdetails } from '../common/orderdetails';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  //orderDetails: Subject<Orderdetails> = new Subject<Orderdetails>();
  orderDetails:Orderdetails;
  orderId:string;


  constructor(private router:Router, private httpClient:HttpClient) { }

  saveOrderDetails(theOrderDetails: Orderdetails) {
    console.log("saving order "+theOrderDetails.cartItems.length);
    this.orderDetails=theOrderDetails;
}
}
