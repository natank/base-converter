import { lettersToNumbersMap } from './constants/letters-to-numbers-map';
import { ConvertOptions } from './interfaces/convert-options';
import { inverseObject } from './utils/inverse-object';
import { isInteger } from './utils/is-integer';

export class BaseConverter {
  private numbersToLettersMap: Record<number, string>;
  private delimiter = '.';
  constructor() {
    this.numbersToLettersMap = inverseObject(lettersToNumbersMap) as Record<number, string>;
  }

  private validateNumberInBaseN(numberToConvert: string, baseFrom: number): void {
    if (typeof numberToConvert !== 'string') {
      throw new Error('The number to convert must be a string');
    }
    if (!isInteger(baseFrom)) {
      throw new Error('The base must be a number');
    }

    const splittedNumberByDelimiter = numberToConvert.split(this.delimiter);
    if (splittedNumberByDelimiter.length < 1 || splittedNumberByDelimiter.length > 2) {
      throw new Error('The number has more than one delimiter');
    }

    const digits = Array.from(numberToConvert.replace(this.delimiter, ''));
    for (const digit of digits) {
      const digitAsNumber = this.getDigitAsNumber(digit);
      if (typeof digitAsNumber == 'undefined' || digitAsNumber >= baseFrom) {
        throw new Error(`Invalid digit ${digit} in number ${numberToConvert} in base ${baseFrom}`);
      }
    }
  }
  convertFromBaseNToDecimal(numberToConvert: string, baseFrom: number): number {
    // numberToConvert = '1101.10' may have a decimal part
    this.validateNumberInBaseN(numberToConvert, baseFrom);
    const numberParts = numberToConvert.split(this.delimiter);
    const integerPart = numberParts[0];
    const integerPartLength = integerPart.length;
    let result = 0;
    for (let i = 0; i < integerPartLength; i++) {
      const digit = integerPart[integerPartLength - i - 1];
      const digitAsNumber = this.getDigitAsNumber(digit);
      result += digitAsNumber * Math.pow(baseFrom, i);
    }
    if (numberParts.length > 1) {
      const decimalPart = numberParts[1];
      const decimalPartLength = decimalPart.length;
      for (let i = 0; i < decimalPartLength; i++) {
        const digit = decimalPart[i];
        const digitAsNumber = this.getDigitAsNumber(digit);
        result += digitAsNumber * Math.pow(baseFrom, -i - 1);
      }
    }
    return result;
  }
  private getDigitAsNumber(digit: string): number {
    let result = parseInt(digit);
    if (isNaN(result)) {
      result = lettersToNumbersMap[digit];
    }
    return result;
  }

  private convertIntegerPart(integerPart: number, baseTo: number) {
    const reminders = [];
    while (true) {
      const quotient = Math.floor(integerPart / baseTo);
      const remainder = integerPart % baseTo;
      reminders.push(remainder >= 10 ? this.numbersToLettersMap[remainder] : remainder.toString());
      integerPart = quotient;
      if (integerPart < baseTo) {
        break;
      }
    }
    reminders.reverse();
    let result = integerPart >= 10 ? this.numbersToLettersMap[integerPart] : integerPart.toString();
    reminders.forEach((reminder) => {
      result += reminder;
    });
    while (result[0] === '0' && result.length > 1) {
      result = result.slice(1);
    }
    return result;
  }

  private convertDecimalPart(decimalPart: number, baseTo: number, precision: number) {
    let result = '';
    let decimalPartCopy = decimalPart;
    for (let i = 0; i < precision; i++) {
      decimalPartCopy *= baseTo;
      const integerPart = Math.floor(decimalPartCopy);
      result += decimalPartCopy >= 10 ? this.numbersToLettersMap[integerPart] : integerPart.toString();
      decimalPartCopy %= 1;
    }
    return result;
  }

  private validateDecimalNumber(numberToConvert: number, baseTo: number, precision: number) {
    if (!isInteger(baseTo)) {
      throw new Error('The base must be a number');
    }
    if (!isInteger(precision)) {
      throw new Error('The precision must be an integer');
    }
    if (typeof numberToConvert !== 'number') {
      throw new Error('The number to convert must be a number');
    }
  }
  convertFromDecimalToBaseN(decimalNumber: number, baseTo: number, precision = 2): string {
    this.validateDecimalNumber(decimalNumber, baseTo, precision);
    let numberToConvertCopy = decimalNumber;
    const decimalPart = numberToConvertCopy % 1;
    let integerPart = Math.floor(numberToConvertCopy);
    let convertedIntegerPart = this.convertIntegerPart(integerPart, baseTo);
    if (decimalPart) {
      const convertedDecimalPart = this.convertDecimalPart(decimalPart, baseTo, precision);
      return `${convertedIntegerPart}${this.delimiter}${convertedDecimalPart}`;
    }
    return convertedIntegerPart;
  }
  /**
   * This function allows you to convert a number from a base to another base
   * @param numberToConvert The number to convert
   * @param fromBase The base of the number to convert
   * @param toBase The base to convert the number to
   * @param precision The precision of the number to convert
   * @returns The number converted to the base specified
   */
  convert(numberToConvert: string, { fromBase, toBase, precision = 2 }: ConvertOptions) {
    const decimalNumber = this.convertFromBaseNToDecimal(numberToConvert, fromBase);
    return this.convertFromDecimalToBaseN(decimalNumber, toBase, precision);
  }
}
