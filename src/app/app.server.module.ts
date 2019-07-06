import { NgModule, Injectable, Inject } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

// Import the require modules
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { en_US, NZ_I18N, NzI18nModule } from 'ng-zorro-antd/i18n';


import { Request } from 'express';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { CookieService } from './core/services/cookie.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@Injectable()
export class RequestCookies {
    constructor(@Inject(REQUEST) private request: Request) {}

    get cookies() {
        return !!this.request.headers.cookie ? this.request.headers.cookie : null;
    }
}

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    BrowserModule.withServerTransition({ appId: 'saasWebClient' }),
    ServerTransferStateModule,
    ModuleMapLoaderModule,
    HttpClientModule,
    NoopAnimationsModule,
    NzI18nModule,
    NgZorroAntdModule
  ],
  bootstrap: [AppComponent],
  providers: [

    CookieService,
    { provide: 'req', useClass: RequestCookies },
    { provide: NZ_I18N, useValue: en_US }
  ]
})
export class AppServerModule {}
