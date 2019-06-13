import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';

import { MessagesComponent } from './messages/messages.component';
import { MessagesListComponent } from './messages-list/messages-list.component';
import { MessagesDetailComponent } from './messages-detail/messages-detail.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { CoreModule } from '../../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewMessageFormComponent } from './messages-detail/new-message-form/new-message-form.component';
import { SharedModule } from '../shared/shared.module';

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
    NgZorroAntdModule,
    MessagesRoutingModule,
    SharedModule
  ],
  exports: [
    MessagesListComponent
  ]
})
export class MessagesModule { }
