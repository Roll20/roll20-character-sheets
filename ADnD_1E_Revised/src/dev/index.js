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
function isRunningOnServer() {
  return self.dispatchEvent == undefined;
}

function setActiveCharacterId(charId) {
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
}

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

function getAttrsAsync(props) {
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
}

function setAttrsAsync(propObj, options) {
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
}

function getSectionIDsAsync(sectionName) {
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
}
//-------------------------------------------------------------------------------------

// GiGs custom handling for number type and logs
const int = (score, error = 0) => parseInt(score) || error;
const float = (score, error = 0) => parseFloat(score) || error;
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
    clog(`generateUniqueRowID: ${generated} is not a unique ID, trying again.`);
    generated = generateRowID();
  }
  // clog(`generateUniqueRowID: ${generated} verified as unique, returning.`);
  uniqueids[generated] = true;
  return generated;
};

// Validate character name for illegal characters
on('change:character_name', async (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
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
    // clog(`Change Detected:${eventInfo.sourceAttribute}`);
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

// Global Variables
let armorDetailsRowidArray;
let autoCalcAbilityRows = '';
let autoCalcSaveRows = '';
let autoCalcThiefRows = '';
let calcAC = '';
let calcHP = '';
let calcRange = '';
let charismaCalcs = '';
let climbwallsCalc = '';
let constitutionCalcs = '';
let damageMacro = '';
let dexterityCalcs = '';
let findtrapsCalc = '';
let hearnoiseCalc = '';
let hideinshadowsCalc = '';
let intelligenceCalcs = '';
let movequietlyCalc = '';
let openlocksCalc = '';
let pickpocketsCalc = '';
let readlanguagesCalc = '';
let savebreathweaponsCalc = '';
let savemisc1Calc = '';
let savemisc2Calc = '';
let savemiscCalc = '';
let saveparalysispoisondeathCalc = '';
let savepetrificationpolymorphCalc = '';
let saverodsstaveswandsCalc = '';
let savespellsCalc = '';
let setSpellsCasterClass = '';
let strengthCalcs = '';
let thiefmisc1Calc = '';
let thiefmisc2Calc = '';
let thiefmiscCalc = '';
let versionator = '';
let weaponInUse = '';
let wisdomCalcs = '';

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
const concatRepAttrName = (section, id, field) => `repeating_${section}_${id}_${field}`;

// fixes attribute name conflict
const dmgSwap = (current_version, final_version) => {
  // copy DmgBonus value to AttackDmgBonus
  // replace all instances of @{DmgBonus} with @{AttackDmgBonus} in macro-text
  getSectionIDs('repeating_weapon', (idArray) => {
    const fields = [];
    _.each(idArray, (id) => {
      fields.push(concatRepAttrName('weapon', id, 'DmgBonus'));
      fields.push(concatRepAttrName('weapon', id, 'macro-text'));
    });
    getAttrs([...fields], (v) => {
      const output = {};
      const macrodefault =
        '&{template:attacks} {{name=@{character_name}}} {{subtag=@{WeaponName}}} {{attack1=[[1d20 + @{ToHitBonus}[BON] + @{MagicBonus}[MAG] + ?{To Hit Modifier?|0}[MOD] ]]}} {{damage1vsSM=[[@{DamageSmallMedium} + @{DmgBonus}[BON] + @{MagicBonus}[MAG] + ?{Damage Modifier?|0}[MOD] ]]}} {{damage1vsL=[[@{DamageLarge} + @{DmgBonus}[BON] + @{MagicBonus}[MAG] + ?{Damage Modifier?|0}[MOD] ]]}} {{WeaponNotes=@{WeaponNotes}}} @{whisper_to-hit}';
      _.each(idArray, (id) => {
        const macrotext = v[concatRepAttrName('weapon', id, 'macro-text')] || macrodefault;
        // replaces old attribute value with new
        output[concatRepAttrName('weapon', id, 'macro-text')] = macrotext.replace(/@{DmgBonus}/g, '@{AttackDmgBonus}');
        output[concatRepAttrName('weapon', id, 'AttackDmgBonus')] = +v[concatRepAttrName('weapon', id, 'DmgBonus')] || 0;
      });
      output.sheet_version = current_version;
      clog(`VERSION UPDATE: dmgSwap completed`);
      setAttrs(output, {silent: true}, () => {
        versionator(current_version, final_version);
      });
    });
  });
};

// fixes attribute name conflict
const maxSwap = (current_version, final_version) => {
  getSectionIDs('repeating_ability', (idArray) => {
    const fields = [];
    _.each(idArray, (id) => {
      fields.push(concatRepAttrName('ability', id, 'max'));
    });
    getAttrs([...fields], (v) => {
      const output = {};
      _.each(idArray, (id) => {
        // replaces old attribute value with new
        output[concatRepAttrName('ability', id, 'current_max')] = +v[concatRepAttrName('ability', id, 'max')] || 0;
      });
      output.sheet_version = current_version;
      clog(`VERSION UPDATE: maxSwap completed`);
      setAttrs(output, {silent: true}, () => {
        versionator(current_version, final_version);
      });
    });
  });
};

// replace default macro-text of non-weapon proficiencies ONLY IF they haven't been edited
const nwpMacroUpdate = (current_version, final_version) => {
  const output = {};
  getSectionIDs('repeating_nonweaponproficiencies', (idArray) => {
    const fields = [];
    _.each(idArray, (id) => {
      fields.push(concatRepAttrName('nonweaponproficiencies', id, 'macro-text'));
    });
    getAttrs([...fields], (v) => {
      const replacements = {
        nwp_old:
          '&{template:general} {{name=@{character_name}}} {{subtag=Non Weapon Proficiency: @{name}}} {{=@{short_description}}}{{Success Amount=[[((@{rAttribute})+(@{rSlots}-1)-1d20)cs>1cf<-1]]}}',
        nwp_new:
          '&{template:general} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=Non Weapon Proficiency: @{name}}} {{Proficiency Check=[[ 1d20 + [[@{rmodifier}]][MOD] + [[?{Additional modifier?|0}]][MOD] ]] vs [[ @{rAttribute}[ATTR] ]]}}{{freetext=@{short_description}}}',
      };
      _.each(idArray, (id) => {
        if (v[concatRepAttrName('nonweaponproficiencies', id, 'macro-text')]) {
          output[concatRepAttrName('nonweaponproficiencies', id, 'macro-text')] = v[concatRepAttrName('nonweaponproficiencies', id, 'macro-text')].replace(
            replacements.nwp_old,
            replacements.nwp_new,
          );
        }
      });
      output.sheet_version = current_version;
      clog(`VERSION UPDATE: nwpMacroUpdate completed`);
      setAttrs(output, {silent: true}, () => {
        versionator(current_version, final_version);
      });
    });
  });
};

const weaponNameFix = (current_version, final_version) => {
  getSectionIDs('repeating_weapon', (idArray) => {
    const fields = [];
    _.each(idArray, (id) => {
      fields.push(concatRepAttrName('weapon', id, 'roll'));
      fields.push(concatRepAttrName('weapon', id, 'weaponname'));
      fields.push(concatRepAttrName('weapon', id, 'tohitbonus'));
      fields.push(concatRepAttrName('weapon', id, 'magicbonus'));
      fields.push(concatRepAttrName('weapon', id, 'attackdmgbonus'));
      fields.push(concatRepAttrName('weapon', id, 'whisper_to-hit'));
      fields.push(concatRepAttrName('weapon', id, 'macro-text'));
      fields.push(concatRepAttrName('weapon', id, 'damagesmallmedium'));
      fields.push(concatRepAttrName('weapon', id, 'damagelarge'));
      fields.push(concatRepAttrName('weapon', id, 'rateoffire'));
      fields.push(concatRepAttrName('weapon', id, 'range'));
      fields.push(concatRepAttrName('weapon', id, 'quantity'));
      fields.push(concatRepAttrName('weapon', id, 'weight'));
      fields.push(concatRepAttrName('weapon', id, 'weaponspeed'));
      fields.push(concatRepAttrName('weapon', id, 'cost'));
      fields.push(concatRepAttrName('weapon', id, 'weaponnotes'));
    });
    getAttrs([...fields], (v) => {
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
        if (doUpdate(v[concatRepAttrName('weapon', id, 'rateoffire')]))
          output[concatRepAttrName('weapon', id, 'weapon_rateoffire')] = int(v[concatRepAttrName('weapon', id, 'rateoffire')]);
        if (doUpdate(v[concatRepAttrName('weapon', id, 'roll')])) output[concatRepAttrName('weapon', id, 'weapon_roll')] = v[concatRepAttrName('weapon', id, 'roll')];
        if (doUpdate(v[concatRepAttrName('weapon', id, 'weaponname')])) output[concatRepAttrName('weapon', id, 'weapon_name')] = v[concatRepAttrName('weapon', id, 'weaponname')];
        if (doUpdate(v[concatRepAttrName('weapon', id, 'tohitbonus')]))
          output[concatRepAttrName('weapon', id, 'weapon_tohitbonus')] = int(v[concatRepAttrName('weapon', id, 'tohitbonus')]);
        if (doUpdate(v[concatRepAttrName('weapon', id, 'magicbonus')]))
          output[concatRepAttrName('weapon', id, 'weapon_magicbonus')] = int(v[concatRepAttrName('weapon', id, 'magicbonus')]);
        if (doUpdate(v[concatRepAttrName('weapon', id, 'attackdmgbonus')]))
          output[concatRepAttrName('weapon', id, 'weapon_attackdmgbonus')] = int(v[concatRepAttrName('weapon', id, 'attackdmgbonus')]);
        if (doUpdate(v[concatRepAttrName('weapon', id, 'whisper_to-hit')]))
          output[concatRepAttrName('weapon', id, 'weapon_whisper_to_hit')] = v[concatRepAttrName('weapon', id, 'whisper_to-hit')];
        if (doUpdate(v[concatRepAttrName('weapon', id, 'macro-text')], oldMacrotext))
          output[concatRepAttrName('weapon', id, 'weapon_macro_text')] = replaceSet(v[concatRepAttrName('weapon', id, 'macro-text')], namesToFix);
        if (doUpdate(v[concatRepAttrName('weapon', id, 'damagesmallmedium')]))
          output[concatRepAttrName('weapon', id, 'weapon_damagesmallmedium')] = v[concatRepAttrName('weapon', id, 'damagesmallmedium')];
        if (doUpdate(v[concatRepAttrName('weapon', id, 'damagelarge')]))
          output[concatRepAttrName('weapon', id, 'weapon_damagelarge')] = v[concatRepAttrName('weapon', id, 'damagelarge')];
        if (doUpdate(v[concatRepAttrName('weapon', id, 'range')])) output[concatRepAttrName('weapon', id, 'weapon_range')] = v[concatRepAttrName('weapon', id, 'range')];
        if (doUpdate(v[concatRepAttrName('weapon', id, 'quantity')]))
          output[concatRepAttrName('weapon', id, 'weapon_quantity')] = float(v[concatRepAttrName('weapon', id, 'quantity')]);
        if (doUpdate(v[concatRepAttrName('weapon', id, 'weight')])) output[concatRepAttrName('weapon', id, 'weapon_weight')] = float(v[concatRepAttrName('weapon', id, 'weight')]);
        if (doUpdate(v[concatRepAttrName('weapon', id, 'weaponspeed')]))
          output[concatRepAttrName('weapon', id, 'weapon_speed')] = int(v[concatRepAttrName('weapon', id, 'weaponspeed')]);
        if (doUpdate(v[concatRepAttrName('weapon', id, 'cost')])) output[concatRepAttrName('weapon', id, 'weapon_cost')] = float(v[concatRepAttrName('weapon', id, 'cost')]);
        if (doUpdate(v[concatRepAttrName('weapon', id, 'weaponnotes')]))
          output[concatRepAttrName('weapon', id, 'weapon_notes')] = v[concatRepAttrName('weapon', id, 'weaponnotes')];
      });
      output.sheet_version = current_version;
      clog(`VERSION UPDATE: weaponNameFix completed`);
      setAttrs(output, {silent: true}, () => {
        versionator(current_version, final_version);
      });
    });
  });
};

