const updateSpellRollFormula = (event: EventInfo) => {
  const { sourceAttribute, newValue, sourceType } = event;
  const row = getFieldsetRow(sourceAttribute);

  const isSpellCard = newValue === "0";

  if (sourceType !== "player") {
    return;
  }

  if (isSpellCard) {
    const formula = getRollFormula(undefined, isSpellCard);
    setAttrs({
      [`${row}_roll_formula`]: formula,
    });
    return;
  }

  if (!isSpellCard) {
    getAttrs(
      ["primary_source", `${row}_source`],
      ({ primary_source, ...values }) => {
        const isPrimarySource = primary_source === values[`${row}_source`];
        setAttrs({
          [`${row}_roll_formula`]: getRollFormula(isPrimarySource, isSpellCard),
        });
      }
    );

    const attributes = [...attackFieldsetAttributes, "source", "link"].map(
      (attr) => `${row}_${attr}`
    );

    getAttrs(attributes, (values) => {
      const data: Record<string, AttrValue> = {};
      [...attackFieldsetAttributes, "source"].forEach((attr) => {
        data[attr] = values[`${row}_${attr}`];
      });

      const link = values[`${row}_link`];

      if (!link) {
        const data: Record<string, AttrValue> = {};
        [...attackFieldsetAttributes, "source"].forEach((attr) => {
          data[attr] = values[`${row}_${attr}`];
        });

        addSpellAttack(row, {
          name: values[`${row}_name`],
          //@ts-ignore data is only partial type but will work
          data,
        });
      }
    });
  }
};
