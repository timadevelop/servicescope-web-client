import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';

import { MessagesComponent } from './messages/messages.component';
import { MessagesListComponent } from './messages-list/messages-list.component';
import { MessagesDetailComponent } from './messages-detail/messages-detail.component';

import { CoreModule } from '../../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewMessageFormComponent } from './messages-detail/new-message-form/new-message-form.component';
import { NzGridModule, NzAvatarModule, NzIconModule, NzCardModule, NzBadgeModule, NzSpinModule, NzListModule, NzInputModule, NzSkeletonModule, NzEmptyModule, NzPopoverModule, NzToolTipModule, NzButtonModule } from 'ng-zorro-antd';
import { CarouselModule } from '../shared/carousel/carousel.module';
import { ImagesSelectorModule } from '../shared/images-selector/images-selector.module';

@NgModule({
  declarations: [
    MessagesComponent,
    MessagesListComponent,
    NewMessageFormComponent,
    MessagesDetailComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    MessagesRoutingModule,
    CarouselModule,
    ImagesSelectorModule,
    //
    NzToolTipModule,
    NzButtonModule,
    NzGridModule,
    NzAvatarModule,
    NzIconModule,
    NzCardModule,
    NzBadgeModule,
    NzIconModule,
    NzSpinModule,
    NzListModule,
    NzInputModule,
    NzSkeletonModule,
    NzEmptyModule,
    NzPopoverModule,
  ],
  exports: [
    MessagesListComponent
  ]
})
export class MessagesModule { }