const spellNameFix = (current_version, final_version) => {
  getSectionIDs('repeating_spells', (idArray) => {
    const fields = [];
    _.each(idArray, (id) => {
      fields.push(concatRepAttrName('spells', id, 'roll'));
      fields.push(concatRepAttrName('spells', id, 'memorized'));
      fields.push(concatRepAttrName('spells', id, 'level'));
      fields.push(concatRepAttrName('spells', id, 'name'));
      fields.push(concatRepAttrName('spells', id, 'school'));
      fields.push(concatRepAttrName('spells', id, 'range'));
      fields.push(concatRepAttrName('spells', id, 'duration'));
      fields.push(concatRepAttrName('spells', id, 'aoe'));
      fields.push(concatRepAttrName('spells', id, 'components'));
      fields.push(concatRepAttrName('spells', id, 'ct'));
      fields.push(concatRepAttrName('spells', id, 'save'));
      fields.push(concatRepAttrName('spells', id, 'macro-text'));
      fields.push(concatRepAttrName('spells', id, 'description'));
      fields.push(concatRepAttrName('spells', id, 'description-show'));
    });
    getAttrs([...fields], (v) => {
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
        if (doUpdate(v[concatRepAttrName('spells', id, 'roll')])) output[concatRepAttrName('spells', id, 'spell_roll')] = v[concatRepAttrName('spells', id, 'roll')];
        if (doUpdate(v[concatRepAttrName('spells', id, 'memorized')]))
          output[concatRepAttrName('spells', id, 'spell_memorized')] = int(v[concatRepAttrName('spells', id, 'memorized')]);
        if (doUpdate(v[concatRepAttrName('spells', id, 'level')])) output[concatRepAttrName('spells', id, 'spell_level')] = v[concatRepAttrName('spells', id, 'level')];
        if (doUpdate(v[concatRepAttrName('spells', id, 'name')])) output[concatRepAttrName('spells', id, 'spell_name')] = v[concatRepAttrName('spells', id, 'name')];
        if (doUpdate(v[concatRepAttrName('spells', id, 'school')])) output[concatRepAttrName('spells', id, 'spell_school')] = v[concatRepAttrName('spells', id, 'school')];
        if (doUpdate(v[concatRepAttrName('spells', id, 'range')])) output[concatRepAttrName('spells', id, 'spell_range')] = v[concatRepAttrName('spells', id, 'range')];
        if (doUpdate(v[concatRepAttrName('spells', id, 'duration')])) output[concatRepAttrName('spells', id, 'spell_duration')] = v[concatRepAttrName('spells', id, 'duration')];
        if (doUpdate(v[concatRepAttrName('spells', id, 'aoe')])) output[concatRepAttrName('spells', id, 'spell_aoe')] = v[concatRepAttrName('spells', id, 'aoe')];
        if (doUpdate(v[concatRepAttrName('spells', id, 'components')]))
          output[concatRepAttrName('spells', id, 'spell_components')] = v[concatRepAttrName('spells', id, 'components')];
        if (doUpdate(v[concatRepAttrName('spells', id, 'ct')])) output[concatRepAttrName('spells', id, 'spell_ct')] = v[concatRepAttrName('spells', id, 'ct')];
        if (doUpdate(v[concatRepAttrName('spells', id, 'save')])) output[concatRepAttrName('spells', id, 'spell_save')] = v[concatRepAttrName('spells', id, 'save')];
        if (doUpdate(v[concatRepAttrName('spells', id, 'macro-text')], oldMacrotext))
          output[concatRepAttrName('spells', id, 'spell_macro_text')] = replaceSet(v[concatRepAttrName('spells', id, 'macro-text')], namesToFix);
        if (doUpdate(v[concatRepAttrName('spells', id, 'description')]))
          output[concatRepAttrName('spells', id, 'spell_description')] = v[concatRepAttrName('spells', id, 'description')];
        if (doUpdate(v[concatRepAttrName('spells', id, 'description-show')]))
          output[concatRepAttrName('spells', id, 'spell_description_show')] = int(v[concatRepAttrName('spells', id, 'description-show')]);
      });
      output.sheet_version = current_version;
      clog(`VERSION UPDATE: spellNameFix completed`);
      setAttrs(output, {silent: true}, () => {
        versionator(current_version, final_version);
      });
    });
  });
};

