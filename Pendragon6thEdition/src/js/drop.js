const dropWarning = (v) => {
  console.log(
    `%c Pendragon 6th Edition: ${v}`,
    "color: orange; font-weight:bold"
  );
};

const getRow = (section) => `repeating_${section}_${generateRowID()}`;

const getRepUpdate = (attrs, row, page) => {
  let update = {};

  //TODO: Verify 'name' works as the data may be Uppercase Name
  attrs.forEach((attr) => {
    if (page[attr] ?? page.data[attr]) {
      update[`${row}_${attr}`] = page[attr] ?? page.data[attr];
    } else {
      dropWarning(`getRepUpdate: Missing ${attr}`);
    }
  });

  if (attrs.includes("notes")) {
    update[`${row}_flag`] = false;
  }

  return update;
};

const getStaticUpdate = (attrs, page) => {
  let update = {};

  attrs.forEach((attr) => {
    if (page[attr] ?? page.data[attr]) {
      update[attr] = page[attr] ?? page.data[attr];
    } else {
      dropWarning(`getStaticUpdate: Missing ${attr}`);
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

const handle_item = (page) => {
  const row = getRow("equipment");
  let update = getRepUpdate(
    ["value", "notes", "period_restriction"],
    row,
    page
  );
  update[`${row}_equipment`] = page.name;
  update[`${row}_category`] = page.data["Subcategory"];

  setAttrs(update);
};

const handle_squire = (page) => {
  const attrs = ["age", "skill", "notes"];
  const update = getStaticUpdate(attrs, page);
  update["squire_name"] = page.name;

  //Needs special handling for skills
  // const row = getRow("squire_skills");
  // const skillsAttr = ["name", "skill"];
  // const skillsUpdate = getRepUpdate(skillsAttr, row, page);

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
  update["flag_equestrian_notes"] = false;
  setAttrs(update);
};

const handle_items = (page) => {
  const subcategory = page.data["Subcategory"];

  console.table({
    name: page.name,
    subcategory,
  });

  switch (subcategory) {
    case "Armor":
      handle_armor(page);
      break;
    case "Animal":
    case "Service":
    case "Shield":
    case "Item":
      handle_item(page);
      break;
    // case "Ranged Weapon":
    //   handle_ranged_weapon(page);
    //   break;
    // case "Animal":
    //   handle_animal(page);
    //   break;
    // case "Horse Armor":
    //   handle_horse_armor(page);
    //   break;
    case "Weapon":
      handle_weapon(page);
      break;
    default:
      dropWarning(`Unknown subcategory: ${subcategory}`);
  }
};

const handle_drop = () => {
  getAttrs(["drop_name", "drop_data", "drop_content"], (v) => {
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
