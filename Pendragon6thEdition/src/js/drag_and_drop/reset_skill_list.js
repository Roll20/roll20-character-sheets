const resetSkillList = (npcSkills) => {
  const update = {};
  const addSkill = (skill) => (update[skill] = 0);

  if (npcSkills) {
    const skillList = parseJSON(npcSkills);
    const names = skillList.map(({ name }) => name?.toLowerCase());
    [...skills, ...combatSkills].forEach((skill) => {
      if (!names.includes(skill)) {
        addSkill(skill);
      }
    });
  } else {
    [...skills, ...combatSkills].forEach((skill) => addSkill(skill));
  }

  setAttrs(update);
};
