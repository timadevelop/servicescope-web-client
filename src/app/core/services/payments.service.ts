import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { paymentIntents } from 'stripe';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {


  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) {
  }


  public createPaymentIntent(amount: number, currency: string): Observable<paymentIntents.IPaymentIntent> {
    return this.http.post<paymentIntents.IPaymentIntent>(`${environment.apiUrl}/payments/create_new_intent/`, { amount, currency })
      .pipe(
        catchError(e => this.errorHandlerService.handleError(e))
      );
  }

  public updatePaymentIntent(id: string, amount: number, currency: string): Observable<paymentIntents.IPaymentIntent> {
    return this.http.post<paymentIntents.IPaymentIntent>(`${environment.apiUrl}/payments/update_intent/`, { id, amount, currency })
      .pipe(
        catchError(e => this.errorHandlerService.handleError(e))
      );
  }
}
