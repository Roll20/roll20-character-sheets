on("clicked:repeating_magic:usespell", async (e) => {
  console.log(e);
  const a = await getAttrsAsync(["repeating_magic_ppecost", "currentppe"]);
  console.log(a);
  await setAttrsAsync({ currentppe: a.currentppe - a.repeating_magic_ppecost });
});

on("clicked:resetppe", async (e) => {
  console.log(e);
  const sectionIds = await getSectionIDsOrderedAsync("profiles");
  const attrs = [`repeating_profiles_${sectionIds[0]}_ppe`];
  const a = await getAttrsAsync(attrs);
  await setAttrsAsync({
    currentppe: +a[`repeating_profiles_${sectionIds[0]}_ppe`],
  });
});

on("clicked:repeating_psionics:usepsionic", async (e) => {
  console.log(e);
  const a = await getAttrsAsync(["repeating_psionics_ispcost", "currentisp"]);
  console.log(a);
  await setAttrsAsync({
    currentisp: a.currentisp - a.repeating_psionics_ispcost,
  });
});

on("clicked:resetisp", async (e) => {
  console.log(e);
  const sectionIds = await getSectionIDsOrderedAsync("profiles");
  const attrs = [`repeating_profiles_${sectionIds[0]}_isp`];
  const a = await getAttrsAsync(attrs);
  await setAttrsAsync({
    currentisp: +a[`repeating_profiles_${sectionIds[0]}_isp`],
  });
});

async function calculateRangeDuration(row) {
  console.log("calculateRangeDuration", row);
  const attrNames = ["starting", "per_level", "unit"].map(
    (subProp) => `${row}_${subProp}`
  );
  console.log(attrNames);
  const a = await getAttrsAsync(attrNames.concat(["character_level"]));
  console.log(a);
  const value =
    +a[`${row}_starting`] + (+a.character_level - 1) * +a[`${row}_per_level`];
  const unit = a[`${row}_unit`];
  const valueWithUnits = `${value} ${unit}`;
  await setAttrsAsync({ [row]: valueWithUnits });
}

async function calculatePercentage(row) {
  const attrNames = ["starting", "per_level"].map(
    (subProp) => `${row}_${subProp}`
  );
  const a = await getAttrsAsync(attrNames.concat(["character_level"]));
  console.log(a);
  const value =
    +a[`${row}_starting`] + (+a.character_level - 1) * +a[`${row}_per_level`];
  await setAttrsAsync({ [row]: value });
}

async function calculateDamage(row) {
  const attrNames = ["starting", "per_level", "unit"].map(
    (subProp) => `${row}_${subProp}`
  );
  const a = await getAttrsAsync(attrNames.concat(["character_level"]));
  console.log(a);
  const perLevel = a[`${row}_per_level`];
  const repeats = perLevel ? `+${perLevel}`.repeat(a.character_level - 1) : "";
  const value = `${a[`${row}_starting`]}${repeats}`;
  await setAttrsAsync({ [row]: value });
}

async function updateMagicPsionicsLevels() {
  for (const section of ABILITIES_REPEATERS) {
    const ids = await getSectionIDsAsync(section);
    for (const id of ids) {
      const row = `repeating_${section}_${id}`;
      console.log("updateMagicPsionicsLevels", row);
      await calculateDamage(`${row}_damage`);
      await calculatePercentage(`${row}_percentage`);
      await calculateRangeDuration(`${row}_range`);
      await calculateRangeDuration(`${row}_duration`);
      await calculateRangeDuration(`${row}_frequency`);
      await calculateRangeDuration(`${row}_dc`);
    }
  }
}

const nameListeners = ABILITIES_REPEATERS.map(
  (repeater) => `change:repeating_${repeater}:name`
).join(" ");

const damageListeners = ABILITIES_REPEATERS.reduce((acc, cur) => {
  acc.push(`change:repeating_${cur}:damage_starting`);
  acc.push(`change:repeating_${cur}:damage_unit`);
  acc.push(`change:repeating_${cur}:damage_per_level`);
  return acc;
}, []).join(" ");

const percentageListeners = ABILITIES_REPEATERS.reduce((acc, cur) => {
  acc.push(`change:repeating_${cur}:percentage_starting`);
  acc.push(`change:repeating_${cur}:percentage_per_level`);
  return acc;
}, []).join(" ");

const rangeDurationFrequencyDcListeners = ABILITIES_REPEATERS.reduce(
  (acc, cur) => {
    ["range", "duration", "frequency", "dc"].forEach((property) => {
      acc.push(`change:repeating_${cur}:${property}_starting`);
      acc.push(`change:repeating_${cur}:${property}_unit`);
      acc.push(`change:repeating_${cur}:${property}_per_level`);
    });
    return acc;
  },
  []
).join(" ");

on(damageListeners, async (e) => {
  console.log(e);
  const [r, section, rowId] = e.sourceAttribute.split("_");
  const row = `${r}_${section}_${rowId}_damage`;
  await calculateDamage(row);
});

on(percentageListeners, async (e) => {
  console.log(e);
  const [r, section, rowId] = e.sourceAttribute.split("_");
  const row = `${r}_${section}_${rowId}_percentage`;
  await calculatePercentage(row);
});

on(rangeDurationFrequencyDcListeners, async (e) => {
  console.log(e);
  const [r, section, rowId, property] = e.sourceAttribute.split("_");
  const row = `${r}_${section}_${rowId}_${property}`;
  await calculateRangeDuration(row);
});

on(nameListeners, async (e) => {
  const [r, section, rowId] = e.sourceAttribute.split("_");
  const attrs = {};
  attrs[`${r}_${section}_rowid`] = `${r}_${section}_${rowId}_`;
  await setAttrsAsync(attrs);
});

on(
  "change:repeating_powersabilities:addtobonuses \
  change:repeating_magic:addtobonuses \
  change:repeating_psionics:addtobonuses",
  async (e) => {
    console.log("change:repeating_powersabilities:addtobonuses", e);
    const [r, section, rowId] = e.sourceAttribute.split("_");
    const enabled = Boolean(Number(e.newValue));
    if (enabled) {
      addModifierToBonusesAsync(section, rowId);
    } else {
      const a = await getAttrsAsync([`${r}_${section}_${rowId}_bonus_id`]);
      await removeBonusRowsAsync(a[`${r}_${section}_${rowId}_bonus_id`]);
    }
  }
);

on(
  "change:repeating_powersabilities:dc \
  change:repeating_magic:dc \
  change:repeating_psionics:dc",
  async (e) => {
    const [r, section, rowId] = e.sourceAttribute.split("_");
    const prefix = `${r}_${section}_${rowId}`;
    const a = await getAttrsAsync([`${prefix}_dc_unit`]);
    const unit = a[`${prefix}_dc_unit`].toLowerCase();
    if (unit == "sdc" || unit == "mdc") {
      const value = parseInt(e.newValue);
      const attrs = { [`${prefix}_${unit}`]: value };
      await setAttrsAsync(attrs);
    }
  }
);

on("change:psionic_ability", (e) => {
  console.log("change:psionic_ability", e);
});
