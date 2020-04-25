import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Orderdetails } from 'src/app/common/orderdetails';
import { CartItem } from 'src/app/common/cart-item';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  checkOutForm: FormGroup;
  orderDetails:Orderdetails;
  cartItems:CartItem[]=[];
  constructor(private orderService: OrderService, private route:ActivatedRoute, private router:Router,
    private formBuilder: FormBuilder    ) { }

  ngOnInit(): void {
  this.handleOrders();
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


  handleOrders() {
   this.orderDetails= this.orderService.orderDetails;
   this.cartItems=this.orderDetails.cartItems;

  }


  onSubmit() {
    console.log("entered register onSubmit");


  }

}
