import { Base } from './Base.model';
import { Conversation } from './Conversation.model';

export class Notification extends Base {
  recipient: string;
  recipient_id: number;
  conversation: Conversation | string;
  conversation_id: number;
  title: string;
  type: 'success' | 'error' | 'warning' | 'info';
  text: string;
  notification_datetime: string;
  notified: boolean;
  redirect_url: string;
}