const equipmentNameFix = (current_version, final_version) => {
  getSectionIDs('repeating_equipment', (idArray) => {
    const fields = [];
    _.each(idArray, (id) => {
      fields.push(concatRepAttrName('equipment', id, 'item-show'));
      fields.push(concatRepAttrName('equipment', id, 'item'));
      fields.push(concatRepAttrName('equipment', id, 'location'));
      fields.push(concatRepAttrName('equipment', id, 'carried'));
      fields.push(concatRepAttrName('equipment', id, 'quantity'));
      fields.push(concatRepAttrName('equipment', id, 'quantity_max'));
      fields.push(concatRepAttrName('equipment', id, 'weight'));
      fields.push(concatRepAttrName('equipment', id, 'cos'));
    });
    getAttrs([...fields], (v) => {
      const output = {};
      _.each(idArray, (id) => {
        if (doUpdate(v[concatRepAttrName('equipment', id, 'item-show')]))
          output[concatRepAttrName('equipment', id, 'equipment_item_show')] = v[concatRepAttrName('equipment', id, 'item-show')];
        if (doUpdate(v[concatRepAttrName('equipment', id, 'item')])) output[concatRepAttrName('equipment', id, 'equipment_item')] = v[concatRepAttrName('equipment', id, 'item')];
        if (doUpdate(v[concatRepAttrName('equipment', id, 'location')]))
          output[concatRepAttrName('equipment', id, 'equipment_location')] = v[concatRepAttrName('equipment', id, 'location')];
        if (doUpdate(v[concatRepAttrName('equipment', id, 'carried')]))
          output[concatRepAttrName('equipment', id, 'equipment_carried')] = v[concatRepAttrName('equipment', id, 'carried')];
        if (doUpdate(v[concatRepAttrName('equipment', id, 'quantity')]))
          output[concatRepAttrName('equipment', id, 'equipment_quantity')] = float(v[concatRepAttrName('equipment', id, 'quantity')]);
        if (doUpdate(v[concatRepAttrName('equipment', id, 'quantity_max')]))
          output[concatRepAttrName('equipment', id, 'equipment_quantity_max')] = float(v[concatRepAttrName('equipment', id, 'quantity_max')]);
        if (doUpdate(v[concatRepAttrName('equipment', id, 'weight')]))
          output[concatRepAttrName('equipment', id, 'equipment_weight')] = float(v[concatRepAttrName('equipment', id, 'weight')]);
        if (doUpdate(v[concatRepAttrName('equipment', id, 'cost')]))
          output[concatRepAttrName('equipment', id, 'equipment_cost')] = float(v[concatRepAttrName('equipment', id, 'cost')]);
      });
      output.sheet_version = current_version;
      clog(`VERSION UPDATE: equipmentNameFix completed`);
      setAttrs(output, {silent: true}, () => {
        versionator(current_version, final_version);
      });
    });
  });
};

