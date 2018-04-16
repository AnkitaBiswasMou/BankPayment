import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PaymentValidators } from '../validator/paymentValidators';
import { IPaymentApiService } from './service/ipaymentApi.service';
import { PaymentApiService } from './service/paymentApi.service';
import { ConfigService } from './service/config.service';
import { ConfigStubService } from './service/config.stub.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PaymentDetailsComponent
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule
      ],
      providers: [PaymentValidators,
        { provide: IPaymentApiService, useClass: PaymentApiService },
        { provide: ConfigService, useClass: ConfigStubService }]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
});
