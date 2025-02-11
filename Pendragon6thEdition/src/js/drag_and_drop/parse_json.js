const parseJSON = (jsonString) => {
  try {
    if (typeof jsonString === "object") {
      return jsonString;
    }

    return JSON.parse(jsonString);
  } catch (e) {
    console.log(`Error parsing JSON: ${jsonString}`);
    return undefined;
  }
};
