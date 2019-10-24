import { NgModule, Injectable, Inject } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

// Import the require modules
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { en_US, NZ_I18N, NzI18nModule } from 'ng-zorro-antd/i18n';

import { Request } from 'express';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { CookieService } from './core/services/cookie.service';

@Injectable()
export class RequestDetails {
  constructor(@Inject(REQUEST) private request: Request) { }

  get cookies() {
    return !!this.request.headers.cookie ? this.request.headers.cookie : null;
  }

  get headers() {
    return !!this.request.headers ? this.request.headers : null;
  }

}

@NgModule({
  imports: [
    AppModule,
    // use map of modules instead of lazy loading on server
    ModuleMapLoaderModule,
    ServerModule,
    ServerTransferStateModule,
    // no animations
    NoopAnimationsModule,
    // ng-zorro translations
    NzI18nModule,
  ],
  bootstrap: [AppComponent],
  providers: [

    CookieService,
    { provide: 'req', useClass: RequestDetails },
    { provide: NZ_I18N, useValue: en_US }
  ]
})
export class AppServerModule { }
