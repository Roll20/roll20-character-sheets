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
const rollableItems = abilities.concat(...skills);

rollableItems.forEach(button => {
  on(`clicked:${button}`, function () {
    rollableItemClicked(button);
  });
});

function rollableItemClicked(button) {
  const attrsToGet = [
    button,
    "trait1_name",
    "trait2_name",
    "trait3_name",
    "trait4_name",
    "rolling_trait"
  ];

  getAttrs(attrsToGet, function (values) {
    const beginnersLuckRoll = calculateBeginnersLuck(button);

    populateTraitOptions(values);

    setAttrs({
      rolling: button,
      tab: "roll",
      beginners_luck_roll: beginnersLuckRoll,
      rolling_dice: values[button],
    });
  });
}

function calculateBeginnersLuck(button) {
  let beginnersLuckRoll = false;
  if (skills.includes(button) && !(values[button] > 0)) {
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
