const handle_talent = (page: CompendiumAttributes) => {
  const attrs = ["name", "description", "level", "prerequisites"];
  const row = getRow("talents");
  const update = getUpdate(attrs, page, row);

  update[`${row}_tags`] = `${page.data.stack}, ${page.data.track}`;

  setDropAttrs(update);
};
