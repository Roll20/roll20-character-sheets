const handle_skills = (page: CompendiumAttributes) => {
  const attrs = ["name", "category", "description"];
  const row = getRow("skills");
  const update = getUpdate(attrs, page, row);

  update[`${row}_bonus`] = 1;

  try {
    setAttrs(update, { silent: true });
  } catch (e) {
    dropWarning(`Error setting attributes: ${e}`);
  }
};
