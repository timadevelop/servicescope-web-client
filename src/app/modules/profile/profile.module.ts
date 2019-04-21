import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileHomeComponent } from './profile-home/profile-home.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { ProfileServicesListComponent } from './profile-detail/profile-services-list/profile-services-list.component';
import { ProfilePostsListComponent } from './profile-detail/profile-posts-list/profile-posts-list.component';
import { ProfileOffersListComponent } from './profile-detail/profile-offers-list/profile-offers-list.component';
import { ProfileReviewsListComponent } from './profile-detail/profile-reviews-list/profile-reviews-list.component';
import { SharedModule } from '../../shared/shared.module';
import { ProfileAvatarUploaderComponent } from './profile-detail/profile-avatar-uploader/profile-avatar-uploader.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileListComponent,
    ProfileDetailComponent,
    ProfileHomeComponent,
    ProfileServicesListComponent,
    ProfilePostsListComponent,
    ProfileOffersListComponent,
    ProfileReviewsListComponent,
    ProfileAvatarUploaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgZorroAntdModule,
    ProfileRoutingModule,
  ]
})
export class ProfileModule { }
