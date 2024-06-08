const handle_npc = (page) => {
  console.log(page);
};

const handle_item = (page) => {
  console.log(page["Subcategory"]);
  const subcategory = page["Subcategory"];

  switch (subcategory) {
    case "Weapon":
      handle_weapon(page);
      break;
    case "Ranged Weapon":
      handle_ranged_weapon(page);
      break;
    case "Animal":
      handle_animal(page);
      break;
    case "Armor":
      handle_armor(page);
      break;
    case "Horse":
      handle_horse(page);
      break;
    case "Horse Armor":
      handle_horse_armor(page);
      break;
    case "Service":
      handle_service(page);
      break;
    case "Shield":
      handle_shield(page);
      break;
    case "Squire":
      handle_squire(page);
      break;
    default:
      console.log(`Unknown subcategory: ${subcategory}`);
  }
};

const handle_drop = (category) => {
  getAttrs(["drop_name", "drop_data", "drop_content"], (v) => {
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

    switch (category) {
      case "Npc":
        handle_npc(page);
        break;
      case "Item":
        handle_item(page);
        break;
      default:
        console.log(`Unknown category: ${category}`);
    }

    // get_repeating_data(function (repeating) {
    //   var results = processDrop(page, v, repeating);
    //   setAttrs(
    //     results.update,
    //     {
    //       silent: true,
    //     },
    //     function () {
    //       results.callbacks.forEach(function (callback) {
    //         callback();
    //       });
    //     }
    //   );
    // });
  });
};

on("change:drop_category", (event) => {
  handle_drop(event.newValue);
});

// on("change:drop_name", (event) => {
//   console.log(event);
// });

// on("change:drop_data", (event) => {
//   console.log(event);
// });

// on("change:drop_content", (event) => {
//   console.log(event);
// });
