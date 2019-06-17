import { Base } from './Base.model';
import { User } from './User.model';
import { Url } from 'url';
import { Tag } from './Tag.models';
import { Location } from './Location.model';
import { Category } from './Category.models';

export class FeedPostImage {
  feed_post: Url
  image: Url
}

export class FeedPost extends Base {
  author: User;
  text: string;
  images: Array<FeedPostImage>;
  created_at: Date; // TODwO
  updated_at: Date;
  tags: Array<Tag>; // tag unique names
  // voting
  score: number;
  current_user_vote: boolean;
}
