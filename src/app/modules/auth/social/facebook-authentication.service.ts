import { Injectable, NgZone } from '@angular/core';
import { ConfigService, ApiClientConfig } from 'src/app/core/services/config.service';
import { HttpClient } from '@angular/common/http';
import { TokenInfo } from '../models';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
declare var FB: any;

@Injectable({
  providedIn: 'root'
})
export class FacebookAuthenticationService {

  public FB: any;
  public tokenInfo$: BehaviorSubject<TokenInfo> = new BehaviorSubject<TokenInfo>(null);
  public isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private configService: ConfigService, private zone: NgZone, private http: HttpClient) { }

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
    FB.login((response) => {
      console.log('submitLogin', response);
      if (response.authResponse) {
        //login success
        // console.log(response.authResponse.accessToken);
        that.convertToken(response.authResponse.accessToken).subscribe((tokenInfo: TokenInfo) => {
          that.zone.run(() => {
            that.tokenInfo$.next(tokenInfo);
            that.isLoggedIn$.next(true);
          });
        },
          (err) => {
            console.error(err);
          });
      }
      else {
        console.log('User login failed');
      }
    });

    // this.auth2.signIn().then((user: gapi.auth2.GoogleUser) => {
    //   // TODO: access_token
    //   this.convertToken(user['Zi'].access_token).subscribe((tokenInfo: TokenInfo) => {
    //     this.zone.run(() => {
    //       this.tokenInfo$.next(tokenInfo);
    //       this.isLoggedIn$.next(true);
    //     });
    //   },
    //     (err) => {
    //       console.error(err);
    //     });
    // });
  };

  signOut(): void {
    // this.auth2.signOut().then(() => {
    //   this.zone.run(() => {
    //     this.isLoggedIn$.next(false);
    //     this.tokenInfo$.next(null);
    //   });
    // },
    //   (err) => {
    //     console.error(err);
    //   });
  }

  loadAuth2(): void {
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
      // gapi.load('auth2', () => {
      //   gapi.auth2.init({
      //     client_id: client_id,
      //     fetch_basic_profile: true
      //   }).then((auth) => {
      //     this.zone.run(() => {
      //       this.auth2 = auth;
      //       this.isLoaded$.next(true);
      //     });
      //   },
      //   );
      // });
    });
  }
}
