import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {DecimalPipe, DatePipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortColumn, SortDirection} from './../directives/sortable.directive';
import { Orderitem } from '../common/orderitem';

interface SearchResult {
  orderItems: Orderitem[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(theOrderItems: Orderitem[], column: SortColumn, direction: string): Orderitem[] {
  if (direction === '' || column === '') {
    return theOrderItems;
  } else {
    return [...theOrderItems].sort((a, b) => {
      const res = compare(`${a[column]}`, `${b[column]}`);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(orderItem: Orderitem, term: string, pipe: PipeTransform) {
  console.log("matches");
  console.log(orderItem);
  console.log(term);
  return orderItem.name.toLowerCase()?.includes(term.toLowerCase())
  || orderItem.orderId.toLowerCase()?.includes(term.toLowerCase())
  || orderItem.orderPaymentStatus?.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(orderItem.unitPrice).includes(term);
}

@Injectable({providedIn: 'root'})
export class OrderSortService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  public _orderItems$ = new BehaviorSubject<Orderitem[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  orderItm:Orderitem[]=[];

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      console.log("constructor");
      console.log(result.orderItems);
      console.log(result.total);

      this._orderItems$.next(result.orderItems);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get orderitems$() { return this._orderItems$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {

    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;


console.log(this.orderItm);

    // 1. sort
    let orderItems = sort(this.orderItm, sortColumn, sortDirection);

    // 2. filter
    orderItems = orderItems.filter(order => matches(order, searchTerm, this.pipe));
    const total = orderItems.length;

    // 3. paginate
    orderItems = orderItems.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({orderItems, total});

  }
}
