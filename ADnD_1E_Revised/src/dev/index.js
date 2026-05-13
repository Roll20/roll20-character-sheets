//-------------------------------------------------------------------------------------
// orcsAsync: https://github.com/onyxring/orcsAsync
// Compensates for a defect in the underlying Roll20 system, where it "loses context"
// (forgets which player is active) during asynchronous methods and callbacks,
// resulting in error messages like:
//
//      Error: Trying to do getAttrs when no character is active in sandbox.
//
// Include this script at the top of your character sheet's code section to have
// setTimeout() and setInterval() just start working as expected; no additional setup
// required.  Additionally, async-safe versions of the typical attribute functions will
// be available:
//
//      getAttrsAsync
//      setAttrsAsync
//      getSectionIDsAsync
//
const isRunningOnServer = () => {
  return self.dispatchEvent == undefined;
};

const setActiveCharacterId = (charId) => {
  let oldAcid = getActiveCharacterId();
  let msg = {id: '0', type: 'setActiveCharacter', data: charId};

  if (isRunningOnServer() == false) {
    //if in a browser, use "dispatchEvent" to process the message
    let ev = new CustomEvent('message');
    ev.data = msg;
    self.dispatchEvent(ev);
  } else {
    //otherwise, use the API (server) message processor, "onmessage"
    self.onmessage({data: msg});
  }
  return oldAcid; //return what the value used to be, so calling code can be a little cleaner
};

let _sIn = setInterval;
setInterval = function (callback, timeout) {
  let acid = getActiveCharacterId();
  _sIn(function () {
    let prevAcid = setActiveCharacterId(acid);
    callback();
    setActiveCharacterId(prevAcid);
  }, timeout);
};

let _sto = setTimeout;
setTimeout = function (callback, timeout) {
  let acid = getActiveCharacterId();
  _sto(function () {
    let prevAcid = setActiveCharacterId(acid);
    callback();
    setActiveCharacterId(prevAcid);
  }, timeout);
};

// A simple helper to use your setTimeout as a promise
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const getAttrsAsync = (props) => {
  let acid = getActiveCharacterId(); //save the current activeCharacterID in case it has changed when the promise runs
  let prevAcid = null; //local variable defined here, because it needs to be shared across the promise callbacks defined below
  return new Promise((resolve, reject) => {
    prevAcid = setActiveCharacterId(acid); //in case the activeCharacterId has changed,
    // restore it to what we were expecting and save the current value to restore later
    try {
      getAttrs(props, (values) => {
        resolve(values);
      });
    } catch {
      reject();
    }
  }).finally(() => {
    setActiveCharacterId(prevAcid); //restore activeCharacterId to what it was when the promise first ran
  });
};

const setAttrsAsync = (propObj, options) => {
  let acid = getActiveCharacterId();
  let prevAcid = null;
  return new Promise((resolve, reject) => {
    prevAcid = setActiveCharacterId(acid);
    try {
      setAttrs(propObj, options, (values) => {
        resolve(values);
      });
    } catch {
      reject();
    }
  }).finally(() => {
    setActiveCharacterId(prevAcid);
  });
};

const getSectionIDsAsync = (sectionName) => {
  let acid = getActiveCharacterId();
  let prevAcid = null;
  return new Promise((resolve, reject) => {
    prevAcid = setActiveCharacterId(acid);
    try {
      getSectionIDs(sectionName, (values) => {
        resolve(values);
      });
    } catch {
      reject();
    }
  }).finally(() => {
    setActiveCharacterId(prevAcid);
  });
};
//-------------------------------------------------------------------------------------

// GiGs custom handling for number type and logs
const int = (score, error = 0) => {
  const n = parseInt(score, 10);
  return isNaN(n) ? error : n;
};
const float = (score, error = 0) => {
  const n = parseFloat(score);
  return isNaN(n) ? error : n;
};
const clog = (text, color = 'green') => {
  const message = `%c ${text}`;
  console.log(message, `color: ${color}; font-weight:bold`);
};

// during version updates, we need to check that an attribute exists and is not equal to its default, before updating it.
const doUpdate = (stat, def = 0) => typeof stat !== 'undefined' && stat !== def;

// handles regex for testing and replacing macrotext attributes
const replaceSet = (attr, set) => {
  // set must be an object, with key: value pairs of 'itemToReplace': 'replaceWith'.
  let modifiedAttr = attr; // Create a new variable to store the modified string
  _.each(Object.entries(set), ([toReplace, replaceWith]) => {
    modifiedAttr = modifiedAttr.replace(new RegExp(toReplace.replace('{', '{'), 'gi'), replaceWith);
  });
  return modifiedAttr;
};

// Character Name Validation
const isAlphaNumericWithSpaces = async (attr) => {
  // Check for alpha-numeric characters and spaces
  if (/^[a-zA-Z0-9\s]+$/.test(attr)) {
    return true;
  }
  // Check for specific characters '), |, or }' that can break a macro
  if (/[)|\}]/.test(attr)) {
    return false;
  }
  return true;
};

// Number Validation
const numbersOnly = async (attr) => {
  // numbers and/or - + symbols before number are allowed
  // add a `(?:\.[0-9]+)?` after the `[0-9]+` bit if decimals are allowed
  return /^[-+]?[0-9]+$/.test(attr) ? 1 : 0;
};

// generate a unique ID 100 % of the time
const uniqueids = {};
const generateUniqueRowID = () => {
  let generated = generateRowID();
  while (uniqueids[generated] === true) {
    // clog(`generateUniqueRowID: ${generated} is not a unique ID, trying again.`);
    generated = generateRowID();
  }
  // clog(`generateUniqueRowID: ${generated} verified as unique, returning.`);
  uniqueids[generated] = true;
  return generated;
};

// Validate character name for illegal characters
on('change:character_name', async (eventInfo) => {
  // clog(`Δ detected: ${eventInfo.sourceAttribute}`);
  const v = await getAttrsAsync(['character_name']);
  const output = {};
  const attr = v[`${eventInfo.sourceAttribute}`];
  // validate input
  const isText = await isAlphaNumericWithSpaces(attr);
  // clog(`Valid Input?: ${isText}`);
  // write to a hidden checkbox in html ie 'X_error', CSS to style
  output[`${eventInfo.sourceAttribute}_error`] = isText;
  await setAttrsAsync(output, {silent: true});
});

// Validate input for +/- adjustment
on(
  'change:armortype_magic change:armortype2_magic change:armorshield_magic change:armorhelmet_magic change:armorother_magic change:armorother2_magic change:armorother3_magic change:armorother4_magic change:armorother5_magic change:armorother6_magic change:armorshield_mod change:armorother_mod change:armorother2_mod change:armorother3_mod change:armorother4_mod change:armorother5_mod change:armorother6_mod change:repeating_equipment:equipment_armor_mod change:repeating_equipment:equipment_armor_magic, change:hitpoints_1_class, change:hitpoints_2_class, change:hitpoints_3_class',
  async (eventInfo) => {
    // clog(`Δ detected: ${eventInfo.sourceAttribute}`);
    const id = eventInfo.sourceAttribute.split('_')[2];
    const v = await getAttrsAsync([
      'armortype_magic',
      'armortype2_magic',
      'armorshield_magic',
      'armorhelmet_magic',
      'armorother_magic',
      'armorother2_magic',
      'armorother3_magic',
      'armorother4_magic',
      'armorother5_magic',
      'armorother6_magic',
      'armorshield_mod',
      'armorother_mod',
      'armorother2_mod',
      'armorother3_mod',
      'armorother4_mod',
      'armorother5_mod',
      'armorother6_mod',
      `repeating_equipment_${id}_equipment_armor_magic`,
      `repeating_equipment_${id}_equipment_armor_mod`,
      'hitpoints_1_class',
      'hitpoints_2_class',
      'hitpoints_3_class',
    ]);
    const output = {};
    const attr = v[`${eventInfo.sourceAttribute}`];
    // validate input
    const isNumber = await numbersOnly(attr);
    // clog(`NUMBER?: ${isNumber}`);
    // write to a hidden checkbox in html ie 'X_error', CSS to style
    output[`${eventInfo.sourceAttribute}_error`] = isNumber;
    await setAttrsAsync(output, {silent: true});
  },
);

const attackMacroDefault =
  '&{template:attacks} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=@{weapon_name}}} {{dual=@{weapon_dual}}} {{attack1=[[ 1d20 + ( @{weapon_backstab_bonus}[BACKSTAB] ) + ( @{weapon_tohitbonus}[HIT_BON] ) + ( @{weapon_prof_pen}[PROF_PEN] ) + ( @{weapon_dual_pen}[DUAL_PEN] ) + ( @{weapon_magicbonus}[MAG_BON] ) + ( ?{To Hit Modifier?|0}[MISC_MOD] ) ]]}} {{damagevsSMchatmenu=@{weapon_damagesmallmedium_chat_menu}}} {{damagevsLchatmenu=@{weapon_damagelarge_chat_menu}}} {{critdamagevsSMchatmenu=@{weapon_critdamagesmallmedium_chat_menu}}} {{critdamagevsLchatmenu=@{weapon_critdamagelarge_chat_menu}}} {{WeaponNotes=@{weapon_notes}}} {{backstab=[[ @{weapon_backstab_mult} ]]}} {{damagetype=@{weapon_attackdmgtype}}} {{rate=@{weapon_rateoffire}}} {{range=@{weapon_range}}} {{length=@{weapon_length}}} {{space=@{weapon_space}}} {{speed=@{weapon_speed}}} {{ammo=[[ @{weapon_ammo} ]]/[[ @{weapon_ammo|max} ]]}} {{crit=[[ @{toggle_critdamage} ]]}} @{weapon_tohitacadj}';

