import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileHomeComponent } from './profile-home/profile-home.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { CoreModule } from '../../core/core.module';
import { ServicesModule } from '../services/services.module';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileListComponent,
    ProfileDetailComponent,
    ProfileHomeComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    NgZorroAntdModule,
    ProfileRoutingModule,
    ServicesModule
  ]
})
export class ProfileModule { }
