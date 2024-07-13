const update_attack = (page) => {
  const row = getRow("attacks");
  const attrs = ["name", "damage", "skill"];
  return getRepUpdate(attrs, row, page);
};
