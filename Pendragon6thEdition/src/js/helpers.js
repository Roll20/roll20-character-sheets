const convertIntegerNegative = (number) =>
  number > 0 ? -Math.abs(number) : number;

const convertIntegersNegatives = (numbers) => {
  for (let [key, value] of Object.entries(numbers)) {
    numbers[key] = convertIntegerNegative(value);
  }
  return numbers;
};

const findRepeatingField = (trigger) => trigger.split("_")[1];

const getReprowid = (trigger) => {
  const split = trigger.split("_");
  return `${split[0]}_${split[1]}_${split[2]}`;
};

const getReprowAttribute = (key) => {
  const reprowid = getReprowid(key);
  return key.split(`${reprowid}_`)[1];
};

const getTranslations = (translationKeys) => {
  let translations = {};
  translationKeys.forEach(
    (key) => (translations[`${key}`] = getTranslationByKey(key))
  );
  return translations;
};

const parseInteger = (string) => parseFloat(string) || 0;

const parseIntegers = (numbers) => {
  for (let [key, value] of Object.entries(numbers)) {
    numbers[key] = parseFloat(value) || 0;
  }
  return numbers;
};

const sliceAttr = (attribute) => attribute.slice(2, -1);

const sumIntegers = (numbers) => numbers.reduce((a, b) => a + b, 0);

const attrName = (name) => name?.replace(/ /g, "_").toLowerCase();
