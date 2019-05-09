import { Component, OnInit, OnDestroy, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { PaginatedApiResponse } from 'src/app/shared/models/api-response/paginated-api-response';
import { Message } from 'src/app/shared/models/Message.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-messages-detail',
  templateUrl: './messages-detail.component.html',
  styleUrls: ['./messages-detail.component.scss']
})
export class MessagesDetailComponent implements OnInit, OnDestroy {

  messages: PaginatedApiResponse<Message>;

  constructor(

    public userService: UserService,
    private chatService: ChatService,
    private messagesService: MessagesService
  ) { }

  ngOnDestroy() { }

  @ViewChild('conversationMessages') private messagesContainer: ElementRef;

  ngOnInit() {
    this.chatService.messages.subscribe(msg => {
      // this.messages.push(msg.message);
    });

    this.messagesService.getMessages('1', '10', null).subscribe(
      r => {
        this.messages = r;
        this.messages.results = this.messages.results.reverse();
        // console.log(r.results);
        setTimeout(() => this.scrollToBottom(), 100);
      }
    )
  }

  sendMsg(msg: string) {
    this.chatService.messages.next({ message: msg });
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
      const set = new Set([ ...response.results, ...this.messages.results]);
      response.results = Array.from(set.values());
    }
    this.messages = response;
  }
}
