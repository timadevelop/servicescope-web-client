import { Base } from './Base.model';
import { User } from './User.model';

export class Conversation extends Base {
  title: string;
  users: Array<User>;
  created_at: Date;
  updated_at: Date;
}
