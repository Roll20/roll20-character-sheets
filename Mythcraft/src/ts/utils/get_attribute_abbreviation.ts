const getAttributeAbbreviation = (attribute: string): string => {
  if (attribute === "luck") {
    return attribute;
  }

  if (attribute.charAt(0) === "@") {
    // If Attribute is @{...}. Remove the @{}
    attribute = attribute.substring(2, attribute.length - 1);
  }

  const abbreviation = attribute.substring(0, 3);

  // Abbreviation does not follow the first three letters of attribute name pattern
  if (attribute === "awareness" || attribute === "coordination") {
    const key = getTranslationByKey(abbreviation);

    if (key) {
      return key;
    } else {
      console.warn(
        `Key not found for ${attribute} abbreviation: ${abbreviation}`
      );
    }
  }

  return abbreviation;
};
