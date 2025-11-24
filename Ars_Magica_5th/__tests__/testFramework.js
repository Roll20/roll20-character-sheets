// This code adapted from Nic Bradley's R20 test framework from the WFRP4e official sheet.
import { vi } from 'vitest';
import { _ } from 'underscore';
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
  attributes:{"update_error_rowid":"","botch_formula":"&{template:botch} {{roll= [[{[[?{@{botch_num_i18n}|1}]]d10cs0cf10}=10]] }} {{type=Grouped}}","die-type-selection":"both","isMagi":"yes","ArmorWorn":"","ArmorModifiers":"","character_name":"","player_name":"","unspent_xp":"","saga":"","year":"","Confidence":"","ConfidencePoints":"","sheetTab":"character","simple-die":"(1d10cs0cf0) [@{simple-die_i18n}]","stress-die":"ceil(((((1d10cs1cf10 %9) -1)+9) %9) *1.1) [@{stress-die_i18n}]","die-type-selection-proxy":"both","selected-die":"simple","Age":"","MightType":"NoMight","MightScore":"","Warping":"","ApparentAge":"","CurrentMagicMight":"","WarpPoints":"","Warping_effects":"","Birth_Name":"","Year_Born":"","Gender":"","Race_Nationality":"","Place_of_Origin":"","Religion":"","Title_Profession":"","Height":"","Weight":"","Size":"","Handedness":"","Hair":"","Eyes":"","House":"","Covenant":"","sigil":"","DomusMagna":"","Primus":"","Parens":"","CovenantofApprenticeship":"","Personality_Trait1":"","Personality_Trait1_score":"","Personality_Trait2":"","Personality_Trait2_score":"","Personality_Trait3":"","Personality_Trait3_score":"","Personality_Trait4":"","Personality_Trait4_score":"","Personality_Trait5":"","Personality_Trait5_score":"","Personality_Trait6":"","Personality_Trait6_score":"","Reputations1":"","Reputations1_type":"","Reputations1_score":"","Reputations2":"","Reputations2_type":"","Reputations2_score":"","Reputations3":"","Reputations3_type":"","Reputations3_score":"","Reputations4":"","Reputations4_type":"","Reputations4_score":"","Reputations5":"","Reputations5_type":"","Reputations5_score":"","Reputations6":"","Reputations6_type":"","Reputations6_score":"","Intelligence_Description":"","Intelligence_Score":"0","Intelligence_Aging":"0","Perception_Description":"","Perception_Score":"0","Perception_Aging":"0","Presence_Description":"","Presence_Score":"0","Presence_Aging":"0","Communication_Description":"","Communication_Score":"0","Communication_Aging":"0","Strength_Description":"","Strength_Score":"0","Strength_Aging":"0","Stamina_Description":"","Stamina_Score":"0","Stamina_Aging":"0","Dexterity_Description":"","Dexterity_Score":"0","Dexterity_Aging":"0","Quickness_Description":"","Quickness_Score":"0","Quickness_Aging":"0","Decrepitude":"0","Decrepitude_effects":"","Longevity_Scars":"","global_Ability_CharacName":"Intelligence","Creo_Score":"0","Creo_exp":"0","Creo_advancementExp":"1 * ((@{Creo_Score}) + 1)","Creo_totalExp":"1 * (((@{Creo_Score}) + 1) * ((@{Creo_Score}) + 2) / 2)","Creo_Puissant":"0","Intellego_Score":"0","Intellego_exp":"0","Intellego_advancementExp":"1 * ((@{Intellego_Score}) + 1)","Intellego_totalExp":"1 * (((@{Intellego_Score}) + 1) * ((@{Intellego_Score}) + 2) / 2)","Intellego_Puissant":"0","Muto_Score":"0","Muto_exp":"0","Muto_advancementExp":"1 * ((@{Muto_Score}) + 1)","Muto_totalExp":"1 * (((@{Muto_Score}) + 1) * ((@{Muto_Score}) + 2) / 2)","Muto_Puissant":"0","Perdo_Score":"0","Perdo_exp":"0","Perdo_advancementExp":"1 * ((@{Perdo_Score}) + 1)","Perdo_totalExp":"1 * (((@{Perdo_Score}) + 1) * ((@{Perdo_Score}) + 2) / 2)","Perdo_Puissant":"0","Rego_Score":"0","Rego_exp":"0","Rego_advancementExp":"1 * ((@{Rego_Score}) + 1)","Rego_totalExp":"1 * (((@{Rego_Score}) + 1) * ((@{Rego_Score}) + 2) / 2)","Rego_Puissant":"0","Animal_Score":"0","Animal_exp":"0","Animal_advancementExp":"1 * ((@{Animal_Score}) + 1)","Animal_totalExp":"1 * (((@{Animal_Score}) + 1) * ((@{Animal_Score}) + 2) / 2)","Animal_Puissant":"0","Aquam_Score":"0","Aquam_exp":"0","Aquam_advancementExp":"1 * ((@{Aquam_Score}) + 1)","Aquam_totalExp":"1 * (((@{Aquam_Score}) + 1) * ((@{Aquam_Score}) + 2) / 2)","Aquam_Puissant":"0","Auram_Score":"0","Auram_exp":"0","Auram_advancementExp":"1 * ((@{Auram_Score}) + 1)","Auram_totalExp":"1 * (((@{Auram_Score}) + 1) * ((@{Auram_Score}) + 2) / 2)","Auram_Puissant":"0","Corpus_Score":"0","Corpus_exp":"0","Corpus_advancementExp":"1 * ((@{Corpus_Score}) + 1)","Corpus_totalExp":"1 * (((@{Corpus_Score}) + 1) * ((@{Corpus_Score}) + 2) / 2)","Corpus_Puissant":"0","Herbam_Score":"0","Herbam_exp":"0","Herbam_advancementExp":"1 * ((@{Herbam_Score}) + 1)","Herbam_totalExp":"1 * (((@{Herbam_Score}) + 1) * ((@{Herbam_Score}) + 2) / 2)","Herbam_Puissant":"0","Ignem_Score":"0","Ignem_exp":"0","Ignem_advancementExp":"1 * ((@{Ignem_Score}) + 1)","Ignem_totalExp":"1 * (((@{Ignem_Score}) + 1) * ((@{Ignem_Score}) + 2) / 2)","Ignem_Puissant":"0","Imaginem_Score":"0","Imaginem_exp":"0","Imaginem_advancementExp":"1 * ((@{Imaginem_Score}) + 1)","Imaginem_totalExp":"1 * (((@{Imaginem_Score}) + 1) * ((@{Imaginem_Score}) + 2) / 2)","Imaginem_Puissant":"0","Mentem_Score":"0","Mentem_exp":"0","Mentem_advancementExp":"1 * ((@{Mentem_Score}) + 1)","Mentem_totalExp":"1 * (((@{Mentem_Score}) + 1) * ((@{Mentem_Score}) + 2) / 2)","Mentem_Puissant":"0","Terram_Score":"0","Terram_exp":"0","Terram_advancementExp":"1 * ((@{Terram_Score}) + 1)","Terram_totalExp":"1 * (((@{Terram_Score}) + 1) * ((@{Terram_Score}) + 2) / 2)","Terram_Puissant":"0","Vim_Score":"0","Vim_exp":"0","Vim_advancementExp":"1 * ((@{Vim_Score}) + 1)","Vim_totalExp":"1 * (((@{Vim_Score}) + 1) * ((@{Vim_Score}) + 2) / 2)","Vim_Puissant":"0","Spontaneous1":"((@{Spontaneous1_Technique} + @{Spontaneous1_Form} + (@{Spontaneous1_Focus}) + @{gestures} + @{words} + @{Stamina_Score} + @{aura})/2) / (1 + (@{Spontaneous1_Deficiency}))","Spontaneous1_Technique":"0 [@{technique_i18n}]","Spontaneous1_Form":"0 [@{form_i18n}]","Spontaneous1_Focus":0,"Spontaneous1_Deficiency":0,"Spontaneous1_Sta":"@{Stamina_Score}","Spontaneous1_aura":"@{aura}","Ceremonial":"((@{Ceremonial_Technique} + @{Ceremonial_Form} + (@{Ceremonial_Focus}) + @{gestures} + @{words} + @{Stamina_Score} + @{aura} + @{Ceremonial_Artes_Lib} + @{Ceremonial_Philos})/2 ) / (1 + (@{Ceremonial_Deficiency}))","Ceremonial_Technique":"0 [@{technique_i18n}]","Ceremonial_Form":"0 [@{form_i18n}]","Ceremonial_Focus":0,"Ceremonial_Deficiency":0,"Ceremonial_Sta":"@{Stamina_Score}","Ceremonial_aura":"@{aura}","Ceremonial_Artes_Lib":"0","Ceremonial_Philos":"0","Spontaneous2":"((@{Spontaneous2_Technique} + @{Spontaneous2_Form} + (@{Spontaneous2_Focus}) + @{gestures} + @{words} + @{Stamina_Score} + @{aura})/5) / (1 + (@{Spontaneous2_Deficiency}))","Spontaneous2_Technique":"0","Spontaneous2_Form":"0","Spontaneous2_Focus":0,"Spontaneous2_Deficiency":0,"Spontaneous2_Sta":"@{Stamina_Score}","Spontaneous2_aura":"@{aura}","Formulaic":"(@{Formulaic_Technique} + @{Formulaic_Form} + (@{Formulaic_Focus}) + @{gestures} + @{words} + @{Stamina_Score} + @{aura}) / (1 + (@{Formulaic_Deficiency}))","Formulaic_Technique":"0 [@{technique_i18n}]","Formulaic_Form":"0 [@{form_i18n}]","Formulaic_Focus":0,"Formulaic_Deficiency":0,"Formulaic_Sta":"@{Stamina_Score}","Formulaic_aura":"@{aura}","Ritual":"(@{Ritual_Technique} + @{Ritual_Form} + (@{Ritual_Focus}) + @{Stamina_Score} + @{aura} + @{Ritual_Artes_Lib} + @{Ritual_Philos}) / (1 + (@{Ritual_Deficiency}))","Ritual_Technique":"0 [@{technique_i18n}]","Ritual_Form":"0 [@{form_i18n}]","Ritual_Focus":0,"Ritual_Deficiency":0,"Ritual_Sta":"@{Stamina_Score}","Ritual_aura":"@{aura}","Ritual_Artes_Lib":"0","Ritual_Philos":"0","aura":"3","gestures":"0 [@{gestures_i18n}: @{bold_i18n}]","words":"0 [@{words_i18n}: @{firm_i18n}]","LabSize_Score":"0","LabRefinement_Score":"0","LabGeneralQuality_Score":"0","LabUpkeep_Score":"0","LabSafety_Score":"0","LabWarping_Score":"0","LabHealth_Score":"0","LabAesthetics_Score":"0","SanctumMarker":"","LabDescription":"","Lab":"(@{Intelligence_Score}) + (@{Lab_Theory}) + (@{aura}) + (@{lab_Technique}) + (@{lab_Form}) + (@{Lab_Focus}) + (@{LabModifiers}) + (@{labbonus_total}) + (@{LabGeneralQuality_Score})","Lab_Focus":0,"LabModifiers":"0","Lab_Int":"(@{Intelligence_Score})","Lab_Theory":"0","Lab_Aura":"@{aura}","lab_Technique":"0","lab_Form":"0","labbonus_total":"0","Fatigue_total":"@{Fatigue}","additionalFatigue":"0","additionalFatigueProxy":"0","Fatigue":"0","wound_total":"0","Wounds_Light_range":"","Wounds_Light1":0,"Wounds_Light2":0,"Wounds_Light3":0,"Wounds_Light4":0,"Wounds_Light5":0,"Wounds_Medium_range":"","Wounds_Medium1":0,"Wounds_Medium2":0,"Wounds_Medium3":0,"Wounds_Medium4":0,"Wounds_Medium5":0,"Wounds_Heavy_range":"","Wounds_Heavy1":0,"Wounds_Heavy2":0,"Wounds_Heavy3":0,"Wounds_Heavy4":0,"Wounds_Heavy5":0,"Wounds_Incapacitated_range":"","Wounds_Incapacitated":0,"Wounds_Dead_range":"","Wounds_Dead":0,"armors_total_prot":"0","armors_total_prot_detailed":" ","armors_total_load":"0","armors_total_load_detailed":" ","combat-mods_total_init":"0","combat-mods_total_init_detailed":" ","combat-mods_total_atk":"0","combat-mods_total_atk_detailed":" ","combat-mods_total_dfn":"0","combat-mods_total_dfn_detailed":" ","combat-mods_total_dam":"0","combat-mods_total_dam_detailed":" ","combat-mods_total_soak":"0","combat-mods_total_soak_detailed":" ","Soak":"((@{Stamina_Score}) + (@{armors_total_prot}) + (@{soak_bonus}) + (@{combat-mods_total_soak}))","soak_stamina":"(@{Stamina_Score})","soak_bonus":"0","Soak_Animal":"((@{Stamina_Score}) + (@{armors_total_prot}) + (@{soak_bonus}) + (@{combat-mods_total_soak}) + ceil(((@{Animal_Score}) + (@{Animal_Puissant})) / 5))","Soak_Aquam":"((@{Stamina_Score}) + (@{armors_total_prot}) + (@{soak_bonus}) + (@{combat-mods_total_soak}) + ceil(((@{Aquam_Score}) + (@{Aquam_Puissant})) / 5))","Soak_Auram":"((@{Stamina_Score}) + (@{armors_total_prot}) + (@{soak_bonus}) + (@{combat-mods_total_soak}) + ceil(((@{Auram_Score}) + (@{Auram_Puissant})) / 5))","Soak_Corpus":"((@{Stamina_Score}) + (@{armors_total_prot}) + (@{soak_bonus}) + (@{combat-mods_total_soak}) + ceil(((@{Corpus_Score}) + (@{Corpus_Puissant})) / 5))","Soak_Herbam":"((@{Stamina_Score}) + (@{armors_total_prot}) + (@{soak_bonus}) + (@{combat-mods_total_soak}) + ceil(((@{Herbam_Score}) + (@{Herbam_Puissant})) / 5))","Soak_Ignem":"((@{Stamina_Score}) + (@{armors_total_prot}) + (@{soak_bonus}) + (@{combat-mods_total_soak}) + ceil(((@{Ignem_Score}) + (@{Ignem_Puissant})) / 5))","Soak_Imaginem":"((@{Stamina_Score}) + (@{armors_total_prot}) + (@{soak_bonus}) + (@{combat-mods_total_soak}) + ceil(((@{Imaginem_Score}) + (@{Imaginem_Puissant})) / 5))","Soak_Mentem":"((@{Stamina_Score}) + (@{armors_total_prot}) + (@{soak_bonus}) + (@{combat-mods_total_soak}) + ceil(((@{Mentem_Score}) + (@{Mentem_Puissant})) / 5))","Soak_Terram":"((@{Stamina_Score}) + (@{armors_total_prot}) + (@{soak_bonus}) + (@{combat-mods_total_soak}) + ceil(((@{Terram_Score}) + (@{Terram_Puissant})) / 5))","Soak_Vim":"((@{Stamina_Score}) + (@{armors_total_prot}) + (@{soak_bonus}) + (@{combat-mods_total_soak}) + ceil(((@{Vim_Score}) + (@{Vim_Puissant})) / 5))","ability_i18n":"Abiliy","armor_i18n":"Armor","artes_i18n":"Artes Lib.","attack_i18n":"Attack","aura_i18n":"Aura","bold_i18n":"Bold","bonus_i18n":"Bonus","botch_i18n":"Botch","characteristic_i18n":"Characteristic","botch_num_i18n":"Number of botch dice","circumstances_i18n":"Circumstances","circumstantial_i18n":"Circumstancial","critical_i18n":"Critical","damage_i18n":"Damage","defense_i18n":"Defense","deficiency_i18n":"Deficiency","encumbrance_i18n":"Encumbrance","exaggerated_i18n":"Exaggerated","fatigue_i18n":"Fatigue","firm_i18n":"Firm","focus_i18n":"Focus","form_i18n":"Form","gestures_i18n":"Gestures","gest-none_i18n":"None","initiative_i18n":"Initiative","loud_i18n":"Loud","modifiers_i18n":"Modifiers","philos_i18n":"Philos.","quiet_i18n":"Quiet","simple-die_i18n":"Simple","soakbns_i18n":"Soak Bonus","spontaneous_i18n":"Spontaneous","stress-die_i18n":"Stress","subtle_i18n":"Subtle","technique_i18n":"Technique","total_i18n":"Total","unselected_i18n":"Unselected","words_i18n":"Words","words-none_i18n":"None","wounds_i18n":"Wounds","intelligence_i18n":"Intelligence","perception_i18n":"Perception","presence_i18n":"Presence","communication_i18n":"Communication","strength_i18n":"Strength","stamina_i18n":"Stamina","dexterity_i18n":"Dexterity","quickness_i18n":"Quickness","ask_short_i18n":"Ask","global_char_short_i18n":"Gbl","intelligence_short_i18n":"Int","perception_short_i18n":"Per","presence_short_i18n":"Prs","communication_short_i18n":"Com","strength_short_i18n":"Str","stamina_short_i18n":"Sta","dexterity_short_i18n":"Dex","quickness_short_i18n":"Qik","creo_i18n":"Creo","intellego_i18n":"Intellego","muto_i18n":"Muto","perdo_i18n":"Perdo","rego_i18n":"Rego","animal_i18n":"Animal","aquam_i18n":"Aquam","auram_i18n":"Auram","corpus_i18n":"Corpus","herbam_i18n":"Herbam","ignem_i18n":"Ignem","imaginem_i18n":"Imaginem","mentem_i18n":"Mentem","terram_i18n":"Terram","vim_i18n":"Vim","Unselected_Score":"0","Unselected_Puissant":"0","ask_Score":"?{@{characteristic_i18n}|@{intelligence_i18n},@{intelligence_Score} [@{intelligence_i18n}]| @{perception_i18n},@{perception_Score} [@{perception_i18n}]| @{presence_i18n},@{presence_Score} [@{presence_i18n}]| @{communication_i18n},@{communication_Score} [@{communication_i18n}]| @{strength_i18n},@{strength_Score} [@{strength_i18n}]| @{stamina_i18n},@{stamina_Score} [@{stamina_i18n}]| @{dexterity_i18n},@{dexterity_Score} [@{dexterity_i18n}]| @{quickness_i18n},@{quickness_Score} [@{quickness_i18n}]}","global_char_Score":"@{sys_at}@{character_name}@{sys_pipe}@{global_Ability_CharacName}_Score@{sys_rbk}","global_char_i18n":"@{sys_at}@{character_name}@{sys_pipe}@{global_Ability_CharacName}_i18n@{sys_rbk}","sys_at":"@{","sys_pipe":"|","sys_rbk":"}"},
  triggers: [],
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
const getTranslationByKey = vi.fn((key) => key);
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
  
  const cascades = {"attr_character_name":{"name":"character_name","type":"text","defaultValue":"","affects":[],"triggeredFuncs":["setActionCalls"],"listenerFunc":"accessSheet","listener":"change:character_name"},"attr_notNew":{"name":"notNew","type":"number","affects":[],"triggeredFuncs":[]},"attr_alert-161-spell-update":{"name":"alert-161-spell-update","type":"number","affects":[],"triggeredFuncs":[]},"attr_repeating_spell_$X_Technique_select":{"name":"repeating_spell_$X_Technique_select","type":"number","affects":[],"triggeredFuncs":[]},"attr_repeating_spell_$X_Form_select":{"name":"repeating_spell_$X_Form_select","type":"number","affects":[],"triggeredFuncs":[]},"attr_repeating_spell_$X_spell_tech_name":{"name":"repeating_spell_$X_spell_tech_name","type":"string","affects":[],"triggeredFuncs":[]},"attr_repeating_spell_$X_spell_form_name":{"name":"repeating_spell_$X_spell_form_name","type":"string","affects":[],"triggeredFuncs":[]},"attr_repeating_weapons_$X_Wounds_Load":{"name":"repeating_weapons_$X_Wounds_Load","type":"number","affects":[],"triggeredFuncs":[]},"attr_repeating_weapons_$X_Wounds_Range":{"name":"repeating_weapons_$X_Wounds_Range","type":"string","affects":[],"triggeredFuncs":[]},"attr_repeating_weapons_$X_Weapon_Load":{"name":"repeating_weapons_$X_Weapon_Load","type":"number","affects":[],"triggeredFuncs":[]},"attr_repeating_weapons_$X_Weapon_Range":{"name":"repeating_weapons_$X_Weapon_Range","type":"string","affects":[],"triggeredFuncs":[]},"attr_update_error_rowid":{"name":"update_error_rowid","type":"hidden","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_repeating_alerts--global-alerts_$X_level":{"name":"repeating_alerts--global-alerts_$X_level","type":"hidden","defaultValue":"info","triggeredFuncs":[],"affects":[]},"attr_repeating_alerts--global-alerts_$X_title":{"name":"repeating_alerts--global-alerts_$X_title","type":"span","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_repeating_alerts--global-alerts_$X_text":{"name":"repeating_alerts--global-alerts_$X_text","type":"span","defaultValue":"","triggeredFuncs":[],"affects":[]},"act_repeating_alerts--global-alerts_$X_close":{"triggeredFuncs":["onAlertRemoved"],"name":"repeating_alerts--global-alerts_$X_close","listener":"clicked:repeating_alerts--global-alerts:close","listenerFunc":"accessSheet","type":"action"},"attr_botch_formula":{"name":"botch_formula","type":"select","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_die-type-selection":{"name":"die-type-selection","type":"select","defaultValue":"","triggeredFuncs":[],"affects":[]},"attr_isMagi":{"name":"isMagi","type":"select","defaultValue":"","triggeredFuncs":[],"affects":[]}};
  
  kFuncs.cascades = cascades;
  
  const repeatingSectionDetails = [{"section":"repeating_spell","fields":["Technique_select","Form_select","spell_tech_name","spell_form_name"]},{"section":"repeating_weapons","fields":["Wounds_Load","Wounds_Range","Weapon_Load","Weapon_Range"]},{"section":"repeating_alerts--global-alerts","fields":["level","title","text"]}];
  
  kFuncs.repeatingSectionDetails = repeatingSectionDetails;
  
  const persistentTabs = [];
  
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
const funcs = {};
kFuncs.funcs = funcs;
const updateHandlers = {};
const openHandlers = {};
const initialSetups = {};
const allHandlers = {};
const addFuncs = {};

const kscaffoldJSVersion = '1.0.0';
const kscaffoldPUGVersion = '1.0.0';
  /*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
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
	debug('entering extractQueryResult');
	let queryRoll = await startRoll(`!{{query=[[0[response=?{${query}}]]]}}`);
	finishRoll(queryRoll.rollId);
	return queryRoll.results.query.expression.replace(/^.+?response=|\]$/g,'');
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
	debug('entering pseudoQuery');
	let queryRoll = await startRoll(`!{{query=[[0[response=${value}]]]}}`);
	finishRoll(queryRoll.rollId);
	return queryRoll.results.query.expression.replace(/^.+?response=|\]$/g,'');
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
  console.warn('kFuncs.version',kFuncs.version);
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
 * @memberof Utilities
 * @param {attributesProxy} attributes - The attributes object that must have a value for the reporder for each section.
 * @param {object[]} sections - Object containing the IDs for the repeating sections, indexed by repeating section name.
 */
const orderSections = function(attributes,sections){
  Object.keys(sections).forEach((section)=>{
    attributes.attributes[`_reporder_${section}`] = commaArray(attributes[`_reporder_${section}`]);
    sections[section] = orderSection(attributes.attributes[`_reporder_${section}`],sections[section]);
  });
};
kFuncs.orderSections = orderSections;

/**
 * Orders a single ID array.
 * @memberof Utilities
 * @param {string[]} repOrder - Array of IDs in the order they are in on the sheet.
 * @param {string[]} IDs - Array of IDs to be ordered. Aka the default ID Array passed to the getSectionIDs callback
 * @returns {string[]} - The ordered id array
 */
const orderSection = function(repOrder,IDs=[]){
  const idArr = [...repOrder,...IDs.filter(id => !repOrder.includes(id.toLowerCase()))];
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

Object.assign(kFuncs,{escape,unescape});/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
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
    k.debug({[cascName]:cascObj});
    if(event && cascObj){
      if(event.previousValue){
        cascObj.previousValue = event.previousValue;
      }else if(event.originalRollId){
        cascObj.originalRollId = event.originalRollId;
        cascObj.rollData = RE.unescape(event.originalRollId);
      }
    }
    return cascObj || {};
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
    debug(`calling ${funcName}`);
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
    k.debug({openHandlers});
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
 * @memberof Sheetworkers
 * @param {Roll20Event} event - The Roll20 event object
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
kFuncs.setSectionOrder = _setSectionOrder;

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
      debug({row});
      attributes[`${row}_name`] = '';
      setActionCalls({attributes,sections});
      const trigger = cascades[`fieldset_repeating_${section}`];
      if(trigger && trigger.addFuncs){
        trigger.addFuncs.forEach((funcName) => {
          if(funcs[funcName]){
            funcs[funcName]({attributes,sections,casc,trigger});
          }
        });
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
  const actionAttributes = [];
  k.debugMode = true;
  k.sheetName = "ArM5";
  k.version = "2.0";
   
  // k-scaffold fix ?
  const persistentTabs = [];
  
  // Top-level object for the sheetworkers
  const arm5 = {sheet: {}};
  
  // Legacy sheetworkers
   
const tabs = ["character","abilities","magic","combat","spells"].forEach(function (button) {
    on("clicked:" + button, function() {
        setAttrs({
            "sheetTab": button
        });
    });
});

// Die configuration and toggle
on("change:die-type-selection", function() {
    getAttrs(["die-type-selection"], function(values) {
        setAttrs({
            "die-type-selection-proxy": values["die-type-selection"]
        });
    });
});

on("clicked:die-toggle-simple", function() {
    setAttrs({
        "selected-die": "stress"
    });
});

on("clicked:die-toggle-stress", function() {
    setAttrs({
        "selected-die": "simple"
    });
});

// Additional fatigue levels
on("change:additionalFatigue", function() {
    getAttrs(["additionalFatigue"], function(values) {
        setAttrs({
            "additionalFatigueProxy": values.additionalFatigue
        });
    });
});

// Laboratory Adding

on("change:repeating_labspecializations:labbonus remove:repeating_labspecializations change:repeating_labspecializations:sactive", function() {
    getSectionIDs("repeating_labspecializations", function(IDArray) {
        var fieldNames = [];
        for (var i=0; i < IDArray.length; i++) {
            fieldNames.push("repeating_labspecializations_" + IDArray[i] + "_labbonus");
            fieldNames.push("repeating_labspecializations_" + IDArray[i] + "_sactive");
        }

        var total = 0;
        getAttrs(fieldNames, function(values) {
            for (var i=0; i < IDArray.length; i++) {
                total += (parseInt(values["repeating_labspecializations_" + IDArray[i] + "_labbonus"])||0) * ( parseInt(values["repeating_labspecializations_" + IDArray[i] + "_sactive"])|| 0 );
            }
            setAttrs({
                "labbonus_total": total
            });
        });
    });
});

//Wounds
on("change:Wounds_Light1 change:Wounds_Light2 change:Wounds_Light3 change:Wounds_Light4 change:Wounds_Light5 change:Wounds_Medium1 change:Wounds_Medium2 change:Wounds_Medium3 change:Wounds_Medium4 change:Wounds_Medium5 change:Wounds_Heavy1 change:Wounds_Heavy2 change:Wounds_Heavy3 change:Wounds_Heavy4 change:Wounds_Heavy5 change:Wounds_Incapacitated change:Wounds_Dead sheet:opened", function() {
    getAttrs(["Wounds_Light1", "Wounds_Light2", "Wounds_Light3", "Wounds_Light4", "Wounds_Light5", "Wounds_Medium1", "Wounds_Medium2", "Wounds_Medium3", "Wounds_Medium4", "Wounds_Medium5", "Wounds_Heavy1", "Wounds_Heavy2", "Wounds_Heavy3", "Wounds_Heavy4", "Wounds_Heavy5", "Wounds_Incapacitated", "Wounds_Dead"], function(values) {
        setAttrs({
            wound_total: (+values.Wounds_Light1 + +values.Wounds_Light2 + +values.Wounds_Light3 + +values.Wounds_Light4 + +values.Wounds_Light5 + +values.Wounds_Medium1 + +values.Wounds_Medium2 + +values.Wounds_Medium3 + +values.Wounds_Medium4 + +values.Wounds_Medium5 + +values.Wounds_Heavy1 + +values.Wounds_Heavy2 + +values.Wounds_Heavy3 + +values.Wounds_Heavy4 + +values.Wounds_Heavy5 + +values.Wounds_Incapacitated + +values.Wounds_Dead)
        });
    });
});

// Function to create a sheet-worker that updates totals computed from repeating sections
// The sections must follow some naming conventions, see code

function register_repeated_section_totals(section, properties) {
    var events = (
        "sheet:opened"
        + " remove:repeating_" + section
        + " change:repeating_" + section + ":isactive"
        + " change:repeating_" + section + ":" + section + "_name"
    );
    properties.forEach(function(prop, index, array) {
        events += " change:repeating_" + section + ":" + section + "_" + prop;
    });

    console.log("Registering events for section: " + section + " -> " + events);

    on(events, function() {
        getSectionIDs("repeating_" + section, function(id_array) {

            var attr_names = [];
            for (var i=0; i < id_array.length; i++) {
                attr_names.push("repeating_" + section + "_" + id_array[i] + "_" + section + "_name");
                attr_names.push("repeating_" + section + "_" + id_array[i] + "_isactive");
                properties.forEach(function(prop, index, array) {
                    attr_names.push("repeating_" + section + "_" + id_array[i] + "_" + section + "_" + prop);
                });
            }
            console.log("Attributes to get: " + attr_names.toString());

            var totals = {};
            properties.forEach(function(prop, index, array) {
                totals[section + "_total_" + prop] = 0
                totals[section + "_total_" + prop + "_detailed"] = "0";
            });
            console.log("Totals to compute: " + JSON.stringify(totals, null, 1));

            getAttrs(attr_names, function(attrs){
                var prefix = "";
                var value = 0;
                console.log("Got attributes: " + JSON.stringify(attrs, null, 1));

                for (var i=0; i < id_array.length; i++) {
                    console.log("Handling item #" + i);
                    prefix = "repeating_" + section + "_" + id_array[i] + "_";

                    properties.forEach(function(prop, index, array) {
                        if ((parseInt(attrs[prefix + "isactive"]) || 0) === 1) {
                            value = (parseFloat(attrs[prefix + section + "_" + prop]) || 0);
                            if (value != 0) {
                                totals[section + "_total_" + prop] += value;
                                totals[section + "_total_" + prop + "_detailed"] += (
                                    " + " + value.toString() + " [" + attrs[prefix + section + "_name"] + "]"
                                );
                            }
                        }
                    });
                }
                console.log("Computed totals: " + JSON.stringify(totals, null, 1));

                properties.forEach(function(prop, index, array) {
                    totals[section + "_total_" + prop] = Math.ceil(totals[section + "_total_" + prop]);
                    totals[section + "_total_" + prop + "_detailed"] = "ceil(" + totals[section + "_total_" + prop + "_detailed"] + ")";
                });
    
                console.log("computed totals: " + JSON.stringify(totals, null, 1));
                setAttrs(totals);
            });
        });
    });
}

register_repeated_section_totals("armors", ["prot", "load"]);
register_repeated_section_totals("combat-mods", ["init", "atk", "dfn", "dam", "soak"]);

// Weapon update has been ported to kScaffold, this isn't needed anymore
// Fix weapon attributes
// on("sheet:opened", function() {
//     const fixes = {
//         "_Wounds_Load": "_Weapon_Load",
//         "_Wounds_Range": "_Weapon_Range",
//     };
//     const keys = Object.keys(fixes);
//     getSectionIDs("repeating_weapons", function(id_array) {
//         var attr_names = [];
//         id_array.forEach( (id_) => (keys.forEach((key) => attr_names.push("repeating_weapons_" + id_ + key))));

//         getAttrs(attr_names, function(attrs) {
//             var value = 0;
//             var updates = {};
//             id_array.forEach( (id_) => (keys.forEach(function(key) {
//                 if (attrs["repeating_weapons_" + id_ + key]) {
//                     console.log(attrs["repeating_weapons_" + id_ + key]);
//                     console.log("Fixing " + "repeating_weapons_" + id_ + key + " to " + "repeating_weapons_" + id_ + fixes[key]);
//                     updates["repeating_weapons_" + id_ + fixes[key]] = parseInt(attrs["repeating_weapons_" + id_ + key]) || 0;
//                     updates["repeating_weapons_" + id_ + key] = "";
//                 }
//             })));
//             console.log("All fixes :" + JSON.stringify(updates, null, 1));
//             setAttrs(updates);
//         });
//     });
// });

// Duplicate the global bonuses inside the weapons repeating section for display
// From https://app.roll20.net/forum/post/10297616/how-do-i-reference-a-global-attribute-in-a-span-in-a-repeating-section

const section = "weapons";
const repeating_stats = ["init", "atk", "dfn", "dam", "soak"].map(prop => `combat-mods_total_${prop}`);
const changes = repeating_stats.reduce((str, stat) => `${str} change:${stat.toLowerCase()}`, 'sheet:opened');
on(changes, () => {
    getSectionIDs(`repeating_${section}`, idarray => {
        const fieldnames = idarray.reduce((rows,id) => [...rows, ...repeating_stats.map(stat => `repeating_${section}_${id}_${stat}`)], []);
        getAttrs([...repeating_stats, ...fieldnames], v => {
            const output = {};
            idarray.forEach(id => {
                repeating_stats.forEach(stat => {
                    output[`repeating_${section}_${id}_${stat}`] = v[stat];
                });
            });
            setAttrs(output);
        });
    });
});


// Translation key replacement
on("sheet:opened", function(eventInfo){
    setAttrs({
        "ability_i18n": getTranslationByKey("ability"),
        "armor_i18n": getTranslationByKey("armor"),
        "artes_i18n": getTranslationByKey("artes-lib-"),
        "attack_i18n": getTranslationByKey("attack"),
        "aura_i18n": getTranslationByKey("aura"),
        "bold_i18n": getTranslationByKey("gestures-bold"),
        "bonus_i18n": getTranslationByKey("bonus"),
        "botch_i18n": getTranslationByKey("botch"),
        "characteristic_i18n": getTranslationByKey("characteristic"),
        "communication_i18n": getTranslationByKey("communication-short"),
        "botch_num_i18n": getTranslationByKey("botch-num"),
        "circumstances_i18n": getTranslationByKey("circumstances-m"),
        "circumstantial_i18n": getTranslationByKey("circumstantial"),
        "critical_i18n": getTranslationByKey("critical"),
        "damage_i18n": getTranslationByKey("damage"),
        "defense_i18n": getTranslationByKey("defense"),
        "deficiency_i18n": getTranslationByKey("deficiency"),
        "encumbrance_i18n": getTranslationByKey("encumbrance"),
        "exaggerated_i18n": getTranslationByKey("gestures-exaggerated"),
        "fatigue_i18n": getTranslationByKey("fatigue-m"),
        "firm_i18n": getTranslationByKey("words-firm"),
        "focus_i18n": getTranslationByKey("focus"),
        "form_i18n": getTranslationByKey("form"),
        "gestures_i18n": getTranslationByKey("gestures"),
        "gest-none_i18n": getTranslationByKey("gestures-none"),
        "initiative_i18n": getTranslationByKey("initiative"),
        "loud_i18n": getTranslationByKey("words-loud"),
        "modifiers_i18n": getTranslationByKey("modifiers"),
        "philos_i18n": getTranslationByKey("philos-"),
        "quiet_i18n": getTranslationByKey("words-quiet"),
        "simple-die_i18n": getTranslationByKey("simple"),
        "soakbns_i18n": getTranslationByKey("soak-bonus"),
        "spontaneous_i18n": getTranslationByKey("spontaneous"),
        "stress-die_i18n": getTranslationByKey("stress"),
        "subtle_i18n": getTranslationByKey("gestures-subtle"),
        "technique_i18n": getTranslationByKey("technique"),
        "total_i18n": getTranslationByKey("total"),
        "unselected_i18n": getTranslationByKey("unselected"),
        "words_i18n": getTranslationByKey("words"),
        "words-none_i18n": getTranslationByKey("words-none"),
        "wounds_i18n": getTranslationByKey("wounds"),
        "intelligence_i18n": getTranslationByKey("intelligence"),
        "perception_i18n": getTranslationByKey("perception"),
        "presence_i18n": getTranslationByKey("presence"),
        "communication_i18n": getTranslationByKey("communication"),
        "strength_i18n": getTranslationByKey("strength"),
        "stamina_i18n": getTranslationByKey("stamina"),
        "dexterity_i18n": getTranslationByKey("dexterity"),
        "quickness_i18n": getTranslationByKey("quickness"),
        "ask_short_i18n": getTranslationByKey("ask-short"),
        "global_char_short_i18n": getTranslationByKey("global-short"),
        "intelligence_short_i18n": getTranslationByKey("intelligence-short"),
        "perception_short_i18n": getTranslationByKey("perception-short"),
        "presence_short_i18n": getTranslationByKey("presence-short"),
        "communication_short_i18n": getTranslationByKey("communication-short"),
        "strength_short_i18n": getTranslationByKey("strength-short"),
        "stamina_short_i18n": getTranslationByKey("stamina-short"),
        "dexterity_short_i18n": getTranslationByKey("dexterity-short"),
        "quickness_short_i18n": getTranslationByKey("quickness-short"),
        "creo_i18n": getTranslationByKey("creo"),
        "intellego_i18n": getTranslationByKey("intellego"),
        "muto_i18n": getTranslationByKey("muto"),
        "perdo_i18n": getTranslationByKey("perdo"),
        "rego_i18n": getTranslationByKey("rego"),
        "animal_i18n": getTranslationByKey("animal"),
        "aquam_i18n": getTranslationByKey("aquam"),
        "auram_i18n": getTranslationByKey("auram"),
        "corpus_i18n": getTranslationByKey("corpus"),
        "herbam_i18n": getTranslationByKey("herbam"),
        "ignem_i18n": getTranslationByKey("ignem"),
        "imaginem_i18n": getTranslationByKey("imaginem"),
        "mentem_i18n": getTranslationByKey("mentem"),
        "terram_i18n": getTranslationByKey("terram"),
        "vim_i18n": getTranslationByKey("vim")
    });

    // Alert system has been replaced, this serves no purposes
    // getAttrs(["notNew"], function (values) {
    //     if (values.notNew == 0) {
    //         setAttrs({
    //             "notNew": 1,
    //             "alert-alert-update-v1-7-1": 1,
    //             "alert-alert-update-v1-7": 1,
    //             "alert-alert-update-v1-6-5": 1,
    //             "alert-alert-update-v1-6-4": 1,
    //             "alert-alert-update-v1-6-3": 1,
    //             "alert-alert-update-v1-6-2": 1,
    //             "alert-alert-update-v1-6-1": 1,
    //             "alert-alert-update-v1-6": 1,
    //             "alert-alert-update-v1-51": 1,
    //             "alert-alert-update-v1-5": 1,
    //             "alert-alert-update-v1-4": 1,
    //             "alert-161-spell-update": 1,
    //             "alert-alert-update-v1_6-dataloss": 1,
    //             "alert-alert-update-v1-7-armorylegacy": 1
    //         }); 
    //     }
    // });

    // The spell update has been ported to k-Scaffold, this is unneeded
    // Update old spell art selection to new format
    // Skip it if the Warning banner for that update is closed
    // getAttrs(["alert-161-spell-update"], function(values) {
    //     if (values["alert-161-spell-update"] == 0) {
    //         getSectionIDs("spell", function(idarray) {
    //             const tech_translation = {
    //                 0: "unselected",
    //                 1: "Creo",
    //                 2: "Intellego",
    //                 3: "Muto",
    //                 4: "Perdo",
    //                 5: "Rego"
    //             };
    //             const form_translation = {
    //                 0: "unselected",
    //                 1: "Animal",
    //                 2: "Aquam",
    //                 3: "Auram",
    //                 4: "Corpus",
    //                 5: "Herbam",
    //                 6: "Ignem",
    //                 7: "Imaginem",
    //                 8: "Mentem",
    //                 9: "Terram",
    //                 10: "Vim"
    //             };
    //             for (var i=0; i < idarray.length; i++) {
    //                 const spellid = idarray[i];
    //                 console.log("Update 1.6.1 - Spell arts updater script - scheduling update for spell ID:" + spellid);
    //                 getAttrs(
    //                     [   
    //                         "repeating_spell_" + spellid + "_spell_name",
    //                         "repeating_spell_" + spellid + "_Technique_select",
    //                         "repeating_spell_" + spellid + "_Form_select"
    //                     ],
    //                     function (values) {
    //                         attr_updates = {
    //                             ["repeating_spell_" + spellid + "_spell_tech_name"]: tech_translation[values["repeating_spell_" + spellid + "_Technique_select"]] || "unselected",
    //                             ["repeating_spell_" + spellid + "_spell_form_name"]: form_translation[values["repeating_spell_" + spellid + "_Form_select"]] || "unselected"
    //                         };
    //                         console.log("Update 1.6.1 - Spell arts updater script - " + values["repeating_spell_" + spellid + "_spell_name"] + " (ID " + spellid + ")");
    //                         console.log(attr_updates);
    //                         console.log("Update 1.6.1 - Spell arts updater script - spell " + spellid + " END");
    //                         setAttrs(attr_updates);
    //                     }
    //                 );
    //             }
    //             console.log("Update 1.6.1 - Spell arts updater script - all spell scheduled for update");
    //             setAttrs({"alert-161-spell-update": 1});
    //         });
    //     }
    // });
    
});
  
  
  const helpers = {
};

/**
 * The function to create a new alert in an `+alert` mixin. Retruns the RowID (including the repeating secgion namt) of the created alert.
 * @memberof Sheetworkers
 * @param {string} name - The name of the alert. It will be prepended by `repeating_alerts--`. Note that contrary to the PUG mixin, this doesn't sanitize the name, so you'll need to spell out the sanitized version.
 * @param {string} title - The text to put in the title of the alert, after the level icon.
 * @param {string} text - The text to write as the content of the alert. Can contain newlines, as it is written to a textarea.
 * @param {Object} attributes - The `attributes` object given by k-Scaffold that contains the attributes of the sheet
 * @param {Object} sections - The `sections` object given by k-Scaffold that contains the sections of the sheet
 * @param {level} string - The level of the alert. One of "info", "warning", "error", "success". Changes the default styling of the alert.
 */
const kCreateAlert = function ({ name, title, text, attributes, sections, level = "info" }) {
    if (["info", "warning", "error", "success"].indexOf(level) === -1) {
        throw new Error(`Invalid alert level "${level}"`);
    }
    // Warning: the name isn't sanitized like it is in the PUG, might create discrepancies
    const section = `repeating_alerts--${name}`;
    // Contrary to doc, k.generateRowID also includes the section name in the returned value
    const rowID = k.generateRowID(section, sections);
    attributes[`${rowID}_level`] = level;
    attributes[`${rowID}_title`] = title;
    attributes[`${rowID}_text`] = text;
    return rowID;
};

/**
 * The default trigger called when one clicks the close button on an alert. Deletes the triggering alert from the repeating section.
 * @memberof Sheetworkers
 * @param {string} trigger - The trigger object passed by kScaffold
 * @param {Object} attributes - The `attributes` object given by k-Scaffold that contains the attributes of the sheet
 * @param {Object} sections - The `sections` object given by k-Scaffold that contains the sections of the sheet
 */
const kDeleteAlert = function ({ trigger, attributes, sections }) {
    const [section, rowID, _] = k.parseTriggerName(trigger.name);
    k.removeRepeatingRow(`${section}_${rowID}`, attributes, sections);
};

k.registerFuncs({ "kDeleteAlert": kDeleteAlert });
  
  
   

// Clear the scheduled updates on a kScaffold `attributes` object
const clearAttributesUpdates = function (attributes) {
    const updates = attributes.updates;
    // From https://stackoverflow.com/questions/684575/how-to-quickly-clear-a-javascript-object
    // NOTE: we don't really now what the `updates` object is, so use the safer deletion code
    for (const prop of Object.getOwnPropertyNames(updates)) {
        delete updates[prop];
    }
};

// Function to help building update function that are properly hooked up in our system
// It wraps a function such that:
//  - If the wrapped function fails and raises an exception:
//    - All pending update on the `attributes` object are cleared
//    - An error alert is created with the error details to notify the player
//    - The `update_error_rowid` hidden attribute is set to the RowID of the created alert
//    - Forces an update of the sheet's attribute, to effectively create said alert and store the RowID
//    - Forwards the caugh error to the caller to interrupt kScaffold update mecanism
//  - If the `update_error_rowid` hidden attribute is set at the start of the function, it immediatly
//    error outs, preventing kScaffold update from running to completion. This is because there is still
//    an error on the sheet that prevents the update from working, so we cannot continue.
const wrapUpdateFunction = function (func) {
    const wrapper = function ({ trigger, attributes, sections, casc }) {
        // If the update system is currently on hold due to an error, exit early
        if (attributes["update_error_rowid"]) {
            k.debug(`The update system is locked by alert row ${attributes["update_error_rowid"]}, exiting update stack...`);
            throw new Error(`Interrupted updates: previous error at row ${attributes["update_error_rowid"]} is locking updates`);
        }
        // Try to execute the wrapped function
        try {
            func({ trigger, attributes, sections, casc });
        } catch (error) {
            // Update function failed, notify the user and exit
            // First, cancel pending updates: update function may have scheduled partial updates
            clearAttributesUpdates(attributes);
            // Then, generate a new alert for the user
            const text = `An update of the sheet failed. Please contact the sheet developpers for help (see the Help menu). Please provide the full stacktrace below when reporting errors.

The update system has been locked so that you can fix the problem. Closing this alert will unlock the update system and trigger a new update attempt the next time the sheet is opened.

Stacktrace for function '${func.name || '<anonymous>'}'
──────────
${error.stack}
${error}
`;
            const row_name = kCreateAlert({
                name: "global-alerts",
                title: "!! Update error !! Your sheet is likely broken, please read on",
                text,
                level: "error",
                attributes,
                sections,
            });
            // Register the error to lock the update system
            const [section, rowID, attrName] = k.parseRepeatName(row_name);
            attributes["update_error_rowid"] = rowID;
            // Forcefully update the attributes of the sheet, because we'll throw an Error so kScaffold won't do it
            attributes.set({ attributes });
            k.debug(`Locked update execution on alert row ${rowID}`);
            // Finally, forward our error to the caller
            throw error;
        }

    };
    return wrapper;
};

const onAlertRemoved = function ({ trigger, attributes, sections, casc }) {
    if (attributes["update_error_rowid"]) {
        const [section, rowID, attrName] = k.parseTriggerName(trigger.name);
        // Roll20 event contain a lowercase rowID. There *is* a risk of clash, but we can't do better
        // We also lowercase the event in case this changes in the future, so that the sheet doesn't break
        if (rowID.toLowerCase() === attributes["update_error_rowid"].toLowerCase()) {
            k.debug(`Cleared attribute 'update_error_rowid' because row ${rowID} was deleted`);
            attributes["update_error_rowid"] = "";
            // TODO: trigger an update by calling a k.updateSheet when this is possible
        }
    }
    kDeleteAlert({ trigger, attributes, sections, casc });
};
k.registerFuncs({ onAlertRemoved });


const updateSpellArts = wrapUpdateFunction(
    function updateSpellArts({ attributes, sections }) {
        // Only update if the update was not previously applied
        // In the old sheet system, we had an explicit attribute to hide/display
        // each alert, and updating spells was conditionned on this alert being shown
        // We re-use that legacy attribute to detect if the alert is needed. It
        // Is forcefully registered into k-scaffold in _updates.pug, so k-Scaffold
        // loads it if available
        if (attributes["alert-161-spell-update"] === 0) {
            const techRename = {
                0: "unselected",
                1: "Creo",
                2: "Intellego",
                3: "Muto",
                4: "Perdo",
                5: "Rego"
            };
            const formRename = {
                0: "unselected",
                1: "Animal",
                2: "Aquam",
                3: "Auram",
                4: "Corpus",
                5: "Herbam",
                6: "Ignem",
                7: "Imaginem",
                8: "Mentem",
                9: "Terram",
                10: "Vim"
            };
            const ids = sections.repeating_weapons || [];
            const details = [];
            for (const rowID of ids) {
                const row = `repeating_spell_${rowID}`;
                attributes[`${row}_spell_tech_name`] = techRename[attributes[`${row}_Technique_select`]] || "unselected";
                attributes[`${row}_spell_form_name`] = formRename[attributes[`${row}_Form_select`]] || "unselected";
                details.push(attributes[`${row}_spell_name`]);
            }
            if (details.length) {
                message = [
                    "Spells technique & form selection have been converted to the new format",
                    ""
                ];
                details.forEach(name => message.push(`  - Updated spell '${name}'`));
                helpers.alerts.add({
                    title: "Update v1.6.1 - Spell update",
                    text: message.join("\n"),
                    level: "success",
                    attributes: attributes,
                    sections: sections,
                });
            }
        }
    }
);


const renameWeaponAttributes = wrapUpdateFunction(
    function renameWeaponAttributes({ attributes, sections }) {
        const fixes = {
            "_Wounds_Load": "_Weapon_Load",
            "_Wounds_Range": "_Weapon_Range",
        };
        const ids = sections.repeating_weapons || [];
        const details = [];
        for (const id of ids) {
            // Sometimes the array of ids contains an empty string
            if (id) {
                for (const [old, updated] of Object.entries(fixes)) {
                    const old_name = `repeating_weapons_${id}${old}`;
                    const new_name = `repeating_weapons_${id}${updated}`;
                    if (attributes[old_name]) {
                        attributes[new_name] = attributes[old_name];
                        attributes[old_name] = "";
                        details.push(attributes[`repeating_weapons_${id}_Weapon_name`]);
                    }
                }
            }
        }
        if (details.length) {
            message = [
                "Weapons internal attributes have been corrected.",
                ""
            ];
            details.forEach(name => message.push(`  - Updated weapon '${name}'`));
            helpers.alerts.add({
                title: "Update v1.7 - Magic & Armory",
                text: message.join("\n"),
                level: "success",
                attributes: attributes,
                sections: sections,
            });
        }
    }
);

// NOTE: not wrapped by wrapUpdateFunction because sub-functions already are
const updateToKScaffold = function updateToKScaffold({ trigger, attributes, sections, casc }) {
    // This attribute is only defined on old sheets
    if (typeof attributes["notNew"] !== "undefined") {
        updateSpellArts({ trigger, attributes, sections, casc });
        renameWeaponAttributes({ trigger, attributes, sections, casc });
    }
};
k.registerFuncs({ updateToKScaffold }, { type: ["new"] });

// const _testAlerts = function ({ trigger, attributes, sections }) {
//     ["info", "warning", "error", "success"].forEach(level => {
//         kCreateAlert({
//             name: "global-alerts",
//             title: "test alert",
//             text: "test alert\nnewline",
//             level,
//             attributes,
//             sections

//         });
//     });
// }
// k.registerFuncs({ _testAlerts }, { type: ["opener"] });

// const displayKScaffoldArgs = function ({ trigger, attributes, sections, casc }) {
//     console.log("Displaying kScaffold arguments");
//     console.log(trigger);
//     console.log(attributes);
//     console.log(sections);
//     console.log(casc);
// };

// k.registerFuncs({ displayKScaffoldArgs }, { type: ["opener"] });
   

console.debug = vi.fn(a => null);
console.log = vi.fn(a => null);
console.table = vi.fn(a => null);
module.exports = {k,...global};