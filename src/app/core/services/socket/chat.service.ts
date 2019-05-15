import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from 'rxjs';
import { SocketService } from './socket.service';
import { map, tap } from 'rxjs/operators';
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
  public id = Math.random();

  ngOnDestroy() {
    if (this.messages) this.messages.complete();
  }

  constructor(
    private authService: AuthService,
    private wsService: SocketService) {
    // if (this.authService.isLoggedIn) {
    //   this.connect();
    // }
  }

  public connect() {
    console.log('connect called;', this.id);
    console.log(this);
    if (this.messages) {
      console.log('return old v')
      return this.messages;
    }

    console.log('create new');

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
