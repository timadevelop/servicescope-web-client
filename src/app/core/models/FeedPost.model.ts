import { Base } from './Base.model';
import { User } from './User.model';
import { Tag } from './Tag.models';

export class FeedPostImage {
  id: number;
  url: string; // WARNING: this url is a url to feedpostImageInstance!
  feed_post: string; // url
  image: string; // url
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
