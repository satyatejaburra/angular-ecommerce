import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Orderdetails } from '../common/orderdetails';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  orderDetails:Orderdetails;


  constructor(private router:Router, private httpClient:HttpClient) { }

  populatePaymentDetails(theOrderDetails: Orderdetails) {
    console.log("saving populatePaymentDetails order id"+theOrderDetails.orderId);
    this.orderDetails=theOrderDetails;
  }

}
