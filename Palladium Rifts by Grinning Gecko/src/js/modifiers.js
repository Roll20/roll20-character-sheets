/**
 * User adds a thing to repeating_modifiers
 * -> addModifierToBonuses
 * -> triggers "change:repeating_bonuses:name"
 * -> addBonusToSelections
 */

async function addModifierToBonusesAsync(section, rowId) {
  console.log("addModifierToBonusesAsync", section, rowId);
  if (!section || !rowId) {
    return;
  }

  const thingBonusId = `repeating_${section}_${rowId}_bonus_id`;
  const thingAttrs = REPEATING_BONUS_KEYS.map(
    (key) => `repeating_${section}_${rowId}_${key}`
  );
  thingAttrs.push(thingBonusId);
  const a = await getAttrsAsync(thingAttrs);
  console.log("addModifierToBonusesAsync a", a);
  const attrs = {};
  let bonusRowId;
  if (a[thingBonusId]) {
    bonusRowId = a[thingBonusId];
  } else {
    bonusRowId = generateRowID();
    attrs[thingBonusId] = bonusRowId;
  }
  const existingAttrs = await getAttrsAsync(
    REPEATING_BONUS_KEYS.map((key) => `repeating_bonuses_${bonusRowId}_${key}`)
  );
  console.log("addModifierToBonusesAsync existingAttrs", existingAttrs);
  REPEATING_BONUS_KEYS.forEach((key) => {
    // If the modifier key doesn't exist, don't update.
    if (!a[`repeating_${section}_${rowId}_${key}`]) {
      return;
    }

    // If the values are equal, don't update.
    if (
      existingAttrs[`repeating_bonuses_${bonusRowId}_${key}`] &&
      existingAttrs[`repeating_bonuses_${bonusRowId}_${key}`] ===
        a[`repeating_${section}_${rowId}_${key}`]
    ) {
      return;
    }

    // If the key already exists and the value is effectively null on both sides, don't update it.
    if (
      existingAttrs[`repeating_bonuses_${bonusRowId}_${key}`] &&
      (existingAttrs[`repeating_bonuses_${bonusRowId}_${key}`] === 0 ||
        existingAttrs[`repeating_bonuses_${bonusRowId}_${key}`] === "0" ||
        existingAttrs[`repeating_bonuses_${bonusRowId}_${key}`] === "") &&
      (a[`repeating_${section}_${rowId}_${key}`] === 0 ||
        a[`repeating_${section}_${rowId}_${key}`] === "0" ||
        a[`repeating_${section}_${rowId}_${key}`] === "")
    ) {
      return;
    }

    // If the key doesn't already exist and the value is effectively null, don't create it.
    if (
      !existingAttrs[`repeating_bonuses_${bonusRowId}_${key}`] &&
      (a[`repeating_${section}_${rowId}_${key}`] === 0 ||
        a[`repeating_${section}_${rowId}_${key}`] === "0" ||
        a[`repeating_${section}_${rowId}_${key}`] === "")
    ) {
      return;
    }

    attrs[`repeating_bonuses_${bonusRowId}_${key}`] =
      a[`repeating_${section}_${rowId}_${key}`] || "";
  });
  console.log("addModifierToBonusesAsync attrs", attrs);
  await setAttrsAsync(attrs);
}

on(
  "change:repeating_modifiers \
  change:repeating_powersabilities \
  change:repeating_magic \
  change:repeating_psionics",
  async (e) => {
    console.log("change:repeating_modifiers", e);
    const sourceParts = e.sourceAttribute.split("_");
    if (
      e.sourceAttribute.endsWith("_bonus_id") ||
      e.sourceAttribute.endsWith("_rowid") ||
      e.sourceAttribute.endsWith("_addtobonuses") ||
      e.sourceAttribute.endsWith("_description") ||
      sourceParts.length < 4
    ) {
      return;
    }
    const [r, section, rowId] = sourceParts;
    await setAttrsAsync({
      [`${r}_${section}_rowid`]: `${r}_${section}_${rowId}_`,
    });
    if (section == "modifiers") {
      await addModifierToBonusesAsync(section, rowId);
    } else {
      const addToBonusesKey = `${r}_${section}_${rowId}_addtobonuses`;
      const a = await getAttrsAsync([addToBonusesKey]);
      const addToBonuses = Boolean(Number(a[addToBonusesKey]));
      if (addToBonuses) {
        await addModifierToBonusesAsync(section, rowId);
      }
    }
  }
);

on(
  "remove:repeating_modifiers \
  remove:repeating_powersabilities \
  remove:repeating_magic \
  remove:repeating_psionics",
  async (e) => {
    console.log("remove:repeating_modifiers", e);
    // remove repeating_bonusselections row with the same index
    const bonusRowId = e.removedInfo[`${e.sourceAttribute}_bonus_id`];
    await removeBonusRowsAsync(bonusRowId);
  }
);
