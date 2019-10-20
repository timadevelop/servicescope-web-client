import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  private cookieStore = {};

  constructor(
    @Inject('req') private readonly req: any,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (this.req !== null) {
      this.parseCookies(this.req.cookies);
    } else {
      this.parseCookies(document.cookie);
    }
  }

  public parseCookies(cookies) {
    this.cookieStore = {};

    if (!!cookies === false) { return; }
    let cookiesArr = cookies.split(';');
    for (const cookie of cookiesArr) {
      const cookieArr = cookie.split('=');
      this.cookieStore[cookieArr[0].trim()] = cookieArr[1];
    }
  }

  get(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      return this.getBrowserCookie(key);
    }
    return this.getCookie(key);
  }

  getCookie(key: string): string {
    const cookie = !!this.cookieStore[key] ? this.cookieStore[key] : null;
    return cookie;
  }

  getBrowserCookie(key: string): string {
    if (!this.cookieStore) {
      const decodedCookie: string = decodeURIComponent(document.cookie);
      this.parseCookies(decodedCookie);
    }
    return this.getCookie(key);
  }

  set(key: string, value: string): void;
  set(key: string, value: string, expires: Date): void;
  set(key: string, value: string, expires?: Date): void {
    if (isPlatformBrowser(this.platformId)) {
      let cookieValue = `${key}=${value}`;
      if (expires) cookieValue += `;expires='${expires.toUTCString()}'`
      cookieValue += `;path=/`;
      document.cookie = cookieValue;
      // update current value
      this.cookieStore[key.trim()] = value;
      // this.parseCookies(document.cookie);
    }
  }

  setWithExpiryInYears(key: string, value: string, expires: number) {
    this.setWithExpiryInDays(key, value, expires * 365);
  }

  setWithExpiryInDays(key: string, value: string, expires: number) {
    this.setWithExpiryInHours(key, value, expires * 24);
  }

  setWithExpiryInHours(key: string, value: string, expires: number) {
    this.setWithExpiryInMinutes(key, value, expires * 60);
  }

  setWithExpiryInMinutes(key: string, value: string, expires: number) {
    this.setWithExpiryInSeconds(key, value, expires * 60);
  }

  setWithExpiryInSeconds(key: string, value: string, expires: number) {
    this.setWithExpiryInMiliseconds(key, value, expires * 1000);
  }

  setWithExpiryInMiliseconds(key: string, value: string, expires: number) {
    var expireDate = new Date();
    var time = expireDate.getTime() + expires;
    expireDate.setTime(time);

    this.set(key, value, expireDate);
  }

  removeItem(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      const now = new Date();
      this.set(key, '', now);
    }
  }

}
