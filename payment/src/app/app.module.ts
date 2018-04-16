import { ConfigService } from './service/config.service';
import { PaymentValidators } from './../validator/paymentValidators';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { IPaymentApiService } from './service/ipaymentApi.service';
import { PaymentApiService } from './service/paymentApi.service';
import { HttpClientModule } from '@angular/common/http';
import { BsbMaskDirective } from '../validator/bsbMask.directive';


@NgModule({
  declarations: [
    AppComponent,
    PaymentDetailsComponent,
    BsbMaskDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [PaymentValidators,
    { provide: IPaymentApiService, useClass: PaymentApiService },
  ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
