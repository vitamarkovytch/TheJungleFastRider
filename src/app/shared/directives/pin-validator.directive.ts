import {Directive} from '@angular/core';
import {FormControl} from '@angular/forms';

@Directive({
  selector: '[appPinValidator]'
})
export class PinValidatorDirective {

  constructor() {
  }

  static validPin(control: FormControl) {

    /*  JN-3117-5100-LH, JN-3117-5101-LJ, JN-0000-1111-AG, JN-3117-5102-LL */

    function getLetterFromArray(array: any) {
      let firstResult = 0;
      let secondResult = 0;
      for (let i = 0; i < array.length; i++) {
        if (i % 2 === 0) {
          firstResult += array[i] * 1;
        } else {
          let res = 0;
          let num = array[i] * 2;
          if (num > 9) {
            do {
              res += num % 10;
              num = Math.floor(num / 10);
            } while (num !== 0);
            secondResult += res;
          } else {
            secondResult += num;
          }
        }
      }
      return String.fromCharCode(((firstResult + secondResult) % 26) + 65);
    }

    const fullArray = control.value.toString().split('-');

    if (fullArray.length === 4 && fullArray[0] === 'JN') {
      const firstPartNumbers = fullArray[1].split('');
      const secondPartNumbers = fullArray[2].split('');

      if (firstPartNumbers.length === 4 && secondPartNumbers.length === 4) {

        const firstLetter = getLetterFromArray(firstPartNumbers);
        const secondLetter = getLetterFromArray(secondPartNumbers);
        const resultLetters = firstLetter + secondLetter;

        if (resultLetters === fullArray[3]) {
          return null;
        } else {
          return {pin: true};
        }
      } else {
        return {pin: true};
      }
    } else {
      return {pin: true};
    }
  }
}
