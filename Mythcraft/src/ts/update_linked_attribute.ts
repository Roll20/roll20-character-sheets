const updateLinkedAttribute = (event: EventInfo) => {
  const { sourceAttribute, newValue } = event;

  if (sourceAttribute.includes("link")) {
    return;
  }

  const attr = getFieldsetAttr(sourceAttribute);
  const fieldset = getFieldsetGroupName(sourceAttribute);

  getAttrs([`repeating_${fieldset}_link`], (values) => {
    const linkedRow = values[`repeating_${fieldset}_link`];
    if (linkedRow) {
      const update: Attrs = {
        [`${linkedRow}_${attr}`]: newValue,
      };
      setAttrs(update, { silent: true });
    }
  });
};