const abilityNameFix = (current_version, final_version) => {
  getSectionIDs('repeating_ability', (idArray) => {
    const fields = [];
    _.each(idArray, (id) => {
      fields.push(concatRepAttrName('equipment', id, 'roll'));
      fields.push(concatRepAttrName('equipment', id, 'name'));
      fields.push(concatRepAttrName('equipment', id, 'short_description'));
      fields.push(concatRepAttrName('equipment', id, 'current'));
      fields.push(concatRepAttrName('equipment', id, 'current_max'));
      fields.push(concatRepAttrName('equipment', id, 'macro-text'));
      fields.push(concatRepAttrName('equipment', id, 'description'));
      fields.push(concatRepAttrName('equipment', id, 'description-show'));
    });
    getAttrs([...fields], (v) => {
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
        if (doUpdate(v[concatRepAttrName('equipment', id, 'roll')])) output[concatRepAttrName('equipment', id, 'ability_roll')] = v[concatRepAttrName('equipment', id, 'roll')];
        if (doUpdate(v[concatRepAttrName('equipment', id, 'name')])) output[concatRepAttrName('equipment', id, 'ability_name')] = v[concatRepAttrName('equipment', id, 'name')];
        if (doUpdate(v[concatRepAttrName('equipment', id, 'short_description')]))
          output[concatRepAttrName('equipment', id, 'ability_short_description')] = v[concatRepAttrName('equipment', id, 'short_description')];
        if (doUpdate(v[concatRepAttrName('equipment', id, 'current')]))
          output[concatRepAttrName('equipment', id, 'ability_current')] = int(v[concatRepAttrName('equipment', id, 'current')]);
        if (doUpdate(v[concatRepAttrName('equipment', id, 'current_max')]))
          output[concatRepAttrName('equipment', id, 'ability_current_max')] = int(v[concatRepAttrName('equipment', id, 'current_max')]);
        if (doUpdate(v[concatRepAttrName('equipment', id, 'macro-text')], oldMacrotext))
          output[concatRepAttrName('equipment', id, 'ability_macro_text')] = replaceSet(v[concatRepAttrName('equipment', id, 'macro-text')], namesToFix);
        if (doUpdate(v[concatRepAttrName('equipment', id, 'description')]))
          output[concatRepAttrName('equipment', id, 'ability_description')] = v[concatRepAttrName('equipment', id, 'description')];
        if (doUpdate(v[concatRepAttrName('equipment', id, 'description-show')]))
          output[concatRepAttrName('equipment', id, 'ability_description_show')] = int(v[concatRepAttrName('equipment', id, 'description-show')]);
      });
      output.sheet_version = current_version;
      clog(`VERSION UPDATE: abilityNameFix completed`);
      setAttrs(output, {silent: true}, () => {
        versionator(current_version, final_version);
      });
    });
  });
};

