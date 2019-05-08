import { Component, OnInit, OnDestroy, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-messages-detail',
  templateUrl: './messages-detail.component.html',
  styleUrls: ['./messages-detail.component.scss']
})
export class MessagesDetailComponent implements OnInit, OnDestroy, AfterViewChecked {

  messages: Array<string> = [];
  constructor(

    private chatService: ChatService,
  ) { }

  ngOnDestroy() { }

  @ViewChild('conversationMessages') private messagesContainer: ElementRef;

  ngOnInit() {
    this.chatService.messages.subscribe(msg => {
      this.messages.push(msg.message);
    });
  }

  sendMsg(msg: string) {
    this.chatService.messages.next({message: msg});
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }
}
