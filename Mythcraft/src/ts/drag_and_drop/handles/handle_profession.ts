const handle_profession = (page: CompendiumAttributes) => {
  if (page.data.occupation) {
    handle_bop(page);
    return;
  }

  const attrs = ["name", "description"];
  const row = getRow("abilities");
  const update = getUpdate(attrs, page, row);

  if (page.data.profession) {
    update[`${row}_tags`] = page.data.profession;
  }

  setDropAttrs(update);
};
