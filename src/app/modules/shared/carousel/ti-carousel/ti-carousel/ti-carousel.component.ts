import { Component, ContentChildren, QueryList, Directive } from '@angular/core';
import { CarouselItemDirective } from './ti-carousel-item.directive';

@Directive({
  selector: '.carousel-item'
})
export class CarouselItemElement {
}


@Component({
  selector: 'ti-carousel',
  templateUrl: './ti-carousel.component.html',
  styleUrls: ['./ti-carousel.component.scss']
})
export class TiCarouselComponent {
  @ContentChildren(CarouselItemDirective) items: QueryList<CarouselItemDirective> = new QueryList<CarouselItemDirective>();
  public activeIndex = 0;

  goTo(index) {
    if (this.items.length <= 1) {
      return;
    }

    if (index < 0) {
      // go to the last slide
      this.activeIndex = this.items.length - 1;
    } else if (index >= this.items.length) {
      // go to the first slide
      this.activeIndex = 0;
    } else {
      // go to i-th slide ( 0 <= i <= this.items.length )
      this.activeIndex = index;
    }
  }

  pre() {
    this.goTo(this.activeIndex - 1);
  }

  next() {
    this.goTo(this.activeIndex + 1);
  }

}
