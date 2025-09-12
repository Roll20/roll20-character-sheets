const handle_weapon = (
  page: CompendiumAttributes,
  attackRow: string,
  inventoryRow: string
) => {
  const attrs = [
    "apc",
    "cost",
    "damage_type",
    "damage",
    "name",
    "range",
    "reload",
    "size",
    "subcategory",
    "tags",
    "type",
    "weight",
  ];
  const row = attackRow ? attackRow : getRow("attacks");
  const update = getUpdate(attrs, page, row);

  update[`${row}_category`] = page.data.Category;
  update[`${row}_bonus`] = 0;
  update[`${row}_link`] = inventoryRow;

  if (typeof page.data.attribute === "string") {
    update[`${row}_attribute`] = `@{${page.data.attribute}}`;

    update[`${row}_attribute_abbreviation`] = getAttributeAbbreviation(
      page.data.attribute
    );
  } else {
    console.warn(
      `Attribute is not a string: ${page.data.attribute}, ${page.data.name}`
    );
  }

  setDropAttrs(update);
};
