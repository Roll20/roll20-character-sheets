const handle_conditions = (page: CompendiumAttributes) => {
  const attrs = ["name", "description"];
  const row = getRow("conditions");
  const update = getUpdate(attrs, page, row);

  setDropAttrs(update);
};
