import { Base } from './Base.model';
import { User } from './User.model';
import { Url } from 'url';

export class ServiceImage extends Base {
  service: Url
  image: Url
}

export class Service extends Base {
  author: User;
  title: string;
  description: string;
  price: Number;
  price_currency: string;
  contact_phone: string;
  contact_email: string;
  color: string;
  location?: string; // TODO
  images: Array<ServiceImage>;
  promotions: Array<any>; // TODO
  is_promoted: boolean;
  created_at: Date; // TODO
  updated_at: Date;
}