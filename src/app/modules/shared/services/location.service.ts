import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { GeoSearchResult } from '../../../core/models/GeoSearchResult';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Location } from '../../../core/models/Location.model';
import { PaginatedApiResponse } from '../../../core/models/api-response/paginated-api-response';

@Injectable({
  providedIn: 'root'
})
export class LocationService {


  constructor(
    private http: HttpClient) {
  }

  public getById(id: number | string): Observable<Location> {
    return this.http.get<Location>(`${environment.apiUrl}/locations/${id}/`);
  }


  public searchGeo(query: string): Observable<Array<GeoSearchResult>> {
    return this.http.get<Array<GeoSearchResult>>(`${environment.apiUrl}/locations/geo/${query}/`);
  }

  public getMajorCities(): Observable<PaginatedApiResponse<Location>> {
    return this.http.get<PaginatedApiResponse<Location>>(`${environment.apiUrl}/locations/major/`);
  }

  public search(query: string): Observable<PaginatedApiResponse<Location>> {
    return this.http.get<PaginatedApiResponse<Location>>(`${environment.apiUrl}/locations/?search=${query}`);
  }

  public getNext(nextUrl: string): Observable<PaginatedApiResponse<Location>> {
    return this.http.get<PaginatedApiResponse<Location>>(nextUrl);
  }
}
