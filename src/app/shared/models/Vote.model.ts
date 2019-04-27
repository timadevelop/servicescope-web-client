import { Base } from './Base.model';

export enum VoteTypes {
  UPVOTE = 'U',
  DOWNVOTE = 'D'
}

export class Vote extends Base {
  user: string;
  activity_type: VoteTypes.UPVOTE | VoteTypes.DOWNVOTE;
  date: string;
}
