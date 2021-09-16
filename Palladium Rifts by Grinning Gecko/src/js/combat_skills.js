async function updateHandToHands(section, newCharacterLevel) {
  const ids = await getSectionIDsAsync(section);
  const attrNames = ids.map((id) => `repeating_${section}_${id}_name`);
  const a = await getAttrsAsync(attrNames);
  for (rowId of ids) {
    const rowPrefix = `repeating_${section}_${rowId}`;
    await calculateH2h(
      section,
      rowId,
      rowPrefix,
      a[`${rowPrefix}_name`],
      newCharacterLevel
    );
  }
}

async function calculateH2h(section, rowId, keyPrefix, name, level) {
  console.log("calculateH2h", name, keyPrefix, level);
  const attrs = {};
  const levelBonuses = H2H[name.toLowerCase()].slice(0, level);
  const totalBonuses = mergeAndAddObjects(levelBonuses);
  console.log(totalBonuses);
  for (const [key, val] of Object.entries(totalBonuses)) {
    attrs[`${keyPrefix}_${key}`] = val;
  }
  attrs[`${keyPrefix}_level`] = level;
  console.log(attrs);
  await setAttrsAsync(attrs);
  await addModifierToBonusesAsync(section, rowId);
}

on("change:repeating_h2h", (e) => {
  /**
   * Allow player-updated fields, but handle name and level elsewhere
   */
  const [r, section, rowId] = e.sourceAttribute.split("_");
  if (
    e.sourceType === "sheetworker" ||
    e.sourceAttribute.endsWith(`${rowId}_name`) ||
    e.sourceAttribute.endsWith(`${rowId}_level`)
  ) {
    return;
  }
  console.log("change:repeating_h2h", e);
});

on("change:repeating_h2h:name change:repeating_h2h:level", async (e) => {
  console.log("change:repeating_h2h:name change:repeating_h2h:level", e);
  const [r, section, rowId] = e.sourceAttribute.split("_");
  const rowPrefix = `repeating_${section}_${rowId}`;
  const { [`${rowPrefix}_level`]: level, [`${rowPrefix}_name`]: h2hName } =
    await getAttrsAsync([`${rowPrefix}_level`, `${rowPrefix}_name`]);
  await calculateH2h(section, rowId, rowPrefix, h2hName, +level);
});
