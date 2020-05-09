import { Injectable } from '@angular/core';
import { Orderdetails } from '../common/orderdetails';
import { Router } from '@angular/router';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Orderitem } from '../common/orderitem';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  getMyOrders(userId: string) {
    const searchUrl=`${environment.getOrderByOrderIdUrl}?userId=${userId}`;
return this.httpClient.get<Orderitem>(searchUrl).subscribe(
  data => {
    console.log("data");

  console.log(data);
  this.router.navigateByUrl(`orderstatus`);

  })}


  orderItems: Orderitem[]
  public _orderItems$ = new BehaviorSubject<Orderitem[]>([]);


  populateOrderDetails(theOrderItems: Orderitem[], userid: string) {
    console.log("saving populatePaymentDetails order items"+theOrderItems);
    this.orderItems=theOrderItems;
    this._orderItems$.next(this.orderItems);
  }

  //orderDetails: Subject<Orderdetails> = new Subject<Orderdetails>();
  orderDetails:Orderdetails;
  orderId:string;


  constructor(private router:Router, private httpClient:HttpClient) { }

  saveOrderDetails(theOrderDetails: Orderdetails) {
    console.log("saving order "+theOrderDetails.orderItems.length);
    this.orderDetails=theOrderDetails;
}
}


interface GetResponseOrderItems{
  _embedded:{
    orderItems:Orderitem[];

  }}
