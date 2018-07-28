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

    function digitsSum(number) {
      let res = 0;
      do {
        res += number % 10;
        number = Math.floor(number / 10);
      } while (number !== 0);
      return res;
    }

    function getLetterFromArray(array: any) {
      let evenDigitsSum = 0;
      let oddDigitsSum = 0;
      for (let i = 0; i < array.length; i++) {
        if (i % 2 === 0) {
          /* for even indexes, the result of multiplication can never be >9 */
          evenDigitsSum += array[i] * 1;
        } else {
          const num = array[i] * 2;
          if (num > 9) {
            oddDigitsSum += digitsSum(num);
          } else {
            oddDigitsSum += num;
          }
        }
      }
      return String.fromCharCode(((evenDigitsSum + oddDigitsSum) % 26) + 65);
    }

    const fullArray = control.value.toString().split('-');

    if (fullArray.length !== 4 || fullArray[0] !== 'JN') {
      return {pin: true};
    }

    const firstPartNumbers = fullArray[1].split('');
    const secondPartNumbers = fullArray[2].split('');

    if (firstPartNumbers.length !== 4 && secondPartNumbers.length !== 4) {
      return {pin: true};
    }

    const firstLetter = getLetterFromArray(firstPartNumbers);
    const secondLetter = getLetterFromArray(secondPartNumbers);
    const resultLetters = firstLetter + secondLetter;

    if (resultLetters !== fullArray[3]) {
      return {pin: true};
    }

    return null;
  }
}
