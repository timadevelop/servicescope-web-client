import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { SocketService } from './socket.service';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Message } from 'src/app/shared/models/Message.model';

export class SocketMessage {
  type: string;
  payload: any;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public messages: Subject<SocketMessage>;

  constructor(private wsService: SocketService) {
  }

  public connect(room: string) {
    if (this.messages) this.disconnect();

    this.messages = <Subject<SocketMessage>>this.wsService.connect(this.getChatUrl(room)).pipe(
      map((response: MessageEvent): SocketMessage => {
        let data = JSON.parse(response.data)["message"];
        return data;
      })
    );
    return this.messages;
  }

  public disconnect() {
    if (this.messages) this.messages.complete();
  }

  private getChatUrl(room: string = 'room'): string {
    return `${environment.WEBSOCKET_PROTOCOL}://${environment.WEBSOCKET_URL}/c/${room}/`
  }
}
