import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDetailsComponent } from './payment-details.component';
import { BsbMaskDirective } from '../../validator/bsbMask.directive';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaymentValidators } from '../../validator/paymentValidators';
import { IPaymentApiService } from '../service/ipaymentApi.service';
import { PaymentApiService } from '../service/paymentApi.service';
import { ConfigService } from '../service/config.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigStubService } from '../service/config.stub.service';

describe('PaymentDetailsComponent', () => {
  let component: PaymentDetailsComponent;
  let fixture: ComponentFixture<PaymentDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PaymentDetailsComponent,
        BsbMaskDirective
      ],
      imports: [
        HttpClientTestingModule,
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers: [PaymentValidators,
        { provide: IPaymentApiService, useClass: PaymentApiService },
        { provide: ConfigService, useClass: ConfigStubService }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Empty Validation of All Fields', () => {
    it('Account Name field empty', () => {
      expect(component.bankAccountForm.controls['accountHolderName'].valid).toBeFalsy();
    });
    it('Account Number field empty', () => {
      expect(component.bankAccountForm.controls['accountNumber'].valid).toBeFalsy();
    });
    it('BSB field empty', () => {
      expect(component.bankAccountForm.controls['bsb'].valid).toBeFalsy();
    });
    it('Payment Amount field empty', () => {
      expect(component.bankAccountForm.controls['paymentAmount'].valid).toBeFalsy();
    });
    it('form invalid when empty', () => {
      expect(component.bankAccountForm.valid).toBeFalsy();
    });
  });

  describe('Empty Validation of All Fields When touched', () => {
    beforeEach(() => {
      const accountName = component.bankAccountForm.controls['accountHolderName'];
      const accountNumber = component.bankAccountForm.controls['accountNumber'];
      const bsb = component.bankAccountForm.controls['bsb'];
      const paymentAmount = component.bankAccountForm.controls['paymentAmount'];

      accountName.setValue('');
      accountNumber.setValue('');
      bsb.setValue('');
      paymentAmount.setValue('');
    });
    it('Account Name field empty', () => {
      expect(component.bankAccountForm.controls['accountHolderName'].valid).toBeFalsy();
    });
    it('Account Number field empty', () => {
      expect(component.bankAccountForm.controls['accountNumber'].valid).toBeFalsy();
    });
    it('BSB field empty', () => {
      expect(component.bankAccountForm.controls['bsb'].valid).toBeFalsy();
    });
    it('Payment Amount field empty', () => {
      expect(component.bankAccountForm.controls['paymentAmount'].valid).toBeFalsy();
    });
    it('form invalid when empty', () => {
      expect(component.bankAccountForm.valid).toBeFalsy();
    });
  });

  describe('Check Validation of All Fields When Invalid', () => {
    it('Account Number field invalid if any character', () => {
      const accountNumber = component.bankAccountForm.controls['accountNumber'];
      accountNumber.setValue('aevhjejh');
      expect(accountNumber.valid).toBeFalsy();
      let errors = {};
      errors = accountNumber.errors || {};
      expect(errors['pattern']).toBeTruthy();
    });
    it('BSB field invalid if any character', () => {
      const bsb = component.bankAccountForm.controls['bsb'];
      bsb.setValue('ssddd');
      expect(bsb.valid).toBeFalsy();
    });
    it('BSB field valid if there is a seperator', () => {
      const bsb = component.bankAccountForm.controls['bsb'];
      bsb.setValue('222-222');
      expect(bsb.valid).toBeTruthy();
    });
    it('Payment Amount field invalid if any character', () => {
      const paymentAmount = component.bankAccountForm.controls['paymentAmount'];
      paymentAmount.setValue('ee333eeeee');
      expect(paymentAmount.valid).toBeFalsy();
    });
    it('Payment Amount field valid if decimal', () => {
      const paymentAmount = component.bankAccountForm.controls['paymentAmount'];
      paymentAmount.setValue('222.345');
      expect(paymentAmount.valid).toBeTruthy();
    });
    it('form invalid when empty', () => {
      expect(component.bankAccountForm.valid).toBeFalsy();
    });
  });
  describe('Form is Valid When All fields are valid', () => {
    beforeEach(() => {
      const paymentAmount = component.bankAccountForm.controls['paymentAmount'];
      const accountNumber = component.bankAccountForm.controls['accountNumber'];
      const bsb = component.bankAccountForm.controls['bsb'];
      const accountName = component.bankAccountForm.controls['accountHolderName'];
      const terms = component.bankAccountForm.controls['terms'];
      accountName.setValue('Ankita');
      accountNumber.setValue('2222222');
      bsb.setValue('222-333');
      paymentAmount.setValue('345.45');
      terms.setValue(true);
    });
    it('Account Name field valid', () => {
      expect(component.bankAccountForm.controls['accountHolderName'].valid).toBeTruthy();
    });
    it('Account Number field valid', () => {
      expect(component.bankAccountForm.controls['accountNumber'].valid).toBeTruthy();
    });
    it('Bsb field valid', () => {
      expect(component.bankAccountForm.controls['bsb'].valid).toBeTruthy();
    });
    it('Payment Amount field valid', () => {
      expect(component.bankAccountForm.controls['paymentAmount'].valid).toBeTruthy();
    });
    it('form valid', () => {
      expect(component.bankAccountForm.valid).toBeTruthy();
    });
  });
});
