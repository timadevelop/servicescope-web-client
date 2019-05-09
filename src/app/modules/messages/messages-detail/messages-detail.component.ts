import { Component, OnInit, OnDestroy, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { MessagesService } from 'src/app/modules/messages/services/messages.service';
import { PaginatedApiResponse } from 'src/app/shared/models/api-response/paginated-api-response';
import { Message } from 'src/app/shared/models/Message.model';
import { UserService } from 'src/app/shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Conversation } from 'src/app/shared/models/Conversation.model';
import { User } from 'src/app/shared/models/User.model';
import { MessageApiRequest } from 'src/app/shared/models/api-request/message-api-request.model';
import { UploadFile } from 'ng-zorro-antd';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-messages-detail',
  templateUrl: './messages-detail.component.html',
  styleUrls: ['./messages-detail.component.scss']
})
export class MessagesDetailComponent implements OnInit, OnDestroy {

  messages: PaginatedApiResponse<Message>;
  conversation: Conversation;
  partner: User;

  zoomImages = [];
  zoomImagesIdx = 1;

  constructor(
    public route: ActivatedRoute,
    public userService: UserService,
    private chatService: ChatService,
    private messagesService: MessagesService
  ) { }

  ngOnDestroy() { }

  @ViewChild('conversationMessages') private messagesContainer: ElementRef;

  setZoomImages(images: Array<any>, startIndex:number = 1) {
    this.zoomImages = images;
    this.zoomImagesIdx = startIndex;
  }
  ngOnInit() {
    this.route.data.subscribe((data: { conversation: Conversation }) => {
      this.conversation = data.conversation;
      this.partner = this.conversation.users[0];
      console.log(this.conversation)
      this.messagesService.getConversationMessages(this.conversation.id, '1', '30').subscribe(
        r => {
          this.messages = r;
          this.messages.results = this.messages.results.reverse();
          setTimeout(() => this.scrollToBottom(), 100);
        }
      );
      this.chatService.connect(this.conversation.id.toString())
        .subscribe(m => {
          console.log('got', m);
        })
    });
  }

  sendMsg(msg: string, images: Array<UploadFile> = []) {
    // this.chatService.messages.next({ message: msg });

    const message = new MessageApiRequest(
      this.conversation.url,
      msg,
      images
    );

    this.messagesService.create(message)
      .subscribe(
        (event: HttpEvent<{}>) => {
          if (event.type === HttpEventType.UploadProgress) {
            if (event.total! > 0) {
              // this.percent = (event.loaded / event.total!) * 100;
            }
          } else if (event instanceof HttpResponse) {
            // uploaded
            // this.loading = false;
            const newMessage = event.body;
            console.log('sent', newMessage);
            // const id = newService['id'];
            // this.msgService.success(`Успешно направена обява #${id}`)
            // this.router.navigate(['/services', id]);
          }
        },
        err => {
          // fail
          console.log(err);
        });

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
      if (currentMsg.is_my_message === nextMsg.is_my_message) {
        return false;
      } else {
        return true;
      }
    }
    return true;
  }

  loadMore() {
    if (this.messages && this.messages.next) {
      this.messagesService.getNext(this.messages.next)
        .subscribe(r => {
          this.appendOldMessages(r);
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
}
