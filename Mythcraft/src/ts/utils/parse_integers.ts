const parseInteger = (string: string) => parseFloat(string) || 0;

const parseIntegers = (values: Attrs) => {
  const parsedNumbers: { [key: keyof Attrs]: number } = {};

  for (let [key, value] of Object.entries(values)) {
    if (typeof value === "string") {
      parsedNumbers[key] = parseInteger(value);
    } else if (typeof value === "number") {
      parsedNumbers[key] = value;
    }
  }
  return parsedNumbers;
};
