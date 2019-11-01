import { Injectable } from '@angular/core';
import { Category } from '../models/Category.models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedApiResponse } from '../models/api-response/paginated-api-response';
import { CustomEncoder } from './custom.encoder';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http: HttpClient) {
  }

  @Cacheable()
  public getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${environment.apiUrl}/categories/${id}/`);
  }

  @Cacheable()
  public getCategoryByName(name: string): Observable<Category> {
    return this.http.get<Category>(`${environment.apiUrl}/categories/name/${name}/`);
  }

  @Cacheable({
    maxAge: 100 * 1000
  })
  public getCategories(page: string, pageSize: string, query: string = null): Observable<PaginatedApiResponse<Category>> {
    let params = new HttpParams({encoder: new CustomEncoder() }).set('page', page).set('page_size', pageSize);

    if (query) {
      params = params.set('search', query);
    }

    const options =
      { params: params };

    return this.http.get<PaginatedApiResponse<Category>>(`${environment.apiUrl}/categories/`, options);
  }

  @Cacheable({
    maxAge: 100 * 1000
  })
  public getNextCategories(next: string): Observable<PaginatedApiResponse<Category>> {
    return this.http.get<PaginatedApiResponse<Category>>(next);
  }

  public createCategory(name: string, color: string = null): Observable<Category> {
    const category = new Category();
    category.name = name;
    category.color = color;
    return this.http.post<Category>(`${environment.apiUrl}/categories/`, category);
  }

}
