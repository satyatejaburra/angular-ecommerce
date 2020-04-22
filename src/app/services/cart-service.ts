import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  cartItems:CartItem[]=[];

  totalPrice: Subject<number>=new Subject<number>();
  totalQuantity: Subject<number>=new Subject<number>();

  constructor() { }


  addToCart(theCartItem: CartItem)
  {
    //check if we already have the item in our cart
    let alreadyExistsInCart:boolean=false;
    let existingCartItem:CartItem=undefined;

    if(this.cartItems.length>0)
    existingCartItem =this.cartItems.find(tempCartItem=>tempCartItem.id==theCartItem.id);
    // find item by id
    // check if we find the given item
    alreadyExistsInCart=(existingCartItem!=undefined);

      if(alreadyExistsInCart)
      {
        existingCartItem.quantity++;
      }
      else
      {
        this.cartItems.push(theCartItem);
      }
      this.computeCartTotals();

}
  computeCartTotals() {
   let totalPriceValue:number=0;
   let totalQuantityValue:number=0;

   for(let tempCartItem of this.cartItems)
   {
     totalPriceValue+=tempCartItem.quantity*tempCartItem.unitPrice;
     totalQuantityValue+=tempCartItem.quantity;
   }
   this.totalPrice.next(totalPriceValue);
   this.totalQuantity.next(totalQuantityValue);

   this.logCartData(totalPriceValue, totalQuantityValue);
  }

  decrementQuantity(theCartItem: CartItem) {
theCartItem.quantity--;
if(theCartItem.quantity==0)
{
this.remove(theCartItem);
}
else{
this.computeCartTotals();
}
  }
  remove(theCartItem: CartItem) {
const itemIndex=this.cartItems.findIndex(tempCartItem=>tempCartItem.id=theCartItem.id);

if(itemIndex>-1)
{
  this.cartItems.splice(itemIndex,1);
  this.computeCartTotals();
}
  }


  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log("content of cart items");
    for(let tempCartItem of this.cartItems)
   {
    const subTotalPrice=tempCartItem.quantity*tempCartItem.unitPrice;
    console.log(tempCartItem.name +" "+tempCartItem.unitPrice+" "+tempCartItem.quantity);
   }
   console.log(totalPriceValue.toFixed(2) +" "+ totalQuantityValue);
  }
}

