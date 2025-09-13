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

      const rollFormula = getRollFormula(
        primary_source === page.data.source.toString().toLowerCase()
      );

      update[`${attackRow}_roll_formula`] = rollFormula;

      //Update spell formula and link with the attack data
      update[`${row}_roll_formula`] = rollFormula;
      update[`${row}_link`] = attackRow;

      setDropAttrs(update);
    }
  );

  return attackRow;
};
