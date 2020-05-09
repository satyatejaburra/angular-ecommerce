import { TestBed } from '@angular/core/testing';

import { OrderSortService } from './order-sort.service';

describe('OrderSortService', () => {
  let service: OrderSortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderSortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
