import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TargetDeviceService } from 'src/app/core/services/target-device.service';
import { UserService } from 'src/app/core/services/user.service';
import { PaginatedApiResponse } from 'src/app/core/models/api-response/paginated-api-response';
import { Conversation } from 'src/app/core/models/Conversation.model';
import { ConversationsService } from '../services/conversations.service';
import { ChatService } from 'src/app/core/services/socket/chat.service';
import { User } from 'src/app/core/models/User.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss']
})
export class MessagesListComponent implements OnInit {

  conversations: PaginatedApiResponse<Conversation>;
  loading = false;
  page = 1;
  pageSize = 20;

  constructor(
    public route: ActivatedRoute,
    public tds: TargetDeviceService,
    public userService: UserService,
    public conversationsService: ConversationsService,
    private router: Router,
    public chatService: ChatService) { }

  ngOnInit(): void {
    this.loading = true;
    this.conversationsService.getConversations(String(this.page), String(this.pageSize))
      .subscribe(r => {
        this.loading = false;
        const feedbackConversations = r.results.filter(c => this.isFeedbackConversation(c));
        if (feedbackConversations.length > 0) {
          const feedbackConversation = feedbackConversations[0];
          r.results = r.results.filter(c => c.id != feedbackConversation.id);
          r.results.unshift(feedbackConversation);
        } else {
          r.results.unshift(this.getFeedbackConversation());
        }
        this.conversations = r;
      });
  }

  isFeedbackConversation(conversation: Conversation): boolean {
    return conversation.users.filter(u => u.id == environment.FEEDBACK_USER_ID).length > 0;
  }

  getFeedbackConversation() {
    const conv = new Conversation();
    const user = new User();
    user.id = environment.FEEDBACK_USER_ID;
    user.first_name = 'Feedback';
    user.last_name = 'Service';
    conv.users = [user];
    conv.id = 0;
    conv.last_msg = 'Any problems?'
    conv.notifications_count = 0;
    return conv;
  }

  getRouterLink(conversation: Conversation) {
    if (this.isFeedbackConversation(conversation)) {
      return ['/', 'messages', 'user', environment.FEEDBACK_USER_ID];
    } else {
      return ['/', 'messages', 'c', conversation.id];
    }
  }

  isRead(conversation: Conversation) {
    const badge = this.chatService.badges[conversation.id];
    if (badge) {
      return badge.isRead;
    }
    return conversation.notifications_count < 1;
  }

  loadMoreConversations() {
    if (this.conversations && this.conversations.next) {

      this.loading = true;
      this.conversationsService.getNext(this.conversations.next).subscribe(r => {
        r.results = [...this.conversations.results, ...r.results];
        this.conversations = r;
        this.loading = false;
      });
    }
  }

  search(q: string) {

    this.loading = true;
    this.conversationsService.getConversations(String(this.page), String(this.pageSize), q)
      .subscribe(r => {
        this.loading = false;
        this.conversations = r;
      });
  }
}
