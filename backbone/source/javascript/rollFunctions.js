/**
 * 
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
 const rollHealthCheck = async function({trigger,attributes,sections,casc}){
  const rollName = trigger.name.replace(/-action$/,'');
  const statVal = attributes[rollName];
  const rollObj = {
    title:`^{${rollName} roll}`,
    pure_success:true,
    roll:`[[@{roll_state}cs<${statVal}cf>[[${statVal} + 1]]]]`
  };
  const roll = await executeRoll({rollObj,attributes,sections});
  finishRoll(roll.rollId);
};
k.registerFuncs({rollHealthCheck});

/**
 * Starts the process of rolling a basic attribute check
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const rollAttribute = async function({trigger,attributes,sections,casc}){
  const rollName = trigger.name.replace(/-action$/,'');
  const rollAttr = rollName.replace(/-/g,'_');
  const rollTransKey = rollName.replace(/-/g,' ');
  const rollObj = {
    title:`^{${rollName}}`,
    roll:`[[@{roll_state} + ${attributes[rollAttr]}[${k.capitalize(getTranslationByKey(rollTransKey))}]]]`
  };
  const roll = await executeRoll({rollObj,attributes,sections});
  finishRoll(roll.rollId);
};
k.registerFuncs({rollAttribute});

/**
 * Makes rolls for the repeating sections (weapons and abilities)
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const rollRepeating = async function({trigger,attributes,sections,casc}){
  const [section,rowID] = k.parseTriggerName(trigger.name);
  const row = `${section}_${rowID}`;
  const rollName = attributes[`${row}_name`];
  const skillName = attributes[`${row}_skill`];
  const [modifier] = getSkillRollModifier(skillName,attributes);
  const rollObj = {
    title:rollName,
    roll_name:`^{${skillName}}`,
    roll:`[[@{roll_state}${modifier}]]]`
  };
  if(attributes[`${row}_damage`]){
    rollObj.damage = attributes[`${row}_damage`];
    if(attributes[`${row}_damage_characteristic`]){
      rollObj.damage += `+ @{${attributes[`${row}_damage_characteristic`]}}[${k.capitalize(getTranslationByKey(attributes[`${row}_damage_characteristic`]))}]`;
    }
    rollObj.damage = `[[${rollObj.damage}]]`;
  }else{
    rollObj.description = attributes[`${row}_description`];
  }
  const roll = await executeRoll({rollObj,attributes,sections});
  finishRoll(roll.rollId);
};
k.registerFuncs({rollRepeating});

const getSkillRollModifier = (rollName,attributes,row) => {
  row = row ? `${row}_` : '';
  const rollAttr = `${row}${rollName.replace(/-/g,'_')}`.replace(/_$/,'');
  const rollTransKey = row ?
    '':
    rollName.replace(/-/g,' ');
  const characteristicName = row ?
    attributes[`${row}characteristic`] :
    skills[rollTransKey].characteristic;
  const characteristic = attributes[characteristicName] || 0;
  const mastery = attributes[`${rollAttr}_mastery`];
  const profLabel = rollTransKey ?
    k.capitalize(getTranslationByKey(rollTransKey)) :
    attributes[`${row}name`];
  const charLabel = k.capitalize(getTranslationByKey(characteristicName));
  const profBonus = attributes.roll_state === '1D20' ?
    Math.max(attributes[`${rollAttr}_proficiency`] * 2, 1) :
    attributes[`${rollAttr}_proficiency`];
  const rollMsg = `${mastery ? 'cs>19' : ''} + ${profBonus}[${profLabel}] + ${characteristic}[${charLabel}`;
  return [
    rollMsg,
    characteristicName,
    rollTransKey];
};

/**
 * Starts the process of rolling a basic skill check
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const rollSkill = async function({trigger,attributes,sections,casc}){
  const [section,rowID,button] = k.parseTriggerName(trigger.name);
  const row = section ?
    `${section}_${rowID}` :
    '';
  const rollName = button.replace(/-?action$/,'');
  const [modifier,,rollTransKey] = getSkillRollModifier(rollName,attributes,row);
  const rollObj = {
    title:section ?
      attributes[`${row}_name`]:
      `^{${rollTransKey}}`,
    roll:`[[@{roll_state}${modifier}]]]`
  };
  const roll = await executeRoll({rollObj,attributes,sections});
  finishRoll(roll.rollId);
};
k.registerFuncs({rollSkill});

/**
 * Rolls for luck and displays `lucky` or `unlucky`
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const rollLuck = async function({trigger,attributes,sections,casc}){
  const luckTarget = attributes.luck === 'odd' ?
    1 :
    0;
  const rollObj = {
    title:'^{luck}',
    luck:`[[@{roll_state}]]`
  };
  const roll = await executeRoll({rollObj,attributes,sections});
  const computeObj = {};
  const rollModulus = roll.results.luck.result % 2;
  computeObj.luck = rollModulus === luckTarget ?
    1 :
    0;
  finishRoll(roll.rollId,computeObj);
};
k.registerFuncs({rollLuck});

const assembleRoll = (rollObj,attributes,sections) => {
  return Object.entries(rollObj).reduce((str,[field,content])=>{
    return str += ` {{${field}=${content}}}`;
  },'@{template_start}');
};

/**
 * Executes the roll. Uses a callback if any computations are required.
 * @param {object} rollObj - Object describing the roll fields to be used
 * @param {object} attributes - The character attributes
 * @param {object[]} sections - The sections array
 * @returns {Promise} - Resolves to the roll results object
 */
const executeRoll = async ({rollObj,attributes,sections}) => {
  const rollString = assembleRoll(rollObj,attributes,sections);
  return startRoll(rollString);
};