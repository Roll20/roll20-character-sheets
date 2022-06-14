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
  /**
   * These values shouldn't be accumulated.
   */
  const nonActions = ["name", "level", "levelacquired"];
  WP_KEYS[section].forEach((action) => {
    if (nonActions.includes(action)) {
      return;
    }
    const key = `${keyPrefix}_${action}`;
    attrs[key] = action in totalBonuses ? totalBonuses[action] : 0;
  });
  await setAttrsAsync(attrs);
}

async function setWp({ section, rowId, rowPrefix }) {
  const attrKeys = [
    `${rowPrefix}_name`,
    `${rowPrefix}_levelacquired`,
    `character_level`,
  ];
  const a = await getAttrsAsync(attrKeys);
  console.log(a);
  const level = +a[`character_level`] - +a[`${rowPrefix}_levelacquired`] + 1;
  await setAttrsAsync({ [`${rowPrefix}_level`]: level }, { silent: true });

  const lowerCaseName = a[`${rowPrefix}_name`].toLowerCase();
  if (Object.keys(WP).includes(lowerCaseName)) {
    // pre-defined WP
    await setWpRow(section, lowerCaseName, rowPrefix, level);
  } else {
    // user-defined
    await addModifierToBonusesAsync(section, rowId);
  }
  await addWpToBonuses(section, rowId, lowerCaseName);
}

on("change:repeating_wp change:repeating_wpmodern", async (e) => {
  console.log("change:repeating_wp change:repeating_wpmodern", e);
  const sourceParts = e.sourceAttribute.split("_");
  const [r, section, rowId] = sourceParts;
  const rowPrefix = `${r}_${section}_${rowId}`;

  const isNew = await isNewRow(e);
  if (isNew) {
    await setRowDefaults(e, { silent: true });
  }
  console.log("isNew", isNew);

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

  await setWp({ section, rowId, rowPrefix });
});

/**
 * This is called by the level up function.
 * @param {*} section
 */
async function updateWeaponProficiencies(section) {
  const ids = await getSectionIDsAsync(section);
  const attrNames = ids.map((id) => `repeating_${section}_${id}_name`);
  const a = await getAttrsAsync(attrNames);
  for (rowId of ids) {
    const rowPrefix = `repeating_${section}_${rowId}`;
    await setWp({ section, rowId, rowPrefix });
  }
}
