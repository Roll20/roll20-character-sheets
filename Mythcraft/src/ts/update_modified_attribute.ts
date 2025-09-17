const updateModifiedAttribute = (attributes: string[]) => {
  getAttrs(attributes, (values) => {
    const sum = sumIntegers(Object.values(parseIntegers(values)));
    const name = attributes
      .find((e) => e.includes("base"))
      .replace("_base", "");
    setAttrs({ [name]: sum > 0 ? `+${sum}` : sum < 0 ? `-${sum}` : "0" });
  });
};
