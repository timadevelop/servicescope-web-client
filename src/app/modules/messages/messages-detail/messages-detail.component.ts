import { Component, OnInit, OnDestroy, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';

import { MessagesService } from 'src/app/modules/messages/services/messages.service';
import { PaginatedApiResponse } from 'src/app/core/models/api-response/paginated-api-response';
import { Message } from 'src/app/core/models/Message.model';
import { UserService } from 'src/app/core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Conversation } from 'src/app/core/models/Conversation.model';
import { User } from 'src/app/core/models/User.model';
import { NzMessageService } from 'ng-zorro-antd';
import { ChatService, SocketMessage } from 'src/app/core/services/socket/chat.service';
import { Subscription, Subject } from 'rxjs';
import { TargetDeviceService } from 'src/app/core/services/target-device.service';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { Title } from '@angular/platform-browser';
import { MessageApiRequest } from 'src/app/core/models/api-request/message-api-request.model';

@Component({
  selector: 'app-messages-detail',
  templateUrl: './messages-detail.component.html',
  styleUrls: ['./messages-detail.component.scss']
})
export class MessagesDetailComponent implements OnInit, OnDestroy {

  messages: PaginatedApiResponse<Message>;
  pendingMessages: Array<MessageApiRequest> = [];
  conversation: Conversation;
  partner: User;

  zoomImages = [];
  zoomImagesIdx = 1;
  loading = true;

  private socketMessageSub$: Subscription;
  private subjectSub$: Subscription;
  @ViewChild('conversationMessages') private messagesContainer: ElementRef;

  constructor(
    public route: ActivatedRoute,
    public userService: UserService,
    private chatService: ChatService,
    private messagesService: MessagesService,
    private nzMsgService: NzMessageService,
    public tds: TargetDeviceService,
    private titleService: Title,
    private i18n: I18n
  ) { }

  ngOnDestroy() {
    if (this.socketMessageSub$) this.socketMessageSub$.unsubscribe();
    if (this.subjectSub$) this.subjectSub$.unsubscribe();
    this.chatService.leaveRoom();
  }

  setZoomImages(images: Array<any>, startIndex: number = 1) {
    this.zoomImages = images;
    this.zoomImagesIdx = startIndex;
  }

  ngOnInit() {
    this.subjectSub$ = this.chatService.onNewSubject.subscribe((sm: Subject<SocketMessage>) => {
      if (!sm) {
        // console.log('waiting in messages- detail...');
        return;
      }
      // console.log('reconnect on messages-detail');
      if (this.socketMessageSub$) this.socketMessageSub$.unsubscribe();

      this.socketMessageSub$ = sm.subscribe((m: SocketMessage) => {
        this.processSocketMessage(m);
      });

      // this.joinRoom();
    });

    this.route.data.subscribe((data: { conversation: Conversation }) => {
      // conversation changed
      this.conversation = data.conversation;

      this.chatService.leaveRoom();

      if (!this.conversation) {
        this.nzMsgService.error(`Conversation not found`);
        return;
      }

      this.loading = true;

      this.partner = this.conversation.users[0];

      if (this.partner) {
        this.titleService.setTitle(this.i18n({ value: "Conversation", id: "conversationHtmlTitle" }) + ' - ' + this.partner.first_name + ' ' + this.partner.last_name);
      } else {
        this.titleService.setTitle(this.i18n({ value: "Conversation", id: "conversationHtmlTitle" }));
      }
      this.messagesService.getConversationMessages(this.conversation.id, '1', '30').subscribe(
        r => {
          this.messages = r;
          this.messages.results = this.messages.results.reverse();
          this.loading = false;
          // TODO: Ask about this
          setTimeout(() => this.scrollToBottom(), 100);
        }
      );

      if (+this.chatService.room != this.conversation.id) {
        this.joinRoom();
      }
    });
  }

  private joinRoom() {
    this.chatService.joinRoom(String(this.conversation.id));
  }

  private processSocketMessage(m: SocketMessage) {
    if (m.type == 'new_message') {
      const msg = m.payload as Message;
      // TODO: do not send msg to author on backend
      if (msg.author_id === this.userService.currentUser.id) {
        return;
      }
      this.appendNewMessage(msg);

    } else if (m.type == 'deleted_message') {
      const msgId = m.payload;
      this.messages.results = this.messages.results.filter(m => m.id != msgId);
    } else if (m.type == 'joined_room') {
      const room: string = m.payload["room_name"];
      if (+room == this.conversation.id) {
        this.nzMsgService.success(`Success socket joined room ${room}`);
        this.chatService.markConversationAsRead(this.conversation.id);
      } else {
        this.nzMsgService.error(`Error joining room ${this.conversation.id}, connected to room ${room} instead :/`);
      }
    } else if (m.type == 'connected') {
      this.joinRoom();
    }
  }

  removeMessage(msg: Message) {
    this.messagesService.delete(msg.id).subscribe(_any => {
      this.messages.results = this.messages.results.filter(m => m.id != msg.id);
    })
  }

  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }

  isLastAuthorMessage(i: number) {
    if (this.messages.results.length > i + 1) {
      const currentMsg = this.messages.results[i];
      const nextMsg = this.messages.results[i + 1];
      if (currentMsg.author_id === nextMsg.author_id) {
        return false;
      } else {
        return true;
      }
    }
    return true;
  }

  loadMore() {
    this.loading = true;

    if (this.messages && this.messages.next) {
      this.messagesService.getNext(this.messages.next)
        .subscribe(r => {
          this.appendOldMessages(r);
          this.loading = false;
        })
    }
  }


  public trackIdentifyByItemId(index, item) {
    return item.id;
  }

  private appendOldMessages(response: PaginatedApiResponse<Message>) {
    if (this.messages) {
      response.results = response.results.reverse();
      const set = new Set([...response.results, ...this.messages.results]);
      response.results = Array.from(set.values());
    }
    this.messages = response;
  }

  public appendNewMessage(msg: Message) {
    if (this.messages) {
      this.messages.results.push(msg);
      // const set = new Set([, ...this.messages.results]);
      // response.results = Array.from(set.values());
    } else {
      this.messages = new PaginatedApiResponse<Message>();
      this.messages.results = [msg];
    }
    // TODO: Ask
    setTimeout(() => this.scrollToBottom(), 10);
  }

  onNewMessageRequest(m: MessageApiRequest): void {
    this.pendingMessages = [...this.pendingMessages, m];
    setTimeout(() => this.scrollToBottom(), 10);
  }

  onNewMessageDelivered(m: Message): void {
    this.pendingMessages = this.pendingMessages.filter(e => {
      const sameText = e.text === m.text || (e.text == null && m.text == 'null');
      const sameImagesLength = e.images.length === m.images.length;

      return !sameImagesLength && !sameText;
    });
    this.appendNewMessage(m);
  }
}
