async function updateHandToHands(section) {
  const ids = await getSectionIDsAsync(section);
  const attrKeys = ids
    .reduce((keys, id) => {
      return keys.concat([
        `repeating_${section}_${id}_name`,
        `repeating_${section}_${id}_level`,
        `repeating_${section}_${id}_levelacquired`,
      ]);
    }, [])
    .concat(["character_level"]);

  // const attrNames = ids.map((id) => `repeating_${section}_${id}_name`);
  const a = await getAttrsAsync(attrKeys);
  for (rowId of ids) {
    const rowPrefix = `repeating_${section}_${rowId}`;
    const level = +a[`character_level`] - +a[`${rowPrefix}_levelacquired`] + 1;
    await calculateH2h(
      section,
      rowId,
      rowPrefix,
      a[`${rowPrefix}_name`].toLowerCase(),
      level
    );
  }
}

async function calculateH2h(section, rowId, keyPrefix, lowerCaseName, level) {
  console.log("calculateH2h", section, rowId, keyPrefix, lowerCaseName, level);
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
  console.log("change:repeating_h2h", e);
  const sourceParts = e.sourceAttribute.split("_");
  const [r, section, rowId] = sourceParts;
  const rowPrefix = `${r}_${section}_${rowId}`;

  const isNew = await isNewRow(e);
  if (isNew) {
    await setRowDefaults(e, { silent: true });
  }

  // Exit if the sheetworker was doing something other than increasing the level.
  if (e.sourceType === "sheetworker" && !e.sourceAttribute.endsWith("_level")) {
    return;
  }
  // Exit if only the name was changed.
  if (!isNew && e.sourceAttribute.endsWith("_name")) {
    return;
  }
  // Exit if no attribute was changed and it's the row itself.
  if (sourceParts.length < 4) {
    return;
  }

  const attrKeys = [
    `${rowPrefix}_name`,
    `${rowPrefix}_levelacquired`,
    `character_level`,
  ];
  const a = await getAttrsAsync(attrKeys);
  const level = +a[`character_level`] - +a[`${rowPrefix}_levelacquired`] + 1;
  await setAttrsAsync({ [`${rowPrefix}_level`]: level });

  const lowerCaseName = a[`${rowPrefix}_name`].toLowerCase();
  if (Object.keys(H2H).includes(lowerCaseName)) {
    // H2H is defined.
    await calculateH2h(section, rowId, rowPrefix, lowerCaseName, level);
  } else {
    // H2H is custom.
    await addModifierToBonusesAsync(section, rowId);
  }
});

on("remove:repeating_h2h", async (e) => {
  console.log("remove h2h", e);
  const bonusRowId = e.removedInfo[`${e.sourceAttribute}_bonus_id`];
  await removeBonusRowsAsync(bonusRowId);
});
