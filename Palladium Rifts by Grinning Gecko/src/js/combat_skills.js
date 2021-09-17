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
  const lowerCaseName = name.toLowerCase();
  if (!Object.keys(H2H).includes(lowerCaseName)) {
    // Exit if this isn't one of the pre-defined skills
    return;
  }
  const attrs = {};
  const levelBonuses = H2H[lowerCaseName].slice(0, level);
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

on("change:repeating_h2h", async (e) => {
  /**
   * Allow custom Hand to Hand
   */
  if (e.sourceType === "sheetworker") {
    return;
  }

  const [r, section, rowId] = e.sourceAttribute.split("_");
  const rowPrefix = `repeating_${section}_${rowId}`;
  const { [`${rowPrefix}_name`]: h2hName } = await getAttrsAsync([
    `${rowPrefix}_name`,
  ]);
  const lowerCaseName = h2hName.toLowerCase();
  if (Object.keys(H2H).includes(lowerCaseName)) {
    return;
  }

  console.log("change:repeating_h2h", e);
  await addModifierToBonusesAsync(section, rowId);
});

on("change:repeating_h2h:name change:repeating_h2h:level", async (e) => {
  console.log("change:repeating_h2h:name change:repeating_h2h:level", e);
  const [r, section, rowId] = e.sourceAttribute.split("_");
  const rowPrefix = `repeating_${section}_${rowId}`;
  const { [`${rowPrefix}_level`]: level, [`${rowPrefix}_name`]: h2hName } =
    await getAttrsAsync([`${rowPrefix}_level`, `${rowPrefix}_name`]);
  await calculateH2h(section, rowId, rowPrefix, h2hName, +level);
});
