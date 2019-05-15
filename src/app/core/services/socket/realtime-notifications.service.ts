import { Injectable } from '@angular/core';
import { ChatService, SocketMessage } from './chat.service';
import { NzMessageService } from 'ng-zorro-antd';
import { AuthService } from 'src/app/modules/auth/auth.service';


export class RealtimeNotificationPayload {
  title: string;
  text: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class RealtimeNotificationsService {

  constructor(
    private authService: AuthService,
    private chatService: ChatService,
    private nzMessageService: NzMessageService
  ) {
  }

  public run() {
    if (this.authService.isLoggedIn) {
      this.chatService.connect().subscribe((m: SocketMessage) => {
        this.processMessage(m);
      });
    }
  }


  private processMessage(m: SocketMessage) {
    if (m.type == "notification") {
      const payload: RealtimeNotificationPayload = m.payload as RealtimeNotificationPayload;
      this.processNotificationPayload(payload);
    }
  }

  processNotificationPayload(payload: RealtimeNotificationPayload) {
    switch (payload.type) {
      case 'success':
        this.nzMessageService.success(`${payload.title}: ${payload.text}`)
        break;
      case 'error':
        this.nzMessageService.error(`${payload.title}: ${payload.text}`)
        break;
      case 'warning':
        this.nzMessageService.warning(`${payload.title}: ${payload.text}`)
        break;
      case 'info':
        this.nzMessageService.info(`${payload.title}: ${payload.text}`)
        break;
      default:
        console.warn("Unrecognized notification type, using info type by default");
        this.nzMessageService.info(`${payload.title}: ${payload.text}`)
        break;
    }
  }
}
