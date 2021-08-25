async function applyDamageToNextActiveArmor(section, damage) {
  console.log("applyDamageToNextActiveArmor", section, damage);
  const ids = await getSectionIDsOrderedAsync(section);
  const attrKeys = ids.flatMap((id) => [
    `repeating_${section}_${id}_is_active`,
    `repeating_${section}_${id}_currentmdc`,
  ]);
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
  for (const id of activeIds) {
    currentMdc = +a[`repeating_${section}_${id}_currentmdc`] - damageCarry;
    if (currentMdc < 0 && ++i < activeIds.length) {
      attrs[`repeating_${section}_${id}_currentmdc`] = 0;
      damageCarry = Math.abs(currentMdc);
    } else {
      attrs[`repeating_${section}_${id}_currentmdc`] = currentMdc;
      break;
    }
  }
  await setAttrsAsync(attrs);
}

on("change:repeating_armor:movementpenalty", async (e) => {
  recalculateMovement();
});

on("clicked:armorapplydamage", async (e) => {
  console.log("clicked:armorapplydamage", e);
  const a = await getAttrsAsync([`armordamage`]);
  await applyDamageToNextActiveArmor("armor", +a[`armordamage`]);
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

on("change:repeating_armor:is_active", (e) => recalculateMovement());