const armorRowIDs = [
  'unarmored_row_id',
  'armortype1_row_id',
  'armortype2_row_id',
  'armorshield_row_id',
  'armorhelmet_row_id',
  'armorother1_row_id',
  'armorother2_row_id',
  'armorother3_row_id',
  'armorother4_row_id',
  'armorother5_row_id',
  'armorother6_row_id',
];

const armorAttrs = [
  'unarmored_worn',
  'unarmored',
  'unarmored_ac',
  'unarmored_base',
  'unarmored_bulk',
  'unarmored_carried',
  'unarmored_weight',
  'unarmored_cost',
  'armortype_worn',
  'armortype',
  'armortype_ac',
  'armortype_base',
  'armortype_magic',
  'armortype_bulk',
  'armortype_carried',
  'armor_weight',
  'armor_cost',
  'armortype2_worn',
  'armortype2',
  'armortype2_ac',
  'armortype2_base',
  'armortype2_magic',
  'armortype2_bulk',
  'armortype2_carried',
  'armortype2_weight',
  'armortype2_cost',
  'armorshield_worn',
  'armorshield',
  'armorshield_ac',
  'armorshield_base',
  'armorshield_magic',
  'armorshield_mod',
  'armorshield_bulk',
  'armorshield_carried',
  'armorshield_weight',
  'armorshield_cost',
  'armorhelmet_worn',
  'armorhelmet',
  'armorhelmet_ac',
  'armorhelmet_magic',
  'armorhelmet_bulk',
  'armorhelmet_carried',
  'armorhelmet_weight',
  'armorhelmet_cost',
  'armorother_worn',
  'armorother',
  'armorother_ac',
  'armorother_base',
  'armorother_magic',
  'armorother_mod',
  'armorother2_worn',
  'armorother2',
  'armorother2_ac',
  'armorother2_base',
  'armorother2_magic',
  'armorother2_mod',
  'armorother3_worn',
  'armorother3',
  'armorother3_ac',
  'armorother3_base',
  'armorother3_magic',
  'armorother3_mod',
  'armorother4_worn',
  'armorother4',
  'armorother4_ac',
  'armorother4_base',
  'armorother4_magic',
  'armorother4_mod',
  'armorother5_worn',
  'armorother5',
  'armorother5_ac',
  'armorother5_base',
  'armorother5_magic',
  'armorother5_mod',
  'armorother6_worn',
  'armorother6',
  'armorother6_ac',
  'armorother6_base',
  'armorother6_magic',
  'armorother6_mod',
];

// create Armor Details arrays to determine which row to create/update/reset
const unarmoredAttrs = ['unarmored_worn', 'unarmored', 'unarmored_ac', 'unarmored_base', 'unarmored_bulk', 'unarmored_carried', 'unarmored_weight', 'unarmored_cost'];
const armor1Attrs = ['armortype_worn', 'armortype', 'armortype_ac', 'armortype_base', 'armortype_magic', 'armortype_bulk', 'armortype_carried', 'armor_weight', 'armor_cost'];
const armor2Attrs = [
  'armortype2_worn',
  'armortype2',
  'armortype2_ac',
  'armortype2_base',
  'armortype2_magic',
  'armortype2_bulk',
  'armortype2_carried',
  'armortype2_weight',
  'armortype2_cost',
];
const shieldAttrs = [
  'armorshield_worn',
  'armorshield',
  'armorshield_ac',
  'armorshield_base',
  'armorshield_magic',
  'armorshield_mod',
  'armorshield_bulk',
  'armorshield_carried',
  'armorshield_weight',
  'armorshield_cost',
];
const helmetAttrs = ['armorhelmet_worn', 'armorhelmet', 'armorhelmet_ac', 'armorhelmet_magic', 'armorhelmet_bulk', 'armorhelmet_carried', 'armorhelmet_weight', 'armorhelmet_cost'];
const other1Attrs = ['armorother_worn', 'armorother', 'armorother_ac', 'armorother_base', 'armorother_magic', 'armorother_mod'];
const other2Attrs = ['armorother2_worn', 'armorother2', 'armorother2_ac', 'armorother2_base', 'armorother2_magic', 'armorother2_mod'];
const other3Attrs = ['armorother3_worn', 'armorother3', 'armorother3_ac', 'armorother3_base', 'armorother3_magic', 'armorother3_mod'];
const other4Attrs = ['armorother4_worn', 'armorother4', 'armorother4_ac', 'armorother4_base', 'armorother4_magic', 'armorother4_mod'];
const other5Attrs = ['armorother5_worn', 'armorother5', 'armorother5_ac', 'armorother5_base', 'armorother5_magic', 'armorother5_mod'];
const other6Attrs = ['armorother6_worn', 'armorother6', 'armorother6_ac', 'armorother6_base', 'armorother6_magic', 'armorother6_mod'];

// concatenates repeating attribute names
const concatRepAttrName = (sectionName, id, field) => `repeating_${sectionName}_${id}_${field}`;

// fixes attribute name conflict
const dmgSwap = async (current_version, final_version) => {
  const idArray = await getSectionIDsAsync('repeating_weapon');
  const fields = idArray.flatMap((id) => [`repeating_weapon_${id}_DmgBonus`, `repeating_weapon_${id}_macro-text`]);
  const v = await getAttrsAsync(fields);
  const output = {};
  const macrodefault =
    '&{template:attacks} {{name=@{character_name}}} {{subtag=@{WeaponName}}} {{attack1=[[1d20 + @{ToHitBonus}[BON] + @{MagicBonus}[MAG] + ?{To Hit Modifier?|0}[MOD] ]]}} {{damage1vsSM=[[@{DamageSmallMedium} + @{DmgBonus}[BON] + @{MagicBonus}[MAG] + ?{Damage Modifier?|0}[MOD] ]]}} {{damage1vsL=[[@{DamageLarge} + @{DmgBonus}[BON] + @{MagicBonus}[MAG] + ?{Damage Modifier?|0}[MOD] ]]}} {{WeaponNotes=@{WeaponNotes}}} @{whisper_to-hit}';
  _.each(idArray, (id) => {
    const prefix = `repeating_weapon_${id}_`;
    const macrotext = v[`${prefix}macro-text`] || macrodefault;

    // replaces old attribute call with new one in the macro string
    output[`${prefix}macro-text`] = macrotext.replace(/@{DmgBonus}/g, '@{AttackDmgBonus}');

    // copy old numeric value to the new attribute key
    output[`${prefix}AttackDmgBonus`] = +v[`${prefix}DmgBonus`] || 0;
  });
  output.sheet_version = current_version;
  clog(`VERSION UPDATE: dmgSwap completed`);
  await setAttrsAsync(output, {silent: true});
  return await versionator(current_version, final_version);
};

// fixes attribute name conflict
const maxSwap = async (current_version, final_version) => {
  const idArray = await getSectionIDsAsync('repeating_ability');
  const fields = idArray.map((id) => `repeating_ability_${id}_max`);
  const v = await getAttrsAsync(fields);
  const output = {};
  _.each(idArray, (id) => {
    const oldAttr = `repeating_ability_${id}_max`;
    const newAttr = `repeating_ability_${id}_current_max`;
    output[newAttr] = +v[oldAttr] || 0;
  });
  output.sheet_version = current_version;
  clog(`VERSION UPDATE: maxSwap completed`);
  await setAttrsAsync(output, {silent: true});
  return await versionator(current_version, final_version);
};

// replace default macro-text of non-weapon proficiencies ONLY IF they haven't been edited
const nwpMacroUpdate = async (current_version, final_version) => {
  const idArray = await getSectionIDsAsync('repeating_nonweaponproficiencies');
  const fields = idArray.map((id) => `repeating_nonweaponproficiencies_${id}_macro-text`);
  const v = await getAttrsAsync(fields);
  const output = {};
  const replacements = {
    nwp_old:
      '&{template:general} {{name=@{character_name}}} {{subtag=Non Weapon Proficiency: @{name}}} {{=@{short_description}}}{{Success Amount=[[((@{rAttribute})+(@{rSlots}-1)-1d20)cs>1cf<-1]]}}',
    nwp_new:
      '&{template:general} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=Non Weapon Proficiency: @{name}}} {{Proficiency Check=[[ 1d20 + [[@{rmodifier}]][MOD] + [[?{Additional modifier?|0}]][MOD] ]] vs [[ @{rAttribute}[ATTR] ]]}}{{freetext=@{short_description}}}',
  };
  _.each(idArray, (id) => {
    const attrName = `repeating_nonweaponproficiencies_${id}_macro-text`;
    const currentMacro = v[attrName];
    if (currentMacro) {
      // replace only if it exactly matches the old default string
      output[attrName] = currentMacro.replace(replacements.nwp_old, replacements.nwp_new);
    }
  });
  output.sheet_version = current_version;
  clog(`VERSION UPDATE: nwpMacroUpdate completed`);
  await setAttrsAsync(output, {silent: true});
  return await versionator(current_version, final_version);
};

