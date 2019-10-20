import { Injectable, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { ConfigService, ApiClientConfig } from 'src/app/core/services/config.service';
import { HttpClient } from '@angular/common/http';
import { TokenInfo } from '../models';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
declare var FB: any;

@Injectable({
  providedIn: 'root'
})
export class FacebookAuthenticationService {

  public FB: any;
  public tokenInfo$: BehaviorSubject<TokenInfo> = new BehaviorSubject<TokenInfo>(null);
  public isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  _loading = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private configService: ConfigService,
    private zone: NgZone,
    private router: Router,
    private http: HttpClient) { }

  /**
   * get loading
   */
  public get loading() {
    return this._loading;
  }

  convertToken(token: string): Observable<TokenInfo> {
    if (!token) {
      return of(null);
    }
    let req = {
      grant_type: 'convert_token',
      backend: 'facebook',
      token: token,
      client_id: null,
      client_secret: null
    };
    return this.configService.currentConfig().pipe(
      switchMap((c: ApiClientConfig) => {
        req.client_id = c.API_CLIENT_ID;
        req.client_secret = c.API_CLIENT_SECRET;
        return this.http.post<TokenInfo>(`${environment.apiUrl}/auth/convert-token/`, req);
      }));
  }

  signIn(): void {
    const that = this;
    this._loading = true;

    FB.login((response) => {
      console.log('submitLogin', response);
      if (response.authResponse) {
        //login success
        // console.log(response.authResponse.accessToken);
        that.convertToken(response.authResponse.accessToken).subscribe((tokenInfo: TokenInfo) => {
          that.zone.run(() => {
            that.tokenInfo$.next(tokenInfo);
            that._loading = false;
            that.isLoggedIn$.next(true);
            this.router.navigate(['/']);
          });
        },
          (err) => {
            that._loading = false;
            console.error(err);
          });
      }
      else {
        that._loading = false;
        console.log('User login failed');
      }
    }, { scope: 'public_profile,email' });
  };

  // TODO: API Cares About that?
  // signOut(): void {
  //   // TODO
  // }

  loadAuth2(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const that = this;
    this.configService.currentConfig().subscribe(c => {
      const appId = c.FACEBOOK_APP_ID;
      console.log('appid: ', appId);
      if (!appId) {
        console.warn("Facebook APP ID is undefined. Contact administrator.");
        return;
      }
      (window as any).fbAsyncInit = function () {
        FB.init({
          appId: appId,
          cookie: true,
          xfbml: true,
          version: 'v3.3'
        });
        // FB.AppEvents.logPageView();

        console.log('init')
        that.zone.run(() => {
          that.FB = (window as any).FB;
          that.isLoaded$.next(true);
        });
      };

      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    });
  }
}
