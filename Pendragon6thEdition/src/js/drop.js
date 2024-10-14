const dropWarning = (v) => {
  console.log(
    `%c Pendragon 6th Edition: ${v}`,
    "color: orange; font-weight:bold"
  );
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

  try {
    if (page.data.arms) {
      const arms = processDataArrays(page.data.arms, (data) =>
        update_item(data, getRow("arms"))
      );
      Object.assign(update, arms);
    }
    if (page.data.attacks) {
      const attacks = processDataArrays(page.data.attacks, (data) =>
        update_attack(data)
      );
      Object.assign(update, attacks);
    }

    if (page.data.passions) {
      const passions = processDataArrays(
        page.data.passions,
        updateSection("passions")
      );
      Object.assign(update, passions);
    }

    if (page.data.skills) {
      const dataSkills = update_mix_section(page.data.skills, "skills", [
        ...skills,
        ...combatSkills,
      ]);
      Object.assign(update, dataSkills);
    }

    if (page.data.traits) {
      const dataTraits = update_mix_section(page.data.traits, "traits", traits);
      Object.assign(update, dataTraits);
    }
    if (page.data.squire_notes) {
      update["flag_squire_notes"] = false;
    }

    setAttrs(update, {
      silent: true,
    });
  } catch (error) {
    console.warn(error);
  }
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
        resetRepeatingRows(repeatingSections);
        resetSkillList(page.data.skills);
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
      case "Pre-gens":
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
        drop_category: "",
      },
      {
        silent: true,
      }
    );
  });
};

["data"].forEach((attr) => {
  on(`change:drop_${attr}`, () => {
    handle_drop();
  });
});
