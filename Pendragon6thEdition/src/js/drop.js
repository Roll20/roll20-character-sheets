const dropWarning = (v) => {
  console.log(
    `%c Pendragon 6th Edition: ${v}`,
    "color: orange; font-weight:bold"
  );
};

const getRow = (section) => `repeating_${section}_${generateRowID()}`;

const getRepUpdate = (attrs, row, page) => {
  let update = {};

  attrs.forEach((attr) => {
    if (page[attr] ?? page.data[attr]) {
      update[`${row}_${attr}`] = page[attr] ?? cleanAttr(attr, page.data[attr]);
    }
  });

  if (attrs.includes("notes")) {
    update[`${row}_flag`] = false;
  }

  return update;
};

const cleanAttr = (attr, value) => {
  if (attr === "skill") {
    return `@{${value.toLowerCase()}}`;
  }

  return value;
};

const getStaticUpdate = (attrs, page) => {
  let update = {};

  attrs.forEach((attr) => {
    if (page[attr] ?? page.data[attr]) {
      update[attr] = page[attr] ?? cleanAttr(attr, page.data[attr]);
    }
  });

  return update;
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

const handle_armor = (page) => {
  handle_item(page);
};

const handle_item = (page, row) => {
  let update = getRepUpdate(
    ["value", "notes", "period_restriction"],
    row,
    page
  );
  update[`${row}_equipment`] = page.name;
  update[`${row}_category`] = page.data["subcategory"];

  setAttrs(update);
};

const handle_equipment = (page) => {
  const row = getRow("equipment");
  handle_item(page, row);
};

const handle_arms = (page) => {
  const row = getRow("arms");
  handle_item(page, row);
};

const handle_squire = (page) => {
  const attrs = ["squire_age", "squire_skill", "squire_notes"];
  const update = getStaticUpdate(attrs, page);
  update["squire_name"] = page.name;
  update["flag_squire_notes"] = false;
  setAttrs(update);
};

const handle_weapon = (page) => {
  const row = getRow("attacks");
  const attrs = ["name", "damage", "skill"];
  const update = getRepUpdate(attrs, row, page);
  setAttrs(update);
};

const handle_horse = (page) => {
  const attrs = [
    "armor",
    "charge_damage",
    "con",
    "damage",
    "dex",
    "hp",
    "move",
    "siz",
    "str",
    "type",
  ];
  const warHorseAttrs = attrs.map((attr) => `warhorse_${attr}`);
  let update = getStaticUpdate([...warHorseAttrs, "equestrian_notes"], page);
  update["warhorse_type"] = page.name;
  update["flag_equestrian_notes"] = false;
  setAttrs(update);
};

const handle_character = (page) => {
  const attrs = [
    "appearance",
    "dexterity",
    "size",
    "strength",
    "constitution",
    "healing_rate",
    "hit_points",
    "knockdown",
    "major_wound",
    "movement",
    "unconscious",
  ];

  //TODO: Skills, Passions, Traits, and Equipment are setup wrong. Rake needs to be run again
};

const handle_items = (page) => {
  const subcategory = page.data["subcategory"];

  switch (subcategory) {
    case "Armor":
      handle_armor(page);
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

    let pagedata = v.drop_data;

    try {
      pagedata = JSON.parse(v.drop_data);
    } catch (e) {
      console.log(`Error parsing JSON: ${v.drop_data}`);
    }

    const page = {
      name: v.drop_name,
      data: pagedata,
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
