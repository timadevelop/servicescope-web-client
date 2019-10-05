import { NgModule } from '@angular/core';
import { ChatService } from './services/socket/chat.service';
import { SocketService } from './services/socket/socket.service';
import { RealtimeNotificationsService } from './services/socket/realtime-notifications.service';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { ConfigService } from './services/config.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SeoService } from './services/seo.service';
import { LinkifyPipe } from './pipes/linkify.pipe';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    NzGridModule,
  ],
  declarations: [
    PageNotFoundComponent,
    LinkifyPipe
  ],
  exports: [
    PageNotFoundComponent,
    LinkifyPipe
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [SocketService, ChatService, RealtimeNotificationsService, ConfigService, SeoService]
    }
  }
}
