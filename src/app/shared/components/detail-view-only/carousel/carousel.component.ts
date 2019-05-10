import { Component, OnInit, Input, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ServiceImage } from '../../../models/Service.model';
import { NzCarouselComponent } from 'ng-zorro-antd';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, AfterViewInit {

  @Input() images: Array<ServiceImage>;
  @Input() zoomOnly: boolean = false;
  @Input() imageIndex: number = null;

  @Output() onZoomClose = new EventEmitter<null>()

  zoomView: boolean = false;

  @ViewChild('zoomViewContainer') zoomViewContainer;
  @ViewChild('defaultViewContainer') defaultViewContainer;
  @ViewChild('carousel') carousel: NzCarouselComponent;

  constructor() { }

  ngOnInit() {
    if (this.zoomOnly) {
      this.zoomView = true;
    }
  }

  ngAfterViewInit(): void {
    this.focusOnView();
  }

  zoom(v: boolean) {
    this.zoomView = v;
    this.focusOnView();
    if (!this.zoomView) {
      this.onZoomClose.emit();
    }
  }

  // focus on zoom or default carousel view for arrow buttons control
  private focusOnView() {
    const that = this;
    setTimeout(() => {
      const container = that.zoomView ? that.zoomViewContainer : that.defaultViewContainer;

      if (!container) {
        return;
      }

      const el = container.nativeElement.getElementsByClassName("slick-list")[0];
      if (el) {
        this.setDefaultIndex();
        el.focus();
      }
    }, 10);
  }

  private setDefaultIndex() {
    if (this.imageIndex) {
      this.carousel.goTo(this.imageIndex);
    }
  }
}
