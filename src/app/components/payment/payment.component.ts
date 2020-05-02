import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentService } from 'src/app/services/payment.service';
import { Orderdetails } from '../../common/orderdetails';
import { Paymentpayload } from '../../common/paymentpayload';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  public payuform: any = {};
  disablePaymentButton: boolean = true;
  constructor(private http: HttpClient, private thePaymentService: PaymentService) { }
  orderDetails: Orderdetails;
  paymentPayload:Paymentpayload;

  confirmPayment() {
    //this.paymentPayload.name=this.payuform.firstname;
    //this.paymentPayload.emailId=this.payuform.email;
    this.paymentPayload.phone=this.payuform.phone;
    this.payuform.firstname=this.paymentPayload.name;
    this.payuform.email=this.paymentPayload.emailId;

    console.log(this.paymentPayload.name + " "+ this.paymentPayload.emailId+" "+ this.paymentPayload.phone)

    return this.http.post<any>('http://localhost:8081/payment/payment-details', this.paymentPayload).subscribe(
      data => {
      console.log(data);
      this.payuform.txnid = data.txnId;
      this.payuform.surl = data.surl;
      this.payuform.furl = data.furl;
      this.payuform.key = data.key;
      this.payuform.hash = data.hash;
      this.disablePaymentButton = false;
   //   this.payuform.service_provider=data.serviceProvider;
      this.payuform.email=data.email;
      this.payuform.productinfo=data.productInfo;
      console.log(this.payuform);
    }, error1 => {
        console.log(error1);
      })
  }

  ngOnInit() {
    this.orderDetails=this.thePaymentService.orderDetails;
    console.log("PaymentComponent" + this.orderDetails.firstName+this.orderDetails.lastName);
    this.paymentPayload=new Paymentpayload(
      this.orderDetails.firstName+this.orderDetails.lastName,
      "",
      this.orderDetails.emailId,
      this.orderDetails.orderId,
      this.orderDetails.totalPrice,
      "Ecommerce Products");
  }


}
