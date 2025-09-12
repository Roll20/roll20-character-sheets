const handle_lineage = (page: CompendiumAttributes) => {
  const attrs = ["height", "weight", "speed", "size"];
  const update = getUpdate(attrs, page);

  update["lineage"] = page.name;

  try {
    setAttrs(update, { silent: true });
  } catch (e) {
    dropWarning(`Error setting attributes: ${e}`);
  }
};
