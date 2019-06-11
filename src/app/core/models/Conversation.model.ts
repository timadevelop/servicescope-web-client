import { Base } from './Base.model';
import { User } from './User.model';

export class Conversation extends Base {
  title: string;
  last_msg: string;
  users: Array<User>;
  notifications_count: number;
  created_at: Date;
  updated_at: Date;
}