// fix duplicated repeating attribute names. Replaces old attribute names in macro_text
const nwpNameFix = (current_version, final_version) => {
  getSectionIDs('repeating_nonweaponproficiencies', (idArray) => {
    const fields = [];
    _.each(idArray, (id) => {
      fields.push(concatRepAttrName('nonweaponproficiencies', id, 'roll'));
      fields.push(concatRepAttrName('nonweaponproficiencies', id, 'name'));
      fields.push(concatRepAttrName('nonweaponproficiencies', id, 'rAttribute'));
      fields.push(concatRepAttrName('nonweaponproficiencies', id, 'short_description'));
      fields.push(concatRepAttrName('nonweaponproficiencies', id, 'rSlots'));
      fields.push(concatRepAttrName('nonweaponproficiencies', id, 'rModifier'));
      fields.push(concatRepAttrName('nonweaponproficiencies', id, 'macro-text'));
      fields.push(concatRepAttrName('nonweaponproficiencies', id, 'description-show'));
      fields.push(concatRepAttrName('nonweaponproficiencies', id, 'description'));
    });
    getAttrs([...fields], (v) => {
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
        if (doUpdate(v[concatRepAttrName('nonweaponproficiencies', id, 'roll')]))
          output[concatRepAttrName('nonweaponproficiencies', id, 'nwp_roll')] = v[concatRepAttrName('nonweaponproficiencies', id, 'roll')];
        if (doUpdate(v[concatRepAttrName('nonweaponproficiencies', id, 'name')]))
          output[concatRepAttrName('nonweaponproficiencies', id, 'nwp_name')] = v[concatRepAttrName('nonweaponproficiencies', id, 'name')];
        if (doUpdate(v[concatRepAttrName('nonweaponproficiencies', id, 'rAttribute')]))
          output[concatRepAttrName('nonweaponproficiencies', id, 'nwp_attribute')] = v[concatRepAttrName('nonweaponproficiencies', id, 'rAttribute')].toLowerCase();
        if (doUpdate(v[concatRepAttrName('nonweaponproficiencies', id, 'short_description')]))
          output[concatRepAttrName('nonweaponproficiencies', id, 'nwp_short_description')] = v[concatRepAttrName('nonweaponproficiencies', id, 'short_description')];
        if (doUpdate(v[concatRepAttrName('nonweaponproficiencies', id, 'rSlots')]))
          output[concatRepAttrName('nonweaponproficiencies', id, 'nwp_slots')] = int(v[concatRepAttrName('nonweaponproficiencies', id, 'rSlots')]);
        if (doUpdate(v[concatRepAttrName('nonweaponproficiencies', id, 'rModifier')]))
          output[concatRepAttrName('nonweaponproficiencies', id, 'nwp_modifier')] = int(v[concatRepAttrName('nonweaponproficiencies', id, 'rModifier')]);
        if (doUpdate(v[concatRepAttrName('nonweaponproficiencies', id, 'macro-text')], oldMacrotext))
          output[concatRepAttrName('nonweaponproficiencies', id, 'nwp_macro_text')] = replaceSet(v[concatRepAttrName('nonweaponproficiencies', id, 'macro-text')], namesToFix);
        if (doUpdate(v[concatRepAttrName('nonweaponproficiencies', id, 'description-show')]))
          output[concatRepAttrName('nonweaponproficiencies', id, 'nwp_description_show')] = int(v[concatRepAttrName('nonweaponproficiencies', id, 'description-show')]);
        if (doUpdate(v[concatRepAttrName('nonweaponproficiencies', id, 'description')]))
          output[concatRepAttrName('nonweaponproficiencies', id, 'nwp_description')] = v[concatRepAttrName('nonweaponproficiencies', id, 'description')];
      });
      output.sheet_version = current_version;
      clog(`VERSION UPDATE: nwpNameFix completed`);
      setAttrs(output, {silent: true}, () => {
        versionator(current_version, final_version);
      });
    });
  });
};

// add {{color=@{color}}} to all repeating macro-text
const macroColorUpdate = (current_version, final_version) => {
  const output = {};
  getSectionIDs('repeating_nonweaponproficiencies', (idnwps) => {
    getSectionIDs('repeating_weapon', (idweapons) => {
      getSectionIDs('repeating_ability', (idabilities) => {
        getSectionIDs('repeating_spells', (idspells) => {
          const attrsNWP = [];
          const attrsWeapon = [];
          const attrsAbility = [];
          const attrsSpells = [];
          _.each(idnwps, (id) => {
            attrsNWP.push(concatRepAttrName('nonweaponproficiencies', id, 'nwp_macro_text'));
          });
          _.each(idweapons, (id) => {
            attrsWeapon.push(concatRepAttrName('weapon', id, 'weapon_macro_text'));
          });
          _.each(idabilities, (id) => {
            attrsAbility.push(concatRepAttrName('ability', id, 'ability_macro_text'));
          });
          _.each(idspells, (id) => {
            attrsSpells.push(concatRepAttrName('spells', id, 'spell_macro_text'));
          });
          getAttrs([...attrsNWP, ...attrsWeapon, ...attrsAbility, ...attrsSpells], (v) => {
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
            _.each(idnwps, (id) => {
              if (v[concatRepAttrName('nonweaponproficiencies', id, 'nwp_macro_text')]) {
                output[concatRepAttrName('nonweaponproficiencies', id, 'nwp_macro_text')] = v[concatRepAttrName('nonweaponproficiencies', id, 'nwp_macro_text')].replace(
                  replacements.nwp_old,
                  replacements.nwp_new,
                );
                clog(`VERSION UPDATE: colorUpdate completed`);
              }
            });
            _.each(idweapons, (id) => {
              if (v[concatRepAttrName('weapon', id, 'weapon_macro_text')]) {
                output[concatRepAttrName('weapon', id, 'weapon_macro_text')] = v[concatRepAttrName('weapon', id, 'weapon_macro_text')].replace(
                  replacements.wpn_old,
                  replacements.wpn_new,
                );
                clog(`VERSION UPDATE: colorUpdate completed`);
              }
            });
            _.each(idabilities, (id) => {
              if (v[concatRepAttrName('ability', id, 'ability_macro_text')]) {
                output[concatRepAttrName('ability', id, 'ability_macro_text')] = v[concatRepAttrName('ability', id, 'ability_macro_text')].replace(
                  replacements.abl_old,
                  replacements.abl_new,
                );
                clog(`VERSION UPDATE: colorUpdate completed`);
              }
            });
            _.each(idspells, (id) => {
              if (v[concatRepAttrName('spells', id, 'spell_macro_text')]) {
                output[concatRepAttrName('spells', id, 'spell_macro_text')] = v[concatRepAttrName('spells', id, 'spell_macro_text')].replace(
                  replacements.spl_old,
                  replacements.spl_new,
                );
                clog(`VERSION UPDATE: colorUpdate completed`);
              }
            });
            output.sheet_version = current_version;
            setAttrs(output, {silent: true}, () => {
              versionator(current_version, final_version);
            });
          });
        });
      });
    });
  });
};

