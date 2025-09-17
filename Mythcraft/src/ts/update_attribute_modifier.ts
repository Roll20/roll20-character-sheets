const updateAttributeModifier = ({
  sourceAttribute,
  previousValue,
  removedInfo,
}: EventInfo) => {
  const repeatingRow = getFieldsetRow(sourceAttribute);

  getSectionIDs("repeating_modifiers", (ids) => {
    const attrs: string[] = [];

    ids.forEach((id) => {
      attrs.push(`repeating_modifiers_${id}_attribute`);
      attrs.push(`repeating_modifiers_${id}_modifier`);
      attrs.push(`repeating_modifiers_${id}_toggle_active`);
    });

    getAttrs(attrs, (v) => {
      const update: { [key: string]: number } = {};
      const activeIds = ids.filter((id) => {
        return (
          v[`repeating_modifiers_${id}_toggle_active`] === "on" &&
          v[`repeating_modifiers_${id}_modifier`] !== "0" &&
          v[`repeating_modifiers_${id}_modifier`] !== "" &&
          v[`repeating_modifiers_${id}_modifier`] !== undefined
        );
      });

      const getAttributeSum = (attribute: string) => {
        const getAttributeModifiers = (attribute: string) =>
          activeIds.filter((id) => {
            return v[`repeating_modifiers_${id}_attribute`] === attribute;
          });

        const attributeModifiers = getAttributeModifiers(attribute);

        const integers = attributeModifiers.map((id) => {
          return parseInt(v[`repeating_modifiers_${id}_modifier`] || "0", 10);
        });

        return sumIntegers(integers);
      };

      const attribute =
        removedInfo && removedInfo[`${sourceAttribute}_attribute`]
          ? removedInfo[`${sourceAttribute}_attribute`]
          : v[`${repeatingRow}_attribute`];

      update[`${attribute}_modifier`] = getAttributeSum(attribute.toString());

      if (previousValue && modifiers.includes(previousValue)) {
        update[`${previousValue}_modifier`] = getAttributeSum(previousValue);
      }

      setAttrs(update);
    });
  });
};
