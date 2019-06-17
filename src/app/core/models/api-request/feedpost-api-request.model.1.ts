import { UploadFile } from 'ng-zorro-antd';

export class FeedPostApiRequest {
  constructor(
    public text: string,
    public images: Array<UploadFile>,
    public tags: Array<string>,
  ) { }
}
