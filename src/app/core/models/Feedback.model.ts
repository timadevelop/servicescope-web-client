import { Base } from './Base.model';

export class Feedback extends Base {
  author: string; // current user
  rate: number;
  text: string;
  created_at: string;
}
