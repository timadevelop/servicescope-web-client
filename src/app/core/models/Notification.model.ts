import { Base } from './Base.model';

export class Notification extends Base {
  recipient: string;
  recipient_id: number;
  title: string;
  type: 'success' | 'error' | 'warning' | 'info';
  text: string;
  notification_datetime: string;
  notified: boolean;
  redirect_url: string;
}
