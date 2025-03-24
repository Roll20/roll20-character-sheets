const roll20Attribute = (attr: string, value: AttrValue) => {
  //TODO: Review this to see if it is needed in MythCraft
  if (attr === "attribute" && typeof value === "string") {
    return `@{${createAttributeName(value)}}`;
  }

  return value;
};
