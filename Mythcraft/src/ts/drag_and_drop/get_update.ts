const getUpdate = (
  attrs: string[],
  page: CompendiumAttributes,
  repeatingRow?: string
) => {
  let update: { [key: string]: AttrValue } = {};

  attrs.forEach((attr) => {
    const sheetAttr = repeatingRow ? `${repeatingRow}_${attr}` : attr;

    //@ts-expect-error indexing error
    if (page[attr] ?? page.data[attr]) {
      //@ts-expect-error indexing error
      update[sheetAttr] = page[attr] ?? roll20Attribute(attr, page.data[attr]);
    }
  });

  if (repeatingRow) {
    update[`${repeatingRow}_toggle_edit`] = false;
  }

  return update;
};