// fix duplicated repeating attribute names for weapons
const weaponNameFix = async (current_version, final_version) => {
  const idArray = await getSectionIDsAsync('repeating_weapon');
  const fields = idArray.flatMap((id) => [
    `repeating_weapon_${id}_roll`,
    `repeating_weapon_${id}_weaponname`,
    `repeating_weapon_${id}_tohitbonus`,
    `repeating_weapon_${id}_magicbonus`,
    `repeating_weapon_${id}_attackdmgbonus`,
    `repeating_weapon_${id}_whisper_to-hit`,
    `repeating_weapon_${id}_macro-text`,
    `repeating_weapon_${id}_damagesmallmedium`,
    `repeating_weapon_${id}_damagelarge`,
    `repeating_weapon_${id}_rateoffire`,
    `repeating_weapon_${id}_range`,
    `repeating_weapon_${id}_quantity`,
    `repeating_weapon_${id}_weight`,
    `repeating_weapon_${id}_weaponspeed`,
    `repeating_weapon_${id}_cost`,
    `repeating_weapon_${id}_weaponnotes`,
  ]);
  const v = await getAttrsAsync(fields);
  const output = {};
  const namesToFix = {
    '@{rateoffire}': '@{weapon_rateoffire}',
    '@{weaponname}': '@{weapon_name}',
    '@{tohitbonus}': '@{weapon_tohitbonus}',
    '@{magicbonus}': '@{weapon_magicbonus}',
    '@{attackdmgbonus}': '@{weapon_attackdmgbonus}',
    '@{whisper_to-hit}': '@{weapon_whisper_to_hit}',
    '@{damagesmallmedium}': '@{weapon_damagesmallmedium}',
    '@{damagelarge}': '@{weapon_damagelarge}',
    '@{range}': '@{weapon_range}',
    '@{quantity}': '@{weapon_quantity}',
    '@{weight}': '@{weapon_weight}',
    '@{weaponspeed}': '@{weapon_speed}',
    '@{cost}': '@{weapon_cost}',
    '@{macro-text}': '@{weapon_macro_text}',
    '@{weaponnotes}': '@{weapon_notes}',
  };
  const oldMacrotext =
    '&{template:attacks} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=@{WeaponName}}} {{attack1=[[1d20 + @{ToHitBonus}[BON] + @{MagicBonus}[MAG] + ?{To Hit Modifier?|0}[MOD]) ]]}} {{damage1vsSM=[[@{DamageSmallMedium} + @{AttackDmgBonus}[BON] + @{MagicBonus}[MAG] + ?{Damage Modifier?|0}[MOD] ]]}} {{damage1vsL=[[@{DamageLarge} + @{AttackDmgBonus}[BON] + @{MagicBonus}[MAG] + ?{Damage Modifier?|0}[MOD] ]]}} {{WeaponNotes=@{WeaponNotes}}} @{whisper_to-hit}';
  _.each(idArray, (id) => {
    const prefix = `repeating_weapon_${id}_`;
    if (doUpdate(v[`${prefix}rateoffire`])) output[`${prefix}weapon_rateoffire`] = int(v[`${prefix}rateoffire`]);
    if (doUpdate(v[`${prefix}roll`])) output[`${prefix}weapon_roll`] = v[`${prefix}roll`];
    if (doUpdate(v[`${prefix}weaponname`])) output[`${prefix}weapon_name`] = v[`${prefix}weaponname`];
    if (doUpdate(v[`${prefix}tohitbonus`])) output[`${prefix}weapon_tohitbonus`] = int(v[`${prefix}tohitbonus`]);
    if (doUpdate(v[`${prefix}magicbonus`])) output[`${prefix}weapon_magicbonus`] = int(v[`${prefix}magicbonus`]);
    if (doUpdate(v[`${prefix}attackdmgbonus`])) output[`${prefix}weapon_attackdmgbonus`] = int(v[`${prefix}attackdmgbonus`]);
    if (doUpdate(v[`${prefix}whisper_to-hit`])) output[`${prefix}weapon_whisper_to_hit`] = v[`${prefix}whisper_to-hit`];
    // Safety check for replaceSet
    if (doUpdate(v[`${prefix}macro-text`], oldMacrotext)) {
      output[`${prefix}weapon_macro_text`] = replaceSet(v[`${prefix}macro-text`] || '', namesToFix);
    }
    if (doUpdate(v[`${prefix}damagesmallmedium`])) output[`${prefix}weapon_damagesmallmedium`] = v[`${prefix}damagesmallmedium`];
    if (doUpdate(v[`${prefix}damagelarge`])) output[`${prefix}weapon_damagelarge`] = v[`${prefix}damagelarge`];
    if (doUpdate(v[`${prefix}range`])) output[`${prefix}weapon_range`] = v[`${prefix}range`];
    if (doUpdate(v[`${prefix}quantity`])) output[`${prefix}weapon_quantity`] = float(v[`${prefix}quantity`]);
    if (doUpdate(v[`${prefix}weight`])) output[`${prefix}weapon_weight`] = float(v[`${prefix}weight`]);
    if (doUpdate(v[`${prefix}weaponspeed`])) output[`${prefix}weapon_speed`] = int(v[`${prefix}weaponspeed`]);
    if (doUpdate(v[`${prefix}cost`])) output[`${prefix}weapon_cost`] = float(v[`${prefix}cost`]);
    if (doUpdate(v[`${prefix}weaponnotes`])) output[`${prefix}weapon_notes`] = v[`${prefix}weaponnotes`];
  });
  output.sheet_version = current_version;
  clog(`VERSION UPDATE: weaponNameFix completed`);
  await setAttrsAsync(output, {silent: true});
  return await versionator(current_version, final_version);
};

// fix duplicated repeating attribute names for spells
const spellNameFix = async (current_version, final_version) => {
  const idArray = await getSectionIDsAsync('repeating_spells');
  const fields = idArray.flatMap((id) => [
    `repeating_spells_${id}_roll`,
    `repeating_spells_${id}_memorized`,
    `repeating_spells_${id}_level`,
    `repeating_spells_${id}_name`,
    `repeating_spells_${id}_school`,
    `repeating_spells_${id}_range`,
    `repeating_spells_${id}_duration`,
    `repeating_spells_${id}_aoe`,
    `repeating_spells_${id}_components`,
    `repeating_spells_${id}_ct`,
    `repeating_spells_${id}_save`,
    `repeating_spells_${id}_macro-text`,
    `repeating_spells_${id}_description`,
    `repeating_spells_${id}_description-show`,
  ]);
  const v = await getAttrsAsync(fields);
  const output = {};
  const namesToFix = {
    '@{memorized}': '@{spell_memorized}',
    '@{level}': '@{spell_level}',
    '@{name}': '@{spell_name}',
    '@{school}': '@{spell_school}',
    '@{range}': '@{spell_range}',
    '@{duration}': '@{spell_duration}',
    '@{aoe}': '@{spell_aoe}',
    '@{components}': '@{spell_components}',
    '@{ct}': '@{spell_ct}',
    '@{save}': '@{spell_save}',
    '@{macro-text}': '@{spell_macro_text}',
    '@{description}': '@{spell_description}',
  };
  const oldMacrotext =
    '&{template:general} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=Casts: @{name}}} {{Level:=@{level}}} {{Range:=@{range}}} {{Duration:=@{duration}}} {{AOE:=@{aoe}}} {{Comp:=@{components}}} {{CT:=@{ct}}} {{Save:=@{save}}} {{freetext=@{description}}}';

  _.each(idArray, (id) => {
    const prefix = `repeating_spells_${id}_`;
    if (doUpdate(v[`${prefix}roll`])) output[`${prefix}spell_roll`] = v[`${prefix}roll`];
    if (doUpdate(v[`${prefix}memorized`])) output[`${prefix}spell_memorized`] = int(v[`${prefix}memorized`]);
    if (doUpdate(v[`${prefix}level`])) output[`${prefix}spell_level`] = v[`${prefix}level`];
    if (doUpdate(v[`${prefix}name`])) output[`${prefix}spell_name`] = v[`${prefix}name`];
    if (doUpdate(v[`${prefix}school`])) output[`${prefix}spell_school`] = v[`${prefix}school`];
    if (doUpdate(v[`${prefix}range`])) output[`${prefix}spell_range`] = v[`${prefix}range`];
    if (doUpdate(v[`${prefix}duration`])) output[`${prefix}spell_duration`] = v[`${prefix}duration`];
    if (doUpdate(v[`${prefix}aoe`])) output[`${prefix}spell_aoe`] = v[`${prefix}aoe`];
    if (doUpdate(v[`${prefix}components`])) output[`${prefix}spell_components`] = v[`${prefix}components`];
    if (doUpdate(v[`${prefix}ct`])) output[`${prefix}spell_ct`] = v[`${prefix}ct`];
    if (doUpdate(v[`${prefix}save`])) output[`${prefix}spell_save`] = v[`${prefix}save`];
    if (doUpdate(v[`${prefix}macro-text`], oldMacrotext)) output[`${prefix}spell_macro_text`] = replaceSet(v[`${prefix}macro-text`] || '', namesToFix);
    if (doUpdate(v[`${prefix}description`])) output[`${prefix}spell_description`] = v[`${prefix}description`];
    if (doUpdate(v[`${prefix}description-show`])) output[`${prefix}spell_description_show`] = int(v[`${prefix}description-show`]);
  });
  output.sheet_version = current_version;
  clog(`VERSION UPDATE: spellNameFix completed`);
  await setAttrsAsync(output, {silent: true});
  return await versionator(current_version, final_version);
};

