export const isEmpty = (value: any) => {
  return Object.keys(value).length === 0;
};

export function swap<T>(arr: T[], i: number, j: number) {
  const copy = [...arr];
  const temp = copy[i];
  copy[i] = copy[j];
  copy[j] = temp;
  return copy;
}
