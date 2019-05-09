import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { SocketService } from './socket.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface Message {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public messages: Subject<Message>;

  constructor(wsService: SocketService) {

    this.messages = <Subject<Message>>wsService.connect(this.getChatUrl()).pipe(
      map((response: MessageEvent): Message => {
        let data = JSON.parse(response.data);
        return {
          message: data.message
        };
      })
    );
  }

  private getChatUrl(room: string = 'room'): string {
    return `${environment.WEBSOCKET_PROTOCOL}://${environment.WEBSOCKET_URL}/chat/${room}/`
  }
}
