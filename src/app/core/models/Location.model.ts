import { Base } from './Base.model';

export class District extends Base {
  oblast: string;
  // ekatte: string;
  name: string;
  // region: string;
}

export class Location extends Base {
  // ekatte: string;
  t_v_m: string;
  name: string;
  // oblast: string;
  // obstina: string;
  // kmetstvo: string;
  // kind: number;
  // category: number;
  // altitude: number;
  district: District;
}
