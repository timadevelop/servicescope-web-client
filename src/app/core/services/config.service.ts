import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

export class ApiClientConfig {
  API_CLIENT_ID: string;
  API_CLIENT_SECRET: string;
  STRIPE_PUBLIC_KEY: string;
  GOOGLE_CLIENT_ID: string;
  FACEBOOK_APP_ID: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _config: ApiClientConfig;

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) {
    this.getConfig().subscribe(r => this._config = r);
  }

  public currentConfig(): Observable<ApiClientConfig> {
    if (this._config) {
      return of(this._config);
    } else {
      return this.getConfig();
    }
  }

  private getConfig(): Observable<ApiClientConfig> {
    return this.http.get<ApiClientConfig>(`${environment.apiUrl}/config/get_configuration/`)
      .pipe(
        catchError(e => this.errorHandlerService.handleError(e))
      );
  }

}
