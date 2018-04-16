import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Payment } from '../model/payment.model';

export abstract class IPaymentApiService {

    public abstract submitPayment(payment: Payment):  Observable<{}>;
}
