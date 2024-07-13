const update_item = (page, row) => {
  let update = getRepUpdate(
    ["value", "notes", "period_restriction"],
    row,
    page
  );
  update[`${row}_equipment`] = page.name;
  update[`${row}_category`] = page.data["subcategory"];
  return update;
};
