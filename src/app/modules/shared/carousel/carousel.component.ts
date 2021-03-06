import { Component, OnInit, Input, ViewChild, AfterViewInit, Output, EventEmitter, ViewChildren, Inject, HostListener, PLATFORM_ID } from '@angular/core';
import { ServiceImage } from 'src/app/core/models/Service.model';
import { NzCarouselComponent } from 'ng-zorro-antd';
import { TargetDeviceService } from 'src/app/core/services/target-device.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { KEY_CODE } from 'src/app/core/keycodes';
import { TiCarouselComponent } from './ti-carousel/ti-carousel/ti-carousel.component';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, AfterViewInit {

  @Input() images: Array<ServiceImage>;
  @Input() zoomOnly: boolean = false;
  @Input() imageIndex: number = null;
  @Input() autoPlay: boolean = true;
  @Input() focusOnInit: boolean = false;
  @Input() hideButtonsOnPreview: boolean = false;

  @Output() onZoomClose = new EventEmitter<null>()

  zoomView: boolean = false;

  @ViewChild('zoomViewContainer', { static: false }) zoomViewContainer;
  @ViewChild('defaultViewContainer', { static: false }) defaultViewContainer;
  // TODO: see https://github.com/NG-ZORRO/ng-zorro-antd/issues/4292
  @ViewChildren('carousel') carousels: Array<TiCarouselComponent>;

  isBrowser: boolean;
  constructor(
    public tds: TargetDeviceService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    // always show carousel (TODO: see https://github.com/NG-ZORRO/ng-zorro-antd/issues/4292)
    this.isBrowser = true; //isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.zoomOnly) {
      this.zoomView = true;
      this.toggleBodyScroll(false);
    }
  }

  ngAfterViewInit(): void {
    if (this.focusOnInit) {
      this.focusOnView();
    }
  }

  @HostListener('document:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.focusOnInit || this.zoomView) {
      if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
        this.next();
      }

      if (event.keyCode === KEY_CODE.LEFT_ARROW) {
        this.pre();
      }

      if (event.keyCode === KEY_CODE.ESC) {
        this.zoom(false);
      }

      if (event.keyCode === KEY_CODE.F) {
        this.zoom(true);
      }
    }
  }

  private toggleBodyScroll(enable: boolean) {
    if (this.document) {
      this.document.body.style.overflow = enable ? 'unset' : 'hidden';
    }
  }

  zoom(v: boolean) {
    this.zoomView = v;
    this.focusOnView();
    if (!this.zoomView) {
      this.onZoomClose.emit();
      this.toggleBodyScroll(true);
    } else {
      this.toggleBodyScroll(false);
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

      // const el = container.nativeElement.getElementsByClassName("slick-list")[0];
      const el = container.nativeElement;
      if (el) {
        this.setDefaultIndex();
        el.focus();
      }
    }, 10);
  }

  private setDefaultIndex() {
    if (this.imageIndex) {
      this.carousels.forEach(c => c.goTo(this.imageIndex));
    }
  }

  private swipeCoord?: [number, number];
  private swipeTime?: number;

  swipe(e: TouchEvent, when: string): void {
    const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
    const time = new Date().getTime();

    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    } else if (when === 'end') {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = time - this.swipeTime;

      if (duration < 1000 //
        && Math.abs(direction[0]) > 30 // Long enough
        && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // Horizontal enough
        const swipe = direction[0] < 0 ? 'next' : 'previous';
        // Do whatever you want with swipe
        if (swipe == 'next') {
          this.next();
        } else if (swipe == 'previous') {
          this.pre();
        }
      }
    }
  }

  next() {
    this.carousels.forEach(c => c.next());
  }

  goTo(index: number) {
    this.carousels.forEach(c => c.goTo(index));
  }

  pre() {
    this.carousels.forEach(c => c.pre());
  }
}
