const parseInteger = (string: string) => parseFloat(string) || 0;

const parseIntegers = (numbers: { [s: string]: string }) => {
  const parsedNumbers: { [s: string]: number } = {};

  for (let [key, value] of Object.entries(numbers)) {
    parsedNumbers[key] = parseInteger(value);
  }
  return parsedNumbers;
};
