const rankToDie = {
  "d4": "1d4",
  "d6": "1d6",
  "d8": "1d8",
  "d10": "1d10",
  "d12": "1d12",
  "2d8": "2d8",
  "d20": "1d20",
  "2d20": "2d20"
};

const buildRankHandler = (characteristic) => {
  on(`change:repeating_${characteristic}:${characteristic}_rank`, function (eventInfo) {
    const rowId = eventInfo.sourceAttribute.match(/repeating_[^_]+_[^_]+/)[0];
    const rankAttr = `${rowId}_${characteristic}_rank`;

    getAttrs([rankAttr], function (values) {
      const selectedRank = values[rankAttr];
      const dieValue = rankToDie[selectedRank] || "1d4"; // default fallback
      const dieAttr = `${rowId}_${characteristic}_die`;

      setAttrs({ [dieAttr]: dieValue });
    });
  });
};

// Apply to each characteristic group
["physicality", "dexterity", "mentality", "soul", "influence", "affluence"].forEach(buildRankHandler);
