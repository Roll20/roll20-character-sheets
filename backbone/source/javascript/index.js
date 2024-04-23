// This code adapted from Nic Bradley's R20 test framework from the WFRP4e official sheet.
const _ = require('underscore');
const environment = {
  attributes: {},
  triggers: [],
};
global.environment = environment;
const on = jest.fn((trigger, func) => {
  environment.triggers.push({ trigger, func });
});
global.on = on;
const getAttrs = jest.fn((query, callback) => {
  let values = {};
  for (const attr of query) {
    if (attr in environment.attributes) values[attr] = environment.attributes[attr];
  }
  if (typeof callback === "function") callback(values);
});
global.getAttrs = getAttrs;
const setAttrs = jest.fn((submit, params, callback) => {
  if (!callback && typeof params === "function") callback = params;
  for (const attr in submit) {
    environment.attributes[attr] = submit[attr];
  }
  if (typeof callback === "function") callback();
});
global.setAttrs = setAttrs;
const getSectionIDs = jest.fn((section, callback) => {
  const ids = [];
  const sectionName = section.indexOf("repeating_") === 0 ? section : `repeating_${section}`;
  const attributes = environment.attributes;
  for (const attr in attributes) {
    if (attr.indexOf(sectionName) === 0) ids.push(attr.split("_")[2]);
  }
  const idMap = [...new Set(ids)];
  if (typeof callback === "function") callback(idMap);
});
global.getSectionIDs = getSectionIDs;
const getSectionIDsSync = jest.fn((section) => {
  const ids = [];
  const sectionName = section.indexOf("repeating_") === 0 ? section : `repeating_${section}`;
  const attributes = environment.attributes;
  for (const attr in attributes) {
    if (attr.indexOf(sectionName) === 0) ids.push(attr.split("_")[2]);
  }
  const idMap = [...new Set(ids)];
  return idMap;
});
global.getSectionIDsSync = getSectionIDsSync;
const removeRepeatingRow = jest.fn((id) => {
  const attributes = environment.attributes;
  for (const attr in attributes) {
    if (attr.indexOf(id) > -1) delete environment.attributes[attr];
  }
});
global.removeRepeatingRow = removeRepeatingRow;
const getCompendiumPage = jest.fn((request, callback) => {
  const pages = compendiumData;
  if (!pages)
    throw new Error(
      "Tried to use getCompendiumPage, but testing environment does not contain compendiumData."
    );
  if (typeof request === "string") {
    const [category, pageName] = request.split(":");
    const response = {
      Name: pageName,
      Category: category,
      data: {},
    };
    if (pages[request]) response.data = pages[request].data;
    if (typeof callback === "function") callback(response);
  } else if (Array.isArray(request)) {
    const pageArray = [];
    for (const page of request) {
      if (pages[request] && pages[request].Category === category) pageArray.push(pages[pageName]);
    }
    if (typeof callback === "function") callback(pageArray);
  }
});
global.getCompendiumPage = getCompendiumPage;
const generateUUID = jest.fn(() => {
  var a = 0,
    b = [];
  return (function () {
    var c = new Date().getTime() + 0,
      d = c === a;
    a = c;
    for (var e = Array(8), f = 7; 0 <= f; f--)
      (e[f] = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c % 64)),
      (c = Math.floor(c / 64));
    c = e.join("");
    if (d) {
      for (f = 11; 0 <= f && 63 === b[f]; f--) b[f] = 0;
      b[f]++;
    } else for (f = 0; 12 > f; f++) b[f] = Math.floor(64 * Math.random());
    for (f = 0; 12 > f; f++)
      c += "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);
    return c.replace(/_/g, "z");
  })();
});
global.generateUUID = generateUUID;
const generateRowID = jest.fn(() => {
  return generateUUID().replace(/_/g, "Z");
});
global.generateRowID = generateRowID;
const simulateEvent = jest.fn((event) => {
  environment.triggers.forEach((trigger) => {
    const splitTriggers = trigger.trigger.split(" ") || [trigger.trigger];
    splitTriggers.forEach((singleTrigger) => {
      if (event === singleTrigger) {
        trigger.func({
          sourceAttribute: "test",
        });
      }
    });
  });
});
global.simulateEvent = simulateEvent;
const getTranslationByKey = jest.fn((key) => key);
global.getTranslationByKey = getTranslationByKey;
// Roll Handlingglobal.getTranslationByKey = getTranslationByKey;

const extractRollTemplate = (rollString) => {
  const rollTemplate = rollString.match(/&\{template:(.*?)\}/)?.[1];
  environment.attributes.__rolltemplate = rollTemplate;
};

const cleanRollElements = (value) => value.replace(/(\{\{|\}})/gi, "").split("=");