// fix duplicated repeating attribute names for equipment
const equipmentNameFix = async (current_version, final_version) => {
  const idArray = await getSectionIDsAsync('repeating_equipment');
  const fields = idArray.flatMap((id) => [
    `repeating_equipment_${id}_item-show`,
    `repeating_equipment_${id}_item`,
    `repeating_equipment_${id}_location`,
    `repeating_equipment_${id}_carried`,
    `repeating_equipment_${id}_quantity`,
    `repeating_equipment_${id}_quantity_max`,
    `repeating_equipment_${id}_weight`,
    `repeating_equipment_${id}_cost`,
  ]);
  const v = await getAttrsAsync(fields);
  const output = {};
  _.each(idArray, (id) => {
    const prefix = `repeating_equipment_${id}_`;
    if (doUpdate(v[`${prefix}item-show`])) output[`${prefix}equipment_item_show`] = v[`${prefix}item-show`];
    if (doUpdate(v[`${prefix}item`])) output[`${prefix}equipment_item`] = v[`${prefix}item`];
    if (doUpdate(v[`${prefix}location`])) output[`${prefix}equipment_location`] = v[`${prefix}location`];
    if (doUpdate(v[`${prefix}carried`])) output[`${prefix}equipment_carried`] = v[`${prefix}carried`];
    if (doUpdate(v[`${prefix}quantity`])) output[`${prefix}equipment_quantity`] = float(v[`${prefix}quantity`]);
    if (doUpdate(v[`${prefix}quantity_max`])) output[`${prefix}equipment_quantity_max`] = float(v[`${prefix}quantity_max`]);
    if (doUpdate(v[`${prefix}weight`])) output[`${prefix}equipment_weight`] = float(v[`${prefix}weight`]);
    if (doUpdate(v[`${prefix}cost`])) output[`${prefix}equipment_cost`] = float(v[`${prefix}cost`]);
  });
  output.sheet_version = current_version;
  clog(`VERSION UPDATE: equipmentNameFix completed`);
  await setAttrsAsync(output, {silent: true});
  return await versionator(current_version, final_version);
};

// fix duplicated repeating attribute names. Replaces old attribute names in macro_text
const abilityNameFix = async (current_version, final_version) => {
  const idArray = await getSectionIDsAsync('repeating_ability');
  const fields = idArray.flatMap((id) => [
    `repeating_equipment_${id}_roll`,
    `repeating_equipment_${id}_name`,
    `repeating_equipment_${id}_short_description`,
    `repeating_equipment_${id}_current`,
    `repeating_equipment_${id}_current_max`,
    `repeating_equipment_${id}_macro-text`,
    `repeating_equipment_${id}_description`,
    `repeating_equipment_${id}_description-show`,
  ]);
  const v = await getAttrsAsync(fields);
  const output = {};
  const namesToFix = {
    '@{name}': '@{ability_name}',
    '@{current}': '@{ability_current}',
    '@{current_max}': '@{ability_current_max}',
    '@{short_description}': '@{ability_short_description}',
    '@{macro-text}': '@{ability_macro_text}',
    '@{description}': '@{ability_description}',
  };
  const oldMacrotext =
    '&{template:general} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=Special Ability: @{name}}} {{freetext=@{short_description} @{description}}}';
  _.each(idArray, (id) => {
    const prefix = `repeating_equipment_${id}_`;
    if (doUpdate(v[`${prefix}roll`])) output[`${prefix}ability_roll`] = v[`${prefix}roll`];
    if (doUpdate(v[`${prefix}name`])) output[`${prefix}ability_name`] = v[`${prefix}name`];
    if (doUpdate(v[`${prefix}short_description`])) output[`${prefix}ability_short_description`] = v[`${prefix}short_description`];
    if (doUpdate(v[`${prefix}current`])) output[`${prefix}ability_current`] = int(v[`${prefix}current`]);
    if (doUpdate(v[`${prefix}current_max`])) output[`${prefix}ability_current_max`] = int(v[`${prefix}current_max`]);
    if (doUpdate(v[`${prefix}macro-text`], oldMacrotext)) output[`${prefix}ability_macro_text`] = replaceSet(v[`${prefix}macro-text`] || '', namesToFix);
    if (doUpdate(v[`${prefix}description`])) output[`${prefix}ability_description`] = v[`${prefix}description`];
    if (doUpdate(v[`${prefix}description-show`])) output[`${prefix}ability_description_show`] = int(v[`${prefix}description-show`]);
  });
  output.sheet_version = current_version;
  clog(`VERSION UPDATE: abilityNameFix completed`);
  await setAttrsAsync(output, {silent: true});
  return await versionator(current_version, final_version);
};

// fix duplicated repeating attribute names. Replaces old attribute names in macro_text
const nwpNameFix = async (current_version, final_version) => {
  const idArray = await getSectionIDsAsync('repeating_nonweaponproficiencies');
  const fields = idArray.flatMap((id) => [
    `repeating_nonweaponproficiencies_${id}_roll`,
    `repeating_nonweaponproficiencies_${id}_name`,
    `repeating_nonweaponproficiencies_${id}_rAttribute`,
    `repeating_nonweaponproficiencies_${id}_short_description`,
    `repeating_nonweaponproficiencies_${id}_rSlots`,
    `repeating_nonweaponproficiencies_${id}_rModifier`,
    `repeating_nonweaponproficiencies_${id}_macro-text`,
    `repeating_nonweaponproficiencies_${id}_description-show`,
    `repeating_nonweaponproficiencies_${id}_description`,
  ]);
  const v = await getAttrsAsync(fields);
  const output = {};
  const namesToFix = {
    '@{name}': '@{nwp_name}',
    '@{rAttribute}': '@{nwp_attribute}',
    '@{rSlots}': '@{nwp_slots}',
    '@{rModifier}': '@{nwp_modifier}',
    '@{short_description}': '@{nwp_short_description}',
    '@{macro-text}': '@{nwp_macro_text}',
    '@{description}': '@{nwp_description}',
  };
  const oldMacrotext =
    '&{template:general} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=Non Weapon Proficiency: @{name}}} {{Proficiency Check=[[ 1d20 + [[@{rmodifier}]][MOD] + [[?{Additional modifier?|0}]][MOD] ]] vs [[ @{rAttribute}[ATTR] ]]}}{{freetext=@{short_description}}}';
  _.each(idArray, (id) => {
    const prefix = `repeating_nonweaponproficiencies_${id}_`;
    if (doUpdate(v[`${prefix}roll`])) output[`${prefix}nwp_roll`] = v[`${prefix}roll`];
    if (doUpdate(v[`${prefix}name`])) output[`${prefix}nwp_name`] = v[`${prefix}name`];
    if (doUpdate(v[`${prefix}rAttribute`])) output[`${prefix}nwp_attribute`] = (v[`${prefix}rAttribute`] || '').toLowerCase();
    if (doUpdate(v[`${prefix}short_description`])) output[`${prefix}nwp_short_description`] = v[`${prefix}short_description`];
    if (doUpdate(v[`${prefix}rSlots`])) output[`${prefix}nwp_slots`] = int(v[`${prefix}rSlots`]);
    if (doUpdate(v[`${prefix}rModifier`])) output[`${prefix}nwp_modifier`] = int(v[`${prefix}rModifier`]);
    if (doUpdate(v[`${prefix}macro-text`], oldMacrotext)) output[`${prefix}nwp_macro_text`] = replaceSet(v[`${prefix}macro-text`], namesToFix);
    if (doUpdate(v[`${prefix}description-show`])) output[`${prefix}nwp_description_show`] = int(v[`${prefix}description-show`]);
    if (doUpdate(v[`${prefix}description`])) output[`${prefix}nwp_description`] = v[`${prefix}description`];
  });
  output.sheet_version = current_version;
  clog(`VERSION UPDATE: nwpNameFix completed`);
  await setAttrsAsync(output, {silent: true});
  return await versionator(current_version, final_version);
};

const macroColorUpdate = async (current_version, final_version) => {
  const [idnwps, idweapons, idabilities, idspells] = await Promise.all([
    getSectionIDsAsync('repeating_nonweaponproficiencies'),
    getSectionIDsAsync('repeating_weapon'),
    getSectionIDsAsync('repeating_ability'),
    getSectionIDsAsync('repeating_spells'),
  ]);
  const attrsNWP = idnwps.map((id) => `repeating_nonweaponproficiencies_${id}_nwp_macro_text`);
  const attrsWeapon = idweapons.map((id) => `repeating_weapon_${id}_weapon_macro_text`);
  const attrsAbility = idabilities.map((id) => `repeating_ability_${id}_ability_macro_text`);
  const attrsSpells = idspells.map((id) => `repeating_spells_${id}_spell_macro_text`);
  const v = await getAttrsAsync([...attrsNWP, ...attrsWeapon, ...attrsAbility, ...attrsSpells]);
  const output = {};
  const replacements = {
    nwp_old: '&{template:general} {{name=@{character_name}}}',
    nwp_new: '&{template:general} {{color=@{color_option}}} {{name=@{character_name}}}',
    wpn_old: '&{template:attacks} {{name=@{character_name}}}',
    wpn_new: '&{template:attacks} {{color=@{color_option}}} {{name=@{character_name}}}',
    abl_old: '&{template:general} {{name=@{character_name}}}',
    abl_new: '&{template:general} {{color=@{color_option}}} {{name=@{character_name}}}',
    spl_old: '&{template:general} {{name=@{character_name}}}',
    spl_new: '&{template:general} {{color=@{color_option}}} {{name=@{character_name}}}',
  };
  const processReplacements = (ids, fieldPrefix, oldKey, newKey) => {
    ids.forEach((id) => {
      let actualAttr = '';
      if (fieldPrefix.includes('nonweapon')) {
        actualAttr = `repeating_nonweaponproficiencies_${id}_nwp_macro_text`;
      } else if (fieldPrefix.includes('weapon')) {
        actualAttr = `repeating_weapon_${id}_weapon_macro_text`;
      } else if (fieldPrefix.includes('ability')) {
        actualAttr = `repeating_ability_${id}_ability_macro_text`;
      } else if (fieldPrefix.includes('spells')) {
        actualAttr = `repeating_spells_${id}_spell_macro_text`;
      }
      if (v[actualAttr]) {
        output[actualAttr] = v[actualAttr].replace(oldKey, newKey);
      }
    });
  };
  processReplacements(idnwps, 'repeating_nonweaponproficiencies_', replacements.nwp_old, replacements.nwp_new);
  processReplacements(idweapons, 'repeating_weapon_', replacements.wpn_old, replacements.wpn_new);
  processReplacements(idabilities, 'repeating_ability_', replacements.abl_old, replacements.abl_new);
  processReplacements(idspells, 'repeating_spells_', replacements.spl_old, replacements.spl_new);
  output.sheet_version = current_version;
  clog(`VERSION UPDATE: colorUpdate completed`);
  await setAttrsAsync(output, {silent: true});
  return await versionator(current_version, final_version);
};

