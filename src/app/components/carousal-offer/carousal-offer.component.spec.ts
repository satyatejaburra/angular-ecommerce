import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarousalOfferComponent } from './carousal-offer.component';

describe('CarousalOfferComponent', () => {
  let component: CarousalOfferComponent;
  let fixture: ComponentFixture<CarousalOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarousalOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarousalOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
