const handle_npc = (page) => {
  const attrs = [
    "size",
    "dexterity",
    "strength",
    "constitution",
    "appearance",
    "type",
    "hit_points",
    "knockdown",
    "major_wound",
    "unconscious",
    "movement",
    "armor_points",
    "current_glory",
    "healing_rate",
    "glory_award",
    "description",
    "movement  ",
    "valorous modifier",
  ];

  const update = getStaticUpdate(attrs, page);

  update["character_name"] = page.name;
  update["sheet_type"] = "npc";
  update["flag_description"] = false;

  ["equipment", "arms", "abilities"].forEach((section) => {
    const data = page.data[section];
    if (data) {
      const sectionUpdate = processDataArrays(data, (data) =>
        update_item(data, getRow(section))
      );
      Object.assign(update, sectionUpdate);
    } else update[`hide_${section}`] = "on";
  });

  if (page.data.attacks) {
    const attacks = processDataArrays(page.data.attacks, (data) =>
      update_attack(data)
    );
    Object.assign(update, attacks);

    const parsed = parseJSON(page.data.attacks);
    const attackSkills = parsed
      .filter(({ skill, target_value }) => skill && target_value)
      .map(({ skill, target_value }) => ({
        name: skill.toLowerCase(),
        target_value,
      }));

    if (attackSkills.length > 0) {
      const askills = update_mix_section(attackSkills, "skills", combatSkills);
      Object.assign(update, askills);
    }
  } else {
    update["hide_attacks"] = "on";
  }

  if (page.data.skills) {
    const dataSkills = update_mix_section(
      page.data.skills,
      "skills",
      combatSkills
    );
    Object.assign(update, dataSkills);
  } else {
    update["hide_skills"] = "on";
  }

  if (page.data.passions) {
    const passions = processDataArrays(
      page.data.passions,
      updateSection("passions")
    );
    Object.assign(update, passions);
  } else {
    update["hide_passions"] = "on";
  }

  if (page.data.traits) {
    const dataTraits = update_mix_section(page.data.traits, "traits", traits);
    Object.entries(personalityTraits).forEach(([positive, negative]) => {
      const keys = Object.keys(dataTraits);
      if (keys.includes(positive) && !keys.includes(negative)) {
        const targetValue = dataTraits[positive];
        dataTraits[negative] = 20 - targetValue;
      } else if (!keys.includes(positive) && keys.includes(negative)) {
        const targetValue = dataTraits[negative];
        dataTraits[positive] = 20 - targetValue;
      } else if (!keys.includes(positive) && !keys.includes(negative)) {
        dataTraits[positive] = 10;
        dataTraits[negative] = 10;
      }
    });

    Object.assign(update, dataTraits);
  } else {
    update["hide_personality_traits"] = "on";
  }

  setAttrs(update, {
    silent: true,
  });
};
