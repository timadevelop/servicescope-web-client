import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    // ServicesModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
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
