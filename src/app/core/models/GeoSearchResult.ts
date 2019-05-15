export class GeoSearchResult {
  address: string;
  class_description: string;
  code: string;
  country: string;
  country_code: string;
  description: string;
  feature_class: string;
  geonames_id: number;
  lat: string;
  lng: string;
  ok: boolean;
  population: number;
  raw: {
    adminCode1: string,
    lng: string,
    geonameId: number,
    toponymName: string,
    countryId: string,
    fcl: string,
    population: number,
    countryCode: string,
    name: string,
    fclName: string;
    adminCodes1: {
      ISO3166_2: string
    },
    countryName: string,
    fcodeName: string,
    adminName1: string,
    lat: string,
    fcode: string
  };
  state: string;
  state_code: string;
  status: string
}
