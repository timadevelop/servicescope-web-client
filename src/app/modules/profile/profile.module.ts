import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';

import { CoreModule } from '../../core/core.module';
import { ServicesModule } from '../services/services.module';
import { FeedComponent } from './feed/feed.component';
import { FeedPostComponent } from './feed/feed-post/feed-post.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FooterModule } from '../shared/footer/footer.module';
import { NzListModule, NzDividerModule, NzPaginationModule, NzCardModule, NzAvatarModule, NzDropDownModule, NzTagModule, NzFormModule, NzToolTipModule, NzInputModule, NzPageHeaderModule, NzTabsModule, NzGridModule, NzBreadCrumbModule, NzBadgeModule, NzIconModule } from 'ng-zorro-antd';
import { VotesModule } from '../shared/votes/votes.module';
import { CarouselModule } from '../shared/carousel/carousel.module';
import { ShareWidgetModule } from '../shared/share-widget/share-widget.module';
import { ImagesSelectorModule } from '../shared/images-selector/images-selector.module';
import { TagsSelectorModule } from '../shared/tags-selector/tags-selector.module';
import { LabeledTextModule } from '../shared/labeled-text/labeled-text.module';
import { ProfileAvatarUploaderModule } from '../shared/profile-avatar-uploader/profile-avatar-uploader.module';
import { EmailWrapperModule } from '../shared/email-wrapper/email-wrapper.module';
import { PhoneWrapperModule } from '../shared/phone-wrapper/phone-wrapper.module';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileListComponent,
    ProfileDetailComponent,
    FeedComponent,
    FeedPostComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    ServicesModule,

    //
    NzGridModule,
    NzListModule,
    NzDividerModule,
    NzCardModule,
    NzIconModule,
    NzAvatarModule,
    NzDropDownModule,
    NzPaginationModule,
    NzTagModule,
    NzFormModule,
    NzInputModule,
    NzToolTipModule,
    NzPageHeaderModule,
    NzTabsModule,
    NzBreadCrumbModule,
    NzBadgeModule,
    //
    FooterModule,
    VotesModule,
    CarouselModule,
    ShareWidgetModule,
    ImagesSelectorModule,
    TagsSelectorModule,
    LabeledTextModule,
    ProfileAvatarUploaderModule,
    EmailWrapperModule,
    PhoneWrapperModule

  ]
})
export class ProfileModule { }
