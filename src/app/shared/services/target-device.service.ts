import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TargetDeviceService {
  private isMobileResolution: boolean;

  constructor() {
    if (window.innerWidth < 1200) { // see variables.scss
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
  }

  public get isMobile(): boolean {
    return this.isMobileResolution;
  }
}
