import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { SocketService } from './socket.service';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface Message {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public messages: Subject<Message>;

  constructor(private wsService: SocketService) {
  }

  public connect(room: string) {
    this.messages = <Subject<Message>>this.wsService.connect(this.getChatUrl(room)).pipe(
      map((response: MessageEvent): Message => {
        let data = JSON.parse(response.data);
        return {
          message: data.message
        };
      })
    );
    return this.messages;
  }

  // public connects(room: string) {
  //   return this.wsService.connect(this.getChatUrl(room)).pipe(
  //     tap(e => console.log(e))
  //   );
  // }

  private getChatUrl(room: string = 'room'): string {
    return `${environment.WEBSOCKET_PROTOCOL}://${environment.WEBSOCKET_URL}/c/${room}/`
  }
}
