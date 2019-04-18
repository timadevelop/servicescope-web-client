import { Base } from './Base.model';
import { UserRole } from './UserRole.model';

export class User extends Base {
  email: string;
  phone: string;
  bio: string;
  role: UserRole;
  new_appeals_count: number;
  first_name: string;
  last_name: string;
  income_appeals?: Array<any>;
}
