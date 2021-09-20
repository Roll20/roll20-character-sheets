async function updateSkillOld(rowId, iqBonusKey = "iq_bonus") {
  const additionalModifiers = [iqBonusKey];

  const profileMeta = await getAttrsAsync(["default_profile"]);
  let profileSkillBonusKey = "";
  if (profileMeta["default_profile"]) {
    profileSkillBonusKey = `repeating_profiles_${profileMeta["default_profile"]}_mod_skillbonus`;
    additionalModifiers.push(profileSkillBonusKey);
  }

  const row = `repeating_skills_${rowId}`;
  const skillAttrs = SKILL_KEYS.map((key) => `${row}_${key}`);
  const a = await getAttrsAsync(skillAttrs.concat(additionalModifiers));
  const attrs = {};
  const total =
    +a[`${row}_base`] +
    +a[iqBonusKey] +
    (+a[profileSkillBonusKey] || 0) +
    +a[`${row}_bonus`] +
    (+a[`${row}_level`] - 1) * +a[`${row}_perlevel`];
  attrs[`${row}_total`] = total;
  await setAttrsAsync(attrs);
}

async function updateSkill(rowId) {
  const row = `repeating_skills_${rowId}`;
  const keys = SKILL_KEYS.map((key) => `${row}_${key}`).concat([
    "default_profile",
  ]);
  console.log("keys", keys);
  const a = await getAttrsAsync(keys);
  console.log(a);

  const iqBonusKey = `repeating_profiles_${a["default_profile"]}_mod_iq_bonus`;
  const skillBonusKey = `repeating_profiles_${a["default_profile"]}_mod_skillbonus`;
  const profileKeys = [iqBonusKey, skillBonusKey];
  console.log("profileKeys", profileKeys);
  const profileBonuses = await getAttrsAsync(profileKeys);
  console.log(profileBonuses);

  const total =
    +a[`${row}_base`] +
    +a[`${row}_bonus`] +
    (+a[`${row}_level`] - 1) * +a[`${row}_perlevel`] +
    (+profileBonuses[iqBonusKey] || 0) +
    (+profileBonuses[skillBonusKey] || 0);
  console.log("total", total);
  await setAttrsAsync({ [`${row}_total`]: total });
}

async function updateSkillsOld() {
  const ids = await getSectionIDsAsync("skills");
  for (const id of ids) {
    await updateSkill(id);
  }
}

async function updateSkills() {
  console.log("updateSkills");
  const ids = await getSectionIDsAsync("skills");
  const keys = ids
    .reduce((acc, cur) => {
      const row = `repeating_skills_${cur}`;
      const skillKeys = SKILL_KEYS.map((key) => `${row}_${key}`);
      return acc.concat(skillKeys);
    }, [])
    .concat(["default_profile"]);
  console.log("keys", keys);
  const a = await getAttrsAsync(keys);
  console.log("a", a);
  // calculate IQ bonus once we know the default_profile
  const iqBonusKey = `repeating_profiles_${a["default_profile"]}_mod_iq_bonus`;
  const skillBonusKey = `repeating_profiles_${a["default_profile"]}_mod_skillbonus`;
  const profileKeys = [iqBonusKey, skillBonusKey];
  console.log("profileKeys", profileKeys);
  const profileBonuses = await getAttrsAsync(profileKeys);
  console.log("profileBonuses", profileBonuses);
  const totals = ids.reduce((acc, cur) => {
    const row = `repeating_skills_${cur}`;
    const total =
      +a[`${row}_base`] +
      +a[`${row}_bonus`] +
      (+a[`${row}_level`] - 1) * +a[`${row}_perlevel`] +
      (+profileBonuses[iqBonusKey] || 0) +
      (+profileBonuses[skillBonusKey] || 0);
    acc[`${row}_total`] = total;
    return acc;
  }, {});
  console.log("totals", totals);
  await setAttrsAsync(totals);
}

async function updateSkillLevels(newCharacterLevel, oldCharacterLevel) {
  const delta = newCharacterLevel - oldCharacterLevel;
  const ids = await getSectionIDsAsync("skills");
  const attrNames = ids.map((id) => `repeating_skills_${id}_level`);
  const a = await getAttrsAsync(attrNames);
  const attrs = {};
  ids.forEach((id) => {
    attrs[`repeating_skills_${id}_level`] =
      +a[`repeating_skills_${id}_level`] + delta;
  });
  await setAttrsAsync(attrs);
}

on("change:repeating_skills", async (e) => {
  console.log("change:repeating_skills", e);
  if (e.sourceType === "sheetworker") return;
  if (e.sourceAttribute.endsWith("_name")) return;
  const sourceParts = e.sourceAttribute.split("_");
  // Return if no attribute is changed and it's the row itself
  if (sourceParts.length < 4) return;
  const [r, section, rowId] = sourceParts;
  await updateSkill(rowId);
});

on("change:repeating_skills:name", async (e) => {
  const [r, section, rowId, attr] = e.sourceAttribute.split("_");
  const a = await getAttrsAsync(["character_level"]);
  console.log(a);
  const attrs = {
    [`${r}_${section}_${rowId}_level`]: a.character_level,
    [`${r}_${section}_${rowId}_rowid`]: `repeating_${section}_${rowId}`,
  };
  console.log(attrs);
  await setAttrsAsync(attrs);
});
