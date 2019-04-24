import { Injectable } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { GeoSearchResult } from '../models/GeoSearchResult';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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

}
