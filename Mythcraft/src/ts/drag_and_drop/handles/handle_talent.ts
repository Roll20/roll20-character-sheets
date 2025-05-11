const handle_talent = (page: CompendiumAttributes) => {
  const attrs = [
    "name",
    "description",
    "level",
    "prerequisites",
    "stack",
    "track",
  ];
  const row = getRow("talents");
  const update = getUpdate(attrs, page, row);

  setDropAttrs(update);
};
