import { Base } from './Base.model';
import { Url } from 'url';

export class User extends Base {
  email: string;
  is_verified_email: boolean;
  phone: string;
  bio: string;
  first_name: string;
  last_name: string;
  image: string; // url

  services_count: number;
  seekings_count: number;
  income_reviews_count: number;
  notifications_count: number;

  date_joined: string;
  last_active: String;//datetime
  is_online: boolean;
}
