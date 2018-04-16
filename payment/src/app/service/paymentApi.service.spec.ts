import { PaymentApiStubService } from './paymentApi.stub.service';
import { ConfigService, IConfig } from './config.service';
import { PaymentApiService } from './paymentApi.service';
import { Payment } from '../model/payment.model';
import { TestBed, inject, async } from '@angular/core/testing';
import { ConfigStubService } from './config.stub.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IPaymentApiService } from './ipaymentApi.service';

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [{ provide: ConfigService, useClass: ConfigStubService },
    { provide: IPaymentApiService, useClass: PaymentApiService }]
  });
});

it('expects a POST request',
  inject([HttpClient, HttpTestingController, IPaymentApiService],
    (http: HttpClient, httpMock: HttpTestingController, paymentApiService: IPaymentApiService) => {
      const payment: Payment = new Payment();
      payment.bsb = '111-222';
      payment.accountName = 'Ankita';
      payment.accountNumber = 1111111;
      payment.paymentAmount = 111.23;
      payment.referenceNumber = 2345;
      paymentApiService.submitPayment(payment).subscribe((result) => {
        expect(result).toBeDefined();
      });
      const req = httpMock.expectOne('localhost');
      expect(req).toBeDefined();
      expect(req.request.method).toEqual('POST');
      req.flush({ name: 'Test Data' });
      httpMock.verify();
    }));