// One-time update: Auto Calc Ability rows
const stat_functions = async () => {
  await strengthCalcs();
  await intelligenceCalcs();
  await wisdomCalcs();
  await dexterityCalcs();
  await constitutionCalcs();
  await charismaCalcs();
};

const autoCalcAbilityRows = async (current_version, final_version) => {
  const output = {};
  await stat_functions();
  output.sheet_version = current_version;
  clog(`VERSION UPDATE: autoCalcAbilityRows completed`);
  await setAttrsAsync(output);
  return await versionator(current_version, final_version);
};

// One-time update: Auto Calc Save rows
const autoCalcSaveRows = async (current_version, final_version) => {
  const output = {};
  const migrate = 1;
  await saveparalysispoisondeathCalc(migrate);
  await savepetrificationpolymorphCalc(migrate);
  await saverodsstaveswandsCalc(migrate);
  await savebreathweaponsCalc(migrate);
  await savespellsCalc(migrate);
  output.sheet_version = current_version;
  clog(`VERSION UPDATE: autoCalcSaveRows(migrate) completed`);
  await setAttrsAsync(output, {silent: true});
  return await versionator(current_version, final_version);
};

// One-time update: Auto Calc Thief rows
const autoCalcThiefRows = async (current_version, final_version) => {
  const output = {};
  const migrate = 1;
  await pickpocketsCalc(migrate);
  await openlocksCalc(migrate);
  await findtrapsCalc(migrate);
  await movequietlyCalc(migrate);
  await hideinshadowsCalc(migrate);
  await hearnoiseCalc(migrate);
  await climbwallsCalc(migrate);
  await readlanguagesCalc(migrate);
  await thiefmiscCalc();
  await thiefmisc1Calc();
  await thiefmisc2Calc();
  output.sheet_version = current_version;
  clog(`VERSION UPDATE: autoCalcThiefRows(migrate) completed`);
  await setAttrsAsync(output, {silent: true});
  return await versionator(current_version, final_version);
};

// Remove @{weapon_whisper_to_hit}
const removeWhisper = async (current_version, final_version) => {
  const idArray = await getSectionIDsAsync('repeating_weapon');
  const fields = idArray.map((id) => `repeating_weapon_${id}_weapon_macro_text`);
  const v = await getAttrsAsync(fields);
  const output = {};
  const macrodefault =
    '&{template:attacks} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=@{weapon_name}}} {{attack1=[[1d20 + @{weapon_tohitbonus}[BON] + @{weapon_magicbonus}[MAG] + ?{To Hit Modifier?|0}[MOD] ]]}} {{damage1vsSM=[[@{weapon_damagesmallmedium} + @{weapon_attackdmgbonus}[BON] + @{weapon_magicbonus}[MAG] + ?{Damage Modifier?|0}[MOD] ]]}} {{damage1vsL=[[@{weapon_damagelarge} + @{weapon_attackdmgbonus}[BON] + @{weapon_magicbonus}[MAG] + ?{Damage Modifier?|0}[MOD] ]]}} {{WeaponNotes=@{weapon_notes}}} @{weapon_whisper_to_hit}';

  _.each(idArray, (id) => {
    const attrName = `repeating_weapon_${id}_weapon_macro_text`;
    const macrotext = v[attrName] || macrodefault;
    // Clean up the whisper attribute.
    // Added \s* to the regex to catch any extra spaces before the attribute.
    output[attrName] = macrotext.replace(/\s*@{weapon_whisper_to_hit}/g, '');
  });
  output.sheet_version = current_version;
  clog(`VERSION UPDATE: removeWhisper completed`);
  await setAttrsAsync(output, {silent: true});
  return await versionator(current_version, final_version);
};

// migrate HP
const migrateHP = async (current_version, final_version) => {
  const v = await getAttrsAsync(['hitpoints_max', 'hitpoints_1_class', 'hitpoints_2_class', 'hitpoints_3_class']);
  const output = {};
  const hitPointsMax = +v.hitpoints_max || 0;
  const hitpoints_1_class = +v.hitpoints_1_class || 0;
  const hitpoints_2_class = +v.hitpoints_2_class || 0;
  const hitpoints_3_class = +v.hitpoints_3_class || 0;
  const totalClassHP = Math.max(0, hitpoints_1_class) + Math.max(0, hitpoints_2_class) + Math.max(0, hitpoints_3_class);

  // If older sheet has no HP per class but has a total max, migrate it to class 1
  if (totalClassHP === 0 && hitPointsMax > 0) {
    output.hitpoints_1_class = hitPointsMax;
  }
  output.sheet_version = current_version;
  clog(`VERSION UPDATE: migrate HP completed`);
  await setAttrsAsync(output, {silent: true});
  if (typeof calcHP === 'function') {
    await calcHP();
  }
  return await versionator(current_version, final_version);
};

// migrate AC
const migrateAC = async (current_version, final_version) => {
  const v = await getAttrsAsync(['armorclass', 'armortype_ac', 'armorclass_total', 'armorbonus', 'armorshield']);
  const output = {};
  const recalc = 0;
  let armorClass = +v.armorclass || 0;
  const armortypeAC = +v.armortype_ac || 0;
  const armorShield = v.armorshield;
  // older sheet will have default value for armortypeAC. AC s/b better than 10
  if (armorShield) {
    if (armortypeAC === 10 && armorClass < 10) {
      armorClass += 1;
      output.armortype_ac = armorClass;
      output.armortype_base = armorClass;
      output.armortype_worn = 1;
      output.armortype_carried = 1;
      output.armorshield_ac = -1;
      output.armorshield_base = -1;
      output.armorshield_worn = 1;
      output.armorshield_carried = 1;
    }
  } else if (armortypeAC === 10 && armorClass < 10) {
    output.armortype_ac = armorClass;
    output.armortype_base = armorClass;
    output.armortype_worn = 1;
    output.armortype_carried = 1;
  }
  output.sheet_version = current_version;
  clog(`VERSION UPDATE: Migrate AC completed`);
  await setAttrsAsync(output, {silent: true});
  if (typeof calcAC === 'function') {
    await calcAC(recalc);
  }
  return await versionator(current_version, final_version);
};

