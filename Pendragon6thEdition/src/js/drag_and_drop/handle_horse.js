const handle_horse = (page) => {
  const attrs = [
    "armor",
    "charge_damage",
    "con",
    "damage",
    "dex",
    "hp",
    "move",
    "siz",
    "str",
    "type",
  ];
  const warHorseAttrs = attrs.map((attr) => `warhorse_${attr}`);
  let update = getStaticUpdate([...warHorseAttrs, "equestrian_notes"], page);
  update["warhorse_type"] = page.name;
  update["flag_equestrian_notes"] = false;

  if (!update["warhorse_charge_damage"]) {
    update["warhorse_charge_damage"] = "0";
  }

  setAttrs(update);
};
