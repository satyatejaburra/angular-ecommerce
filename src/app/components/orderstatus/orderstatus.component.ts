import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Orderitem } from 'src/app/common/orderitem';

@Component({
  selector: 'app-orderstatus',
  templateUrl: './orderstatus.component.html',
  styleUrls: ['./orderstatus.component.css']
})
export class OrderstatusComponent implements OnInit {

  orderItems:Orderitem[]=[];

  constructor(private orderService:OrderService) { }

  ngOnInit(): void {

    this.orderItems=this.orderService.orderItems;
  }

}
