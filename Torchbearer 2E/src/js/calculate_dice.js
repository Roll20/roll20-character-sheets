const calculateDiceValues = [
  // Also needs all the skills, abilities, and custom skills
  "rolling",
  "rolling_bl_select",
  "taxed_nature",
  "rolling_help",
  "rolling_aid",
  "rolling_gearetal",
  "rolling_trait",
  "rolling_trait_option",
  "rolling_trait_option",
  "rolling_persona",
  "rolling_channel_nature",
  "taxed_nature",
  "rolling_otherdice",
  "injured",
  "sick",
  "fresh"
];

calculateDiceValues.forEach(v => {
  on("change:" + v, function () {
    console.log('calculateDiceValues', "change:" + v);
    let attrsToGet = [...calculateDiceValues, ...abilities, ...skills, ...customSkills];

    getAttrs(attrsToGet, function (values) {
      setAttrs({
        rolling_dice: calculateDice(values, values['rolling']),
      });
    });
  });
});

function calculateDice(values, rolling) {
  const isBeginnersLuck = calculateBeginnersLuck(values, rolling);

  // Get the skill or ability
  let rollValue = parseInt(values[rolling]);

  if (rolling == 'nature') {
    rollValue = parseInt(values['taxed_nature']);
  }

  // Change it if we're doing beginners luck
  if (isBeginnersLuck) {
    let blSelected = values['rolling_bl_select'];
    rollValue = parseInt(values[blSelected]);

    if (blSelected == "nature") {
      rollValue = parseInt(values['taxed_nature']);
    }
  }

  // Add help, aid, supplies, gear
  rollValue += parseInt(values['rolling_help']);
  rollValue += parseInt(values['rolling_aid']);
  rollValue += parseInt(values['rolling_gearetal']);

  // Check to half for beginners luck
  if (isBeginnersLuck) {
    rollValue = Math.ceil(rollValue / 2);
  }

  // Add traits, persona, channelled nature, conditions, etc.
  if (values['rolling_trait'] > 0) {
    if (values['rolling_trait_option'] == "forme") {
      rollValue += 1
    }
    if (values['rolling_trait_option'] == "againstme") {
      rollValue -= 1
    }
  }

  rollValue += parseInt(values['rolling_persona']);

  if (values['rolling_channel_nature'] == "on") {
    rollValue += parseInt(values['taxed_nature']);
  }

  rollValue += parseInt(values['rolling_otherdice']);

  if (values['injured'] == "on") {
    rollValue -= 1;
  }

  if (values['sick'] == "on") {
    rollValue -= 1;
  }

  if (values['fresh'] == "on") {
    rollValue += 1;
  }

  return rollValue;
};