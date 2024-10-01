const processDataArrays = (array, callback) => {
  if (array === undefined) {
    return;
  }
  const parsed = typeof array === "string" ? parseJSON(array) : array;
  const map = parsed.map((e) => callback(e));
  return map?.reduce((acc, val) => ({ ...acc, ...val }));
};
