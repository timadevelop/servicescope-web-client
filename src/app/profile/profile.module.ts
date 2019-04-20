import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileHomeComponent } from './profile-home/profile-home.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { LabeledTextComponent } from './profile-detail/labeled-text/labeled-text.component';
import { ProfileServicesListComponent } from './profile-detail/profile-services-list/profile-services-list.component';
import { ProfilePostsListComponent } from './profile-detail/profile-posts-list/profile-posts-list.component';
import { ProfileOffersListComponent } from './profile-detail/profile-offers-list/profile-offers-list.component';
import { ProfileReviewsListComponent } from './profile-detail/profile-reviews-list/profile-reviews-list.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileListComponent,
    ProfileDetailComponent,
    ProfileHomeComponent,
    LabeledTextComponent,
    ProfileServicesListComponent,
    ProfilePostsListComponent,
    ProfileOffersListComponent,
    ProfileReviewsListComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ProfileRoutingModule,
  ]
})
export class ProfileModule { }
