const handle_equipment = (page: CompendiumAttributes) => {
  const attrs = ["name", "description", "cost", "tags"];
  const row = getRow("inventory");
  const update = getUpdate(attrs, page, row);

  update[`${row}_qty`] = page.data.quantity ? page.data.quantity : 1;

  if (page.data.subcategory === "weapon") {
    handle_weapon(page);
  }

  setDropAttrs(update);
};
