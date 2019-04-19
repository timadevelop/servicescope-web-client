import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken: string = this.auth.authorizationToken;

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
