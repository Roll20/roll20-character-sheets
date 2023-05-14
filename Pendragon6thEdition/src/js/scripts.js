const characteristics = {
  movement: ["strength", "dexterity"],
  hp: ["size", "constitution"],
  unconscious: ["hit_points"],
  knockdown: ["size"],
  majorWound: ["constitution"],
  healingRate: ["constitution"],
};

//When performing calculations in King Arthur Pendragon, round
//0.5 and higher fractions upward and lesser fractions downward.
//For example, a character with a Damage value of 4.43 would
//have an effective value of 4, while a character with a Damage val-
//ue of 4.5 would have a 5.
const round = (sum) => (sum % 1 >= 0.5 ? Math.ceil(sum) : Math.floor(sum));

const total = (v) =>
  Object.values(v).reduce((partialSum, a) => partialSum + parseFloat(a), 0);

characteristics.movement.forEach((attr) => {
  on(`change:${attr}`, () => {
    getAttrs(characteristics.movement, (values) => {
      //Movement Rate = [(STR + DEX) /2] + 5
      setAttrs({
        movement: round(total(values) / 2) + 5,
      });
    });
  });
});

characteristics.healingRate.forEach((attr) => {
  on(`change:${attr}`, ({ newValue }) => {
    //Healing Rate = CON/5
    setAttrs({
      healing_rate: round(newValue / 5),
    });
  });
});

characteristics.hp.forEach((attr) => {
  on(`change:${attr}`, () => {
    getAttrs(characteristics.hp, (values) => {
      //Total Hit Points = CON+SIZ
      setAttrs({
        hit_points: total(values),
      });
    });
  });
});

characteristics.unconscious.forEach((attr) => {
  on(`change:${attr}`, () =>
    getAttrs(characteristics.unconscious, (values) => {
      //Unconscious = Total Hit Points/4
      setAttrs({
        unconscious: round(total(values) / 4),
      });
    })
  );
});

characteristics.knockdown.forEach((attr) => {
  on(`change:${attr}`, ({ newValue }) => {
    setAttrs({
      knockdown: newValue,
    });
  });
});

characteristics.majorWound.forEach((attr) => {
  on(`change:${attr}`, ({ newValue }) => {
    setAttrs({
      [`major_wound`]: newValue,
    });
  });
});

on(`change:sheet_select`, ({ newValue }) => {
  setAttrs({
    sheet_type: newValue === "knight" ? "character" : newValue,
    character_type: "knight",
  });
});

on(`change:repeating_events:new_glory`, ({ triggerName }) => {
  const repeatingRow = helpers.getReprowid(triggerName);

  getSectionIDs("events", (idArray) => {
    let characteristics = [];
    idArray.forEach((id) =>
      characteristics.push(`repeating_events_${id}_new_glory`)
    );

    getAttrs(characteristics, (values) => {
      const parsedNums = helpers.parseIntegers(values);
      const gloryValues = Object.values(parsedNums);
      const sum = helpers.sumIntegers(gloryValues);

      setAttrs({
        glory_total: sum,
        [`${repeatingRow}_total_glory`]: sum,
      });
    });
  });
});
