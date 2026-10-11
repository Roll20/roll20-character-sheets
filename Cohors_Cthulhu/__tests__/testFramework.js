// This code adapted from Nic Bradley's R20 test framework from the WFRP4e official sheet.
import { vi } from 'vitest';
import _ from 'underscore';
import translation from './translation.json' assert {type:'json'}

/**
 * @namespace {object} mock20
 */
/**
 * @memberof mock20
 * @var
 * A mock environment variable for keeping track of triggers, other character information, and predefined query results.
 * @property {array} triggers - The triggers that have been registered by `on`
 * @property {object} queryResponses - Pre defined results you want the roll parser to use for a given roll query. Keys in the objects are roll query prompts. Values are what the user input should be for that query.
 */
const environment = {
  attributes:{"sheet_version":"0.1.0","npc_sheet":0,"cohors_cthulhu_tab":"nav-tabs-cohors-cthulhu--character","character_type":"pc","npc_last_tier":"","name_pronoun":"","culture":"","caste":"","wealth":"","archetype_marker":"none","archetype":"","specialization":"","background":"","characteristic":"","npc_allegiance":"adversary","npc_stress":"","npc_injuries":"","npc_armor":"","npc_courage":"","npc_morale":"","npc_power":"","injury_limit":"","npc_escalation":"","truth_1":"","truth_2":"","truth_3":"","truth_4":"","truth_5":"","scar_1":"","truths_scars_expanded":0,"scar_2":"","scar_3":"","scar_4":"","scar_5":"","stress":"0","stress_max_base":"","stress_max":"","fatigue":"0","fatigue_resist_action":"","fatigue_ignored":0,"courage":"","base_armour":"","total_armor":"","injuries":"","fortune":"0","agility_action":"","brawn_action":"","coordination_action":"","gravitas_action":"","insight_action":"","reason_action":"","will_action":"","agility_rating":"","brawn_rating":"","coordination_rating":"","gravitas_rating":"","insight_rating":"","reason_rating":"","will_rating":"","brawn_bonus_damage":"","insight_bonus_damage":"","will_bonus_damage":"","skills_edit":0,"academia_skill_action":"","academia_ranks":"","academia_focus_finance_known":0,"academia_focus_finance_action":"","academia_focus_history_known":0,"academia_focus_history_action":"","academia_focus_linguistics_known":0,"academia_focus_linguistics_action":"","academia_focus_philosophy_known":0,"academia_focus_philosophy_action":"","academia_focus_religion_known":0,"academia_focus_religion_action":"","athletics_skill_action":"","athletics_ranks":"","athletics_focus_climbing_known":0,"athletics_focus_climbing_action":"","athletics_focus_lifting_known":0,"athletics_focus_lifting_action":"","athletics_focus_physical_training_known":0,"athletics_focus_physical_training_action":"","athletics_focus_running_known":0,"athletics_focus_running_action":"","athletics_focus_swimming_known":0,"athletics_focus_swimming_action":"","crafting_skill_action":"","crafting_ranks":"","crafting_focus_armorsmithing_known":0,"crafting_focus_armorsmithing_action":"","crafting_focus_cooking_known":0,"crafting_focus_cooking_action":"","crafting_focus_tailoring_known":0,"crafting_focus_tailoring_action":"","crafting_focus_weaponsmithing_known":0,"crafting_focus_weaponsmithing_action":"","engineering_skill_action":"","engineering_ranks":"","engineering_focus_architecture_known":0,"engineering_focus_architecture_action":"","engineering_focus_defenses_known":0,"engineering_focus_defenses_action":"","engineering_focus_demolition_known":0,"engineering_focus_demolition_action":"","engineering_focus_infrastructure_known":0,"engineering_focus_infrastructure_action":"","engineering_focus_siege_engines_known":0,"engineering_focus_siege_engines_action":"","fighting_skill_action":"","fighting_ranks":"","fighting_focus_archery_known":0,"fighting_focus_archery_action":"","fighting_focus_melee_weapons_known":0,"fighting_focus_melee_weapons_action":"","fighting_focus_thrown_weapons_known":0,"fighting_focus_thrown_weapons_action":"","fighting_focus_unarmed_known":0,"fighting_focus_unarmed_action":"","fighting_focus_war_magic_known":0,"fighting_focus_war_magic_action":"","medicine_skill_action":"","medicine_ranks":"","medicine_focus_contagion_known":0,"medicine_focus_contagion_action":"","medicine_focus_faith_healing_known":0,"medicine_focus_faith_healing_action":"","medicine_focus_field_treatment_known":0,"medicine_focus_field_treatment_action":"","medicine_focus_pharmacia_known":0,"medicine_focus_pharmacia_action":"","medicine_focus_surgery_known":0,"medicine_focus_surgery_action":"","observation_skill_action":"","observation_ranks":"","observation_focus_hearing_known":0,"observation_focus_hearing_action":"","observation_focus_instincts_known":0,"observation_focus_instincts_action":"","observation_focus_sight_known":0,"observation_focus_sight_action":"","observation_focus_smell_and_taste_known":0,"observation_focus_smell_and_taste_action":"","persuasion_skill_action":"","persuasion_ranks":"","persuasion_focus_charm_known":0,"persuasion_focus_charm_action":"","persuasion_focus_deception_known":0,"persuasion_focus_deception_action":"","persuasion_focus_innuendo_known":0,"persuasion_focus_innuendo_action":"","persuasion_focus_intimidation_known":0,"persuasion_focus_intimidation_action":"","persuasion_focus_invocation_known":0,"persuasion_focus_invocation_action":"","persuasion_focus_negotiation_known":0,"persuasion_focus_negotiation_action":"","persuasion_focus_rhetoric_known":0,"persuasion_focus_rhetoric_action":"","resilience_skill_action":"","resilience_ranks":"","resilience_focus_discipline_known":0,"resilience_focus_discipline_action":"","resilience_focus_fortitude_known":0,"resilience_focus_fortitude_action":"","resilience_focus_immunity_known":0,"resilience_focus_immunity_action":"","stealth_skill_action":"","stealth_ranks":"","stealth_focus_concealment_known":0,"stealth_focus_concealment_action":"","stealth_focus_disguise_known":0,"stealth_focus_disguise_action":"","stealth_focus_escape_artistry_known":0,"stealth_focus_escape_artistry_action":"","stealth_focus_lock_picking_known":0,"stealth_focus_lock_picking_action":"","stealth_focus_sleight_of_hand_known":0,"stealth_focus_sleight_of_hand_action":"","stealth_focus_sneak_known":0,"stealth_focus_sneak_action":"","survival_skill_action":"","survival_ranks":"","survival_focus_animal_handling_known":0,"survival_focus_animal_handling_action":"","survival_focus_boating_known":0,"survival_focus_boating_action":"","survival_focus_foraging_known":0,"survival_focus_foraging_action":"","survival_focus_hunting_known":0,"survival_focus_hunting_action":"","survival_focus_mysticism_known":0,"survival_focus_mysticism_action":"","survival_focus_navigation_known":0,"survival_focus_navigation_action":"","survival_focus_tracking_known":0,"survival_focus_tracking_action":"","survival_focus_woodcraft_known":0,"survival_focus_woodcraft_action":"","tactics_skill_action":"","tactics_ranks":"","tactics_focus_cavalry_known":0,"tactics_focus_cavalry_action":"","tactics_focus_infantry_known":0,"tactics_focus_infantry_action":"","tactics_focus_leadership_known":0,"tactics_focus_leadership_action":"","tactics_focus_navy_known":0,"tactics_focus_navy_action":"","tactics_focus_omen_reading_known":0,"tactics_focus_omen_reading_action":"","tactics_focus_scouting_known":0,"tactics_focus_scouting_action":"","talent_filter_0":0,"talent_filter_1":0,"talent_filter_2":0,"talent_filter_3":0,"talent_filter_4":0,"talent_filter_5":0,"talent_filter_6":0,"talent_filter_7":0,"talent_filter_8":0,"talent_filter_9":0,"talent_filter_10":0,"talent_filter_11":0,"talent_filter_12":0,"talent_filter_13":0,"talent_filter_14":0,"talent_filter_15":0,"talent_filter_16":0,"talent_filter_17":0,"talent_filter_18":0,"talent_filter_19":0,"talent_filter_20":0,"talent_filter_21":0,"talent_filter_22":0,"talent_filter_23":0,"talent_filter_24":0,"talent_filter_25":0,"talent_filter_26":0,"talent_filter_27":0,"talent_filter_28":0,"talent_filter_29":0,"talent_filter_30":0,"talent_filter_31":0,"talent_filter_32":0,"talent_filter_33":0,"talent_filter_34":0,"talent_filter_35":0,"talent_filter_36":0,"talent_filter_37":0,"talent_filter_38":0,"talent_filter_39":0,"talent_filter_40":0,"talent_filter_41":0,"talent_filter_42":0,"talent_filter_43":0,"talent_filter_44":0,"talent_filter_45":0,"talent_filter_46":0,"talent_filter_47":0,"talent_filter_48":0,"talent_filter_49":0,"talent_filter_50":0,"talent_filter_51":0,"talent_filter_52":0,"talent_filter_53":0,"talent_filter_54":0,"talent_filter_55":0,"talent_filter_56":0,"talent_filter_57":0,"talent_filter_58":0,"talent_filter_59":0,"talent_filter_60":0,"talent_filter_61":0,"talent_filter_62":0,"talent_filter_63":0,"talent_filter_64":0,"talent_filter_65":0,"talent_filter_66":0,"talent_filter_67":0,"talent_filter_68":0,"talent_filter_69":0,"languages":"","xp_earned":"","xp_spent":"","xp_available":"","spells_type_marker":"pc","spellcasting_type":"","magical_tradition":"","spellcasting_attribute":"","power_rating":"","base_power":"","traits":"","history":"","personal_agenda":"","belongings":"","journal_notes":""},
  triggers: [],
  translation,
  otherCharacters: {
    // Attribute information of other test characters indexed by character name
  },
  queryResponses:{
    // object defining which value to use for roll queries, indexed by prompt text
  }
};
global.environment = environment;

