async function applyDamageToNextActiveArmor(section, damage) {
  console.log("applyDamageToNextActiveArmor", section, damage);
  const ids = await getSectionIDsOrderedAsync(section);
  const attrKeys = ids
    .flatMap((id) => [
      `repeating_${section}_${id}_is_active`,
      `repeating_${section}_${id}_mdc`,
    ])
    .concat(["outputarmorwarnings"]);
  const attrs = {};
  const a = await getAttrsAsync(attrKeys);
  let damageCarry = damage;
  // let nextCurrentMdc = false;
  let currentMdc = false;

  const activeIds = ids.reduce((acc, cur) => {
    if (Boolean(Number(a[`repeating_${section}_${cur}_is_active`]))) {
      acc.push(cur);
    }
    return acc;
  }, []);

  let i = 0;
  let activeRowId;
  for (activeRowId of activeIds) {
    currentMdc = +a[`repeating_${section}_${activeRowId}_mdc`] - damageCarry;
    if (currentMdc < 0 && ++i < activeIds.length) {
      console.log(
        "applyDamageToNextActiveArmor",
        "BELOW ZERO on " + activeRowId
      );
      const { character_name: characterName } = await getAttrsAsync([
        "character_name",
      ]);
      if (Boolean(Number(a["outputarmorwarnings"]))) {
        const warning = await startRoll(
          `${characterName} is taking damage to their last layer!`
        );
        finishRoll(warning.rollId);
      }
      attrs[`repeating_${section}_${activeRowId}_mdc`] = 0;
      damageCarry = Math.abs(currentMdc);
    } else {
      attrs[`repeating_${section}_${activeRowId}_mdc`] = currentMdc;
      break;
    }
  }
  await setAttrsAsync(attrs);
  await updateActiveArmor(activeRowId);
  return currentMdc;
}

/**
 * Updates the global active_armor attributes with the values
 * from the currently active repeating armor row
 * @param {string} rowId Row ID of the active armor row
 */
async function updateActiveArmor(rowId) {
  console.log("updateActiveArmor", ARMOR_KEYS.length);
  const attrKeys = ARMOR_KEYS.map((key) => `repeating_armor_${rowId}_${key}`);
  const a = await getAttrsAsync(attrKeys);
  const attrs = ARMOR_KEYS.reduce((acc, cur) => {
    if (a[`repeating_armor_${rowId}_${cur}`] !== undefined) {
      if (cur === "mdc") {
        acc[`active_armor_mdc`] = a[`repeating_armor_${rowId}_${cur}`];
      } else if (cur === "mdc_max") {
        acc[`active_armor_mdc_max`] = a[`repeating_armor_${rowId}_${cur}`];
      } else {
        acc[`active_armor_${cur}`] = a[`repeating_armor_${rowId}_${cur}`];
        acc[`active_armor_${cur}_max`] = a[`repeating_armor_${rowId}_${cur}`];
      }
    }
    return acc;
  }, {});
  console.log(attrs);
  await setAttrsAsync(attrs);
}

on("change:repeating_armor:movementpenalty", async (e) => {
  await recalculateMovement();
});

on("clicked:armorapplydamage", async (e) => {
  console.log("clicked:armorapplydamage", e);
  const a = await getAttrsAsync([
    `armordamage`,
    `character_name`,
    `active_armor_mdc`,
    `active_armor_name`,
    `outputusage`,
  ]);
  const currentMdc = await applyDamageToNextActiveArmor(
    "armor",
    +a[`armordamage`]
  );
  const outputUsage = Boolean(Number(a.outputusage));
  if (outputUsage) {
    // const b = await getAttrsAsync([`active_armor_mdc`, `active_armor_name`]);
    const chat = await startRoll(
      `@{opt_whisper}&{template:damage} {{character_name=${
        a["character_name"]
      }}} {{spent=${a["armordamage"]}}} {{name=${
        a[`active_armor_name`]
      }}} {{remaining=${currentMdc}}}`
    );
    finishRoll(chat.rollId);
  }
});

on("clicked:repeating_armor:resetmdc", async (e) => {
  console.log("clicked:repeating_armor:resetmdc", e);
  const [r, section, rowId] = e.sourceAttribute.split("_");
  const a = await getAttrsAsync([`repeating_armor_${rowId}_mdc_max`]);
  await setAttrsAsync({
    [`repeating_armor_${rowId}_mdc`]: a[`repeating_armor_${rowId}_mdc_max`],
  });
  await updateActiveArmor(rowId);
});

on("change:repeating_armor:is_active", async (e) => {
  await recalculateMovement();
  await applyDamageToNextActiveArmor("armor", 0);
});
