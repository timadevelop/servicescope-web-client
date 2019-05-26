import { Base } from './Base.model';
import { User } from './User.model';
import { Url } from 'url';
import { Tag } from './Tag.models';
import { Location } from './Location.model';
import { Category } from './Category.models';
import { ServicePromotion } from './ServicePromotion.model';

export class ServiceImage extends Base {
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
  created_at: Date; // TODO
  updated_at: Date;
  tags: Array<Tag>;
  category: Category;
  price_details: Array<PriceDetailsRow> | string;
  // voting
  score: number;
  current_user_vote: boolean;
}
