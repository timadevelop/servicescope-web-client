import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { SocketService } from '../services/socket.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  providers: [SocketService, ChatService]
})
export class MessagesComponent implements OnInit {
  constructor(
    private chatService: ChatService,
    public userService: UserService,
  ) {
  }

  ngOnInit() {
    this.chatService.messages.subscribe(msg => {
      console.log("Response from websocket: ", msg);
    });
  }

  sendMsg(msg: string) {
    console.log("new message from client to websocket: ")
    this.chatService.messages.next({message: msg});
  }
}
