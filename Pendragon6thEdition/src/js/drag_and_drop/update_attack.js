const update_attack = (page) => {
  const row = getRow("attacks");
  const attrs = ["name", "skill"];

  const { damage, damage_type } = page.data;
  const update = getRepUpdate(attrs, row, page);

  console.table({
    damage,
    damage_type,
  });

  const type = `${damage_type.toLowerCase()}_damage`;
  getAttrs([type], (values) => {
    console.log("values", values);

    if (values) {
      const modifier = damage ? `+${damage}` : "";
      setAttrs({ [`${row}_damage`]: `${values[type]}${modifier}` });
    } else {
      dropWarning(`Unknown damage type: ${damage_type}`);
    }
  });

  return update;
};
