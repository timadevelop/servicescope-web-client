import { Base } from './Base.model';
import { Service } from './Service.model';
import { User } from './User.model';

export class ServicePromotion extends Base {
  service: Service;
  author: User;
  end_datetime: string;
  created_at: string;
  transaction_id: string;
}
