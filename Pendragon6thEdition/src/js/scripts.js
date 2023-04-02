const attributes = {
  movement: ["strength", "dexterity"],
  hp: ["size", "constitution"],
  unconscious: ["hit_points"],
  knights: ["old_knights", "middle_aged_knights", "young_knights"],
  knockdown: ["size"],
  majorWound: ["constitution"],
  healingRate: ["constitution"],
};

//When performing calculations in King Arthur Pendragon, round
//0.5 and higher fractions upward and lesser fractions downward.
//For example, a character with a Damage value of 4.43 would
//have an effective value of 4, while a character with a Damage val-
//ue of 4.5 would have a 5.
const round = sum => sum % 1 >= 0.5 ? Math.ceil(sum) : Math.floor(sum);

const total = v => Object.values(v).reduce((partialSum, a) => partialSum + parseFloat(a), 0);

attributes.movement.forEach((attr) => {
  on(`change:${attr}`, () => {
    getAttrs(attributes.movement, values => {
      //Movement Rate = [(STR + DEX) /2] + 5
      setAttrs({
        movement: round(total(values) / 2) + 5,
      });
    });
  });
});

attributes.healingRate.forEach(attr => {
  on(`change:${attr}`, ({ newValue }) => {
    //Healing Rate = CON/5
    setAttrs({
      healing_rate: round(newValue / 5),
    });
  });
});

attributes.hp.forEach((attr) => {
  on(`change:${attr}`, () => {
    getAttrs(attributes.hp, values => {
      //Total Hit Points = CON+SIZ
      setAttrs({
        hit_points: total(values),
      });
    });
  });
});

attributes.unconscious.forEach((attr) => {
  on(`change:${attr}`, () =>
    getAttrs(attributes.unconscious, values => {
      //Unconscious = Total Hit Points/4
      setAttrs({
        unconscious: round(total(values) / 4),
      });
    })
  );
});

attributes.knights.forEach((attr) => {
  on(`change:${attr}`, () => {
    getAttrs(attributes.knights, values => {
      setAttrs({
        total_family_knights: total(values),
      });
    });
  });
});

attributes.knockdown.forEach(attr => {
  on(`change:${attr}`, ({ newValue }) => {
    setAttrs({
      knockdown: newValue,
    });
  });
});

attributes.majorWound.forEach(attr => {
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
    let attributes = [];
    idArray.forEach((id) =>
      attributes.push(`repeating_events_${id}_new_glory`)
    );

    getAttrs(attributes, (values) => {
      const parsedNums = helpers.parseIntegers(values);
      const gloryValues = Object.values(parsedNums);
      const sum = helpers.sumIntegers(gloryValues);

      setAttrs({
        glory_total: sum,
        [`${repeatingRow}_total_glory`]: sum,
      });
    });
  });
);
