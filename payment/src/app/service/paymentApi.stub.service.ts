import { Payment } from './../model/payment.model';
import { Injectable } from '@angular/core';
import { IPaymentApiService } from './ipaymentApi.service';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from './config.service';
import { catchError, retry } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable()
export class PaymentApiStubService implements IPaymentApiService {
    private baseUrl: string;
    constructor(
        private _http: HttpClient,
        private _configService: ConfigService
    ) {
    }
    public submitPayment(payment: Payment): Observable<{}> {
        throw new Error('Method not implemented.');
    }
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        return new ErrorObservable(
            'Something bad happened; please try again later.');
    }
}
