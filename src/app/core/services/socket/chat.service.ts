import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from 'rxjs';
import { SocketService } from './socket.service';
import { map, tap, share } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/modules/auth/auth.service';

export class SocketMessage {
  type: string;
  payload: any;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnDestroy {
  public messages: Subject<SocketMessage>;
  public room: string;
  public badges: { [id: number]: boolean | string } = {};

  ngOnDestroy() {
    if (this.messages) this.messages.complete();
  }

  constructor(
    private wsService: SocketService) {
  }

  public connect() {
    if (this.messages) {
      return this.messages;
    }
    this.messages = <Subject<SocketMessage>>this.wsService.connect(this.getSocketUrl()).pipe(
      map((response: MessageEvent): SocketMessage => {
        let data = JSON.parse(response.data);
        return data;
      }),
      share()
    );

    return this.messages;
  }

  public setConversationBadge(conversation_id: number, value: string) {
    this.badges[conversation_id] = value;
  }
  // TODO ?
  // public getLastMessages() {

  // }

  public joinRoom(room: string) {
    this.room = room;
    if (this.messages) {
      this.messages.next({
        type: "join_room_request",
        payload: {
          room_name: room
        }
      });
    } else {
      console.warn("Cannot connect to room, Subject is null")
    }
  }


  public leaveRoom() {
    if (this.messages && this.room) {
      this.messages.next({
        type: "leave_room",
        payload: null
      });
      this.room = null;
    }
  }


  public disconnect() {
    if (this.messages) this.messages.complete();
  }

  private getSocketUrl(): string {
    return `${environment.WEBSOCKET_PROTOCOL}://${environment.WEBSOCKET_URL}/global/`
  }
}
