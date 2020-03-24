import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';
import { environment } from 'src/environments/environment';

@Injectable()
export class UniversalInterceptor implements HttpInterceptor {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let serverReq: HttpRequest<any> = req;
    if (isPlatformServer(this.platformId)) {
      // rewrite url:
      // Rewrited http://getmaker.io:9999/saas_api/config/get_configuration/ to http://tasks.wrapper/saas_api/config/get_configuration/
      const newUrl = req.url.replace(environment.PUBLIC_HOST, environment.INTERNAL_HOST);
      // console.log(`Rewrited ${req.url} to ${newUrl}`);
      serverReq = req.clone({ url: newUrl });
    } else {
      // console.log('Not rewrite');
    }
    return next.handle(serverReq);
  }
}
