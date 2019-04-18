import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { AppHeaderComponent } from './components/app-header/app-header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EmployeesModule } from './employees/employees.module';
import { BusinessesModule } from './business-center/businesses.module';
import { ComposeMessageComponent } from './compose-message/compose-message.component';
import { AuthModule } from './auth/auth.module';

import { httpInterceptorProviders } from './interceptors';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    PageNotFoundComponent,
    ComposeMessageComponent
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
    AppRoutingModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
