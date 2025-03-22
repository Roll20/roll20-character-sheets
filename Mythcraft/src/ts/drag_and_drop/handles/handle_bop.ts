const handle_bop = (page: CompendiumAttributes) => {
  const attrs = ["name", "occupation", "description"];
  const row = getRow("additional-info");
  const update = getUpdate(attrs, page, row);

  update[`${row}_category`] = page.data.Category;

  try {
    setAttrs(update, { silent: true });
  } catch (e) {
    dropWarning(`Error setting attributes: ${e}`);
  }
};
