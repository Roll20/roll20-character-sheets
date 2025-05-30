const getRepUpdate = (attrs, row, page) => {
  let update = {};

  attrs.forEach((attr) => {
    if (page?.[attr] ?? page?.data?.[attr]) {
      update[`${row}_${attr}`] =
        page[attr] ?? roll20Attribute(attr, page.data[attr]);
    }
  });

  if (attrs.includes("notes")) {
    update[`${row}_flag`] = false;
  }

  return update;
};
