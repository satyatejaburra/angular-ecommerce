import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { Orderdetails } from 'src/app/common/orderdetails';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService,  private router:Router, private orderService: OrderService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {

    // get a handle to the cart items
    this.cartItems = this.cartService.cartItems;

    // subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    // subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    // compute cart total price and quantity
    this.cartService.computeCartTotals();
  }

  incrementQuantity(theCartItem: CartItem) {
    this.cartService.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem: CartItem) {
    this.cartService.decrementQuantity(theCartItem);
  }

  remove(theCartItem: CartItem) {
    this.cartService.remove(theCartItem);
  }

  checkOutItems(theCartItems:CartItem[])
  {
    console.log("cart irtems in checkout are "+theCartItems[0].name);
    console.log("cart irtems in checkout are "+theCartItems[1].name);
    console.log("cart irtems in checkout are "+theCartItems[2].name);

    const orderDetails=new Orderdetails(theCartItems, this.totalPrice,"","","","","","","","","");
    console.log("checkOutItems " + orderDetails.totalPrice);

    this.orderService.saveOrderDetails(orderDetails);

    this.router.navigateByUrl(`order`);

  }
}
