const getStaticUpdate = (attrs, page) => {
  let update = {};

  attrs.forEach((attr) => {
    if (page?.[attr] ?? page?.data?.[attr]) {
      update[attr] = page[attr] ?? roll20Attribute(attr, page.data[attr]);
    }
  });

  return update;
};