// update Weapon macro-text ONLY IF they haven't been edited.
// Tests against previous macro-text changes back to v1.58
const weaponMacroUpdate = async (current_version, final_version) => {
  const idArray = await getSectionIDsAsync('repeating_weapon');
  const fields = idArray.map((id) => `repeating_weapon_${id}_weapon_macro_text`);
  const v = await getAttrsAsync(fields);
  const output = {};
  const replacements = {
    weapon_old:
      '&{template:attacks} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=@{weapon_name}}} {{attack1=[[1d20 + @{weapon_tohitbonus}[BON] + @{weapon_magicbonus}[MAG] + ?{To Hit Modifier?|0}[MOD] ]]}} {{damage1vsSM=[[@{weapon_damagesmallmedium} + @{weapon_attackdmgbonus}[BON] + @{weapon_magicbonus}[MAG] + ?{Damage Modifier?|0}[MOD] ]]}} {{damage1vsL=[[@{weapon_damagelarge} + @{weapon_attackdmgbonus}[BON] + @{weapon_magicbonus}[MAG] + ?{Damage Modifier?|0}[MOD] ]]}} {{WeaponNotes=@{weapon_notes}}}',
    weapon_old_v2:
      '&{template:attacks} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=@{weapon_name}}} {{attack1=[[1d20 + @{weapon_tohitbonus}[BON] + @{weapon_magicbonus}[MAG] + ?{To Hit Modifier?|0}[MOD]) ]]}} {{damage1vsSM=[[@{weapon_damagesmallmedium} + @{weapon_attackdmgbonus}[BON] + @{weapon_magicbonus}[MAG] + ?{Damage Modifier?|0}[MOD] ]]}} {{damage1vsL=[[@{weapon_damagelarge} + @{weapon_attackdmgbonus}[BON] + @{weapon_magicbonus}[MAG] + ?{Damage Modifier?|0}[MOD] ]]}} {{WeaponNotes=@{weapon_notes}}}',
    weapon_old_v3:
      '&{template:attacks} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=@{weapon_name}}} {{dual=@{weapon_dual}}} {{attack1=[[ 1d20 + @{weapon_backstab_bonus}[BACKSTAB] + @{weapon_tohitbonus}[HIT_BON] + @{weapon_prof_pen}[PROF_PEN] + @{weapon_dual_pen}[DUAL_PEN]+ @{weapon_magicbonus}[MAG_BON] + ?{To Hit Modifier?|0}[MISC_MOD] ]]}} {{damagevsSMchatmenu=@{weapon_damagesmallmedium_chat_menu}}} {{damagevsLchatmenu=@{weapon_damagelarge_chat_menu}}} {{WeaponNotes=@{weapon_notes}}} {{backstab=[[ @{weapon_backstab_mult} ]]}} {{damagetype=@{weapon_attackdmgtype}}} {{rate=@{weapon_rateoffire}}} {{range=@{weapon_range}}} {{length=@{weapon_length}}} {{space=@{weapon_space}}} {{speed=@{weapon_speed}}} @{weapon_tohitacadj}',
    weapon_old_v4:
      '&{template:attacks} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=@{weapon_name}}} {{dual=@{weapon_dual}}} {{attack1=[[ 1d20 + @{weapon_backstab_bonus}[BACKSTAB] + @{weapon_tohitbonus}[HIT_BON] + @{weapon_prof_pen}[PROF_PEN] + @{weapon_dual_pen}[DUAL_PEN]+ @{weapon_magicbonus}[MAG_BON] + ?{To Hit Modifier?|0}[MISC_MOD] ]]}} {{damagevsSMchatmenu=@{weapon_damagesmallmedium_chat_menu}}} {{damagevsLchatmenu=@{weapon_damagelarge_chat_menu}}} {{critdamagevsSMchatmenu=@{weapon_critdamagesmallmedium_chat_menu}}} {{critdamagevsLchatmenu=@{weapon_critdamagelarge_chat_menu}}} {{WeaponNotes=@{weapon_notes}}} {{backstab=[[ @{weapon_backstab_mult} ]]}} {{damagetype=@{weapon_attackdmgtype}}} {{rate=@{weapon_rateoffire}}} {{range=@{weapon_range}}} {{length=@{weapon_length}}} {{space=@{weapon_space}}} {{speed=@{weapon_speed}}} {{crit=@{toggle_critdamage}}} @{weapon_tohitacadj}',
    weapon_old_v5:
      '&{template:attacks} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=@{weapon_name}}} {{dual=@{weapon_dual}}} {{attack1=[[ 1d20 + @{weapon_backstab_bonus}[BACKSTAB] + @{weapon_tohitbonus}[HIT_BON] + @{weapon_prof_pen}[PROF_PEN] + @{weapon_dual_pen}[DUAL_PEN]+ @{weapon_magicbonus}[MAG_BON] + ?{To Hit Modifier?|0}[MISC_MOD] ]]}} {{damagevsSMchatmenu=@{weapon_damagesmallmedium_chat_menu}}} {{damagevsLchatmenu=@{weapon_damagelarge_chat_menu}}} {{critdamagevsSMchatmenu=@{weapon_critdamagesmallmedium_chat_menu}}} {{critdamagevsLchatmenu=@{weapon_critdamagelarge_chat_menu}}} {{WeaponNotes=@{weapon_notes}}} {{backstab=[[ @{weapon_backstab_mult} ]]}} {{damagetype=@{weapon_attackdmgtype}}} {{rate=@{weapon_rateoffire}}} {{range=@{weapon_range}}} {{length=@{weapon_length}}} {{space=@{weapon_space}}} {{speed=@{weapon_speed}}} {{ammo=[[ @{weapon_ammo} ]]/[[ @{weapon_ammo|max} ]]}} {{crit=@{toggle_critdamage}}} @{weapon_tohitacadj}',
    weapon_old_v6:
      '&{template:attacks} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=@{weapon_name}}} {{dual=@{weapon_dual}}} {{attack1=[[ 1d20 + @{weapon_backstab_bonus}[BACKSTAB] + @{weapon_tohitbonus}[HIT_BON] + @{weapon_prof_pen}[PROF_PEN] + @{weapon_dual_pen}[DUAL_PEN]+ @{weapon_magicbonus}[MAG_BON] + ?{To Hit Modifier?|0}[MISC_MOD] ]]}} {{damagevsSMchatmenu=@{weapon_damagesmallmedium_chat_menu}}} {{damagevsLchatmenu=@{weapon_damagelarge_chat_menu}}} {{critdamagevsSMchatmenu=@{weapon_critdamagesmallmedium_chat_menu}}} {{critdamagevsLchatmenu=@{weapon_critdamagelarge_chat_menu}}} {{WeaponNotes=@{weapon_notes}}} {{backstab=[[ @{weapon_backstab_mult} ]]}} {{damagetype=@{weapon_attackdmgtype}}} {{rate=@{weapon_rateoffire}}} {{range=@{weapon_range}}} {{length=@{weapon_length}}} {{space=@{weapon_space}}} {{speed=@{weapon_speed}}} {{ammo=[[ @{weapon_ammo} ]]/[[ @{weapon_ammo|max} ]]}} {{crit=[[ @{toggle_critdamage} ]]}} @{weapon_tohitacadj}',
    weapon_current:
      '&{template:attacks} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=@{weapon_name}}} {{dual=@{weapon_dual}}} {{attack1=[[ 1d20 + ( @{weapon_backstab_bonus}[BACKSTAB] ) + ( @{weapon_tohitbonus}[HIT_BON] ) + ( @{weapon_prof_pen}[PROF_PEN] ) + ( @{weapon_dual_pen}[DUAL_PEN] ) + ( @{weapon_magicbonus}[MAG_BON] ) + ( ?{To Hit Modifier?|0}[MISC_MOD] ) ]]}} {{damagevsSMchatmenu=@{weapon_damagesmallmedium_chat_menu}}} {{damagevsLchatmenu=@{weapon_damagelarge_chat_menu}}} {{critdamagevsSMchatmenu=@{weapon_critdamagesmallmedium_chat_menu}}} {{critdamagevsLchatmenu=@{weapon_critdamagelarge_chat_menu}}} {{WeaponNotes=@{weapon_notes}}} {{backstab=[[ @{weapon_backstab_mult} ]]}} {{damagetype=@{weapon_attackdmgtype}}} {{rate=@{weapon_rateoffire}}} {{range=@{weapon_range}}} {{length=@{weapon_length}}} {{space=@{weapon_space}}} {{speed=@{weapon_speed}}} {{ammo=[[ @{weapon_ammo} ]]/[[ @{weapon_ammo|max} ]]}} {{crit=[[ @{toggle_critdamage} ]]}} @{weapon_tohitacadj}',
  };
  const oldVersions = [
    replacements.weapon_old,
    replacements.weapon_old_v2,
    replacements.weapon_old_v3,
    replacements.weapon_old_v4,
    replacements.weapon_old_v5,
    replacements.weapon_old_v6,
  ];
  _.each(idArray, (id) => {
    const attrName = `repeating_weapon_${id}_weapon_macro_text`;
    if (oldVersions.includes(v[attrName])) {
      output[attrName] = replacements.weapon_current;
    }
  });
  output.sheet_version = current_version;
  clog(`VERSION UPDATE: weaponMacroUpdate completed`);
  await setAttrsAsync(output, {silent: true});
  return await versionator(current_version, final_version);
};

// update Special Ability macro-text ONLY IF they haven't been edited. Tests against v1.58 macro-text
const abilityMacroUpdate = async (current_version, final_version) => {
  const idArray = await getSectionIDsAsync('repeating_ability');
  const fields = idArray.map((id) => `repeating_ability_${id}_ability_macro_text`);
  const v = await getAttrsAsync(fields);
  const output = {};
  const replacements = {
    ability_old:
      '&{template:general} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=Special Ability: @{ability_name}}} {{freetext=@{ability_short_description} @{ability_description}}}',
    ability_old_v2:
      '&{template:general} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=Special Ability: @{ability_name}}} {{roll= [[ @{ability_die} + @{ability_mod}[MOD] ]]}} {{freetext=@{ability_short_description} @{ability_description}}} {{uses=@{ability_current}}} {{uses_max=@{ability_current|max}}}',
    ability_old_v3:
      '&{template:general} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=Special Ability: @{ability_name}}} {{roll= [[ @{ability_die} + @{ability_mod}[MOD] ]]}} {{freetext=@{ability_short_description} @{ability_description}}} {{uses=@{ability_current}}} {{uses_max=[[ @{ability_current|max} ]]}} {{effect_type=@{ability_effect_type}}} {{spell_level=@{ability_level}}} {{casting_time=@{ability_ct}}} {{range=@{ability_range}}} {{saving_throw=@{ability_save}}} {{area_of_effect=@{ability_aoe}}} {{save_type=@{ability_save_type}}}',
    ability_old_v4:
      '&{template:general} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=Special Ability: @{ability_name}}} {{roll= [[ @{ability_die} + @{ability_mod}[MOD] ]]}} {{freetext=@{ability_short_description} @{ability_description}}} {{uses=@{ability_current}}} {{uses_max=[[ @{ability_current|max} ]]}} {{effect_type=@{ability_effect_type}}} {{spell_level=@{ability_level}}} {{casting_time=@{ability_ct}}} {{range=@{ability_range}}} {{duration=@{ability_duration}}} {{saving_throw=@{ability_save}}} {{area_of_effect=@{ability_aoe}}} {{save_type=@{ability_save_type}}}',
    ability_old_v5:
      '&{template:general} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=Special Ability: @{ability_name}}} {{roll= [[ @{ability_die} + @{ability_mod}[MOD] ]]}} {{link=@{ability_link}}} {{freetext=@{ability_short_description} @{ability_description}}} {{uses=@{ability_current}}} {{uses_max=[[@{ability_current|max}]]}} {{effect_type=@{ability_effect_type}}} {{spell_level=@{ability_level}}} {{casting_time=@{ability_ct}}} {{range=@{ability_range}}} {{duration=@{ability_duration}}} {{saving_throw=@{ability_save}}} {{area_of_effect=@{ability_aoe}}} {{save_type=@{ability_save_type}}}',
    ability_current:
      '&{template:general} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=Special Ability: @{ability_name}}} {{roll= [[ 0 + @{ability_die} + @{ability_mod}[MOD] ]]}} {{link=@{ability_link}}} {{freetext=@{ability_short_description} @{ability_description}}} {{uses=@{ability_current}}} {{uses_max=[[ 0 + @{ability_current|max} ]]}} {{effect_type=@{ability_effect_type}}} {{spell_level=@{ability_level}}} {{casting_time=@{ability_ct}}} {{range=@{ability_range}}} {{duration=@{ability_duration}}} {{saving_throw=@{ability_save}}} {{area_of_effect=@{ability_aoe}}} {{save_type=@{ability_save_type}}}',
  };
  // Create a list of all old versions for easier checking
  const oldVersions = [replacements.ability_old, replacements.ability_old_v2, replacements.ability_old_v3, replacements.ability_old_v4, replacements.ability_old_v5];
  _.each(idArray, (id) => {
    const attrName = `repeating_ability_${id}_ability_macro_text`;
    const currentText = v[attrName];

    // If the macro text matches any of the known old default versions, update it
    if (oldVersions.includes(currentText)) {
      output[attrName] = replacements.ability_current;
    }
  });
  output.sheet_version = current_version;
  clog(`VERSION UPDATE: abilityMacroUpdate completed`);
  await setAttrsAsync(output, {silent: true});
  return await versionator(current_version, final_version);
};

