import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { fromEvent } from 'rxjs';
import { share } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TargetDeviceService {
  private isMobileResolution: boolean;
  resizeObservable$;
  resizeSubscription$;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (!isPlatformBrowser(this.platformId)) {
      this.isMobileResolution = false;
      return;
    }
    this.updateStatus();
    this.resizeObservable$ = fromEvent(window, 'resize').pipe(share())
    this.resizeSubscription$ = this.resizeObservable$.subscribe(evt => {
      this.updateStatus();
    })
  }

  private updateStatus() {
    if (isPlatformBrowser(this.platformId) && window && window.innerWidth < 1100) { // see variables.scss
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
  }

  public get isMobile(): boolean {
    return this.isMobileResolution;
  }
}
