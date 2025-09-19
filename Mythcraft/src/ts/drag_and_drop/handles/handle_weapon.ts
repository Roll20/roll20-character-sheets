const getAttributeInfo = (attr: string | number | boolean) => {
  if (typeof attr === "string") {
    return {
      attribute: `@{${attr}}`,
      abbreviation: getAttributeAbbreviation(attr),
    };
  }
  console.warn(`Attribute is not a string: ${attr}`);
  return { attribute: "", abbreviation: "" };
};

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
    "damage_attribute",
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
  update[`${row}_modifier`] = page.data.modifier ?? 0;
  update[`${row}_link`] = inventoryRow;

  const setAttributeField = (
    key: string,
    value?: string | number | boolean
  ) => {
    if (!value) return;
    const { attribute, abbreviation } = getAttributeInfo(value);
    update[`${row}_${key}`] = attribute;
    update[`${row}_${key}_abbreviation`] = abbreviation;
  };

  setAttributeField("attribute", page.data.attribute);

  if (page.data.damage_attribute) {
    setAttributeField("damage_attribute", page.data.damage_attribute);
  } else {
    setAttributeField("damage_attribute", page.data.attribute);
  }

  if (!page.data.attribute) {
    update[`${row}_bonus`] = 0;
  }

  setDropAttrs(update);
};
