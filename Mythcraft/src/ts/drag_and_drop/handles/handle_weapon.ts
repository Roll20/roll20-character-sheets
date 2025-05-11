const handle_weapon = (page: CompendiumAttributes) => {
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
  const row = getRow("attacks");
  const update = getUpdate(attrs, page, row);

  update[`${row}_category`] = page.data.Category;

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
