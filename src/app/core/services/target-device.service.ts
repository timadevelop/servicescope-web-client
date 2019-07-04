import { Injectable, Inject } from '@angular/core';
import { fromEvent } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TargetDeviceService {
  private isMobileResolution: boolean;
  resizeObservable$;
  resizeSubscription$;
  constructor(@Inject('isBrowser') private isBrowser: boolean) {
    console.log('this.isBrowser', this.isBrowser);
    if (!this.isBrowser) {
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
    if (this.isBrowser && window && window.innerWidth < 1100) { // see variables.scss
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
  }

  public get isMobile(): boolean {
    return this.isMobileResolution;
  }
}
