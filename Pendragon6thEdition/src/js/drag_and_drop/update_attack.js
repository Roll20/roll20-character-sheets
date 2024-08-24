const update_attack = (attacks) => {
  const row = getRow("attacks");
  const attrs = ["name", "skill", "target_value"];

  const { damage, damage_type, target_value, skill } = attacks;
  const update = getRepUpdate(attrs, row, attacks);

  if (!skill && target_value) {
    update[`${row}_skill`] = "@{target_value}";
  }

  const type = damage_type?.toLowerCase();

  const modifier = damage ? `+${damage}` : "";
  if (["brawling", "character"].includes(type)) {
    const attr = `${type}_damage`;
    getAttrs([attr], (v) => {
      if (v) {
        setAttrs({ [`${row}_damage`]: `${v[attr]}${modifier}` });
      } else {
        dropWarning(`Unknown damage type: ${damage_type}`);
      }
    });
  } else if (["horse"].includes(type)) {
    getAttrs(
      ["warhorse_charge_damage", "warhorse_damage"],
      ({ warhorse_charge_damage, warhorse_damage }) => {
        if (warhorse_charge_damage || warhorse_damage) {
          const damage = warhorse_charge_damage || warhorse_damage;

          setAttrs({
            [`${row}_damage`]: `${damage}${modifier}`,
          });
        } else {
          dropWarning(`Could not get values for warhorse damage`);
        }
      }
    );
  } else if (damage) {
    update[`${row}_damage`] = damage;
  }

  return update;
};
