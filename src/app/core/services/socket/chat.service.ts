import { Injectable, OnDestroy, OnInit, Inject, PLATFORM_ID } from "@angular/core";
import { Subject, Observable, of, BehaviorSubject, Subscription } from 'rxjs';
import { SocketService } from './socket.service';
import { map, tap, share } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

export class SocketMessage {
  type: string;
  payload: any;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnInit, OnDestroy {
  public messages: Subject<SocketMessage>;
  public room: string;
  public badges: { [id: number]: { lastMsg: String, isRead: boolean } } = {};

  private obs$: BehaviorSubject<Subject<SocketMessage>> = new BehaviorSubject(null);

  private sub$: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private wsService: SocketService) {
    if (isPlatformBrowser(this.platformId)) {
      this.connect();
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.messages) this.messages.complete();
    if (this.sub$) this.sub$.unsubscribe();
  }

  public get onNewSubject() {
    return this.obs$.asObservable().pipe(share());
  }

  private connect(): void {
    if (this.sub$) {
      return;
    }
    this.sub$ = this.wsService.onReconnect().subscribe((s: Subject<MessageEvent>) => {
      if (s === null) {
        // console.log('waiting in chat service...');
        return null;
      }

      this.messages = s.pipe(
        map((response: MessageEvent): SocketMessage => {
          let data = JSON.parse(response.data);
          return data;
        }),
        share()
      ) as Subject<SocketMessage>;

      this.obs$.next(this.messages);
      return this.messages;
    });
    this.wsService.connect()
  }

  public markConversationAsRead(conversation_id: number) {
    this.badges[conversation_id] = { ...this.badges[conversation_id], isRead: true };
  }

  public setConversationLastMessage(conversation_id: number, value: String) {
    let isRead = +this.room == conversation_id;
    this.badges[conversation_id] = { lastMsg: value, isRead: isRead };
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

}
