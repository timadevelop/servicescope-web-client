import { Base } from './Base.model';
import { User } from './User.model';
import { Conversation } from './Conversation.model';

export class MessageImage extends Base {
  message: string;
  image: string; // url
}

export class Message extends Base {
  author: User;
  conversation: string | Conversation;
  text: string;
  // is_my_message: boolean;
  images: Array<MessageImage>;
  created_at: Date;
  updated_at: Date;
}
