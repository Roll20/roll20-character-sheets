async function applyDamageToNextActiveArmor(section, currentRowId, damage) {
  console.log("applyDamageToNextActiveArmor", section, currentRowId, damage);
  const ids = await getSectionIDsOrderedAsync(section);
  const attrKeys = ids.flatMap((id) => [
    `repeating_${section}_${id}_is_active`,
    `repeating_${section}_${id}_currentmdc`,
  ]);
  console.log(attrKeys);
  const attrs = {};
  attrs[`repeating_${section}_${currentRowId}_currentmdc`] = 0;
  const a = await getAttrsAsync(attrKeys);
  console.log(a);
  let next = false;
  let nextCurrentMdc = false;
  console.log(ids);
  for (const id of ids) {
    console.log(id);
    if (id == currentRowId) {
      next = true;
      continue;
    }
    if (next && Boolean(Number(a[`repeating_${section}_${id}_is_active`]))) {
      console.log("here");
      nextCurrentMdc = +a[`repeating_${section}_${id}_currentmdc`] - damage;
      attrs[`repeating_${section}_${id}_currentmdc`] = nextCurrentMdc;
      break;
    }
  }
  console.log("done for", nextCurrentMdc);
  if (nextCurrentMdc === false) {
    nextCurrentMdc =
      +a[`repeating_${section}_${currentRowId}_currentmdc`] - damage;
    attrs[`repeating_${section}_${currentRowId}_currentmdc`] = nextCurrentMdc;
  }
  console.log(attrs);
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
    await applyDamageToNextActiveArmor(
      section,
      rowId.toLowerCase(),
      Math.abs(currentMdc)
    );
    // apply to next active in line
    // if there is no next in line, show as negative
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
  console.log(a);
  await setAttrsAsync({
    [`repeating_armor_${rowId}_currentmdc`]:
      a[`repeating_armor_${rowId}_basemdc`],
  });
});
