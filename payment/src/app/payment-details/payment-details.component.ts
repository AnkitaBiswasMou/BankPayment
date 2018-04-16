import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaymentValidators } from '../../validator/paymentValidators';
import { IPaymentApiService } from '../service/ipaymentApi.service';
import { Payment } from '../model/payment.model';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {
  public bankAccountForm: FormGroup;
  public success: boolean;
  public isCallDone: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private _validators: PaymentValidators,
    private _apiService: IPaymentApiService) { }

  ngOnInit() {
    this.bankAccountForm = this.formBuilder.group({
      accountHolderName: ['', Validators.required],
      bsb: ['', [Validators.required, this._validators.validateBsb]],
      accountNumber: ['', Validators.required],
      paymentAmount: ['', Validators.required],
      terms: [null, [Validators.required, Validators.pattern('true')]]
    });
  }
  public saveBankAccount() {
    if (this.bankAccountForm.valid) {
      const referenceNumber = Math.floor(Math.random() * 100) + 1;
      const payment = new Payment();
      payment.bsb = this.bankAccountForm.get('bsb').value;
      payment.accountNumber = this.bankAccountForm.get('accountNumber').value;
      payment.accountName = this.bankAccountForm.get('accountHolderName').value;
      payment.referenceNumber = referenceNumber;
      payment.paymentAmount = this.bankAccountForm.get('paymentAmount').value;

      this._apiService.submitPayment(payment).subscribe((result) => {
        this.success = true;
        this.isCallDone = true;
      },
        (err) => { this.success = false; this.isCallDone = true; }
      );

    } else {
      this.bankAccountForm.get('accountHolderName').markAsTouched();
      this.bankAccountForm.get('bsb').markAsTouched();
      this.bankAccountForm.get('terms').markAsTouched();
      this.bankAccountForm.get('accountNumber').markAsTouched();
      this.bankAccountForm.get('paymentAmount').markAsTouched();
    }
  }
}
