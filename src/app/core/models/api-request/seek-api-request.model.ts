import { UploadFile } from 'ng-zorro-antd';

export class SeekApiRequest {
  constructor(
    public title: string,
    public description: string,
    public max_price: number,
    public max_price_currency: string,
    public contact_phone: string,
    public contact_email: string,
    public location: string, // url
    public images: Array<UploadFile>,
    public tags: Array<string>,
    public category: string,
  ) { }
}
