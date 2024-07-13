const update_passion = (page) => {
  const row = getRow("passion");
  const attrs = ["name", "target_value"];
  return getRepUpdate(attrs, row, page);
};
