// thank you Scott C!
const initiateSkillRoll = async function (event) {
  let skill = event.triggerName.replace(/clicked:/, "");

  // figure out which approach to use -- so ask
  let approachRoll = await startRoll(`!&template:default} {{query=${GLOBAL__APPROACH_QUERY}}}`);
  // note that values for the query options above line up with their indexes in GLOBAL__APPROACHES
  // also, this is an API message: it won't be visible to any user
  // because it's so generic, it shouldn't trigger any API scripts

  // finish approachRoll immediately vecause we aren't going to computee
  // any values from it -- it's just a dummy roll
  finishRoll(approachRoll.rollId);

  // same song for difficulty
  let difficultyRoll = await startRoll(`!&template:default} {{query=${GLOBAL__DIFFICULTY_QUERY}}}`);
  finishRoll(difficultyRoll.rollId);

  // parse the results
  let approachValue = approachRoll.results.query.result;
  let approach = GLOBAL__APPROACHES[approachValue];

  let difficultyValue = difficultyRoll.results.query.result;
  let difficulty = GLOBAL__DIFFICULTIES[difficultyValue];

  let i18nApproach = getTranslationByKey(approach);
  let i18nSkill = getTranslationByKey(skill);
  let i18nDifficulty = getTranslationByKey("difficulty");
  let i18nModifier = getTranslationByKey("modifier");
  let finalTemplate = [
    `&{template:skills}`,
    `{{character_name=@{character_name}}}`,
    `{{verb=^{tests}}}`,
    `{{type=skill-test}}`,
    `{{skill=${skill}}}`,
    `{{roll=[[1d6]]}}`,
    `{{flawless=[[1d6]]}}`,
    `{{flawless=[[1d6]]}}`,
    `{{TN=[[@{${skill}}[${i18nSkill}] + @{${approach}}[${i18nApproach}] +`,
    `${GLOBAL__DIFFICULTY_EFFECTS[difficulty]}[${i18nModifier}]]]}}`,
    `{{title=${approach}}}`,
    `{{difficulty=${difficulty}}}`
  ].join("");

  // now that we have all the helprmation, make the roll
  let finalRoll = await startRoll(finalTemplate);
  finishRoll(finalRoll.rollId);
};

// Functions added for code to make sense, not needed for getting regular and repeating sections.
// converts a value to a number, it's default value, or 0.
const value = function(val, def) {
  return (+val||def||0);
};

// ===== PARAMETERS ==========
// destinations : the name of the attribute that stores the total quantity
//                can be a single attribute, or an array: ["total_cost", "total_weight"]
//                If more than one, the matching fields must be in the same order.
//
// section      : name of repeating fieldset, without the repeating_
//
// fields       : the name of the attribute field to be summed
//                destination and fields both can be a single attribute: "weight"
//                or an array of attributes: ["weight","number","equipped"]
const repeatingSum = (destinations, section, fields) => {
  if (!Array.isArray(destinations)) destinations = [destinations.replace(/\s/g, "").split(",")];
  if (!Array.isArray(fields)) fields = [fields.replace(/\s/g, "").split(",")];
  getSectionIDs(`repeating_${section}`, idArray => {
    const attrArray = idArray.reduce((m, id) => [...m, ...(fields.map(field => `repeating_${section}_${id}_${field}`))], []);
    getAttrs([...attrArray], v => {
      const getValue = (section, id, field) => v[`repeating_${section}_${id}_${field}`] === "on" ? 1 : parseFloat(v[`repeating_${section}_${id}_${field}`]) || 0;
      const commonMultipliers = (fields.length <= destinations.length) ? [] : fields.splice(destinations.length, fields.length - destinations.length);
      const output = {};
      destinations.forEach((destination, index) => {
        output[destination] = idArray.reduce((total, id) => total + getValue(section, id, fields[index]) * commonMultipliers.reduce((subtotal, mult) => subtotal * getValue(section, id, mult), 1), 0);
      });
      setAttrs(output);
    });
  });
};
