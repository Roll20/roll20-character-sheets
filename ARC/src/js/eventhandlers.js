
on("sheet:opened", () => {
  getAttrs(["sheet_type"], (updateAttrs) => {
    if (!updateAttrs.sheet_type) {
      updateAttrs.sheet_type = "character";
    }

    setAttrs(updateAttrs);
  });
});

// NOTE: The API sets export_show to "on";
// it does not trigger the event handler
on("sheet:opened change:export", (eventInfo) => {
  getAttrs(["export"], (val) => {
    const updateAttrs = {};
    updateAttrs.export_show = val.export ? "on" : "0";
    setAttrs(updateAttrs);
  });
});

[1, 2, 3].forEach((l) => {
  on(`change:repeating_bonds:level_${l}`, (eventInfo) => {
    if (eventInfo.sourceType == "player") {

      let updateAttrs = {};
      let changed = parseInt(eventInfo.sourceAttribute.slice(-1));

      // fill major bonds below
      for (let f = changed - 1; f > 0; f--) {
        updateAttrs[`repeating_bonds_level_${f}`] = 4;
      }

      // clear major bonds above
      for (let c = changed + 1; c <= 3; c++) {
        updateAttrs[`repeating_bonds_level_${c}`] = 0;
      }

      setAttrs(updateAttrs);
    }
  });
});

GLOBAL__HEALTH.forEach(s => on(`change:${s} change:${s}_max`, eventInfo =>
  currentMax(s, eventInfo)));

const currentMax = (attr, eventInfo) => {
  if (eventInfo.sourceType == "player") {
    let updateAttrs = {};
    let attr_max = `${attr}_max`;
    getAttrs([attr, attr_max], val => {
      const current = parseInt(val[attr]) || 0;
      const maximum = parseInt(val[attr_max]) || 0;
      const newCurr = (current > maximum)
                      ? maximum
                      : Math.max(0, current);
      updateAttrs[attr] = newCurr;
      updateAttrs[attr_max] = Math.max(0, maximum);
      setAttrs(updateAttrs);
    });
  }
};

on("change:repeating_inventory:name", (eventInfo) => {
  const id = eventInfo.sourceAttribute.split("_")[2];
  const updateAttrs = {};
  const name = eventInfo.newValue.trim();
  let translation = getTranslationByKey(name)
  if (translation) {
    updateAttrs[`repeating_inventory_${id}_name`] = translation;

    const searchInputs = _.difference(GLOBAL__INVENTORY_INPUTS, ["name"]);
    _.each(searchInputs, (key) => {
      const attr = `repeating_inventory_${id}_${key}`;
      const i18n = `${name}_${key}`;

      // check if property exists in global
      if (GLOBAL__INVENTORY[name][key]) {
        updateAttrs[attr] = GLOBAL__INVENTORY[name][key];
      }
      // check if translation exists
      else if (getTranslationByKey(i18n)) {
        updateAttrs[attr] = getTranslationByKey(i18n);
      }
    });

    log(updateAttrs)
    setAttrs(updateAttrs, { silent: true });
  }
});

on("clicked:repeating_inventory:item-expand-toggle", (eventInfo) => {
  const id = eventInfo.sourceAttribute.split("_")[2];
  getAttrs([`repeating_inventory_${id}_item_expand`], (val) => {
    setAttrs({
      [`repeating_inventory_${id}_item_expand`]: val[`repeating_inventory_${id}_item_expand`] === "0" ? "on" : "0"
    });
  });
});

GLOBAL__SKILLS.forEach((skill) => {
  on(`clicked:${skill}`, initiateSkillRoll);
});

on("sheet:opened", () => {
  getAttrs(["version"], (updateAttrs) => {
    // Logic to determine what updates need to be done
    if (!updateAttrs.version) {
      // set sheet version if it doesn't exist
      updateAttrs.version = "1.0";
    }

    setAttrs(updateAttrs);
  });
});

on("sheet:opened", () => {
  var updateAttrs = {}
  for (i = 0; i < GLOBAL__HEALTH.length; i++) {
    var key = `${GLOBAL__HEALTH[i]}`;
    var translation = `${key}_i18n`;
    updateAttrs[translation] = getTranslationByKey(key);
  }
  setAttrs(updateAttrs);
});
