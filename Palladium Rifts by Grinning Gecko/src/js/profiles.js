async function updateProfile(rowId) {
  const bonusIds = (
    await getAttrsAsync(["repeating_profiles_bonus_ids"])
  ).repeating_profiles_bonus_ids.split(",");
  console.log(bonusIds);
  const bonusNameKeys = bonusIds.map((id) => `repeating_bonuses_${id}_name`);
  const a = await getAttrsAsync(bonusNameKeys);
  const names = Object.values(a).reduce(
    // using Em Space https://www.compart.com/en/unicode/U+2003
    (acc, cur) => `${acc}     ✔︎${cur}`.trim(),
    ""
  );
  await setAttrsAsync({
    [`repeating_profiles_${rowId}_bonus_names`]: names,
    [`repeating_profiles_${rowId}_rowid`]: `repeating_profiles_${rowId}_`,
  });
  await combineBonuses(bonusIds, `repeating_profiles_${rowId}`);
}

on("clicked:repeating_profiles:copybonusids", async (e) => {
  console.log("clicked:copybonusids", e);
  const a = await getAttrsAsync(["bonus_ids_output"]);
  const attrs = {};
  attrs[`repeating_profiles_bonus_ids`] = a.bonus_ids_output;
  await setAttrsAsync(attrs);
});

on(
  "clicked:repeating_profiles:updateprofile change:repeating_profiles:bonus_ids",
  async (e) => {
    console.log("clicked:repeating_profiles:updateprofile", e);
    const [r, section, rowId] = e.sourceAttribute.split("_");
    await updateProfile(rowId);
  }
);

on("change:_reporder:profiles", async (e) => {
  console.log("change:_reporder:profiles", e);
  const sectionIds = await getSectionIDsOrderedAsync("profiles");
  const prefix = `repeating_profiles_${sectionIds[0]}`;
  const a = await getAttrsAsync([`${prefix}_mdc`]);
  await setAttrsAsync({ default_mdc: a[`${prefix}_mdc`] });
  console.log(a);
});

on("change:repeating_profiles:mod_skillbonus", async (e) => {
  console.log("change:repeating_profiles:mod_skillbonus", e);
  await updateSkills();
});
