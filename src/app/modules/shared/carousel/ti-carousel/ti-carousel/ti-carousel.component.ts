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
    if (index < 0 || index >= this.items.length) return;
    this.activeIndex = index;
  }

  pre() {
    this.goTo(this.activeIndex - 1);
  }

  next() {
    this.goTo(this.activeIndex + 1);
  }

}
