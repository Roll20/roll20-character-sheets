const roll20Attribute = (attr, value) => {
  if (attr === "skill") {
    return `@{${attrName(value)}}`;
  }

  return value;
};
