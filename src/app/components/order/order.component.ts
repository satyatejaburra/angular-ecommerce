import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Orderdetails } from 'src/app/common/orderdetails';
import { CartItem } from 'src/app/common/cart-item';
import { FormBuilder, FormGroup, Validators , FormControl, NgForm } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Orderitem } from 'src/app/common/orderitem';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  checkOutForm: FormGroup;
  orderDetails:Orderdetails;
  orderItems:Orderitem[]=[];

  constructor(private orderService: OrderService, private route:ActivatedRoute, private router:Router,
    private formBuilder: FormBuilder, private paymentService:PaymentService, private http: HttpClient ) { }

  ngOnInit(): void {
    this.orderDetails=this.orderService.orderDetails;
    this.orderItems=this.orderDetails.orderItems;

  this.checkOutForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(10)]],
    mobile: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]]
});
  }



  get f() { return this.checkOutForm.controls; }

  onSubmit() {
    console.log("entered register onSubmit");
    this.router.navigateByUrl(`payment`);

  }

  updateUserDetails(form: NgForm) {
    this.orderDetails.orderId="";
    this.orderDetails.userId="satyateja100";
    console.log(this.orderDetails);
    this.http.post<any>(environment.createOrderUrl, this.orderDetails).subscribe(
      data => {
      console.log(data);
      this.orderItems = data.product;
      this.orderService.populateOrderDetails(this.orderItems,data.userid);
      this.paymentService.populatePaymentDetails(this.orderDetails);
     // this.router.navigateByUrl(`payment`);
     this.router.navigateByUrl(`orderstatus`);

      }
    )

	}

}
