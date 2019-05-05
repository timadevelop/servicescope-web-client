import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ServiceImage } from '../../../models/Service.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, AfterViewInit {

  @Input() images: Array<ServiceImage>;
  zoomView: boolean = false;

  @ViewChild('zoomViewContainer') zoomViewContainer;
  @ViewChild('defaultViewContainer') defaultViewContainer;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.focusOnView();
  }

  zoom(v: boolean) {
    this.zoomView = v;
    this.focusOnView();
  }

  // focus on zoom or default carousel view for arrow buttons control
  focusOnView() {
    const that = this;
    setTimeout(() => {
      const container = that.zoomView ? that.zoomViewContainer : that.defaultViewContainer;

      if (!container) {
        return;
      }

      const el = container.nativeElement.getElementsByClassName("slick-list")[0];
      if (el) {
        el.focus();
      }
    }, 10);
  }

}
