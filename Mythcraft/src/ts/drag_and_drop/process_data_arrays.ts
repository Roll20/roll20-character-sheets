const processDataArrays = (
  array: string | string[],
  callback: (arg0: unknown) => unknown
) => {
  if (array === undefined) {
    return;
  }
  const parsed = typeof array === "string" ? parseJSON(array) : array;
  const map = parsed.map((e: unknown) => callback(e));
  return map?.reduce((acc: any, val: any) => ({ ...acc, ...val }));
};
