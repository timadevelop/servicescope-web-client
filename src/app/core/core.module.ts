import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ChatService } from './services/socket/chat.service';
import { SocketService } from './services/socket/socket.service';
import { RealtimeNotificationsService } from './services/socket/realtime-notifications.service';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { ConfigService } from './services/config.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  imports: [
    NgZorroAntdModule,
  ],
  declarations: [
    PageNotFoundComponent
  ],
  exports: [
    PageNotFoundComponent
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [SocketService, ChatService, RealtimeNotificationsService, ConfigService]
    }
  }
}
