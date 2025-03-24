const handle_bop = (page: CompendiumAttributes) => {
  const attrs = ["name", "occupation", "description"];
  const row = getRow("additional-info");
  const update = getUpdate(attrs, page, row);

  update[`${row}_category`] = page.data.Category;

  if (page.data.Category === "Backgrounds") {
    update["background"] = page.name;
    update["occupation_tag"] = page.data.occupation;
  }

  setDropAttrs(update);
};
