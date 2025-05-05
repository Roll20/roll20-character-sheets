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
  update[`${row}_attribute`] = `@{${page.data.attribute}}`;

  // Category: "EquiCategorypment";
  // apc: "4-STR, min 3";
  // attribute: "strength";
  // cost: "45";
  // damage: "1d8";
  // damage_type: "sharp";
  // range: "melee";
  // size: "large";
  // subcategory: "weapon";
  // tags: "Hand-and-a-Half (reduce APC by 1, min 2)";
  // type: "blade";

  console.log(update);
  setDropAttrs(update);
};
