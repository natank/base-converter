import { inverseObject } from './inverse-object';
describe('when given an object ', () => {
  test('should reverse the keys with the values', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };
    const result = inverseObject(obj);
    expect(result).toEqual({
      1: 'a',
      2: 'b',
      3: 'c',
    });
  });
});
