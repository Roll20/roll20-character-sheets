on("clicked:focus_up", async (eventInfo) => {
  rollAction();
});
on("clicked:go_wild", async (eventInfo) => {
  rollAction(true);
});

/**
 *
 * @param {string} template name of rolltemplate to use
 * @param {object} properties key value pairs
 * @param {function} callback startRoll callback function; should include `finishRoll()`
 */
const makeRoll = async (template, properties, callback) => {
  const rollstring = createRollString(template, properties);
  await startRoll(rollstring, callback);
};

/**
 * Create roll string including whisper, template, and roll properties
 * @param {string} template name of rolltemplate to use
 * @param {object} properties key value pairs
 * @returns finished roll string
 */
const createRollString = (template, properties) => {
  const props = Object.entries(properties)
    .map(([key, val]) => `{{${key}=${val}}}`)
    .join("");

  // return `@{wtype}&{template:${template}}${props}`;
  return `&{template:${template}}${props}`;
};

const rollAction = async (wild = false) => {
  getAttrs(
    ["style", "skill", "advantage", ...STYLES, ...SKILLS, ...CONDITIONS_REQUEST],
    (attributes) => {
      const styleName = attributes.style;
      const skillName = attributes.skill;
      const style = Number(attributes[styleName]) ?? 0;
      const skill = Number(attributes[skillName]) ?? 0;

      console.debug(attributes);
      const properties = {};

      const dic = {};
      dic.action = getTranslationByKey("action") || "Action";
      dic.frightened = getTranslationByKey("frightened") || "Frightened";

      properties.character_name = "@{character_name}";
      properties.style = `^{${styleName}}`;
      properties.skill = `^{${skillName}} (+${skill})`;

      const action_is = wild ? "wild" : "focus";
      properties[action_is] = action_is;
      properties.action_is = action_is;

      properties.question = "[[?{Circumstances|Normal,0|Advantage,1|Disadvantage,-1}]]";

      const dice = style - (wild ? 1 : 0);
      for (const key of Array.from(Array(dice).keys(), (k) => k + 1)) {
        properties[`roll_style${key}`] = "[[1d6]]";
      }

      const frightenedLevel =
        attributes.frightened === "on" ? Number(attributes.frightened_level) : 0;
      const frightenedMod =
        frightenedLevel > 0 ? `+ ${-1 * frightenedLevel}[${dic.frightened}]` : "";
      properties.roll_action = `[[1d${wild ? 20 : 8}[${dic.action}] ${frightenedMod}]]`;

      makeRoll("action", properties, ({ rollId, results }) => {
        finishRoll(rollId, results);

        // const answer = Number(results.question.result);
        // const circumstance = answer > 0 ? "advantage" : answer < 0 ? "disadvantage" : "";
        // finishRoll(rollId, {
        //   [circumstance]: true,
        // });
      });
    }
  );
};
