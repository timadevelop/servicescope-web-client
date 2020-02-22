import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { SocialAuthButtonsComponent } from './social-auth-buttons/social-auth-buttons.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { CoreModule } from 'src/app/core/core.module';
import { NzFormModule, NzInputModule, NzGridModule, NzIconModule, NzDividerModule, NzSpinModule, NzButtonModule, NzAvatarModule, NzCardModule } from 'ng-zorro-antd';
import { LabeledTextModule } from '../shared/labeled-text/labeled-text.module';
import { RestoreComponent } from './restore/restore.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    SocialAuthButtonsComponent,
    VerifyEmailComponent,
    RestoreComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,

    NzFormModule,
    NzInputModule,
    NzGridModule,
    NzIconModule,
    NzDividerModule,
    NzSpinModule,
    NzButtonModule,
    NzAvatarModule,
    NzCardModule,
    LabeledTextModule

  ]
})
export class AuthModule { }
