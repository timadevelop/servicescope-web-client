import { Injectable } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { GeoSearchResult } from '../models/GeoSearchResult';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Location } from '../models/Location.model';
import { PaginatedApiResponse } from '../models/api-response/paginated-api-response';

@Injectable({
  providedIn: 'root'
})
export class LocationService {


  constructor(
    private http: HttpClient,
    private messageService: NzMessageService) {
  }


  public searchGeo(query: string): Observable<Array<GeoSearchResult>> {
    return this.http.get<Array<GeoSearchResult>>(`${environment.apiUrl}/locations/geo/${query}/`);
  }


  public search(query: string): Observable<PaginatedApiResponse<Location>> {
    return this.http.get<PaginatedApiResponse<Location>>(`${environment.apiUrl}/locations/?search=${query}`);
  }
}
