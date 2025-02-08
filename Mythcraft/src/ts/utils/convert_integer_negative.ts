const convertIntegerNegative = (number: number) =>
  number > 0 ? -Math.abs(number) : number;

const convertIntegersNegatives = (numbers: { [s: string]: number }) => {
  const negativeNumbers: { [s: string]: number } = {};

  for (let [key, value] of Object.entries(numbers)) {
    negativeNumbers[key] = convertIntegerNegative(value);
  }
  return negativeNumbers;
};
