import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { TokenInfo } from 'src/app/modules/auth/models';
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { CookieService } from '../services/cookie.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cookieService: CookieService
  ) { }

  private getTokenInfo(): TokenInfo {
    // if (!isPlatformBrowser(this.platformId)) {
    //   return null;
    // }
    const cookie = this.cookieService.get(environment.LOCALSTORAGE_TOKEN_INFO_KEY);
    console.log('interceptor cookie: ', cookie);
    if (!cookie) {
      return null;
    }
    const token = JSON.parse(cookie) as TokenInfo;
    return token;
  }
  public getAuthorizationToken(): string {
    const tokenInfo = this.getTokenInfo();
    return tokenInfo ? `${tokenInfo.token_type} ${tokenInfo.access_token}` : null;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken: string = this.getAuthorizationToken();

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    let newHeaders = req.headers;
    if (authToken) {
      console.log('add authtoken: ', authToken);
      newHeaders = newHeaders.set('Authorization', authToken);

    }

    const authReq = req.clone({
      headers: newHeaders
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
