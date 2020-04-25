import { CartItem } from './cart-item';

export class Orderdetails {

  cartItems:CartItem[];
  totalPrice:number;

  constructor(theCartItems:CartItem[],theTotalPrice:number )
  {
    this.cartItems=theCartItems;
    this.totalPrice=theTotalPrice;
  }

}
