import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';

import { MessagesComponent } from './messages/messages.component';
import { MessagesListComponent } from './messages-list/messages-list.component';
import { MessagesDetailComponent } from './messages-detail/messages-detail.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MessagesComponent,
    MessagesListComponent,
    MessagesDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    MessagesRoutingModule,
  ],
  exports: [
    MessagesListComponent
  ]
})
export class MessagesModule { }