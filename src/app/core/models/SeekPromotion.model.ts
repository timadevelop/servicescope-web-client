import { Base } from './Base.model';
import { Seek } from './Seek.model';
import { User } from './User.model';

export class SeekPromotion extends Base {
  seek: Seek;
  author: string;
  end_datetime: string;
  created_at: string;
  transaction_id: string;
  stripe_payment_intents: Array<String>;
}
