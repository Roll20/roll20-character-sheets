const attackFieldsetAttributes = [
  "name",
  "damage",
  "damage_type",
  "range",
  "tags",
  "apc",
  "description",
];

const addSpellAttack = (row: string, page: CompendiumAttributes) => {
  const attackRow = getRow("attacks");

  const update = getUpdate(attackFieldsetAttributes, page, attackRow);
  update[`${attackRow}_link`] = row;

  getAttrs(
    ["spellcasting_ability", "primary_source"],
    ({ spellcasting_ability, primary_source }) => {
      update[`${attackRow}_attribute`] = spellcasting_ability;
      update[`${attackRow}_attribute_abbreviation`] =
        getAttributeAbbreviation(spellcasting_ability);

      const isPrimarySource =
        primary_source === page.data.source.toString().toLowerCase();
      const rollFormula = getRollFormula(isPrimarySource);

      update[`${attackRow}_roll_formula`] = rollFormula;

      //Update spell formula and link with the attack data
      update[`${row}_roll_formula`] = rollFormula;
      update[`${row}_link`] = attackRow;

      const attribute = spellcasting_ability.slice(2, -1);

      getAttrs([attribute], (attrs) => {
        const int = parseInteger(attrs[attribute]);
        const bonus = isPrimarySource ? int : Math.ceil(int / 2);
        update[`${attackRow}_bonus`] = bonus > 0 ? `+${bonus}` : `${bonus}`;

        setDropAttrs(update);
      });
    }
  );

  return attackRow;
};