// One-time update: Auto Calc Ability rows
const stat_functions = () => {
  strengthCalcs();
  intelligenceCalcs();
  wisdomCalcs();
  dexterityCalcs();
  constitutionCalcs();
  charismaCalcs();
};

autoCalcAbilityRows = (current_version, final_version) => {
  const output = {};
  stat_functions();
  output.sheet_version = current_version;
  clog(`VERSION UPDATE: autoCalcAbilityRows completed`);
  setAttrs(output, () => {
    versionator(current_version, final_version);
  });
};

// One-time update: Auto Calc Save rows
autoCalcSaveRows = (current_version, final_version) => {
  const output = {};
  const migrate = 1;
  saveparalysispoisondeathCalc(migrate);
  savepetrificationpolymorphCalc(migrate);
  saverodsstaveswandsCalc(migrate);
  savebreathweaponsCalc(migrate);
  savespellsCalc(migrate);
  output.sheet_version = current_version;
  clog(`VERSION UPDATE: autoCalcSaveRows(migrate) completed`);
  setAttrs(output, {silent: true}, () => {
    versionator(current_version, final_version);
  });
};

// One-time update: Auto Calc Thief rows
autoCalcThiefRows = (current_version, final_version) => {
  const output = {};
  const migrate = 1;
  pickpocketsCalc(migrate);
  openlocksCalc(migrate);
  findtrapsCalc(migrate);
  movequietlyCalc(migrate);
  hideinshadowsCalc(migrate);
  hearnoiseCalc(migrate);
  climbwallsCalc(migrate);
  readlanguagesCalc(migrate);
  thiefmiscCalc();
  thiefmisc1Calc();
  thiefmisc2Calc();
  output.sheet_version = current_version;
  clog(`VERSION UPDATE: autoCalcThiefRows(migrate) completed`);
  setAttrs(output, {silent: true}, () => {
    versionator(current_version, final_version);
  });
};

// Remove @{weapon_whisper_to_hit}
const removeWhisper = (current_version, final_version) => {
  // remove all instances of @{weapon_whisper_to_hit} in macro-text
  getSectionIDs('repeating_weapon', (idArray) => {
    const fields = [];
    _.each(idArray, (id) => {
      fields.push(concatRepAttrName('weapon', id, 'weapon_macro_text'));
    });
    getAttrs([...fields], (v) => {
      const output = {};
      const macrodefault =
        '&{template:attacks} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=@{weapon_name}}} {{attack1=[[1d20 + @{weapon_tohitbonus}[BON] + @{weapon_magicbonus}[MAG] + ?{To Hit Modifier?|0}[MOD] ]]}} {{damage1vsSM=[[@{weapon_damagesmallmedium} + @{weapon_attackdmgbonus}[BON] + @{weapon_magicbonus}[MAG] + ?{Damage Modifier?|0}[MOD] ]]}} {{damage1vsL=[[@{weapon_damagelarge} + @{weapon_attackdmgbonus}[BON] + @{weapon_magicbonus}[MAG] + ?{Damage Modifier?|0}[MOD] ]]}} {{WeaponNotes=@{weapon_notes}}} @{weapon_whisper_to_hit}';
      _.each(idArray, (id) => {
        const macrotext = v[concatRepAttrName('weapon', id, 'weapon_macro_text')] || macrodefault;
        output[concatRepAttrName('weapon', id, 'weapon_macro_text')] = macrotext.replace(/} @{weapon_whisper_to_hit}/g, '}');
      });
      output.sheet_version = current_version;
      clog(`VERSION UPDATE: removeWhisper completed`);
      setAttrs(output, {silent: true}, () => {
        versionator(current_version, final_version);
      });
    });
  });
};

// migrate HP
const migrateHP = (current_version, final_version) => {
  // clog('HP migrated');
  getAttrs(['hitpoints_max', 'hitpoints_1_class', 'hitpoints_2_class', 'hitpoints_3_class'], (v) => {
    const output = {};
    const hitPointsMax = +v.hitpoints_max || 0;
    const hitpoints_1_class = +v.hitpoints_1_class || 0;
    const hitpoints_2_class = +v.hitpoints_2_class || 0;
    const hitpoints_3_class = +v.hitpoints_3_class || 0;
    const totalClassHP = int(Math.max(0, hitpoints_1_class) + Math.max(0, hitpoints_2_class) + Math.max(0, hitpoints_3_class));
    // older sheet will not have hp per class
    if (totalClassHP === 0 && hitPointsMax > 0) {
      output.hitpoints_1_class = hitPointsMax;
    }
    output.sheet_version = current_version;
    clog(`VERSION UPDATE: migrate HP completed`);
    setAttrs(
      output,
      {silent: true},
      () => {
        versionator(current_version, final_version);
      },
      calcHP(),
    );
  });
};

