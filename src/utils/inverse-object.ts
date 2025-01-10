export function inverseObject(obj: Record<string, unknown>): Record<string, unknown> {
  return Object.keys(obj).reduce(
    (acc, key) => {
      acc[obj[key] as string] = key;
      return acc;
    },
    {} as Record<string, unknown>,
  );
}
