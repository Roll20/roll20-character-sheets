const skillCheckAttrs = [
  "rolling_othersuccesses",
  "rolling_hnt",
  "rolling_exhausted",
  "rolling_type",
  "rolling_disposition_ability",
  "health",
  "will",
  "taxed_nature"
];

function calculateSuccesses(values) {
  let otherSuccesses = 0;

  if (values['rolling_othersuccesses'] != 0) {
    otherSuccesses += parseInt(values['rolling_othersuccesses']);
  }
  if (values['rolling_hnt'] != 0) {
    otherSuccesses += -1;
  }
  if (values['rolling_exhausted'] != 0) {
    otherSuccesses += -1;
  }

  if (otherSuccesses > 0) {
    return "+" + otherSuccesses;
  }
  if (otherSuccesses < 0) {
    return otherSuccesses;
  }

  return 0;
}

on('clicked:skillcheck', (info) => {
  getAttrs(skillCheckAttrs, function (values) {
    let rollString = "&{template:skillcheck} {{rollName=@{rolling_title}}} {{numDice=@{rolling_dice}}} {{charName=@{character_name}}} {{result=[[@{rolling_dice}d6>4]]}} {{ob=@{rolling_obstacle}}} {{grindTurns=@{rolling_grind}}}";

    let otherSuccesses = calculateSuccesses(values);
    if (otherSuccesses != 0) {
      rollString += " {{otherSuccesses=" + otherSuccesses + "}}";
    }

    if (values['rolling_type'] == "independent") {
      rollString += " {{independent=true}}";
    }
    if (values['rolling_type'] == "versus") {
      rollString += " {{versus=true}}";
      rollString += " {{opponentRoll=[[@{rolling_obstacle}d6>4]]}}";
    }
    if (values['rolling_type'] == "disposition") {
      let dispositionAttributeName = values['rolling_disposition_ability'];

      
      rollString += " {{disposition=true}}";
      rollString += " {{dispositionAttributeName=" + dispositionAttributeName + "}}";
      if (dispositionAttributeName == "nature") {
        dispositionAttributeName = "taxed_nature";
      }
      rollString += " {{dispositionAttribute=" + values[dispositionAttributeName] + "}}";
    }

    startRoll(rollString, (results) => {
      finishRoll(results.rollId);
    });
  });
});