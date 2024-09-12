const resetSkillList = (skills) => {
  const skillList = parseJSON(skills);
  const names = skillList.map(({ name }) => name.toLowerCase());
  const update = {};

  [...skills, ...combatSkills].forEach((skill) => {
    if (!names.includes(skill)) {
      update[skill] = 0;
    }
  });

  setAttrs(update);
};