// migrate AC
const migrateAC = (current_version, final_version) => {
  getAttrs(['armorclass', 'armortype_ac', 'armorclass_total', 'armorbonus', 'armorshield'], (v) => {
    const output = {};
    const recalc = 0;
    let armorClass = +v.armorclass;
    const armorBonus = -Math.abs(v.armorbonus) || 0;
    const armorClassTotal = +v.armorclass_total || 0;
    const armortypeAC = +v.armortype_ac;
    const armorShield = v.armorshield;
    clog(`armorShield:${armorShield} armorClassTotal:${armorClassTotal} armorBonus:${armorBonus} armortypeAC:${armortypeAC} armorClass:${armorClass}`);
    // older sheet will have default value for armortypeAC and armorClassTotal.  AC s/b better than 10
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
        clog(`new armor w/shield`);
      }
    } else if (armortypeAC === 10 && armorClass < 10) {
      output.armortype_ac = armorClass;
      output.armortype_base = armorClass;
      output.armortype_worn = 1;
      output.armortype_carried = 1;
      clog(`new armor w/out shield`);
    } else {
      clog(`NEW ARMOR CHECK AND SET FAILED`);
    }
    output.sheet_version = current_version;
    clog(`VERSION UPDATE: Migrate AC completed`);
    setAttrs(
      output,
      {silent: true},
      () => {
        versionator(current_version, final_version);
      },
      calcAC(recalc),
    );
  });
};

// update Weapon macro-text ONLY IF they haven't been edited.
// Tests against previous macro-text changes back to v1.58
const weaponMacroUpdate = (current_version, final_version) => {
  getSectionIDs('repeating_weapon', (idArray) => {
    const fields = [];
    _.each(idArray, (id) => {
      fields.push(concatRepAttrName('weapon', id, 'weapon_macro_text'));
    });
    getAttrs([...fields], (v) => {
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
      _.each(idArray, (id) => {
        if (v[concatRepAttrName('weapon', id, 'weapon_macro_text')] === replacements.weapon_old_v6) {
          output[concatRepAttrName('weapon', id, 'weapon_macro_text')] = v[concatRepAttrName('weapon', id, 'weapon_macro_text')].replace(
            replacements.weapon_old_v6,
            replacements.weapon_current,
          );
        } else if (v[concatRepAttrName('weapon', id, 'weapon_macro_text')] === replacements.weapon_old_v5) {
          output[concatRepAttrName('weapon', id, 'weapon_macro_text')] = v[concatRepAttrName('weapon', id, 'weapon_macro_text')].replace(
            replacements.weapon_old_v5,
            replacements.weapon_current,
          );
        } else if (v[concatRepAttrName('weapon', id, 'weapon_macro_text')] === replacements.weapon_old_v4) {
          output[concatRepAttrName('weapon', id, 'weapon_macro_text')] = v[concatRepAttrName('weapon', id, 'weapon_macro_text')].replace(
            replacements.weapon_old_v4,
            replacements.weapon_current,
          );
        } else if (v[concatRepAttrName('weapon', id, 'weapon_macro_text')] === replacements.weapon_old_v3) {
          output[concatRepAttrName('weapon', id, 'weapon_macro_text')] = v[concatRepAttrName('weapon', id, 'weapon_macro_text')].replace(
            replacements.weapon_old_v3,
            replacements.weapon_current,
          );
        } else if (v[concatRepAttrName('weapon', id, 'weapon_macro_text')] === replacements.weapon_old_v2) {
          output[concatRepAttrName('weapon', id, 'weapon_macro_text')] = v[concatRepAttrName('weapon', id, 'weapon_macro_text')].replace(
            replacements.weapon_old_v2,
            replacements.weapon_current,
          );
        } else if (v[concatRepAttrName('weapon', id, 'weapon_macro_text')] === replacements.weapon_old) {
          output[concatRepAttrName('weapon', id, 'weapon_macro_text')] = v[concatRepAttrName('weapon', id, 'weapon_macro_text')].replace(
            replacements.weapon_old,
            replacements.weapon_current,
          );
        }
      });
      output.sheet_version = current_version;
      clog(`VERSION UPDATE: weaponMacroUpdate completed`);
      setAttrs(output, {silent: true}, () => {
        versionator(current_version, final_version);
      });
    });
  });
};

// update Special Ability macro-text ONLY IF they haven't been edited. Tests against v1.58 macro-text
const abilityMacroUpdate = (current_version, final_version) => {
  getSectionIDs('repeating_ability', (idArray) => {
    const fields = [];
    _.each(idArray, (id) => {
      fields.push(concatRepAttrName('ability', id, 'ability_macro_text'));
    });
    getAttrs([...fields], (v) => {
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
      _.each(idArray, (id) => {
        if (v[concatRepAttrName('ability', id, 'ability_macro_text')] === replacements.ability_old_v5) {
          output[concatRepAttrName('ability', id, 'ability_macro_text')] = v[concatRepAttrName('ability', id, 'ability_macro_text')].replace(
            replacements.ability_old_v5,
            replacements.ability_current,
          );
        }
        if (v[concatRepAttrName('ability', id, 'ability_macro_text')] === replacements.ability_old_v4) {
          output[concatRepAttrName('ability', id, 'ability_macro_text')] = v[concatRepAttrName('ability', id, 'ability_macro_text')].replace(
            replacements.ability_old_v4,
            replacements.ability_current,
          );
        }
        if (v[concatRepAttrName('ability', id, 'ability_macro_text')] === replacements.ability_old_v3) {
          output[concatRepAttrName('ability', id, 'ability_macro_text')] = v[concatRepAttrName('ability', id, 'ability_macro_text')].replace(
            replacements.ability_old_v3,
            replacements.ability_current,
          );
        }
        if (v[concatRepAttrName('ability', id, 'ability_macro_text')] === replacements.ability_old_v2) {
          output[concatRepAttrName('ability', id, 'ability_macro_text')] = v[concatRepAttrName('ability', id, 'ability_macro_text')].replace(
            replacements.ability_old_v2,
            replacements.ability_current,
          );
        }
        if (v[concatRepAttrName('ability', id, 'ability_macro_text')] === replacements.ability_old) {
          output[concatRepAttrName('ability', id, 'ability_macro_text')] = v[concatRepAttrName('ability', id, 'ability_macro_text')].replace(
            replacements.ability_old,
            replacements.ability_current,
          );
        }
      });
      output.sheet_version = current_version;
      clog(`VERSION UPDATE: abilityMacroUpdate completed`);
      setAttrs(output, {silent: true}, () => {
        versionator(current_version, final_version);
      });
    });
  });
};

