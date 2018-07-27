import { Directive } from '@angular/core';
import {FormControl} from '@angular/forms';

@Directive({
  selector: '[appPinValidator]'
})
export class PinValidatorDirective {

  constructor() { }

  static validPin(control: FormControl) {
    // console.log(control.value);
    /*pin - IS THE NAME OF CUSTOM VALIDATOR*/
    return (control.value) ? null : {pin: true};
  }
}
