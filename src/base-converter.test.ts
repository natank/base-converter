import { BaseConverter } from './base-converter';
let converter: BaseConverter;

beforeAll(() => {
  converter = new BaseConverter();
});
describe('convertFromBaseNToDecimal', () => {
  describe('When given a number in a base that is less than or equal to 10', () => {
    it('Should convert the number to decimal', () => {
      expect(converter.convertFromBaseNToDecimal('1101', 2)).toBe(13);
      expect(converter.convertFromBaseNToDecimal('11011', 2)).toBe(27);
      expect(converter.convertFromBaseNToDecimal('1210', 3)).toBe(48);
    });
  });
  describe('When given a number in a base that is greater than 10', () => {
    it('Should convert the number to decimal', () => {
      expect(converter.convertFromBaseNToDecimal('1A1', 11)).toBe(232);
      expect(converter.convertFromBaseNToDecimal('1B1', 14)).toBe(351);
      expect(converter.convertFromBaseNToDecimal('ABC', 16)).toBe(2748);
    });
  });
  describe('When given a number in base 10 with an integer and decimal part', () => {
    it('Should convert the number to decimal', () => {
      expect(converter.convertFromBaseNToDecimal('1101.10', 2)).toBeCloseTo(13.5);
      expect(converter.convertFromBaseNToDecimal('1234.12', 8)).toBeCloseTo(668.15625);
      expect(converter.convertFromBaseNToDecimal('10.001', 10)).toBeCloseTo(10.001);
    });
  });
  describe('When given an invalid number in base N', () => {
    it('Should throw an error indicating the number is not a string', () => {
      expect(() => converter.convertFromBaseNToDecimal(1101 as unknown as string, 2)).toThrow(
        'The number to convert must be a string',
      );
    });
    it('Should throw an error indicating that there is more than one delimiter', () => {
      expect(() => converter.convertFromBaseNToDecimal('1101.1.0', 2)).toThrow(
        'The number has more than one delimiter',
      );
    });
    it('Should throw an error indicating that the number is invalid', () => {
      expect(() => converter.convertFromBaseNToDecimal('1101.2', 2)).toThrow(
        'Invalid digit 2 in number 1101.2 in base 2',
      );
      expect(() => converter.convertFromBaseNToDecimal('1103.2', 3)).toThrow(
        'Invalid digit 3 in number 1103.2 in base 3',
      );
      expect(() => converter.convertFromBaseNToDecimal('12@', 3)).toThrow('Invalid digit @ in number 12@ in base 3');
    });
    it('Should throw an error indicating that the base must be a number', () => {
      expect(() => converter.convertFromBaseNToDecimal('1101', '2' as unknown as number)).toThrow(
        'The base must be a number',
      );
    });
  });
});
describe('convertFromDecimalToBaseN', () => {
  describe('When given a decimal number', () => {
    it('Should convert the number to the specified base', () => {
      expect(converter.convertFromDecimalToBaseN(13, 2)).toBe('1101');
      expect(converter.convertFromDecimalToBaseN(27, 2)).toBe('11011');
      expect(converter.convertFromDecimalToBaseN(48, 3)).toBe('1210');
      expect(converter.convertFromDecimalToBaseN(232, 11)).toBe('1A1');
      expect(converter.convertFromDecimalToBaseN(351, 14)).toBe('1B1');
      expect(converter.convertFromDecimalToBaseN(2748, 16)).toBe('ABC');
    });
  });
  describe('When given a decimal number that is less than the base', () => {
    it('Should convert it to a base N number and delete the zeroes from the left', () => {
      expect(converter.convertFromDecimalToBaseN(13, 16)).toBe('D');
      expect(converter.convertFromDecimalToBaseN(27, 16)).toBe('1B');
      expect(converter.convertFromDecimalToBaseN(48, 16)).toBe('30');
    });
  });
  describe('When given a decimal number with an integer and decimal part', () => {
    it('Should convert the integer and the decimal part with a given precision', () => {
      expect(converter.convertFromDecimalToBaseN(13.5, 2)).toBe('1101.10');
      expect(converter.convertFromDecimalToBaseN(13.5, 8)).toBe('15.40');
      expect(converter.convertFromDecimalToBaseN(13.5, 16)).toBe('D.80');
    });
  });
  describe('When given an invalid base', () => {
    it('Should throw an error indicating that the base must be a number', () => {
      expect(() => converter.convertFromDecimalToBaseN(13, '2' as unknown as number)).toThrow(
        'The base must be a number',
      );
    });
  });
  describe('When given an invalid number', () => {
    it('Should throw an error indicating that the number must be a number', () => {
      expect(() => converter.convertFromDecimalToBaseN('13' as unknown as number, 2)).toThrow(
        'The number to convert must be a number',
      );
    });
  });
  describe('When given invalid precision', () => {
    it('Should throw an error indicating that the precision must be a number', () => {
      expect(() => converter.convertFromDecimalToBaseN(13, 2, '2' as unknown as number)).toThrow(
        'The precision must be an integer',
      );
    });
  });
  describe('convert()', () => {
    it('Should convert a number from a base to another base', () => {
      expect(converter.convert('10', { fromBase: 10, toBase: 10 })).toEqual('10');
      expect(converter.convert('10', { fromBase: 10, toBase: 2 })).toEqual('1010');
      expect(converter.convert('10', { fromBase: 10, toBase: 16 })).toEqual('A');
      expect(converter.convert('1010', { fromBase: 2, toBase: 10 })).toEqual('10');
      expect(converter.convert('1010', { fromBase: 2, toBase: 16 })).toEqual('A');
      expect(converter.convert('1010', { fromBase: 2, toBase: 8 })).toEqual('12');
      expect(converter.convert('10.1', { fromBase: 10, toBase: 10 })).toEqual('10.09');
      expect(converter.convert('10.1', { fromBase: 10, toBase: 2 })).toEqual('1010.00');
      expect(converter.convert('10.1', { fromBase: 10, toBase: 2, precision: 4 })).toEqual('1010.0001');
      expect(converter.convert('10.1', { fromBase: 10, toBase: 2, precision: 4 })).toEqual('1010.0001bbb');
      expect(converter.convert('10.9', { fromBase: 10, toBase: 2, precision: 4 })).toEqual('1010.1110');
      // expect(converter.convert('10.9', { fromBase: 10, toBase: 16, precision: 4 })).toEqual('A.E666');
    });
  });
});
