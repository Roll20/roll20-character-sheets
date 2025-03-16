const update_attack = (attack) => {
  const row = getRow("attacks");
  const attrs = ["name", "target_value"];

  const { damage, damage_type, target_value, skill } = attack.data ?? attack;
  const update = getRepUpdate(attrs, row, attack);

  if (!skill && target_value) {
    update[`${row}_skill`] = "@{target_value}";
  }

  if (skill) {
    update[`${row}_skill`] = `@{${skill?.toLowerCase()}}`;
  }

  const type = damage_type?.toLowerCase();

  const modifier = damage ? `+${damage}` : "";
  try {
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
    } else if (damage?.toLowerCase() === "special") {
      update[`${row}_damage`] = 0;
    } else if (damage) {
      update[`${row}_damage`] = damage;
    }
  } catch (error) {
    console.warn(error);
  }

  return update;
};
