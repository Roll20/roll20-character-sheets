const dropWarning = (v) => {
  console.log(
    `%c Pendragon 6th Edition: ${v}`,
    "color: orange; font-weight:bold"
  );
};

const handle_npc = (page) => {
  console.log(page);
};

const handle_item = (page) => {
  console.log(page["Subcategory"]);
  // const subcategory = page["Subcategory"];

  // console.log(page);

  // switch (subcategory) {
  //   case "Weapon":
  //     handle_weapon(page);
  //     break;
  //   case "Ranged Weapon":
  //     handle_ranged_weapon(page);
  //     break;
  //   case "Animal":
  //     handle_animal(page);
  //     break;
  //   case "Armor":
  //     handle_armor(page);
  //     break;
  //   case "Horse":
  //     handle_horse(page);
  //     break;
  //   case "Horse Armor":
  //     handle_horse_armor(page);
  //     break;
  //   case "Service":
  //     handle_service(page);
  //     break;
  //   case "Shield":
  //     handle_shield(page);
  //     break;
  //   case "Squire":
  //     handle_squire(page);
  //     break;
  //   default:
  //     dropWarning(`Unknown subcategory: ${subcategory}`);
  // }
};

const handle_drop = () => {
  dropWarning("handle_drop");

  getAttrs(["drop_name", "drop_data", "drop_content", "drop_category"], (v) => {
    if (!v.drop_name || !v.drop_data || !v.drop_content || !v.drop_category) {
      return;
    }

    // let pagedata = v.drop_data;

    // try {
    //   pagedata = JSON.parse(v.drop_data);
    // } catch (e) {
    //   console.log(`Error parsing JSON: ${v.drop_data}`);
    // }

    // const page = {
    //   name: v.drop_name,
    //   data: pagedata,
    //   content: v.drop_content,
    //   category: v.drop_category,
    // };

    console.table({
      category: v.drop_category,
      name: v.drop_name,
    });

    // switch (page.data) {
    //   case "Creature":
    //     handle_npc(page);
    //     break;
    //   case "Items":
    //     handle_item(page);
    //     break;
    //   default:
    //     dropWarning(`Unknown category: ${category}`);
    // }

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

// on("sheet:compendium-drop", (event) => {
//   console.log(
//     `%c Pendragon 6th Edition compendium drop`,
//     "color: purple; font-weight:bold"
//   );
//   //handle_drop();
// });

["category", "name", "data", "content"].forEach((attr) => {
  on(`change:drop_${attr}`, () => {
    handle_drop();
  });
});
