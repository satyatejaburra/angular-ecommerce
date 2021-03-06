import { CartItem } from './cart-item';
import { Orderitem } from './orderitem';

export class Orderdetails {

  orderItems:Orderitem[];
  totalPrice:number;
  userId:String;
  address:string;
  firstName: string;
  lastName:string;
  emailId:string;
  address2:string;
  country:string;
  state:string;
  zip:string;
  orderId:string

  constructor(theOrderItems:Orderitem[],theTotalPrice:number , theUserid:string, theAddress:string,
    theAddress2:string,
    theEmailId:string,
    theState:string,
    theCountry:string,
    theZip:string,
    theFirstName:string,
    theLastName:string
    )
  {
    this.orderItems=theOrderItems;
    this.totalPrice=theTotalPrice;
    this.userId=theUserid;
    this.address=theAddress;
    this.address2=theAddress2;
    this.emailId=theEmailId;
    this.firstName=theFirstName;
    this.lastName=theLastName;
    this.country=theCountry;
    this.state=theState;
    this.zip=theZip;
  }

}
