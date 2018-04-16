import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appBsbMask]'
})
export class BsbMaskDirective {

  constructor() { }
  @HostListener('keypress', ['$event']) public onKeypress(event) {
    const charCode = (typeof event.which === 'undefined') ? event.keyCode : event.which;
    const charStr = String.fromCharCode(charCode);

    if (!/\d/.test(charStr)) {
        return false;
    }
    return true;
}

@HostListener('paste', ['$event']) public onPaste(event) {
    let pastedData = event.clipboardData.getData('text');
    const patt = /^[\d-]+$/g;

    if (!patt.test(pastedData)) {
        pastedData = '';
    } else {

        if (event.target.value &&
            event.target.value.length > 0) {
            if (event.target.selectionStart === event.target.value.length) {
                pastedData = event.target.value + pastedData;
            } else {
                const currentValue = event.target.value;
                pastedData = currentValue.substring(
                  0, event.target.selectionStart) + pastedData + currentValue.slice(event.target.selectionEnd);
            }
        }

        pastedData = pastedData.replace(/[^0-9]/gi, '');

        // if text is greater than 3 then add a dash after 3 characters
        if (pastedData.length > 3) {
            pastedData = pastedData.slice(0, 3) + '-' + pastedData.slice(3);
        }

        if (event.target.maxLength && event.target.maxLength > 0) {
            if (pastedData.length >= event.target.maxLength) {
                pastedData = pastedData.substring(0, event.target.maxLength);
            }
        }
    }
    setTimeout(() => {
        event.target.value = pastedData;
    }, 0);
}

@HostListener('keyup', ['$event']) public onKeyup(event) {
    const charCode = (typeof event.which === 'undefined') ? event.keyCode : event.which;
    if (charCode === 8) { // backspace
        return;
    }
    if (event.target.value && event.target.value.length === 3) {
        event.target.value = event.target.value + '-';
    }

}
}
