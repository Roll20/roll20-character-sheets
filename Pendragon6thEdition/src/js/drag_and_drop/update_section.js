const updateSection = (section) => {
  return (data) => update_section(data, section);
};

const update_section = (page, section) => {
  const row = getRow(section);
  const attrs = ["name", "target_value"];
  return getRepUpdate(attrs, row, page);
};
