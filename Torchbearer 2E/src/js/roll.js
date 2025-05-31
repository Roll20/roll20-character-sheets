const abilities = ["will", "health", "nature", "resources", "circles"];
const skills = [
  "alchemist",
  "arcanist",
  "armorer",
  "cartographer",
  "commander",
  "cook",
  "criminal",
  "dungeoneer",
  "fighter",
  "haggler",
  "healer",
  "hunter",
  "laborer",
  "lore_master",
  "manipulator",
  "mentor",
  "orator",
  "pathfinder",
  "peasant",
  "persuader",
  "rider",
  "ritualist",
  "sapper",
  "scavenger",
  "scholar",
  "scout",
  "survivalist",
  "theologian",
];
const customSkills = ["skill1", "skill2", "skill3", "skill4", "skill5", "skill6"];
const rollableItems = abilities.concat(...skills, ...customSkills);

rollableItems.forEach(button => {
  on(`clicked:${button}`, function () {
    console.log(`clicked:${button}`);
    rollableItemClicked(button);
  });
});

function rollableItemClicked(button) {
  const attrsToGet = [
    button,
    "rolling_trait"
  ];

  for (let i = 1; i <= 4; i++) {
    attrsToGet.push("trait" + i + "_name");
    attrsToGet.push("wise" + i + "_name");
  }
  attrsToGet.push(button + "_name");

  attrsToGet.push(...abilities, ...skills, ...customSkills);
  attrsToGet.push(...calculateDiceValues);

  resetRoll();

  getAttrs(attrsToGet, function (values) {
    const beginnersLuckRoll = calculateBeginnersLuck(values, button);
    const skillName = getSkillName(values, button);
    const rollingDice = calculateDice(values, button);

    populateTraitOptions(values);
    populateWiseOptions(values);

    setAttrs({
      rolling: button,
      rolling_title: skillName,
      tab: "roll",
      beginners_luck_roll: beginnersLuckRoll,
      rolling_dice: rollingDice,
    });
  });
}

function getSkillName(values, button) {
  if (customSkills.includes(button)) {
    return values[button + "_name"];
  }

  if (button == "lore_master") {
    return "Lore Master";
  }

  return button;
}

function calculateBeginnersLuck(values, button) {
  let beginnersLuckRoll = false;
  if ((skills.includes(button) || customSkills.includes(button)) && !(values[button] > 0)) {
    beginnersLuckRoll = true;
  }

  return beginnersLuckRoll;
}

function populateTraitOptions(values) {
  const options = [
    { label: "No trait", value: 0 },
  ];

  for (let i = 1; i <= 4; i++) {
    if (values["trait" + i + "_name"]) {
      const res = { label: values["trait" + i + "_name"], value: i };

      if (values["rolling_trait"] == i) {
        res.selected = true;
      }

      options.push(res);
    }
  }

  populateListOptions({
    elemSelector: '.sheet-trait-selector',
    optionsArray: options
  });
}

function populateWiseOptions(values) {
  // Deeper understanding
  const duOptions = [
    { label: "No wise", value: 0 },
  ];

  for (let i = 1; i <= 4; i++) {
    if (values["wise" + i + "_name"]) {
      const res = { label: values["wise" + i + "_name"], value: i };

      if (values["rolling_du_wise"] == i) {
        res.selected = true;
      }

      duOptions.push(res);
    }
  }

  populateListOptions({
    elemSelector: '.sheet-du-wise-selector',
    optionsArray: duOptions
  });

  // Of course
  const ocOptions = [
    { label: "No wise", value: 0 },
  ];

  for (let i = 1; i <= 4; i++) {
    if (values["wise" + i + "_name"]) {
      const res = { label: values["wise" + i + "_name"], value: i };

      if (values["rolling_du_wise"] == i) {
        res.selected = true;
      }

      ocOptions.push(res);
    }
  }

  populateListOptions({
    elemSelector: '.sheet-oc-wise-selector',
    optionsArray: ocOptions
  });
}