const on = vi.fn((trigger, func) => {
  environment.triggers.push({ trigger, func });
});
global.on = on;
const getAttrs = vi.fn((query, callback) => {
  let values = {};
  for (const attr of query) {
    if (attr in environment.attributes) values[attr] = environment.attributes[attr];
  }
  if (typeof callback === "function") callback(values);
});
global.getAttrs = getAttrs;
const setAttrs = vi.fn((submit, params, callback) => {
  if (!callback && typeof params === "function") callback = params;
  for (const attr in submit) {
    environment.attributes[attr] = submit[attr];
  }
  if (typeof callback === "function") callback();
});
global.setAttrs = setAttrs;
const getSectionIDs = vi.fn((section, callback) => {
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
const getSectionIDsSync = vi.fn((section) => {
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
const removeRepeatingRow = vi.fn((id) => {
  const attributes = environment.attributes;
  for (const attr in attributes) {
    if (attr.indexOf(id) > -1) delete environment.attributes[attr];
  }
});
global.removeRepeatingRow = removeRepeatingRow;
const setSectionOrder = vi.fn((section, order, callback) => {
  const sectionName = section.indexOf('repeating_') === 0 ? section : `repeating_${section}`;
  environment.attributes[`_reporder_${sectionName}`] = Array.isArray(order) ? order.join(',') : order;
  if (typeof callback === 'function') callback();
});
global.setSectionOrder = setSectionOrder;
const getCompendiumPage = vi.fn((request, callback) => {
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
const generateUUID = vi.fn(() => {
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
const generateRowID = vi.fn(() => {
  return generateUUID().replace(/_/g, "Z");
});
global.generateRowID = generateRowID;
const simulateEvent = vi.fn((event) => {
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
const getTranslationByKey = vi.fn((key) => environment.translation?.[key] || false);
global.getTranslationByKey = getTranslationByKey;
// Roll Handlingglobal.getTranslationByKey = getTranslationByKey;

const extractRollTemplate = (rollString) => {
  const rollTemplate = rollString.match(/&\{template:(.*?)\}/)?.[1];
  environment.attributes.__rolltemplate = rollTemplate;
};

const cleanRollElements = (value) => {
  const cleanText = value
    .replace(/\{\{|\}}(?=$|\s|\{)/g, "")
    .replace(/=/,'===SPLITHERE===');
  const splitText = cleanText.split("===SPLITHERE===");
  return splitText;
};

const extractRollElements = (rollString) => {
  const rollElements = rollString.match(/\{\{(.*?)\}{2,}(?=$|\s|\{)/g);
  if (!rollElements || rollElements.length < 1) return {}
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

const calculateResult = (startExpression, dice) => {
  let expression = startExpression.replace(/\[.+?\]/g,'')

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

const replaceQueries = (element) => {
  return element.replace(/\?\{(.+?)[|}]([^}]+?\})?/g,(match,p,a) => {
    a = a?.split(/\s*\|\s*/) || [];
    return environment.queryResponses[p] || a[0] || '';
  });
};

const calculateRollResult = (rollElements) => {
  const results = {};
  for (const key in rollElements) {
    const element = rollElements[key];
    if (element.indexOf("[[") === -1) continue;
    const attributeFilled = replaceAttributes(element);
    const queryAnswered = replaceQueries(attributeFilled);
    const expression = getExpression(queryAnswered);
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

const startRoll = vi.fn(async (rollString) => {
  if (!rollString) throw new Error("startRoll expected a Roll String but none was provided.");
  const rollResult = { results: {} };
  extractRollTemplate(rollString);
  const rollElements = extractRollElements(rollString);
  rollResult.results = calculateRollResult(rollElements);
  rollResult.rollId = generateUUID();
  return rollResult;
});
global.startRoll = startRoll;
const finishRoll = vi.fn(() => {});
global.finishRoll = finishRoll;
const k = (function(){
  const kFuncs = {};
  
  const cascades = {"attr_character_name":{"name":"character_name","type":"text","defaultValue":"","affects":[],"triggeredFuncs":["setActionCalls"],"listenerFunc":"accessSheet","listener":"change:character_name"},"act_k-network-call":{"name":"k-network-call","type":"action","triggeredFuncs":["kReceive"],"affects":[],"addFuncs":[],"listener":"clicked:k-network-call","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_sheet_version":{"name":"sheet_version","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:sheet_version","listenerFunc":"accessSheet","defaultValue":"0.1.0","calculation":"","initialFunc":"","formula":""},"attr_npc_sheet":{"name":"npc_sheet","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:npc_sheet","listenerFunc":"accessSheet","defaultValue":0,"calculation":"calcNpcSheet","initialFunc":"ccSetSheetMode","formula":""},"attr_cohors_cthulhu_tab":{"name":"cohors_cthulhu_tab","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:cohors_cthulhu_tab","listenerFunc":"accessSheet","defaultValue":"nav-tabs-cohors-cthulhu--character","calculation":"","initialFunc":"","formula":""},"act_nav-tabs-cohors-cthulhu--character":{"name":"nav-tabs-cohors-cthulhu--character","type":"action","triggeredFuncs":["kSwitchTab"],"affects":[],"addFuncs":[],"listener":"clicked:nav-tabs-cohors-cthulhu--character","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_nav-tabs-cohors-cthulhu--spells":{"name":"nav-tabs-cohors-cthulhu--spells","type":"action","triggeredFuncs":["kSwitchTab"],"affects":[],"addFuncs":[],"listener":"clicked:nav-tabs-cohors-cthulhu--spells","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_nav-tabs-cohors-cthulhu--notes":{"name":"nav-tabs-cohors-cthulhu--notes","type":"action","triggeredFuncs":["kSwitchTab"],"affects":[],"addFuncs":[],"listener":"clicked:nav-tabs-cohors-cthulhu--notes","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_character_type":{"name":"character_type","type":"radio","triggeredFuncs":[],"affects":["npc_sheet","stress_max_base","stress_max","stress_max_marker","fatigue_max_marker","courage","total_armor","injury_limit","power_rating","spells_type_marker"],"addFuncs":[],"listener":"change:character_type","listenerFunc":"accessSheet","defaultValue":"pc","calculation":"","initialFunc":"","formula":""},"attr_npc_last_tier":{"name":"npc_last_tier","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:npc_last_tier","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_name_pronoun":{"name":"name_pronoun","type":"text","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:name_pronoun","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_culture":{"name":"culture","type":"select","triggeredFuncs":["ccUpdateTalentFilter"],"affects":[],"addFuncs":[],"listener":"change:culture","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_caste":{"name":"caste","type":"select","triggeredFuncs":["ccUpdateTalentFilter"],"affects":[],"addFuncs":[],"listener":"change:caste","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_wealth":{"name":"wealth","type":"text","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:wealth","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_archetype_marker":{"name":"archetype_marker","type":"radio","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:archetype_marker","listenerFunc":"accessSheet","defaultValue":"none","calculation":"calcArchetypeMarker","initialFunc":"","formula":""},"attr_archetype":{"name":"archetype","type":"select","triggeredFuncs":["ccCheckSpecialization","ccUpdateTalentFilter"],"affects":["archetype_marker"],"addFuncs":[],"listener":"change:archetype","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_specialization":{"name":"specialization","type":"select","triggeredFuncs":["ccUpdateTalentFilter"],"affects":[],"addFuncs":[],"listener":"change:specialization","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_background":{"name":"background","type":"text","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:background","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_characteristic":{"name":"characteristic","type":"text","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:characteristic","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_npc_allegiance":{"name":"npc_allegiance","type":"radio","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:npc_allegiance","listenerFunc":"accessSheet","defaultValue":"adversary","calculation":"","initialFunc":"","formula":""},"attr_npc_stress":{"name":"npc_stress","type":"text","triggeredFuncs":[],"affects":["stress_max_base","stress_max","stress_max_marker","fatigue_max_marker"],"addFuncs":[],"listener":"change:npc_stress","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_npc_injuries":{"name":"npc_injuries","type":"text","triggeredFuncs":[],"affects":["injury_limit"],"addFuncs":[],"listener":"change:npc_injuries","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_npc_armor":{"name":"npc_armor","type":"text","triggeredFuncs":[],"affects":["total_armor"],"addFuncs":[],"listener":"change:npc_armor","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_npc_courage":{"name":"npc_courage","type":"text","triggeredFuncs":[],"affects":["courage"],"addFuncs":[],"listener":"change:npc_courage","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_npc_morale":{"name":"npc_morale","type":"number","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:npc_morale","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_npc_power":{"name":"npc_power","type":"text","triggeredFuncs":[],"affects":["power_rating"],"addFuncs":[],"listener":"change:npc_power","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_injury_limit":{"name":"injury_limit","type":"number","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:injury_limit","listenerFunc":"accessSheet","defaultValue":0,"calculation":"calcInjuryLimit","initialFunc":"","formula":""},"attr_npc_escalation":{"name":"npc_escalation","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:npc_escalation","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_truth_1":{"name":"truth_1","type":"text","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:truth_1","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_truth_2":{"name":"truth_2","type":"text","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:truth_2","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_truth_3":{"name":"truth_3","type":"text","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:truth_3","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_truth_4":{"name":"truth_4","type":"text","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:truth_4","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_truth_5":{"name":"truth_5","type":"text","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:truth_5","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_scar_1":{"name":"scar_1","type":"text","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:scar_1","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_truths_scars_expanded":{"name":"truths_scars_expanded","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:truths_scars_expanded","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_scar_2":{"name":"scar_2","type":"text","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:scar_2","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_scar_3":{"name":"scar_3","type":"text","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:scar_3","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_scar_4":{"name":"scar_4","type":"text","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:scar_4","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_scar_5":{"name":"scar_5","type":"text","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:scar_5","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_stress":{"name":"stress","type":"radio","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:stress","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_stress_max_marker":{"name":"stress_max_marker","type":"radio","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:stress_max_marker","listenerFunc":"accessSheet","defaultValue":0,"calculation":"calcStressMax","initialFunc":"","formula":""},"act_stress-box-1":{"name":"stress-box-1","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":[],"addFuncs":[],"listener":"clicked:stress-box-1","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_stress-box-2":{"name":"stress-box-2","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":[],"addFuncs":[],"listener":"clicked:stress-box-2","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_stress-box-3":{"name":"stress-box-3","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":[],"addFuncs":[],"listener":"clicked:stress-box-3","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_stress-box-4":{"name":"stress-box-4","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":[],"addFuncs":[],"listener":"clicked:stress-box-4","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_stress-box-5":{"name":"stress-box-5","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":[],"addFuncs":[],"listener":"clicked:stress-box-5","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_stress-box-6":{"name":"stress-box-6","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":[],"addFuncs":[],"listener":"clicked:stress-box-6","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_stress-box-7":{"name":"stress-box-7","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":[],"addFuncs":[],"listener":"clicked:stress-box-7","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_stress-box-8":{"name":"stress-box-8","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":[],"addFuncs":[],"listener":"clicked:stress-box-8","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_stress-box-9":{"name":"stress-box-9","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":[],"addFuncs":[],"listener":"clicked:stress-box-9","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_stress-box-10":{"name":"stress-box-10","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":[],"addFuncs":[],"listener":"clicked:stress-box-10","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_stress-box-11":{"name":"stress-box-11","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":[],"addFuncs":[],"listener":"clicked:stress-box-11","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_stress-box-12":{"name":"stress-box-12","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":[],"addFuncs":[],"listener":"clicked:stress-box-12","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_stress-box-13":{"name":"stress-box-13","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":[],"addFuncs":[],"listener":"clicked:stress-box-13","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_stress-box-14":{"name":"stress-box-14","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":[],"addFuncs":[],"listener":"clicked:stress-box-14","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_stress-box-15":{"name":"stress-box-15","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":[],"addFuncs":[],"listener":"clicked:stress-box-15","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_stress-box-16":{"name":"stress-box-16","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":[],"addFuncs":[],"listener":"clicked:stress-box-16","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_stress-box-17":{"name":"stress-box-17","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":[],"addFuncs":[],"listener":"clicked:stress-box-17","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_stress-box-18":{"name":"stress-box-18","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":[],"addFuncs":[],"listener":"clicked:stress-box-18","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_stress-box-19":{"name":"stress-box-19","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":[],"addFuncs":[],"listener":"clicked:stress-box-19","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_stress-box-20":{"name":"stress-box-20","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":[],"addFuncs":[],"listener":"clicked:stress-box-20","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_stress-box-21":{"name":"stress-box-21","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":[],"addFuncs":[],"listener":"clicked:stress-box-21","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_stress-box-22":{"name":"stress-box-22","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":[],"addFuncs":[],"listener":"clicked:stress-box-22","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_stress-box-23":{"name":"stress-box-23","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":[],"addFuncs":[],"listener":"clicked:stress-box-23","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_stress-box-24":{"name":"stress-box-24","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":[],"addFuncs":[],"listener":"clicked:stress-box-24","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_stress-box-25":{"name":"stress-box-25","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":[],"addFuncs":[],"listener":"clicked:stress-box-25","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_stress-box-26":{"name":"stress-box-26","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":[],"addFuncs":[],"listener":"clicked:stress-box-26","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_stress-box-27":{"name":"stress-box-27","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":[],"addFuncs":[],"listener":"clicked:stress-box-27","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_stress-box-28":{"name":"stress-box-28","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":[],"addFuncs":[],"listener":"clicked:stress-box-28","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_stress-box-29":{"name":"stress-box-29","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":[],"addFuncs":[],"listener":"clicked:stress-box-29","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_stress-box-30":{"name":"stress-box-30","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":[],"addFuncs":[],"listener":"clicked:stress-box-30","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_stress_max_base":{"name":"stress_max_base","type":"number","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:stress_max_base","listenerFunc":"accessSheet","defaultValue":0,"calculation":"calcStressMaxBase","initialFunc":"","formula":""},"attr_stress_max":{"name":"stress_max","type":"number","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:stress_max","listenerFunc":"accessSheet","defaultValue":0,"calculation":"calcStressMax","initialFunc":"","formula":""},"attr_fatigue":{"name":"fatigue","type":"radio","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:fatigue","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_fatigue_max_marker":{"name":"fatigue_max_marker","type":"radio","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:fatigue_max_marker","listenerFunc":"accessSheet","defaultValue":0,"calculation":"calcStressMaxBase","initialFunc":"","formula":""},"act_fatigue-box-1":{"name":"fatigue-box-1","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":["stress_max","stress_max_marker"],"addFuncs":[],"listener":"clicked:fatigue-box-1","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_fatigue-box-2":{"name":"fatigue-box-2","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":["stress_max","stress_max_marker"],"addFuncs":[],"listener":"clicked:fatigue-box-2","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_fatigue-box-3":{"name":"fatigue-box-3","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":["stress_max","stress_max_marker"],"addFuncs":[],"listener":"clicked:fatigue-box-3","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_fatigue-box-4":{"name":"fatigue-box-4","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":["stress_max","stress_max_marker"],"addFuncs":[],"listener":"clicked:fatigue-box-4","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_fatigue-box-5":{"name":"fatigue-box-5","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":["stress_max","stress_max_marker"],"addFuncs":[],"listener":"clicked:fatigue-box-5","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_fatigue-box-6":{"name":"fatigue-box-6","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":["stress_max","stress_max_marker"],"addFuncs":[],"listener":"clicked:fatigue-box-6","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_fatigue-box-7":{"name":"fatigue-box-7","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":["stress_max","stress_max_marker"],"addFuncs":[],"listener":"clicked:fatigue-box-7","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_fatigue-box-8":{"name":"fatigue-box-8","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":["stress_max","stress_max_marker"],"addFuncs":[],"listener":"clicked:fatigue-box-8","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_fatigue-box-9":{"name":"fatigue-box-9","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":["stress_max","stress_max_marker"],"addFuncs":[],"listener":"clicked:fatigue-box-9","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_fatigue-box-10":{"name":"fatigue-box-10","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":["stress_max","stress_max_marker"],"addFuncs":[],"listener":"clicked:fatigue-box-10","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_fatigue-box-11":{"name":"fatigue-box-11","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":["stress_max","stress_max_marker"],"addFuncs":[],"listener":"clicked:fatigue-box-11","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_fatigue-box-12":{"name":"fatigue-box-12","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":["stress_max","stress_max_marker"],"addFuncs":[],"listener":"clicked:fatigue-box-12","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_fatigue-box-13":{"name":"fatigue-box-13","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":["stress_max","stress_max_marker"],"addFuncs":[],"listener":"clicked:fatigue-box-13","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_fatigue-box-14":{"name":"fatigue-box-14","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":["stress_max","stress_max_marker"],"addFuncs":[],"listener":"clicked:fatigue-box-14","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_fatigue-box-15":{"name":"fatigue-box-15","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":["stress_max","stress_max_marker"],"addFuncs":[],"listener":"clicked:fatigue-box-15","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_fatigue-box-16":{"name":"fatigue-box-16","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":["stress_max","stress_max_marker"],"addFuncs":[],"listener":"clicked:fatigue-box-16","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_fatigue-box-17":{"name":"fatigue-box-17","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":["stress_max","stress_max_marker"],"addFuncs":[],"listener":"clicked:fatigue-box-17","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_fatigue-box-18":{"name":"fatigue-box-18","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":["stress_max","stress_max_marker"],"addFuncs":[],"listener":"clicked:fatigue-box-18","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_fatigue-box-19":{"name":"fatigue-box-19","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":["stress_max","stress_max_marker"],"addFuncs":[],"listener":"clicked:fatigue-box-19","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_fatigue-box-20":{"name":"fatigue-box-20","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":["stress_max","stress_max_marker"],"addFuncs":[],"listener":"clicked:fatigue-box-20","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_fatigue-box-21":{"name":"fatigue-box-21","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":["stress_max","stress_max_marker"],"addFuncs":[],"listener":"clicked:fatigue-box-21","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_fatigue-box-22":{"name":"fatigue-box-22","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":["stress_max","stress_max_marker"],"addFuncs":[],"listener":"clicked:fatigue-box-22","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_fatigue-box-23":{"name":"fatigue-box-23","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":["stress_max","stress_max_marker"],"addFuncs":[],"listener":"clicked:fatigue-box-23","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_fatigue-box-24":{"name":"fatigue-box-24","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":["stress_max","stress_max_marker"],"addFuncs":[],"listener":"clicked:fatigue-box-24","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_fatigue-box-25":{"name":"fatigue-box-25","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":["stress_max","stress_max_marker"],"addFuncs":[],"listener":"clicked:fatigue-box-25","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_fatigue-box-26":{"name":"fatigue-box-26","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":["stress_max","stress_max_marker"],"addFuncs":[],"listener":"clicked:fatigue-box-26","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_fatigue-box-27":{"name":"fatigue-box-27","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":["stress_max","stress_max_marker"],"addFuncs":[],"listener":"clicked:fatigue-box-27","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_fatigue-box-28":{"name":"fatigue-box-28","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":["stress_max","stress_max_marker"],"addFuncs":[],"listener":"clicked:fatigue-box-28","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_fatigue-box-29":{"name":"fatigue-box-29","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":["stress_max","stress_max_marker"],"addFuncs":[],"listener":"clicked:fatigue-box-29","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_fatigue-box-30":{"name":"fatigue-box-30","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":["stress_max","stress_max_marker"],"addFuncs":[],"listener":"clicked:fatigue-box-30","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_fatigue-resist-action":{"name":"fatigue-resist-action","type":"action","triggeredFuncs":["initiateFatigueResistRoll"],"affects":[],"addFuncs":[],"listener":"clicked:fatigue-resist-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_fatigue_resist_action":{"name":"fatigue_resist_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:fatigue_resist_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_fatigue_ignored":{"name":"fatigue_ignored","type":"checkbox","triggeredFuncs":[],"affects":["stress_max","stress_max_marker"],"addFuncs":[],"listener":"change:fatigue_ignored","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_courage":{"name":"courage","type":"number","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:courage","listenerFunc":"accessSheet","defaultValue":0,"calculation":"calcCourage","initialFunc":"","formula":""},"attr_base_armour":{"name":"base_armour","type":"number","triggeredFuncs":[],"affects":["total_armor"],"addFuncs":[],"listener":"change:base_armour","listenerFunc":"accessSheet","defaultValue":0,"calculation":"calcBaseArmour","initialFunc":"","formula":""},"attr_total_armor":{"name":"total_armor","type":"number","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:total_armor","listenerFunc":"accessSheet","defaultValue":0,"calculation":"calcTotalArmor","initialFunc":"","formula":""},"attr_injuries":{"name":"injuries","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:injuries","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_fortune":{"name":"fortune","type":"radio","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:fortune","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_fortune-box-1":{"name":"fortune-box-1","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":[],"addFuncs":[],"listener":"clicked:fortune-box-1","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_fortune-box-2":{"name":"fortune-box-2","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":[],"addFuncs":[],"listener":"clicked:fortune-box-2","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_fortune-box-3":{"name":"fortune-box-3","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":[],"addFuncs":[],"listener":"clicked:fortune-box-3","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_fortune-box-4":{"name":"fortune-box-4","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":[],"addFuncs":[],"listener":"clicked:fortune-box-4","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_fortune-box-5":{"name":"fortune-box-5","type":"action","triggeredFuncs":["ccTrackBoxClick"],"affects":[],"addFuncs":[],"listener":"clicked:fortune-box-5","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_agility-action":{"name":"agility-action","type":"action","triggeredFuncs":["initiateAttributeRoll"],"affects":[],"addFuncs":[],"listener":"clicked:agility-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_agility_action":{"name":"agility_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:agility_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_brawn-action":{"name":"brawn-action","type":"action","triggeredFuncs":["initiateAttributeRoll"],"affects":[],"addFuncs":[],"listener":"clicked:brawn-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_brawn_action":{"name":"brawn_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:brawn_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_coordination-action":{"name":"coordination-action","type":"action","triggeredFuncs":["initiateAttributeRoll"],"affects":[],"addFuncs":[],"listener":"clicked:coordination-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_coordination_action":{"name":"coordination_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:coordination_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_gravitas-action":{"name":"gravitas-action","type":"action","triggeredFuncs":["initiateAttributeRoll"],"affects":[],"addFuncs":[],"listener":"clicked:gravitas-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_gravitas_action":{"name":"gravitas_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:gravitas_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_insight-action":{"name":"insight-action","type":"action","triggeredFuncs":["initiateAttributeRoll"],"affects":[],"addFuncs":[],"listener":"clicked:insight-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_insight_action":{"name":"insight_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:insight_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_reason-action":{"name":"reason-action","type":"action","triggeredFuncs":["initiateAttributeRoll"],"affects":[],"addFuncs":[],"listener":"clicked:reason-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_reason_action":{"name":"reason_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:reason_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_will-action":{"name":"will-action","type":"action","triggeredFuncs":["initiateAttributeRoll"],"affects":[],"addFuncs":[],"listener":"clicked:will-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_will_action":{"name":"will_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:will_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_agility_rating":{"name":"agility_rating","type":"number","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:agility_rating","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_brawn_rating":{"name":"brawn_rating","type":"number","triggeredFuncs":[],"affects":["brawn_bonus_damage","base_armour","total_armor","stress_max_base","stress_max","stress_max_marker","fatigue_max_marker"],"addFuncs":[],"listener":"change:brawn_rating","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_coordination_rating":{"name":"coordination_rating","type":"number","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:coordination_rating","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_gravitas_rating":{"name":"gravitas_rating","type":"number","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:gravitas_rating","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_insight_rating":{"name":"insight_rating","type":"number","triggeredFuncs":[],"affects":["insight_bonus_damage","power_rating"],"addFuncs":[],"listener":"change:insight_rating","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_reason_rating":{"name":"reason_rating","type":"number","triggeredFuncs":[],"affects":["power_rating"],"addFuncs":[],"listener":"change:reason_rating","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_will_rating":{"name":"will_rating","type":"number","triggeredFuncs":[],"affects":["will_bonus_damage","courage","stress_max_base","stress_max","stress_max_marker","fatigue_max_marker","power_rating"],"addFuncs":[],"listener":"change:will_rating","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_brawn_bonus_damage":{"name":"brawn_bonus_damage","type":"number","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:brawn_bonus_damage","listenerFunc":"accessSheet","defaultValue":0,"calculation":"calcAttributeBonusDamage","initialFunc":"","formula":""},"attr_insight_bonus_damage":{"name":"insight_bonus_damage","type":"number","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:insight_bonus_damage","listenerFunc":"accessSheet","defaultValue":0,"calculation":"calcAttributeBonusDamage","initialFunc":"","formula":""},"attr_will_bonus_damage":{"name":"will_bonus_damage","type":"number","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:will_bonus_damage","listenerFunc":"accessSheet","defaultValue":0,"calculation":"calcAttributeBonusDamage","initialFunc":"","formula":""},"attr_skills_edit":{"name":"skills_edit","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:skills_edit","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_skills-edit-toggle":{"name":"skills-edit-toggle","type":"action","triggeredFuncs":["ccToggleSkillsEdit"],"affects":[],"addFuncs":[],"listener":"clicked:skills-edit-toggle","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_academia-skill-action":{"name":"academia-skill-action","type":"action","triggeredFuncs":["initiateSkillRoll"],"affects":[],"addFuncs":[],"listener":"clicked:academia-skill-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_academia_skill_action":{"name":"academia_skill_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:academia_skill_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_academia_ranks":{"name":"academia_ranks","type":"number","triggeredFuncs":["ccUpdateTalentFilter"],"affects":[],"addFuncs":[],"listener":"change:academia_ranks","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_academia_focus_finance_known":{"name":"academia_focus_finance_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:academia_focus_finance_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_academia-focus-finance-action":{"name":"academia-focus-finance-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:academia-focus-finance-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_academia_focus_finance_action":{"name":"academia_focus_finance_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:academia_focus_finance_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_academia_focus_history_known":{"name":"academia_focus_history_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:academia_focus_history_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_academia-focus-history-action":{"name":"academia-focus-history-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:academia-focus-history-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_academia_focus_history_action":{"name":"academia_focus_history_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:academia_focus_history_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_academia_focus_linguistics_known":{"name":"academia_focus_linguistics_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:academia_focus_linguistics_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_academia-focus-linguistics-action":{"name":"academia-focus-linguistics-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:academia-focus-linguistics-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_academia_focus_linguistics_action":{"name":"academia_focus_linguistics_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:academia_focus_linguistics_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_academia_focus_philosophy_known":{"name":"academia_focus_philosophy_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:academia_focus_philosophy_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_academia-focus-philosophy-action":{"name":"academia-focus-philosophy-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:academia-focus-philosophy-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_academia_focus_philosophy_action":{"name":"academia_focus_philosophy_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:academia_focus_philosophy_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_academia_focus_religion_known":{"name":"academia_focus_religion_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:academia_focus_religion_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_academia-focus-religion-action":{"name":"academia-focus-religion-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:academia-focus-religion-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_academia_focus_religion_action":{"name":"academia_focus_religion_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:academia_focus_religion_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_athletics-skill-action":{"name":"athletics-skill-action","type":"action","triggeredFuncs":["initiateSkillRoll"],"affects":[],"addFuncs":[],"listener":"clicked:athletics-skill-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_athletics_skill_action":{"name":"athletics_skill_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:athletics_skill_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_athletics_ranks":{"name":"athletics_ranks","type":"number","triggeredFuncs":["ccUpdateTalentFilter"],"affects":[],"addFuncs":[],"listener":"change:athletics_ranks","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_athletics_focus_climbing_known":{"name":"athletics_focus_climbing_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:athletics_focus_climbing_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_athletics-focus-climbing-action":{"name":"athletics-focus-climbing-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:athletics-focus-climbing-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_athletics_focus_climbing_action":{"name":"athletics_focus_climbing_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:athletics_focus_climbing_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_athletics_focus_lifting_known":{"name":"athletics_focus_lifting_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:athletics_focus_lifting_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_athletics-focus-lifting-action":{"name":"athletics-focus-lifting-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:athletics-focus-lifting-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_athletics_focus_lifting_action":{"name":"athletics_focus_lifting_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:athletics_focus_lifting_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_athletics_focus_physical_training_known":{"name":"athletics_focus_physical_training_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:athletics_focus_physical_training_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_athletics-focus-physical-training-action":{"name":"athletics-focus-physical-training-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:athletics-focus-physical-training-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_athletics_focus_physical_training_action":{"name":"athletics_focus_physical_training_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:athletics_focus_physical_training_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_athletics_focus_running_known":{"name":"athletics_focus_running_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:athletics_focus_running_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_athletics-focus-running-action":{"name":"athletics-focus-running-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:athletics-focus-running-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_athletics_focus_running_action":{"name":"athletics_focus_running_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:athletics_focus_running_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_athletics_focus_swimming_known":{"name":"athletics_focus_swimming_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:athletics_focus_swimming_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_athletics-focus-swimming-action":{"name":"athletics-focus-swimming-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:athletics-focus-swimming-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_athletics_focus_swimming_action":{"name":"athletics_focus_swimming_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:athletics_focus_swimming_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_crafting-skill-action":{"name":"crafting-skill-action","type":"action","triggeredFuncs":["initiateSkillRoll"],"affects":[],"addFuncs":[],"listener":"clicked:crafting-skill-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_crafting_skill_action":{"name":"crafting_skill_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:crafting_skill_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_crafting_ranks":{"name":"crafting_ranks","type":"number","triggeredFuncs":["ccUpdateTalentFilter"],"affects":[],"addFuncs":[],"listener":"change:crafting_ranks","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_crafting_focus_armorsmithing_known":{"name":"crafting_focus_armorsmithing_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:crafting_focus_armorsmithing_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_crafting-focus-armorsmithing-action":{"name":"crafting-focus-armorsmithing-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:crafting-focus-armorsmithing-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_crafting_focus_armorsmithing_action":{"name":"crafting_focus_armorsmithing_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:crafting_focus_armorsmithing_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_crafting_focus_cooking_known":{"name":"crafting_focus_cooking_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:crafting_focus_cooking_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_crafting-focus-cooking-action":{"name":"crafting-focus-cooking-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:crafting-focus-cooking-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_crafting_focus_cooking_action":{"name":"crafting_focus_cooking_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:crafting_focus_cooking_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_crafting_focus_tailoring_known":{"name":"crafting_focus_tailoring_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:crafting_focus_tailoring_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_crafting-focus-tailoring-action":{"name":"crafting-focus-tailoring-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:crafting-focus-tailoring-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_crafting_focus_tailoring_action":{"name":"crafting_focus_tailoring_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:crafting_focus_tailoring_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_crafting_focus_weaponsmithing_known":{"name":"crafting_focus_weaponsmithing_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:crafting_focus_weaponsmithing_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_crafting-focus-weaponsmithing-action":{"name":"crafting-focus-weaponsmithing-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:crafting-focus-weaponsmithing-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_crafting_focus_weaponsmithing_action":{"name":"crafting_focus_weaponsmithing_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:crafting_focus_weaponsmithing_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_engineering-skill-action":{"name":"engineering-skill-action","type":"action","triggeredFuncs":["initiateSkillRoll"],"affects":[],"addFuncs":[],"listener":"clicked:engineering-skill-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_engineering_skill_action":{"name":"engineering_skill_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:engineering_skill_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_engineering_ranks":{"name":"engineering_ranks","type":"number","triggeredFuncs":["ccUpdateTalentFilter"],"affects":[],"addFuncs":[],"listener":"change:engineering_ranks","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_engineering_focus_architecture_known":{"name":"engineering_focus_architecture_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:engineering_focus_architecture_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_engineering-focus-architecture-action":{"name":"engineering-focus-architecture-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:engineering-focus-architecture-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_engineering_focus_architecture_action":{"name":"engineering_focus_architecture_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:engineering_focus_architecture_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_engineering_focus_defenses_known":{"name":"engineering_focus_defenses_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:engineering_focus_defenses_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_engineering-focus-defenses-action":{"name":"engineering-focus-defenses-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:engineering-focus-defenses-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_engineering_focus_defenses_action":{"name":"engineering_focus_defenses_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:engineering_focus_defenses_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_engineering_focus_demolition_known":{"name":"engineering_focus_demolition_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:engineering_focus_demolition_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_engineering-focus-demolition-action":{"name":"engineering-focus-demolition-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:engineering-focus-demolition-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_engineering_focus_demolition_action":{"name":"engineering_focus_demolition_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:engineering_focus_demolition_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_engineering_focus_infrastructure_known":{"name":"engineering_focus_infrastructure_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:engineering_focus_infrastructure_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_engineering-focus-infrastructure-action":{"name":"engineering-focus-infrastructure-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:engineering-focus-infrastructure-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_engineering_focus_infrastructure_action":{"name":"engineering_focus_infrastructure_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:engineering_focus_infrastructure_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_engineering_focus_siege_engines_known":{"name":"engineering_focus_siege_engines_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:engineering_focus_siege_engines_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_engineering-focus-siege-engines-action":{"name":"engineering-focus-siege-engines-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:engineering-focus-siege-engines-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_engineering_focus_siege_engines_action":{"name":"engineering_focus_siege_engines_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:engineering_focus_siege_engines_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_fighting-skill-action":{"name":"fighting-skill-action","type":"action","triggeredFuncs":["initiateSkillRoll"],"affects":[],"addFuncs":[],"listener":"clicked:fighting-skill-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_fighting_skill_action":{"name":"fighting_skill_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:fighting_skill_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_fighting_ranks":{"name":"fighting_ranks","type":"number","triggeredFuncs":["ccUpdateTalentFilter"],"affects":[],"addFuncs":[],"listener":"change:fighting_ranks","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_fighting_focus_archery_known":{"name":"fighting_focus_archery_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:fighting_focus_archery_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_fighting-focus-archery-action":{"name":"fighting-focus-archery-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:fighting-focus-archery-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_fighting_focus_archery_action":{"name":"fighting_focus_archery_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:fighting_focus_archery_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_fighting_focus_melee_weapons_known":{"name":"fighting_focus_melee_weapons_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:fighting_focus_melee_weapons_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_fighting-focus-melee-weapons-action":{"name":"fighting-focus-melee-weapons-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:fighting-focus-melee-weapons-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_fighting_focus_melee_weapons_action":{"name":"fighting_focus_melee_weapons_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:fighting_focus_melee_weapons_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_fighting_focus_thrown_weapons_known":{"name":"fighting_focus_thrown_weapons_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:fighting_focus_thrown_weapons_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_fighting-focus-thrown-weapons-action":{"name":"fighting-focus-thrown-weapons-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:fighting-focus-thrown-weapons-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_fighting_focus_thrown_weapons_action":{"name":"fighting_focus_thrown_weapons_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:fighting_focus_thrown_weapons_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_fighting_focus_unarmed_known":{"name":"fighting_focus_unarmed_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:fighting_focus_unarmed_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_fighting-focus-unarmed-action":{"name":"fighting-focus-unarmed-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:fighting-focus-unarmed-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_fighting_focus_unarmed_action":{"name":"fighting_focus_unarmed_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:fighting_focus_unarmed_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_fighting_focus_war_magic_known":{"name":"fighting_focus_war_magic_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:fighting_focus_war_magic_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_fighting-focus-war-magic-action":{"name":"fighting-focus-war-magic-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:fighting-focus-war-magic-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_fighting_focus_war_magic_action":{"name":"fighting_focus_war_magic_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:fighting_focus_war_magic_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_medicine-skill-action":{"name":"medicine-skill-action","type":"action","triggeredFuncs":["initiateSkillRoll"],"affects":[],"addFuncs":[],"listener":"clicked:medicine-skill-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_medicine_skill_action":{"name":"medicine_skill_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:medicine_skill_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_medicine_ranks":{"name":"medicine_ranks","type":"number","triggeredFuncs":["ccUpdateTalentFilter"],"affects":[],"addFuncs":[],"listener":"change:medicine_ranks","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_medicine_focus_contagion_known":{"name":"medicine_focus_contagion_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:medicine_focus_contagion_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_medicine-focus-contagion-action":{"name":"medicine-focus-contagion-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:medicine-focus-contagion-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_medicine_focus_contagion_action":{"name":"medicine_focus_contagion_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:medicine_focus_contagion_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_medicine_focus_faith_healing_known":{"name":"medicine_focus_faith_healing_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:medicine_focus_faith_healing_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_medicine-focus-faith-healing-action":{"name":"medicine-focus-faith-healing-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:medicine-focus-faith-healing-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_medicine_focus_faith_healing_action":{"name":"medicine_focus_faith_healing_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:medicine_focus_faith_healing_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_medicine_focus_field_treatment_known":{"name":"medicine_focus_field_treatment_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:medicine_focus_field_treatment_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_medicine-focus-field-treatment-action":{"name":"medicine-focus-field-treatment-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:medicine-focus-field-treatment-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_medicine_focus_field_treatment_action":{"name":"medicine_focus_field_treatment_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:medicine_focus_field_treatment_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_medicine_focus_pharmacia_known":{"name":"medicine_focus_pharmacia_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:medicine_focus_pharmacia_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_medicine-focus-pharmacia-action":{"name":"medicine-focus-pharmacia-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:medicine-focus-pharmacia-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_medicine_focus_pharmacia_action":{"name":"medicine_focus_pharmacia_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:medicine_focus_pharmacia_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_medicine_focus_surgery_known":{"name":"medicine_focus_surgery_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:medicine_focus_surgery_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_medicine-focus-surgery-action":{"name":"medicine-focus-surgery-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:medicine-focus-surgery-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_medicine_focus_surgery_action":{"name":"medicine_focus_surgery_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:medicine_focus_surgery_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_observation-skill-action":{"name":"observation-skill-action","type":"action","triggeredFuncs":["initiateSkillRoll"],"affects":[],"addFuncs":[],"listener":"clicked:observation-skill-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_observation_skill_action":{"name":"observation_skill_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:observation_skill_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_observation_ranks":{"name":"observation_ranks","type":"number","triggeredFuncs":["ccUpdateTalentFilter"],"affects":[],"addFuncs":[],"listener":"change:observation_ranks","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_observation_focus_hearing_known":{"name":"observation_focus_hearing_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:observation_focus_hearing_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_observation-focus-hearing-action":{"name":"observation-focus-hearing-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:observation-focus-hearing-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_observation_focus_hearing_action":{"name":"observation_focus_hearing_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:observation_focus_hearing_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_observation_focus_instincts_known":{"name":"observation_focus_instincts_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:observation_focus_instincts_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_observation-focus-instincts-action":{"name":"observation-focus-instincts-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:observation-focus-instincts-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_observation_focus_instincts_action":{"name":"observation_focus_instincts_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:observation_focus_instincts_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_observation_focus_sight_known":{"name":"observation_focus_sight_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:observation_focus_sight_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_observation-focus-sight-action":{"name":"observation-focus-sight-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:observation-focus-sight-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_observation_focus_sight_action":{"name":"observation_focus_sight_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:observation_focus_sight_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_observation_focus_smell_and_taste_known":{"name":"observation_focus_smell_and_taste_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:observation_focus_smell_and_taste_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_observation-focus-smell-and-taste-action":{"name":"observation-focus-smell-and-taste-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:observation-focus-smell-and-taste-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_observation_focus_smell_and_taste_action":{"name":"observation_focus_smell_and_taste_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:observation_focus_smell_and_taste_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_persuasion-skill-action":{"name":"persuasion-skill-action","type":"action","triggeredFuncs":["initiateSkillRoll"],"affects":[],"addFuncs":[],"listener":"clicked:persuasion-skill-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_persuasion_skill_action":{"name":"persuasion_skill_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:persuasion_skill_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_persuasion_ranks":{"name":"persuasion_ranks","type":"number","triggeredFuncs":["ccUpdateTalentFilter"],"affects":[],"addFuncs":[],"listener":"change:persuasion_ranks","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_persuasion_focus_charm_known":{"name":"persuasion_focus_charm_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:persuasion_focus_charm_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_persuasion-focus-charm-action":{"name":"persuasion-focus-charm-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:persuasion-focus-charm-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_persuasion_focus_charm_action":{"name":"persuasion_focus_charm_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:persuasion_focus_charm_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_persuasion_focus_deception_known":{"name":"persuasion_focus_deception_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:persuasion_focus_deception_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_persuasion-focus-deception-action":{"name":"persuasion-focus-deception-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:persuasion-focus-deception-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_persuasion_focus_deception_action":{"name":"persuasion_focus_deception_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:persuasion_focus_deception_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_persuasion_focus_innuendo_known":{"name":"persuasion_focus_innuendo_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:persuasion_focus_innuendo_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_persuasion-focus-innuendo-action":{"name":"persuasion-focus-innuendo-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:persuasion-focus-innuendo-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_persuasion_focus_innuendo_action":{"name":"persuasion_focus_innuendo_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:persuasion_focus_innuendo_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_persuasion_focus_intimidation_known":{"name":"persuasion_focus_intimidation_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:persuasion_focus_intimidation_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_persuasion-focus-intimidation-action":{"name":"persuasion-focus-intimidation-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:persuasion-focus-intimidation-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_persuasion_focus_intimidation_action":{"name":"persuasion_focus_intimidation_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:persuasion_focus_intimidation_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_persuasion_focus_invocation_known":{"name":"persuasion_focus_invocation_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:persuasion_focus_invocation_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_persuasion-focus-invocation-action":{"name":"persuasion-focus-invocation-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:persuasion-focus-invocation-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_persuasion_focus_invocation_action":{"name":"persuasion_focus_invocation_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:persuasion_focus_invocation_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_persuasion_focus_negotiation_known":{"name":"persuasion_focus_negotiation_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:persuasion_focus_negotiation_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_persuasion-focus-negotiation-action":{"name":"persuasion-focus-negotiation-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:persuasion-focus-negotiation-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_persuasion_focus_negotiation_action":{"name":"persuasion_focus_negotiation_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:persuasion_focus_negotiation_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_persuasion_focus_rhetoric_known":{"name":"persuasion_focus_rhetoric_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:persuasion_focus_rhetoric_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_persuasion-focus-rhetoric-action":{"name":"persuasion-focus-rhetoric-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:persuasion-focus-rhetoric-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_persuasion_focus_rhetoric_action":{"name":"persuasion_focus_rhetoric_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:persuasion_focus_rhetoric_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_resilience-skill-action":{"name":"resilience-skill-action","type":"action","triggeredFuncs":["initiateSkillRoll"],"affects":[],"addFuncs":[],"listener":"clicked:resilience-skill-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_resilience_skill_action":{"name":"resilience_skill_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:resilience_skill_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_resilience_ranks":{"name":"resilience_ranks","type":"number","triggeredFuncs":["ccUpdateTalentFilter"],"affects":["stress_max_base","stress_max","stress_max_marker","fatigue_max_marker"],"addFuncs":[],"listener":"change:resilience_ranks","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_resilience_focus_discipline_known":{"name":"resilience_focus_discipline_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:resilience_focus_discipline_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_resilience-focus-discipline-action":{"name":"resilience-focus-discipline-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:resilience-focus-discipline-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_resilience_focus_discipline_action":{"name":"resilience_focus_discipline_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:resilience_focus_discipline_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_resilience_focus_fortitude_known":{"name":"resilience_focus_fortitude_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:resilience_focus_fortitude_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_resilience-focus-fortitude-action":{"name":"resilience-focus-fortitude-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:resilience-focus-fortitude-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_resilience_focus_fortitude_action":{"name":"resilience_focus_fortitude_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:resilience_focus_fortitude_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_resilience_focus_immunity_known":{"name":"resilience_focus_immunity_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:resilience_focus_immunity_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_resilience-focus-immunity-action":{"name":"resilience-focus-immunity-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:resilience-focus-immunity-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_resilience_focus_immunity_action":{"name":"resilience_focus_immunity_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:resilience_focus_immunity_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_stealth-skill-action":{"name":"stealth-skill-action","type":"action","triggeredFuncs":["initiateSkillRoll"],"affects":[],"addFuncs":[],"listener":"clicked:stealth-skill-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_stealth_skill_action":{"name":"stealth_skill_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:stealth_skill_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_stealth_ranks":{"name":"stealth_ranks","type":"number","triggeredFuncs":["ccUpdateTalentFilter"],"affects":[],"addFuncs":[],"listener":"change:stealth_ranks","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_stealth_focus_concealment_known":{"name":"stealth_focus_concealment_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:stealth_focus_concealment_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_stealth-focus-concealment-action":{"name":"stealth-focus-concealment-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:stealth-focus-concealment-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_stealth_focus_concealment_action":{"name":"stealth_focus_concealment_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:stealth_focus_concealment_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_stealth_focus_disguise_known":{"name":"stealth_focus_disguise_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:stealth_focus_disguise_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_stealth-focus-disguise-action":{"name":"stealth-focus-disguise-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:stealth-focus-disguise-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_stealth_focus_disguise_action":{"name":"stealth_focus_disguise_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:stealth_focus_disguise_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_stealth_focus_escape_artistry_known":{"name":"stealth_focus_escape_artistry_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:stealth_focus_escape_artistry_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_stealth-focus-escape-artistry-action":{"name":"stealth-focus-escape-artistry-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:stealth-focus-escape-artistry-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_stealth_focus_escape_artistry_action":{"name":"stealth_focus_escape_artistry_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:stealth_focus_escape_artistry_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_stealth_focus_lock_picking_known":{"name":"stealth_focus_lock_picking_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:stealth_focus_lock_picking_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_stealth-focus-lock-picking-action":{"name":"stealth-focus-lock-picking-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:stealth-focus-lock-picking-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_stealth_focus_lock_picking_action":{"name":"stealth_focus_lock_picking_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:stealth_focus_lock_picking_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_stealth_focus_sleight_of_hand_known":{"name":"stealth_focus_sleight_of_hand_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:stealth_focus_sleight_of_hand_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_stealth-focus-sleight-of-hand-action":{"name":"stealth-focus-sleight-of-hand-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:stealth-focus-sleight-of-hand-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_stealth_focus_sleight_of_hand_action":{"name":"stealth_focus_sleight_of_hand_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:stealth_focus_sleight_of_hand_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_stealth_focus_sneak_known":{"name":"stealth_focus_sneak_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:stealth_focus_sneak_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_stealth-focus-sneak-action":{"name":"stealth-focus-sneak-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:stealth-focus-sneak-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_stealth_focus_sneak_action":{"name":"stealth_focus_sneak_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:stealth_focus_sneak_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_survival-skill-action":{"name":"survival-skill-action","type":"action","triggeredFuncs":["initiateSkillRoll"],"affects":[],"addFuncs":[],"listener":"clicked:survival-skill-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_survival_skill_action":{"name":"survival_skill_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:survival_skill_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_survival_ranks":{"name":"survival_ranks","type":"number","triggeredFuncs":["ccUpdateTalentFilter"],"affects":[],"addFuncs":[],"listener":"change:survival_ranks","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_survival_focus_animal_handling_known":{"name":"survival_focus_animal_handling_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:survival_focus_animal_handling_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_survival-focus-animal-handling-action":{"name":"survival-focus-animal-handling-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:survival-focus-animal-handling-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_survival_focus_animal_handling_action":{"name":"survival_focus_animal_handling_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:survival_focus_animal_handling_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_survival_focus_boating_known":{"name":"survival_focus_boating_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:survival_focus_boating_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_survival-focus-boating-action":{"name":"survival-focus-boating-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:survival-focus-boating-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_survival_focus_boating_action":{"name":"survival_focus_boating_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:survival_focus_boating_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_survival_focus_foraging_known":{"name":"survival_focus_foraging_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:survival_focus_foraging_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_survival-focus-foraging-action":{"name":"survival-focus-foraging-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:survival-focus-foraging-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_survival_focus_foraging_action":{"name":"survival_focus_foraging_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:survival_focus_foraging_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_survival_focus_hunting_known":{"name":"survival_focus_hunting_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:survival_focus_hunting_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_survival-focus-hunting-action":{"name":"survival-focus-hunting-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:survival-focus-hunting-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_survival_focus_hunting_action":{"name":"survival_focus_hunting_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:survival_focus_hunting_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_survival_focus_mysticism_known":{"name":"survival_focus_mysticism_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:survival_focus_mysticism_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_survival-focus-mysticism-action":{"name":"survival-focus-mysticism-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:survival-focus-mysticism-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_survival_focus_mysticism_action":{"name":"survival_focus_mysticism_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:survival_focus_mysticism_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_survival_focus_navigation_known":{"name":"survival_focus_navigation_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:survival_focus_navigation_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_survival-focus-navigation-action":{"name":"survival-focus-navigation-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:survival-focus-navigation-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_survival_focus_navigation_action":{"name":"survival_focus_navigation_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:survival_focus_navigation_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_survival_focus_tracking_known":{"name":"survival_focus_tracking_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:survival_focus_tracking_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_survival-focus-tracking-action":{"name":"survival-focus-tracking-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:survival-focus-tracking-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_survival_focus_tracking_action":{"name":"survival_focus_tracking_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:survival_focus_tracking_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_survival_focus_woodcraft_known":{"name":"survival_focus_woodcraft_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:survival_focus_woodcraft_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_survival-focus-woodcraft-action":{"name":"survival-focus-woodcraft-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:survival-focus-woodcraft-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_survival_focus_woodcraft_action":{"name":"survival_focus_woodcraft_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:survival_focus_woodcraft_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_tactics-skill-action":{"name":"tactics-skill-action","type":"action","triggeredFuncs":["initiateSkillRoll"],"affects":[],"addFuncs":[],"listener":"clicked:tactics-skill-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_tactics_skill_action":{"name":"tactics_skill_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:tactics_skill_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_tactics_ranks":{"name":"tactics_ranks","type":"number","triggeredFuncs":["ccUpdateTalentFilter"],"affects":[],"addFuncs":[],"listener":"change:tactics_ranks","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_tactics_focus_cavalry_known":{"name":"tactics_focus_cavalry_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:tactics_focus_cavalry_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_tactics-focus-cavalry-action":{"name":"tactics-focus-cavalry-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:tactics-focus-cavalry-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_tactics_focus_cavalry_action":{"name":"tactics_focus_cavalry_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:tactics_focus_cavalry_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_tactics_focus_infantry_known":{"name":"tactics_focus_infantry_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:tactics_focus_infantry_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_tactics-focus-infantry-action":{"name":"tactics-focus-infantry-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:tactics-focus-infantry-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_tactics_focus_infantry_action":{"name":"tactics_focus_infantry_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:tactics_focus_infantry_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_tactics_focus_leadership_known":{"name":"tactics_focus_leadership_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:tactics_focus_leadership_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_tactics-focus-leadership-action":{"name":"tactics-focus-leadership-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:tactics-focus-leadership-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_tactics_focus_leadership_action":{"name":"tactics_focus_leadership_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:tactics_focus_leadership_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_tactics_focus_navy_known":{"name":"tactics_focus_navy_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:tactics_focus_navy_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_tactics-focus-navy-action":{"name":"tactics-focus-navy-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:tactics-focus-navy-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_tactics_focus_navy_action":{"name":"tactics_focus_navy_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:tactics_focus_navy_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_tactics_focus_omen_reading_known":{"name":"tactics_focus_omen_reading_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:tactics_focus_omen_reading_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_tactics-focus-omen-reading-action":{"name":"tactics-focus-omen-reading-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:tactics-focus-omen-reading-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_tactics_focus_omen_reading_action":{"name":"tactics_focus_omen_reading_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:tactics_focus_omen_reading_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_tactics_focus_scouting_known":{"name":"tactics_focus_scouting_known","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:tactics_focus_scouting_known","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_tactics-focus-scouting-action":{"name":"tactics-focus-scouting-action","type":"action","triggeredFuncs":["initiateFocusRoll"],"affects":[],"addFuncs":[],"listener":"clicked:tactics-focus-scouting-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_tactics_focus_scouting_action":{"name":"tactics_focus_scouting_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:tactics_focus_scouting_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_repeating_weapon_$x_weapon-action":{"name":"repeating_weapon_$x_weapon-action","type":"action","triggeredFuncs":["initiateWeaponRoll"],"affects":[],"addFuncs":[],"listener":"clicked:repeating_weapon:weapon-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_repeating_weapon_$x_weapon_action":{"name":"repeating_weapon_$x_weapon_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:repeating_weapon:weapon_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_repeating_weapon_$x_weapon-apply":{"name":"repeating_weapon_$x_weapon-apply","type":"action","triggeredFuncs":["ccApplyWeaponPreset","ccRefreshActionCalls"],"affects":[],"addFuncs":[],"listener":"clicked:repeating_weapon:weapon-apply","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_repeating_weapon_$x_name":{"name":"repeating_weapon_$x_name","type":"text","triggeredFuncs":["ccApplyWeaponPreset","ccRefreshActionCalls"],"affects":[],"addFuncs":[],"listener":"change:repeating_weapon:name","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_repeating_weapon_$x_attack_type":{"name":"repeating_weapon_$x_attack_type","type":"select","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:repeating_weapon:attack_type","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_repeating_weapon_$x_focus":{"name":"repeating_weapon_$x_focus","type":"text","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:repeating_weapon:focus","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_repeating_weapon_$x_reach_range":{"name":"repeating_weapon_$x_reach_range","type":"text","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:repeating_weapon:reach_range","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_repeating_weapon_$x_damage_effects":{"name":"repeating_weapon_$x_damage_effects","type":"text","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:repeating_weapon:damage_effects","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_repeating_weapon_$x_size":{"name":"repeating_weapon_$x_size","type":"text","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:repeating_weapon:size","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_repeating_weapon_$x_qualities":{"name":"repeating_weapon_$x_qualities","type":"text","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:repeating_weapon:qualities","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"fieldset_repeating_armor":{"name":"repeating_armor","type":"fieldset","triggeredFuncs":[],"affects":["total_armor"],"addFuncs":[],"listener":"remove:repeating_armor","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_repeating_armor_$x_armor-apply":{"name":"repeating_armor_$x_armor-apply","type":"action","triggeredFuncs":["ccApplyArmorPreset"],"affects":[],"addFuncs":[],"listener":"clicked:repeating_armor:armor-apply","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_repeating_armor_$x_name":{"name":"repeating_armor_$x_name","type":"text","triggeredFuncs":["ccApplyArmorPreset"],"affects":[],"addFuncs":[],"listener":"change:repeating_armor:name","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_repeating_armor_$x_resistance":{"name":"repeating_armor_$x_resistance","type":"number","triggeredFuncs":[],"affects":["total_armor"],"addFuncs":[],"listener":"change:repeating_armor:resistance","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_repeating_armor_$x_qualities":{"name":"repeating_armor_$x_qualities","type":"text","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:repeating_armor:qualities","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_talent_filter_0":{"name":"talent_filter_0","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_0","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_1":{"name":"talent_filter_1","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_1","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_2":{"name":"talent_filter_2","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_2","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_3":{"name":"talent_filter_3","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_3","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_4":{"name":"talent_filter_4","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_4","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_5":{"name":"talent_filter_5","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_5","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_6":{"name":"talent_filter_6","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_6","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_7":{"name":"talent_filter_7","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_7","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_8":{"name":"talent_filter_8","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_8","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_9":{"name":"talent_filter_9","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_9","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_10":{"name":"talent_filter_10","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_10","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_11":{"name":"talent_filter_11","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_11","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_12":{"name":"talent_filter_12","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_12","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_13":{"name":"talent_filter_13","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_13","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_14":{"name":"talent_filter_14","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_14","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_15":{"name":"talent_filter_15","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_15","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_16":{"name":"talent_filter_16","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_16","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_17":{"name":"talent_filter_17","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_17","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_18":{"name":"talent_filter_18","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_18","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_19":{"name":"talent_filter_19","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_19","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_20":{"name":"talent_filter_20","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_20","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_21":{"name":"talent_filter_21","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_21","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_22":{"name":"talent_filter_22","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_22","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_23":{"name":"talent_filter_23","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_23","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_24":{"name":"talent_filter_24","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_24","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_25":{"name":"talent_filter_25","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_25","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_26":{"name":"talent_filter_26","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_26","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_27":{"name":"talent_filter_27","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_27","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_28":{"name":"talent_filter_28","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_28","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_29":{"name":"talent_filter_29","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_29","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_30":{"name":"talent_filter_30","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_30","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_31":{"name":"talent_filter_31","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_31","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_32":{"name":"talent_filter_32","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_32","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_33":{"name":"talent_filter_33","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_33","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_34":{"name":"talent_filter_34","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_34","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_35":{"name":"talent_filter_35","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_35","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_36":{"name":"talent_filter_36","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_36","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_37":{"name":"talent_filter_37","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_37","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_38":{"name":"talent_filter_38","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_38","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_39":{"name":"talent_filter_39","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_39","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_40":{"name":"talent_filter_40","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_40","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_41":{"name":"talent_filter_41","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_41","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_42":{"name":"talent_filter_42","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_42","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_43":{"name":"talent_filter_43","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_43","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_44":{"name":"talent_filter_44","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_44","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_45":{"name":"talent_filter_45","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_45","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_46":{"name":"talent_filter_46","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_46","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_47":{"name":"talent_filter_47","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_47","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_48":{"name":"talent_filter_48","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_48","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_49":{"name":"talent_filter_49","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_49","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_50":{"name":"talent_filter_50","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_50","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_51":{"name":"talent_filter_51","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_51","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_52":{"name":"talent_filter_52","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_52","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_53":{"name":"talent_filter_53","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_53","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_54":{"name":"talent_filter_54","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_54","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_55":{"name":"talent_filter_55","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_55","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_56":{"name":"talent_filter_56","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_56","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_57":{"name":"talent_filter_57","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_57","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_58":{"name":"talent_filter_58","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_58","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_59":{"name":"talent_filter_59","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_59","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_60":{"name":"talent_filter_60","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_60","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_61":{"name":"talent_filter_61","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_61","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_62":{"name":"talent_filter_62","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_62","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_63":{"name":"talent_filter_63","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_63","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_64":{"name":"talent_filter_64","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_64","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_65":{"name":"talent_filter_65","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_65","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_66":{"name":"talent_filter_66","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_66","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_67":{"name":"talent_filter_67","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_67","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_68":{"name":"talent_filter_68","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_68","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_talent_filter_69":{"name":"talent_filter_69","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:talent_filter_69","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"fieldset_repeating_talent":{"name":"repeating_talent","type":"fieldset","triggeredFuncs":["ccUpdateTalentFilter"],"affects":["stress_max_base","stress_max","stress_max_marker","fatigue_max_marker"],"addFuncs":[],"listener":"remove:repeating_talent","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_repeating_talent_$x_talent-apply":{"name":"repeating_talent_$x_talent-apply","type":"action","triggeredFuncs":["ccApplyTalentPreset"],"affects":[],"addFuncs":[],"listener":"clicked:repeating_talent:talent-apply","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_repeating_talent_$x_name":{"name":"repeating_talent_$x_name","type":"text","triggeredFuncs":["ccApplyTalentPreset","ccUpdateTalentFilter"],"affects":["stress_max_base","stress_max","stress_max_marker","fatigue_max_marker"],"addFuncs":[],"listener":"change:repeating_talent:name","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_repeating_talent_$x_keywords":{"name":"repeating_talent_$x_keywords","type":"text","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:repeating_talent:keywords","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_repeating_talent_$x_requirements":{"name":"repeating_talent_$x_requirements","type":"text","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:repeating_talent:requirements","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_repeating_talent_$x_description":{"name":"repeating_talent_$x_description","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:repeating_talent:description","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_repeating_specialrule_$x_special-rule-post":{"name":"repeating_specialrule_$x_special-rule-post","type":"action","triggeredFuncs":["ccPostSpecialRule"],"affects":[],"addFuncs":[],"listener":"clicked:repeating_specialrule:special-rule-post","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"act_repeating_specialrule_$x_special-rule-apply":{"name":"repeating_specialrule_$x_special-rule-apply","type":"action","triggeredFuncs":["ccApplySpecialRulePreset"],"affects":[],"addFuncs":[],"listener":"clicked:repeating_specialrule:special-rule-apply","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_repeating_specialrule_$x_name":{"name":"repeating_specialrule_$x_name","type":"text","triggeredFuncs":["ccApplySpecialRulePreset"],"affects":[],"addFuncs":[],"listener":"change:repeating_specialrule:name","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_repeating_specialrule_$x_x":{"name":"repeating_specialrule_$x_x","type":"number","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:repeating_specialrule:x","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_repeating_specialrule_$x_description":{"name":"repeating_specialrule_$x_description","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:repeating_specialrule:description","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_languages":{"name":"languages","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:languages","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_xp_earned":{"name":"xp_earned","type":"number","triggeredFuncs":[],"affects":["xp_available"],"addFuncs":[],"listener":"change:xp_earned","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_xp_spent":{"name":"xp_spent","type":"number","triggeredFuncs":[],"affects":["xp_available"],"addFuncs":[],"listener":"change:xp_spent","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"attr_xp_available":{"name":"xp_available","type":"number","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:xp_available","listenerFunc":"accessSheet","defaultValue":0,"calculation":"calcXpAvailable","initialFunc":"","formula":""},"attr_spells_type_marker":{"name":"spells_type_marker","type":"radio","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:spells_type_marker","listenerFunc":"accessSheet","defaultValue":"pc","calculation":"calcSpellsTypeMarker","initialFunc":"","formula":""},"attr_spellcasting_type":{"name":"spellcasting_type","type":"select","triggeredFuncs":[],"affects":["spellcasting_attribute","base_power","power_rating"],"addFuncs":[],"listener":"change:spellcasting_type","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_magical_tradition":{"name":"magical_tradition","type":"select","triggeredFuncs":[],"affects":["tradition_marker"],"addFuncs":[],"listener":"change:magical_tradition","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_spellcasting_attribute":{"name":"spellcasting_attribute","type":"text","triggeredFuncs":[],"affects":["power_rating"],"addFuncs":[],"listener":"change:spellcasting_attribute","listenerFunc":"accessSheet","defaultValue":"","calculation":"calcSpellcastingAttribute","initialFunc":"","formula":""},"attr_power_rating":{"name":"power_rating","type":"number","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:power_rating","listenerFunc":"accessSheet","defaultValue":0,"calculation":"calcPowerRating","initialFunc":"","formula":""},"attr_base_power":{"name":"base_power","type":"number","triggeredFuncs":[],"affects":["power_rating"],"addFuncs":[],"listener":"change:base_power","listenerFunc":"accessSheet","defaultValue":0,"calculation":"calcBasePower","initialFunc":"","formula":""},"attr_tradition_marker":{"name":"tradition_marker","type":"radio","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:tradition_marker","listenerFunc":"accessSheet","defaultValue":"runic","calculation":"calcTraditionMarker","initialFunc":"","formula":""},"attr_repeating_spell_$x_spell_attack":{"name":"repeating_spell_$x_spell_attack","type":"checkbox","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:repeating_spell:spell_attack","listenerFunc":"accessSheet","defaultValue":0,"calculation":"","initialFunc":"","formula":""},"act_repeating_spell_$x_spell-cast-action":{"name":"repeating_spell_$x_spell-cast-action","type":"action","triggeredFuncs":["initiateSpellRoll"],"affects":[],"addFuncs":[],"listener":"clicked:repeating_spell:spell-cast-action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_repeating_spell_$x_spell_cast_action":{"name":"repeating_spell_$x_spell_cast_action","type":"hidden","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:repeating_spell:spell_cast_action","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_repeating_spell_$x_name":{"name":"repeating_spell_$x_name","type":"select","triggeredFuncs":["ccApplySpellPreset","ccRefreshActionCalls"],"affects":[],"addFuncs":[],"listener":"change:repeating_spell:name","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_repeating_spell_$x_skill":{"name":"repeating_spell_$x_skill","type":"text","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:repeating_spell:skill","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_repeating_spell_$x_difficulty":{"name":"repeating_spell_$x_difficulty","type":"text","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:repeating_spell:difficulty","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_repeating_spell_$x_cost":{"name":"repeating_spell_$x_cost","type":"text","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:repeating_spell:cost","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_repeating_spell_$x_duration":{"name":"repeating_spell_$x_duration","type":"text","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:repeating_spell:duration","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_repeating_spell_$x_category":{"name":"repeating_spell_$x_category","type":"text","triggeredFuncs":["ccUpdateSpellAttack"],"affects":[],"addFuncs":[],"listener":"change:repeating_spell:category","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_repeating_spell_$x_damage_effects":{"name":"repeating_spell_$x_damage_effects","type":"text","triggeredFuncs":["ccUpdateSpellAttack"],"affects":[],"addFuncs":[],"listener":"change:repeating_spell:damage_effects","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_repeating_spell_$x_effect_open":{"name":"repeating_spell_$x_effect_open","type":"radio","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:repeating_spell:effect_open","listenerFunc":"accessSheet","defaultValue":"open","calculation":"","initialFunc":"","formula":""},"act_repeating_spell_$x_effect-toggle":{"name":"repeating_spell_$x_effect-toggle","type":"action","triggeredFuncs":["ccToggleSpellInfo"],"affects":[],"addFuncs":[],"listener":"clicked:repeating_spell:effect-toggle","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_repeating_spell_$x_effect":{"name":"repeating_spell_$x_effect","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:repeating_spell:effect","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_repeating_spell_$x_momentum":{"name":"repeating_spell_$x_momentum","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:repeating_spell:momentum","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_traits":{"name":"traits","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:traits","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_history":{"name":"history","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:history","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_personal_agenda":{"name":"personal_agenda","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:personal_agenda","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_belongings":{"name":"belongings","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:belongings","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""},"attr_journal_notes":{"name":"journal_notes","triggeredFuncs":[],"affects":[],"addFuncs":[],"listener":"change:journal_notes","listenerFunc":"accessSheet","defaultValue":"","calculation":"","initialFunc":"","formula":""}};
  
  kFuncs.cascades = cascades;
  
  const repeatingSectionDetails = [{"section":"repeating_weapon","fields":["weapon_action","name","attack_type","focus","reach_range","damage_effects","size","qualities"]},{"section":"repeating_armor","fields":["name","resistance","qualities"]},{"section":"repeating_talent","fields":["name","keywords","requirements","description"]},{"section":"repeating_specialrule","fields":["name","x","description"]},{"section":"repeating_spell","fields":["spell_attack","spell_cast_action","name","skill","difficulty","cost","duration","category","damage_effects","effect_open","effect","momentum"]}];
  
  kFuncs.repeatingSectionDetails = repeatingSectionDetails;
  
  const persistentTabs = ["cohors_cthulhu_tab"];
  
  kFuncs.persistentTabs = persistentTabs;
  /**
 * The K-scaffold provides several variables to allow your scripts to tap into its information flow.
 * @namespace Sheetworkers.Variables
 */
/**
 * This stores the name of your sheet for use in the logging functions {@link log} and {@link debug}. Accessible by `k.sheetName`
 * @memberof Variables
 * @var
 * @type {string}
 */
let sheetName = 'kScaffold Powered Sheet';
kFuncs.sheetName = sheetName;
/**
	* This stores the version of your sheet for use in the logging functions{@link log} and {@link debug}. It is also stored in the sheet_version attribute on your character sheet. Accessible via `k.version`
 * @memberof Variables
	* @var
	* @type {number}
	*/
let version = 0;
kFuncs.version = version;
/**
	* A boolean flag that tells the script whether to enable or disable {@link debug} calls. If the version of the sheet is `0`, or an attribute named `debug_mode` is found on opening this is set to true for your entire session. Otherwise, it remains false.
 * @memberof Variables
	* @var
	* @type {boolean}
	*/
let debugMode = false;
kFuncs.debugMode = debugMode;
/**
	* A boolean flag that tells the script whether to output verbose logs of what is being done or not when {@link debugMode} is enabled.
 * @memberof Variables
	* @var
	* @type {boolean}
	*/
let verboseMode = false;
kFuncs.verboseMode = verboseMode;
const funcs = {};
kFuncs.funcs = funcs;
const updateHandlers = {};
const openHandlers = {};
const initialSetups = {};
const allHandlers = {};
const addFuncs = {};

const kscaffoldJSVersion = '2.7.2';
const kscaffoldPUGVersion = '2.7.0';
/**
 * Defines the rollstring that rolls made using k.startRoll begin with. Defaults to "&{template:default}".
 * @memberof Variables
 * @var
 * @type {string}
 */
let defaultRollStart = '&{template:default}';
kFuncs.defaultRollStart = defaultRollStart;/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
/**
 * These are utility functions that are not directly related to Roll20 systems. They provide easy methods for everything from processing text and numbers to querying the user for input.
 * @namespace Sheetworkers.Utilities
 * @alias Utilities
 */
/**
 * Replaces problem characters to use a string as a regex
 * @memberof Utilities
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
 * @memberof Utilities
 * @param {string|number} val - Value to convert to a number
 * @param {number} def - The default value, uses 0 if not passed
 * @returns {number|undefined}
 * @example
 * const num = k.value('100');
 * console.log(num);// => 100
 */
const value = function(val,def){
  const convertVal = +val;
  if(def !== undefined && isNaN(def)){
    throw(`K-scaffold Error: invalid default for value(). Default: ${def}`);
  }
  return convertVal === 0 ?
    convertVal :
    (+val||def||0);
};
kFuncs.value = value;

/**
 * Extracts the section (e.g. `repeating_equipment`), rowID (e.g `-;lkj098J:LKj`), and field name (e.g. `bulk`) from a repeating attribute name.
 * @memberof Utilities
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
 * @memberof Utilities
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
 * @memberof Utilities
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
 * @memberof Utilities
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
 * @memberof Utilities
 * @param {string} query - The query should be just the text as the `?{` and `}` at the start/end of the query are added by the function.
 * @returns {Promise} - Resolves to the selected value from the roll query
 * @example
 * const rollFunction = async function(){
 *  //Get the result of a choose from list query
 *  const queryResult = await extractQueryResult('Prompt Text Here|Option 1|Option 2');
 *  console.log(queryResult);//=> "Option 1" or "Option 2" depending on what the user selects
 * 
 *  //Get free form input from the user
 *  const freeResult = await extractQueryResult('Prompt Text Here');
 *  consoel.log(freeResult);// => Whatever the user entered
 * }
 */
const extractQueryResult = async function(query){
  const rollObj = {
    query:`[[0[response=?{${query}}]]]`
  };
	let {roll} = await _startRoll(rollObj,'!');
  roll.finish();
	return roll.results.query.expression.replace(/^.+?response=|\]$/g,'');
};
kFuncs.extractQueryResult = extractQueryResult;

/**
 * Simulates a query for ensuring that async/await works correctly in the sheetworker environment when doing conditional startRolls. E.g. if you have an if/else and only one of the conditions results in `startRoll` being called (and thus an `await`), the sheetworker environment would normally crash. Awaiting this in the condition that does not actually need to call `startRoll` will keep the environment in sync.
 * @memberof Utilities
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
  const rollObj = {
    query:`[[0[response=${value}]]]`
  };
	let {roll} = await _startRoll(rollObj,'!');
  roll.finish();
	return roll.results.query.expression.replace(/^.+?response=|\]$/g,'');
};
kFuncs.pseudoQuery = pseudoQuery;

/**
 * An alias for console.log.
 * @memberof Utilities
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
 * @memberof Utilities
 * @param {any} msg - 'See {@link k.log}
 * @param {boolean} force - Pass as a truthy value to force the debug output to be output to the console regardless of debug mode.
 * @returns {void}
 */
const debug = function(msg,force){
  if(!kFuncs.debugMode && !force && kFuncs.version > 0) return;
  if(typeof msg === 'string'){
    console.warn(`%c${kFuncs.sheetName} DEBUG| ${msg}`,"background-color:tan;color:red;");
  }else if(typeof msg === 'object'){
    Object.keys(msg).forEach((m)=>{
      if(typeof msg[m] === 'string'){
        console.warn(`%c${kFuncs.sheetName} DEBUG| ${m}: ${msg[m]}`,"background-color:tan;color:red;");
      }else{
        console.warn(`%c${kFuncs.sheetName} DEBUG| ${typeof msg[m]} ${m}`,"background-color:tan;color:red;font-weight:bold;");
        console.table(msg[m]);
      }
    });
  }
};
kFuncs.debug = debug;

/**
 * Orders the section id arrays for all sections in the `sections` object to match the repOrder attribute.
 * @memberof Utilities
 * @param {attributesProxy} attributes - The attributes object that must have a value for the reporder for each section.
 * @param {object[]} sections - Object containing the IDs for the repeating sections, indexed by repeating section name.
 */
const orderSections = function(attributes,sections,casc){
  Object.keys(sections).forEach((section)=>{
    attributes.attributes[`_reporder_${section}`] = commaArray(attributes[`_reporder_${section}`]);
    sections[section] = orderSection(attributes.attributes[`_reporder_${section}`],sections[section],attributes,section,casc);
  });
};
kFuncs.orderSections = orderSections;

/**
 * Orders a single ID array.
 * @memberof Utilities
 * @param {string[]} repOrder - Array of IDs in the order they are in on the sheet.
 * @param {string[]} IDs - Array of IDs to be ordered. Aka the default ID Array passed to the getSectionIDs callback
 * @param {AttributesProxy} [attributes] - The Kscaffold attributes object
 * @param {string} [section] - the name of the section being ordered. If section and attributes are passed, will return an ordered array that does not include IDs for rows that do not exist.
 * @param {object} [casc] - the object describing the default state of the sheet.
 * @returns {string[]} - The ordered id array
 */
const orderSection = function(repOrder,IDs=[], attributes, section,casc){
  const idArr = [...repOrder.filter(v => v),...IDs.filter(id => !repOrder.includes(id.toLowerCase()))]
    .filter(id => {
      const testAttr = Object.keys(casc).find(a => a.toLowerCase().startsWith(`attr_${section}_${id}`));
      const testName = testAttr?.replace(/attr_/,'');
      const idName = testName?.replace(/\$x/,id);
      return (!section && !casc) ||
        (
          idName && 
          (
            attributes.attributes.hasOwnProperty(idName) ||
            attributes.updates.hasOwnProperty(idName)
          )
        );
    });
  return idArr;
};
kFuncs.orderSection = orderSection;

/**
 * Splits a comma delimited string into an array
 * @memberof Utilities
 * @param {string} string - The string to split.
 * @returns {array} - The string segments of the comma delimited list.
 */
const commaArray = function(string=''){
  return string.toLowerCase().split(/\s*,\s*/);
};
kFuncs.commaArray = commaArray;

// Roll escape functions for passing data in action button calls. Base64 encodes/decodes the data.
const RE = {
  chars: {
      '"': '%quot;',
      ',': '%comma;',
      ':': '%colon;',
      '}': '%rcub;',
      '{': '%lcub;',
  },
  escape(data) {
    return typeof data === 'object' ?
      `KDATA${btoa(JSON.stringify(data))}` :
      `KSTRING${btoa(data)}`;
  },
  unescape(string) {
    const isData = typeof string === 'string' &&
      (
        string.startsWith('KDATA') ||
        string.startsWith('KSTRING')
      );
    return isData ?
      (
        string.startsWith('KDATA') ?
          JSON.parse(atob(string.replace(/^KDATA/,''))) :
          atob(string.replace(/^KSTRING/,''))
      ) :
      string;
  }
};


/**
 * Encodes data in Base64. This is useful for passing roll information to action buttons called from roll buttons.
 * @function
 * @param {string|object|any[]} data - The data that you want to Base64 encode
 * @returns {string} - The encoded data
 * @memberof! Utilities
 */
const escape = RE.escape;
/**
 * Decodes Base64 encoded strings that were created by the K-scaffold
 * @function
 * @param {string|object|any[]} string - The string of encoded data to decode. If this is not a string, or is not a string that was encoded by the K-scaffold, it will be returned as is.
 * @returns {string|object|any[]}
 * @memberof! Utilities
 */
const unescape = RE.unescape;

Object.assign(kFuncs,{escape,unescape});

/**
 * Parses a macro so that it is reduced to the final values of all attributes contained in the macro. Will drill down up to 99 levels deep. If the string was not parseable, string will be returned with as much parsed as possible.
 * @memberof Utilities
 * @param {string} mutStr - The string macro to parse
 * @param {AttributesProxy} attributes - The K-scaffold Attributes Proxy
 * @param {Object} sections - The K-scaffold sections object
 * @returns {string} - The string with all attributes replaced by their values (if possible).
 */
const parseMacro = (str,attributes,sections) => {
  let iter = 0;
  let mutStr = str;
  while(mutStr.match(/@{.+?}/) && iter < 99){
    mutStr = mutStr.replace(/@{(.+?)}/g,(match,name) => {
      name = name.replace(/\|/,'_');
      return attributes[name] !== null && attributes[name] !== undefined ?
        attributes[name] :
        `@(${name})`;
    })
    iter++;
  }
  mutStr = mutStr.replace(/@\((.+?)\)/g,'@{$1}');
  return mutStr;
}
kFuncs.parseMacro = parseMacro;

/**
 * Sends data to another character sheet to cause a change on that sheet. WARNING, this function should not be used in response to an attribute change to avoid spamming the chat with api messages.
 * 
 * ![k.send.gif](/k-scaffold/k.send.gif)
 * @memberof Utilities
 * @param {string} characterName - The character to connect to
 * @param {string} funcName - Name of the function to call similar to function name used in {@link callFunc}.
 * @param  {...any} args - The arguments to pass to the function call no the other sheet. These are passed after the normal destructure object for a K-scaffold function call.
 * @example
 * //Function that is called by the source sheet
 * const dispatchPartner = async function({trigger,attributes,sections,casc}){
 *  const partnerName = await (
 *    attributes.partner_name ?
 *      k.pseudoQuery(attributes.partner_name) :
 *      k.extractQueryResult('Partner name')
 *  );
 *  attributes.partner_name = partnerName;
 *  //passing the attributes of the source sheet
 *  k.send(partnerName,'receivePartner',attributes);
 *  attributes.set();
 * };
 * k.registerFuncs({dispatchPartner});
 * 
 * //Function called on target sheet. Partner is the attributes from the source sheet
 * const receivePartner  = function({trigger,attributes,sections,casc},partner){
 *   attributes.from_partner = partner.for_partner;
 *   attributes.partner_name = partner.character_name;
 * };
 * k.registerFuncs({receivePartner });
 */
const send = async function(characterName,funcName,...args){
  const data = RE.escape({
    funcName,
    args
  });
  const roll = await startRoll(`!@{${characterName}|character_name}%{${characterName}|k-network-call||${data}}&{noerror}`);
  finishRoll(roll.rollId);
};
kFuncs.send = send;

const kReceive = function({trigger,attributes,sections,casc}) {
  const data = trigger.rollData;
  callFunc(data.funcName,{attributes,sections,casc},...data.args);
};
funcs.kReceive = kReceive;/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
/**
 * Detailed descriptions of the arguments that are passed to functions registered with the K-scaffold.
 * @namespace Sheetworkers.Function Arguments
 */
/**
 * An object that stores the rowID information for each repeating section on the sheet.
 * @name sections
 * @memberof Function Arguments
 * @var
 * @property {string[]} repeating_section_name - The row IDs of a given repeating section. The repeating section name is used **with** the `repeating_` prefix (e.g. `sections['repeating_weapons']`).
 */
/**
 * Object that stores the default trigger information for all attributes. Indexed by attribute, button name, or fieldset name prefixed with `attr_`, `act_`, or `fieldset_` respectively.
 * @name casc
 * @memberof Function Arguments
 * @var
 */
/**
 * Object describing the attribute that is currently being worked on. In addition to the properties described here, the properties from the Roll20 event will also be present if the attribute was the original event. Additional properties may be present if you specified them when creating the input for the attribute.
 * @name trigger
 * @memberof Function Arguments
 * @var
 * @property {string} name - The full name of the attribute.
 * @property {string[]} triggeredFuncs - Array of function names that will be called when this attribute is worked on.
 * @property {string} calculation - The name of the function that is used to calculate the value of this attribute.
 * @property {string} formula - The macro syntax formula to use to calculate this attributes value.
 * @property {string[]} affects - Array of attribute names that this attribute might affect.
 * @property {string[]} addFuncs - Functions that are called when the add row button is clicked for a customControlFieldset.
 * @property {string} listener - What function was used to listen for changes to this attribute. Unless you have decided to implement your own event handling, this should always be `"accessSheet"`.
 * @property {string} type - What type of thing this trigger is for (e.g. number, action).
 */
//# Attribute Obj Proxy handler
/**
	* A representation of the sheet's attributes. This is a proxy for the actual object and will keep track of original values and updates that have been applied. Calling an attribute directly on the attributes value will return it's current value coerced into a number if it is numeric. Setting a property on the attributes object will add it the list of updates which will be applied the next time the `set()` method is called on attributes.
  * @name attributes
  * @memberof Function Arguments
  * @var
  * @property {object} attributes - The raw original data of the character sheet.
  * @property {object} updates - The raw data that will be saved to the character sheet once all operations have been completed.
  * @property {function} set - Method to apply changes to the character sheet. This is called automatically at the end of the scaffold's event handling. Needs to be called manually if inside an asynchronous function, such as when using the startRoll sheetworker (or any of the scaffold aliases for startRoll). The method uses object destructuring syntax for the arguments it takes.
  * @property {boolean} [set.vocal=false] - Whether the set is done silently or not. Should almost always be left at false. `attributes.set({vocal:true})`
  * @property {function} [set.callback] - Callback function to be invoked once the setAttrs is complete. `attributes.set({callback(){/*do a thing}})`
  * @property {any} attribute_name - Name of any attribute whose data from the character sheet you want to access. Will only return a value if the attribute was defined using the scaffold's pug mixins (e.g. +input). If the value of the attribute is numerical (e.g. `"5"`), it will be returned as a number. You can also apply changes by simply assigning a value to an attribute name (e.g. `attributes.character_name = 'New Character'`).
  * @property {object} repOrders - Object showing the ordered arrays for the _reporder_ attributes for each repeating section. Indexed by repeating section name
  * @property {object[]} repeating_section_name - Name of a repeating section whose data you want to access (e.g. `attributes.repeating_weapons`). The data will be returned as an array with objects describing each row in the order they are on the sheet. Objects are indexed by rowID as well. Mutating array methods are replaced by the `sort` and `move` methods. Non mutating array methods can be used as normal.
  * @property {string} repeating_section_name._section - the name of the repeating section. Used internally by the scaffold. Readonly.
  * @property {function} move - Method for reordering rows.
  * @property {number|string} move.startingPosition - the row id or position index for the row you want to move.
  * @property {number} move.destination - The position in the section where you want the row to be moved to. If the position is greater than the length of the section, the row will be moved to the last position. If the position is negative, it will be moved to the start of the section.
  * @property {boolean} [move.silent=false] - Whether the reordering should trigger setSectionOrder or not.
  * @property {function} sort - Alias for the default Array.sort method. Functions as the default sort method, but has an optional second argument.
  * @property {function} sort.callback - The function to use for determining the sort order. See the [Array.sort documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) for details.
  * @property {boolean} [sort.silent=false] - Whether to apply the sort to the display of the repeating section.
  * @property {function} create - Method for creating a new row in a repeating section. Arguments for this method can be in any order. A row will not actually be created unless data is assigned to at least one attribute of the row, either at creation or later. Returns the object representing the new row.
  * @property {string} [create.custom] - Custom text that replaces the starting characters of the rowID
  * @property {object} [create.data] - what to set the attribute values of the row to. If not provided, the row object will be created, but no row will be created on the sheet until data is specified.
  * @property {object} repeating_section_name.rowID_or_Index - Returns the object describing a row in a repeating section specified by row ID or indexed position. (e.g. `attributes.repeating_weapons[0]` returns the data for the first row in the weapons section)
  * * @property {object} repeating_section_name.rowID_or_Index._id - The id of the row. Readonly.
  * * @property {object} repeating_section_name.rowID_or_Index._section - The repeating section the row belongs to. Readonly.
  * @property {any} repeating_section_name.rowID_or_Index.attribute_name - functions as an attribute_name call on the base attributes object. (e.g. `attributes['repeating_weapons_-jJ2soils_name']` is equivalent to `attributes.repeating_weapons['-jJ2soils'].name`).
  * @type {object}
	*/
  const createAttrProxy = function(attrs,sections,casc){
    //creates a proxy for the attributes object so that values can be worked with more easily.
    const getCascObj = function(event){
      const eventName = event.triggerName || event.sourceAttribute;
      let typePrefix = eventName.startsWith('clicked:') ?
        'act_' :
        event.removedInfo ?
        'fieldset_' :
        'attr_';
      let cascName = `${typePrefix}${eventName.replace(/(?:removed?|clicked):/,'')}`;
      let cascObj = casc[cascName];
      if(kFuncs.verboseMode){
        debug({[cascName]:cascObj});
      }
      if(event && cascObj){
        Object.assign(cascObj,event);
        if(event.originalRollId){
          cascObj.rollData = RE.unescape(event.originalRollId);
        }
      }
      return cascObj || {};
    };
    
    const triggerFunctions = function(obj){
      if(obj.triggeredFuncs && obj.triggeredFuncs.length){
        if(kFuncs.verboseMode){
          debug(`triggering functions for ${obj.name}`);
        }
        obj.triggeredFuncs && obj.triggeredFuncs.forEach(func=>funcs[func] ? 
          funcs[func]({trigger:obj,attributes,sections,casc}) :
          debug(`!!!Warning!!! no function named ${func} found. Triggered function not called for ${obj.name}`,true));
      }
    };
    
    const initialFunction = function(obj){
      if(obj.initialFunc){
        if(kFuncs.verboseMode){
          debug(`initial functions for ${obj.name}`);
        }
        funcs[obj.initialFunc] ?
          funcs[obj.initialFunc]({trigger:obj,attributes,sections}) :
          debug(`!!!Warning!!! no function named ${obj.initialFunc} found. Initial function not called for ${obj.name}`,true);
      }
    };
    const alwaysFunctions = function(trigger){
      Object.values(allHandlers).forEach((handler)=>{
        handler({trigger,attributes,sections,casc});
      });
    };
    const processChange = function({event,trigger}){
      if(event && !trigger){
        debug(`${event.sourceAttribute} change detected. No trigger found`);
        return;
      }
      if(!attributes || !sections || !casc){
        debug(`!!! Insufficient arguments || attributes > ${!!attributes} | sections > ${!!sections} | casc > ${!!casc} !!!`);
        return;
      }
      if(kFuncs.verboseMode){
        debug({trigger});
      }
      if(event){
        if(Array.isArray(trigger.affects)){
          attributes.queue.push(...trigger.affects);
        }
        alwaysFunctions(trigger,attributes,sections,casc);//Functions that should be run for all events.
        initialFunction(trigger,attributes,sections,casc);//functions that should only be run if the attribute was the thing changed by the user
  
      }
      if(trigger){
        triggerFunctions(trigger,attributes,sections,casc);
        if(!event){
          // Handle autocalc formula
          if(trigger.formula){
            attributes[trigger.name] = parseKFormula({trigger,attributes,sections,casc});
          }
          // handle calculation of element
          if(
            trigger.calculation &&
            funcs[trigger.calculation]
          ){
            attributes[trigger.name] = funcs[trigger.calculation]({trigger,attributes,sections,casc});
          }else if(trigger.calculation && !funcs[trigger.calculation]){
            debug(`K-Scaffold Error: No function named ${trigger.calculation} found`);
          }
        }
      }
      attributes.set();
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
    const repeatObjects = {};
    const repeatTargetObjects = {};
    const repeatHandler = {
      get:function(obj,prop){
        const row = `${obj._section}_${obj._id}`;
        if(prop === '_isProxy'){
          return true;
        }
        if(prop === 'toJSON'){
          return () => {
            return Object.keys(obj).reduce((o,k) => {
              o[k] = attributes[`${row}_${k}`];
              return o;
            },{_id: obj._id,_section: obj._section});
          }
        }
        if(prop === 'remove'){
          return function(){
            delete attributes[obj._section][obj._id];
          }
        }
        return obj[prop];
      },
      set: function(obj,prop,value){
        if(prop === '_id' || prop === '_section'){
          throw new Error(`!!!Warning: cannot change the id or section of a repeating object!!!`);
        }else if( prop === '_index'){
          throw new Error(`!!!Warning: Cannot reorder sections by setting the _index. Sort the repeating array or use k.setSectionOrder!!!`);
        }
        const fullRef = `${obj._section}_${obj._id}_${prop}`;
        attributes[fullRef] = value;
        obj[prop] = value;
      }
    };
    const repeatArrHandler = {
      get(arr,prop){
        prop = typeof prop === 'string' ?
          prop.replace(/^\$/,'') :
          prop;
        if(prop === '_isProxy'){
          return true;
        }
        if(
          prop === 'fill' ||
          prop === 'shift' ||
          prop === 'pop' ||
          prop === 'unshift' ||
          prop === 'splice'
        ){
          throw new Error(`The ${prop} method is not allowed on section arrays`);
        }
        if(prop === 'create'){
          return function(){
            const argArray = [...arguments];
            const custom = argArray.find(e => typeof e === 'string');
            const data = argArray.find(e => typeof e === 'object' && !Array.isArray(e));
  
            const row = _generateRowID(arr._section,sections,custom);
            const id = row.replace(/repeating_[^_]+_/,'');
            arr[id] = createRepeatObj(arr._section,id);
            arr.push(arr[id]);
            if(data){
              Object.entries(data).forEach(([key,value]) => {
                if(arr[id].hasOwnProperty(key)){
                  arr[id][key] = value;
                }else{
                  debug(`!!!Warning: no input exists in ${obj._section} for the attribute "${key}"!!!`);
                }
              });
            }
            return arr[id];
          }
        }
        if(prop === 'move'){
          return function(){
            const ref = arguments[0];
            const targ = arguments[1];
            const vocal = !arguments[2]
            // TODO: add protection for missing arguments
            let id;
            let index;
            if(sections[arr._section].includes(ref)){
              id = ref;
              index = sections[arr._section].indexOf(id);
            }else if(!Number.isNaN(ref)){
              index = ref;
              id = sections[arr._section][index];
            }
            if(
              !Number.isNaN(index) &&
              id &&
              !Number.isNaN(targ)
            ){
              const obj = arr.splice(index,1);
              arr.splice(targ,0,obj);
              sections[arr._section].splice(index,1);
              sections[arr._section].splice(targ,0,id);
              if(vocal){
                attributes.set({
                  callback(){
                    _setSectionOrder(arr._section,sections[arr._section]);
                  }
                });
              }
            }
          }
        }
        if(prop === 'sort'){
          return function(){
            const callback = arguments[0];
            const vocal = !arguments[1];
            sections[arr._section].sort((a,b) => {
              const aObj = arr[a];
              const bObj = arr[b];
              const sortResult = callback(aObj,bObj);
              return sortResult;
            });
            arr.sort((a,b) => {
              const aIndex = sections[arr._section].indexOf(a._id);
              const bIndex = sections[arr._section].indexOf(b._id);
              return aIndex - bIndex;
            });
            // Defer setSectionOrder into a set() callback so it fires AFTER pending setAttrs
            // (the sort may coexist with attribute writes that create the rows being reordered).
            if(vocal){
              attributes.set({
                callback(){
                  _setSectionOrder(arr._section,sections[arr._section]);
                }
              });
            }
            return arr;
          }
        }
        if(arr[prop] || Number.isNaN(prop)){
          return Reflect.get(...arguments);
        }
        if(sections[arr._section].includes(prop)){
          arr[prop] = createRepeatObj(arr._section,prop);
          arr.push(arr[prop]);
          return arr[prop];
        }
      },
      set(obj,prop,value){
        if(prop === 'section'){
          throw new Error('!!!Warning: Section property of a repeating section is readonly!!!')
        }
      },
      deleteProperty(arr,prop){
        if(
          !prop.startsWith('_') &&
          arr[prop] &&
          arr[prop]._isProxy
        ){
          let id;
          let index;
          if(typeof prop === 'string' && prop.startsWith('-')){
            id = prop;
            index = sections[arr._section].indexOf(id);
          }else{
            index = prop;
            id = arr[index]._id;
          }
          delete arr[id];
          arr.splice(index,1);
          sections[arr._section].splice(index,1);
          const row = `${arr._section}_${id}`;
          removeRepeatingRow(row);
        }
      }
    };
    const createRepeatObj = (prop,id) => {
      const row = `${prop}_${id}`;
      const fields = repeatingSectionDetails.find(o => o.section === prop).fields;
      const retObj = fields.reduce((o,field) => {
        o[field] = attributes[`${row}_${field}`];
        return o;
      },{_id:id,_section: prop})
      repeatTargetObjects[prop] = repeatTargetObjects[prop] || {};
      repeatTargetObjects[prop][id] = retObj;
      return new Proxy(retObj,repeatHandler);
    }
    const attrHandler = {
      get:function(obj,prop){//gets the most value of the attribute.
        if(prop === '_isProxy'){
          return true;
        }
        if(prop === 'toJSON'){
          return () => ({...obj.attributes,...obj.updates});
        }else if(prop === 'set'){
          return function(){
            let {callback,vocal} = arguments[0] ? arguments[0] : {};
            // Preserve the caller's callback across cascade-queue processing. Without this,
            // the recursive set() triggered by cascade processing (which passes no callback)
            // would drop the original caller's callback silently.
            if(callback){
              obj._pendingCallback = callback;
            }
            if(sections && casc && attributes.queue.length){
              const triggerName = attributes.queue.shift();
              const trigger = getCascObj({sourceAttribute:triggerName});
              processChange({trigger,attributes,sections,casc});
            }else{
              const resolvedCallback = callback || obj._pendingCallback;
              obj._pendingCallback = undefined;
              if(kFuncs.verboseMode){
                debug({updates:obj.updates});
              }
              const trueCallback = Object.keys(obj.repOrders).length ?
                function(){
                  Object.entries(obj.repOrders).forEach(([section,order])=>{
                    _setSectionOrder(section,order)
                  });
                  resolvedCallback && resolvedCallback();
                }:
                resolvedCallback;
              Object.keys(obj.updates).forEach((key)=>obj.attributes[key] = obj.updates[key]);
              const update = obj.updates;
              obj.updates = {};
              set(update,vocal,trueCallback);
            }
          }
        }else if(/^repeating_[^_]+$/.test(prop)){
          // if it's been lazy loaded, use it
          if(!repeatObjects[prop]){
            // otherwise lazy load it
            const baseArr = [];
            baseArr._section = prop;
            repeatObjects[prop] = new Proxy(sections[prop].reduce((arr,id,i) => {
              const rowObj = createRepeatObj(prop,id,i);
              arr.push(rowObj);
              arr[id] = rowObj;
              return arr;
            },baseArr),repeatArrHandler);
          }
          return repeatObjects[prop];
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
          let cascRef = `attr_${prop.replace(/(repeating_[^_]+_)[^_]+/,'$1\$X')}`.toLowerCase();
          let numRetVal = +retValue;
          if(!Number.isNaN(numRetVal) && retValue !== ''){
            retValue = numRetVal;
          }else if(cascades[cascRef] && cascades[cascRef].type === 'number'){
            // Only substitute the default when the input is explicitly typed as a number.
            // Previously the proxy also substituted when defaultValue was numeric, which caused
            // non-numeric checkbox values (e.g. '/w gm') to be clobbered by the numeric default (0).
            retValue = cascades[cascRef].defaultValue;
          }
          return retValue;
        }
      },
      set:function(obj,prop,value){
        //Sets the value. Also verifies that the value is a valid attribute value
        //e.g. not undefined, null, or NaN
        if(value || value===0 || value===''){
          if(/reporder/.test(prop)){
            let section = prop.replace(/_reporder_/,'');
            obj.repOrders[section] = value;
          }else if(`${obj.attributes[prop]}` !== `${value}` ||
            (obj.updates.hasOwnProperty(prop) && `${obj.updates[prop]}` !== `${value}`)
          ){
            if(sections && casc){
              let trigger = getCascObj({sourceAttribute:prop});
              if(!trigger.name){
                Object.assign(casc,expandCascade(cascades,sections));
                trigger = getCascObj({sourceAttribute:prop});
              }
              if(Array.isArray(trigger.affects)){
                attributes.queue.push(...trigger.affects);
              }
            }
            const repRx = /^(repeating_[^_]+)_([^_]+)_(.+)$/;
            if(repRx.test(prop)){
              const [,section,rowID,field] = prop.match(repRx);
              if(repeatObjects[section]){
                repeatObjects[section][rowID] = repeatObjects[section][rowID] || createRepeatObj(section,rowID);
                repeatTargetObjects[section][rowID][field] = value;
              }
            }
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
    const attributes = new Proxy(attrTarget,attrHandler);
    return attributes;
  };
  
  /**
   * Function that registers a function for being called via the funcs object. Returns true if the function was successfully registered, and false if it could not be registered for any reason.
   * @memberof Utilities
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
  
  /**
   * Function that sets up the action calls used in the roller mixin.
   * @memberof Sheetworkers
   * @param {object} attributes - The attribute values of the character
   * @param {object[]} sections - All the repeating section IDs
   */
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
   * Function that reduces Roll20 macro syntax formulas down to their calculated value.
   * @memberof Sheetworkers
   * @param {object} attributes - The attribute values of the character
   * @param {object[]} sections - All the repeating section IDs
   */
  const parseKFormula = ({trigger,attributes,sections,casc}) => {
    const [baseSection,rowID,attrName] = parseTriggerName(trigger.name);
    const repeatBlockRx = baseSection ?
      /(@{repeating_.+?_\$X_.+?})/g :
      /={([^)]*repeating_[^_]+[^)]*)}=/g;
    let mutFormula = trigger.formula;
    mutFormula = mutFormula.replace(repeatBlockRx,(match,repeatMacro) => {
      const [section] = repeatMacro.match(/repeating_[^_]+/);
      const idArray = baseSection ?
        [rowID] :
        sections[section];
      return idArray.map(id => {
          return `(${repeatMacro.replace(/repeating_[^_]+?_[^_]+?_([^}]+)/g,`${section}_${id}_$1`)})`;
        }).join(
          trigger.type === 'number' ?
            ' + ' :
            ''
        );
    });
    mutFormula = parseMacro(mutFormula,attributes)
      .replace(/@{.+?}/g,'0');
    const mathKeys = ['floor','ceil','round','abs'];
    mathKeys.forEach(func => mutFormula = mutFormula.replace(new RegExp(`${func}\\(`,'g'),`Math.${func}(`));
    const mathRx = new RegExp(`Math\\.(?:${mathKeys.join('|')})`,'g');
    let noAlphaStr = mutFormula
      .replace(mathRx,'');
    return trigger.type !== 'text' ?
      (
        !noAlphaStr.match(/[a-z]/i) ?
          eval(mutFormula) :
          undefined
      ) :
      mutFormula;
  };
  funcs.parseKFormula = parseKFormula;
  kFuncs.parseKFormula = parseKFormula;
  
  /**
   * Function to call a function previously registered to the funcs object. May not be used that much in actual sheets, but very useful when writing unit tests for your sheet. Either returns the function or null if no function exists.
   * @memberof Sheetworkers
   * @param {string} funcName - The name of the function to invoke.
   * @param {...any} args - The arguments to call the function with.
   * @returns {function|null}
   * @example
   * //Call myFunc with two arguments
   * k.callFunc('myFunc','an argument','another argument');
   */
  const callFunc = function(funcName,...args){
    if(funcs[funcName]){
      if(kFuncs.verboseMode){
        debug(`calling ${funcName}`);
      }
      return funcs[funcName](...args);
    }else{
      debug(`Invalid function name: ${funcName}`);
      return null;
    }
  };
  kFuncs.callFunc = callFunc;/**@namespace Sheetworkers */
/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
//Sheet Updaters and styling functions
/**
 * Function that calls the K-scaffold's update and sheet initialization routines.
 */
const updateSheet = function(){
  log('updating sheet');
  getAllAttrs({props:['debug_mode',...baseGet],callback:(attributes,sections,casc)=>{
    kFuncs.debugMode = kFuncs.debugMode || !!attributes.debug_mode;
    if(kFuncs.verboseMode){
      debug({sheet_version:attributes.sheet_version});
    }
    if(!attributes.sheet_version){
      Object.entries(initialSetups).forEach(([funcName,handler])=>{
        if(typeof funcs[funcName] === 'function'){
          if(kFuncs.verboseMode){
            debug(`running ${funcName}`);
          }
          funcs[funcName]({attributes,sections,casc});
        }else{
          if(kFuncs.verboseMode){
            debug(`!!!Warning!!! no function named ${funcName} found. Initial sheet setup not performed.`);
          }
        }
      });
    }else{
      Object.entries(updateHandlers).forEach(([ver,handler])=>{
        if(attributes.sheet_version < +ver){
          handler({attributes,sections,casc});
        }
      });
    }
    if(kFuncs.verboseMode){
      debug({openHandlers});
    }
    Object.entries(openHandlers).forEach(([funcName,func])=>{
      if(typeof funcs[funcName] === 'function'){
        if(kFuncs.verboseMode){
          debug(`running ${funcName}`);
        }
        funcs[funcName]({attributes,sections,casc});
      }else{
        if(kFuncs.verboseMode){
          debug(`!!!Warning!!! no function named ${funcName} found. Sheet open handling not performed.`);
        }
      }
    });
    setActionCalls({attributes,sections});
    attributes.sheet_version = kFuncs.version;
    log(`Sheet Update applied. Current Sheet Version ${kFuncs.version}`);
    attributes.set();
    log('Sheet ready for use');
  }});
};
kFuncs.updateSheet = updateSheet;

const initialSetup = function(attributes,sections){
  if(kFuncs.verboseMode){
    debug('Initial sheet setup');
  }
};

/**
 * This is the default listener function for attributes that the K-Scaffold uses. It utilizes the `triggerFuncs`, `listenerFunc`, `calculation`, and `affects` properties of the K-scaffold trigger object (see the Pug section of the scaffold for more details).
 * @memberof Sheetworkers
 * @param {Roll20Event} event - The Roll20 event object
 * @returns {void}
 * @example
 * //Call from an attribute change
 * on('change:an_attribute',k.accessSheet);
 */
const accessSheet = function(event){
  if(kFuncs.verboseMode){
    debug({funcs:Object.keys(funcs)});
    debug({event});
  }
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
const expandCascade = function(cascade,sections){
  return _.keys(cascade).reduce((memo,key)=>{//iterate through cascades and replace references to repeating attributes with correct row ids.
    if(/^(?:act|attr)_repeating_/.test(key)){//If the attribute is a repeating attribute, do special logic
      expandRepeating(memo,key,cascade,sections);
    }else if(key){//for non repeating attributes do this logic
      expandNormal(memo,key,cascade,sections);
    }
    return memo;
  },{});
};
kFuncs.expandCascade = (sections) => expandCascade(cascades,sections);

const expandRepeating = function(memo,key,cascade,sections){
  key.replace(/((?:attr|act)_)(repeating_[^_]+)_[^_]+?_(.+)/,(match,type,section,field)=>{
    (sections[section]||[]).forEach((id)=>{
      memo[`${type}${section}_${id}_${field}`]=_.clone(cascade[key]);//clone the details so that each row's attributes have correct ids
      memo[`${type}${section}_${id}_${field}`].name = `${section}_${id}_${field}`;
      if(key.startsWith('attr_')){
        memo[`${type}${section}_${id}_${field}`].affects = memo[`${type}${section}_${id}_${field}`].affects.reduce((m,affected)=>{
          if(affected.startsWith(section)){//otherwise if the affected attribute is in the same section, simply set the affected attribute to have the same row id.
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
 * These are functions that provide K-scaffold aliases for the basic Roll20 sheetworker functions. These functions also provide many additional features on top of the standard Roll20 sheetworkers.
 * @namespace Sheetworkers.Sheetworker Aliases
 */
/**
 * Alias for [setSectionOrder()](https://wiki.roll20.net/Sheet_Worker_Scripts#setSectionOrder.28.3CRepeating_Section_Name.3E.2C_.3CSection_Array.3E.2C_.3CCallback.3E.29) that allows you to use the section name in either `repeating_section` or `section` formats. Note that the Roll20 sheetworker [setSectionOrder](https://wiki.roll20.net/Sheet_Worker_Scripts#setSectionOrder.28.3CRepeating_Section_Name.3E.2C_.3CSection_Array.3E.2C_.3CCallback.3E.29) currently causes some display issues on sheets.
 * @memberof Sheetworker Aliases
 * @name setSectionOrder
 * @param {string} section - The name of the section, with or without `repeating_`
 * @param {string[]} order - Array of ids describing the desired order of the section.
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
// deprecation warning added to setSectionOrder
kFuncs.setSectionOrder = (section,order) => {
  debug('###Deprecation: It is recommended to use the "move" method of the nested section info feature of the attributes object instead of setSectionOrder');
  _setSectionOrder(section,order);
};

/**
 * Alias for [removeRepeatingRow](https://wiki.roll20.net/Sheet_Worker_Scripts#removeRepeatingRow.28_RowID_.29) that also removes the row from the current object of attribute values and array of section IDs to ensure that erroneous updates are not issued.
 * @memberof Sheetworker Aliases
 * @name removeRepeatingRow
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
  Object.keys(attributes.attributes).forEach((key)=>{
    if(key.startsWith(row)){
      delete attributes[key];
    }
  });
  let [,section,rowID] = row.match(/(repeating_[^_]+)_(.+)/,'');
  sections[section] = sections[section].filter((id)=>id!==rowID);
  delete attributes[section][rowID];
  removeRepeatingRow(row);
};
kFuncs.removeRepeatingRow = _removeRepeatingRow;

/**
 * Alias for [getAttrs()](https://wiki.roll20.net/Sheet_Worker_Scripts#getAttrs.28attributeNameArray.2C_callback.29) that converts the default object of attribute values into an {@link attributesProxy} and passes that back to the callback function.
 * @memberof Sheetworker Aliases
 * @name getAttrs
 * @param {string[]} [props=baseGet] - Array of attribute names to get the value of. Defaults to {@link baseGet} if not passed.
 * @param {function(attributesProxy)} callback - The function to call after the attribute values have been gotten. An {@link attributesProxy} is passed to the callback.
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
 * @memberof Sheetworker Aliases
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
      const casc = expandCascade(cascades,sections);
      const attributes = createAttrProxy(values,sections,casc);
      orderSections(attributes,sections,casc);
      callback(attributes,sections,casc);
    })
  });
};
kFuncs.getAllAttrs = getAllAttrs;

/**
 * Alias for [getSectionIDs()](https://wiki.roll20.net/Sheet_Worker_Scripts#getSectionIDs.28section_name.2Ccallback.29) that allows you to iterate through several functions at once. Also assembles an array of repeating attributes to get.
 * @memberof Sheetworker Aliases
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
 * @memberof Sheetworker Aliases
 * @alias setAttrs
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
 * @memberof Sheetworker Aliases
 * @name generateRowID
 * @param {sectionObj} sections
 * @param {string} [customText] - Custom text to start the ID with. This text should not be longer than the standard repeating section ID format.
 * @returns {string} - The created ID
 * @example
 * k.getAllAttrs({
 *  callback:(attributes,sections,casc)=>{
 *    //Create a new row ID
 *    const rowID = k.generateRowID('repeating_equipment',sections);
 *    console.log(rowID);// => repeating_equipment_-p8rg908ug0suzz
 *    //Create a custom row ID
 *    const customID = k.generateRowID('repeating_equipment',sections,'custom');
 *    console.log(customID);// => repeating_equipment_-custom98uadj89kj
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
kFuncs.generateRowID = (section,sections,customText) => {
  debug('###Deprecation: It is recommended to use the "create" method of the nested section info feature of the attributes object instead of k.generateRowID');
  return _generateRowID(section,sections,customText);
};

/**
 * An alias for [Roll20's getTranslationByKey](https://wiki.roll20.net/Sheet_Worker_Scripts#getTranslationByKey.28.5Bkey.5D.29) that also supports data-i18n-vars syntax replacement and returns the translation key if no value is found instead of `false`.
 * @memberof Sheetworker Aliases
 * @name getTranslationByKey
 * @param {string} key - The translation key to look up.
 * @param {string[]} [variables = []] - An array of variable values to replace variable indexes with.
 * @returns {string}
 */
const _getTranslationByKey = (key,variables = []) => {
  let translate = getTranslationByKey(key) || key;
  console.warn('getTranslationByKey',getTranslationByKey(key));
  console.warn('translate:',translate);
  variables.forEach((v,i) => {
    translate = translate.replace(new RegExp(`\\{\\{${i}\\}\\}`,'g'),v);
  });
  return translate;
}
kFuncs.getTranslationByKey = _getTranslationByKey;

/**
 * Assembles the roll string from the roll object
 * @param {object} rollObj - object describing the roll
 * @param {string} [rollStart = '@{template_start}'] - The string to start the roll with.
 * @returns {string}
 */
const assembleRoll = (rollObj,rollStart = kFuncs.defaultRollStart) => {
  return Object.entries(rollObj).reduce((str,[field,content])=>{
    return str += ` {{${field}=${content ?? ''}}}`;
  },`${rollStart}`);
};


/**
 * @typedef {Object} kRoll
 * @property {Object} roll - The roll object returned by [Roll20's startRoll](https://wiki.roll20.net/Custom_Roll_Parsing#Sheetworker_Functions).
 * @property {Function} roll.finish - Finishes the associated roll passing it the computeObj and rollId.
 * @property {Object} computeObj - object for storing manipulations to the roll. Assign manipulations to this, DO NOT reassign it to a new object.
 */

/**
 * 
 * @param {object} rollObj - Object specifying the fields to pass to the rolltemplate. Object keys are field names. Object values are the field values.
 * @param {string} [startString = '@{template_start}'] - Text that should be prepended to the roll string that results from rollObj.
 * @returns {kRoll} 
 */
const _startRoll = async (rollObj,startString) => {
  const rollString = assembleRoll(rollObj,startString);
  const roll = await startRoll(rollString);
  const computeObj = {};
  roll.finish = () => {
    finishRoll(roll.rollId,computeObj);
  };
  return {roll, computeObj};
};
kFuncs.startRoll = _startRoll;/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
const listeners = {};

/**
 * The array of attribute names that the k-scaffold gets by default. Does not incude repeating attributes.
 * @memberof Variables
 * @var
 * @type {array}
 */
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
  if(kFuncs.verboseMode){
    debug({funcKeys:Object.keys(funcs),funcs});
  }
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
setTimeout(registerEventHandlers,0);//Delay the execution of event registration to ensure all event properties are present.

/**
 * Function to add a repeating section when the add button of a customControlFieldset or inlineFieldset is clicked.
 * @memberof Sheetworkers
 * @param {object} event - The R20 event object
 */
const addItem = function(event){
  let [,,section] = parseClickTrigger(event.triggerName);
  section = section.replace(/add-/,'');
  getAllAttrs({
    callback:(attributes,sections,casc) => {
      let row = _generateRowID(section,sections);
      attributes[`${row}_name`] = '';
      setActionCalls({attributes,sections});
      const trigger = cascades[`fieldset_repeating_${section}`];
      if(trigger){
        if(trigger.addFuncs){
          trigger.addFuncs.forEach((funcName) => {
            if(funcs[funcName]){
              funcs[funcName]({attributes,sections,casc,trigger,newRow:row});
            }
          });
        }
        if(Array.isArray(trigger.affects)){
          attributes.queue.push(...trigger.affects);
        }
      }
      attributes.set({attributes,sections,casc});
    }
  });
};
funcs.addItem = addItem;/**
 * The default tab navigation function of the K-scaffold. Courtesy of Riernar. It will add `k-active-tab` to the active tab-container and `k-active-button` to the active button. You can either write your own CSS to control display of these, or use the default CSS included in `scaffold/_k.scss`. Note that `k-active-button` has no default CSS as it is assumed that you will want to style the active button to match your system.
 * @memberof Sheetworkers
 * @param {Object} trigger - The trigger object
 * @param {object} attributes - The attribute values of the character
 */
const kSwitchTab = function ({ trigger, attributes }) {
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
}

registerFuncs({ kSwitchTab });

/**
 * Sets persistent tabs to their last active state
 * @memberof Sheetworkers
 * @param {object} attributes - The attribute values of the character
 */
const kTabOnOpen = function({trigger,attributes,sections,casc}){
  if(typeof persistentTabs === 'undefined') return;
  persistentTabs.forEach((tabInput) => {
    const pseudoTrigger = {name:attributes[tabInput]};
    kSwitchTab({trigger:pseudoTrigger, attributes});
  });
};
registerFuncs({ kTabOnOpen },{type:['opener']});
  return kFuncs;
  }());
  const actionAttributes = ["fatigue_resist_action","agility_action","brawn_action","coordination_action","gravitas_action","insight_action","reason_action","will_action","academia_skill_action","academia_focus_finance_action","academia_focus_history_action","academia_focus_linguistics_action","academia_focus_philosophy_action","academia_focus_religion_action","athletics_skill_action","athletics_focus_climbing_action","athletics_focus_lifting_action","athletics_focus_physical_training_action","athletics_focus_running_action","athletics_focus_swimming_action","crafting_skill_action","crafting_focus_armorsmithing_action","crafting_focus_cooking_action","crafting_focus_tailoring_action","crafting_focus_weaponsmithing_action","engineering_skill_action","engineering_focus_architecture_action","engineering_focus_defenses_action","engineering_focus_demolition_action","engineering_focus_infrastructure_action","engineering_focus_siege_engines_action","fighting_skill_action","fighting_focus_archery_action","fighting_focus_melee_weapons_action","fighting_focus_thrown_weapons_action","fighting_focus_unarmed_action","fighting_focus_war_magic_action","medicine_skill_action","medicine_focus_contagion_action","medicine_focus_faith_healing_action","medicine_focus_field_treatment_action","medicine_focus_pharmacia_action","medicine_focus_surgery_action","observation_skill_action","observation_focus_hearing_action","observation_focus_instincts_action","observation_focus_sight_action","observation_focus_smell_and_taste_action","persuasion_skill_action","persuasion_focus_charm_action","persuasion_focus_deception_action","persuasion_focus_innuendo_action","persuasion_focus_intimidation_action","persuasion_focus_invocation_action","persuasion_focus_negotiation_action","persuasion_focus_rhetoric_action","resilience_skill_action","resilience_focus_discipline_action","resilience_focus_fortitude_action","resilience_focus_immunity_action","stealth_skill_action","stealth_focus_concealment_action","stealth_focus_disguise_action","stealth_focus_escape_artistry_action","stealth_focus_lock_picking_action","stealth_focus_sleight_of_hand_action","stealth_focus_sneak_action","survival_skill_action","survival_focus_animal_handling_action","survival_focus_boating_action","survival_focus_foraging_action","survival_focus_hunting_action","survival_focus_mysticism_action","survival_focus_navigation_action","survival_focus_tracking_action","survival_focus_woodcraft_action","tactics_skill_action","tactics_focus_cavalry_action","tactics_focus_infantry_action","tactics_focus_leadership_action","tactics_focus_navy_action","tactics_focus_omen_reading_action","tactics_focus_scouting_action","repeating_weapon_$X_weapon_action","repeating_spell_$X_spell_cast_action"];
  k.sheetName = "CohorsCthulhu";
  k.version = "0.1.0";
  
  
  // Attribute bonus: rating <=8 -> 0, 9 -> +1, 10-11 -> +2, 12-13 -> +3,
  // 14-15 -> +4, 16+ -> +5. Used for Bonus Damage, Base Armour, Courage,
  // Total Armor and Power.
  const ccAttributeBonus = (rating) => {
    const r = Number(rating) || 0;
    return r <= 8 ? 0 : Math.min(5, Math.ceil((r - 7) / 2));
  };
  
  const ccCapitalize = (s) => s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  
  // Challenge Dice from plain d6s, using the rules' fallback table: 1 -> 1, 2
  // -> 2, 3/4 -> blank, 5/6 -> 1 plus an Effect (the skull is a BMP
  // character, not an emoji). Used by weapon damage and spell Cost rolls.
  const ccChallengeDieFromD6 = (d6) => {
    switch (Number(d6)) {
      case 1: return {pips: 1, effect: false, symbol: '†'};
      case 2: return {pips: 2, effect: false, symbol: '‡'};
      case 5: return {pips: 1, effect: true, symbol: '☠'};
      case 6: return {pips: 1, effect: true, symbol: '☠'};
      default: return {pips: 0, effect: false, symbol: '–'};
    }
  };
  
  // Roll buttons are k-scaffold rollers: a roll button (draggable to the macro
  // bar) sends an attribute holding %{character|action button}, which
  // k-scaffold fills on sheet open. Rows added with Roll20's own Add button
  // get theirs when they're named.
  const ccRefreshActionCalls = ({attributes, sections}) => k.setActionCalls({attributes, sections});
  k.registerFuncs({ccRefreshActionCalls});
  
  // Action button trigger.name arrives dash-separated ("academia-focus-
  // finance-roll"); normalize to underscores before matching.
  const ccNormalizeName = (name) => name.replace(/-/g, '_');
  
  // Bought d20s cost 1, 2, 3 Momentum (or Threat for an adversary): 2 dice
  // cost 3, 3 dice cost 6. 3 is the cap.
  const ccBonusDiceCost = (count) => {
    const n = Math.min(3, Math.max(0, count));
    return (n * (n + 1)) / 2;
  };
  
  // The dice of one inline roll: startRoll gives each [[ ]] field as {result,
  // dice: [17, 6, 13], expression, rolls}.
  const ccRollDice = (result) => (result && Array.isArray(result.dice) ? result.dice : []);
  
  // A test's d20s: 2 plus at most 3 bought. The query is free text, so dice
  // past the cap are dropped rather than given away free.
  const ccTestDice = (result) => ccRollDice(result).slice(0, 5);
  
  // Vicious X adds X damage per Effect rolled; a bare "Vicious" is X = 1.
  const ccViciousBonus = (effects) => effects.reduce((sum, effect) => {
    const match = /^\s*vicious\b\s*(\d+)?/i.exec(effect);
    return match ? sum + (Number(match[1]) || 1) : sum;
  }, 0);
  
  // Momentum is a party-wide pool, kept by the companion API script
  // (CohorsCthulhuCompanion.js). Each roll that generates or spends it
  // sends a hidden signal with a net delta: positive for generated, negative
  // for spent. Bought d20s use ccSendMomentumSpendSignal instead.
  //
  // Sheet workers can't call sendChat(), so the signal is a hidden roll
  // template (ccmomentumsignal) whispered to the GM. Harmless without the API
  // script.
  const ccSendMomentumSignal = async (delta) => {
    if (!delta) { return; }
    try {
      const roll = await startRoll(`/w gm &{template:ccmomentumsignal} {{ccmomentumdelta=[[0+${delta}]]}}`);
      finishRoll(roll.rollId, {});
    } catch (err) {
      console.log('[CC] Momentum pool signal failed:', err.message);
    }
  };
  
  // Spends the pool might not cover: bought d20s, and a roll's net spend
  // after its own Momentum. Whatever the pool can't cover becomes Threat,
  // which only the API script can decide. cost is always positive.
  const ccSendMomentumSpendSignal = async (cost) => {
    if (!cost) { return; }
    try {
      const roll = await startRoll(`/w gm &{template:ccmomentumspendsignal} {{ccmomentumspend=[[0+${cost}]]}}`);
      finishRoll(roll.rollId, {});
    } catch (err) {
      console.log('[CC] Momentum spend signal failed:', err.message);
    }
  };
  
  // Threat is the GM's pool, kept by the same API script. For PCs, delta is
  // the roll's Complications (1 Threat each). Kept separate from the
  // Momentum signal.
  const ccSendThreatSignal = async (delta) => {
    if (!delta) { return; }
    try {
      const roll = await startRoll(`/w gm &{template:ccthreatsignal} {{ccthreatdelta=[[0+${delta}]]}}`);
      finishRoll(roll.rollId, {});
    } catch (err) {
      console.log('[CC] Threat pool signal failed:', err.message);
    }
  };
  
  // NPC tiers; see the Character Type radios in views/_character.pug.
  const ccNpcTiers = ['trooper', 'toughened', 'nemesis'];
  const ccIsNpc = (attributes) => ccNpcTiers.includes(attributes.character_type);
  
  // Adversary NPCs bank extra successes as Threat and buy d20s with Threat;
  // allies use the party's Momentum. Defaults to adversary.
  const ccIsAdversary = (attributes) => ccIsNpc(attributes) && attributes.npc_allegiance !== 'ally';
  
  // NPC stat blocks give final Max Stress, Injuries, Armor, Courage and Power
  // with special rules applied. On an NPC sheet a filled-in value
  // (views/panels/_npc_profile_panel.pug) wins; null means the tier formula
  // applies.
  const ccNpcBookValue = (attributes, name) => {
    if (!ccIsNpc(attributes)) { return null; }
    const raw = String(attributes[name] === undefined || attributes[name] === null ? '' : attributes[name]).trim();
    return (raw === '' || Number.isNaN(Number(raw))) ? null : Number(raw);
  };
  
  const ccBonusDiceQuery = (attributes) => (ccIsAdversary(attributes) ?
    '?{Additional d20s bought with Threat (0-3)|0}' :
    '?{Additional d20s bought (0-3)|0}');
  
  // Pool name for a roll, also shown on the card ({{pool}}).
  const ccPoolName = (attributes) => (ccIsAdversary(attributes) ? 'Threat' : 'Momentum');
  
  // Settles a finished roll's pool effects for every roll site. generated:
  // extra successes; bonusDiceCount: d20s bought; extraSpent: pool spent on
  // the roll's own options (Extra Momentum, Fatigue removal, extra damage
  // dice); extraThreat: Threat the roll always generates (Dabbling power
  // boost, Curse of Loki).
  //
  // An adversary's net result is one signed Threat delta (the API script
  // floors the pool at 0). Its complications stay on the card for the GM.
  // Returns what was spent, for the card's Spent row.
  const ccSettleRoll = async ({attributes, generated, bonusDiceCount, extraSpent = 0, complications, extraThreat = 0}) => {
    if (ccIsAdversary(attributes)) {
      const spent = ccBonusDiceCost(bonusDiceCount) + extraSpent;
      await ccSendThreatSignal(generated - spent + extraThreat);
      return spent;
    }
    // Bought d20s are paid first: they were bought before the roll, and the
    // pool's cap of 6 makes the order matter. The roll's own Momentum is then
    // netted against its other spends; a net spend goes through the spend
    // signal, so any shortfall becomes Threat.
    const diceCost = ccBonusDiceCost(bonusDiceCount);
    await ccSendMomentumSpendSignal(diceCost);
    const net = generated - extraSpent;
    if (net < 0) {
      await ccSendMomentumSpendSignal(-net);
    } else {
      await ccSendMomentumSignal(net);
    }
    await ccSendThreatSignal(complications + extraThreat);
    return diceCost + extraSpent;
  };
  
  // Sum of X across special rules whose name matches pattern. X comes from
  // the row's X field, else a trailing number in the name, else 1.
  const ccSpecialRuleValue = (attributes, pattern) => (attributes.repeating_specialrule || [])
    .filter((row) => pattern.test(String(row.name || '')))
    .reduce((sum, row) => {
      const trailing = String(row.name || '').match(/(\d+)\s*$/);
      return sum + (Number(row.x) || (trailing ? Number(trailing[1]) : 1));
    }, 0);
  
  // Extraordinary [Attribute] X: X automatic successes on tests with that
  // attribute. The only rule applied at roll time; stat block totals already
  // include the others.
  const ccExtraordinary = (attributes, attrName) => (attrName ?
    ccSpecialRuleValue(attributes, new RegExp(`^\\s*extraordinary\\s+${attrName}\\b`, 'i')) : 0);
  
  const ccHasSpecialRule = (attributes, pattern) => (attributes.repeating_specialrule || [])
    .some((row) => pattern.test(String(row.name || '')));
  
  const ccAttributeNames = ['agility', 'brawn', 'coordination', 'gravitas', 'insight', 'reason', 'will'];
  
  // Attribute query for skill and focus rolls. Each option packs rating + 100
  // x that attribute's Extraordinary bonus, since a query returns one number;
  // ccUnpackAttributeChoice reverses it.
  const ccAttributeQuery = (attributes) => '?{Attribute' + ccAttributeNames.map((name) => {
    const rating = Number(attributes[`${name}_rating`]) || 0;
    return `|${ccCapitalize(name)},${rating + 100 * ccExtraordinary(attributes, name)}`;
  }).join('') + '}';
  
  const ccUnpackAttributeChoice = (value) => ({
    rating: value % 100,
    autoSuccesses: Math.floor(value / 100),
  });
  
  // Shared 2d20 roll for attribute, skill and focus rolls. attributeExpr is a
  // literal rating or the packed ?{Attribute} query (see ccAttributeQuery).
  // critMax: the die value at or under which a die is a critical success (the
  // skill's ranks with a focus, at least 1; else 1).
  const runCcRoll = async ({attributes, skillLabel, focusLabel, attributeExpr, skillRanks, critMax}) => {
    const difficultyQuery = '?{Difficulty|1}';
    const complicationQuery = '?{Complication range (1-5)|1}';
    const bonusDiceQuery = ccBonusDiceQuery(attributes);
  
    // Every field finishRoll overrides must exist here as a [[0]]
    // placeholder.
    const rollString = '&{template:ccskill} ' +
      `{{character_name=@{character_name}}} ` +
      `{{skill=${skillLabel}}} ` +
      (focusLabel ? `{{focus=${focusLabel}}} ` : '') +
      `{{attribute_choice=[[0+${attributeExpr}]]}} ` +
      `{{difficulty=[[0+${difficultyQuery}]]}} ` +
      `{{complication_range=[[0+${complicationQuery}]]}} ` +
      `{{roll1=[[(2+${bonusDiceQuery})d20]]}} ` +
      `{{target_number=[[0]]}} ` +
      `{{successes=[[0]]}} ` +
      `{{dice_text=[[0]]}} ` +
      `{{outcome=[[0]]}} ` +
      `{{complications=[[0]]}} ` +
      `{{bonus_momentum=[[0]]}} ` +
      `{{momentum_spent=[[0]]}} ` +
      `{{auto_successes=[[0]]}} ` +
      `{{pool=${ccPoolName(attributes)}}}`;
  
    const roll = await startRoll(rollString);
  
    try {
      const {rating: attributeChoice, autoSuccesses} =
        ccUnpackAttributeChoice(Number(roll.results.attribute_choice.result) || 0);
      const difficulty = Number(roll.results.difficulty.result) || 1;
      const complicationRange = Number(roll.results.complication_range.result) || 1;
  
      const roll1 = roll.results.roll1;
      const dice = ccTestDice(roll1);
  
      console.log(`[CC] ${skillLabel}${focusLabel ? ` (${focusLabel})` : ''} roll - d20s:`, dice);
  
      if (!dice.length) {
        finishRoll(roll.rollId, {
          target_number: '?',
          successes: '?',
          dice_text: `error: could not read dice from ${JSON.stringify(roll1)}`,
          outcome: 0,
          complications: 0,
        });
        return;
      }
  
      const targetNumber = attributeChoice + skillRanks;
      const complicationThreshold = 21 - complicationRange;
      const successCount = dice.filter((d) => d <= targetNumber).length +
        dice.filter((d) => d <= critMax).length + autoSuccesses;
      const complicationCount = dice.filter((d) => d >= complicationThreshold).length;
      const passed = successCount >= difficulty;
      const bonusMomentum = passed ? Math.max(0, successCount - difficulty) : 0;
  
      // Bought d20s = dice rolled - 2.
      const bonusDiceCount = Math.max(0, dice.length - 2);
      const bonusDiceCost = await ccSettleRoll({
        attributes, generated: bonusMomentum, bonusDiceCount, complications: complicationCount,
      });
  
      // outcome is 0/1 so the template can gate on
      // rollTotal(computed::outcome); {{#field}} only tests that a field
      // exists.
      const overrides = {
        target_number: targetNumber,
        successes: successCount,
        dice_text: dice.join(', '),
        outcome: passed ? 1 : 0,
        bonus_momentum: bonusMomentum,
        complications: complicationCount,
        momentum_spent: bonusDiceCost,
        auto_successes: autoSuccesses,
      };
  
      console.log(`[CC] ${skillLabel} outcome:`, {
        targetNumber, critMax, difficulty, successCount, complicationCount, passed,
      });
  
      finishRoll(roll.rollId, overrides);
      return passed;
    } catch (err) {
      // Show failures in chat instead of a blank card.
      finishRoll(roll.rollId, {
        target_number: '?',
        successes: '?',
        dice_text: `error: ${err.message}`,
        outcome: 0,
        complications: 0,
      });
      return false;
    }
  };
  
  // Sheet-open recalculation: k-scaffold runs 'opener' functions on every
  // open, unlike change-triggered calculations. It recomputes the derived
  // fields (calcBaseArmour, calcCourage, calcTotalArmor, calcStressMaxBase,
  // calcStressMax), so characters imported by the API script or
  // edited outside the sheet are reconciled, refreshes the hidden markers,
  // matches free-text identity values to their dropdowns, and backfills empty
  // Talent keywords and requirements from ccTalentProfiles. Those are declared later in the
  // script, which is fine: this body only runs on sheet open.
  const ccRecomputeOnOpen = ({attributes, sections}) => {
    // Map the old Cannon Fodder / NPC types to the NPC tiers.
    const legacyTypes = {cannon_fodder: 'trooper', npc: 'nemesis'};
    if (legacyTypes[attributes.character_type]) {
      attributes.character_type = legacyTypes[attributes.character_type];
    }
    // The Player/NPC switch, for sheets from before it and imported NPCs.
    attributes.npc_sheet = calcNpcSheet({attributes});
  
    attributes.base_armour = calcBaseArmour({attributes});
    attributes.total_armor = calcTotalArmor({attributes});
    attributes.courage = calcCourage({attributes});
    attributes.stress_max_base = calcStressMaxBase({attributes});
    attributes.stress_max = calcStressMax({attributes});
    // Also refresh the track markers, which don't re-run when imported values
    // are already correct.
    attributes.stress_max_marker = attributes.stress_max;
    attributes.fatigue_max_marker = attributes.stress_max_base;
    attributes.injury_limit = calcInjuryLimit({attributes});
    attributes.spells_type_marker = calcSpellsTypeMarker({attributes});
    attributes.tradition_marker = calcTraditionMarker({attributes});
    attributes.power_rating = calcPowerRating({attributes});
    ccNormalizeIdentity(attributes);
    ccUpdateTalentFilter({attributes, sections});
  
    (sections.repeating_talent || []).forEach((rowId) => {
      const prefix = `repeating_talent_${rowId}_`;
      const profile = ccTalentProfiles[attributes[`${prefix}name`]];
      // Only fill rows with no Keywords yet.
      if (!profile || attributes[`${prefix}keywords`]) { return; }
      Object.keys(profile).forEach((field) => {
        attributes[`${prefix}${field}`] = profile[field];
      });
    });
  };
  k.registerFuncs({ccRecomputeOnOpen}, {type: ['opener']});
  
  // Rename weapons whose standard name changed, and backfill the details of
  // spells and the X of special rules imported by name. Never overwrites a
  // filled-in value.
  const ccBackfillNamedRows = ({attributes, sections}) => {
    // Weapons renamed after release ("Sword, Gladius" -> "Gladius").
    const renamedWeapons = {'Sword, Falx': 'Falx', 'Sword, Gladius': 'Gladius', 'Sword, Long': 'Longsword', 'Sword, Long, Spatha': 'Spatha', 'Unarmed Strike': 'Unarmed'};
    (sections.repeating_weapon || []).forEach((rowId) => {
      const key = `repeating_weapon_${rowId}_name`;
      if (renamedWeapons[attributes[key]]) { attributes[key] = renamedWeapons[attributes[key]]; }
    });
  
    const book = ccSpellbooks[attributes.magical_tradition] || {};
    (sections.repeating_spell || []).forEach((rowId) => {
      const prefix = `repeating_spell_${rowId}_`;
      const profile = book[attributes[`${prefix}name`]];
      if (profile && !attributes[`${prefix}skill`]) {
        Object.keys(profile).forEach((field) => {
          attributes[`${prefix}${field}`] = profile[field];
        });
      }
      // Spells filled before Damage & Effects existed.
      if (profile && profile.damage_effects && !attributes[`${prefix}damage_effects`]) {
        attributes[`${prefix}damage_effects`] = profile.damage_effects;
      }
      ccSetSpellAttackMarker(attributes, prefix);
    });
    (sections.repeating_specialrule || []).forEach((rowId) => {
      const prefix = `repeating_specialrule_${rowId}_`;
      const name = attributes[`${prefix}name`];
      const key = ccFindSpecialRule(name);
      if (!key) { return; }
      const trailing = String(name || '').match(/(\d+)\s*$/);
      if (trailing && !attributes[`${prefix}x`]) {
        attributes[`${prefix}x`] = Number(trailing[1]);
      }
    });
  };
  k.registerFuncs({ccBackfillNamedRows}, {type: ['opener']});
  
  const ccCultures = ["Roman citizen","Germanic tribe","Ægyptus","Briton","Gaul","Greek","Foederati","Other"];
  const ccCastes = ["Outcast","Servant","Plebeian","Freedman","Noble"];
  const ccSpecializations = {"Mystic":["Lupercus","Staff Bearer"],"Sage":["Engineer","Medicus"],"Schemer":["Frumentarius","Magistrate"],"Scoundrel":["Robber","Sicarius"],"Scout":["Hunter","Veles"],"Soldier":["Berserker","Legionary"]};
  
  // The Player/NPC switch (npc_sheet). Switching to NPC restores the last
  // tier (Toughened the first time); switching to Player remembers it.
  // Setting character_type reruns everything that reads it.
  const ccSetSheetMode = ({attributes}) => {
    const npc = Number(attributes.npc_sheet) === 1;
    if (npc && !ccIsNpc(attributes)) {
      attributes.character_type = ccNpcTiers.includes(attributes.npc_last_tier) ? attributes.npc_last_tier : 'toughened';
    } else if (!npc && ccIsNpc(attributes)) {
      attributes.npc_last_tier = attributes.character_type;
      attributes.character_type = 'pc';
    }
  };
  // The switch follows character_type when that changes some other way.
  const calcNpcSheet = ({attributes}) => (ccIsNpc(attributes) ? 1 : 0);
  k.registerFuncs({ccSetSheetMode, calcNpcSheet});
  
  // Sync the archetype marker radios with Archetype.
  const calcArchetypeMarker = ({attributes}) => {
    const archetype = String(attributes.archetype || '').toLowerCase();
    return ccSpecializations[attributes.archetype] ? archetype : 'none';
  };
  k.registerFuncs({calcArchetypeMarker});
  
  // A new archetype clears a specialization that belongs to another one.
  const ccCheckSpecialization = ({attributes}) => {
    const allowed = ccSpecializations[attributes.archetype] || [];
    if (attributes.specialization && !allowed.includes(attributes.specialization)) {
      attributes.specialization = '';
    }
  };
  k.registerFuncs({ccCheckSpecialization});
  
  // The dropdown option matching a free-text value: same text ignoring case
  // and accents, or an option that starts with it ("Roman" -> "Roman
  // citizen"). Unmatched values are kept as they are.
  const ccMatchOption = (value, options) => {
    const plain = (text) => String(text || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/Æ/g, 'Ae').replace(/æ/g, 'ae').trim().toLowerCase();
    const wanted = plain(value);
    if (!wanted || options.includes(value)) { return value; }
    return options.find((option) => plain(option) === wanted) ||
      options.find((option) => plain(option).startsWith(`${wanted} `)) ||
      value;
  };
  
  // Culture, Caste, Archetype and Specialization used to be free text; match
  // old and imported values to the dropdowns on sheet open.
  const ccNormalizeIdentity = (attributes) => {
    const match = (field, options) => {
      const value = ccMatchOption(attributes[field], options);
      if (value !== attributes[field]) { attributes[field] = value; }
    };
    match('culture', ccCultures);
    match('caste', ccCastes);
    match('archetype', Object.keys(ccSpecializations));
    match('specialization', Object.values(ccSpecializations).flat());
    // A known specialization with no archetype implies the archetype.
    if (!ccSpecializations[attributes.archetype]) {
      const owner = Object.keys(ccSpecializations)
        .find((archetype) => ccSpecializations[archetype].includes(attributes.specialization));
      if (owner && !attributes.archetype) { attributes.archetype = owner; }
    }
    attributes.archetype_marker = calcArchetypeMarker({attributes});
  };
  
  
  
  // Traditional uses Insight, Research Reason, Dabbling Will.
  //
  // NPCs use "Spellcaster (Attribute) X": base Power 2 plus that attribute's
  // bonus.
  const calcSpellcastingAttribute = ({attributes}) => {
    const type = attributes.spellcasting_type || '';
    if (type.startsWith('npc_')) { return ccCapitalize(type.slice(4)); }
    if (type === 'traditional') { return 'Insight'; }
    if (type === 'research') { return 'Reason'; }
    if (type === 'dabbling') { return 'Will'; }
    return '';
  };
  k.registerFuncs({calcSpellcastingAttribute});
  
  // Base Power: 2 for Traditional/Research, 1 for Dabbling.
  const calcBasePower = ({attributes}) => {
    const type = attributes.spellcasting_type;
    if (type === 'dabbling') { return 1; }
    if (type === 'traditional' || type === 'research' || String(type).startsWith('npc_')) { return 2; }
    return 0;
  };
  k.registerFuncs({calcBasePower});
  
  // Power Rating = Base Power + the casting attribute's bonus. An NPC's stat
  // block Power wins when filled in.
  const calcPowerRating = ({attributes}) => {
    const book = ccNpcBookValue(attributes, 'npc_power');
    if (book !== null) { return book; }
    const base = Number(attributes.base_power) || 0;
    const attr = (attributes.spellcasting_attribute || '').toLowerCase();
    const rating = attr ? attributes[`${attr}_rating`] : 0;
    return base + ccAttributeBonus(rating);
  };
  k.registerFuncs({calcPowerRating});
  
  // Sync the tradition marker radios with Magical Tradition.
  const calcTraditionMarker = ({attributes}) => attributes.magical_tradition;
  k.registerFuncs({calcTraditionMarker});
  
  // Sync the PC/NPC marker with Character Type.
  const calcSpellsTypeMarker = ({attributes}) => (ccIsNpc(attributes) ? 'npc' : 'pc');
  k.registerFuncs({calcSpellsTypeMarker});
  
  // Spell data keyed by tradition, then name (source/data/spells.json).
  const ccSpellbooks = {"runic":{"Blessing of Fylgjur":{"skill":"Medicine","difficulty":"3","cost":"4 Drain","duration":"Instant","category":"Ward spell"},"Bounty of Baldr":{"skill":"Resilience","difficulty":"2","cost":"3 Drain","duration":"Power rating in rounds","category":"Ward spell"},"Curse of Loki":{"skill":"Persuasion","difficulty":"2","cost":"5 Drain","duration":"Instant","category":"Attack spell","damage_effects":"2, Stun"},"Hammer of Thunraz":{"skill":"Fighting","difficulty":"2","cost":"4 Drain, Piercing 1","duration":"Instant","category":"Attack spell","damage_effects":"2, Area"},"Ravens of Wodan":{"skill":"Academia","difficulty":"2","cost":"4 Drain, Piercing 1","duration":"Power rating in rounds","category":"Ward spell"},"Swiftness of Sleipnir":{"skill":"Survival","difficulty":"2","cost":"3 Drain","duration":"Instant","category":"Blessing spell"},"Wisdom of Frigg":{"skill":"Observation","difficulty":"1","cost":"3 Drain, Stun","duration":"Instant","category":"Divination spell"}},"oracular":{"Augury":{"skill":"Observation","difficulty":"2","cost":"3 Drain","duration":"Up to 24 hours","category":"Manifestation spell"},"Guiding Hand":{"skill":"Tactics","difficulty":"2","cost":"2 Drain, Piercing 1","duration":"24 hours","category":"Blessing spell"},"Invoke the Parcae":{"skill":"Persuasion","difficulty":"4","cost":"4 Drain, Stun","duration":"Instant","category":"Blessing or curse spell"},"Prescience":{"skill":"Observation","difficulty":"3","cost":"4 Drain","duration":"Up to 24 hours","category":"Blessing spell"},"Scrying":{"skill":"Observation","difficulty":"2","cost":"2 Drain, Piercing 1","duration":"Power rating in rounds","category":"Divination spell"},"Second Sight":{"skill":"Observation","difficulty":"2","cost":"3 Drain, Piercing 1","duration":"One hour","category":"Blessing spell"}},"celtic":{"Bounties of the Dagda":{"skill":"Medicine","difficulty":"2","cost":"4 Drain","duration":"Instant","category":"Ward spell"},"Cyclone of Cernunnos":{"skill":"Survival","difficulty":"2","cost":"4 Drain, Piercing 1","duration":"Power rating in rounds","category":"Summoning spell"},"Gaze of Balor":{"skill":"Persuasion","difficulty":"2 (target opposes with Will + Resilience)","cost":"5 Drain, Stun","duration":"Instant","category":"Attack spell","damage_effects":"2, Intense"},"Gift of Arduinna":{"skill":"Survival","difficulty":"3","cost":"4 Drain","duration":"Power rating in rounds, shared evenly among the targets (round down)","category":"Blessing spell"},"Horn of Néit":{"skill":"Survival","difficulty":"1","cost":"4 Drain","duration":"Power rating in rounds","category":"Curse spell"},"The Ogham Sign":{"skill":"Academia","difficulty":"3","cost":"5 Drain, Piercing 1","duration":"Instant","category":"Banishment spell","damage_effects":"2, Drain, Piercing 2"},"Roots of the Earth":{"skill":"Survival","difficulty":"2","cost":"3 Drain, Stun","duration":"Instant","category":"Blessing spell"},"Spear of Lug":{"skill":"Fighting","difficulty":"3","cost":"5 Drain, Piercing 1","duration":"Instant","category":"Attack spell","damage_effects":"2, Piercing 3"}},"cthulhu":{"Call of the Deep":{"skill":"Resilience","difficulty":"2 (target opposes with Will + Resilience)","cost":"5 Drain","duration":"Rest of the scene","category":"Curse spell"},"Curse of Cthulhu":{"skill":"Academia","difficulty":"2","cost":"4 Drain, Piercing 1","duration":"Instant","category":"Attack spell","damage_effects":"2, Stun, Piercing 1"},"Echo of the Ocean":{"skill":"Persuasion","difficulty":"1","cost":"2 Drain","duration":"Power in rounds","category":"Blessing spell"},"Gift of Cthulhu":{"skill":"Survival","difficulty":"2 (an unwilling target opposes with Will + Resilience, difficulty 2)","cost":"4 Drain, Piercing 1","duration":"Power in days (you may end it sooner)","category":"Transmutation spell"},"Pool of Limpid Bliss":{"skill":"Resilience","difficulty":"3","cost":"5 Drain","duration":"Rest of the scene","category":"Manifestation spell"},"Swimmer in the Elder Current":{"skill":"Survival","difficulty":"2","cost":"4 Drain, Stun","duration":"Instant","category":"Blessing spell"},"Wave Storm":{"skill":"Survival","difficulty":"2","cost":"5 Drain, Piercing 1","duration":"Power in rounds","category":"Summoning spell"}},"mormo":{"Acidic Transformation":{"skill":"Medicine","difficulty":"3","cost":"6 Drain, Piercing 2","duration":"-","category":"Transmutation spell"},"Black Goat's Blessing":{"skill":"Resilience","difficulty":"3","cost":"4 Drain","duration":"Rest of the scene","category":"Blessing spell"},"Call the Corpse Eaters":{"skill":"Persuasion","difficulty":"1 + number of ghoul mobs","cost":"5 Drain, Piercing 2","duration":"Rest of the scene","category":"Summoning spell"},"Foul Birthing":{"skill":"Survival","difficulty":"3","cost":"4 Drain","duration":"Rest of the scene","category":"Curse spell"},"Necrophagus":{"skill":"Medicine","difficulty":"4","cost":"5 Drain","duration":"Instant","category":"Attack spell","damage_effects":"2"},"Sacrificial Rebirth":{"skill":"Survival","difficulty":"4","cost":"5 Drain, Piercing 3","duration":"Rest of the scene","category":""},"Whisper of the Woods":{"skill":"Survival","difficulty":"2","cost":"3 Drain","duration":"Rest of the scene","category":"Summoning spell"}},"nyarlathotep":{"Delirium of the Dark Pharaoh":{"skill":"Persuasion","difficulty":"2","cost":"5 Drain","duration":"Instant","category":"Control spell"},"Lesser Black Rain":{"skill":"Fighting","difficulty":"2","cost":"4 Drain, Piercing 1","duration":"Power rating in rounds","category":"Manifestation spell"},"Mask of the Faceless Sphinx":{"skill":"Academia","difficulty":"2","cost":"4 Drain, Persistent 3","duration":"Power rating in rounds","category":"Blessing spell"},"Rays of the Black Sun":{"skill":"Fighting","difficulty":"3","cost":"5 Drain, Piercing 1","duration":"Instant","category":"Attack spell","damage_effects":"2, Piercing 1, Snare"},"The Nameless Mists":{"skill":"Academia","difficulty":"2","cost":"5 Drain","duration":"Power in rounds","category":"Manifestation spell"},"The Shape of Hate":{"skill":"Academia","difficulty":"2","cost":"4 Drain, Piercing 1","duration":"Power rating in rounds","category":"Blessing spell"},"Touch of the Black Sun":{"skill":"Fighting","difficulty":"2","cost":"4 Drain, Piercing 1","duration":"Instant","category":"Attack spell","damage_effects":"2, Area, Persistent 4"}},"yog_sothoth":{"Binding of Yog-Sothoth":{"skill":"Persuasion","difficulty":"2","cost":"5 Drain","duration":"Instant","category":"Control spell","damage_effects":"2, Snare"},"Foetid Touch of Aforgomon":{"skill":"Fighting","difficulty":"3 (target opposes with Agility + Fighting, difficulty 3)","cost":"7 Drain","duration":"Instant","category":"Attack spell","damage_effects":"1, Persistent 3"},"Gaze of the Multiverse":{"skill":"Academia","difficulty":"3","cost":"5 Drain, Piercing 2","duration":"Instant","category":"Attack spell","damage_effects":"2, Stun"},"Loathsome Bond of 'Umr at-Tawil":{"skill":"Persuasion","difficulty":"2","cost":"4 Drain","duration":"Instant","category":"Attack spell","damage_effects":"2, Drain, Piercing 1"},"Way of the Gatekeeper":{"skill":"Academia","difficulty":"2","cost":"5 Drain, Piercing 2","duration":"Instant","category":"Manifestation spell"},"Spheres of Yog-Sothoth":{"skill":"Fighting","difficulty":"Number of spheres (1-3)","cost":"5 Drain","duration":"Instant","category":"Attack spell","damage_effects":"2, Drain, Stun"}}};
  // Every field a spell fills or the player types into its row.
  const ccSpellFields = ['skill', 'difficulty', 'cost', 'duration', 'category', 'damage_effects', 'effect', 'momentum'];
  
  // Choosing a different spell clears the row's other fields, so nothing is
  // left over from the previous spell, then fills in the new spell's
  // mechanics. Each stays editable afterwards.
  const ccApplySpellPreset = ({trigger, attributes}) => {
    const [section, rowID] = k.parseRepeatName(trigger.name);
    const prefix = `${section}_${rowID}_`;
    const tradition = attributes.magical_tradition;
    const book = tradition && ccSpellbooks[tradition];
    const profile = book && book[attributes[`${prefix}name`]];
    ccSpellFields.forEach((field) => {
      if (attributes[`${prefix}${field}`]) { attributes[`${prefix}${field}`] = ''; }
    });
    Object.keys(profile || {}).forEach((field) => {
      attributes[`${prefix}${field}`] = profile[field];
    });
    ccSetSpellAttackMarker(attributes, prefix);
  };
  k.registerFuncs({ccApplySpellPreset});
  
  // An attack spell has "attack" in its Category, or a Damage & Effects
  // entry; its hidden marker shows the Damage & Effects field.
  const ccSetSpellAttackMarker = (attributes, prefix) => {
    const isAttack = /attack/i.test(attributes[`${prefix}category`] || '') ||
      String(attributes[`${prefix}damage_effects`] || '').trim() !== '';
    const marker = isAttack ? 1 : 0;
    if (Number(attributes[`${prefix}spell_attack`]) !== marker) {
      attributes[`${prefix}spell_attack`] = marker;
    }
  };
  const ccUpdateSpellAttack = ({trigger, attributes}) => {
    const [section, rowID] = k.parseRepeatName(trigger.name);
    ccSetSpellAttackMarker(attributes, `${section}_${rowID}_`);
  };
  k.registerFuncs({ccUpdateSpellAttack});
  
  // The info button: folds the row's Effect and Momentum in or out (open by
  // default).
  const ccToggleSpellInfo = ({trigger, attributes}) => {
    const [section, rowID] = k.parseRepeatName(trigger.name);
    const key = `${section}_${rowID}_effect_open`;
    attributes[key] = attributes[key] === 'closed' ? 'open' : 'closed';
  };
  k.registerFuncs({ccToggleSpellInfo});
  
  // The leading number of a free-text Difficulty.
  const ccParseLeadingNumber = (text) => {
    const match = String(text || '').match(/\d+/);
    return match ? Number(match[0]) : 0;
  };
  
  // Cost reads like "4 Drain" or "5 Drain, Piercing 1": a Challenge Dice
  // count with its first effect, then more effects. Drain is a normal effect,
  // applied only when an Effect is rolled.
  const ccParseSpellCost = (text) => {
    const segments = String(text || '').split(',').map((s) => s.trim()).filter(Boolean);
    const [first, ...rest] = segments;
    const match = (first || '').match(/^(\d+)\s*(.*)$/);
    const diceCount = match ? Number(match[1]) : 0;
    const firstEffect = match && match[2] ? match[2].trim() : '';
    return {
      diceCount,
      effects: [firstEffect, ...rest].filter(Boolean),
    };
  };
  
  // Spells whose Momentum options also add Cost dice: Scrying gains 1
  // Challenge Die per Momentum spent. Other spells' Extra Momentum is tracked
  // and shown but adds no Cost dice. Kept out of spells.json so
  // ccApplySpellPreset doesn't copy it to a row attribute.
  const ccSpellMomentumCostDice = {
    'Scrying': 1,
  };
  
  // Spells whose Cost roll generates Threat: Curse of Loki, 1 Threat per
  // damage effect rolled. Kept out of the cost string, which ccParseSpellCost
  // would misread as an effect.
  const ccSpellCostThreatPerEffect = {
    'Curse of Loki': 1,
    'Call of the Deep': 1,
    'Delirium of the Dark Pharaoh': 1,
    'The Nameless Mists': 1,
    'Foetid Touch of Aforgomon': 1,
    "Loathsome Bond of 'Umr at-Tawil": 1,
    'Spheres of Yog-Sothoth': 1,
  };
  
  // Each skill's magic focus. A caster who has the focus for a spell's skill
  // rolls it as a focus roll: every die at or under the skill's ranks is a
  // critical success.
  const ccMagicFocuses = {
    academia: 'Religion',
    fighting: 'War Magic',
    medicine: 'Faith Healing',
    observation: 'Instincts',
    persuasion: 'Invocation',
    resilience: 'Discipline',
    survival: 'Mysticism',
    tactics: 'Omen Reading',
  };
  
  // Casting roll: Spellcasting Attribute + the spell's Skill vs its
  // Difficulty, with the Cost rolled in the same message. The cost is paid
  // whether or not the spell succeeds.
  //
  // Attack spells (a Damage & Effects entry) also roll damage like a weapon:
  // Power plus the listed rating in Challenge Dice, with the listed effects,
  // and each Momentum (Threat for an adversary) spent on Spell Effects adds 1
  // Challenge Die, up to 3. The dice are always rolled, but only shown,
  // counted and paid on a pass. No attribute bonus damage is added (it is
  // already in Power).
  const initiateSpellRoll = async ({trigger, attributes}) => {
    const [section, rowID] = k.parseRepeatName(trigger.name);
    const prefix = `${section}_${rowID}_`;
    const spellName = attributes[`${prefix}name`] || 'Spell';
    const skillName = attributes[`${prefix}skill`] || '';
    const skillSlug = skillName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
    const skillRanks = Number(attributes[`${skillSlug}_ranks`]) || 0;
    // The focus checkbox's attribute, named as in components/_focus.pug. A
    // ticked box holds "on" (no value attribute) or 1 (imported NPCs).
    const focusName = ccMagicFocuses[skillSlug] || '';
    const focusSlug = focusName.toLowerCase().replace(/[^a-z0-9]+/g, '_');
    const hasFocus = Boolean(focusName && attributes[`${skillSlug}_focus_${focusSlug}_known`]);
    // A natural 1 is always a critical success.
    const critMax = hasFocus ? Math.max(1, skillRanks) : 1;
  
    const castAttr = (attributes.spellcasting_attribute || '').toLowerCase();
    const attributeRating = Number(attributes[`${castAttr}_rating`]) || 0;
    const autoSuccesses = ccExtraordinary(attributes, castAttr);
  
    const difficultyDefault = ccParseLeadingNumber(attributes[`${prefix}difficulty`]) || 1;
    const {diceCount: costDiceCount, effects: costEffects} = ccParseSpellCost(attributes[`${prefix}cost`]);
    const costDicePerMomentum = ccSpellMomentumCostDice[spellName] || 0;
    const {baseRating: damageRating, effects: damageEffects} = ccParseDamageEffects(attributes[`${prefix}damage_effects`]);
    const hasDamage = damageRating > 0;
  
    // A Dabbler casts at Power 1 or 3 (plus their Will bonus). At 3, every
    // Effect rolled on the spell's Challenge Dice (Cost, and Damage on a
    // pass) generates 1 Threat, so it is settled after the roll.
    const isDabbling = attributes.spellcasting_type === 'dabbling';
    const spellPowerQuery = '?{Spell Power (3 costs 1 Threat per Effect rolled)|1|3}';
    // Power, as in the Power Rating field. A Dabbler's chosen Power (1 or 3)
    // replaces their Base Power of 1, so the damage roll reuses the query.
    const powerRating = calcPowerRating({attributes});
    const powerExpr = isDabbling ?
      `(${powerRating - (Number(attributes.base_power) || 0)}+${spellPowerQuery})` :
      `${powerRating}`;
  
    const difficultyQuery = `?{Difficulty|${difficultyDefault}}`;
    const complicationQuery = '?{Complication range (1-5)|1}';
    const bonusDiceQuery = ccBonusDiceQuery(attributes);
    // The same query text in extra_momentum, cost_dice and damage_dice:
    // Roll20 asks once and reuses the answer. An attack spell's Extra
    // Momentum is what it spends on its Spell Effects (damage dice).
    const extraMomentumQuery = hasDamage ?
      `?{Extra ${ccPoolName(attributes)} spent on Spell Effects|0}` :
      `?{Extra ${ccPoolName(attributes)} spent|0}`;
  
    const rollString = '&{template:ccskill} ' +
      `{{character_name=@{character_name}}} ` +
      `{{skill=${spellName}}} ` +
      (skillName ? `{{focus=${skillName}${hasFocus ? `: ${focusName}` : ''}}} ` : '') +
      `{{attribute_choice=[[0+${attributeRating}]]}} ` +
      `{{difficulty=[[0+${difficultyQuery}]]}} ` +
      `{{complication_range=[[0+${complicationQuery}]]}} ` +
      `{{roll1=[[(2+${bonusDiceQuery})d20]]}} ` +
      `{{extra_momentum=[[0+${extraMomentumQuery}]]}} ` +
      (isDabbling ? `{{spell_power=[[0+${spellPowerQuery}]]}} ` : '') +
      `{{target_number=[[0]]}} ` +
      `{{successes=[[0]]}} ` +
      `{{dice_text=[[0]]}} ` +
      `{{outcome=[[0]]}} ` +
      `{{complications=[[0]]}} ` +
      `{{bonus_momentum=[[0]]}} ` +
      `{{momentum_spent=[[0]]}} ` +
      `{{dabbling_power_threat=[[0]]}} ` +
      `{{auto_successes=[[0]]}} ` +
      `{{pool=${ccPoolName(attributes)}}} ` +
      `{{is_spell=1}} ` +
      (hasDamage ?
        `{{has_damage=1}} ` +
        `{{extra_damage=[[0]]}} ` +
        `{{spell_power_damage=[[0+${powerExpr}]]}} ` +
        `{{damage_dice=[[(${damageRating}+${powerExpr}+(${extraMomentumQuery}))d6]]}} ` +
        `{{total_damage=[[0]]}} ` +
        `{{effect_count=[[0]]}} ` +
        `{{damage_dice_text=[[0]]}} ` +
        `{{effects_summary=[[0]]}} ` : '') +
      `{{cost_dice=[[(${Math.max(0, costDiceCount)}+(${extraMomentumQuery})*${costDicePerMomentum})d6]]}} ` +
      `{{cost_total=[[0]]}} ` +
      `{{cost_effect_count=[[0]]}} ` +
      `{{cost_dice_text=[[0]]}} ` +
      `{{cost_effects_summary=[[0]]}} ` +
      `{{cost_threat_generated=[[0]]}}`;
  
    const roll = await startRoll(rollString);
  
    try {
      const difficulty = Number(roll.results.difficulty.result) || 1;
      const complicationRange = Number(roll.results.complication_range.result) || 1;
      const extraMomentum = Number(roll.results.extra_momentum.result) || 0;
  
      const dice = ccTestDice(roll.results.roll1);
  
      // Crits on a die <= critMax (the skill's ranks with its magic focus,
      // else 1).
      const targetNumber = attributeRating + skillRanks;
      const complicationThreshold = 21 - complicationRange;
      const critCount = dice.filter((d) => d <= critMax).length;
      const successCount = dice.filter((d) => d <= targetNumber).length + critCount + autoSuccesses;
      const complicationCount = dice.filter((d) => d >= complicationThreshold).length;
      const passed = successCount >= difficulty;
  
      // Momentum is only spent on a pass, so a failure pays no Extra Momentum
      // and doesn't count Scrying's extra Cost dice.
      // An attack spell pays only for the damage dice it can add (3).
      const extraDamageDice = hasDamage && passed ? Math.min(3, Math.max(0, extraMomentum)) : 0;
      const momentumSpent = hasDamage ? extraDamageDice : (passed ? extraMomentum : 0);
      const rawCostDice = ccRollDice(roll.results.cost_dice);
      const countedCostDice = passed ? rawCostDice : rawCostDice.slice(0, Math.max(0, costDiceCount));
  
      const converted = countedCostDice.map(ccChallengeDieFromD6);
      const effectCount = converted.filter((c) => c.effect).length;
      const totalCost = converted.reduce((sum, c) => sum + c.pips, 0) +
        effectCount * ccViciousBonus(costEffects);
      const effectsSummary = effectCount > 0 ?
        `${effectCount}x Effect${costEffects.length ? ` - ${costEffects.join(', ')}` : ''}` :
        'No Effects triggered';
      // Threat from the Cost's Effects is the GM's gain, so an adversary's
      // spell generates none.
      const powerDamage = hasDamage ? Math.max(0, Number(roll.results.spell_power_damage.result) || 0) : 0;
      const damageDice = hasDamage ?
        ccRollDice(roll.results.damage_dice).slice(0, powerDamage + damageRating + extraDamageDice).map(ccChallengeDieFromD6) : [];
      const damageEffectCount = damageDice.filter((c) => c.effect).length;
      const totalDamage = damageDice.reduce((sum, c) => sum + c.pips, 0) +
        damageEffectCount * ccViciousBonus(damageEffects);
      const damageEffectsSummary = damageEffectCount > 0 ?
        `${damageEffectCount}x Effect${damageEffects.length ? ` - ${damageEffects.join(', ')}` : ''}` :
        'No Effects triggered';
      const costThreatGenerated = ccIsAdversary(attributes) ? 0 :
        effectCount * (ccSpellCostThreatPerEffect[spellName] || 0);
      // A Dabbler at Power 3: 1 Threat per Effect on the Cost dice and, on a
      // pass, the Damage dice.
      const spellPower = isDabbling ? (Number(roll.results.spell_power.result) || 1) : 0;
      const dabblingPowerThreat = spellPower === 3 ? effectCount + (passed ? damageEffectCount : 0) : 0;
  
      const spellBonusMomentum = passed ? Math.max(0, successCount - difficulty) : 0;
      const spellBonusDiceCount = Math.max(0, dice.length - 2);
      // ccSettleRoll is in views/_global_sheetworker.pug.
      const spellPoolSpent = await ccSettleRoll({
        attributes,
        generated: spellBonusMomentum,
        bonusDiceCount: spellBonusDiceCount,
        extraSpent: momentumSpent,
        complications: complicationCount,
        extraThreat: dabblingPowerThreat + costThreatGenerated,
      });
  
      finishRoll(roll.rollId, {
        target_number: targetNumber,
        successes: successCount,
        dice_text: dice.join(', '),
        outcome: passed ? 1 : 0,
        bonus_momentum: spellBonusMomentum,
        complications: complicationCount,
        extra_momentum: momentumSpent,
        momentum_spent: spellPoolSpent,
        auto_successes: autoSuccesses,
        dabbling_power_threat: dabblingPowerThreat,
        cost_total: totalCost,
        cost_effect_count: effectCount,
        cost_threat_generated: costThreatGenerated,
        cost_dice_text: converted.map((c) => c.symbol).join(' '),
        cost_effects_summary: effectsSummary,
        ...(hasDamage ? {
          extra_damage: extraDamageDice,
          spell_power_damage: powerDamage,
          total_damage: totalDamage,
          effect_count: damageEffectCount,
          damage_dice_text: damageDice.map((c) => c.symbol).join(' '),
          effects_summary: damageEffectsSummary,
        } : {}),
      });
    } catch (err) {
      finishRoll(roll.rollId, {
        target_number: '?',
        successes: '?',
        dice_text: `error: ${err.message}`,
        outcome: 0,
        complications: 0,
        cost_total: '?',
        cost_effect_count: '?',
        cost_dice_text: `error: ${err.message}`,
        cost_effects_summary: '',
        ...(hasDamage ? {
          total_damage: '?',
          effect_count: '?',
          damage_dice_text: `error: ${err.message}`,
          effects_summary: '',
        } : {}),
      });
    }
  };
  k.registerFuncs({initiateSpellRoll});
  
  
  const calcBaseArmour = ({attributes}) => ccAttributeBonus(attributes.brawn_rating);
  k.registerFuncs({calcBaseArmour});
  
  const calcCourage = ({attributes}) => {
    const book = ccNpcBookValue(attributes, 'npc_courage');
    return book !== null ? book : ccAttributeBonus(attributes.will_rating);
  };
  k.registerFuncs({calcCourage});
  
  const calcTotalArmor = ({attributes}) => {
    const book = ccNpcBookValue(attributes, 'npc_armor');
    if (book !== null) { return book; }
    const base = ccAttributeBonus(attributes.brawn_rating);
    const armorRows = attributes.repeating_armor || [];
    const armorSum = armorRows.reduce((sum, row) => sum + (Number(row.resistance) || 0), 0);
    return base + armorSum;
  };
  k.registerFuncs({calcTotalArmor});
  
  // Raw Max Stress: the higher of Brawn or Will, plus Resilience, plus 3 for
  // Unyielding (matched by name, ignoring case and spacing). calcStressMax
  // and the Fatigue cap both use this.
  //
  // NPCs: Troopers halve it, rounding up. A stat block value overrides it.
  const ccStressMaxBase = (attributes) => {
    const book = ccNpcBookValue(attributes, 'npc_stress');
    if (book !== null) { return book; }
    const resilience = Number(attributes.resilience_ranks) || 0;
    const brawn = Number(attributes.brawn_rating) || 0;
    const will = Number(attributes.will_rating) || 0;
    const base = Math.max(brawn, will) + resilience;
    if (attributes.character_type === 'trooper') { return Math.ceil(base / 2); }
    if (ccIsNpc(attributes)) { return base; }
    const talents = attributes.repeating_talent || [];
    const hasUnyielding = talents.some((row) => String(row.name || '').trim().toLowerCase() === 'unyielding');
    return base + (hasUnyielding ? 3 : 0);
  };
  
  const calcStressMaxBase = ({attributes}) => ccStressMaxBase(attributes);
  k.registerFuncs({calcStressMaxBase});
  
  // Current Max: Max Stress less Fatigue, floored at 0, unless Ignore Fatigue
  // is checked.
  const calcStressMax = ({attributes}) => {
    const fatigue = attributes.fatigue_ignored ? 0 : (Number(attributes.fatigue) || 0);
    return Math.max(0, ccStressMaxBase(attributes) - fatigue);
  };
  k.registerFuncs({calcStressMax});
  
  // Injury limit: 3 for PCs and Nemesis, 2 for Toughened, 1 for Troopers. A
  // stat block value (which includes Tough X) overrides it.
  const calcInjuryLimit = ({attributes}) => {
    const book = ccNpcBookValue(attributes, 'npc_injuries');
    if (book !== null) { return book; }
    return {trooper: 1, toughened: 2}[attributes.character_type] || 3;
  };
  k.registerFuncs({calcInjuryLimit});
  
  // Every Stress, Fortune and Fatigue box. A click sets the track to that
  // box's value; clicking box 1 when it is the only box filled clears the
  // track. trigger.name arrives dash-separated ('stress-box-5').
  const ccTrackBoxClick = ({trigger, attributes}) => {
    const match = /^(stress|fortune|fatigue)-box-(\d+)$/.exec(trigger.name);
    if (!match) { return; }
    const [, track, posStr] = match;
    const position = Number(posStr);
    const current = Number(attributes[track]) || 0;
    attributes[track] = (position === 1 && current === 1) ? 0 : position;
  };
  k.registerFuncs({ccTrackBoxClick});
  
  // Fatigue resist: difficulty 1, the higher of Brawn or Will + Resilience. A
  // pass removes 1 fatigue, plus 1 per Momentum spent. The Momentum is a
  // query, charged like a spell's Extra Momentum and only applied on a pass.
  //
  // k-scaffold saves the sheet when this function returns its promise, before
  // the roll comes back, so the new Fatigue and the Current Max it changes
  // are saved here with attributes.set().
  const initiateFatigueResistRoll = async ({attributes}) => {
    const brawnRating = Number(attributes.brawn_rating) || 0;
    const willRating = Number(attributes.will_rating) || 0;
    const resilienceRanks = Number(attributes.resilience_ranks) || 0;
    const attributeRating = Math.max(brawnRating, willRating);
  
    const difficultyQuery = '?{Difficulty|1}';
    const complicationQuery = '?{Complication range (1-5)|1}';
    const bonusDiceQuery = ccBonusDiceQuery(attributes);
    const extraMomentumQuery = `?{${ccPoolName(attributes)} spent to remove extra fatigue|0}`;
    const extraordinary = ccExtraordinary(attributes, brawnRating >= willRating ? 'brawn' : 'will');
  
    const rollString = '&{template:ccskill} ' +
      `{{character_name=@{character_name}}} ` +
      `{{skill=Resist Fatigue}} ` +
      `{{focus=Resilience}} ` +
      `{{attribute_choice=[[0+${attributeRating}]]}} ` +
      `{{difficulty=[[0+${difficultyQuery}]]}} ` +
      `{{complication_range=[[0+${complicationQuery}]]}} ` +
      `{{roll1=[[(2+${bonusDiceQuery})d20]]}} ` +
      `{{extra_momentum=[[0+${extraMomentumQuery}]]}} ` +
      `{{target_number=[[0]]}} ` +
      `{{successes=[[0]]}} ` +
      `{{dice_text=[[0]]}} ` +
      `{{outcome=[[0]]}} ` +
      `{{complications=[[0]]}} ` +
      `{{bonus_momentum=[[0]]}} ` +
      `{{momentum_spent=[[0]]}} ` +
      `{{fatigue_removed=[[0]]}} ` +
      `{{auto_successes=[[0]]}} ` +
      `{{pool=${ccPoolName(attributes)}}}`;
  
    const roll = await startRoll(rollString);
  
    try {
      const difficulty = Number(roll.results.difficulty.result) || 1;
      const complicationRange = Number(roll.results.complication_range.result) || 1;
      const extraMomentum = Number(roll.results.extra_momentum.result) || 0;
  
      const dice = ccTestDice(roll.results.roll1);
  
      // Crit only on a natural 1: no Focus applies.
      const targetNumber = attributeRating + resilienceRanks;
      const complicationThreshold = 21 - complicationRange;
      const successCount = dice.filter((d) => d <= targetNumber).length +
        dice.filter((d) => d <= 1).length + extraordinary;
      const complicationCount = dice.filter((d) => d >= complicationThreshold).length;
      const passed = successCount >= difficulty;
      const bonusMomentum = passed ? Math.max(0, successCount - difficulty) : 0;
      const bonusDiceCount = Math.max(0, dice.length - 2);
  
      // Remove fatigue on a pass, floored at 0.
      const momentumSpent = passed ? extraMomentum : 0;
      const fatigueRemoved = passed ? 1 + momentumSpent : 0;
      const fatigueBefore = Number(attributes.fatigue) || 0;
      if (fatigueRemoved > 0 && fatigueBefore > 0) {
        attributes.fatigue = Math.max(0, fatigueBefore - fatigueRemoved);
        attributes.queue.push('stress_max', 'stress_max_marker');
        attributes.set();
      }
  
      // ccSettleRoll is in views/_global_sheetworker.pug.
      const poolSpent = await ccSettleRoll({
        attributes, generated: bonusMomentum, bonusDiceCount, extraSpent: momentumSpent, complications: complicationCount,
      });
  
      finishRoll(roll.rollId, {
        target_number: targetNumber,
        successes: successCount,
        dice_text: dice.join(', '),
        outcome: passed ? 1 : 0,
        bonus_momentum: bonusMomentum,
        complications: complicationCount,
        extra_momentum: momentumSpent,
        momentum_spent: poolSpent,
        fatigue_removed: fatigueRemoved,
        auto_successes: extraordinary,
      });
    } catch (err) {
      finishRoll(roll.rollId, {
        target_number: '?',
        successes: '?',
        dice_text: `error: ${err.message}`,
        outcome: 0,
        complications: 0,
        fatigue_removed: 0,
      });
    }
  };
  k.registerFuncs({initiateFatigueResistRoll});
  
  
  const calcAttributeBonusDamage = ({trigger, attributes}) => {
    const attrName = trigger.name.replace(/_bonus_damage$/, '');
    return ccAttributeBonus(attributes[`${attrName}_rating`]);
  };
  k.registerFuncs({calcAttributeBonusDamage});
  
  // Attribute-only roll: the TN is the rating, crit only on a natural 1.
  const initiateAttributeRoll = async ({trigger, attributes}) => {
    const attr = ccNormalizeName(trigger.name).replace(/_(roll|action)$/, '');
    const rating = Number(attributes[`${attr}_rating`]) || 0;
    // Packed like ccAttributeQuery: rating + 100 x Extraordinary bonus.
    await runCcRoll({
      attributes,
      skillLabel: ccCapitalize(attr),
      focusLabel: '',
      attributeExpr: String(rating + 100 * ccExtraordinary(attributes, attr)),
      skillRanks: 0,
      critMax: 1,
    });
  };
  k.registerFuncs({initiateAttributeRoll});
  
  
  // The rules don't fix which attribute goes with a skill, so both rolls ask
  // via ccAttributeQuery.
  //
  // Plain skill roll: crit only on a natural 1.
  const initiateSkillRoll = async ({trigger, attributes}) => {
    const skill = ccNormalizeName(trigger.name).replace(/_skill_(roll|action)$/, '');
    const skillRanks = Number(attributes[`${skill}_ranks`]) || 0;
    await runCcRoll({
      attributes,
      skillLabel: ccCapitalize(skill),
      focusLabel: '',
      attributeExpr: ccAttributeQuery(attributes),
      skillRanks,
      critMax: 1,
    });
  };
  k.registerFuncs({initiateSkillRoll});
  
  // Focus roll: crit on a die <= the skill's ranks; a natural 1 always
  // crits, even with 0 ranks.
  const initiateFocusRoll = async ({trigger, attributes}) => {
    const match = ccNormalizeName(trigger.name).match(/^(.+)_focus_(.+)_(?:roll|action)$/);
    if (!match) { return; }
    const [, skill, focusSlug] = match;
    const skillRanks = Number(attributes[`${skill}_ranks`]) || 0;
    await runCcRoll({
      attributes,
      skillLabel: ccCapitalize(skill),
      focusLabel: ccCapitalize(focusSlug),
      attributeExpr: ccAttributeQuery(attributes),
      skillRanks,
      critMax: Math.max(1, skillRanks),
    });
  };
  k.registerFuncs({initiateFocusRoll});
  
  // Edit Focuses / Done: switches the skills_edit marker.
  const ccToggleSkillsEdit = ({attributes}) => {
    attributes.skills_edit = Number(attributes.skills_edit) === 1 ? 0 : 1;
  };
  k.registerFuncs({ccToggleSkillsEdit});
  
  
  // Embedded from ccWeaponProfiles at compile time.
  const ccWeaponProfiles = {"Axe (Melee)":{"focus":"Melee Weapons","reach_range":"2","damage_effects":"3, Vicious","size":"Minor","qualities":"Special"},"Club":{"focus":"Melee Weapons","reach_range":"2","damage_effects":"2","size":"Minor","qualities":""},"Cudgel":{"focus":"Melee Weapons","reach_range":"2","damage_effects":"3, Stun","size":"Major","qualities":""},"Dagger":{"focus":"Melee Weapons","reach_range":"1","damage_effects":"2, Piercing 1","size":"Minor","qualities":"Hidden, Subtle"},"Dolabra":{"focus":"Melee Weapons","reach_range":"1","damage_effects":"3, Piercing 1","size":"Minor","qualities":""},"Javelin (Melee)":{"focus":"Melee Weapons","reach_range":"2","damage_effects":"3, Piercing 1","size":"Minor","qualities":"Special"},"Spear":{"focus":"Melee Weapons","reach_range":"3","damage_effects":"4, Piercing 1","size":"Major","qualities":""},"Staff":{"focus":"Melee Weapons","reach_range":"3","damage_effects":"2","size":"Major","qualities":"Special"},"Sword":{"focus":"Melee Weapons","reach_range":"2","damage_effects":"4","size":"Major","qualities":"Parrying"},"Falx":{"focus":"Melee Weapons","reach_range":"2","damage_effects":"4, Vicious","size":"Major","qualities":""},"Gladius":{"focus":"Melee Weapons","reach_range":"2","damage_effects":"4, Piercing 1","size":"Major","qualities":"Parrying"},"Longsword":{"focus":"Melee Weapons","reach_range":"2","damage_effects":"5","size":"Major","qualities":"Two-Handed"},"Spatha":{"focus":"Melee Weapons","reach_range":"2","damage_effects":"5, Piercing 1","size":"Major","qualities":"Two-Handed"},"Unarmed":{"focus":"Unarmed","reach_range":"0","damage_effects":"2","size":"","qualities":"Subtle"},"War Axe":{"focus":"Melee Weapons","reach_range":"2","damage_effects":"4, Vicious","size":"Major","qualities":"Two-Handed"},"Small Shield":{"focus":"Melee Weapons","reach_range":"1","damage_effects":"2, Stun","size":"Minor","qualities":"Shield 2"},"Large Shield":{"focus":"Melee Weapons","reach_range":"1","damage_effects":"3, Stun","size":"Major","qualities":"Shield 3"},"Arcuballista":{"focus":"Archery","reach_range":"Medium","damage_effects":"4, Piercing 1","size":"Major","qualities":"Accurate, Reload"},"Axe (Thrown)":{"focus":"Thrown Weapons","reach_range":"Close","damage_effects":"3, Vicious","size":"Minor","qualities":"Special"},"Bow":{"focus":"Archery","reach_range":"Medium","damage_effects":"3, Piercing 1","size":"Major","qualities":"Subtle"},"Bow, Recurve":{"focus":"Archery","reach_range":"Long","damage_effects":"4, Piercing 1","size":"Major","qualities":"Subtle"},"Javelin (Thrown)":{"focus":"Thrown Weapons","reach_range":"Medium","damage_effects":"3, Piercing 1","size":"Minor","qualities":"Special"},"Pilum":{"focus":"Thrown Weapons","reach_range":"Close","damage_effects":"4, Piercing 1","size":"Minor","qualities":"Special"},"Plumbata":{"focus":"Thrown Weapons","reach_range":"Close","damage_effects":"2, Piercing 1","size":"Minor","qualities":""},"Sling":{"focus":"Thrown Weapons","reach_range":"Long","damage_effects":"3, Stun","size":"Minor","qualities":"Inaccurate, Subtle, Special"}};
  
  // Picking a known weapon fills its Focus, Reach/Range, Damage & Effects,
  // Size and Qualities. All stay editable; "Custom / Other" leaves the row as
  // is.
  const ccApplyWeaponPreset = ({trigger, attributes}) => {
    const profile = ccWeaponProfiles[attributes[trigger.name]];
    if (!profile) { return; }
    const [section, rowID] = k.parseRepeatName(trigger.name);
    Object.keys(profile).forEach((field) => {
      attributes[`${section}_${rowID}_${field}`] = profile[field];
    });
  };
  k.registerFuncs({ccApplyWeaponPreset});
  
  // "4, Piercing 1": base Damage in Challenge Dice, then the Damage Effects.
  const ccParseDamageEffects = (text) => {
    const parts = String(text || '').split(',').map((s) => s.trim()).filter(Boolean);
    return {
      baseRating: Number(parts[0]) || 0,
      effects: parts.slice(1),
    };
  };
  
  // Weapon roll: attack and damage in one message. Damage is always rolled
  // and shown only on a pass.
  //
  // Melee: Agility + Fighting (Brawn for an NPC with Brutal X); ranged:
  // Coordination + Fighting; mental: Will + Persuasion or Survival (a query).
  // All difficulty 1. A blank Type infers melee or ranged from Focus.
  //
  // Damage: a PC's row holds the base rating, so the attribute's bonus damage
  // is added. An NPC's row holds the stat block total, so nothing is added.
  //
  // Crit range opens to Fighting's ranks when Focus is a known Fighting
  // focus (a natural 1 always crits, even with 0 ranks); mental attacks crit
  // on a natural 1.
  //
  // Extra damage dice: each Momentum (Threat for an adversary) adds 1
  // Challenge Die on a hit, up to 3. They're asked for up front and always
  // rolled, but only counted and paid for on a hit.
  const initiateWeaponRoll = async ({trigger, attributes}) => {
    const [section, rowID] = k.parseRepeatName(trigger.name);
    const prefix = `${section}_${rowID}_`;
    const weaponName = attributes[`${prefix}name`] || 'Weapon';
    const focus = attributes[`${prefix}focus`] || '';
    const damageEffects = attributes[`${prefix}damage_effects`] || '';
    const isNpc = ccIsNpc(attributes);
  
    const focusLower = focus.toLowerCase();
    const inferredType = (focusLower === 'archery' || focusLower === 'thrown weapons') ? 'ranged' : 'melee';
    // Player characters have no Type column; their attack type comes from
    // Focus.
    const attackType = (isNpc && attributes[`${prefix}attack_type`]) || inferredType;
    const isMental = attackType === 'mental';
    const isRanged = attackType === 'ranged';
  
    let attrName = isRanged ? 'coordination' : 'agility';
    if (isMental) { attrName = 'will'; }
    if (attackType === 'melee' && isNpc && ccHasSpecialRule(attributes, /^\s*brutal\b/i)) { attrName = 'brawn'; }
    const attributeRating = Number(attributes[`${attrName}_rating`]) || 0;
    const autoSuccesses = ccExtraordinary(attributes, attrName);
  
    const fightingRanks = Number(attributes.fighting_ranks) || 0;
    const focusSlug = focusLower.replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
    const knownFocus = Boolean(!isMental && focusSlug && attributes[`fighting_focus_${focusSlug}_known`]);
    const critMax = knownFocus ? Math.max(1, fightingRanks) : 1;
  
    // Mental attacks: the option value is the chosen skill's ranks.
    const persuasionRanks = Number(attributes.persuasion_ranks) || 0;
    const survivalRanks = Number(attributes.survival_ranks) || 0;
    const skillQuery = `?{Mental attack skill|Persuasion,${persuasionRanks}|Survival,${survivalRanks}}`;
  
    let bonusDamageAttr = isRanged ? 'insight' : 'brawn';
    if (isMental) { bonusDamageAttr = 'will'; }
    const bonusDamage = isNpc ? 0 : (Number(attributes[`${bonusDamageAttr}_bonus_damage`]) || 0);
  
    const {baseRating, effects} = ccParseDamageEffects(damageEffects);
    const diceCount = Math.max(1, baseRating + bonusDamage);
  
    console.log('[CC] Weapon roll:', {
      weaponName, focus, attackType, attrName, attributeRating, fightingRanks, knownFocus, critMax, diceCount, autoSuccesses,
    });
  
    const complicationQuery = '?{Complication range (1-5)|1}';
    const bonusDiceQuery = ccBonusDiceQuery(attributes);
    // Used in two fields; Roll20 asks once.
    const extraDamageQuery = `?{Extra damage dice bought with ${ccPoolName(attributes)} if the attack succeeds (0-3)|0}`;
    let focusLabel = focus;
    if (isMental) { focusLabel = 'Mental Attack'; }
  
    const rollString = '&{template:ccskill} ' +
      `{{character_name=@{character_name}}} ` +
      `{{skill=${weaponName}}} ` +
      (focusLabel ? `{{focus=${focusLabel}}} ` : '') +
      `{{attribute_choice=[[0+${attributeRating}]]}} ` +
      (isMental ? `{{skill_choice=[[0+${skillQuery}]]}} {{mental=1}} ` : '') +
      `{{difficulty=1}} ` +
      `{{complication_range=[[0+${complicationQuery}]]}} ` +
      `{{roll1=[[(2+${bonusDiceQuery})d20]]}} ` +
      `{{target_number=[[0]]}} ` +
      `{{successes=[[0]]}} ` +
      `{{dice_text=[[0]]}} ` +
      `{{outcome=[[0]]}} ` +
      `{{complications=[[0]]}} ` +
      `{{bonus_momentum=[[0]]}} ` +
      `{{momentum_spent=[[0]]}} ` +
      `{{auto_successes=[[0]]}} ` +
      `{{pool=${ccPoolName(attributes)}}} ` +
      `{{has_damage=1}} ` +
      `{{extra_damage=[[0+${extraDamageQuery}]]}} ` +
      `{{damage_dice=[[(${diceCount}+${extraDamageQuery})d6]]}} ` +
      `{{total_damage=[[0]]}} ` +
      `{{effect_count=[[0]]}} ` +
      `{{damage_dice_text=[[0]]}} ` +
      `{{effects_summary=[[0]]}}`;
  
    const roll = await startRoll(rollString);
  
    try {
      const complicationRange = Number(roll.results.complication_range.result) || 1;
      const skillRanks = isMental ? (Number(roll.results.skill_choice.result) || 0) : fightingRanks;
  
      const dice = ccTestDice(roll.results.roll1);
  
      console.log(`[CC] ${weaponName} attack roll - d20s:`, dice);
  
      const targetNumber = attributeRating + skillRanks;
      const complicationThreshold = 21 - complicationRange;
      const successCount = dice.filter((d) => d <= targetNumber).length +
        dice.filter((d) => d <= critMax).length + autoSuccesses;
      const complicationCount = dice.filter((d) => d >= complicationThreshold).length;
      const passed = successCount >= 1;
  
      // Extra damage dice count and cost only on a hit, at most 3.
      const extraDamageDice = passed ?
        Math.min(3, Math.max(0, Number(roll.results.extra_damage.result) || 0)) : 0;
      const converted = ccRollDice(roll.results.damage_dice)
        .slice(0, diceCount + extraDamageDice)
        .map(ccChallengeDieFromD6);
  
      const effectCount = converted.filter((c) => c.effect).length;
      const totalDamage = converted.reduce((sum, c) => sum + c.pips, 0) +
        effectCount * ccViciousBonus(effects);
      const effectsSummary = effectCount > 0 ?
        `${effectCount}x Effect${effects.length ? ` - ${effects.join(', ')}` : ''}` :
        'No Effects triggered';
  
      console.log(`[CC] ${weaponName} result:`, {
        targetNumber, successCount, complicationCount, passed, totalDamage, effectCount,
      });
  
      const weaponBonusMomentum = passed ? Math.max(0, successCount - 1) : 0;
      const weaponBonusDiceCount = Math.max(0, dice.length - 2);
      const weaponPoolSpent = await ccSettleRoll({
        attributes,
        generated: weaponBonusMomentum,
        bonusDiceCount: weaponBonusDiceCount,
        extraSpent: extraDamageDice,
        complications: complicationCount,
      });
  
      finishRoll(roll.rollId, {
        target_number: targetNumber,
        successes: successCount,
        dice_text: dice.join(', '),
        outcome: passed ? 1 : 0,
        bonus_momentum: weaponBonusMomentum,
        complications: complicationCount,
        momentum_spent: weaponPoolSpent,
        auto_successes: autoSuccesses,
        extra_damage: extraDamageDice,
        total_damage: totalDamage,
        effect_count: effectCount,
        damage_dice_text: converted.map((c) => c.symbol).join(' '),
        effects_summary: effectsSummary,
      });
    } catch (err) {
      finishRoll(roll.rollId, {
        target_number: '?',
        successes: '?',
        dice_text: `error: ${err.message}`,
        outcome: 0,
        complications: 0,
        total_damage: '?',
        effect_count: '?',
        damage_dice_text: `error: ${err.message}`,
        effects_summary: '',
      });
    }
  };
  k.registerFuncs({initiateWeaponRoll});
  
  
  // Fills the row from a known armor, like ccApplyWeaponPreset. Setting
  // resistance triggers its own total_armor update.
  const ccArmorProfiles = {"Chainmail / Lorica Hamata":{"resistance":"2","qualities":"Uncomfortable"},"Leather Armor":{"resistance":"1","qualities":""},"Lorica Segmentata":{"resistance":"3","qualities":"Uncomfortable"},"Lorica Squamata":{"resistance":"3","qualities":"Heavy, Uncomfortable"}};
  const ccApplyArmorPreset = ({trigger, attributes}) => {
    const profile = ccArmorProfiles[attributes[trigger.name]];
    if (!profile) { return; }
    const [section, rowID] = k.parseRepeatName(trigger.name);
    Object.keys(profile).forEach((field) => {
      attributes[`${section}_${rowID}_${field}`] = profile[field];
    });
  };
  k.registerFuncs({ccApplyArmorPreset});
  
  
  // Fills the row from a known talent, for both the Name trigger and the
  // apply button, so the name is read via the row prefix. Unknown names leave
  // the row untouched.
  const ccTalentProfiles = {"The Gods Are with You":{"keywords":"Mystic, Persuasion, Spellcaster","requirements":"Mystic; can't already have a Spellcaster-keyword talent"},"Gods Guide You":{"keywords":"Mystic, Academia, Spellcaster","requirements":"Mystic; can't already have a Spellcaster-keyword talent"},"Pain Is Nothing":{"keywords":"Mystic, Medicine, Spellcaster","requirements":"Mystic; can't already have a Spellcaster-keyword talent"},"Aedificator":{"keywords":"Sage, Engineering","requirements":"Sage archetype"},"The Best Doctor Is Also a Philosopher":{"keywords":"Sage, Medicine","requirements":"Sage archetype"},"Deep Expertise":{"keywords":"Sage, Academia","requirements":"Sage archetype"},"Nero Nihil Verius":{"keywords":"Sage, Observation","requirements":"Sage archetype"},"Backed by Authority":{"keywords":"Schemer, Persuasion","requirements":"Schemer archetype"},"Et Tu?":{"keywords":"Schemer, Fighting","requirements":"Schemer archetype"},"Play the Part":{"keywords":"Schemer, Academia","requirements":"Schemer archetype"},"Social Network":{"keywords":"Schemer, Observation","requirements":"Schemer archetype"},"Cunning Fighter":{"keywords":"Scoundrel, Athletics","requirements":"Scoundrel archetype"},"Hidden Blade":{"keywords":"Scoundrel, Fighting","requirements":"Scoundrel archetype"},"Oculus Aurum":{"keywords":"Scoundrel, Observation","requirements":"Scoundrel archetype"},"Unremarkable":{"keywords":"Scoundrel, Stealth","requirements":"Scoundrel archetype"},"Eye for Weakness":{"keywords":"Scout, Observation","requirements":"Scout archetype"},"Strike from Hiding":{"keywords":"Scout, Fighting","requirements":"Scout archetype"},"Survivalist":{"keywords":"Scout, Survival","requirements":"Scout archetype"},"Woodland Stride":{"keywords":"Scout, Athletics","requirements":"Scout archetype"},"Brute":{"keywords":"Soldier, Athletics","requirements":"Soldier archetype"},"Flashing Steel":{"keywords":"Soldier, Fighting","requirements":"Soldier archetype"},"Hold Fast":{"keywords":"Soldier, Resilience","requirements":"Soldier archetype"},"Shield Wall":{"keywords":"Soldier, Tactics","requirements":"Soldier archetype"},"Advisor":{"keywords":"<Skill>","requirements":""},"Bold":{"keywords":"<Skill>","requirements":""},"Prodigialis Fortuna":{"keywords":"Fortune","requirements":""},"Skin of Your Teeth":{"keywords":"Fortune","requirements":""},"Cautious":{"keywords":"<Skill>","requirements":""},"Applied Knowledge":{"keywords":"Academia","requirements":""},"Collaboration":{"keywords":"Academia","requirements":""},"Magister's Favorite":{"keywords":"<Skill>","requirements":"Advanced"},"Cool Under Pressure":{"keywords":"<Skill>, Fortune","requirements":""},"Platonist":{"keywords":"Academia","requirements":""},"Savant":{"keywords":"Academia","requirements":""},"Ludi Champion":{"keywords":"Athletics","requirements":""},"Marathon Runner":{"keywords":"Athletics","requirements":""},"Quality Crafting":{"keywords":"Engineering","requirements":""},"The Tool for the Job":{"keywords":"Engineering","requirements":""},"Sculpted from Marble":{"keywords":"Athletics","requirements":""},"Aggressive":{"keywords":"Fighting","requirements":""},"Field Repair":{"keywords":"Crafting","requirements":""},"Scavenger":{"keywords":"Crafting","requirements":""},"Demolitionist":{"keywords":"Engineering","requirements":""},"Defensive":{"keywords":"Fighting","requirements":""},"Skirmisher":{"keywords":"Fighting","requirements":""},"Steady Aim":{"keywords":"Fighting","requirements":""},"Anatomist":{"keywords":"Medicine","requirements":""},"Imposing Presence":{"keywords":"Persuasion","requirements":""},"Combat Medicus":{"keywords":"Medicine","requirements":""},"Keen Eyed":{"keywords":"Observation","requirements":""},"Predator's Senses":{"keywords":"Observation","requirements":""},"Suspicious":{"keywords":"Observation","requirements":""},"Lingua Argentea":{"keywords":"Persuasion","requirements":""},"Iron Hide":{"keywords":"Resilience","requirements":""},"Mithradatic":{"keywords":"Resilience","requirements":""},"Second Wind":{"keywords":"Resilience","requirements":""},"Fade Away":{"keywords":"Stealth","requirements":""},"Low Profile":{"keywords":"Stealth","requirements":""},"Bestiarius":{"keywords":"Survival","requirements":""},"Coordinator":{"keywords":"Tactics","requirements":""},"Inconspicuous":{"keywords":"Tactics","requirements":""},"Untraceable":{"keywords":"Survival","requirements":""},"Rallying Cry":{"keywords":"Tactics","requirements":""},"Bizarre Insight":{"keywords":"Weird","requirements":""},"Foreboding Survival":{"keywords":"Weird","requirements":""},"Mystical Power":{"keywords":"Weird","requirements":""},"Numb to the Horrors":{"keywords":"Weird","requirements":""},"Occult Dabbler":{"keywords":"Spellcaster, Weird","requirements":""},"Spectral Hunter":{"keywords":"Lupercus, Spellcaster","requirements":"Mystic; can't already have a Spellcaster-keyword talent"},"Hasty Ritual":{"keywords":"Lupercus","requirements":"Spectral Hunter talent"},"Instinctive Magic":{"keywords":"Lupercus, Resilience","requirements":"Hasty Ritual talent"},"Jaws of the Wolf":{"keywords":"Lupercus","requirements":"Hasty Ritual talent"},"Lupercalia":{"keywords":"Lupercus","requirements":"Jaws of the Wolf talent"},"Wolf Howl":{"keywords":"Lupercus, Persuasion, Survival","requirements":"Jaws of the Wolf talent"},"Quiet Wisdom":{"keywords":"Staff Bearer, Persuasion, Spellcaster","requirements":"Mystic archetype"},"Know the Signs":{"keywords":"Staff Bearer, Observation, Spellcaster","requirements":"Mystic archetype"},"Do We Fear This?":{"keywords":"Staff Bearer, Persuasion","requirements":"Force of Presence or Protective Superstitions"},"Force of Presence":{"keywords":"Staff Bearer, Weird","requirements":"Quiet Wisdom talent"},"Runecasting":{"keywords":"Staff Bearer, Observation","requirements":"Quiet Wisdom or Know the Signs"},"Protective Superstitions":{"keywords":"Staff Bearer, Observation","requirements":"Know the Signs talent"},"Fabricator":{"keywords":"Engineer, Crafting, Engineering","requirements":"Sage archetype"},"Dedication":{"keywords":"Engineer, Momentum","requirements":"Fabricator talent"},"In the Nick of Time":{"keywords":"Engineer, Academia, Engineering","requirements":"Academia or Engineering 3+; plus Intense Study"},"Incisive Scrutiny":{"keywords":"Engineer","requirements":"Fabricator talent"},"Intense Scrutiny":{"keywords":"Engineer","requirements":"Academia or Engineering 3+; plus Incisive Scrutiny or Intense Study"},"Intense Study":{"keywords":"Engineer","requirements":"Dedication talent or Intense Scrutiny talent"},"Physician":{"keywords":"Medicus, Medicine","requirements":"Sage archetype, 1+ ranks in Medicine"},"Emergency Doctor":{"keywords":"Medicus, Medicine","requirements":"Physician talent"},"Fast Aid":{"keywords":"Medicus, Medicine","requirements":"Physician talent"},"Field Medicine":{"keywords":"Medicus, Medicine","requirements":"Physician talent"},"First Response":{"keywords":"Medicus, Medicine","requirements":"Fast Aid talent, 3+ ranks in Medicine"},"Triage":{"keywords":"Medicus, Medicine","requirements":"Medicine 3+; plus Emergency Doctor or First Response"},"Sharp Senses":{"keywords":"Frumentarius, Observation","requirements":"Schemer archetype"},"Do or Die":{"keywords":"Frumentarius, Morale","requirements":"Sharp Senses talent"},"Interrogation":{"keywords":"Frumentarius","requirements":"Know Thy Enemy talent"},"Know Thy Enemy":{"keywords":"Frumentarius","requirements":"Sharp Senses talent"},"Perfect Facade":{"keywords":"Frumentarius, Stealth","requirements":"Sharp Senses talent"},"Thorough Search":{"keywords":"Frumentarius","requirements":"Interrogation talent"},"Charismatic":{"keywords":"Magistrate, Persuasion","requirements":"Schemer archetype"},"Commanding Presence":{"keywords":"Magistrate, Persuasion, Tactics","requirements":"Charismatic talent"},"Honestas":{"keywords":"Magistrate","requirements":"Charismatic talent"},"Lictors":{"keywords":"Magistrate, Tactics","requirements":"Commanding Presence talent"},"Rhetoric":{"keywords":"Magistrate","requirements":"Charismatic talent"},"Stoic":{"keywords":"Magistrate","requirements":"Honestas talent"},"Hasty Retreat":{"keywords":"Robber","requirements":"Scoundrel archetype"},"Inconspicuous (Robber)":{"keywords":"Robber, Stealth","requirements":"Scoundrel archetype"},"Alter Ego":{"keywords":"Robber","requirements":"Inconspicuous talent"},"Nimble":{"keywords":"Robber, Movement","requirements":"Hasty Retreat talent"},"Ransack":{"keywords":"Robber, Observation","requirements":"Scotopia talent"},"Scotopia (Robber)":{"keywords":"Robber","requirements":"Alter Ego talent or Nimble talent"},"Subtle Step":{"keywords":"Sicarius, Stealth","requirements":"Scoundrel archetype"},"Assassin":{"keywords":"Sicarius","requirements":"Death Dealer talent or Silent Strike talent"},"Backstabber":{"keywords":"Sicarius","requirements":"Guard Break talent or Subtle Step talent"},"Death Dealer":{"keywords":"Sicarius, Stealth","requirements":"Guard Break talent or Silent Strike talent"},"Guard Break":{"keywords":"Sicarius","requirements":"Backstabber talent or Subtle Step talent"},"Silent Strike":{"keywords":"Sicarius","requirements":"Backstabber talent or Death Dealer talent"},"Tracker":{"keywords":"Hunter","requirements":"Scout archetype"},"Constantly Watching":{"keywords":"Hunter","requirements":"Tracker talent"},"Dead Eye":{"keywords":"Hunter","requirements":"Expert Aim talent"},"Expert Aim":{"keywords":"Hunter","requirements":"Tracker talent"},"Scotopia (Hunter)":{"keywords":"Hunter","requirements":"Constantly Watching talent"},"Self Sufficient":{"keywords":"Hunter, Survival","requirements":"Tracker talent"},"Pack Tactics":{"keywords":"Veles","requirements":"Scout archetype"},"Acrobatic Dodge":{"keywords":"Veles, Athletics","requirements":"Swift Victory talent"},"Assail":{"keywords":"Veles, Fighting","requirements":"Pack Tactics talent"},"Fortune Favors the Bold":{"keywords":"Veles, Fortune","requirements":"Rejuvenation talent"},"Rejuvenation":{"keywords":"Veles, Resilience","requirements":"Pack Tactics talent"},"Swift Victory":{"keywords":"Veles","requirements":"Pack Tactics talent"},"Head Taker":{"keywords":"Berserker, Fighting","requirements":"Soldier archetype"},"War Cry":{"keywords":"Berserker","requirements":"Head Taker talent"},"Hack and Slash":{"keywords":"Berserker, Fighting","requirements":"Head Taker talent"},"Brutal Fighter":{"keywords":"Berserker","requirements":"Hack and Slash talent"},"Bloody Handed":{"keywords":"Berserker, Fighting","requirements":"Brutal Fighter talent"},"Onslaught":{"keywords":"Berserker, Movement","requirements":"Head Taker talent"},"Berserker Rush":{"keywords":"Berserker, Fighting","requirements":"Onslaught talent"},"Legionary Training":{"keywords":"Legionary, Fighting","requirements":"Soldier archetype"},"Legionary Veteran":{"keywords":"Legionary","requirements":"Legionary Training talent"},"Precision Strikes":{"keywords":"Legionary","requirements":"Legionary Training talent"},"Strike as One":{"keywords":"Legionary, Tactics","requirements":"Precision Strikes talent"},"Scutarius":{"keywords":"Legionary","requirements":"Legionary Training talent"},"Brace for Impact":{"keywords":"Legionary, Fighting","requirements":"Scutarius talent"},"Formation Tactics":{"keywords":"Legionary","requirements":"Brace for Impact talent"},"Purse Strings":{"keywords":"Servant","requirements":"Servant caste"},"Envy and Attention":{"keywords":"Noble","requirements":"Noble caste"},"Alea Iacta Est (The Die Is Cast)":{"keywords":"Roman Citizen","requirements":"Roman Citizen culture"},"All Roads Lead to Rome":{"keywords":"Roman Citizen","requirements":"Roman Citizen culture"},"Unyielding":{"keywords":"Germanic Tribe","requirements":"Germanic Tribe culture"},"Woodwise":{"keywords":"Germanic Tribe","requirements":"Germanic Tribe culture"},"Balancing the Scales":{"keywords":"Ægyptus","requirements":"Ægyptus culture"},"Writ in Stone":{"keywords":"Ægyptus, Academia","requirements":"Ægyptus culture"},"Night Raiders":{"keywords":"Briton","requirements":"Briton culture"},"Warrior Born":{"keywords":"Briton","requirements":"Briton culture"},"Noble Line":{"keywords":"Gaul","requirements":"Gaul culture"},"Undergoing All Dangers":{"keywords":"Gaul","requirements":"Gaul culture"},"Cosmopolitan":{"keywords":"Greek","requirements":"Greek culture"},"Practiced Listener":{"keywords":"Greek","requirements":"Greek culture"},"Do as the Romans Do":{"keywords":"Other Culture / Foederati","requirements":"Other Culture / Foederati culture"},"Hidden Potential":{"keywords":"Other Culture / Foederati","requirements":"Other Culture / Foederati culture"},"World Weary":{"keywords":"Other Culture / Foederati","requirements":"Other Culture / Foederati culture"}};
  const ccApplyTalentPreset = ({trigger, attributes}) => {
    const [section, rowID] = k.parseRepeatName(trigger.name);
    const prefix = `${section}_${rowID}_`;
    const profile = ccTalentProfiles[attributes[`${prefix}name`]];
    if (!profile) { return; }
    Object.keys(profile).forEach((field) => {
      attributes[`${prefix}${field}`] = profile[field];
    });
  };
  k.registerFuncs({ccApplyTalentPreset});
  
  // Sets one flag per distinct talent requirement (see ccParseRequirements):
  // 1 when the character meets it. Reruns when archetype, specialization,
  // culture, caste, skill ranks or talents change, and on sheet open.
  const ccTalentRequirements = [[[["spec","Veles"]],[["talent","Swift Victory"]]],[[["archetype","Sage"]]],[[["culture","Roman citizen"]]],[[["spec","Robber"]],[["talent","Inconspicuous (Robber)"]]],[[["spec","Veles"]],[["talent","Pack Tactics"]]],[[["spec","Sicarius"]],[["talent","Death Dealer"],["talent","Silent Strike"]]],[[["archetype","Schemer"]]],[[["spec","Sicarius"]],[["talent","Guard Break"],["talent","Subtle Step"]]],[[["culture","Ægyptus"]]],[[["spec","Berserker"]],[["talent","Onslaught"]]],[[["spec","Berserker"]],[["talent","Brutal Fighter"]]],[[["spec","Legionary"]],[["talent","Scutarius"]]],[[["spec","Berserker"]],[["talent","Hack and Slash"]]],[[["archetype","Soldier"]]],[[["spec","Magistrate"]],[["archetype","Schemer"]]],[[["spec","Magistrate"]],[["talent","Charismatic"]]],[[["spec","Hunter"]],[["talent","Tracker"]]],[[["culture","Greek"]]],[[["archetype","Scoundrel"]]],[[["spec","Hunter"]],[["talent","Expert Aim"]]],[[["spec","Sicarius"]],[["talent","Guard Break"],["talent","Silent Strike"]]],[[["spec","Engineer"]],[["talent","Fabricator"]]],[[["spec","Staff Bearer"]],[["talent","Force of Presence"],["talent","Protective Superstitions"]]],[[["culture","Foederati"],["culture","Other"]]],[[["spec","Frumentarius"]],[["talent","Sharp Senses"]]],[[["spec","Medicus"]],[["talent","Physician"]]],[[["caste","Noble"]]],[[["archetype","Scout"]]],[[["spec","Engineer"]],[["archetype","Sage"]]],[[["spec","Medicus"]],[["talent","Fast Aid"]],[["skill","medicine",3]]],[[["spec","Staff Bearer"]],[["talent","Quiet Wisdom"]]],[[["spec","Legionary"]],[["talent","Brace for Impact"]]],[[["spec","Veles"]],[["talent","Rejuvenation"]]],[[["archetype","Mystic"]],[["noKeyword","Spellcaster"]]],[[["spec","Sicarius"]],[["talent","Backstabber"],["talent","Subtle Step"]]],[[["spec","Berserker"]],[["talent","Head Taker"]]],[[["spec","Robber"]],[["archetype","Scoundrel"]]],[[["spec","Lupercus"]],[["talent","Spectral Hunter"]]],[[["spec","Berserker"]],[["archetype","Soldier"]]],[[["spec","Engineer"]],[["skill","academia",3],["skill","engineering",3]],[["talent","Intense Study"]]],[[["spec","Lupercus"]],[["talent","Hasty Ritual"]]],[[["spec","Engineer"]],[["skill","academia",3],["skill","engineering",3]],[["talent","Incisive Scrutiny"],["talent","Intense Study"]]],[[["spec","Engineer"]],[["talent","Dedication"],["talent","Intense Scrutiny"]]],[[["spec","Frumentarius"]],[["talent","Know Thy Enemy"]]],[[["spec","Staff Bearer"]],[["archetype","Mystic"]]],[[["spec","Legionary"]],[["archetype","Soldier"]]],[[["spec","Legionary"]],[["talent","Legionary Training"]]],[[["spec","Magistrate"]],[["talent","Commanding Presence"]]],[[["spec","Lupercus"]],[["talent","Jaws of the Wolf"]]],[[["culture","Briton"]]],[[["spec","Robber"]],[["talent","Hasty Retreat"]]],[[["culture","Gaul"]]],[[["spec","Veles"]],[["archetype","Scout"]]],[[["spec","Medicus"]],[["archetype","Sage"]],[["skill","medicine",1]]],[[["spec","Staff Bearer"]],[["talent","Know the Signs"]]],[[["caste","Servant"]]],[[["spec","Robber"]],[["talent","Scotopia (Robber)"]]],[[["spec","Staff Bearer"]],[["talent","Quiet Wisdom"],["talent","Know the Signs"]]],[[["spec","Hunter"]],[["talent","Constantly Watching"]]],[[["spec","Robber"]],[["talent","Alter Ego"],["talent","Nimble"]]],[[["spec","Frumentarius"]],[["archetype","Schemer"]]],[[["spec","Sicarius"]],[["talent","Backstabber"],["talent","Death Dealer"]]],[[["spec","Lupercus"]],[["archetype","Mystic"]],[["noKeyword","Spellcaster"]]],[[["spec","Magistrate"]],[["talent","Honestas"]]],[[["spec","Legionary"]],[["talent","Precision Strikes"]]],[[["spec","Sicarius"]],[["archetype","Scoundrel"]]],[[["spec","Frumentarius"]],[["talent","Interrogation"]]],[[["spec","Hunter"]],[["archetype","Scout"]]],[[["spec","Medicus"]],[["skill","medicine",3]],[["talent","Emergency Doctor"],["talent","First Response"]]],[[["culture","Germanic tribe"]]]];
  const ccUpdateTalentFilter = ({attributes, sections}) => {
    const owned = (sections.repeating_talent || [])
      .map((rowID) => attributes[`repeating_talent_${rowID}_name`])
      .filter(Boolean);
    const ownedKeywords = owned.flatMap((talent) =>
      String((ccTalentProfiles[talent] || {}).keywords || '').split(',').map((k) => k.trim()));
    const met = ([type, value, minimum]) => {
      if (type === 'archetype') { return attributes.archetype === value; }
      if (type === 'spec') { return attributes.specialization === value; }
      if (type === 'culture') { return attributes.culture === value; }
      if (type === 'caste') { return attributes.caste === value; }
      if (type === 'skill') { return (Number(attributes[`${value}_ranks`]) || 0) >= minimum; }
      if (type === 'talent') { return owned.includes(value); }
      if (type === 'noKeyword') { return !ownedKeywords.includes(value); }
      return false;
    };
    ccTalentRequirements.forEach((clauses, index) => {
      attributes[`talent_filter_${index}`] = clauses.every((anyOf) => anyOf.some(met)) ? 1 : 0;
    });
  };
  k.registerFuncs({ccUpdateTalentFilter});
  
  const ccSpecialRuleNames = ["Brutal","Extraordinary Agility","Extraordinary Brawn","Extraordinary Coordination","Extraordinary Gravitas","Extraordinary Insight","Extraordinary Reason","Extraordinary Will","Fast Recovery","Fearsome","Feeds Upon Fear","Flight","Grasping","Immune to","Incorporeal","Invulnerable","Keen Senses","Menacing","Mindless","Natural Armor","Natural Courage","Night Vision","Scale","Spellcaster","Threatening","Tough"];
  
  // "Fearsome 2", "Immune to Cold, Suffocation" or "Spellcaster (Will) 3"
  // all resolve to their common rule: the longest profile name the typed
  // name starts with.
  const ccFindSpecialRule = (name) => {
    const lower = String(name || '').trim().toLowerCase();
    return ccSpecialRuleNames
      .filter((key) => lower.startsWith(key.toLowerCase()))
      .sort((a, b) => b.length - a.length)[0];
  };
  
  // Fills in X from a trailing number in a known rule's name, without
  // overwriting a value already typed.
  const ccApplySpecialRulePreset = ({trigger, attributes}) => {
    const [section, rowID] = k.parseRepeatName(trigger.name);
    const prefix = `${section}_${rowID}_`;
    const name = attributes[`${prefix}name`];
    const key = ccFindSpecialRule(name);
    if (!key) { return; }
    const trailing = String(name || '').match(/(\d+)\s*$/);
    if (trailing && !attributes[`${prefix}x`]) {
      attributes[`${prefix}x`] = Number(trailing[1]);
    }
  };
  k.registerFuncs({ccApplySpecialRulePreset});
  
  // Roll-template fields can't contain "}}" or "|" safely.
  const ccTemplateSafe = (text) => String(text || '').replace(/[{}|]/g, '').replace(/\n+/g, ' ');
  
  // Posts the rule to chat. A Fearsome rule also spells out the first-sight
  // test and which mental attack it inflicts (the first Mental row in
  // Weapons & Attacks).
  const ccPostSpecialRule = async ({trigger, attributes}) => {
    const [section, rowID] = k.parseRepeatName(trigger.name);
    const prefix = `${section}_${rowID}_`;
    const name = attributes[`${prefix}name`] || 'Special Rule';
    const x = Number(attributes[`${prefix}x`]) || 0;
    let extra = '';
    if (ccFindSpecialRule(name) === 'Fearsome') {
      const mental = (attributes.repeating_weapon || []).find((row) => row.attack_type === 'mental');
      const attack = mental ? `${mental.name} (${mental.damage_effects})` : 'its basic mental attack';
      extra = `{{First sight=Will + Resilience test, difficulty ${x || 1}, or suffer ${ccTemplateSafe(attack)}}} `;
    }
    try {
      const roll = await startRoll(`&{template:default} {{name=@{character_name}: ${ccTemplateSafe(name)}}} ` +
        `{{Rule=${ccTemplateSafe(attributes[`${prefix}description`])}}} ${extra}`);
      finishRoll(roll.rollId, {});
    } catch (err) {
      console.log('[CC] Special rule post failed:', err.message);
    }
  };
  k.registerFuncs({ccPostSpecialRule});
  
  
  const calcXpAvailable = ({attributes}) => {
    return (Number(attributes.xp_earned) || 0) - (Number(attributes.xp_spent) || 0);
  };
  k.registerFuncs({calcXpAvailable});

console.debug = vi.fn(a => null);
console.log = vi.fn(a => null);
console.table = vi.fn(a => null);
module.exports = {k,...global};