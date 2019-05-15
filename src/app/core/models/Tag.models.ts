import { Base } from './Base.model';
import { Url } from 'url';

export class Tag extends Base {
  name: string;
  color: string;
  services: Array<Url>

}
