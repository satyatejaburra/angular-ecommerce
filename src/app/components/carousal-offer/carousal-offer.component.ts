import { Component, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-carousal-offer',
  templateUrl: './carousal-offer.component.html',
  styleUrls: ['./carousal-offer.component.css']
})
export class CarousalOfferComponent {

  images:string[] =['assets/images/offers/offer4.jpg',
  'assets/images/offers/offer2.jpg',
  'assets/images/offers/offer5.jpg',
  'assets/images/offers/offer6.jpg',
  'assets/images/offers/offer8.jpg'];

  //images = ['offer4.jpg','offer5.jpg'].map((n) => `assets/images/offers/${n}/900/500`);

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
}

