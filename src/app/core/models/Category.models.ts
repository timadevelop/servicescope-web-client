import { Base } from './Base.model';
import { Url } from 'url';

export class Category extends Base {
  name: string;
  color: string;
  services?: Array<string>; // urls
}
