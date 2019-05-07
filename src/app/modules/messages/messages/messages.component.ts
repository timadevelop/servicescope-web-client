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
      console.log("Response from websocket: " + msg);
    });

  }

  private message = {
    author: "tutorialedge",
    message: "this is a test message"
  };

  sendMsg() {
    console.log("new message from client to websocket: ")
    console.log(this.message);
    this.chatService.messages.next(this.message);
    this.message.message = "";
  }
}
