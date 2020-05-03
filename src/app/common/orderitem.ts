import { CartItem } from './cart-item';
export class Orderitem {
  id:string;
  name:string;
  imageUrl:string;
  unitPrice:number;
  quantity:number;
  orderId:string;
  orderDate:Date;
  orderStatus:string;
  orderPaymentStatus:string;

  constructor(cartItem:CartItem)
  {
    this.id=cartItem.id;
    this.name=cartItem.name;
    this.imageUrl=cartItem.imageUrl;
    this.unitPrice=cartItem.unitPrice;
    this.quantity=cartItem.quantity;
    this.orderId="";
  }
}
