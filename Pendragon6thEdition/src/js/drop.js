const dropWarning = (v) => {
  console.log(
    `%c Pendragon 6th Edition: ${v}`,
    "color: orange; font-weight:bold"
  );
};

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
  ];

  const update = getStaticUpdate(attrs, page);

  update["character_name"] = page.name;
  update["sheet_type"] = "npc";
  update["flag_description"] = false;

  console.log(page.data);

  //TODO: handle all repeating sections
  setAttrs(update, {
    silent: true,
  });
};

const handle_equipment = (page) => handle_item(page, getRow("equipment"));

const handle_arms = (page) => handle_item(page, getRow("arms"));

const handle_character = (page) => {
  const attrs = [
    "appearance",
    "armor_points",
    "constitution",
    "dexterity",
    "healing_rate",
    "hit_points",
    "knockdown",
    "major_wound",
    "movement",
    "size",
    "strength",
    "unconscious",
    "squire_name",
    "squire_age",
    "squire_skill",
    "squire_note",
  ];

  const update = getStaticUpdate(attrs, page);
  update["character_name"] = page.name;

  const addEntries = (object) => {
    Object.entries(object).forEach(([key, value]) => {
      update[key] = value;
    });
  };

  const arms = processDataArrays(page.data.arms, (data) =>
    update_item(data, getRow("arms"))
  );
  addEntries(arms);

  const attacks = processDataArrays(page.data.attacks, (data) =>
    update_attack(data)
  );
  addEntries(attacks);

  const updateSection = (section) => {
    return (data) => update_section(data, section);
  };

  const passions = processDataArrays(
    page.data.passions,
    updateSection("passions")
  );
  addEntries(passions);

  const dataSkills = parseJSON(page.data.skills);
  dataSkills.forEach(({ name, target_value }) => {
    const isStaticSkill = [...skills, ...combatSkills].includes(
      name.toLowerCase()
    );
    if (isStaticSkill) {
      update[attrName(name)] = target_value;
    } else {
      const custom = processDataArrays(
        [{ name, target_value }],
        updateSection("skills")
      );
      addEntries(custom);
    }
  });

  const dataTraits = parseJSON(page.data.traits);
  dataTraits.forEach(({ name, target_value }) => {
    const isStaticTrait = traits.includes(name.toLowerCase());
    if (isStaticTrait) {
      update[attrName(name)] = target_value;
    } else {
      const custom = processDataArrays(
        [{ name, target_value }],
        updateSection("traits")
      );
      addEntries(custom);
    }
  });

  if (page.data.squire_notes) {
    update["flag_squire_notes"] = false;
  }

  setAttrs(update, {
    silent: true,
  });
};

const handle_items = (page) => {
  const subcategory = page.data["subcategory"];

  switch (subcategory) {
    case "Armor":
      handle_arms(page);
      break;
    case "Animal":
    case "Service":
    case "Item":
      handle_equipment(page);
      break;
    case "Shield":
      handle_arms(page);
      break;
    case "Horse Armor":
      handle_arms(page);
      break;
    case "Ranged Weapon":
    case "Weapon":
      handle_weapon(page);
      handle_arms(page);
      break;
    default:
      dropWarning(`Unknown subcategory: ${subcategory}`);
  }
};

const dropAttrs = ["drop_name", "drop_data", "drop_content"];

const handle_drop = () => {
  getAttrs(dropAttrs, (v) => {
    if (!v.drop_name || !v.drop_data) {
      return;
    }

    const page = {
      name: v.drop_name,
      data: parseJSON(v.drop_data) ?? v.drop_data,
      content: v.drop_content,
    };

    const { Category } = page.data;

    switch (Category) {
      case "Creatures":
        handle_npc(page);
        break;
      case "Horses":
        handle_horse(page);
        break;
      case "Items":
        handle_items(page);
        break;
      case "Squires":
        handle_squire(page);
        break;
      case "Pre-generated Characters":
        resetRepeatingRows(repeatingSections);
        resetSkillList(page.data.skills);
        handle_character(page);
        break;
      default:
        dropWarning(`Unknown category: ${Category}`);
    }

    setAttrs(
      {
        drop_name: "",
        drop_data: "",
        drop_content: "",
      },
      {
        silent: true,
      }
    );
  });
};

["data", "name", "content"].forEach((attr) => {
  on(`change:drop_${attr}`, () => {
    handle_drop();
  });
});
