import { Base } from './Base.model';
import { User } from './User.model';
import { Url } from 'url';
import { Tag } from './Tag.models';
import { Location } from './Location.model';
import { Category } from './Category.models';

export class ServiceImage {
  service: Url
  image: Url
}

export class PriceDetailsRow {
  label: string;
  value: string | number;
}

export class Service extends Base {
  author: User;
  title: string;
  description: string;
  price: Number;
  price_currency: string;
  contact_phone: string;
  // contact_email: string;
  color: string;
  location: Location;
  images: Array<ServiceImage>;
  promotions: Array<string>;
  is_promoted: boolean;
  promoted_til: Date | string;
  created_at: Date; // TODwO
  updated_at: Date;
  tags: Array<Tag>; // tag unique names
  category: string; // category unique name
  price_details: Array<PriceDetailsRow> | string;
  // voting
  score: number;
  current_user_vote: boolean;
}
