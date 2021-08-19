async function applyDamageToNextActiveArmor(section, currentRowId, damage) {
  console.log("applyDamageToNextActiveArmor", section, currentRowId, damage);
  const ids = await getSectionIDsOrderedAsync(section);
  const attrKeys = ids.flatMap((id) => [
    `repeating_${section}_${id}_is_active`,
    `repeating_${section}_${id}_currentmdc`,
  ]);
  const attrs = {};
  attrs[`repeating_${section}_${currentRowId}_currentmdc`] = 0;
  const a = await getAttrsAsync(attrKeys);
  let next = false;
  let nextCurrentMdc = false;
  for (const id of ids) {
    if (id == currentRowId) {
      next = true;
      continue;
    }
    if (next && Boolean(Number(a[`repeating_${section}_${id}_is_active`]))) {
      nextCurrentMdc = +a[`repeating_${section}_${id}_currentmdc`] - damage;
      attrs[`repeating_${section}_${id}_currentmdc`] = nextCurrentMdc;
      break;
    }
  }
  if (nextCurrentMdc === false) {
    nextCurrentMdc =
      +a[`repeating_${section}_${currentRowId}_currentmdc`] - damage;
    attrs[`repeating_${section}_${currentRowId}_currentmdc`] = nextCurrentMdc;
  }
  await setAttrsAsync(attrs);
}

on("clicked:repeating_armor:applydamage", async (e) => {
  console.log("clicked:repeating_armor:applydamage", e);
  const [r, section, rowId] = e.sourceAttribute.split("_");
  const a = await getAttrsAsync([
    `repeating_armor_${rowId}_currentmdc`,
    `repeating_armor_${rowId}_damage`,
  ]);
  let currentMdc =
    +a[`repeating_armor_${rowId}_currentmdc`] -
    +a[`repeating_armor_${rowId}_damage`];
  if (currentMdc < 0) {
    const [r, section, rowId] = e.sourceAttribute.split("_");
    // apply to next active in line
    // if there is no next in line, show as negative
    await applyDamageToNextActiveArmor(
      section,
      rowId.toLowerCase(),
      Math.abs(currentMdc)
    );
  } else {
    await setAttrsAsync({
      [`repeating_armor_${rowId}_currentmdc`]: currentMdc,
    });
  }
});

on("clicked:repeating_armor:resetmdc", async (e) => {
  console.log("clicked:repeating_armor:resetmdc", e);
  const [r, section, rowId] = e.sourceAttribute.split("_");
  const a = await getAttrsAsync([`repeating_armor_${rowId}_basemdc`]);
  await setAttrsAsync({
    [`repeating_armor_${rowId}_currentmdc`]:
      a[`repeating_armor_${rowId}_basemdc`],
  });
});
