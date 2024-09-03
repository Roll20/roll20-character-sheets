const handle_squire = (page) => {
  const attrs = ["squire_age", "squire_skill", "squire_notes"];
  const update = getStaticUpdate(attrs, page);
  update["squire_name"] = page.name;
  update["flag_squire_notes"] = false;
  setAttrs(update);
};
