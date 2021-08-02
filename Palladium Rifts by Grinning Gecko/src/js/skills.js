async function updateSkill(rowId, iqBonusKey = "iq_bonus") {
  const profilesIds = await getSectionIDsOrderedAsync("profiles");
  const defaultProfileSkillBonusKey = `repeating_profiles_${profilesIds[0]}_mod_skillbonus`;
  const row = `repeating_skills_${rowId}`;
  const skillAttrs = SKILL_KEYS.map((key) => `${row}_${key}`);
  const a = await getAttrsAsync(
    skillAttrs.concat([iqBonusKey, defaultProfileSkillBonusKey])
  );
  const attrs = {};
  const total =
    +a[`${row}_base`] +
    +a[iqBonusKey] +
    (+a[defaultProfileSkillBonusKey] || 0) +
    +a[`${row}_bonus`] +
    (+a[`${row}_level`] - 1) * +a[`${row}_perlevel`];
  attrs[`${row}_total`] = total;
  await setAttrsAsync(attrs);
}

async function updateSkills() {
  const ids = await getSectionIDsAsync("skills");
  for (const id of ids) {
    await updateSkill(id);
  }
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
