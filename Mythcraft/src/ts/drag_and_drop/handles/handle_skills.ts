const handle_skills = (page: CompendiumAttributes) => {
  const attrs = ["name", "category", "description", "attribute"];
  const row = getRow("skills");
  const update = getUpdate(attrs, page, row);

  update[`${row}_bonus`] = 1;

  if (typeof page.data.attribute === "string") {
    update[`${row}_attribute_abbreviation`] = getAttributeAbbreviation(
      page.data.attribute
    );
  }

  setDropAttrs(update);
};
