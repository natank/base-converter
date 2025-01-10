export const isInteger = (value: number): boolean => {
  return !(typeof value !== 'number' || value % 1 !== 0);
};
