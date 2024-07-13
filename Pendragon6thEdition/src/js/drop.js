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

  //TODO: Need special handling for these skills. They will be formatted like repeating section but are static.
  const combatSkills = [
    "battle",
    "bow",
    "brawling",
    "charge",
    "crossbow",
    "hafted",
    "two-handed hafted",
    "horsemanship",
    "spear",
    "sword",
    "thrown weapon",
  ];
  let update = getStaticUpdate(attrs, page);

  update["character_name"] = page.name;

  //TODO: handle all repeating sections
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
  ];

  const update = getStaticUpdate(attrs, page);
  update["character_name"] = page.name;

  const addEntries = (object) => {
    Object.entries(object).forEach(([key, value]) => {
      update[key] = value;
    });
  };

  //const arms = processDataArrays(page.data.arms, getStaticUpdate);

  const attacks = processDataArrays(page.data.attacks, (data) =>
    update_attack(data)
  );
  addEntries(attacks);

  const passions = processDataArrays(page.data.passions, (data) =>
    update_section(data, "passions")
  );
  addEntries(passions);

  const skillList = parseJSON(page.data.skills);
  skillList.forEach(({ name, target_value }) => {
    if ([...skills, ...combatSkills].includes(name.toLowerCase())) {
      const attr = attrName(name);
      update[attr] = target_value;
    } else {
      const row = getRow("skills");
      update[`${row}_name`] = name;
      update[`${row}_target_value`] = target_value;
    }
  });

  const traits = parseJSON(page.data.traits);
  //TODO: Remove the rename when the rake task is updated
  traits.forEach(({ name, traits: target_value }) => {
    const staticTraits = [
      ...Object.keys(personalityTraits),
      ...Object.values(personalityTraits),
    ];

    if (staticTraits.includes(name.toLowerCase())) {
      const attr = attrName(name);
      update[attr] = target_value;
    } else {
      const row = getRow("traits");
      update[`${row}_name`] = name;
      update[`${row}_target_value`] = target_value;
    }
  });

  console.log(update);

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

    //   // get_repeating_data(function (repeating) {
    //   //   var results = processDrop(page, v, repeating);
    //   //   setAttrs(
    //   //     results.update,
    //   //     {
    //   //       silent: true,
    //   //     },
    //   //     function () {
    //   //       results.callbacks.forEach(function (callback) {
    //   //         callback();
    //   //       });
    //   //     }
    //   //   );
    //   // });
  });
};

// on("sheet:compendium-drop", (event) => {
//   console.log(
//     `%c Pendragon 6th Edition compendium drop`,
//     "color: purple; font-weight:bold"
//   );
//   //handle_drop();
// });

["data"].forEach((attr) => {
  on(`change:drop_${attr}`, () => {
    handle_drop();
  });
});
