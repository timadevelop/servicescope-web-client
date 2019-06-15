import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TargetDeviceService {
  private isMobileResolution: boolean;
  resizeObservable$;
  resizeSubscription$;
  constructor() {
    this.updateStatus();
    this.resizeObservable$ = fromEvent(window, 'resize').pipe(share())
    this.resizeSubscription$ = this.resizeObservable$.subscribe(evt => {
      this.updateStatus();
    })
  }

  private updateStatus() {
    if (window.innerWidth < 1100) { // see variables.scss
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
  }

  public get isMobile(): boolean {
    return this.isMobileResolution;
  }
}