// update NWP macro-text ONLY IF they haven't been edited. Tests against v1.58 macro-text
const nwpMacroUpdate2 = async (current_version, final_version) => {
  const idArray = await getSectionIDsAsync('repeating_nonweaponproficiencies');
  const fields = idArray.map((id) => `repeating_nonweaponproficiencies_${id}_nwp_macro_text`);
  const v = await getAttrsAsync(fields);
  const output = {};
  const replacements = {
    nwp_old:
      '&{template:general} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=Non Weapon Proficiency: @{nwp_name}}} {{Proficiency Check=[[ 1d20 + [[@{nwp_modifier}]][MOD] + [[?{Additional modifier?|0}]][MOD] ]] vs [[ @{nwp_attribute}[ATTR] ]]}}{{freetext=@{nwp_short_description}}}',
    nwp_old_v2:
      '@{whisper_pc} &{template:general} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=Non Weapon Proficiency: @{nwp_name}}} {{roll_low=[[ 1d20 + [[ @{nwp_modifier} ]][MOD] + [[ ?{Modifier?|0} ]][MOD] ]]}} {{roll_target=[[ @{nwp_attribute}[ATTR] ]]}} {{mod_applied=[[ ?{Modifier?|0} ]]}} {{NWP Mod Applied=[[ @{nwp_modifier} ]]}} {{freetext=@{nwp_short_description}}}',
    nwp_current:
      '@{whisper_pc} &{template:general} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=Non Weapon Proficiency: @{nwp_name}}} {{roll_low=[[ 1d20 + [[ @{nwp_modifier} ]][MOD] + [[ ?{Modifier?|0} ]][MOD] ]]}} {{roll_target=[[ @{nwp_attribute}[ATTR] ]]}} {{mod_applied=[[ ?{Modifier?|0} ]]}} {{nwp_mod_applied=[[ @{nwp_modifier} ]]}} {{link=@{nwp_link}}} {{freetext=@{nwp_short_description} @{nwp_description}}}',
  };
  const oldVersions = [replacements.nwp_old, replacements.nwp_old_v2];
  _.each(idArray, (id) => {
    const attrName = `repeating_nonweaponproficiencies_${id}_nwp_macro_text`;
    const currentText = v[attrName];

    // If the macro text matches any known old default, update it
    if (oldVersions.includes(currentText)) {
      output[attrName] = replacements.nwp_current;
    }
  });
  output.sheet_version = current_version;
  clog(`VERSION UPDATE: nwpMacroUpdate2 completed`);
  await setAttrsAsync(output, {silent: true});
  return await versionator(current_version, final_version);
};

// update Spells macro-text ONLY IF they haven't been edited. Tests against v1.58 macro-text
const spellsMacroUpdate = async (current_version, final_version) => {
  const idArray = await getSectionIDsAsync('repeating_spells');
  const fields = idArray.map((id) => `repeating_spells_${id}_spell_macro_text`);
  const v = await getAttrsAsync(fields);
  const output = {};
  const replacements = {
    spell_old:
      '&{template:general} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=Casts: @{spell_name}}} {{Level:=@{spell_level}}} {{Range:=@{spell_range}}} {{Duration:=@{spell_duration}}} {{AOE:=@{spell_aoe}}} {{Comp:=@{spell_components}}} {{CT:=@{spell_ct}}} {{Save:=@{spell_save}}} {{freetext=@{spell_description}}}',
    spell_old_v2:
      '&{template:general} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=Casts: @{spell_name}}} {{Range:=@{spell_range}}} {{Duration:=@{spell_duration}}} {{AOE:=@{spell_aoe}}} {{Save:=@{spell_save}}}',
    spell_old_v3:
      '@{whisper_pc} &{template:general} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=Casts: @{spell_name}}} {{school=@{spell_school}}} {{spell_level=@{spell_level}}} {{range=@{spell_range}}} {{duration=@{spell_duration}}} {{area_of_effect=@{spell_aoe}}} {{components=@{spell_components}}} {{casting_time=@{spell_ct}}} {{saving_throw=@{spell_save}}} {{freetext=@{spell_description}}}',
    spell_current:
      '@{whisper_pc} &{template:general} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=Casts: @{spell_name}}} {{school=@{spell_school}}} {{spell_level=@{spell_level}}} {{spell_class=@{spell_caster_class_name}}} {{spell_class_level=@{spell_caster_class_level}}} {{range=@{spell_range}}} {{duration=@{spell_duration}}} {{area_of_effect=@{spell_aoe}}} {{components=@{spell_components}}} {{casting_time=@{spell_ct}}} {{saving_throw=@{spell_save}}} {{save_type=@{spell_save_type}}} {{link=@{spell_link}}} {{freetext=@{spell_description}}}',
  };
  const oldVersions = [replacements.spell_old, replacements.spell_old_v2, replacements.spell_old_v3];
  _.each(idArray, (id) => {
    const attrName = `repeating_spells_${id}_spell_macro_text`;
    const currentText = v[attrName];

    // Check if current text is one of the unedited defaults
    if (oldVersions.includes(currentText)) {
      output[attrName] = replacements.spell_current;
    }
  });
  output.sheet_version = current_version;
  clog(`VERSION UPDATE: spellsMacroUpdate completed`);
  await setAttrsAsync(output, {silent: true});
  return await versionator(current_version, final_version);
};

// update Equipment macro-text ONLY IF they haven't been edited. Tests against v1.641 macro-text
const equipmentMacroUpdate = async (current_version, final_version) => {
  const idArray = await getSectionIDsAsync('repeating_equipment');
  const fields = idArray.map((id) => `repeating_equipment_${id}_equipment_macro_text`);
  const v = await getAttrsAsync(fields);
  const output = {};
  const replacements = {
    equipment_old:
      '@{whisper_pc} &{template:general} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=Item/Equipment: @{equipment_item}}} {{freetext=@{equipment_description}}} {{quantity= @{equipment_quantity}}} {{quantity_max=@{equipment_quantity|max}}} {{uses=@{equipment_current}}} {{uses_max=[[ @{equipment_current|max} ]]}}',
    equipment_current:
      '@{whisper_pc} &{template:general} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=Item/Equipment: @{equipment_item}}} {{link=@{equipment_link}}} {{freetext=@{equipment_description}}} {{quantity=@{equipment_quantity}}} {{quantity_max=@{equipment_quantity|max}}} {{uses=@{equipment_current}}} {{uses_max=[[ @{equipment_current|max} ]]}}',
  };
  _.each(idArray, (id) => {
    const attrName = `repeating_equipment_${id}_equipment_macro_text`;
    // Only update if the current text matches the old default exactly
    if (v[attrName] === replacements.equipment_old) {
      output[attrName] = replacements.equipment_current;
    }
  });
  output.sheet_version = current_version;
  clog(`VERSION UPDATE: equipmentMacroUpdate completed`);
  await setAttrsAsync(output, {silent: true});
  return await versionator(current_version, final_version);
};

