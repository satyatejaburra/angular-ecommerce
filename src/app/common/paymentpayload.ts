export class Paymentpayload {
  emailId:string;
      name: string;
      phone: string;
      orderId: string;
      amount: number;
      productInfo:string

      constructor(theName:string, thePhone:string, theEmmailId:string,theOrderId:string, theAmount:number, theProductInfo:string)
      {
        this.emailId=theEmmailId;
        this.name=theName;
        this.phone=thePhone;
        this.orderId=theOrderId;
        this.amount=theAmount;
        this.productInfo=theProductInfo;

      }
}
