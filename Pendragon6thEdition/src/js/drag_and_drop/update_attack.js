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

// Expectation would be it applies damage_type always, then adds damage on top if applicable
// In this instance Club would be X+2D6 where X is the character's brawling damage (based on STR + SIZ)
// Battle Axe would be XD6 (character damage) no + anything as no damage
