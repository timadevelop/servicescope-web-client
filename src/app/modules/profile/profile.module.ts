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
import { SharedModule } from '../shared/shared.module';
import { FeedComponent } from './feed/feed.component';
import { FeedPostComponent } from './feed/feed-post/feed-post.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileListComponent,
    ProfileDetailComponent,
    ProfileHomeComponent,
    FeedComponent,
    FeedPostComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    ProfileRoutingModule,
    ServicesModule,
    SharedModule
  ]
})
export class ProfileModule { }
