import { BrowserModule, ɵgetDOM, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule, TRANSLATIONS, LOCALE_ID, TRANSLATIONS_FORMAT, MissingTranslationStrategy, APP_INITIALIZER, PLATFORM_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_MESSAGE_CONFIG, NZ_NOTIFICATION_CONFIG, NzLayoutModule, NzBackTopModule, NzGridModule, NzMenuModule, NzAvatarModule, NzBadgeModule, NzCardModule, NzButtonModule, NzFormModule, NzRateModule, NzInputModule, NzIconModule, NzDrawerModule, NzDividerModule, NzListModule, NzPaginationModule, NgZorroAntdModule, NZ_I18N, en_US, NzMessageModule, NzNotificationModule, NzNotificationServiceModule, NzMessageServiceModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData, isPlatformBrowser, DOCUMENT } from '@angular/common';

import en from '@angular/common/locales/en';
import bg from '@angular/common/locales/bg';

import { AppHeaderComponent } from './app-components/app-header/app-header.component';
import { ComposeMessageComponent } from './app-components/compose-message/compose-message.component';

import { httpInterceptorProviders } from './core/interceptors';
import { CoreModule } from './core/core.module';
// import { ServicesModule } from './modules/services/services.module';
import { NotificationsManagerComponent } from './app-components/notifications-manager/notifications-manager.component';

import { I18n, MISSING_TRANSLATION_STRATEGY } from '@ngx-translate/i18n-polyfill';
import { FeedbackWidgetComponent } from './app-components/feedback-widget/feedback-widget.component';

import { CookieService } from './core/services/cookie.service';

import { TransferHttpCacheModule } from '@hapiness/ng-universal-transfer-http';

import { PrebootModule } from 'preboot';
import { RouterModule } from '@angular/router';


declare const require; // Use the require method provided by webpack
// const translations = require(`raw-loader!../locale/messages.bg.xlf`);

const DEFAULT_LOCALE = "en-US";
registerLocaleData(en); // bg

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    ComposeMessageComponent,
    NotificationsManagerComponent,
    FeedbackWidgetComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'saasWebClient' }),
    PrebootModule.withConfig({ appRoot: 'app-root' }),
    BrowserTransferStateModule,
    TransferHttpCacheModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NzLayoutModule,
    NzBackTopModule,
    NzGridModule,
    NzMenuModule,
    NzBadgeModule,
    NzCardModule,
    NzFormModule,
    NzRateModule,
    NzInputModule,
    NzIconModule,
    NzDrawerModule,
    NzDividerModule,
    NzListModule,
    NzPaginationModule,
    NzButtonModule,
    NzAvatarModule,
    NzMessageModule,
    NzNotificationModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // AuthModule,
    CoreModule.forRoot(),
    // ServicesModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: function (document: HTMLDocument, platformId: Object): Function {
        return () => {
          if (isPlatformBrowser(platformId)) {
            const dom = ɵgetDOM();
            const styles: any[] = Array.prototype.slice.apply(dom.querySelectorAll(document, `style[ng-transition]`));
            styles.forEach(el => {
              // Remove ng-transition attribute to prevent Angular appInitializerFactory
              // to remove server styles before preboot complete
              el.removeAttribute('ng-transition');
            });
            document.addEventListener('PrebootComplete', () => {
              // After preboot complete, remove the server scripts
              setTimeout(() => styles.forEach(el => dom.remove(el)));
            });
          }
        };
      },
      deps: [DOCUMENT, PLATFORM_ID],
      multi: true
    },
    CookieService,
    {
      provide: 'req',
      useValue: null
    },
    { provide: TRANSLATIONS_FORMAT, useValue: "xlf" },
    { provide: LOCALE_ID, useValue: DEFAULT_LOCALE },
    { provide: MISSING_TRANSLATION_STRATEGY, useValue: MissingTranslationStrategy.Ignore },
    {
      provide: TRANSLATIONS,
      useFactory: (locale) => {
        locale = locale || DEFAULT_LOCALE;
        if (locale == DEFAULT_LOCALE) {
          return '';
        } else if (locale == 'bg') {
          registerLocaleData(bg);
        }
        return require(`raw-loader!../locale/messages.${locale}.xlf`).default;
      },
      deps: [LOCALE_ID]
    },
    I18n,
    { provide: NZ_I18N, useValue: en_US },
    httpInterceptorProviders,
    // TODO
    // {
    //   provide: NZ_MESSAGE_CONFIG, useValue: {
    //     nzDuration: 3000,
    //     nzMaxStack: 10,
    //     nzPauseOnHover: true,
    //     nzAnimate: true
    //   }
    // },
    // {
    //   provide: NZ_NOTIFICATION_CONFIG, useValue: {
    //     nzTop: '24px',
    //     nzBottom: '24px',
    //     nzPlacement: 'topRight',
    //     nzDuration: 4500,
    //     nzMaxStack: 1,
    //     nzPauseOnHover: true,
    //     nzAnimate: true
    //   }
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
