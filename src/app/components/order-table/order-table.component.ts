import {DecimalPipe} from '@angular/common';
import {Component, QueryList, ViewChildren, OnInit} from '@angular/core';
import {Observable} from 'rxjs';



import {SortableDirective, SortEvent} from './../../directives/sortable.directive';
import { Orderitem } from 'src/app/common/orderitem';
import { OrderSortService } from '../../services/order-sort.service';
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css'],
  providers: [OrderSortService, DecimalPipe]
})




export class OrderTableComponent implements OnInit  {
  orderItems$: Observable<Orderitem[]>;
  total$: Observable<number>;

  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;

  constructor(public service: OrderSortService, private orderService:OrderService) {

    this.orderItems$ = orderService._orderItems$;
    this.total$ = service.total$;
  }
  ngOnInit(): void {
    console.log("order table component");
    this.orderItems$ = this.orderService._orderItems$;
    console.log(this.orderItems$);
    this.service.orderItm=this.orderService.orderItems;

  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
