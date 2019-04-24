import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Category } from '../models/Category.models';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { PaginatedApiResponse } from '../models/api-response/paginated-api-response';
import { CustomEncoder } from './custom.encoder';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http: HttpClient,
    private messageService: NzMessageService) {
  }

  public getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${environment.apiUrl}/categories/${id}/`);
  }

  public getCategoryByName(name: string): Observable<Category> {
    return this.http.get<Category>(`${environment.apiUrl}/categories/name/${name}/`);
  }

  public getCategories(page: string, pageSize: string, query: string = null): Observable<PaginatedApiResponse<Category>> {
    let params = new HttpParams({encoder: new CustomEncoder() }).set('page', page).set('page_size', pageSize);

    if (query) {
      params = params.set('search', query);
    }

    const options =
      { params: params };

    return this.http.get<PaginatedApiResponse<Category>>(`${environment.apiUrl}/categories/`, options);
  }

  public getNextCategories(next: string): Observable<PaginatedApiResponse<Category>> {
    return this.http.get<PaginatedApiResponse<Category>>(next);
  }

  public createCategory(name: string, color: string = null): Observable<Category> {
    const category = new Category();
    category.name = name;
    category.color = color;
    return this.http.post<Category>(`${environment.apiUrl}/categories/`, category);
  }

  // Error handler
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      this.messageService.error(`An error occurred: ${error.error.message}`);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      this.messageService.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}
