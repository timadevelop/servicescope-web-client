import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenInfo } from 'src/app/modules/auth/models';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private getTokenInfo(): TokenInfo {
    const token = JSON.parse(localStorage.getItem(environment.LOCALSTORAGE_TOKEN_INFO_KEY)) as TokenInfo;
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
      newHeaders = newHeaders.set('Authorization', authToken);

    }

    const authReq = req.clone({
      headers: newHeaders
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
