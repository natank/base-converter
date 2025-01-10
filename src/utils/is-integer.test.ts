import { isInteger } from './is-integer';

describe('When given something that is not an integer', () => {
  it('Should return false', () => {
    expect(isInteger('test' as unknown as number)).toBe(false);
    expect(isInteger(1.1)).toBe(false);
  });
});

describe('When given an integer', () => {
  it('Should return true', () => {
    expect(isInteger(1)).toBe(true);
    expect(isInteger(0)).toBe(true);
    expect(isInteger(-1)).toBe(true);
  });
});