// update NWP macro-text ONLY IF they haven't been edited. Tests against v1.58 macro-text
const nwpMacroUpdate2 = (current_version, final_version) => {
  getSectionIDs('repeating_nonweaponproficiencies', (idArray) => {
    const fields = [];
    _.each(idArray, (id) => {
      fields.push(concatRepAttrName('nonweaponproficiencies', id, 'nwp_macro_text'));
    });
    getAttrs([...fields], (v) => {
      const output = {};
      const replacements = {
        nwp_old:
          '&{template:general} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=Non Weapon Proficiency: @{nwp_name}}} {{Proficiency Check=[[ 1d20 + [[@{nwp_modifier}]][MOD] + [[?{Additional modifier?|0}]][MOD] ]] vs [[ @{nwp_attribute}[ATTR] ]]}}{{freetext=@{nwp_short_description}}}',
        nwp_old_v2:
          '@{whisper_pc} &{template:general} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=Non Weapon Proficiency: @{nwp_name}}} {{roll_low=[[ 1d20 + [[ @{nwp_modifier} ]][MOD] + [[ ?{Modifier?|0} ]][MOD] ]]}} {{roll_target=[[ @{nwp_attribute}[ATTR] ]]}} {{mod_applied=[[ ?{Modifier?|0} ]]}} {{NWP Mod Applied=[[ @{nwp_modifier} ]]}} {{freetext=@{nwp_short_description}}}',
        nwp_current:
          '@{whisper_pc} &{template:general} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=Non Weapon Proficiency: @{nwp_name}}} {{roll_low=[[ 1d20 + [[ @{nwp_modifier} ]][MOD] + [[ ?{Modifier?|0} ]][MOD] ]]}} {{roll_target=[[ @{nwp_attribute}[ATTR] ]]}} {{mod_applied=[[ ?{Modifier?|0} ]]}} {{nwp_mod_applied=[[ @{nwp_modifier} ]]}} {{link=@{nwp_link}}} {{freetext=@{nwp_short_description} @{nwp_description}}}',
      };
      _.each(idArray, (id) => {
        if (v[concatRepAttrName('nonweaponproficiencies', id, 'nwp_macro_text')] === replacements.nwp_old_2) {
          output[concatRepAttrName('nonweaponproficiencies', id, 'nwp_macro_text')] = v[concatRepAttrName('nonweaponproficiencies', id, 'nwp_macro_text')].replace(
            replacements.nwp_old_2,
            replacements.nwp_current,
          );
        }
        if (v[concatRepAttrName('nonweaponproficiencies', id, 'nwp_macro_text')] === replacements.nwp_old) {
          output[concatRepAttrName('nonweaponproficiencies', id, 'nwp_macro_text')] = v[concatRepAttrName('nonweaponproficiencies', id, 'nwp_macro_text')].replace(
            replacements.nwp_old,
            replacements.nwp_current,
          );
        }
      });
      output.sheet_version = current_version;
      clog(`VERSION UPDATE: nwpMacroUpdate2 completed`);
      setAttrs(output, {silent: true}, () => {
        versionator(current_version, final_version);
      });
    });
  });
};

// update Spells macro-text ONLY IF they haven't been edited. Tests against v1.58 macro-text
const spellsMacroUpdate = (current_version, final_version) => {
  getSectionIDs('repeating_spells', (idArray) => {
    const fields = [];
    _.each(idArray, (id) => {
      fields.push(concatRepAttrName('spells', id, 'spell_macro_text'));
    });
    getAttrs([...fields], (v) => {
      const output = {};
      const replacements = {
        spell_old:
          '&{template:general} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=Casts: @{spell_name}}} {{Level:=@{spell_level}}} {{Range:=@{spell_range}}} {{Duration:=@{spell_duration}}} {{AOE:=@{spell_aoe}}} {{Comp:=@{spell_components}}} {{CT:=@{spell_ct}}} {{Save:=@{spell_save}}} {{freetext=@{spell_description}}}',
        spell_old_v2:
          '&{template:general} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=Casts: @{spell_name}}} {{Range:=@{spell_range}}} {{Duration:=@{spell_duration}}} {{AOE:=@{spell_aoe}}} {{Save:=@{spell_save}}}',
        spell_old_v3:
          '@{whisper_pc} &{template:general} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=Casts: @{spell_name}}} {{school=@{spell_school}}} {{spell_level=@{spell_level}}} {{range=@{spell_range}}} {{duration=@{spell_duration}}} {{area_of_effect=@{spell_aoe}}} {{components=@{spell_components}}} {{casting_time=@{spell_ct}}} {{saving_throw=@{spell_save}}} {{freetext=@{spell_description}}}',
        spell_current:
          '@{whisper_pc} &{template:general} {{color=