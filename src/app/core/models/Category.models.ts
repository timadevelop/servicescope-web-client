import { Base } from './Base.model';

export class Category extends Base {
  name: string;
  color: string;
  services?: Array<string>; // urls
}
