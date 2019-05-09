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
    public userService: UserService,
  ) {
  }

  ngOnInit() {
  }

}
