const updateLuck = (attributes: Attributes) => {
  getAttrs(attributes, (values) => {
    const luck = parseInt(values.luck);
    const attrs: Attrs = {};
    //Reroll 1d20 for every 2 points of Luck
    attrs.rerolls_max = Math.ceil(luck / 2) || 0;

    if (luck < 0) {
      //Luck < 0 never Critically Hit and subtract LUCK from every d20 roll
      attrs.luck_negative_modifier = luck;
    } else {
      attrs.luck_negative_modifier = 0;
    }

    setAttrs(attrs);
  });
};
