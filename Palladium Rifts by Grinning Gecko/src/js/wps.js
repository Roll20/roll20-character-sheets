async function addWpToBonuses(section, rowId, wpName) {
  console.log("addWpToBonuses", section, rowId);
  if (!section || !rowId || !wpName) {
    return;
  }
  const wpActions = WP_KEYS[section];
  const wpAttrs = wpActions.map(
    (action) => `repeating_${section}_${rowId}_${action}`
  );
  const wpCombatId = `repeating_${section}_${rowId}_bonus_id`;
  wpAttrs.push(wpCombatId);
  const a = await getAttrsAsync(wpAttrs);
  const attrs = {};
  let combatRowId;
  if (a[wpCombatId]) {
    combatRowId = a[wpCombatId];
  } else {
    combatRowId = generateRowID();
    attrs[wpCombatId] = combatRowId;
  }
  REPEATING_BONUS_KEYS.forEach((key) => {
    attrs[`repeating_bonuses_${combatRowId}_${key}`] =
      a[`repeating_${section}_${rowId}_${key}`] || 0;
  });
  await setAttrsAsync(attrs);
}

async function setWpRow(section, name, keyPrefix, level) {
  console.log("setWpRow", name, keyPrefix, level);
  const attrs = {};
  const levelBonuses = WP[name.toLowerCase()].slice(0, level);
  const totalBonuses = mergeAndAddObjects(levelBonuses);
  WP_KEYS[section].forEach((action) => {
    if (action == "name") return; // kick out on name
    const key = `${keyPrefix}_${action}`;
    attrs[key] = action in totalBonuses ? totalBonuses[action] : 0;
  });
  attrs[`${keyPrefix}_level`] = level;
  await setAttrsAsync(attrs);
}

async function setWp({
  section,
  wpName,
  newCharacterLevel,
  oldCharacterLevel,
  newWpLevel,
  rowId,
}) {
  console.log("setWp", {
    section,
    wpName,
    newCharacterLevel,
    oldCharacterLevel,
    newWpLevel,
    rowId,
  });
  const keyPrefix = rowId
    ? `repeating_${section}_${rowId}`
    : `repeating_${section}`;
  if (newWpLevel) {
    await setWpRow(section, wpName, keyPrefix, newWpLevel);
  } else if (!rowId) {
    await setWpRow(section, wpName, keyPrefix, newCharacterLevel);
  } else {
    const a = await getAttrsAsync([`${keyPrefix}_level`]);
    const oldWpLevel = a[`${keyPrefix}_level`];
    if (oldCharacterLevel) {
      const delta = oldCharacterLevel - oldWpLevel;
      if (delta != 0) {
        newWpLevel = newCharacterLevel - delta;
        await setWpRow(section, wpName, keyPrefix, newWpLevel);
      } else {
        await setWpRow(section, wpName, keyPrefix, newCharacterLevel);
      }
    } else {
      await setWpRow(section, wpName, keyPrefix, newCharacterLevel);
    }
  }
}

async function updateWeaponProficiencies(
  section,
  newCharacterLevel,
  oldCharacterLevel
) {
  const ids = await getSectionIDsAsync(section);
  const attrNames = ids.map((id) => `repeating_${section}_${id}_name`);
  const a = await getAttrsAsync(attrNames);
  for (rowId of ids) {
    await setWp({
      section,
      wpName: a[`repeating_${section}_${rowId}_name`].toLowerCase(),
      newCharacterLevel,
      oldCharacterLevel,
      rowId,
    });
  }
}

async function updateWeaponProficiency(section, source, newWpLevel) {
  const ids = await getSectionIDsAsync(section);
  const rowId = ids.find(
    (id) => `repeating_${section}_${id}_level`.toLowerCase() == source
  );
  const a = await getAttrsAsync([`repeating_${section}_${rowId}_name`]);
  const wpName = a[`repeating_${section}_${rowId}_name`];
  await setWp({ section, wpName, newWpLevel, rowId });
  await addWpToBonuses(section, rowId, wpName);
}

on("change:repeating_wp:level change:repeating_wpmodern:level", async (e) => {
  const section = e.sourceAttribute.split("_")[1];
  await updateWeaponProficiency(section, e.sourceAttribute, e.newValue);
});

on("change:repeating_wp:name change:repeating_wpmodern:name", async (e) => {
  console.log("change:repeating_wp:name change:repeating_wpmodern:name", e);
  const [r, section, rowId, attr] = e.sourceAttribute.split("_");
  const wpName = e.newValue.toLowerCase();
  const wpLevelKey = `${r}_${section}_${rowId}_level`;
  setAttrs({ [`${r}_${section}_${rowId}_rowid`]: `${r}_${section}_${rowId}` });
  const a = await getAttrsAsync(["character_level", wpLevelKey]);
  if (Boolean(a[wpLevelKey]) && +a[wpLevelKey] != 0) {
    await setWp({ section, wpName, rowId, newWpLevel: a[wpLevelKey] });
    await addWpToBonuses(section, rowId, wpName);
  } else {
    const attrs = {};
    attrs[`${r}_${section}_${rowId}_level`] = a.character_level;
    await setAttrsAsync(attrs);
  }
});
