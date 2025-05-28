const handle_spell = (page: CompendiumAttributes) => {
  const attrs = [
    "apc",
    "description",
    "focus",
    "name",
    "spc",
    "type",
    "damage",
    "damage_type",
    "upcharge",
    "range",
    "duration",
    "cast_time",
    "prerequisites",
    "recharge",
  ];

  const row = getRow("spells");
  const update = getUpdate(attrs, page, row);

  if (page.data?.damage) {
    const row = getRow("attacks");
    const attackAttr = ["damage", "damage_type"];
    const updateAttack = getUpdate(attackAttr, page, row);

    console.log("Attack", updateAttack);
  }

  if (page.data?.function_note) {
    update[
      `${row}_function`
    ] = `${page.data.function} (${page.data.function_note})`;
  }

  if (page.data?.liturgy_apc) {
    update[`${row}_apc`] = `${page.data.liturgy_apc} (liturgy apc)`;
  }

  if (page.data?.liturgy_spc) {
    update[`${row}_spc`] = `${page.data.liturgy_spc} (liturgy spc)`;
  }

  if (page.data?.requires && page.data?.materials) {
    update[
      `${row}_requires`
    ] = `${page.data?.requires} (${page.data.materials})`;
  } else if (page.data?.requires) {
    update[`${row}_requires`] = `${page.data?.requires}`;
  } else if (page.data?.materials) {
    update[`${row}_requires`] = `${page.data?.materials}`;
  }

  let tags = `${page.data.source} ${page.data.type}, ${page.data.function}`;
  if (page.data?.function_note) {
    tags += `, ${page.data.function_note}`;
  }

  update[`${row}_tags`] = tags;

  setDropAttrs(update);
};
