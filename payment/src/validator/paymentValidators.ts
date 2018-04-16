import { FormControl } from '@angular/forms';

export class PaymentValidators {

  public validateBsb = ((c: FormControl) => {
    const bsbRegEx = /^[0-9]{3}-?[0-9]{3}$/;

    return bsbRegEx.test(c.value) ? null : {
      validateBsb: false
    };
  });

}
