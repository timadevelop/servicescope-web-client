import { UploadFile } from 'ng-zorro-antd';

export class MessageApiRequest {
  constructor(
    public conversation: string, // url
    public text: string,
    public images: Array<UploadFile>
  ) { }
}
