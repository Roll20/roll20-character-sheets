async function deductRoundsFromNextActiveAmmo(section, rounds) {
  console.log("deductRoundsFromNextActiveAmmo", section, rounds);
  const ids = await getSectionIDsOrderedAsync(section);
  const attrKeys = ids
    .flatMap((id) => [
      `repeating_${section}_${id}_is_active`,
      `repeating_${section}_${id}_clip`,
      `repeating_${section}_${id}_name`,
    ]);
  const attrs = {};
  const a = await getAttrsAsync(attrKeys);
  
  let ammoCarry = rounds;
  let currentRounds = false;

  const activeIds = ids.reduce((acc, cur) => {
    if (Boolean(Number(a[`repeating_${section}_${cur}_is_active`]))) {
      acc.push(cur);
    }
    return acc;
  }, []);

  console.log("deductRoundsFromNextActiveAmmo", a, activeIds);

  let i = 0;
  let activeRowId;
  for (activeRowId of activeIds) {
    currentRounds = Number(a[`repeating_${section}_${activeRowId}_clip`]) - ammoCarry;
    console.log("deductRoundsFromNextActiveAmmo currentRounds", currentRounds, ammoCarry);
    if (currentRounds < 0 && ++i < activeIds.length) {
      console.log(
        "deductRoundsFromNextActiveAmmo",
        "BELOW ZERO on " + activeRowId
      );
      attrs[`repeating_${section}_${activeRowId}_clip`] = 0;
      ammoCarry = Math.abs(currentRounds);
    } else {
      attrs[`repeating_${section}_${activeRowId}_clip`] = currentRounds;
      break;
    }
  }
  await setAttrsAsync(attrs);
  // await updateActiveArmor(activeRowId);
  return {
    currentRounds,
    ammo_name: a[`repeating_${section}_${activeRowId}_name`],
  };
}

on("clicked:ammodeductrounds", async (e) => {
  console.log("clicked:ammodeductrounds", e);
  const a = await getAttrsAsync([
    `ammorounds`,
    `character_name`,
    `outputusage`,
  ]);
  const { currentRounds, ammo_name } = await deductRoundsFromNextActiveAmmo(
    "ammo",
    +a[`ammorounds`]
  );
  const outputUsage = Boolean(Number(a.outputusage));
  if (outputUsage) {
    // const b = await getAttrsAsync([`active_armor_mdc`, `active_armor_name`]);
    const chat = await startRoll(
      `@{opt_whisper}&{template:ammo} {{character_name=${a["character_name"]}}} {{spent=${a["ammorounds"]}}} {{name=${ammo_name}}} {{remaining=${currentRounds}}}`
    );
    finishRoll(chat.rollId);
  }
});

on("clicked:repeating_ammo:resetclip", async (e) => {
  console.log("clicked:repeating_ammo:resetclip", e);
  const [r, section, rowId] = e.sourceAttribute.split("_");
  const a = await getAttrsAsync([`repeating_ammo_${rowId}_roundsperclip`]);
  await setAttrsAsync({
    [`repeating_ammo_${rowId}_clip`]: a[`repeating_ammo_${rowId}_roundsperclip`],
  });
  // await updateActiveArmor(rowId);
});
