const parseJSON = (jsonString) => {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.log(`Error parsing JSON: ${jsonString}`);
    return undefined;
  }
};
