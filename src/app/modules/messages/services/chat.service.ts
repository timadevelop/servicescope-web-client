import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from 'rxjs';
import { SocketService } from './socket.service';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/auth.service';

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

  ngOnDestroy() {
    if (this.messages) this.messages.complete();
  }

  constructor(
    private authService: AuthService,
    private wsService: SocketService) {
    if (this.authService.isLoggedIn) {
      this.connect();
    }
  }

  public connect() {
    if (this.messages) {
      return this.messages;
    }

    this.messages = <Subject<SocketMessage>>this.wsService.connect(this.getSocketUrl()).pipe(
      map((response: MessageEvent): SocketMessage => {
        let data = JSON.parse(response.data);
        return data;
      })
    );

    return this.messages;
  }

  // TODO ?
  // public getLastMessages() {

  // }

  public joinRoom(room: string) {
    this.room = room;
    this.messages.next({
      type: "join_room_request",
      payload: {
        room_name: room
      }
    });
  }


  public leaveRoom() {
    this.messages.next({
      type: "leave_room",
      payload: null
    });
    this.room = null;
  }


  public disconnect() {
    if (this.messages) this.messages.complete();
  }

  private getSocketUrl(): string {
    return `${environment.WEBSOCKET_PROTOCOL}://${environment.WEBSOCKET_URL}/global/`
  }
}
