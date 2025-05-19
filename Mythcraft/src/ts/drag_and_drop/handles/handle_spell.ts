const handle_spell = (page: CompendiumAttributes) => {
  const attrs = [
    "name",
    "description",
    "source",
    "type",
    "focus",
    "apc",
    "spc",
    "description",
  ];
  const row = getRow("spells");
  const update = getUpdate(attrs, page, row);

  if (page.data?.damage) {
    const row = getRow("attacks");
    const attackAttr = ["damage", "damage_type"];
    const updateAttack = getUpdate(attackAttr, page, row);

    console.log("Attack", updateAttack);
  }

  console.log("Spell update", update);
  //setDropAttrs(update);
};
