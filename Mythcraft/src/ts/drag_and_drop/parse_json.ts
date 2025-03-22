const parseJSON = (jsonString: string | { [key: string]: unknown }) => {
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
