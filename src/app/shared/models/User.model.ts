import { Base } from './Base.model';
import { Url } from 'url';

export class User extends Base {
  email: string;
  phone: string;
  bio: string;
  first_name: string;
  last_name: string;
  image: Url;

  services_count: number;
  posts_count: number;
  income_reviews_count: number;
  offers_count: number;

  date_joined: string;
}
