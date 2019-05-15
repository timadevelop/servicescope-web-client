import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../../core/services/socket/socket.service';
import { UserService } from 'src/app/core/services/user.service';
import { ChatService } from 'src/app/core/services/socket/chat.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  constructor(
    public userService: UserService,
  ) {
  }

  ngOnInit() {
  }

}
