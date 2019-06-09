import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RegisterComponent } from './register/register.component';
import { SocialAuthButtonsComponent } from './social-auth-buttons/social-auth-buttons.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    SocialAuthButtonsComponent,
    VerifyEmailComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    NgZorroAntdModule
  ]
})
export class AuthModule { }
