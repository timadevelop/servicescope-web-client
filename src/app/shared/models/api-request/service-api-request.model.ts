import { UploadFile } from 'ng-zorro-antd';
import { PriceDetailsRow } from '../Service.model';

export class ServiceApiRequest {
  constructor(
    public title: string,
    public description: string,
    public price: number,
    public price_currency: string,
    public contact_phone: string,
    public contact_email: string,
    public color: string,
    public location: string, // url
    public images: Array<UploadFile>,
    public tags: Array<string>,
    public category: string,
    public  price_details: Array<PriceDetailsRow> | string,
  ) { }
}
