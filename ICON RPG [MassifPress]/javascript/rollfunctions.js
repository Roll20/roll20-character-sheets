/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
/**
 * Function that extracts the information of which roll was clicked from the name of the button.
 * @param {string} string - The triggerName to be parsed
 * @returns {array} - Returns an array containing the repeating section name, the row id, and the field that is referenced.
 */
const extractRollInfo = function(string){
  //Get the information on which button was clicked.
  const [section,id,button] = k.parseTriggerName(string);
  //Convert the button name into the name of the relevant attribute (e.g. saving-throw => saving_throw). Also removes the `-action` suffix of the action button to get the raw field name.
  const field = button.replace(/\-?action/,'').replace(/\-/g,'_');
  return [section,id,field];
};

/**
 * Function to translate our advantage query
 * @returns {string}
 */
const translateAdvantageQuery = function(){
  //Iterate throught the advantage options and create the translated strings.
  const options = [['advantage','2d20kh1'],['normal','1d20'],['disadvantage','2d20kl1']]
  .map((arr)=>{
    const translated = k.capitalize(getTranslationByKey(arr[0]));
    return `${translated},${arr[1]}`;
  })
  .join('|');
  return `?{${k.capitalize(getTranslationByKey('roll with'))}|${options}}`;
};

/**
 * Our function that will actually initiate the roll. 
 * @param {object} attributes - Our object containing the attributes needed for the roll
 * @param {object} rollObj - The object containing the fields to send with the roll
 * @returns {void}
 */
const initiateRoll = async function(attributes,rollObj){
  if(rollObj.roll){
    rollObj.roll = rollObj.roll.replace(/@\{roll_state\}/,(match)=>{
      //If roll state is set to ask the user what to do, we need to assemble a translated version of the query.
      if(/\?\{/.test(attributes.roll_state)){
        return translateAdvantageQuery();
      }else{
        //Otherwise just use the roll_state
        return attributes.roll_state;
      }
    });
  }
  //Assemble our completed roll string.
  const message = Object.entries(rollObj)
    .reduce((text,[field,content]) => {
      return text += `{{${field}=${content}}}`;
    },`@{template_start}`);
  //Send the completed roll string to the chat parser.
  const roll = await startRoll(message);
  //An object to aggregate the changes that need to be made to what is displayed in the roll output.
  const computeObj = {};
  //If the roll contained a result, target, and roll field with an inline roll in them, then we want to compare the roll and target values to determine if the result was a success or failure.
  k.debug({roll});
  if(roll.results.result && roll.results.target && roll.results.roll){
    computeObj.result = roll.results.roll.result >= roll.results.target ? 1 : 0;
  }
  //Now we finish our roll, which tells Roll20 to actually display it in chat.
  finishRoll(roll.rollId,computeObj);
};

/**
 * Our generic rolling function. This will be used for our simple attribute and saving throw rolls that need very little logic.
 * @param {object} event - The Roll20 event object.
 * @returns {void}
 */
const rollGeneric = function(event){
  const[section,id,field] = extractRollInfo(event.triggerName);
  const attributeRef = attributeNames.indexOf(field) > -1 ?
    `${field}_mod` :
    undefined;
  k.getAttrs({
    props:rollGet,
    callback: (attributes)=>{
      //object that will aggregate all the roll template fields we will need to send to chat.
      const rollObj = {
        name:`^{${field.replace(/_/g,' ')}}`,
        roll:attributeRef ? 
          `[[@{roll_state} + 0@{${attributeRef}}]]` :
          `[[@{roll_state}]]`,
        target:`[[0@{saving_throw}]]`,
        result:`[[0[computed value]]]`
      };
      //Send the roll.
      initiateRoll(attributes,rollObj);
    }
  });
};
k.registerFuncs({rollGeneric});

const rollSave = function(event){
  const[section,id,field] = extractRollInfo(event.triggerName);
  k.getAttrs({
    props:rollGet,
    callback: (attributes)=>{
      //object that will aggregate all the roll template fields we will need to send to chat.
      const rollObj = {
        name:`^{${field.replace(/_/g,' ')}}`,
        roll:`[[1d20]]`,
        target:`[[0@{vitality}]]`,
        result:`[[0[computed value]]]`
      };
      //Send the roll.
      initiateRoll(attributes,rollObj);
    }
  });
};
k.registerFuncs({rollSave});

/**
 * Our attack roll function. This won't need much logic, but has a slightly different button/attribute relationship that we need to account for.
 * @param {object} event - The Roll20 event object.
 * @returns {void}
 */
const rollAttack = function(event){
  const[section,id,field] = extractRollInfo(event.triggerName);
  const row = `${section}_${id}`;
  k.getAttrs({
    props:[...rollGet,`${row}_type`,`${row}_damage`],
    callback:(attributes)=>{
      const type = attributes[`${row}_type`];
      const rollObj = {
        name:`@{${row}_name}`,
        roll_name:'^{attack}',
        roll:`[[@{roll_state} + 0@{attack_modifier}[${getTranslationByKey('attack modifier')}] + 0@{${row}_attack_bonus}[${getTranslationByKey('bonus')}] + 0@{${type}_mod}[${getTranslationByKey(type)}]]]`,
        range:`@{${row}_range}`,
        traits:`@{${row}_traits}`,
        aspects:`@{${row}_aspects}`,
        description:`@{${row}_description}`
      }
      if(attributes[`${row}_damage`]){
        rollObj.damage = `[[@{${row}_damage}]]`;
      }
      initiateRoll(attributes,rollObj);
    }
  });
};
k.registerFuncs({rollAttack});

// - Action CRP written by Scott C.

const assembleRollField = async (attrName,attributes,sections) => {
  const dice = attributes[`${attrName}_dice`];
  // Ask the user for their boons/curses and convert the response to a number
  const boonCurse = +(await k.extractQueryResult('Boons / Curses|NA,0|+2D,2|+1D,1|−1D,-1|−2D,-2'));
  let totalDice = Math.max(0,dice + boonCurse);
  let rollString = totalDice <= 0 ?
    `[[2d6kl1]]` :
    `[[${totalDice}d6kh1]]`;
  return rollString;
}

// Converts the rollObj into a roll string.
const assembleRollString = (rollObj,rollStart = '&{template:icon}') => {
  return Object.entries(rollObj)
    .reduce((str,[field,value]) => {
      return str + ` {{${field}=${value}}}`;
    },rollStart);
}

/**
 * Function to do icon rolls
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const iconRoll = async function({trigger,attributes,sections,casc}){
  // the async tag above tells javascript that this code will pause at some point (when we use the await keyword).
  // extract the section, rowID, and button from the trigger's name.
  const [section,rowID,button] = k.parseTriggerName(trigger.name);
  // Convert your button's name to a k-scaffold attribute name
  const attrName = button.replace(/-action$/,'').replace(/-/g,'_');
  // I specify my rolls with an object and then use an assembly function to convert them to roll strings. It makes this much easier to debug.
  const rollObj = {
    roll:await assembleRollField(attrName,attributes,sections),
    num6s:'[[0[computed value]]]'
  };

  const rollString = assembleRollString(rollObj);
  const roll = await startRoll(rollString);
  // Object to aggregate our modifications to the roll results
  const computeObj = {};
  // Count the number of 6s rolled by the dice
  computeObj.num6s = roll.results.roll.dice.reduce((total,die) => {
    if(die === 6){
      total++;
    }
    return total;
  },0);
  // Tell roll20 to release the roll to the chat with our changes.
  finishRoll(roll.rollId,computeObj);
};
k.registerFuncs({iconRoll});