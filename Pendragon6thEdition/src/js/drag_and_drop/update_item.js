const update_item = (page, row) => {
  let update = getRepUpdate(
    ["name", "value", "notes", "period_restriction"],
    row,
    page
  );

  if (page?.data?.["subcategory"]) {
    update[`${row}_category`] = page.data["subcategory"];
  }

  return update;
};