// One-time update: formats and sets range fields
const updateRange = async (current_version, final_version) => {
  const idArray = await getSectionIDsAsync('repeating_weapon');
  const fields = idArray.flatMap((id) => [
    `repeating_weapon_${id}_weapon_range`,
    `repeating_weapon_${id}_weapon_range_short`,
    `repeating_weapon_${id}_weapon_range_medium`,
    `repeating_weapon_${id}_weapon_range_long`,
    `repeating_weapon_${id}_weapon_attack_type`,
    `repeating_weapon_${id}_weapon_range_error`,
  ]);
  const v = await getAttrsAsync(fields);
  const output = {};
  _.each(idArray, (id) => {
    const prefix = `repeating_weapon_${id}_`;

    // attack types selector: melee=0, ranged=1, touch=2, ranged_touch=3
    const thisType = +v[`${prefix}weapon_attack_type`] || 0;

    // Skip if melee or touch
    if (thisType === 0 || thisType === 2) return;

    let thisRange = v[`${prefix}weapon_range`] || '';

    // Clean string: remove quotes and normalize separators to commas
    const cleanRange = thisRange.replace(/['"]/g, '');
    const thisRangeArray = cleanRange
      .replace(/[\/\s\-]/g, ',')
      .split(',')
      .filter((i) => i !== '');

    const thisRangeShort = Number(thisRangeArray[0]);
    let thisRangeMedium = Number(thisRangeArray[1]);
    let thisRangeLong = Number(thisRangeArray[2]);

    // If only a single number is entered, make it Long (e.g., Manticore spikes)
    if (thisRangeArray.length === 1 && !isNaN(thisRangeShort)) {
      thisRangeMedium = thisRangeShort;
      thisRangeLong = thisRangeShort;
    }

    // Validation and Assignment
    const isShortValid = !isNaN(thisRangeShort);
    const isMedValid = !isNaN(thisRangeMedium);
    const isLongValid = !isNaN(thisRangeLong);

    output[`${prefix}weapon_range_short`] = isShortValid ? thisRangeShort : 0;
    output[`${prefix}weapon_range_medium`] = isMedValid ? thisRangeMedium : 0;
    output[`${prefix}weapon_range_long`] = isLongValid ? thisRangeLong : 0;

    // Error logic: if any part fails to parse, or if input was empty
    if (isShortValid && isMedValid && isLongValid) {
      output[`${prefix}weapon_range_error`] = 1; // 1 appears to be "success/valid" based on your logic
    } else {
      output[`${prefix}weapon_range_error`] = thisRange === '' ? 1 : 0;
    }
  });
  output.sheet_version = current_version;
  clog(`VERSION UPDATE: updateRange completed`);
  await setAttrsAsync(output, {silent: true});
  return await versionator(current_version, final_version);
};

// One-time update: replace @{weapon_attack_type_pen} with @{weapon_dual_pen} in attack macro-text
const updateAttackTypeMacro = async (current_version, final_version) => {
  const idArray = await getSectionIDsAsync('repeating_weapon');
  const fields = idArray.map((id) => `repeating_weapon_${id}_weapon_macro_text`);
  const v = await getAttrsAsync(fields);
  const output = {};
  const macrodefault =
    '&{template:attacks} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=@{weapon_name}}} {{dual=@{weapon_dual}}} {{attack1=[[ 1d20 + @{weapon_backstab_bonus}[BACKSTAB] + @{weapon_tohitbonus}[HIT_BON] + @{weapon_prof_pen}[PROF_PEN] + @{weapon_dual_pen}[DUAL_PEN]+ @{weapon_magicbonus}[MAG_BON] + ?{To Hit Modifier?|0}[MISC_MOD] ]]}} {{damagevsSMchatmenu=@{weapon_damagesmallmedium_chat_menu}}} {{damagevsLchatmenu=@{weapon_damagelarge_chat_menu}}} {{WeaponNotes=@{weapon_notes}}} {{backstab=[[ @{weapon_backstab_mult} ]]}} {{damagetype=@{weapon_attackdmgtype}}} {{rate=@{weapon_rateoffire}}} {{range=@{weapon_range}}} {{length=@{weapon_length}}} {{space=@{weapon_space}}} {{speed=@{weapon_speed}}} @{weapon_tohitacadj}';
  _.each(idArray, (id) => {
    const attrName = `repeating_weapon_${id}_weapon_macro_text`;
    let macrotext = v[attrName] || macrodefault;

    // Perform both replacements sequentially on the same string
    macrotext = macrotext.replace(/@{weapon_attack_type_pen}/g, '@{weapon_dual_pen}').replace(/{{attacktype=@{weapon_attack_type}}} /g, '');
    output[attrName] = macrotext;
  });
  output.sheet_version = current_version;
  clog(`VERSION UPDATE: updateAttackTypeMacro completed`);
  await setAttrsAsync(output, {silent: true});
  return await versionator(current_version, final_version);
};

// One-time update: set MonsterHD from hitdice
const monsterHD = async (current_version, final_version) => {
  const v = await getAttrsAsync(['hitdice', 'monsterHD']);
  const output = {};
  const monsterHD_value = v.monsterHD;
  const hitDice_value = v.hitdice;
  if (monsterHD_value === '' || monsterHD_value === undefined) {
    output.monsterHD = hitDice_value;
  }
  output.sheet_version = current_version;
  clog(`VERSION UPDATE: monsterHD completed`);
  await setAttrsAsync(output, {silent: true});
  return await versionator(current_version, final_version);
};

// One-time update: clear old armor details fields that have been removed
const clearArmorOther = async (current_version, final_version) => {
  const output = {};
  output.armorother_cost = 0;
  output.armorother2_cost = 0;
  output.armorother3_cost = 0;
  output.armorother4_cost = 0;
  output.armorother5_cost = 0;
  output.armorother6_cost = 0;
  output.armorother_weight = 0;
  output.armorother2_weight = 0;
  output.armorother3_weight = 0;
  output.armorother4_weight = 0;
  output.armorother5_weight = 0;
  output.armorother6_weight = 0;
  output.armorother_carried = 0;
  output.armorother2_carried = 0;
  output.armorother3_carried = 0;
  output.armorother4_carried = 0;
  output.armorother5_carried = 0;
  output.armorother6_carried = 0;
  output.armorother_bulk = 0;
  output.armorother2_bulk = 0;
  output.armorother3_bulk = 0;
  output.armorother4_bulk = 0;
  output.armorother5_bulk = 0;
  output.armorother6_bulk = 0;
  clog(`VERSION UPDATE: clearArmorOther completed`);
  await setAttrsAsync(output, {silent: true});
  return await versionator(current_version, final_version);
};

// combines all Armor Details attrs and their row id's
const armorIDsAndAttrs = armorAttrs.concat(armorRowIDs);

// armorAttrs & attrs pull from global arrays from above
const armorDetailsRow = [
  {armorType: 'unarmored', syncedID: 'unarmored_row_id', typeValue: 0, defaultAC: 10, armorAttrs: 'unarmoredAttrs', attrs: unarmoredAttrs},
  {armorType: 'armortype', syncedID: 'armortype1_row_id', typeValue: 1, defaultAC: 10, armorAttrs: 'armor1Attrs', attrs: armor1Attrs},
  {armorType: 'armortype2', syncedID: 'armortype2_row_id', typeValue: 2, defaultAC: 10, armorAttrs: 'armor2Attrs', attrs: armor2Attrs},
  {armorType: 'armorshield', syncedID: 'armorshield_row_id', typeValue: 3, defaultAC: 0, armorAttrs: 'shieldAttrs', attrs: shieldAttrs},
  {armorType: 'armorhelmet', syncedID: 'armorhelmet_row_id', typeValue: 4, defaultAC: 10, armorAttrs: 'helmetAttrs', attrs: helmetAttrs},
  {armorType: 'armorother', syncedID: 'armorother1_row_id', typeValue: 5, defaultAC: 10, armorAttrs: 'other1Attrs', attrs: other1Attrs},
  {armorType: 'armorother2', syncedID: 'armorother2_row_id', typeValue: 6, defaultAC: 0, armorAttrs: 'other2Attrs', attrs: other2Attrs},
  {armorType: 'armorother3', syncedID: 'armorother3_row_id', typeValue: 7, defaultAC: 0, armorAttrs: 'other3Attrs', attrs: other3Attrs},
  {armorType: 'armorother4', syncedID: 'armorother4_row_id', typeValue: 8, defaultAC: 0, armorAttrs: 'other4Attrs', attrs: other4Attrs},
  {armorType: 'armorother5', syncedID: 'armorother5_row_id', typeValue: 9, defaultAC: 0, armorAttrs: 'other5Attrs', attrs: other5Attrs},
  {armorType: 'armorother6', syncedID: 'armorother6_row_id', typeValue: 10, defaultAC: 0, armorAttrs: 'other6Attrs', attrs: other6Attrs},
];

// sync armor changes between Armor Details and repeating_equipment
const syncArmorToEquipment = async (id, attr, row_removed, migrate) => {
  // Normalize id for internal logic, but keep a mixed-case version for prefix.
  // null = change came from Armor Details.
  let targetID = id && id !== '0' ? id : null;
  let id_low = targetID ? targetID.toLowerCase() : null;
  const v = await getAttrsAsync(armorIDsAndAttrs);
  const output = {};
  // Map an array of currently linked IDs from the 11 static armor slots
  const idArray = armorDetailsRow.map((row) => (v[row.syncedID] ? v[row.syncedID].toString().toLowerCase() : '0'));
  function matchAttr(attrToCheck) {
    const arrays = {unarmoredAttrs, armor1Attrs, armor2Attrs, shieldAttrs, helmetAttrs, other1Attrs, other2Attrs, other3Attrs, other4Attrs, other5Attrs, other6Attrs};
    const matchingArray = Object.entries(arrays).find(([arrayName, array]) => array.includes(attrToCheck));
    return matchingArray ? matchingArray[0] : null;
  }
  // match the attr changed to the specific armor row
  const matchingArray = matchAttr(attr);
  // clog(`syncArmorToEquipment: id_low:${id_low} ${id_low === null ? `Sync '${attr}' from Armor Details` : 'Sync from repeating_equipment'}\n null means Δ came from Armor Details`);
  // clog(`syncArmorToEquipment: row_removed?:${row_removed} ${row_removed ? 'Row removed' : 'Row not removed'}`);

  