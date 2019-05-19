import { BrowserModule } from '@angular/platform-browser';
import { NgModule, TRANSLATIONS, LOCALE_ID, TRANSLATIONS_FORMAT, MissingTranslationStrategy } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US, NZ_MESSAGE_CONFIG, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { AppHeaderComponent } from './app-components/app-header/app-header.component';
import { EmployeesModule } from './modules/employees/employees.module';
import { BusinessesModule } from './modules/business-center/businesses.module';
import { ComposeMessageComponent } from './app-components/compose-message/compose-message.component';
import { AuthModule } from './modules/auth/auth.module';

import { httpInterceptorProviders } from './core/interceptors';
import { CoreModule } from './core/core.module';
import { ServicesModule } from './modules/services/services.module';
import { NotificationsManagerComponent } from './app-components/notifications-manager/notifications-manager.component';

import { I18n, MISSING_TRANSLATION_STRATEGY } from '@ngx-translate/i18n-polyfill';
import { Xliff } from '@angular/compiler';

declare const require; // Use the require method provided by webpack
// const translations = require(`raw-loader!../locale/messages.bg.xlf`);

const DEFAULT_LOCALE = "en-US";
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    ComposeMessageComponent,
    NotificationsManagerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgZorroAntdModule,
    HttpClientModule,
    BrowserAnimationsModule,
    EmployeesModule,
    BusinessesModule,
    AuthModule,
    CoreModule.forRoot(),
    ServicesModule,
    AppRoutingModule,
  ],
  providers: [
    // format of translations that you use
    { provide: TRANSLATIONS_FORMAT, useValue: "xlf" },
    // the translations that you need to load on your own
    { provide: TRANSLATIONS, useValue: Xliff },
    // locale id that you're using (default en-US)
    { provide: LOCALE_ID, useValue: DEFAULT_LOCALE },
    // optional, defines how error will be handled
    { provide: MISSING_TRANSLATION_STRATEGY, useValue: MissingTranslationStrategy.Error },
    {
      provide: TRANSLATIONS,
      useFactory: (locale) => {
        locale = locale || DEFAULT_LOCALE;
        if (locale == DEFAULT_LOCALE) return '';

        return require(`raw-loader!../locale/messages.${locale}.xlf`);
      },
      deps: [LOCALE_ID]
    },
    I18n,
    httpInterceptorProviders,
    {
      provide: NZ_MESSAGE_CONFIG, useValue: {
        nzDuration: 3000,
        nzMaxStack: 10,
        nzPauseOnHover: true,
        nzAnimate: true
      }
    },
    {
      provide: NZ_NOTIFICATION_CONFIG, useValue: {
        nzTop: '24px',
        nzBottom: '24px',
        nzPlacement: 'topRight',
        nzDuration: 4500,
        nzMaxStack: 7,
        nzPauseOnHover: true,
        nzAnimate: true
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
