const handle_profession = (page: CompendiumAttributes) => {
  if (page.data.occupation) {
    handle_bop(page);
    return;
  }

  console.log(page);

  const attrs = ["name", "description"];
  const row = getRow("abilities");
  const update = getUpdate(attrs, page, row);

  if (page.data.profession) {
    update[`${row}_tags`] = page.data.profession;
  }

  console.log(update);

  setDropAttrs(update);
};
