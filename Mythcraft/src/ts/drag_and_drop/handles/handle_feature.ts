const handle_feature = (page: CompendiumAttributes) => {
  const attrs = ["name", "description"];
  const row = getRow("abilities");
  const update = getUpdate(attrs, page, row);

  ["lineage", "profession"].forEach((attr) => {
    if (page.data[attr]) {
      update[`${row}_tags`] = page.data[attr];
    }
  });

  setDropAttrs(update);
};