const extractRollElements = (rollString) => {
  const rollElements = rollString.match(/\{\{(.*?)\}{2,}/g);
  if (!rollElements || rollElements.length < 1) throw new Error("No roll elements provided in roll string");
  return  Object.fromEntries(rollElements.map(cleanRollElements));
};

const getExpression = (element) => element.replace(/(\[\[|\]\])/gi, "");

const getDiceOrHalf = (size) => {
  const diceStack = environment.diceStack;
  if (!diceStack?.[size] || diceStack[size].length < 0) return size / 2;
  return environment.diceStack[size].pop();
};

const getDiceRolls = (expression) => {
  const rolls = expression.match(/([0-9]+)?d([0-9]+)/gi);
  if (!rolls) return [];
  const allRolls = [];
  rolls.forEach((roll) => {
    const [number, size] = roll.split(/d/i);
    for (let i = 1; i <= number; i++) {
      const dice = getDiceOrHalf(size);
      allRolls.push(dice);
    }
  });
  return allRolls;
};

const calculateResult = (expression, dice) => {
  const rolls = expression.match(/([0-9]+)?d([0-9]+)/gi);
  if (!rolls) return eval(expression);
  rolls.forEach((roll, index) => {
    const [number, size] = roll.split(/d/i);
    let total = 0;
    for (let i = 1; i <= number; i++) {
      total += +dice.shift();
    }
    expression = expression.replace(/([0-9]+d[0-9]+([+\-*/][0-9]+)?)(.*?)$/gi, "$1");
    const regex = new RegExp(roll, "gi");
    expression = expression.replace(regex, total);
  });

  return eval(expression);
};

const replaceAttributes = (element) => {
  const test = /@\{(.*?)\}/i;
  while (test.test(element)) {
    element = element.replace(/@\{(.*?)\}/gi, (sub, ...args) => {
      const attributeName = args[0];
      const attributeValue = environment.attributes[attributeName];
      const attributeExists = typeof attributeValue !== "undefined";
      const possibleAttributes = Object.keys(environment.attributes);
      if (attributeExists) return attributeValue;
      else
        throw new Error(
          `Roll called ${sub} but no corresponding attribute "${attributeName}" was found. Attributes are: ${possibleAttributes.join(
            ", "
          )}`
        );
    });
  }
  return element;
};

const calculateRollResult = (rollElements) => {
  const results = {};
  for (const key in rollElements) {
    const element = rollElements[key];
    if (element.indexOf("[[") === -1) continue;
    const attributeFilled = replaceAttributes(element);
    const expression = getExpression(attributeFilled);
    const dice = getDiceRolls(expression);
    const result = calculateResult(expression, [...dice]);
    results[key] = {
      result,
      dice,
      expression,
    };
  }
  return results;
};

const startRoll = jest.fn(async (rollString) => {
  if (!rollString) throw new Error("startRoll expected a Roll String but none was provided.");
  const rollResult = { results: {} };
  extractRollTemplate(rollString);
  const rollElements = extractRollElements(rollString);
  rollResult.results = calculateRollResult(rollElements);
  rollResult.rollId = generateUUID();
  return rollResult;
});
global.startRoll = startRoll;
const finishRoll = jest.fn(() => {});
global.finishRoll = finishRoll;

  const k = (function(){
  const kFuncs = {};
  
  const cascades = {"attr_character_name":{"name":"character_name","type":"text","defaultValue":"","affects":[],"triggeredFuncs":["setActionCalls"],"listenerFunc":"accessSheet","listener":"change:character_name"},"attr_sheet_version":{"name":"sheet_version","type":"hidden","defaultValue":0,"triggeredFuncs":[],"affects":[]},"attr_sheet_state":{"name":"sheet_state","type":"hidden","defaultValue":"settings","triggeredFuncs":[],"affects":[]},"attr_collapsed":{"name":"collapsed","type":"hidden","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_backbone_tab":{"name":"backbone_tab","type":"hidden","defaultValue":"nav-tabs-backbone--settings","triggeredFuncs":[],"affects":[]},"attr_bewildered":{"triggeredFuncs":["resetCondition"],"name":"bewildered","listener":"change:bewildered","listenerFunc":"accessSheet","type":"checkbox","defaultValue":0,"affects":[]},"act_decrement-track-bewildered":{"triggeredFuncs":["decrementInput"],"name":"decrement-track-bewildered","listener":"clicked:decrement-track-bewildered","listenerFunc":"accessSheet","type":"action"},"attr_track_bewildered":{"name":"track_bewildered","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_increment-track-bewildered":{"triggeredFuncs":["incrementInput"],"name":"increment-track-bewildered","listener":"clicked:increment-track-bewildered","listenerFunc":"accessSheet","type":"action"},"attr_bleeding":{"triggeredFuncs":["resetCondition"],"name":"bleeding","listener":"change:bleeding","listenerFunc":"accessSheet","type":"checkbox","defaultValue":0,"affects":[]},"act_decrement-track-bleeding":{"triggeredFuncs":["decrementInput"],"name":"decrement-track-bleeding","listener":"clicked:decrement-track-bleeding","listenerFunc":"accessSheet","type":"action"},"attr_track_bleeding":{"name":"track_bleeding","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_increment-track-bleeding":{"triggeredFuncs":["incrementInput"],"name":"increment-track-bleeding","listener":"clicked:increment-track-bleeding","listenerFunc":"accessSheet","type":"action"},"attr_blinded":{"triggeredFuncs":["resetCondition"],"name":"blinded","listener":"change:blinded","listenerFunc":"accessSheet","type":"checkbox","defaultValue":0,"affects":[]},"act_decrement-track-blinded":{"triggeredFuncs":["decrementInput"],"name":"decrement-track-blinded","listener":"clicked:decrement-track-blinded","listenerFunc":"accessSheet","type":"action"},"attr_track_blinded":{"name":"track_blinded","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_increment-track-blinded":{"triggeredFuncs":["incrementInput"],"name":"increment-track-blinded","listener":"clicked:increment-track-blinded","listenerFunc":"accessSheet","type":"action"},"attr_burned":{"triggeredFuncs":["resetCondition"],"name":"burned","listener":"change:burned","listenerFunc":"accessSheet","type":"checkbox","defaultValue":0,"affects":[]},"act_decrement-track-burned":{"triggeredFuncs":["decrementInput"],"name":"decrement-track-burned","listener":"clicked:decrement-track-burned","listenerFunc":"accessSheet","type":"action"},"attr_track_burned":{"name":"track_burned","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_increment-track-burned":{"triggeredFuncs":["incrementInput"],"name":"increment-track-burned","listener":"clicked:increment-track-burned","listenerFunc":"accessSheet","type":"action"},"attr_confused":{"triggeredFuncs":["resetCondition"],"name":"confused","listener":"change:confused","listenerFunc":"accessSheet","type":"checkbox","defaultValue":0,"affects":[]},"act_decrement-track-confused":{"triggeredFuncs":["decrementInput"],"name":"decrement-track-confused","listener":"clicked:decrement-track-confused","listenerFunc":"accessSheet","type":"action"},"attr_track_confused":{"name":"track_confused","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_increment-track-confused":{"triggeredFuncs":["incrementInput"],"name":"increment-track-confused","listener":"clicked:increment-track-confused","listenerFunc":"accessSheet","type":"action"},"attr_deafened":{"triggeredFuncs":["resetCondition"],"name":"deafened","listener":"change:deafened","listenerFunc":"accessSheet","type":"checkbox","defaultValue":0,"affects":[]},"act_decrement-track-deafened":{"triggeredFuncs":["decrementInput"],"name":"decrement-track-deafened","listener":"clicked:decrement-track-deafened","listenerFunc":"accessSheet","type":"action"},"attr_track_deafened":{"name":"track_deafened","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_increment-track-deafened":{"triggeredFuncs":["incrementInput"],"name":"increment-track-deafened","listener":"clicked:increment-track-deafened","listenerFunc":"accessSheet","type":"action"},"attr_incapacitated":{"triggeredFuncs":["resetCondition"],"name":"incapacitated","listener":"change:incapacitated","listenerFunc":"accessSheet","type":"checkbox","defaultValue":0,"affects":[]},"act_decrement-track-incapacitated":{"triggeredFuncs":["decrementInput"],"name":"decrement-track-incapacitated","listener":"clicked:decrement-track-incapacitated","listenerFunc":"accessSheet","type":"action"},"attr_track_incapacitated":{"name":"track_incapacitated","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_increment-track-incapacitated":{"triggeredFuncs":["incrementInput"],"name":"increment-track-incapacitated","listener":"clicked:increment-track-incapacitated","listenerFunc":"accessSheet","type":"action"},"attr_infuriated":{"triggeredFuncs":["resetCondition"],"name":"infuriated","listener":"change:infuriated","listenerFunc":"accessSheet","type":"checkbox","defaultValue":0,"affects":[]},"act_decrement-track-infuriated":{"triggeredFuncs":["decrementInput"],"name":"decrement-track-infuriated","listener":"clicked:decrement-track-infuriated","listenerFunc":"accessSheet","type":"action"},"attr_track_infuriated":{"name":"track_infuriated","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_increment-track-infuriated":{"triggeredFuncs":["incrementInput"],"name":"increment-track-infuriated","listener":"clicked:increment-track-infuriated","listenerFunc":"accessSheet","type":"action"},"attr_intoxicated":{"triggeredFuncs":["resetCondition"],"name":"intoxicated","listener":"change:intoxicated","listenerFunc":"accessSheet","type":"checkbox","defaultValue":0,"affects":[]},"act_decrement-track-intoxicated":{"triggeredFuncs":["decrementInput"],"name":"decrement-track-intoxicated","listener":"clicked:decrement-track-intoxicated","listenerFunc":"accessSheet","type":"action"},"attr_track_intoxicated":{"name":"track_intoxicated","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_increment-track-intoxicated":{"triggeredFuncs":["incrementInput"],"name":"increment-track-intoxicated","listener":"clicked:increment-track-intoxicated","listenerFunc":"accessSheet","type":"action"},"attr_plagued":{"triggeredFuncs":["resetCondition"],"name":"plagued","listener":"change:plagued","listenerFunc":"accessSheet","type":"checkbox","defaultValue":0,"affects":[]},"act_decrement-track-plagued":{"triggeredFuncs":["decrementInput"],"name":"decrement-track-plagued","listener":"clicked:decrement-track-plagued","listenerFunc":"accessSheet","type":"action"},"attr_track_plagued":{"name":"track_plagued","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_increment-track-plagued":{"triggeredFuncs":["incrementInput"],"name":"increment-track-plagued","listener":"clicked:increment-track-plagued","listenerFunc":"accessSheet","type":"action"},"attr_poisoned":{"triggeredFuncs":["resetCondition"],"name":"poisoned","listener":"change:poisoned","listenerFunc":"accessSheet","type":"checkbox","defaultValue":0,"affects":[]},"act_decrement-track-poisoned":{"triggeredFuncs":["decrementInput"],"name":"decrement-track-poisoned","listener":"clicked:decrement-track-poisoned","listenerFunc":"accessSheet","type":"action"},"attr_track_poisoned":{"name":"track_poisoned","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_increment-track-poisoned":{"triggeredFuncs":["incrementInput"],"name":"increment-track-poisoned","listener":"clicked:increment-track-poisoned","listenerFunc":"accessSheet","type":"action"},"attr_panicked":{"triggeredFuncs":["resetCondition"],"name":"panicked","listener":"change:panicked","listenerFunc":"accessSheet","type":"checkbox","defaultValue":0,"affects":[]},"act_decrement-track-panicked":{"triggeredFuncs":["decrementInput"],"name":"decrement-track-panicked","listener":"clicked:decrement-track-panicked","listenerFunc":"accessSheet","type":"action"},"attr_track_panicked":{"name":"track_panicked","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_increment-track-panicked":{"triggeredFuncs":["incrementInput"],"name":"increment-track-panicked","listener":"clicked:increment-track-panicked","listenerFunc":"accessSheet","type":"action"},"attr_sleeping":{"triggeredFuncs":["resetCondition"],"name":"sleeping","listener":"change:sleeping","listenerFunc":"accessSheet","type":"checkbox","defaultValue":0,"affects":[]},"act_decrement-track-sleeping":{"triggeredFuncs":["decrementInput"],"name":"decrement-track-sleeping","listener":"clicked:decrement-track-sleeping","listenerFunc":"accessSheet","type":"action"},"attr_track_sleeping":{"name":"track_sleeping","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_increment-track-sleeping":{"triggeredFuncs":["incrementInput"],"name":"increment-track-sleeping","listener":"clicked:increment-track-sleeping","listenerFunc":"accessSheet","type":"action"},"attr_spellbound":{"triggeredFuncs":["resetCondition"],"name":"spellbound","listener":"change:spellbound","listenerFunc":"accessSheet","type":"checkbox","defaultValue":0,"affects":[]},"act_decrement-track-spellbound":{"triggeredFuncs":["decrementInput"],"name":"decrement-track-spellbound","listener":"clicked:decrement-track-spellbound","listenerFunc":"accessSheet","type":"action"},"attr_track_spellbound":{"name":"track_spellbound","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_increment-track-spellbound":{"triggeredFuncs":["incrementInput"],"name":"increment-track-spellbound","listener":"clicked:increment-track-spellbound","listenerFunc":"accessSheet","type":"action"},"attr_wounded":{"triggeredFuncs":["resetCondition"],"name":"wounded","listener":"change:wounded","listenerFunc":"accessSheet","type":"checkbox","defaultValue":0,"affects":[]},"act_decrement-track-wounded":{"triggeredFuncs":["decrementInput"],"name":"decrement-track-wounded","listener":"clicked:decrement-track-wounded","listenerFunc":"accessSheet","type":"action"},"attr_track_wounded":{"name":"track_wounded","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_increment-track-wounded":{"triggeredFuncs":["incrementInput"],"name":"increment-track-wounded","listener":"clicked:increment-track-wounded","listenerFunc":"accessSheet","type":"action"},"attr_comatose":{"triggeredFuncs":["resetCondition"],"name":"comatose","listener":"change:comatose","listenerFunc":"accessSheet","type":"checkbox","defaultValue":0,"affects":[]},"act_decrement-track-comatose":{"triggeredFuncs":["decrementInput"],"name":"decrement-track-comatose","listener":"clicked:decrement-track-comatose","listenerFunc":"accessSheet","type":"action"},"attr_track_comatose":{"name":"track_comatose","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_increment-track-comatose":{"triggeredFuncs":["incrementInput"],"name":"increment-track-comatose","listener":"clicked:increment-track-comatose","listenerFunc":"accessSheet","type":"action"},"attr_death":{"triggeredFuncs":["resetCondition"],"name":"death","listener":"change:death","listenerFunc":"accessSheet","type":"checkbox","defaultValue":0,"affects":[]},"act_decrement-track-death":{"triggeredFuncs":["decrementInput"],"name":"decrement-track-death","listener":"clicked:decrement-track-death","listenerFunc":"accessSheet","type":"action"},"attr_track_death":{"name":"track_death","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_increment-track-death":{"triggeredFuncs":["incrementInput"],"name":"increment-track-death","listener":"clicked:increment-track-death","listenerFunc":"accessSheet","type":"action"},"attr_in_extremis":{"triggeredFuncs":["resetCondition"],"name":"in_extremis","listener":"change:in_extremis","listenerFunc":"accessSheet","type":"checkbox","defaultValue":0,"affects":[]},"act_decrement-track-in-extremis":{"triggeredFuncs":["decrementInput"],"name":"decrement-track-in-extremis","listener":"clicked:decrement-track-in-extremis","listenerFunc":"accessSheet","type":"action"},"attr_track_in_extremis":{"name":"track_in_extremis","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_increment-track-in-extremis":{"triggeredFuncs":["incrementInput"],"name":"increment-track-in-extremis","listener":"clicked:increment-track-in-extremis","listenerFunc":"accessSheet","type":"action"},"attr_prone":{"triggeredFuncs":["resetCondition"],"name":"prone","listener":"change:prone","listenerFunc":"accessSheet","type":"checkbox","defaultValue":0,"affects":[]},"act_decrement-track-prone":{"triggeredFuncs":["decrementInput"],"name":"decrement-track-prone","listener":"clicked:decrement-track-prone","listenerFunc":"accessSheet","type":"action"},"attr_track_prone":{"name":"track_prone","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_increment-track-prone":{"triggeredFuncs":["incrementInput"],"name":"increment-track-prone","listener":"clicked:increment-track-prone","listenerFunc":"accessSheet","type":"action"},"attr_restrained":{"triggeredFuncs":["resetCondition"],"name":"restrained","listener":"change:restrained","listenerFunc":"accessSheet","type":"checkbox","defaultValue":0,"affects":[]},"act_decrement-track-restrained":{"triggeredFuncs":["decrementInput"],"name":"decrement-track-restrained","listener":"clicked:decrement-track-restrained","listenerFunc":"accessSheet","type":"action"},"attr_track_restrained":{"name":"track_restrained","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_increment-track-restrained":{"triggeredFuncs":["incrementInput"],"name":"increment-track-restrained","listener":"clicked:increment-track-restrained","listenerFunc":"accessSheet","type":"action"},"attr_unconscious":{"triggeredFuncs":["resetCondition"],"name":"unconscious","listener":"change:unconscious","listenerFunc":"accessSheet","type":"checkbox","defaultValue":0,"affects":[]},"act_decrement-track-unconscious":{"triggeredFuncs":["decrementInput"],"name":"decrement-track-unconscious","listener":"clicked:decrement-track-unconscious","listenerFunc":"accessSheet","type":"action"},"attr_track_unconscious":{"name":"track_unconscious","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_increment-track-unconscious":{"triggeredFuncs":["incrementInput"],"name":"increment-track-unconscious","listener":"clicked:increment-track-unconscious","listenerFunc":"accessSheet","type":"action"},"attr_roll_state":{"name":"roll_state","type":"radio","defaultValue":"2d20kh1","triggeredFuncs":[],"affects":[]},"attr_whisper":{"name":"whisper","type":"hidden","defaultValue":" ","triggeredFuncs":["sheetTypeDisplay"],"affects":[],"listener":"change:whisper","listenerFunc":"accessSheet"},"act_nav-tabs-backbone--pc":{"triggeredFuncs":["kSwitchTab"],"navFuncs":["refreshAnimations"],"name":"nav-tabs-backbone--pc","listener":"clicked:nav-tabs-backbone--pc","listenerFunc":"accessSheet","type":"action"},"act_nav-tabs-backbone--npc":{"triggeredFuncs":["kSwitchTab"],"navFuncs":["refreshAnimations"],"name":"nav-tabs-backbone--npc","listener":"clicked:nav-tabs-backbone--npc","listenerFunc":"accessSheet","type":"action"},"act_nav-tabs-backbone--settings":{"triggeredFuncs":["kSwitchTab"],"navFuncs":["refreshAnimations"],"name":"nav-tabs-backbone--settings","listener":"clicked:nav-tabs-backbone--settings","listenerFunc":"accessSheet","type":"action"},"act_condition-display":{"triggeredFuncs":["showConditions"],"name":"condition-display","listener":"clicked:condition-display","listenerFunc":"accessSheet","type":"action"},"attr_age":{"name":"age","type":"text","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_gender":{"name":"gender","type":"text","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_origin":{"name":"origin","type":"text","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_dialect":{"name":"dialect","type":"text","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_level":{"name":"level","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"attr_archetype":{"name":"archetype","type":"text","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_ideals":{"name":"ideals","type":"text","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_fortune":{"name":"fortune","type":"text","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_aptitude":{"affects":["reflex_goal"],"name":"aptitude","listener":"change:aptitude","listenerFunc":"accessSheet","type":"number","defaultValue":0,"triggeredFuncs":[]},"attr_athletics":{"affects":["reflex_goal","movement_rate","sprint_speed","item_slots_max"],"name":"athletics","listener":"change:athletics","listenerFunc":"accessSheet","type":"number","defaultValue":0,"triggeredFuncs":[]},"attr_charisma":{"affects":["intuition_goal"],"name":"charisma","listener":"change:charisma","listenerFunc":"accessSheet","type":"number","defaultValue":0,"triggeredFuncs":[]},"attr_logic":{"affects":["vigilance_goal"],"name":"logic","listener":"change:logic","listenerFunc":"accessSheet","type":"number","defaultValue":0,"triggeredFuncs":[]},"attr_wisdom":{"affects":["intuition_goal"],"name":"wisdom","listener":"change:wisdom","listenerFunc":"accessSheet","type":"number","defaultValue":0,"triggeredFuncs":[]},"attr_size":{"affects":["build_goal","item_slots_max"],"name":"size","listener":"change:size","listenerFunc":"accessSheet","type":"number","defaultValue":0,"triggeredFuncs":[]},"attr_stamina":{"affects":["build_goal"],"name":"stamina","listener":"change:stamina","listenerFunc":"accessSheet","type":"number","defaultValue":0,"triggeredFuncs":[]},"attr_willpower":{"affects":["vigilance_goal"],"name":"willpower","listener":"change:willpower","listenerFunc":"accessSheet","type":"number","defaultValue":0,"triggeredFuncs":[]},"attr_vigilance_goal":{"calculation":"calcAttribute","affects":["vigilance"],"name":"vigilance_goal","listener":"change:vigilance_goal","listenerFunc":"accessSheet","type":"number","defaultValue":11,"triggeredFuncs":[]},"act_vigilance-action":{"triggeredFuncs":["rollAttribute"],"name":"vigilance-action","listener":"clicked:vigilance-action","listenerFunc":"accessSheet","type":"action"},"attr_vigilance_action":{"name":"vigilance_action","type":"hidden","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_vigilance":{"calculation":"calcAttributeMod","name":"vigilance","type":"hidden","defaultValue":0,"triggeredFuncs":[],"affects":[]},"attr_build_goal":{"calculation":"calcAttribute","affects":["build"],"name":"build_goal","listener":"change:build_goal","listenerFunc":"accessSheet","type":"number","defaultValue":11,"triggeredFuncs":[]},"act_build-action":{"triggeredFuncs":["rollAttribute"],"name":"build-action","listener":"clicked:build-action","listenerFunc":"accessSheet","type":"action"},"attr_build_action":{"name":"build_action","type":"hidden","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_build":{"calculation":"calcAttributeMod","name":"build","type":"hidden","defaultValue":0,"triggeredFuncs":[],"affects":[]},"attr_intuition_goal":{"calculation":"calcAttribute","affects":["intuition"],"name":"intuition_goal","listener":"change:intuition_goal","listenerFunc":"accessSheet","type":"number","defaultValue":11,"triggeredFuncs":[]},"act_intuition-action":{"triggeredFuncs":["rollAttribute"],"name":"intuition-action","listener":"clicked:intuition-action","listenerFunc":"accessSheet","type":"action"},"attr_intuition_action":{"name":"intuition_action","type":"hidden","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_intuition":{"calculation":"calcAttributeMod","name":"intuition","type":"hidden","defaultValue":0,"triggeredFuncs":[],"affects":[]},"attr_reflex_goal":{"calculation":"calcAttribute","affects":["reflex"],"name":"reflex_goal","listener":"change:reflex_goal","listenerFunc":"accessSheet","type":"number","defaultValue":11,"triggeredFuncs":[]},"act_reflex-action":{"triggeredFuncs":["rollAttribute"],"name":"reflex-action","listener":"clicked:reflex-action","listenerFunc":"accessSheet","type":"action"},"attr_reflex_action":{"name":"reflex_action","type":"hidden","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_reflex":{"calculation":"calcAttributeMod","name":"reflex","type":"hidden","defaultValue":0,"triggeredFuncs":[],"affects":[]},"attr_armor-collapse":{"name":"armor-collapse","type":"checkbox","defaultValue":0,"triggeredFuncs":[],"affects":[]},"attr_armor":{"name":"armor","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"attr_movement_rate":{"calculation":"calcMovement","name":"movement_rate","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"attr_sprint_speed":{"calculation":"calcSprint","name":"sprint_speed","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"attr_armor_name":{"name":"armor_name","type":"text","defaultValue":"","triggeredFuncs":[],"affects":[]},"act_unequip-armor":{"triggeredFuncs":["equipArmor"],"name":"unequip-armor","listener":"clicked:unequip-armor","listenerFunc":"accessSheet","type":"action"},"attr_armor_details":{"name":"armor_details","type":"span","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_health":{"name":"health","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_health-action":{"triggeredFuncs":["rollHealthCheck"],"name":"health-action","listener":"clicked:health-action","listenerFunc":"accessSheet","type":"action"},"attr_health_action":{"name":"health_action","type":"hidden","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_health_max":{"name":"health_max","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"attr_resolve":{"name":"resolve","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_resolve-action":{"triggeredFuncs":["rollHealthCheck"],"name":"resolve-action","listener":"clicked:resolve-action","listenerFunc":"accessSheet","type":"action"},"attr_resolve_action":{"name":"resolve_action","type":"hidden","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_resolve_max":{"name":"resolve_max","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"attr_luck":{"name":"luck","type":"radio","defaultValue":"odd","triggeredFuncs":[],"affects":[]},"act_luck-action":{"triggeredFuncs":["rollLuck"],"name":"luck-action","listener":"clicked:luck-action","listenerFunc":"accessSheet","type":"action"},"attr_luck_action":{"name":"luck_action","type":"hidden","defaultValue":"","triggeredFuncs":[],"affects":[]},"act_decrement-adrenaline":{"triggeredFuncs":["decrementInput"],"name":"decrement-adrenaline","listener":"clicked:decrement-adrenaline","listenerFunc":"accessSheet","type":"action"},"attr_adrenaline":{"name":"adrenaline","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_increment-adrenaline":{"triggeredFuncs":["incrementInput"],"name":"increment-adrenaline","listener":"clicked:increment-adrenaline","listenerFunc":"accessSheet","type":"action"},"act_decrement-skill-points":{"triggeredFuncs":["decrementInput"],"name":"decrement-skill-points","listener":"clicked:decrement-skill-points","listenerFunc":"accessSheet","type":"action"},"attr_skill_points":{"name":"skill_points","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_increment-skill-points":{"triggeredFuncs":["incrementInput"],"name":"increment-skill-points","listener":"clicked:increment-skill-points","listenerFunc":"accessSheet","type":"action"},"act_assess-action":{"triggeredFuncs":["rollSkill"],"name":"assess-action","listener":"clicked:assess-action","listenerFunc":"accessSheet","type":"action"},"attr_assess_action":{"name":"assess_action","type":"hidden","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_assess_proficiency":{"name":"assess_proficiency","type":"radio","defaultValue":-1,"triggeredFuncs":[],"affects":[]},"attr_assess_mastery":{"name":"assess_mastery","type":"checkbox","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_deceive-action":{"triggeredFuncs":["rollSkill"],"name":"deceive-action","listener":"clicked:deceive-action","listenerFunc":"accessSheet","type":"action"},"attr_deceive_action":{"name":"deceive_action","type":"hidden","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_deceive_proficiency":{"name":"deceive_proficiency","type":"radio","defaultValue":-1,"triggeredFuncs":[],"affects":[]},"attr_deceive_mastery":{"name":"deceive_mastery","type":"checkbox","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_deduce-action":{"triggeredFuncs":["rollSkill"],"name":"deduce-action","listener":"clicked:deduce-action","listenerFunc":"accessSheet","type":"action"},"attr_deduce_action":{"name":"deduce_action","type":"hidden","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_deduce_proficiency":{"name":"deduce_proficiency","type":"radio","defaultValue":-1,"triggeredFuncs":[],"affects":[]},"attr_deduce_mastery":{"name":"deduce_mastery","type":"checkbox","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_disguise-action":{"triggeredFuncs":["rollSkill"],"name":"disguise-action","listener":"clicked:disguise-action","listenerFunc":"accessSheet","type":"action"},"attr_disguise_action":{"name":"disguise_action","type":"hidden","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_disguise_proficiency":{"name":"disguise_proficiency","type":"radio","defaultValue":-1,"triggeredFuncs":[],"affects":[]},"attr_disguise_mastery":{"name":"disguise_mastery","type":"checkbox","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_encrypt-action":{"triggeredFuncs":["rollSkill"],"name":"encrypt-action","listener":"clicked:encrypt-action","listenerFunc":"accessSheet","type":"action"},"attr_encrypt_action":{"name":"encrypt_action","type":"hidden","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_encrypt_proficiency":{"name":"encrypt_proficiency","type":"radio","defaultValue":-1,"triggeredFuncs":[],"affects":[]},"attr_encrypt_mastery":{"name":"encrypt_mastery","type":"checkbox","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_first-aid-action":{"triggeredFuncs":["rollSkill"],"name":"first-aid-action","listener":"clicked:first-aid-action","listenerFunc":"accessSheet","type":"action"},"attr_first_aid_action":{"name":"first_aid_action","type":"hidden","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_first_aid_proficiency":{"name":"first_aid_proficiency","type":"radio","defaultValue":-1,"triggeredFuncs":[],"affects":[]},"attr_first_aid_mastery":{"name":"first_aid_mastery","type":"checkbox","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_hide-action":{"triggeredFuncs":["rollSkill"],"name":"hide-action","listener":"clicked:hide-action","listenerFunc":"accessSheet","type":"action"},"attr_hide_action":{"name":"hide_action","type":"hidden","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_hide_proficiency":{"name":"hide_proficiency","type":"radio","defaultValue":-1,"triggeredFuncs":[],"affects":[]},"attr_hide_mastery":{"name":"hide_mastery","type":"checkbox","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_legerdemain-action":{"triggeredFuncs":["rollSkill"],"name":"legerdemain-action","listener":"clicked:legerdemain-action","listenerFunc":"accessSheet","type":"action"},"attr_legerdemain_action":{"name":"legerdemain_action","type":"hidden","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_legerdemain_proficiency":{"name":"legerdemain_proficiency","type":"radio","defaultValue":-1,"triggeredFuncs":[],"affects":[]},"attr_legerdemain_mastery":{"name":"legerdemain_mastery","type":"checkbox","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_locksmith-action":{"triggeredFuncs":["rollSkill"],"name":"locksmith-action","listener":"clicked:locksmith-action","listenerFunc":"accessSheet","type":"action"},"attr_locksmith_action":{"name":"locksmith_action","type":"hidden","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_locksmith_proficiency":{"name":"locksmith_proficiency","type":"radio","defaultValue":-1,"triggeredFuncs":[],"affects":[]},"attr_locksmith_mastery":{"name":"locksmith_mastery","type":"checkbox","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_nurse-(ment)-action":{"triggeredFuncs":["rollSkill"],"name":"nurse-(ment)-action","listener":"clicked:nurse-(ment)-action","listenerFunc":"accessSheet","type":"action"},"attr_nurse_(ment)_action":{"name":"nurse_(ment)_action","type":"hidden","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_nurse_(ment)_proficiency":{"name":"nurse_(ment)_proficiency","type":"radio","defaultValue":-1,"triggeredFuncs":[],"affects":[]},"attr_nurse_(ment)_mastery":{"name":"nurse_(ment)_mastery","type":"checkbox","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_nurse-(phys)-action":{"triggeredFuncs":["rollSkill"],"name":"nurse-(phys)-action","listener":"clicked:nurse-(phys)-action","listenerFunc":"accessSheet","type":"action"},"attr_nurse_(phys)_action":{"name":"nurse_(phys)_action","type":"hidden","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_nurse_(phys)_proficiency":{"name":"nurse_(phys)_proficiency","type":"radio","defaultValue":-1,"triggeredFuncs":[],"affects":[]},"attr_nurse_(phys)_mastery":{"name":"nurse_(phys)_mastery","type":"checkbox","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_persuade-action":{"triggeredFuncs":["rollSkill"],"name":"persuade-action","listener":"clicked:persuade-action","listenerFunc":"accessSheet","type":"action"},"attr_persuade_action":{"name":"persuade_action","type":"hidden","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_persuade_proficiency":{"name":"persuade_proficiency","type":"radio","defaultValue":-1,"triggeredFuncs":[],"affects":[]},"attr_persuade_mastery":{"name":"persuade_mastery","type":"checkbox","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_research-action":{"triggeredFuncs":["rollSkill"],"name":"research-action","listener":"clicked:research-action","listenerFunc":"accessSheet","type":"action"},"attr_research_action":{"name":"research_action","type":"hidden","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_research_proficiency":{"name":"research_proficiency","type":"radio","defaultValue":-1,"triggeredFuncs":[],"affects":[]},"attr_research_mastery":{"name":"research_mastery","type":"checkbox","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_ride/steer-action":{"triggeredFuncs":["rollSkill"],"name":"ride/steer-action","listener":"clicked:ride/steer-action","listenerFunc":"accessSheet","type":"action"},"attr_ride/steer_action":{"name":"ride/steer_action","type":"hidden","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_ride/steer_proficiency":{"name":"ride/steer_proficiency","type":"radio","defaultValue":-1,"triggeredFuncs":[],"affects":[]},"attr_ride/steer_mastery":{"name":"ride/steer_mastery","type":"checkbox","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_search-action":{"triggeredFuncs":["rollSkill"],"name":"search-action","listener":"clicked:search-action","listenerFunc":"accessSheet","type":"action"},"attr_search_action":{"name":"search_action","type":"hidden","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_search_proficiency":{"name":"search_proficiency","type":"radio","defaultValue":-1,"triggeredFuncs":[],"affects":[]},"attr_search_mastery":{"name":"search_mastery","type":"checkbox","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_sneak-action":{"triggeredFuncs":["rollSkill"],"name":"sneak-action","listener":"clicked:sneak-action","listenerFunc":"accessSheet","type":"action"},"attr_sneak_action":{"name":"sneak_action","type":"hidden","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_sneak_proficiency":{"name":"sneak_proficiency","type":"radio","defaultValue":-1,"triggeredFuncs":[],"affects":[]},"attr_sneak_mastery":{"name":"sneak_mastery","type":"checkbox","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_stunt-action":{"triggeredFuncs":["rollSkill"],"name":"stunt-action","listener":"clicked:stunt-action","listenerFunc":"accessSheet","type":"action"},"attr_stunt_action":{"name":"stunt_action","type":"hidden","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_stunt_proficiency":{"name":"stunt_proficiency","type":"radio","defaultValue":-1,"triggeredFuncs":[],"affects":[]},"attr_stunt_mastery":{"name":"stunt_mastery","type":"checkbox","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_survive-action":{"triggeredFuncs":["rollSkill"],"name":"survive-action","listener":"clicked:survive-action","listenerFunc":"accessSheet","type":"action"},"attr_survive_action":{"name":"survive_action","type":"hidden","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_survive_proficiency":{"name":"survive_proficiency","type":"radio","defaultValue":-1,"triggeredFuncs":[],"affects":[]},"attr_survive_mastery":{"name":"survive_mastery","type":"checkbox","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_threaten-action":{"triggeredFuncs":["rollSkill"],"name":"threaten-action","listener":"clicked:threaten-action","listenerFunc":"accessSheet","type":"action"},"attr_threaten_action":{"name":"threaten_action","type":"hidden","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_threaten_proficiency":{"name":"threaten_proficiency","type":"radio","defaultValue":-1,"triggeredFuncs":[],"affects":[]},"attr_threaten_mastery":{"name":"threaten_mastery","type":"checkbox","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_tinker-action":{"triggeredFuncs":["rollSkill"],"name":"tinker-action","listener":"clicked:tinker-action","listenerFunc":"accessSheet","type":"action"},"attr_tinker_action":{"name":"tinker_action","type":"hidden","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_tinker_proficiency":{"name":"tinker_proficiency","type":"radio","defaultValue":-1,"triggeredFuncs":[],"affects":[]},"attr_tinker_mastery":{"name":"tinker_mastery","type":"checkbox","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_melee-action":{"triggeredFuncs":["rollSkill"],"name":"melee-action","listener":"clicked:melee-action","listenerFunc":"accessSheet","type":"action"},"attr_melee_action":{"name":"melee_action","type":"hidden","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_melee_proficiency":{"name":"melee_proficiency","type":"radio","defaultValue":-1,"triggeredFuncs":[],"affects":[]},"attr_melee_mastery":{"name":"melee_mastery","type":"checkbox","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_ranged-action":{"triggeredFuncs":["rollSkill"],"name":"ranged-action","listener":"clicked:ranged-action","listenerFunc":"accessSheet","type":"action"},"attr_ranged_action":{"name":"ranged_action","type":"hidden","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_ranged_proficiency":{"name":"ranged_proficiency","type":"radio","defaultValue":-1,"triggeredFuncs":[],"affects":[]},"attr_ranged_mastery":{"name":"ranged_mastery","type":"checkbox","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_add-specialty":{"listenerFunc":"addItem","name":"add-specialty","listener":"clicked:add-specialty","type":"action"},"act_repeating_specialty_$X_action":{"triggeredFuncs":["rollSkill"],"name":"repeating_specialty_$X_action","listener":"clicked:repeating_specialty:action","listenerFunc":"accessSheet","type":"action"},"attr_repeating_specialty_$X_action":{"name":"repeating_specialty_$X_action","type":"hidden","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_repeating_specialty_$X_name":{"name":"repeating_specialty_$X_name","type":"text","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_repeating_specialty_$X_proficiency":{"name":"repeating_specialty_$X_proficiency","type":"radio","defaultValue":-1,"triggeredFuncs":[],"affects":[]},"attr_repeating_specialty_$X_characteristic":{"name":"repeating_specialty_$X_characteristic","type":"select","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_repeating_specialty_$X_undefined_mastery":{"name":"repeating_specialty_$X_undefined_mastery","type":"checkbox","defaultValue":0,"triggeredFuncs":[],"affects":[]},"attr_credit":{"name":"credit","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"attr_coin":{"name":"coin","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"attr_badge":{"name":"badge","type":"text","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_clothes":{"name":"clothes","type":"span","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_overburdened":{"calculation":"calcOverburdened","name":"overburdened","type":"checkbox","defaultValue":0,"triggeredFuncs":[],"affects":[]},"attr_item_slots":{"affects":["overburdened"],"calculation":"calcUsedSlots","name":"item_slots","listener":"change:item_slots","listenerFunc":"accessSheet","type":"number","defaultValue":0,"triggeredFuncs":[]},"attr_item_slots_max":{"affects":["overburdened"],"calculation":"calcItemSlotsMax","name":"item_slots_max","listener":"change:item_slots_max","listenerFunc":"accessSheet","type":"number","defaultValue":0,"triggeredFuncs":[]},"act_add-equipped":{"listenerFunc":"addItem","name":"add-equipped","listener":"clicked:add-equipped","type":"action"},"attr_repeating_equipped_$X_collapse":{"name":"repeating_equipped_$X_collapse","type":"checkbox","defaultValue":0,"triggeredFuncs":[],"affects":[]},"attr_repeating_equipped_$X_equipped":{"triggeredFuncs":["equipItem"],"affects":["item_slots"],"name":"repeating_equipped_$X_equipped","listener":"change:repeating_equipped:equipped","listenerFunc":"accessSheet","type":"checkbox","defaultValue":1},"attr_repeating_equipped_$X_name":{"name":"repeating_equipped_$X_name","type":"text","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_repeating_equipped_$X_uses":{"name":"repeating_equipped_$X_uses","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"attr_repeating_equipped_$X_uses_max":{"name":"repeating_equipped_$X_uses_max","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_repeating_equipped_$X_action":{"triggeredFuncs":["rollRepeating"],"name":"repeating_equipped_$X_action","listener":"clicked:repeating_equipped:action","listenerFunc":"accessSheet","type":"action"},"attr_repeating_equipped_$X_action":{"name":"repeating_equipped_$X_action","type":"hidden","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_repeating_equipped_$X_skill":{"name":"repeating_equipped_$X_skill","type":"select","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_repeating_equipped_$X_uses_slot":{"affects":["item_slots"],"name":"repeating_equipped_$X_uses_slot","listener":"change:repeating_equipped:uses_slot","listenerFunc":"accessSheet","type":"checkbox","defaultValue":1,"triggeredFuncs":[]},"attr_repeating_equipped_$X_item_size":{"name":"repeating_equipped_$X_item_size","type":"select","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_repeating_equipped_$X_description":{"name":"repeating_equipped_$X_description","type":"span","defaultValue":"","triggeredFuncs":[],"affects":[]},"act_add-stored":{"listenerFunc":"addItem","name":"add-stored","listener":"clicked:add-stored","type":"action"},"attr_repeating_stored_$X_collapse":{"name":"repeating_stored_$X_collapse","type":"checkbox","defaultValue":0,"triggeredFuncs":[],"affects":[]},"attr_repeating_stored_$X_equipped":{"triggeredFuncs":["equipItem"],"affects":["item_slots"],"name":"repeating_stored_$X_equipped","listener":"change:repeating_stored:equipped","listenerFunc":"accessSheet","type":"checkbox","defaultValue":0},"attr_repeating_stored_$X_name":{"name":"repeating_stored_$X_name","type":"text","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_repeating_stored_$X_type":{"name":"repeating_stored_$X_type","type":"select","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_repeating_stored_$X_wear":{"name":"repeating_stored_$X_wear","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"attr_repeating_stored_$X_skill":{"name":"repeating_stored_$X_skill","type":"select","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_repeating_stored_$X_properties":{"name":"repeating_stored_$X_properties","type":"text","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_repeating_stored_$X_damage":{"name":"repeating_stored_$X_damage","type":"text","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_repeating_stored_$X_damage_characteristic":{"name":"repeating_stored_$X_damage_characteristic","type":"select","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_repeating_stored_$X_range":{"name":"repeating_stored_$X_range","type":"text","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_repeating_stored_$X_uses":{"name":"repeating_stored_$X_uses","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"attr_repeating_stored_$X_uses_max":{"name":"repeating_stored_$X_uses_max","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"attr_repeating_stored_$X_armor_bonus":{"name":"repeating_stored_$X_armor_bonus","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"attr_repeating_stored_$X_uses_slot":{"affects":["item_slots"],"name":"repeating_stored_$X_uses_slot","listener":"change:repeating_stored:uses_slot","listenerFunc":"accessSheet","type":"checkbox","defaultValue":1,"triggeredFuncs":[]},"attr_repeating_stored_$X_item_size":{"name":"repeating_stored_$X_item_size","type":"select","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_repeating_stored_$X_description":{"name":"repeating_stored_$X_description","type":"span","defaultValue":"","triggeredFuncs":[],"affects":[]},"act_add-weapon":{"listenerFunc":"addItem","name":"add-weapon","listener":"clicked:add-weapon","type":"action"},"fieldset_repeating_weapon":{"addFuncs":["addWeapon"],"name":"repeating_weapon","type":"fieldset"},"attr_repeating_weapon_$X_collapse":{"name":"repeating_weapon_$X_collapse","type":"checkbox","defaultValue":0,"triggeredFuncs":[],"affects":[]},"attr_repeating_weapon_$X_equipped":{"triggeredFuncs":["equipItem"],"affects":["item_slots"],"name":"repeating_weapon_$X_equipped","listener":"change:repeating_weapon:equipped","listenerFunc":"accessSheet","type":"checkbox","defaultValue":1},"attr_repeating_weapon_$X_name":{"name":"repeating_weapon_$X_name","type":"text","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_repeating_weapon_$X_wear":{"name":"repeating_weapon_$X_wear","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_repeating_weapon_$X_action":{"triggeredFuncs":["rollRepeating"],"name":"repeating_weapon_$X_action","listener":"clicked:repeating_weapon:action","listenerFunc":"accessSheet","type":"action"},"attr_repeating_weapon_$X_action":{"name":"repeating_weapon_$X_action","type":"hidden","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_repeating_weapon_$X_type":{"defaultValue":"","name":"repeating_weapon_$X_type","type":"checkbox","triggeredFuncs":[],"affects":[]},"attr_repeating_weapon_$X_skill":{"name":"repeating_weapon_$X_skill","type":"select","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_repeating_weapon_$X_properties":{"name":"repeating_weapon_$X_properties","type":"text","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_repeating_weapon_$X_damage":{"name":"repeating_weapon_$X_damage","type":"text","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_repeating_weapon_$X_damage_characteristic":{"name":"repeating_weapon_$X_damage_characteristic","type":"select","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_repeating_weapon_$X_range":{"name":"repeating_weapon_$X_range","type":"text","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_repeating_weapon_$X_uses_slot":{"affects":["item_slots"],"name":"repeating_weapon_$X_uses_slot","listener":"change:repeating_weapon:uses_slot","listenerFunc":"accessSheet","type":"checkbox","defaultValue":1,"triggeredFuncs":[]},"attr_repeating_weapon_$X_item_size":{"name":"repeating_weapon_$X_item_size","type":"select","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_repeating_weapon_$X_description":{"name":"repeating_weapon_$X_description","type":"span","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_container_1":{"name":"container_1","type":"text","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_ammo_1":{"name":"ammo_1","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"attr_ammo_type_1":{"name":"ammo_type_1","type":"text","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_ammo_2":{"name":"ammo_2","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"attr_ammo_type_2":{"name":"ammo_type_2","type":"text","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_container_2":{"name":"container_2","type":"text","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_ammo_3":{"name":"ammo_3","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"attr_ammo_type_3":{"name":"ammo_type_3","type":"text","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_ammo_4":{"name":"ammo_4","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"attr_ammo_type_4":{"name":"ammo_type_4","type":"text","defaultValue":"","triggeredFuncs":[],"affects":[]},"act_add-ability":{"listenerFunc":"addItem","name":"add-ability","listener":"clicked:add-ability","type":"action"},"attr_repeating_ability_$X_collapse":{"name":"repeating_ability_$X_collapse","type":"checkbox","defaultValue":0,"triggeredFuncs":[],"affects":[]},"act_repeating_ability_$X_action":{"triggeredFuncs":["rollRepeating"],"name":"repeating_ability_$X_action","listener":"clicked:repeating_ability:action","listenerFunc":"accessSheet","type":"action"},"attr_repeating_ability_$X_action":{"name":"repeating_ability_$X_action","type":"hidden","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_repeating_ability_$X_name":{"name":"repeating_ability_$X_name","type":"text","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_repeating_ability_$X_skill":{"name":"repeating_ability_$X_skill","type":"select","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_repeating_ability_$X_description":{"name":"repeating_ability_$X_description","type":"span","defaultValue":"","triggeredFuncs":[],"affects":[]},"act_add-favorable":{"listenerFunc":"addItem","name":"add-favorable","listener":"clicked:add-favorable","type":"action"},"attr_repeating_favorable_$X_collapse":{"name":"repeating_favorable_$X_collapse","type":"checkbox","defaultValue":0,"triggeredFuncs":[],"affects":[]},"attr_repeating_favorable_$X_name":{"name":"repeating_favorable_$X_name","type":"text","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_repeating_favorable_$X_description":{"name":"repeating_favorable_$X_description","type":"span","defaultValue":"","triggeredFuncs":[],"affects":[]},"act_add-unfavorable":{"listenerFunc":"addItem","name":"add-unfavorable","listener":"clicked:add-unfavorable","type":"action"},"attr_repeating_unfavorable_$X_collapse":{"name":"repeating_unfavorable_$X_collapse","type":"checkbox","defaultValue":0,"triggeredFuncs":[],"affects":[]},"attr_repeating_unfavorable_$X_name":{"name":"repeating_unfavorable_$X_name","type":"text","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_repeating_unfavorable_$X_description":{"name":"repeating_unfavorable_$X_description","type":"span","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_backstory":{"name":"backstory","type":"span","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_notes":{"name":"notes","type":"span","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_difficulty_size":{"name":"difficulty_size","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"attr_difficulty_level":{"name":"difficulty_level","type":"number","defaultValue":0,"triggeredFuncs":[],"affects":[]},"attr_npc_skills":{"name":"npc_skills","type":"checkbox","defaultValue":0,"triggeredFuncs":[],"affects":[]},"attr_assess":{"name":"assess","type":"hidden","defaultValue":"","triggeredFuncs":["displayNPCSkill"],"affects":[],"listener":"change:assess","listenerFunc":"accessSheet"},"attr_deceive":{"name":"deceive","type":"hidden","defaultValue":"","triggeredFuncs":["displayNPCSkill"],"affects":[],"listener":"change:deceive","listenerFunc":"accessSheet"},"attr_deduce":{"name":"deduce","type":"hidden","defaultValue":"","triggeredFuncs":["displayNPCSkill"],"affects":[],"listener":"change:deduce","listenerFunc":"accessSheet"},"attr_disguise":{"name":"disguise","type":"hidden","defaultValue":"","triggeredFuncs":["displayNPCSkill"],"affects":[],"listener":"change:disguise","listenerFunc":"accessSheet"},"attr_encrypt":{"name":"encrypt","type":"hidden","defaultValue":"","triggeredFuncs":["displayNPCSkill"],"affects":[],"listener":"change:encrypt","listenerFunc":"accessSheet"},"attr_first_aid":{"name":"first_aid","type":"hidden","defaultValue":"","triggeredFuncs":["displayNPCSkill"],"affects":[],"listener":"change:first_aid","listenerFunc":"accessSheet"},"attr_hide":{"name":"hide","type":"hidden","defaultValue":"","triggeredFuncs":["displayNPCSkill"],"affects":[],"listener":"change:hide","listenerFunc":"accessSheet"},"attr_legerdemain":{"name":"legerdemain","type":"hidden","defaultValue":"","triggeredFuncs":["displayNPCSkill"],"affects":[],"listener":"change:legerdemain","listenerFunc":"accessSheet"},"attr_locksmith":{"name":"locksmith","type":"hidden","defaultValue":"","triggeredFuncs":["displayNPCSkill"],"affects":[],"listener":"change:locksmith","listenerFunc":"accessSheet"},"attr_nurse_(ment)":{"name":"nurse_(ment)","type":"hidden","defaultValue":"","triggeredFuncs":["displayNPCSkill"],"affects":[],"listener":"change:nurse_(ment)","listenerFunc":"accessSheet"},"attr_nurse_(phys)":{"name":"nurse_(phys)","type":"hidden","defaultValue":"","triggeredFuncs":["displayNPCSkill"],"affects":[],"listener":"change:nurse_(phys)","listenerFunc":"accessSheet"},"attr_persuade":{"name":"persuade","type":"hidden","defaultValue":"","triggeredFuncs":["displayNPCSkill"],"affects":[],"listener":"change:persuade","listenerFunc":"accessSheet"},"attr_research":{"name":"research","type":"hidden","defaultValue":"","triggeredFuncs":["displayNPCSkill"],"affects":[],"listener":"change:research","listenerFunc":"accessSheet"},"attr_ride/steer":{"name":"ride/steer","type":"hidden","defaultValue":"","triggeredFuncs":["displayNPCSkill"],"affects":[],"listener":"change:ride/steer","listenerFunc":"accessSheet"},"attr_search":{"name":"search","type":"hidden","defaultValue":"","triggeredFuncs":["displayNPCSkill"],"affects":[],"listener":"change:search","listenerFunc":"accessSheet"},"attr_sneak":{"name":"sneak","type":"hidden","defaultValue":"","triggeredFuncs":["displayNPCSkill"],"affects":[],"listener":"change:sneak","listenerFunc":"accessSheet"},"attr_stunt":{"name":"stunt","type":"hidden","defaultValue":"","triggeredFuncs":["displayNPCSkill"],"affects":[],"listener":"change:stunt","listenerFunc":"accessSheet"},"attr_survive":{"name":"survive","type":"hidden","defaultValue":"","triggeredFuncs":["displayNPCSkill"],"affects":[],"listener":"change:survive","listenerFunc":"accessSheet"},"attr_threaten":{"name":"threaten","type":"hidden","defaultValue":"","triggeredFuncs":["displayNPCSkill"],"affects":[],"listener":"change:threaten","listenerFunc":"accessSheet"},"attr_tinker":{"name":"tinker","type":"hidden","defaultValue":"","triggeredFuncs":["displayNPCSkill"],"affects":[],"listener":"change:tinker","listenerFunc":"accessSheet"},"attr_melee":{"name":"melee","type":"hidden","defaultValue":"","triggeredFuncs":["displayNPCSkill"],"affects":[],"listener":"change:melee","listenerFunc":"accessSheet"},"attr_ranged":{"name":"ranged","type":"hidden","defaultValue":"","triggeredFuncs":["displayNPCSkill"],"affects":[],"listener":"change:ranged","listenerFunc":"accessSheet"},"attr_repeating_ability_$X_type":{"name":"repeating_ability_$X_type","type":"span","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_npc_items":{"name":"npc_items","type":"span","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_character_type":{"triggeredFuncs":["sheetTypeDisplay"],"name":"character_type","listener":"change:character_type","listenerFunc":"accessSheet","type":"select","defaultValue":"","affects":[]},"attr_template_start":{"name":"template_start","type":"hidden","defaultValue":"@{whisper}&{template:backbone} {{character_name=@{character_name}}} {{character_id=@{character_id}}}","triggeredFuncs":[],"affects":[]}};
  
  kFuncs.cascades = cascades;
  
  const repeatingSectionDetails = [{"section":"repeating_specialty","fields":["action","name","proficiency","characteristic","undefined_mastery"]},{"section":"repeating_equipped","fields":["collapse","equipped","name","uses","uses_max","action","skill","uses_slot","item_size","description"]},{"section":"repeating_stored","fields":["collapse","equipped","name","type","wear","skill","properties","damage","damage_characteristic","range","uses","uses_max","armor_bonus","uses_slot","item_size","description"]},{"section":"repeating_weapon","fields":["collapse","equipped","name","wear","action","type","skill","properties","damage","damage_characteristic","range","uses_slot","item_size","description"]},{"section":"repeating_ability","fields":["collapse","action","name","skill","description","type"]},{"section":"repeating_favorable","fields":["collapse","name","description"]},{"section":"repeating_unfavorable","fields":["collapse","name","description"]}];
  
  kFuncs.repeatingSectionDetails = repeatingSectionDetails;
  /**
 * This stores the name of your sheet for use in the logging functions {@link log} and {@link debug}. Accessible by `k.sheetName`
 * @var
 * @type {string}
 */
let sheetName = 'kScaffold Powered Sheet';
kFuncs.sheetName = sheetName;
/**
	* This stores the version of your sheet for use in the logging functions{@link log} and {@link debug}. It is also stored in the sheet_version attribute on your character sheet. Accessible via `k.version`
	* @var
	* @type {number}
	*/
let version = 0;
kFuncs.version = version;
/**
	* A boolean flag that tells the script whether to enable or disable {@link debug} calls. If the version of the sheet is `0`, or an attribute named `debug_mode` is found on opening this is set to true for your entire session. Otherwise, it remains false.
	* @var
	* @type {boolean}
	*/
let debugMode = false;
kFuncs.debugMode = debugMode;
const funcs = {};
kFuncs.funcs = funcs;
const updateHandlers = {};
const openHandlers = {};
const initialSetups = {};
const allHandlers = {};
const addFuncs = {};

const kscaffoldJSVersion = '0.0.4';
const kscaffoldPUGVersion = '0.0.4';
  /*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
/**
 * Replaces problem characters to use a string as a regex
 * @param {string} text - The text to replace characters in
 * @returns {string}
 * @example
 * const textForRegex = k.sanitizeForRegex('.some thing[with characters]');
 * console.log(textForRegex);// => "\.some thing\[with characters\]"
 */
const sanitizeForRegex = function(text){
  return text.replace(/\.|\||\(|\)|\[|\]|\-|\+|\?|\/|\{|\}|\^|\$|\*/g,'\\$&');
};
kFuncs.sanitizeForRegex = sanitizeForRegex;

/**
 * Converts a value to a number, it\'s default value, or `0` if no default value passed.
 * @param {string|number} val - Value to convert to a number
 * @param {number} def - The default value, uses 0 if not passed
 * @returns {number|undefined}
 * @example
 * const num = k.value('100');
 * console.log(num);// => 100
 */
const value = function(val,def){
  return (+val||def||0);
};
kFuncs.value = value;

/**
 * Extracts the section (e.g. `repeating_equipment`), rowID (e.g `-;lkj098J:LKj`), and field name (e.g. `bulk`) from a repeating attribute name.
 * @param {string} string - The string to parse
 * @returns {array} - Array of matches. Index 0: the section name, e.g. repeating_equipment | Index 1:the row ID | index 2: The name of the attribute
 * @returns {string[]}
 * @example
 * //Extract info from a full repeating name
 * const [section,rowID,attrName] = k.parseRepeatName('repeating_equipment_-8908asdflkjZlkj23_name');
 * console.log(section);// => "repeating_equipment"
 * console.log(rowID);// => "-8908asdflkjZlkj23"
 * console.log(attrName);// => "name"
 * 
 * //Extract info from just a row name
 * const [section,rowID,attrName] = k.parseRepeatName('repeating_equipment_-8908asdflkjZlkj23');
 * console.log(section);// => "repeating_equipment"
 * console.log(rowID);// => "-8908asdflkjZlkj23"
 * console.log(attrName);// => undefined
 */
const parseRepeatName = function(string){
  let match = string.match(/(repeating_[^_]+)_([^_]+)(?:_(.+))?/);
  match.shift();
  return match;
};
kFuncs.parseRepeatName = parseRepeatName;

/**
 * Parses out the components of a trigger name similar to [parseRepeatName](#parserepeatname). Aliases: parseClickTrigger.
 * 
 * Aliases: `k.parseClickTrigger`
 * @param {string} string The triggerName property of the
 * @returns {array} - For a repeating button named `repeating_equipment_-LKJhpoi98;lj_roll`, the array will be `['repeating_equipment','-LKJhpoi98;lj','roll']`. For a non repeating button named `roll`, the array will be `[undefined,undefined,'roll']`
 * @returns {string[]}
 * @example
 * //Parse a non repeating trigger
 * const [section,rowID,attrName] = k.parseTriggerName('clicked:some-button');
 * console.log(section);// => undefined
 * console.log(rowID);// => undefined
 * console.log(attrName);// => "some-button"
 * 
 * //Parse a repeating trigger
 * const [section,rowID,attrName] = k.parseTriggerName('clicked:repeating_attack_-234lkjpd8fu8usadf_some-button');
 * console.log(section);// => "repeating_attack"
 * console.log(rowID);// => "-234lkjpd8fu8usadf"
 * console.log(attrName);// => "some-button"
 * 
 * //Parse a repeating name
 * const [section,rowID,attrName] = k.parseTriggerName('repeating_attack_-234lkjpd8fu8usadf_some-button');
 * console.log(section);// => "repeating_attack"
 * console.log(rowID);// => "-234lkjpd8fu8usadf"
 * console.log(attrName);// => "some-button"
 */
const parseTriggerName = function(string){
  let match = string.replace(/^clicked:/,'').match(/(?:(repeating_[^_]+)_([^_]+)_)?(.+)/);
  match.shift();
  return match;
};
kFuncs.parseTriggerName = parseTriggerName;
const parseClickTrigger = parseTriggerName;
kFuncs.parseClickTrigger = parseClickTrigger;

/**
 * Parses out the attribute name from the htmlattribute name.
 * @param {string} string - The triggerName property of the [event](https://wiki.roll20.net/Sheet_Worker_Scripts#eventInfo_Object).
 * @returns {string}
 * @example
 * //Parse a name
 * const attrName = k.parseHtmlName('attr_attribute_1');
 * console.log(attrName);// => "attribute_1"
 */
const parseHTMLName = function(string){
  let match = string.match(/(?:attr|act|roll)_(.+)/);
  match.shift();
  return match[0];
};
kFuncs.parseHTMLName = parseHTMLName;

/**
 * Capitalize each word in a string
 * @param {string} string - The string to capitalize
 * @returns {string}
 * @example
 * const capitalized = k.capitalize('a word');
 * console.log(capitalized);// => "A Word"
 */
const capitalize = function(string){
  return string.replace(/(?:^|\s+|\/)[a-z]/ig,(letter)=>letter.toUpperCase());
};
kFuncs.capitalize = capitalize;

/**
 * Extracts a roll query result for use in later functions. Must be awaited as per [startRoll documentation](https://wiki.roll20.net/Sheet_Worker_Scripts#Roll_Parsing.28NEW.29). Stolen from [Oosh\'s Adventures with Startroll thread](https://app.roll20.net/forum/post/10346883/adventures-with-startroll).
 * @param {string} query - The query should be just the text as the `?{` and `}` at the start/end of the query are added by the function.
 * @returns {Promise} - Resolves to the selected value from the roll query
 * @example
 * const rollFunction = async function(){
 *  //Get the result of a choose from list query
 *  const queryResult = await extractQueryResult('Prompt Text Here|Option 1|Option 2');
 *  console.log(queryResult);//=> "Option 1" or "Option 2" depending on what the user selects
 * 
 *  //Get free from input from the user
 *  const freeResult = await extractQueryResult('Prompt Text Here');
 *  consoel.log(freeResult);// => Whatever the user entered
 * }
 */
const extractQueryResult = async function(query){
	debug('entering extractQueryResult');
	let queryRoll = await startRoll(`!{{query=[[0[response=?{${query}}]]]}}`);
	finishRoll(queryRoll.rollId);
	return queryRoll.results.query.expression.replace(/^.+?response=|\]$/g,'');
};
kFuncs.extractQueryResult = extractQueryResult;

/**
 * Simulates a query for ensuring that async/await works correctly in the sheetworker environment when doing conditional startRolls. E.g. if you have an if/else and only one of the conditions results in `startRoll` being called (and thus an `await`), the sheetworker environment would normally crash. Awaiting this in the condition that does not actually need to call `startRoll` will keep the environment in sync.
 * @param {string|number} [value] - The value to return. Optional.
 * @returns {Promise} - Resolves to the value passed to the function
 * @example
 * const rollFunction = async function(){
 *  //Get the result of a choose from list query
 *  const queryResult = await pseudoQuery('a value');
 *  console.log(queryResult);//=> "a value"
 * }
 */
const pseudoQuery = async function(value){
	debug('entering pseudoQuery');
	let queryRoll = await startRoll(`!{{query=[[0[response=${value}]]]}}`);
	finishRoll(queryRoll.rollId);
	return queryRoll.results.query.expression.replace(/^.+?response=|\]$/g,'');
};
kFuncs.pseudoQuery = pseudoQuery;

/**
 * An alias for console.log.
 * @param {any} msg - The message can be a straight string, an object, or an array. If it is an object or array, the object will be broken down so that each key is used as a label to output followed by the value of that key. If the value of the key is an object or array, it will be output via `console.table`.
 */
const log = function(msg){
  if(typeof msg === 'string'){
    console.log(`%c${kFuncs.sheetName} log| ${msg}`,"background-color:#159ccf");
  }else if(typeof msg === 'object'){
    Object.keys(msg).forEach((m)=>{
      if(typeof msg[m] === 'string'){
        console.log(`%c${kFuncs.sheetName} log| ${m}: ${msg[m]}`,"background-color:#159ccf");
      }else{
        console.log(`%c${kFuncs.sheetName} log| ${typeof msg[m]} ${m}`,"background-color:#159ccf");
        console.table(msg[m]);
      }
    });
  }
};
kFuncs.log = log;

/**
 * Alias for console.log that only triggers when debug mode is enabled or when the sheet\'s version is `0`. Useful for entering test logs that will not pollute the console on the live sheet.
 * @param {any} msg - 'See {@link k.log}
 * @param {boolean} force - Pass as a truthy value to force the debug output to be output to the console regardless of debug mode.
 * @returns {void}
 */
const debug = function(msg,force){
  if(!kFuncs.debugMode && !force && kFuncs.version > 0) return;
  if(typeof msg === 'string'){
    console.log(`%c${kFuncs.sheetName} DEBUG| ${msg}`,"background-color:tan;color:red;");
  }else if(typeof msg === 'object'){
    Object.keys(msg).forEach((m)=>{
      if(typeof msg[m] === 'string'){
        console.log(`%c${kFuncs.sheetName} DEBUG| ${m}: ${msg[m]}`,"background-color:tan;color:red;");
      }else{
        console.log(`%c${kFuncs.sheetName} DEBUG| ${typeof msg[m]} ${m}`,"background-color:tan;color:red;font-weight:bold;");
        console.table(msg[m]);
      }
    });
  }
};
kFuncs.debug = debug;

/**
 * Orders the section id arrays for all sections in the `sections` object to match the repOrder attribute.
 * @param {attributesProxy} attributes - The attributes object that must have a value for the reporder for each section.
 * @param {[object]} sections - Object containing the IDs for the repeating sections, indexed by repeating section name.
 */
const orderSections = function(attributes,sections){
  Object.keys(sections).forEach((section)=>{
    attributes.attributes[`_reporder_${section}`] = commaArray(attributes[`_reporder_${section}`]);
    orderSection(attributes.attributes[`_reporder_${section}`],sections[section]);
  });
};
kFuncs.orderSections = orderSections;

/**
 * Orders a single ID array.
 * @param {[string]} repOrder - Array of IDs in the order they are in on the sheet.
 * @param {[string]} IDs - Array of IDs to be ordered.
 */
const orderSection = function(repOrder,IDs=[]){
  IDs.sort((a,b)=>{
    return repOrder.indexOf(a.toLowerCase()) - repOrder.indexOf(b.toLowerCase());
  });
};
kFuncs.orderSection = orderSection;

/**
 * Splits a comma delimited string into an array
 * @param {string} string - The string to split.
 * @returns {array} - The string segments of the comma delimited list.
 */
const commaArray = function(string=''){
  return string.toLowerCase().split(/\s*,\s*/);
};
kFuncs.commaArray = commaArray;/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
//# Attribute Obj Proxy handler
const createAttrProxy = function(attrs){
  //creates a proxy for the attributes object so that values can be worked with more easily.
  const getCascObj = function(event,casc){
    const eventName = event.triggerName || event.sourceAttribute;
    let typePrefix = eventName.startsWith('clicked:') ?
      'act_' :
      event.removedInfo ?
      'fieldset_' :
      'attr_';
    let cascName = `${typePrefix}${eventName.replace(/(?:removed|clicked):/,'')}`;
    let cascObj = casc[cascName];
    if(cascObj && typePrefix === 'attr_'){
      cascObj.previousValue = event.previousValue;
    }
    return cascObj;
  };
  
  const triggerFunctions = function(obj,attributes,sections,casc){
    if(obj.triggeredFuncs && obj.triggeredFuncs.length){
      debug(`triggering functions for ${obj.name}`);
      obj.triggeredFuncs && obj.triggeredFuncs.forEach(func=>funcs[func] ? 
        funcs[func]({trigger:obj,attributes,sections,casc}) :
        debug(`!!!Warning!!! no function named ${func} found. Triggered function not called for ${obj.name}`,true));
    }
  };
  
  const initialFunction = function(obj,attributes,sections){
    if(obj.initialFunc){
      debug(`initial functions for ${obj.name}`);
      funcs[obj.initialFunc] ?
        funcs[obj.initialFunc]({trigger:obj,attributes,sections}) :
        debug(`!!!Warning!!! no function named ${obj.initialFunc} found. Initial function not called for ${obj.name}`,true);
    }
  };
  const alwaysFunctions = function(trigger,attributes,sections,casc){
    Object.values(allHandlers).forEach((handler)=>{
      handler({trigger,attributes,sections,casc});
    });
  };
  const processChange = function({event,trigger,attributes,sections,casc}){
    if(event && !trigger){
      debug(`${event.sourceAttribute} change detected. No trigger found`);
      return;
    }
    if(!attributes || !sections || !casc){
      debug(`!!! Insufficient arguments || attributes > ${!!attributes} | sections > ${!!sections} | casc > ${!!casc} !!!`);
      return;
    }
    debug({trigger});
    if(event){
      debug('checking for initial & always functions');
      alwaysFunctions(trigger,attributes,sections,casc);//Functions that should be run for all events.
      initialFunction(trigger,attributes,sections,casc);//functions that should only be run if the attribute was the thing changed by the user
    }
    if(trigger){
      debug(`processing ${trigger.name}`);
      triggerFunctions(trigger,attributes,sections,casc);
      if(!event && trigger.calculation && funcs[trigger.calculation]){
        attributes[trigger.name] = funcs[trigger.calculation]({trigger,attributes,sections,casc});
      }else if(trigger.calculation && !funcs[trigger.calculation]){
        debug(`K-Scaffold Error: No function named ${trigger.calculation} found`);
      }
      if(Array.isArray(trigger.affects)){
        attributes.queue.push(...trigger.affects);
      }
    }
    attributes.set({attributes,sections,casc});
  };
  const attrTarget = {
    updates:{},
    attributes:{...attrs},
    repOrders:{},
    queue: [],
    casc:{},
    alwaysFunctions,
    processChange,
    triggerFunctions,
    initialFunction,
    getCascObj
  };
  const attrHandler = {
    get:function(obj,prop){//gets the most value of the attribute.
      //If it is a repeating order, returns the array, otherwise returns the update value or the original value
      if(prop === 'set'){
        return function(){
          let {attributes,sections,casc,callback,vocal} = arguments[0] ? arguments[0] : {};
          if(attributes && attributes.queue.length && sections && casc){
            let triggerName = attributes.queue.shift();
            let trigger = getCascObj({sourceAttribute:triggerName},casc);
            attributes.processChange({trigger,attributes,sections,casc});
          }else{
            debug({updates:obj.updates});
            let trueCallback = Object.keys(obj.repOrders).length ?
              function(){
                Object.entries(obj.repOrders).forEach(([section,order])=>{
                  _setSectionOrder(section,order,)
                });
                callback && callback();
              }:
              callback;
            Object.keys(obj.updates).forEach((key)=>obj.attributes[key] = obj.updates[key]);
            const update = obj.updates;
            obj.updates = {};
            set(update,vocal,trueCallback);
          }
        }
      }else if(Object.keys(obj).some(key=>key===prop)){ 
        return Reflect.get(...arguments)
      }else{
        let retValue;
        switch(true){
          case obj.repOrders.hasOwnProperty(prop):
            retValue = obj.repOrders[prop];
            break;
          case obj.updates.hasOwnProperty(prop):
            retValue = obj.updates[prop];
            break;
          default:
            retValue = obj.attributes[prop];
            break;
        }
        let cascRef = `attr_${prop.replace(/(repeating_[^_]+_)[^_]+/,'$1\$X')}`;
        let numRetVal = +retValue;
        if(!Number.isNaN(numRetVal) && retValue !== ''){
          retValue = numRetVal;
        }else if(cascades[cascRef] && (typeof cascades[cascRef].defaultValue === 'number' || cascades[cascRef].type === 'number')){
          retValue = cascades[cascRef].defaultValue;
        }
        return retValue;
      }
    },
    set:function(obj,prop,value){
      //Sets the value. Also verifies that the value is a valid attribute value
      //e.g. not undefined, null, or NaN
      if(value || value===0 || value===''){
        if(/reporder|^repeating_[^_]+$/.test(prop)){
          let section = prop.replace(/_reporder_/,'');
          obj.repOrders[section] = value;
        }else if(`${obj.attributes}` !== `${value}` || 
          (obj.updates[prop] && `${obj.updates}` !== `${value}`)
        ){
          obj.updates[prop] = value;
        }
      }else{
        debug(`!!!Warning: Attempted to set ${prop} to an invalid value:${value}; value not stored!!!`);
      }
      return true;
    },
    deleteProperty(obj,prop){
      //removes the property from the original attributes, updates, and the reporders
      Object.keys(obj).forEach((key)=>{
        delete obj[key][prop.toLowerCase()];
      });
    }
  };
  return new Proxy(attrTarget,attrHandler);
};


/**
 * Function that registers a function for being called via the funcs object. Returns true if the function was successfully registered, and false if it could not be registered for any reason.
 * @param {object} funcObj - Object with keys that are names to register functions under and values that are functions.
 * @param {object} optionsObj - Object that contains options to use for this registration.
 * @param {string[]} optionsObj.type - Array that contains the types of specialized functions that apply to the functions being registered. Valid types are `"opener"`, `"updater"`, and `"default"`. `"default"` is always used, and never needs to be passed.
 * @returns {boolean} - True if the registration succeeded, false if it failed.
 * @example
 * //Basic Registration
 * const myFunc = function({trigger,attributes,sections,casc}){};
 * k.registerFuncs({myFunc});
 * 
 * //Register a function to run on sheet open
 * const openFunc = function({trigger,attributes,sections,casc}){};
 * k.registerFuncs({openFunc},{type:['opener']})
 * 
 * //Register a function to run on all events
 * const allFunc = function({trigger,attributes,sections,casc}){};
 * k.registerFuncs({allFunc},{type:['all']})
 */
const registerFuncs = function(funcObj,optionsObj = {}){
  if(typeof funcObj !== 'object' || typeof optionsObj !== 'object'){
    debug(`!!!! K-scaffold error: Improper arguments to register functions !!!!`);
    return false;
  }
  const typeArr = optionsObj.type ? ['default',...optionsObj.type] : ['default'];
  const typeSwitch = {
    'opener':openHandlers,
    'updater':updateHandlers,
    'new':initialSetups,
    'all':allHandlers,
    'default':funcs
  };
  let setState;
  Object.entries(funcObj).map(([prop,value])=>{
    typeArr.forEach((type)=>{
      if(typeSwitch[type][prop]){
        debug(`!!! Duplicate function name for ${prop} as ${type}!!!`);
        setState = false;
      }else if(typeof value === 'function'){
        typeSwitch[type][prop] = value;
        setState = setState !== false ? true : false;
      }else{
        debug(`!!! K-scaffold error: Function registration requires a function. Invalid value to register as ${type} !!!`);
        setState = false;
      }
    });
  });
  return setState;
};
kFuncs.registerFuncs = registerFuncs;

const setActionCalls = function({attributes,sections}){
  actionAttributes.forEach((base)=>{
    let [section,,field] = k.parseTriggerName(base);
    let fieldAction = field.replace(/_/g,'-');
    if(section){
      sections[section].forEach((id)=>{
        attributes[`${section}_${id}_${field}`] = `%{${attributes.character_name}|${section}_${id}_${fieldAction}}`;
      });
    }else{
      attributes[`${field}`] = `%{${attributes.character_name}|${fieldAction}}`;
    }
  });
};
funcs.setActionCalls = setActionCalls;
kFuncs.setActionCalls = setActionCalls;

/**
 * Function to call a function previously registered to the funcs object. May not be used that much. Either returns the function or null if no function exists.
 * @param {string} funcName - The name of the function to invoke.
 * @param {...any} args - The arguments to call the function with.
 * @returns {any}
 * @example
 * //Call myFunc with two arguments
 * k.callFunc('myFunc','an argument','another argument');
 */
const callFunc = function(funcName,...args){
  if(funcs[funcName]){
    debug(`calling ${funcName}`);
    return funcs[funcName](...args);
  }else{
    debug(`Invalid function name: ${funcName}`);
    return null;
  }
};
kFuncs.callFunc = callFunc;/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
//Sheet Updaters and styling functions
const updateSheet = function(){
  log('updating sheet');
  getAllAttrs({props:['debug_mode',...baseGet],callback:(attributes,sections,casc)=>{
    kFuncs.debugMode = kFuncs.debugMode || !!attributes.debug_mode;
    debug({sheet_version:attributes.sheet_version});
    if(!attributes.sheet_version){
      Object.entries(initialSetups).forEach(([funcName,handler])=>{
        if(typeof funcs[funcName] === 'function'){
          debug(`running ${funcName}`);
          funcs[funcName]({attributes,sections,casc});
        }else{
          debug(`!!!Warning!!! no function named ${funcName} found. Initial sheet setup not performed.`);
        }
      });
    }else{
      Object.entries(updateHandlers).forEach(([ver,handler])=>{
        if(attributes.sheet_version < +ver){
          handler({attributes,sections,casc});
        }
      });
    }
    Object.entries(openHandlers).forEach(([funcName,func])=>{
      if(typeof funcs[funcName] === 'function'){
        debug(`running ${funcName}`);
        funcs[funcName]({attributes,sections,casc});
      }else{
        debug(`!!!Warning!!! no function named ${funcName} found. Sheet open handling not performed.`);
      }
    });
    setActionCalls({attributes,sections});
    attributes.sheet_version = kFuncs.version;
    log(`Sheet Update applied. Current Sheet Version ${kFuncs.version}`);
    attributes.set();
    log('Sheet ready for use');
  }});
};

const initialSetup = function(attributes,sections){
  debug('Initial sheet setup');
};

/**
 * This is the default listener function for attributes that the K-Scaffold uses. It utilizes the `triggerFuncs`, `listenerFunc`, `calculation`, and `affects` properties of the K-scaffold trigger object (see the Pug section of the scaffold for more details).
 * @param {Roll20Event} event
 * @returns {void}
 * @example
 * //Call from an attribute change
 * on('change:an_attribute',k.accessSheet);
 */
const accessSheet = function(event){
  debug({funcs:Object.keys(funcs)});
  debug({event});
  getAllAttrs({callback:(attributes,sections,casc)=>{
    let trigger = attributes.getCascObj(event,casc);
    attributes.processChange({event,trigger,attributes,sections,casc});
  }});
};
funcs.accessSheet = accessSheet;/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
/*
Cascade Expansion functions
*/
//Expands the repeating section templates in cascades to reflect the rows actually available
const expandCascade = function(cascade,sections,attributes){
  return _.keys(cascade).reduce((memo,key)=>{//iterate through cascades and replace references to repeating attributes with correct row ids.
    if(/^(?:act|attr)_repeating_/.test(key)){//If the attribute is a repeating attribute, do special logic
      expandRepeating(memo,key,cascade,sections,attributes);
    }else if(key){//for non repeating attributes do this logic
      expandNormal(memo,key,cascade,sections);
    }
    return memo;
  },{});
};

const expandRepeating = function(memo,key,cascade,sections,attributes){
  key.replace(/((?:attr|act)_)(repeating_[^_]+)_[^_]+?_(.+)/,(match,type,section,field)=>{
    (sections[section]||[]).forEach((id)=>{
      memo[`${type}${section}_${id}_${field}`]=_.clone(cascade[key]);//clone the details so that each row's attributes have correct ids
      memo[`${type}${section}_${id}_${field}`].name = `${section}_${id}_${field}`;
      if(key.startsWith('attr_')){
        memo[`${type}${section}_${id}_${field}`].affects = memo[`${type}${section}_${id}_${field}`].affects.reduce((m,affected)=>{
          if(section === affected){//otherwise if the affected attribute is in the same section, simply set the affected attribute to have the same row id.
            m.push(applyID(affected,id));
          }else if(/repeating/.test(affected)){//If the affected attribute isn't in the same repeating section but is still a repeating attribute, add all the rows of that section
            addAllRows(affected,m,sections);
          }else{//otherwise the affected attribute is a non repeating attribute. Simply add it to the computed affected array
            m.push(affected);
          }
          return m;
        },[]);
      }
    });
  });
};

const applyID = function(affected,id){
  return affected.replace(/(repeating_[^_]+_)[^_]+(.+)/,`$1${id}$2`);
};

const expandNormal = function(memo,key,cascade,sections){
  memo[key] = _.clone(cascade[key]);
  if(key.startsWith('attr_')){
    memo[key].affects = memo[key].affects || [];
    memo[key].affects = memo[key].affects.reduce((m,a)=>{
      if(/^repeating/.test(a)){
        addAllRows(a,m,sections);
      }else{
        m.push(a);
      }
      return m;
    },[]);
  }
};

const addAllRows = function(affected,memo,sections){
  affected.replace(/(repeating_[^_]+?)_[^_]+?_(.+)/,(match,section,field)=>{
    sections[section].forEach(id=>memo.push(`${section}_${id}_${field}`));
  });
};/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
/**
 * Alias for [setSectionOrder()](https://wiki.roll20.net/Sheet_Worker_Scripts#setSectionOrder.28.3CRepeating_Section_Name.3E.2C_.3CSection_Array.3E.2C_.3CCallback.3E.29) that allows you to use the section name in either `repeating_section` or `section` formats. Note that the Roll20 sheetworker [setSectionOrder](https://wiki.roll20.net/Sheet_Worker_Scripts#setSectionOrder.28.3CRepeating_Section_Name.3E.2C_.3CSection_Array.3E.2C_.3CCallback.3E.29) currently causes some display issues on sheets.
 * @param {string} section
 * @param {string[]} order
 * @returns {void}
 * @example
 * //Set the order of a repeating_weapon section
 * k.setSectionOrder('repeating_equipment',['id1','id2','id3']);
 * //Can also specify the section name without the repeating_ prefix
 * k.setSectionOrder('equipment',['id1','id2','id3']);
 */
const _setSectionOrder = function(section,order){
  let trueSection = section.replace(/repeating_/,'');
  setSectionOrder(trueSection,order);
};
kFuncs.setSectionOrder = _setSectionOrder;

/**
 * Alias for [removeRepeatingRow](https://wiki.roll20.net/Sheet_Worker_Scripts#removeRepeatingRow.28_RowID_.29) that also removes the row from the current object of attribute values and array of section IDs to ensure that erroneous updates are not issued.
 * @param {string} row - The row id to be removed
 * @param {attributesProxy} attributes - The attribute values currently in memory
 * @param {object} sections - Object that contains arrays of all the IDs in sections on the sheet indexed by repeating name.
 * @returns {void}
 * @example
 * //Remove a repeating Row
 * k.getAllAttrs({
 *  callback:(attributes,sections)=>{
 *    const rowID = sections.repeating_equipment[0];
 *    k.removeRepeatingRow(`repeating_equipment_${rowID}`,attributes,sections);
 *    console.log(sections.repeating_equipment); // => rowID no longer exists in the array.
 *    console.log(attributes[`repeating_equipment_${rowID}_name`]); // => undefined
 *  }
 * })
 */
const _removeRepeatingRow = function(row,attributes,sections){
  debug(`removing ${row}`);
  Object.keys(attributes.attributes).forEach((key)=>{
    if(key.startsWith(row)){
      delete attributes[key];
    }
  });
  let [,section,rowID] = row.match(/(repeating_[^_]+)_(.+)/,'');
  sections[section] = sections[section].filter((id)=>id!==rowID);
  removeRepeatingRow(row);
};
kFuncs.removeRepeatingRow = _removeRepeatingRow;

/**
 * Alias for [getAttrs()](https://wiki.roll20.net/Sheet_Worker_Scripts#getAttrs.28attributeNameArray.2C_callback.29) that converts the default object of attribute values into an {@link attributesProxy} and passes that back to the callback function.
 * @param {Object} args
 * @param {string[]} [args.props=baseGet] - Array of attribute names to get the value of. Defaults to {@link baseGet} if not passed.
 * @param {function(attributesProxy)} args.callback - The function to call after the attribute values have been gotten. An {@link attributesProxy} is passed to the callback.
 * @example
 * //Gets the attributes named in props.
 * k.getAttrs({
 *  props:['attribute_1','attribute_2'],
 *  callback:(attributes)=>{
 *    //Work with the attributes as you would in a normal getAttrs, or use the superpowers of the K-scaffold attributes object like so:
 *    attributes.attribute_1 = 'new value';
 *    attributes.set();
 *  }
 * })
 */
const _getAttrs = function({props=baseGet,callback}){
  getAttrs(props,(values)=>{
    const attributes = createAttrProxy(values);
    callback(attributes);
  });
};
kFuncs.getAttrs = _getAttrs;

/**
 * Alias for [getAttrs()](https://wiki.roll20.net/Sheet_Worker_Scripts#getAttrs.28attributeNameArray.2C_callback.29) and [getSectionIDs](https://wiki.roll20.net/Sheet_Worker_Scripts#getSectionIDs.28section_name.2Ccallback.29) that combines the actions of both sheetworker functions and converts the default object of attribute values into an {@link attributesProxy}. Also gets the details on how to handle all attributes from the master {@link cascades} object and.
 * @param {Object} args
 * @param {string[]} [args.props=baseGet] - Array of attribute names to get the value of. Defaults to {@link baseGet} if not passed.
 * @param {repeatingSectionDetails} sectionDetails - Array of details about a section to get the IDs for and attributes that need to be gotten. 
 * @param {function(attributesProxy,sectionObj,expandedCascade):void} args.callback - The function to call after the attribute values have been gotten. An {@link attributesProxy} is passed to the callback along with a {@link sectionObj} and {@link expandedCascade}.
 * @example
 * //Get every K-scaffold linked attribute on the sheet
 * k.getAllAttrs({
 *  callback:(attributes,sections,casc)=>{
 *    //Work with the attributes as you please.
 *    attributes.some_attribute = 'a value';
 *    attributes.set();//Apply our change
 *  }
 * })
 */
const getAllAttrs = function({props=baseGet,sectionDetails=repeatingSectionDetails,callback}){
  getSections(sectionDetails,(repeats,sections)=>{
    getAttrs([...props,...repeats],(values)=>{
      const attributes = createAttrProxy(values);
      orderSections(attributes,sections);
      const casc = expandCascade(cascades,sections,attributes);
      callback(attributes,sections,casc);
    })
  });
};
kFuncs.getAllAttrs = getAllAttrs;

/**
 * Alias for [getSectionIDs()](https://wiki.roll20.net/Sheet_Worker_Scripts#getSectionIDs.28section_name.2Ccallback.29) that allows you to iterate through several functions at once. Also assembles an array of repeating attributes to get.
 * @param {object[]} sectionDetails - Array of details about a section to get the IDs for and attributes that need to be gotten.
 * @param {string} sectionDetails.section - The full name of the repeating section including the `repeating_` prefix.
 * @param {string[]} sectionDetails.fields - Array of field names that need to be gotten from the repeating section
 * @param {function(string[],sectionObj)} callback - The function to call once all IDs have been gotten and the array of repating attributes to get has been assembled. The callback is passed the array of repating attributes to get and a {@link sectionObj}.
 * @example
 * // Get some section details
 * const sectionDetails = {
 *  {section:'repeating_equipment',fields:['name','weight','cost']},
 *  {section:'repeating_weapon',fields:['name','attack','damage']}
 * };
 * k.getSections(sectionDetails,(attributeNames,sections)=>{
 *  console.log(attributeNames);// => Array containing all row specific attribute names
 *  console.log(sections);// => Object with arrays containing the row ids. Indexed by section name (e.g. repeating_eqiupment)
 * })
 */
const getSections = function(sectionDetails,callback){
  let queueClone = _.clone(sectionDetails);
  const worker = (queue,repeatAttrs=[],sections={})=>{
    let detail = queue.shift();
    getSectionIDs(detail.section,(IDs)=>{
      sections[detail.section] = IDs;
      IDs.forEach((id)=>{
        detail.fields.forEach((f)=>{
          repeatAttrs.push(`${detail.section}_${id}_${f}`);
        });
      });
      repeatAttrs.push(`_reporder_${detail.section}`);
      if(queue.length){
        worker(queue,repeatAttrs,sections);
      }else{
        callback(repeatAttrs,sections);
      }
    });
  };
  if(!queueClone[0]){
    callback([],{});
  }else{
    worker(queueClone);
  }
};
kFuncs.getSections = getSections;

// Sets the attributes while always calling with {silent:true}
// Can be awaited to get the values returned from _setAttrs
/**
 * Alias for [setAttrs()](https://wiki.roll20.net/Sheet_Worker_Scripts#setAttrs.28values.2Coptions.2Ccallback.29) that sets silently by default.
 * @param {object} obj - The object containting attributes to set
 * @param {boolean} [vocal=false] - Whether to set silently (default value) or not.
 * @param {function()} [callback] - The callback function to invoke after the setting has been completed. No arguments are passed to the callback function.
 * @example
 * //Set some attributes silently
 * k.setAttrs({attribute_1:'new value'})
 * //Set some attributes and triggers listeners
 * k.setAttrs({attribute_1:'new value',true})
 * //Set some attributes and call a callback function
 * k.setAttrs({attribute_1:'new value'},null,()=>{
 *  //Do something after the attribute is set
 * })
 */
const set = function(obj,vocal=false,callback){
  setAttrs(obj,{silent:!vocal},callback);
};
kFuncs.setAttrs = set;

const generateCustomID = function(string){
  if(!string.startsWith('-')){
    string = `-${string}`;
  }
  rowID = generateRowID();
  let re = new RegExp(`^.{${string.length}}`);
  return `${string}${rowID.replace(re,'')}`;
};


/**
 * Alias for generateRowID that adds the new id to the {@link sectionObj}. Also allows for creation of custom IDs that conform to the section ID requirements.
 * @param {sectionObj} sections
 * @param {string} [customText] - Custom text to start the ID with. This text should not be longer than the standard repeating section ID format.
 * @returns {string} - The created ID
 * @example
 * k.getAllAttrs({
 *  callback:(attributes,sections,casc)=>{
 *    //Create a new row ID
 *    const rowID = k.generateRowID('repeating_equipment',sections);
 *    console.log(rowID);// => -p8rg908ug0suzz
 *    //Create a custom row ID
 *    const customID = k.generateRowID('repeating_equipment',sections,'custom');
 *    console.log(customID);// => -custom98uadj89kj
 *  }
 * });
 */
const _generateRowID = function(section,sections,customText){
  let rowID = customText ?
    generateCustomID(customText) :
    generateRowID();
  section = section.match(/^repeating_[^_]+$/) ?
    section :
    `repeating_${section}`;
  sections[section] = sections[section] || [];
  sections[section].push(rowID);
  return `${section}_${rowID}`;
};
kFuncs.generateRowID = _generateRowID;/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
const listeners = {};
const baseGet = Object.entries(cascades).reduce((memo,[attrName,detailObj])=>{
  if(!/repeating/.test(attrName) && detailObj.type !== 'action'){
    memo.push(detailObj.name);
  }
  if(detailObj.listener){
    listeners[detailObj.listener] = detailObj.listenerFunc;
  }
  return memo;
},[]);
kFuncs.baseGet = baseGet;
const registerEventHandlers = function(){
  on('sheet:opened',updateSheet);
  debug({funcKeys:Object.keys(funcs),funcs});
  //Roll20 change and click listeners
  Object.entries(listeners).forEach(([event,funcName])=>{
    if(funcs[funcName]){
      on(event,funcs[funcName]);
    }else{
      debug(`!!!Warning!!! no function named ${funcName} found. No listener created for ${event}`,true);
    }
  });
  log(`kScaffold Loaded`);
};
kFuncs.registerEventHandlers = registerEventHandlers;

const addItem = function(event){
  let [,,section] = parseClickTrigger(event.triggerName);
  section = section.replace(/add-/,'');
  getAllAttrs({
    callback:(attributes,sections,casc) => {
      let row = _generateRowID(section,sections);
      debug({row});
      attributes[`${row}_name`] = '';
      setActionCalls({attributes,sections});
      const trigger = cascades[`fieldset_repeating_${section}`];
      if(trigger && trigger.addFuncs){
        trigger.addFuncs.forEach((funcName) => {
          if(funcs[funcName]){
            funcs[funcName]({attributes,sections,casc,trigger,newRow:row});
          }
        });
      }
      attributes.set({attributes,sections,casc});
    }
  });
};
funcs.addItem = addItem;

const editSection = function(event){
  let [,,section] = parseClickTrigger(event.triggerName);
  section = section.replace(/edit-/,'');
  let target = `fieldset.repeating_${section} + .repcontainer`;
  $20(target).toggleClass('ui-sortable');
  $20(target).toggleClass('editmode');
};
registerFuncs({editSection});/**
 * The default tab navigation function of the K-scaffold. Courtesy of Riernar. It will add `k-active-tab` to the active tab-container and `k-active-button` to the active button. You can either write your own CSS to control display of these, or use the default CSS included in `scaffold/_k.scss`. Note that `k-active-button` has no default CSS as it is assumed that you will want to style the active button to match your system.
 * @param {Object} trigger - The trigger object
 */
const kSwitchTab = function ({ trigger, attributes, sections, casc }) {
  const [container, tab] = (
    trigger.name.match(/nav-tabs-(.+)--(.+)/) ||
    []
  ).slice(1);
  $20(`[data-container-tab="${container}"]`).removeClass('k-active-tab');
  $20(`[data-container-tab="${container}"][data-tab="${tab}"]`).addClass('k-active-tab');
  $20(`[data-container-button="${container}"]`).removeClass('k-active-button');
  $20(`[data-container-button="${container}"][data-button="${tab}"]`).addClass('k-active-button');
  const tabInputName = `${container.replace(/\-/g,'_')}_tab`;
  if(persistentTabs.indexOf(tabInputName) > -1){
    attributes[tabInputName] = trigger.name;
  }
  if(trigger && trigger.navFuncs){
    trigger.navFuncs.forEach((funcName) => {
      if(funcs[funcName]){
        funcs[funcName]({attributes,sections,casc,trigger});
      }
    });
  }
}

registerFuncs({ kSwitchTab });

/**
 * Sets persistent tabs to their last active state
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const kTabOnOpen = function({trigger,attributes,sections,casc}){
  persistentTabs.forEach((tabInput) => {
    const pseudoTrigger = {name:attributes[tabInput]};
    kSwitchTab({trigger:pseudoTrigger, attributes});
  });
};
registerFuncs({ kTabOnOpen },{type:['opener']});
  return kFuncs;
  }());
  const actionAttributes = ["vigilance_action","build_action","intuition_action","reflex_action","health_action","resolve_action","luck_action","assess_action","deceive_action","deduce_action","disguise_action","encrypt_action","first_aid_action","hide_action","legerdemain_action","locksmith_action","nurse_(ment)_action","nurse_(phys)_action","persuade_action","research_action","ride/steer_action","search_action","sneak_action","stunt_action","survive_action","threaten_action","tinker_action","melee_action","ranged_action","repeating_specialty_$X_action","repeating_equipped_$X_action","repeating_weapon_$X_action","repeating_ability_$X_action"];const characteristics = {"aptitude":{"name":"aptitude","affects":["reflex goal"]},"athletics":{"name":"athletics","affects":["reflex goal","movement rate","sprint speed","item_slots_max"]},"charisma":{"name":"charisma","affects":["intuition goal"]},"logic":{"name":"logic","affects":["vigilance goal"]},"wisdom":{"name":"wisdom","affects":["intuition goal"]},"size":{"name":"size","affects":["build goal","item_slots_max"]},"stamina":{"name":"stamina","affects":["build goal"]},"willpower":{"name":"willpower","affects":["vigilance goal"]}};const attributesDetails = {"vigilance_goal":["logic","willpower"],"build_goal":["size","stamina"],"intuition_goal":["charisma","wisdom"],"reflex_goal":["athletics","aptitude"]};const skills = {"assess":{"name":"assess","characteristic":"wisdom"},"deceive":{"name":"deceive","characteristic":"charisma"},"deduce":{"name":"deduce","characteristic":"logic"},"disguise":{"name":"disguise","characteristic":"charisma"},"encrypt":{"name":"encrypt","characteristic":"logic"},"first aid":{"name":"first aid","characteristic":"wisdom"},"hide":{"name":"hide","characteristic":"wisdom"},"legerdemain":{"name":"legerdemain","characteristic":"aptitude"},"locksmith":{"name":"locksmith","characteristic":"aptitude"},"nurse (ment)":{"name":"nurse (ment)","characteristic":"logic"},"nurse (phys)":{"name":"nurse (phys)","characteristic":"logic"},"persuade":{"name":"persuade","characteristic":"charisma"},"research":{"name":"research","characteristic":"logic"},"ride/steer":{"name":"ride/steer","characteristic":"athletics"},"search":{"name":"search","characteristic":"wisdom"},"sneak":{"name":"sneak","characteristic":"athletics"},"stunt":{"name":"stunt","characteristic":"athletics"},"survive":{"name":"survive","characteristic":"wisdom"},"threaten":{"name":"threaten","characteristic":"charisma"},"tinker":{"name":"tinker","characteristic":"aptitude"},"melee":{"name":"melee","characteristic":"athletics"},"ranged":{"name":"ranged","characteristic":"aptitude"}};const persistentTabs = ["backbone_tab"];
  k.version = 1.1;/**
 * Function to calculate the raw attribute score
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const calcAttribute = function({trigger,attributes,sections,casc}){
  const [charac1,charac2] = attributesDetails[trigger.name];
  return 10 + attributes[charac1] + attributes[charac2];
};
k.registerFuncs({calcAttribute});

/**
 * Function to calculate the attribute modifier
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const calcAttributeMod = function({trigger,attributes,sections,casc}){
  const baseName = `${trigger.name}_goal`;
  return attributes[baseName] - 11;
};
k.registerFuncs({calcAttributeMod});

/**
 * Function to calculate the sprint speed of a character
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const calcSprint = function({trigger,attributes,sections,casc}){
  return attributes.athletics * 5 + 10;
};
k.registerFuncs({calcSprint});

/**
 * Function to calculate the movement speed of a character
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const calcMovement = function({trigger,attributes,sections,casc}){
  return attributes.athletics * 5 + 20;
};
k.registerFuncs({calcMovement});

/**
 * Calculates the maximum item slots that can be used without penalty
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const calcItemSlotsMax = function({trigger,attributes,sections,casc}){
  return Math.max(
    attributes.size + 3,
    attributes.athletics + attributes.size + 1
  );
};
k.registerFuncs({calcItemSlotsMax});

/**
 * Calculates how many slots have been used based on the equipped gear and weapon sections
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const calcUsedSlots = function({trigger,attributes,sections,casc}){
  const equippedIDs = [
    ...sections.repeating_equipped.map(id => `repeating_equipped_${id}`),
    ...sections.repeating_weapon.map(id => `repeating_weapon_${id}`)
  ];
  let freeWeapons = 3;
  return equippedIDs
    .reduce((total,section) => {
      if(
        attributes[`${section}_uses_slot`] && 
        (
          !section.startsWith('repeating_weapon') ||
          freeWeapons <= 0
        )  
      ){
        total += 1;
      }
      if(
        section.startsWith('repeating_weapon') &&
        freeWeapons > 0
      ){
        freeWeapons--;
      }
      return total;
    },0);
};
k.registerFuncs({calcUsedSlots});

/**
 * Calculates whether the character is overburdened or not, returning 1 if they are and 0 otherwise
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const calcOverburdened = function({trigger,attributes,sections,casc}){
  return attributes.item_slots_max - attributes.item_slots < 0 ?
    1 :
    0;
};
k.registerFuncs({calcOverburdened});/**
 * (un)equips armor items
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const equipArmor = function({trigger,attributes,sections,casc}){
  const [section,rowID,attr] = k.parseTriggerName(trigger.name);
  const row = section ?
    `${section}_${rowID}` :
    k.generateRowID('repeating_stored',sections);
  const armorAttrs = {
    equipped:{
      'armor':attributes[`${row}_armor_bonus`],
      'armor_name':attributes[`${row}_name`],
      'armor_details':attributes[`${row}_description`],
      'armor_size':attributes[`${row}_item_size`],
    },
    stored:{
      [`${row}_armor_bonus`]:attributes.armor,
      [`${row}_name`]:attributes.armor_name,
      [`${row}_description`]:attributes.armor_details,
      [`${row}_item_size`]:attributes.armor_size,
    }
  };
  const actionType = section ? 'equipped' : 'stored';
  const attrMap = armorAttrs[actionType];
  // If we are equipping a stored armor, then store the currently equipped armor in the stored items repeating section.
  if(section){
    equipArmor({trigger:{name:'armor_name'},attributes,sections,casc});
  }
  if(
    !section && attributes.armor_name
  ){
    attrMap[`${row}_type`] = 'armor';
  }
  // copy the values to the target
  Object.entries(attrMap)
    .forEach(([key,val]) => {
      if(section || val){
        attributes[key] = val;
      }
    });
  // If we equipped a stored armor, remove it from the stored gear repeating section.
  if(section){
    k.removeRepeatingRow(row,attributes,sections);
  }else{
    Object.keys(armorAttrs.equipped).forEach(
      attr => attributes[attr] = ''
    );
  }
};
k.registerFuncs({equipArmor});

/**
 * Moves gear/weapon/armor items around on the sheet equip/unequip them.
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const equipItem = function({trigger,attributes,sections,casc}){
  const [section,rowID,attr] = k.parseTriggerName(trigger.name);
  const row = `${section}_${rowID}`;
  if(
    section === 'repeating_stored' &&
    attributes[`${row}_type`] === 'armor'){
      equipArmor({trigger,attributes,sections,casc});
      return;
    }
  const newSection = section === 'repeating_stored' ?
    (
      attributes[`${row}_type`] === 'weapon' ?
        'repeating_weapon' :
        'repeating_equipped'
    ):
    'repeating_stored';
  const newRow = k.generateRowID(newSection,sections);
  Object.keys(casc)
    .forEach(cascKey => {
      if(cascKey.startsWith(`attr_${row}`)){
        const attrRef = cascKey.replace(/attr_repeating_[^_]+_[^_]+_/,'');
        k.debug({[attrRef]:attributes[`${row}_${attrRef}`]})
        attributes[`${newRow}_${attrRef}`] = attributes[`${row}_${attrRef}`];
      }
    });
  attributes[`${newRow}_equipped`] = newSection.endsWith('stored') ?
    0 :
    1;
  if(section !== 'repeating_stored'){
    attributes[`${newRow}_type`] = section.endsWith('equipped') ?
      'gear' :
      'weapon';
  }else{
    attributes[`${newRow}_type`] = attributes[`${newRow}_type`] || 'gear';
  }
  k.removeRepeatingRow(row,attributes,sections);
  k.setActionCalls({attributes,sections});
};
k.registerFuncs({equipItem});

/**
 * Manipulates the classes on the npc skill containers to ensure that only those with an entered value are displayed in collapsed mode
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const displayNPCSkill = function({trigger,attributes,sections,casc}){
  const skill = trigger.name;
  const rawSkillValue = attributes.attributes[skill];
  const action = rawSkillValue ?
    'removeClass' :
    'addClass';
  const $elem = $20(`.npc-${skill.replace(/\s+/g,'-').replace(/\(|\)|\//g,'')}-container`);
  $elem[action]('expanded');
};
k.registerFuncs({displayNPCSkill});

/**
 * Sets up the npc skill display based on the collected values by calling displayNPCSkill for each skill
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const NPCSkillSetup = function({trigger,attributes,sections,casc}){
  Object
    .keys(skills)
    .forEach((skill) =>
      displayNPCSkill({trigger:{name:skill},attributes,sections,casc}));
};
k.registerFuncs({NPCSkillSetup},{type:['opener']});

/**
 * 
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const showConditions = function({trigger,attributes,sections,casc}){
  $20('#pc-conditions .sidebar-toggle,#pc-conditions').removeClass('fresh');
  $20('#pc-conditions').toggleClass('active');
};
k.registerFuncs({showConditions});

/**
 * Resets the tracker for a condition to 0 when the condition is turned off
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const resetCondition = function({trigger,attributes,sections,casc}){
  if(attributes[trigger.name]){
    attributes[`track_${trigger.name}`] = '';
  }
};
k.registerFuncs({resetCondition});

/**
 * Decrements the indicated input
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
 const decrementInput = function({trigger,attributes,sections,casc}){
  const [section,rowID,buttonName] = k.parseTriggerName(trigger.name);
  const attrName = buttonName.replace(/^decrement-/,'').replace(/-/g,'_');
  attributes[attrName] -= 1;
};
k.registerFuncs({decrementInput});

/**
 * Increments the indicated input
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const incrementInput = function({trigger,attributes,sections,casc}){
  const [section,rowID,buttonName] = k.parseTriggerName(trigger.name);
  const attrName = buttonName.replace(/^increment-/,'').replace(/-/g,'_');
  attributes[attrName] += 1;
};
k.registerFuncs({incrementInput});

/**
 * Sets the pc/npc specific button displays
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const sheetTypeDisplay = function({trigger,attributes,sections,casc}){
  if(attributes.character_type === 'pc'){
    $20('.tabs--backbone__button--pc').removeClass('inactive');
    $20('.tabs--backbone__button--npc').addClass('inactive');
  }else{
    $20('.tabs--backbone__button--pc').addClass('inactive');
    $20('.tabs--backbone__button--npc').removeClass('inactive');
  }
};
k.registerFuncs({sheetTypeDisplay},{type:['opener']});


/**
 * Handles the necessary setup for adding a weapon
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const addWeapon = function({trigger,attributes,sections,casc,newRow}){
  attributes[`${newRow}_type`] = 'weapon';
};
k.registerFuncs({addWeapon});/**
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
};/**
 * Resets the fresh state for animation containers so that they do not run on reloading a page.
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const refreshAnimations = function({trigger,attributes,sections,casc}){
  $20('#pc-conditions .sidebar-toggle,#pc-conditions').addClass('fresh');
};
k.registerFuncs({ refreshAnimations });
  k.registerEventHandlers();
  

console.debug = jest.fn(a => null);
console.log = jest.fn(a => null);
console.table = jest.fn(a => null);
module.exports = {k,...global};