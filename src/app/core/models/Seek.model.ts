import { Base } from './Base.model';
import { User } from './User.model';
import { Tag } from './Tag.models';
import { Location } from './Location.model';

export class SeekImage {
  id: number;
  url: string; // WARNING: this url is a url to serviceImageInstance!
  service: string;
  image: string;
}


export class Seek extends Base {
  author: User;
  title: string;
  description: string;
  max_price: string; // "0.00"
  max_price_currency: string;
  contact_phone: string;
  // contact_email: string;
  color: string;
  location: Location;
  images: Array<SeekImage>;
  promotions: Array<string>;
  is_promoted: boolean;
  promoted_til: Date | string;
  created_at: Date; // TODwO
  updated_at: Date;
  tags: Array<Tag>; // tag unique names
  category: string; // category unique name
  // voting
  score: number;
  current_user_vote: boolean;
}
