//-------------------------------------------------------------------------------------
// orcsAsync
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
  var oldAcid = getActiveCharacterId();
  var msg = {id: '0', type: 'setActiveCharacter', data: charId};

  if (isRunningOnServer() == false) {
    //if in a browser, use "dispatchEvent" to process the message
    var ev = new CustomEvent('message');
    ev.data = msg;
    self.dispatchEvent(ev);
  } else {
    //otherwise, use the API (server) message processor, "onmessage"
    self.onmessage({data: msg});
  }
  return oldAcid; //return what the value used to be, so calling code can be a little cleaner
}

var _sIn = setInterval;
setInterval = function (callback, timeout) {
  var acid = getActiveCharacterId();
  _sIn(function () {
    var prevAcid = setActiveCharacterId(acid);
    callback();
    setActiveCharacterId(prevAcid);
  }, timeout);
};

var _sto = setTimeout;
setTimeout = function (callback, timeout) {
  var acid = getActiveCharacterId();
  _sto(function () {
    var prevAcid = setActiveCharacterId(acid);
    callback();
    setActiveCharacterId(prevAcid);
  }, timeout);
};

function getAttrsAsync(props) {
  var acid = getActiveCharacterId(); //save the current activeCharacterID in case it has changed when the promise runs
  var prevAcid = null; //local variable defined here, because it needs to be shared across the promise callbacks defined below
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
  var acid = getActiveCharacterId();
  var prevAcid = null;
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
  var acid = getActiveCharacterId();
  var prevAcid = null;
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
const isAlphaNumericWithSpaces = (attr) => {
  // Check for alpha-numeric characters and spaces
  if (/^[a-zA-Z0-9\s]+$/.test(attr)) {
    return true;
  }
  // Check for specific characters that can break a macro
  if (/[)|\}]/.test(attr)) {
    return false;
  }
  return true;
};

// Number Validation
const numbersOnly = (attr) => {
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
on('change:character_name', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  getAttrs(['character_name'], (v) => {
    const output = {};
    const attr = v[`${eventInfo.sourceAttribute}`];
    // validate input
    const isText = isAlphaNumericWithSpaces(attr);
    // clog(`Valid Input?: ${isText}`);
    // write to a hidden checkbox in html ie 'X_error', CSS to style
    output[`${eventInfo.sourceAttribute}_error`] = isText;
    setAttrs(output, {silent: true});
  });
});

// Validate input for +/- adjustment
on(
  'change:armortype_magic change:armortype2_magic change:armorshield_magic change:armorhelmet_magic change:armorother_magic change:armorother2_magic change:armorother3_magic change:armorother4_magic change:armorother5_magic change:armorother6_magic change:armorshield_mod change:armorother_mod change:armorother2_mod change:armorother3_mod change:armorother4_mod change:armorother5_mod change:armorother6_mod change:repeating_equipment:equipment_armor_mod change:repeating_equipment:equipment_armor_magic, change:hitpoints_1_class, change:hitpoints_2_class, change:hitpoints_3_class',
  (eventInfo) => {
    // clog(`Change Detected:${eventInfo.sourceAttribute}`);
    const id = eventInfo.sourceAttribute.split('_')[2];
    getAttrs(
      [
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
      ],
      (v) => {
        const output = {};
        const attr = v[`${eventInfo.sourceAttribute}`];
        // validate input
        const isNumber = numbersOnly(attr);
        // clog(`NUMBER?: ${isNumber}`);
        // write to a hidden checkbox in html ie 'X_error', CSS to style
        output[`${eventInfo.sourceAttribute}_error`] = isNumber;
        // output[`${eventInfo.sourceAttribute}`] = isNumber === 0 ? 0 : attr;
        setAttrs(output, {silent: true});
      },
    );
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

// used in getSectionIds to separate a repeating attribute names into 3 components
const section_attribute = (section, id, field) => `repeating_${section}_${id}_${field}`;

// fixes attribute name conflict
const dmgSwap = (current_version, final_version) => {
  // copy DmgBonus value to AttackDmgBonus
  // replace all instances of @{DmgBonus} with @{AttackDmgBonus} in macro-text
  getSectionIDs('repeating_weapon', (idArray) => {
    const fields = [];
    _.each(idArray, (id) => {
      fields.push(section_attribute('weapon', id, 'DmgBonus'));
      fields.push(section_attribute('weapon', id, 'macro-text'));
    });
    getAttrs([...fields], (v) => {
      const output = {};
      const macrodefault =
        '&{template:attacks} {{name=@{character_name}}} {{subtag=@{WeaponName}}} {{attack1=[[1d20 + @{ToHitBonus}[BON] + @{MagicBonus}[MAG] + ?{To Hit Modifier?|0}[MOD] ]]}} {{damage1vsSM=[[@{DamageSmallMedium} + @{DmgBonus}[BON] + @{MagicBonus}[MAG] + ?{Damage Modifier?|0}[MOD] ]]}} {{damage1vsL=[[@{DamageLarge} + @{DmgBonus}[BON] + @{MagicBonus}[MAG] + ?{Damage Modifier?|0}[MOD] ]]}} {{WeaponNotes=@{WeaponNotes}}} @{whisper_to-hit}';
      _.each(idArray, (id) => {
        const macrotext = v[section_attribute('weapon', id, 'macro-text')] || macrodefault;
        // replaces old attribute value with new
        output[section_attribute('weapon', id, 'macro-text')] = macrotext.replace(/@{DmgBonus}/g, '@{AttackDmgBonus}');
        output[section_attribute('weapon', id, 'AttackDmgBonus')] = +v[section_attribute('weapon', id, 'DmgBonus')] || 0;
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
      fields.push(section_attribute('ability', id, 'max'));
    });
    getAttrs([...fields], (v) => {
      const output = {};
      _.each(idArray, (id) => {
        // replaces old attribute value with new
        output[section_attribute('ability', id, 'current_max')] = +v[section_attribute('ability', id, 'max')] || 0;
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
      fields.push(section_attribute('nonweaponproficiencies', id, 'macro-text'));
    });
    getAttrs([...fields], (v) => {
      const replacements = {
        nwp_old:
          '&{template:general} {{name=@{character_name}}} {{subtag=Non Weapon Proficiency: @{name}}} {{=@{short_description}}}{{Success Amount=[[((@{rAttribute})+(@{rSlots}-1)-1d20)cs>1cf<-1]]}}',
        nwp_new:
          '&{template:general} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=Non Weapon Proficiency: @{name}}} {{Proficiency Check=[[ 1d20 + [[@{rmodifier}]][MOD] + [[?{Additional modifier?|0}]][MOD] ]] vs [[ @{rAttribute}[ATTR] ]]}}{{freetext=@{short_description}}}',
      };
      _.each(idArray, (id) => {
        if (v[section_attribute('nonweaponproficiencies', id, 'macro-text')]) {
          output[section_attribute('nonweaponproficiencies', id, 'macro-text')] = v[section_attribute('nonweaponproficiencies', id, 'macro-text')].replace(
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
      fields.push(section_attribute('weapon', id, 'roll'));
      fields.push(section_attribute('weapon', id, 'weaponname'));
      fields.push(section_attribute('weapon', id, 'tohitbonus'));
      fields.push(section_attribute('weapon', id, 'magicbonus'));
      fields.push(section_attribute('weapon', id, 'attackdmgbonus'));
      fields.push(section_attribute('weapon', id, 'whisper_to-hit'));
      fields.push(section_attribute('weapon', id, 'macro-text'));
      fields.push(section_attribute('weapon', id, 'damagesmallmedium'));
      fields.push(section_attribute('weapon', id, 'damagelarge'));
      fields.push(section_attribute('weapon', id, 'rateoffire'));
      fields.push(section_attribute('weapon', id, 'range'));
      fields.push(section_attribute('weapon', id, 'quantity'));
      fields.push(section_attribute('weapon', id, 'weight'));
      fields.push(section_attribute('weapon', id, 'weaponspeed'));
      fields.push(section_attribute('weapon', id, 'cost'));
      fields.push(section_attribute('weapon', id, 'weaponnotes'));
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
        if (doUpdate(v[section_attribute('weapon', id, 'rateoffire')]))
          output[section_attribute('weapon', id, 'weapon_rateoffire')] = int(v[section_attribute('weapon', id, 'rateoffire')]);
        if (doUpdate(v[section_attribute('weapon', id, 'roll')])) output[section_attribute('weapon', id, 'weapon_roll')] = v[section_attribute('weapon', id, 'roll')];
        if (doUpdate(v[section_attribute('weapon', id, 'weaponname')])) output[section_attribute('weapon', id, 'weapon_name')] = v[section_attribute('weapon', id, 'weaponname')];
        if (doUpdate(v[section_attribute('weapon', id, 'tohitbonus')]))
          output[section_attribute('weapon', id, 'weapon_tohitbonus')] = int(v[section_attribute('weapon', id, 'tohitbonus')]);
        if (doUpdate(v[section_attribute('weapon', id, 'magicbonus')]))
          output[section_attribute('weapon', id, 'weapon_magicbonus')] = int(v[section_attribute('weapon', id, 'magicbonus')]);
        if (doUpdate(v[section_attribute('weapon', id, 'attackdmgbonus')]))
          output[section_attribute('weapon', id, 'weapon_attackdmgbonus')] = int(v[section_attribute('weapon', id, 'attackdmgbonus')]);
        if (doUpdate(v[section_attribute('weapon', id, 'whisper_to-hit')]))
          output[section_attribute('weapon', id, 'weapon_whisper_to_hit')] = v[section_attribute('weapon', id, 'whisper_to-hit')];
        if (doUpdate(v[section_attribute('weapon', id, 'macro-text')], oldMacrotext))
          output[section_attribute('weapon', id, 'weapon_macro_text')] = replaceSet(v[section_attribute('weapon', id, 'macro-text')], namesToFix);
        if (doUpdate(v[section_attribute('weapon', id, 'damagesmallmedium')]))
          output[section_attribute('weapon', id, 'weapon_damagesmallmedium')] = v[section_attribute('weapon', id, 'damagesmallmedium')];
        if (doUpdate(v[section_attribute('weapon', id, 'damagelarge')]))
          output[section_attribute('weapon', id, 'weapon_damagelarge')] = v[section_attribute('weapon', id, 'damagelarge')];
        if (doUpdate(v[section_attribute('weapon', id, 'range')])) output[section_attribute('weapon', id, 'weapon_range')] = v[section_attribute('weapon', id, 'range')];
        if (doUpdate(v[section_attribute('weapon', id, 'quantity')]))
          output[section_attribute('weapon', id, 'weapon_quantity')] = float(v[section_attribute('weapon', id, 'quantity')]);
        if (doUpdate(v[section_attribute('weapon', id, 'weight')])) output[section_attribute('weapon', id, 'weapon_weight')] = float(v[section_attribute('weapon', id, 'weight')]);
        if (doUpdate(v[section_attribute('weapon', id, 'weaponspeed')]))
          output[section_attribute('weapon', id, 'weapon_speed')] = int(v[section_attribute('weapon', id, 'weaponspeed')]);
        if (doUpdate(v[section_attribute('weapon', id, 'cost')])) output[section_attribute('weapon', id, 'weapon_cost')] = float(v[section_attribute('weapon', id, 'cost')]);
        if (doUpdate(v[section_attribute('weapon', id, 'weaponnotes')]))
          output[section_attribute('weapon', id, 'weapon_notes')] = v[section_attribute('weapon', id, 'weaponnotes')];
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
      fields.push(section_attribute('spells', id, 'roll'));
      fields.push(section_attribute('spells', id, 'memorized'));
      fields.push(section_attribute('spells', id, 'level'));
      fields.push(section_attribute('spells', id, 'name'));
      fields.push(section_attribute('spells', id, 'school'));
      fields.push(section_attribute('spells', id, 'range'));
      fields.push(section_attribute('spells', id, 'duration'));
      fields.push(section_attribute('spells', id, 'aoe'));
      fields.push(section_attribute('spells', id, 'components'));
      fields.push(section_attribute('spells', id, 'ct'));
      fields.push(section_attribute('spells', id, 'save'));
      fields.push(section_attribute('spells', id, 'macro-text'));
      fields.push(section_attribute('spells', id, 'description'));
      fields.push(section_attribute('spells', id, 'description-show'));
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
        if (doUpdate(v[section_attribute('spells', id, 'roll')])) output[section_attribute('spells', id, 'spell_roll')] = v[section_attribute('spells', id, 'roll')];
        if (doUpdate(v[section_attribute('spells', id, 'memorized')]))
          output[section_attribute('spells', id, 'spell_memorized')] = int(v[section_attribute('spells', id, 'memorized')]);
        if (doUpdate(v[section_attribute('spells', id, 'level')])) output[section_attribute('spells', id, 'spell_level')] = v[section_attribute('spells', id, 'level')];
        if (doUpdate(v[section_attribute('spells', id, 'name')])) output[section_attribute('spells', id, 'spell_name')] = v[section_attribute('spells', id, 'name')];
        if (doUpdate(v[section_attribute('spells', id, 'school')])) output[section_attribute('spells', id, 'spell_school')] = v[section_attribute('spells', id, 'school')];
        if (doUpdate(v[section_attribute('spells', id, 'range')])) output[section_attribute('spells', id, 'spell_range')] = v[section_attribute('spells', id, 'range')];
        if (doUpdate(v[section_attribute('spells', id, 'duration')])) output[section_attribute('spells', id, 'spell_duration')] = v[section_attribute('spells', id, 'duration')];
        if (doUpdate(v[section_attribute('spells', id, 'aoe')])) output[section_attribute('spells', id, 'spell_aoe')] = v[section_attribute('spells', id, 'aoe')];
        if (doUpdate(v[section_attribute('spells', id, 'components')]))
          output[section_attribute('spells', id, 'spell_components')] = v[section_attribute('spells', id, 'components')];
        if (doUpdate(v[section_attribute('spells', id, 'ct')])) output[section_attribute('spells', id, 'spell_ct')] = v[section_attribute('spells', id, 'ct')];
        if (doUpdate(v[section_attribute('spells', id, 'save')])) output[section_attribute('spells', id, 'spell_save')] = v[section_attribute('spells', id, 'save')];
        if (doUpdate(v[section_attribute('spells', id, 'macro-text')], oldMacrotext))
          output[section_attribute('spells', id, 'spell_macro_text')] = replaceSet(v[section_attribute('spells', id, 'macro-text')], namesToFix);
        if (doUpdate(v[section_attribute('spells', id, 'description')]))
          output[section_attribute('spells', id, 'spell_description')] = v[section_attribute('spells', id, 'description')];
        if (doUpdate(v[section_attribute('spells', id, 'description-show')]))
          output[section_attribute('spells', id, 'spell_description_show')] = int(v[section_attribute('spells', id, 'description-show')]);
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
      fields.push(section_attribute('equipment', id, 'item-show'));
      fields.push(section_attribute('equipment', id, 'item'));
      fields.push(section_attribute('equipment', id, 'location'));
      fields.push(section_attribute('equipment', id, 'carried'));
      fields.push(section_attribute('equipment', id, 'quantity'));
      fields.push(section_attribute('equipment', id, 'quantity_max'));
      fields.push(section_attribute('equipment', id, 'weight'));
      fields.push(section_attribute('equipment', id, 'cos'));
    });
    getAttrs([...fields], (v) => {
      const output = {};
      _.each(idArray, (id) => {
        if (doUpdate(v[section_attribute('equipment', id, 'item-show')]))
          output[section_attribute('equipment', id, 'equipment_item_show')] = v[section_attribute('equipment', id, 'item-show')];
        if (doUpdate(v[section_attribute('equipment', id, 'item')])) output[section_attribute('equipment', id, 'equipment_item')] = v[section_attribute('equipment', id, 'item')];
        if (doUpdate(v[section_attribute('equipment', id, 'location')]))
          output[section_attribute('equipment', id, 'equipment_location')] = v[section_attribute('equipment', id, 'location')];
        if (doUpdate(v[section_attribute('equipment', id, 'carried')]))
          output[section_attribute('equipment', id, 'equipment_carried')] = v[section_attribute('equipment', id, 'carried')];
        if (doUpdate(v[section_attribute('equipment', id, 'quantity')]))
          output[section_attribute('equipment', id, 'equipment_quantity')] = float(v[section_attribute('equipment', id, 'quantity')]);
        if (doUpdate(v[section_attribute('equipment', id, 'quantity_max')]))
          output[section_attribute('equipment', id, 'equipment_quantity_max')] = float(v[section_attribute('equipment', id, 'quantity_max')]);
        if (doUpdate(v[section_attribute('equipment', id, 'weight')]))
          output[section_attribute('equipment', id, 'equipment_weight')] = float(v[section_attribute('equipment', id, 'weight')]);
        if (doUpdate(v[section_attribute('equipment', id, 'cost')]))
          output[section_attribute('equipment', id, 'equipment_cost')] = float(v[section_attribute('equipment', id, 'cost')]);
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
      fields.push(section_attribute('equipment', id, 'roll'));
      fields.push(section_attribute('equipment', id, 'name'));
      fields.push(section_attribute('equipment', id, 'short_description'));
      fields.push(section_attribute('equipment', id, 'current'));
      fields.push(section_attribute('equipment', id, 'current_max'));
      fields.push(section_attribute('equipment', id, 'macro-text'));
      fields.push(section_attribute('equipment', id, 'description'));
      fields.push(section_attribute('equipment', id, 'description-show'));
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
        if (doUpdate(v[section_attribute('equipment', id, 'roll')])) output[section_attribute('equipment', id, 'ability_roll')] = v[section_attribute('equipment', id, 'roll')];
        if (doUpdate(v[section_attribute('equipment', id, 'name')])) output[section_attribute('equipment', id, 'ability_name')] = v[section_attribute('equipment', id, 'name')];
        if (doUpdate(v[section_attribute('equipment', id, 'short_description')]))
          output[section_attribute('equipment', id, 'ability_short_description')] = v[section_attribute('equipment', id, 'short_description')];
        if (doUpdate(v[section_attribute('equipment', id, 'current')]))
          output[section_attribute('equipment', id, 'ability_current')] = int(v[section_attribute('equipment', id, 'current')]);
        if (doUpdate(v[section_attribute('equipment', id, 'current_max')]))
          output[section_attribute('equipment', id, 'ability_current_max')] = int(v[section_attribute('equipment', id, 'current_max')]);
        if (doUpdate(v[section_attribute('equipment', id, 'macro-text')], oldMacrotext))
          output[section_attribute('equipment', id, 'ability_macro_text')] = replaceSet(v[section_attribute('equipment', id, 'macro-text')], namesToFix);
        if (doUpdate(v[section_attribute('equipment', id, 'description')]))
          output[section_attribute('equipment', id, 'ability_description')] = v[section_attribute('equipment', id, 'description')];
        if (doUpdate(v[section_attribute('equipment', id, 'description-show')]))
          output[section_attribute('equipment', id, 'ability_description_show')] = int(v[section_attribute('equipment', id, 'description-show')]);
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
      fields.push(section_attribute('nonweaponproficiencies', id, 'roll'));
      fields.push(section_attribute('nonweaponproficiencies', id, 'name'));
      fields.push(section_attribute('nonweaponproficiencies', id, 'rAttribute'));
      fields.push(section_attribute('nonweaponproficiencies', id, 'short_description'));
      fields.push(section_attribute('nonweaponproficiencies', id, 'rSlots'));
      fields.push(section_attribute('nonweaponproficiencies', id, 'rModifier'));
      fields.push(section_attribute('nonweaponproficiencies', id, 'macro-text'));
      fields.push(section_attribute('nonweaponproficiencies', id, 'description-show'));
      fields.push(section_attribute('nonweaponproficiencies', id, 'description'));
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
        if (doUpdate(v[section_attribute('nonweaponproficiencies', id, 'roll')]))
          output[section_attribute('nonweaponproficiencies', id, 'nwp_roll')] = v[section_attribute('nonweaponproficiencies', id, 'roll')];
        if (doUpdate(v[section_attribute('nonweaponproficiencies', id, 'name')]))
          output[section_attribute('nonweaponproficiencies', id, 'nwp_name')] = v[section_attribute('nonweaponproficiencies', id, 'name')];
        if (doUpdate(v[section_attribute('nonweaponproficiencies', id, 'rAttribute')]))
          output[section_attribute('nonweaponproficiencies', id, 'nwp_attribute')] = v[section_attribute('nonweaponproficiencies', id, 'rAttribute')].toLowerCase();
        if (doUpdate(v[section_attribute('nonweaponproficiencies', id, 'short_description')]))
          output[section_attribute('nonweaponproficiencies', id, 'nwp_short_description')] = v[section_attribute('nonweaponproficiencies', id, 'short_description')];
        if (doUpdate(v[section_attribute('nonweaponproficiencies', id, 'rSlots')]))
          output[section_attribute('nonweaponproficiencies', id, 'nwp_slots')] = int(v[section_attribute('nonweaponproficiencies', id, 'rSlots')]);
        if (doUpdate(v[section_attribute('nonweaponproficiencies', id, 'rModifier')]))
          output[section_attribute('nonweaponproficiencies', id, 'nwp_modifier')] = int(v[section_attribute('nonweaponproficiencies', id, 'rModifier')]);
        if (doUpdate(v[section_attribute('nonweaponproficiencies', id, 'macro-text')], oldMacrotext))
          output[section_attribute('nonweaponproficiencies', id, 'nwp_macro_text')] = replaceSet(v[section_attribute('nonweaponproficiencies', id, 'macro-text')], namesToFix);
        if (doUpdate(v[section_attribute('nonweaponproficiencies', id, 'description-show')]))
          output[section_attribute('nonweaponproficiencies', id, 'nwp_description_show')] = int(v[section_attribute('nonweaponproficiencies', id, 'description-show')]);
        if (doUpdate(v[section_attribute('nonweaponproficiencies', id, 'description')]))
          output[section_attribute('nonweaponproficiencies', id, 'nwp_description')] = v[section_attribute('nonweaponproficiencies', id, 'description')];
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
            attrsNWP.push(section_attribute('nonweaponproficiencies', id, 'nwp_macro_text'));
          });
          _.each(idweapons, (id) => {
            attrsWeapon.push(section_attribute('weapon', id, 'weapon_macro_text'));
          });
          _.each(idabilities, (id) => {
            attrsAbility.push(section_attribute('ability', id, 'ability_macro_text'));
          });
          _.each(idspells, (id) => {
            attrsSpells.push(section_attribute('spells', id, 'spell_macro_text'));
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
              if (v[section_attribute('nonweaponproficiencies', id, 'nwp_macro_text')]) {
                output[section_attribute('nonweaponproficiencies', id, 'nwp_macro_text')] = v[section_attribute('nonweaponproficiencies', id, 'nwp_macro_text')].replace(
                  replacements.nwp_old,
                  replacements.nwp_new,
                );
                clog(`VERSION UPDATE: colorUpdate completed`);
              }
            });
            _.each(idweapons, (id) => {
              if (v[section_attribute('weapon', id, 'weapon_macro_text')]) {
                output[section_attribute('weapon', id, 'weapon_macro_text')] = v[section_attribute('weapon', id, 'weapon_macro_text')].replace(
                  replacements.wpn_old,
                  replacements.wpn_new,
                );
                clog(`VERSION UPDATE: colorUpdate completed`);
              }
            });
            _.each(idabilities, (id) => {
              if (v[section_attribute('ability', id, 'ability_macro_text')]) {
                output[section_attribute('ability', id, 'ability_macro_text')] = v[section_attribute('ability', id, 'ability_macro_text')].replace(
                  replacements.abl_old,
                  replacements.abl_new,
                );
                clog(`VERSION UPDATE: colorUpdate completed`);
              }
            });
            _.each(idspells, (id) => {
              if (v[section_attribute('spells', id, 'spell_macro_text')]) {
                output[section_attribute('spells', id, 'spell_macro_text')] = v[section_attribute('spells', id, 'spell_macro_text')].replace(
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
      fields.push(section_attribute('weapon', id, 'weapon_macro_text'));
    });
    getAttrs([...fields], (v) => {
      const output = {};
      const macrodefault =
        '&{template:attacks} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=@{weapon_name}}} {{attack1=[[1d20 + @{weapon_tohitbonus}[BON] + @{weapon_magicbonus}[MAG] + ?{To Hit Modifier?|0}[MOD] ]]}} {{damage1vsSM=[[@{weapon_damagesmallmedium} + @{weapon_attackdmgbonus}[BON] + @{weapon_magicbonus}[MAG] + ?{Damage Modifier?|0}[MOD] ]]}} {{damage1vsL=[[@{weapon_damagelarge} + @{weapon_attackdmgbonus}[BON] + @{weapon_magicbonus}[MAG] + ?{Damage Modifier?|0}[MOD] ]]}} {{WeaponNotes=@{weapon_notes}}} @{weapon_whisper_to_hit}';
      _.each(idArray, (id) => {
        const macrotext = v[section_attribute('weapon', id, 'weapon_macro_text')] || macrodefault;
        output[section_attribute('weapon', id, 'weapon_macro_text')] = macrotext.replace(/} @{weapon_whisper_to_hit}/g, '}');
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
      fields.push(section_attribute('weapon', id, 'weapon_macro_text'));
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
        if (v[section_attribute('weapon', id, 'weapon_macro_text')] === replacements.weapon_old_v6) {
          output[section_attribute('weapon', id, 'weapon_macro_text')] = v[section_attribute('weapon', id, 'weapon_macro_text')].replace(
            replacements.weapon_old_v6,
            replacements.weapon_current,
          );
        } else if (v[section_attribute('weapon', id, 'weapon_macro_text')] === replacements.weapon_old_v5) {
          output[section_attribute('weapon', id, 'weapon_macro_text')] = v[section_attribute('weapon', id, 'weapon_macro_text')].replace(
            replacements.weapon_old_v5,
            replacements.weapon_current,
          );
        } else if (v[section_attribute('weapon', id, 'weapon_macro_text')] === replacements.weapon_old_v4) {
          output[section_attribute('weapon', id, 'weapon_macro_text')] = v[section_attribute('weapon', id, 'weapon_macro_text')].replace(
            replacements.weapon_old_v4,
            replacements.weapon_current,
          );
        } else if (v[section_attribute('weapon', id, 'weapon_macro_text')] === replacements.weapon_old_v3) {
          output[section_attribute('weapon', id, 'weapon_macro_text')] = v[section_attribute('weapon', id, 'weapon_macro_text')].replace(
            replacements.weapon_old_v3,
            replacements.weapon_current,
          );
        } else if (v[section_attribute('weapon', id, 'weapon_macro_text')] === replacements.weapon_old_v2) {
          output[section_attribute('weapon', id, 'weapon_macro_text')] = v[section_attribute('weapon', id, 'weapon_macro_text')].replace(
            replacements.weapon_old_v2,
            replacements.weapon_current,
          );
        } else if (v[section_attribute('weapon', id, 'weapon_macro_text')] === replacements.weapon_old) {
          output[section_attribute('weapon', id, 'weapon_macro_text')] = v[section_attribute('weapon', id, 'weapon_macro_text')].replace(
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
      fields.push(section_attribute('ability', id, 'ability_macro_text'));
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
        if (v[section_attribute('ability', id, 'ability_macro_text')] === replacements.ability_old_v5) {
          output[section_attribute('ability', id, 'ability_macro_text')] = v[section_attribute('ability', id, 'ability_macro_text')].replace(
            replacements.ability_old_v5,
            replacements.ability_current,
          );
        }
        if (v[section_attribute('ability', id, 'ability_macro_text')] === replacements.ability_old_v4) {
          output[section_attribute('ability', id, 'ability_macro_text')] = v[section_attribute('ability', id, 'ability_macro_text')].replace(
            replacements.ability_old_v4,
            replacements.ability_current,
          );
        }
        if (v[section_attribute('ability', id, 'ability_macro_text')] === replacements.ability_old_v3) {
          output[section_attribute('ability', id, 'ability_macro_text')] = v[section_attribute('ability', id, 'ability_macro_text')].replace(
            replacements.ability_old_v3,
            replacements.ability_current,
          );
        }
        if (v[section_attribute('ability', id, 'ability_macro_text')] === replacements.ability_old_v2) {
          output[section_attribute('ability', id, 'ability_macro_text')] = v[section_attribute('ability', id, 'ability_macro_text')].replace(
            replacements.ability_old_v2,
            replacements.ability_current,
          );
        }
        if (v[section_attribute('ability', id, 'ability_macro_text')] === replacements.ability_old) {
          output[section_attribute('ability', id, 'ability_macro_text')] = v[section_attribute('ability', id, 'ability_macro_text')].replace(
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
      fields.push(section_attribute('nonweaponproficiencies', id, 'nwp_macro_text'));
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
        if (v[section_attribute('nonweaponproficiencies', id, 'nwp_macro_text')] === replacements.nwp_old_2) {
          output[section_attribute('nonweaponproficiencies', id, 'nwp_macro_text')] = v[section_attribute('nonweaponproficiencies', id, 'nwp_macro_text')].replace(
            replacements.nwp_old_2,
            replacements.nwp_current,
          );
        }
        if (v[section_attribute('nonweaponproficiencies', id, 'nwp_macro_text')] === replacements.nwp_old) {
          output[section_attribute('nonweaponproficiencies', id, 'nwp_macro_text')] = v[section_attribute('nonweaponproficiencies', id, 'nwp_macro_text')].replace(
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
      fields.push(section_attribute('spells', id, 'spell_macro_text'));
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
          '@{whisper_pc} &{template:general} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=Casts: @{spell_name}}} {{school=@{spell_school}}} {{spell_level=@{spell_level}}} {{spell_class=@{spell_caster_class_name}}} {{spell_class_level=@{spell_caster_class_level}}} {{range=@{spell_range}}} {{duration=@{spell_duration}}} {{area_of_effect=@{spell_aoe}}} {{components=@{spell_components}}} {{casting_time=@{spell_ct}}} {{saving_throw=@{spell_save}}} {{save_type=@{spell_save_type}}} {{link=@{spell_link}}} {{freetext=@{spell_description}}}',
      };
      _.each(idArray, (id) => {
        if (v[section_attribute('spells', id, 'spell_macro_text')] === replacements.spell_old_v3) {
          output[section_attribute('spells', id, 'spell_macro_text')] = v[section_attribute('spells', id, 'spell_macro_text')].replace(
            replacements.spell_old_v3,
            replacements.spell_current,
          );
        }
        if (v[section_attribute('spells', id, 'spell_macro_text')] === replacements.spell_old_v2) {
          output[section_attribute('spells', id, 'spell_macro_text')] = v[section_attribute('spells', id, 'spell_macro_text')].replace(
            replacements.spell_old_v2,
            replacements.spell_current,
          );
        }
        if (v[section_attribute('spells', id, 'spell_macro_text')] === replacements.spell_old) {
          output[section_attribute('spells', id, 'spell_macro_text')] = v[section_attribute('spells', id, 'spell_macro_text')].replace(
            replacements.spell_old,
            replacements.spell_current,
          );
        }
      });
      output.sheet_version = current_version;
      clog(`VERSION UPDATE: spellsMacroUpdate completed`);
      setAttrs(output, {silent: true}, () => {
        versionator(current_version, final_version);
      });
    });
  });
};

// update Equipment macro-text ONLY IF they haven't been edited. Tests against v1.641 macro-text
const equipmentMacroUpdate = (current_version, final_version) => {
  getSectionIDs('repeating_equipment', (idArray) => {
    const fields = [];
    _.each(idArray, (id) => {
      fields.push(section_attribute('equipment', id, 'equipment_macro_text'));
    });
    getAttrs([...fields], (v) => {
      const output = {};
      const replacements = {
        equipment_old:
          '@{whisper_pc} &{template:general} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=Item/Equipment: @{equipment_item}}} {{freetext=@{equipment_description}}} {{quantity= @{equipment_quantity}}} {{quantity_max=@{equipment_quantity|max}}} {{uses=@{equipment_current}}} {{uses_max=[[ @{equipment_current|max} ]]}}',
        equipment_current:
          '@{whisper_pc} &{template:general} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=Item/Equipment: @{equipment_item}}} {{link=@{equipment_link}}} {{freetext=@{equipment_description}}} {{quantity=@{equipment_quantity}}} {{quantity_max=@{equipment_quantity|max}}} {{uses=@{equipment_current}}} {{uses_max=[[ @{equipment_current|max} ]]}}',
      };
      _.each(idArray, (id) => {
        if (v[section_attribute('equipment', id, 'equipment_macro_text')] === replacements.equipment_old) {
          output[section_attribute('equipment', id, 'equipment_macro_text')] = v[section_attribute('equipment', id, 'equipment_macro_text')].replace(
            replacements.equipment_old,
            replacements.equipment_current,
          );
        }
      });
      output.sheet_version = current_version;
      clog(`VERSION UPDATE: equipmentMacroUpdate completed`);
      setAttrs(output, {silent: true}, () => {
        versionator(current_version, final_version);
      });
    });
  });
};

// One-time update: formats and sets range fields
const updateRange = (current_version, final_version) => {
  getSectionIDs('repeating_weapon', (idArray) => {
    const output = {};
    const fields = [];
    _.each(idArray, (id) => {
      fields.push(section_attribute('weapon', id, 'weapon_range'));
      fields.push(section_attribute('weapon', id, 'weapon_range_short'));
      fields.push(section_attribute('weapon', id, 'weapon_range_medium'));
      fields.push(section_attribute('weapon', id, 'weapon_range_long'));
      fields.push(section_attribute('weapon', id, 'weapon_attack_type'));
      fields.push(section_attribute('weapon', id, 'weapon_range_error'));
    });
    getAttrs(fields, (v) => {
      _.each(idArray, (id) => {
        // attack types selector: melee=0, ranged=1, touch=2, ranged_touch=3
        const thisType = +v[section_attribute('weapon', id, 'weapon_attack_type')];
        if (thisType === 0 || thisType === 2) return;
        let thisRange = v[section_attribute('weapon', id, 'weapon_range')];
        // remove quotes to prevent NaN (ie distance indicators)
        thisRange = thisRange.replace(/'/g, '');
        thisRange = thisRange.replace(/"/g, '');
        // parse ranges
        const thisRangeArray = thisRange.split('/').join(',').split(' ').join(',').split('-').join(',').split(',');
        // clog(`thisRangeArray: ${thisRangeArray}`);
        const thisRangeShort = Number(thisRangeArray[0]);
        let thisRangeMedium = Number(thisRangeArray[1]);
        let thisRangeLong = Number(thisRangeArray[2]);

        // clog(`Attack is Ranged. repeating_weapon_weapon_attack_type = ${thisType}`);

        // if only a single number is entered, make it Long ie Manticore spikes
        if (thisRangeArray.length === 1 && thisRangeShort >= 0 && !thisRangeMedium && !thisRangeLong) {
          thisRangeMedium = thisRangeShort;
          thisRangeLong = thisRangeShort;
        }
        // clog(`thisRangeShort: ${thisRangeShort} |thisRangeMedium: ${thisRangeMedium} |thisRangeLong: ${thisRangeLong}`);

        // check to see if range is in the proper format.
        if (Number.isNaN(thisRangeShort)) {
          output[section_attribute('weapon', id, 'weapon_range_short')] = 0;
          output[section_attribute('weapon', id, 'weapon_range_error')] = thisRange === '' ? 1 : 0;
          // clog(`WARNING: Field is not in the proper format.`);
        } else {
          output[section_attribute('weapon', id, 'weapon_range_short')] = thisRangeShort;
        }
        if (Number.isNaN(thisRangeMedium)) {
          output[section_attribute('weapon', id, 'weapon_range_medium')] = 0;
          output[section_attribute('weapon', id, 'weapon_range_error')] = thisRange === '' ? 1 : 0;
          // clog(`WARNING: Field is not in the proper format.`);
        } else {
          output[section_attribute('weapon', id, 'weapon_range_medium')] = thisRangeMedium;
        }
        if (Number.isNaN(thisRangeLong)) {
          output[section_attribute('weapon', id, 'weapon_range_long')] = 0;
          output[section_attribute('weapon', id, 'weapon_range_error')] = thisRange === '' ? 1 : 0;
          // clog(`WARNING: Field is not in the proper format.`);
        } else {
          output[section_attribute('weapon', id, 'weapon_range_long')] = thisRangeLong;
        }
        if (!Number.isNaN(thisRangeShort) && !Number.isNaN(thisRangeMedium) && !Number.isNaN(thisRangeLong)) {
          output[section_attribute('weapon', id, 'weapon_range_error')] = 1;
        } else {
          // clog(`Value did not parse.`);
        }
      });
      output.sheet_version = current_version;
      clog(`VERSION UPDATE: updateRange completed`);
      setAttrs(output, {silent: true}, () => {
        versionator(current_version, final_version);
      });
    });
  });
};

// One-time update: replace @{weapon_attack_type_pen} with @{weapon_dual_pen} in attack macro-text
const updateAttackTypeMacro = (current_version, final_version) => {
  getSectionIDs('repeating_weapon', (idArray) => {
    const fields = [];
    _.each(idArray, (id) => {
      fields.push(section_attribute('weapon', id, 'weapon_macro_text'));
    });
    getAttrs([...fields], (v) => {
      const output = {};
      const macrodefault =
        '&{template:attacks} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=@{weapon_name}}} {{dual=@{weapon_dual}}} {{attack1=[[ 1d20 + @{weapon_backstab_bonus}[BACKSTAB] + @{weapon_tohitbonus}[HIT_BON] + @{weapon_prof_pen}[PROF_PEN] + @{weapon_dual_pen}[DUAL_PEN]+ @{weapon_magicbonus}[MAG_BON] + ?{To Hit Modifier?|0}[MISC_MOD] ]]}} {{damagevsSMchatmenu=@{weapon_damagesmallmedium_chat_menu}}} {{damagevsLchatmenu=@{weapon_damagelarge_chat_menu}}} {{WeaponNotes=@{weapon_notes}}} {{backstab=[[ @{weapon_backstab_mult} ]]}} {{damagetype=@{weapon_attackdmgtype}}} {{rate=@{weapon_rateoffire}}} {{range=@{weapon_range}}} {{length=@{weapon_length}}} {{space=@{weapon_space}}} {{speed=@{weapon_speed}}} @{weapon_tohitacadj}';
      _.each(idArray, (id) => {
        const macrotext = v[section_attribute('weapon', id, 'weapon_macro_text')] || macrodefault;
        output[section_attribute('weapon', id, 'weapon_macro_text')] = macrotext.replace(/@{weapon_attack_type_pen}/g, '@{weapon_dual_pen}');
        output[section_attribute('weapon', id, 'weapon_macro_text')] = macrotext.replace(/{{attacktype=@{weapon_attack_type}}} /g, '');
      });
      output.sheet_version = current_version;
      clog(`VERSION UPDATE: updateAttackTypeMacro completed`);
      setAttrs(output, {silent: true}, () => {
        versionator(current_version, final_version);
      });
    });
  });
};

// One-time update: set MonsterHD from hitdice
const monsterHD = (current_version, final_version) => {
  getAttrs(['hitdice', 'monsterHD'], (v) => {
    const output = {};
    const monsterHD_value = v.monsterHD;
    const hitDice_value = v.hitdice;
    if (monsterHD_value === '') {
      output.monsterHD = hitDice_value;
    }
    output.monsterHD = monsterHD_value;
    output.sheet_version = current_version;
    clog(`VERSION UPDATE: monsterHD completed`);
    setAttrs(output, {silent: true}, () => {
      versionator(current_version, final_version);
    });
  });
};

// One-time update: clear old armor details fields that have been removed
const clearArmorOther = (current_version, final_version) => {
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
  setAttrs(output, {silent: true}, () => {
    versionator(current_version, final_version);
  });
};

// combines all Armor Details attrs and their row id's
const armorIDsAndAttrs = armorAttrs.concat(armorRowIDs);
// sync armor changes between Armor Details and repeating_equipment
function syncArmorToEquipment(id, attr, row_removed, migrate) {
  getAttrs(armorIDsAndAttrs, (v) => {
    const output = {};
    let newID = '';
    let id_low = id;
    id_low = id_low !== null ? id.toLowerCase() : id_low;
    clog(
      `syncArmorToEquipment - id_low:${id_low} ${id_low === null ? `Sync '${attr}' from Armor Details` : 'Sync from repeating_equipment'}\n null means Δ came from Armor Details`,
    );
    clog(`syncArmorToEquipment - row_removed?:${row_removed} = ${row_removed ? 'Row removed' : 'Row not removed'}`);
    const unarmored0_ID = v.unarmored_row_id.toString();
    const armortype1_ID = v.armortype1_row_id.toString();
    const armortype2_ID = v.armortype2_row_id.toString();
    const armorshield_ID = v.armorshield_row_id.toString();
    const armorhelmet_ID = v.armorhelmet_row_id.toString();
    const armorother1_ID = v.armorother1_row_id.toString();
    const armorother2_ID = v.armorother2_row_id.toString();
    const armorother3_ID = v.armorother3_row_id.toString();
    const armorother4_ID = v.armorother4_row_id.toString();
    const armorother5_ID = v.armorother5_row_id.toString();
    const armorother6_ID = v.armorother6_row_id.toString();
    const idArray = [
      unarmored0_ID,
      armortype1_ID,
      armortype2_ID,
      armorshield_ID,
      armorhelmet_ID,
      armorother1_ID,
      armorother2_ID,
      armorother3_ID,
      armorother4_ID,
      armorother5_ID,
      armorother6_ID,
    ].map((str) => (str ? str.toString().toLowerCase() : '0'));

    function matchAttr(attrToCheck) {
      const arrays = {unarmoredAttrs, armor1Attrs, armor2Attrs, shieldAttrs, helmetAttrs, other1Attrs, other2Attrs, other3Attrs, other4Attrs, other5Attrs, other6Attrs};
      const matchingArray = Object.entries(arrays).find(([arrayName, array]) => array.includes(attrToCheck));
      return matchingArray ? matchingArray[0] : null; // Return array's name (ie Armor Details row) or null if no match is found
    }
    const attrToCheck = attr;
    const matchingArray = matchAttr(attrToCheck);
    if (matchingArray) {
      clog(`syncArmorToEquipment - Match found for '${attrToCheck}' in:${matchingArray}`);
    } else {
      clog(`syncArmorToEquipment - No match found for attribute:${attrToCheck} (null = repeating_equipment removed)`);
    }
    const armor0 = v.unarmored.trim();
    const armor1 = v.armortype.trim();
    const armor2 = v.armortype2.trim();
    const shield = v.armorshield.trim();
    const helmet = v.armorhelmet.trim();
    const other1 = v.armorother.trim();
    const other2 = v.armorother2.trim();
    const other3 = v.armorother3.trim();
    const other4 = v.armorother4.trim();
    const other5 = v.armorother5.trim();
    const other6 = v.armorother6.trim();
    // if syncArmorToEquipment is triggered from Armor Details, ie (id === null)
    // assign the appropriate id according to it's Armor Details row
    const indexMap = {
      unarmoredAttrs: 0,
      armor1Attrs: 1,
      armor2Attrs: 2,
      shieldAttrs: 3,
      helmetAttrs: 4,
      other1Attrs: 5,
      other2Attrs: 6,
      other3Attrs: 7,
      other4Attrs: 8,
      other5Attrs: 9,
      other6Attrs: 10,
    };

    if (id_low === null) {
      const index = indexMap[matchingArray];
      if (index !== undefined) {
        id_low = idArray[index];
      }
    }
    clog(`syncArmorToEquipment - id:${id_low} matchingArray:${matchingArray}`);
    // match the row
    if (matchingArray === 'unarmoredAttrs' || id_low === idArray[0] || migrate) {
      if (matchingArray === 'unarmoredAttrs' || migrate) {
        if (armor0) {
          if (unarmored0_ID.length === 20) {
            // has name && has id = UPDATE ROW
            newID = unarmored0_ID.toLowerCase();
            output.unarmored_row_id = newID;
            output[`repeating_equipment_${newID}_equipment_type`] = 2;
            output[`repeating_equipment_${newID}_equipment_armor_type`] = 0;
            output[`repeating_equipment_${newID}_equipment_armor_worn`] = +v.unarmored_worn;
            output[`repeating_equipment_${newID}_equipment_item`] = v.unarmored.trim();
            output[`repeating_equipment_${newID}_equipment_armor_ac`] = +v.unarmored_ac;
            output[`repeating_equipment_${newID}_equipment_armor_base`] = +v.unarmored_base;
            output[`repeating_equipment_${newID}_equipment_armor_bulk`] = +v.unarmored_bulk;
            // armor in use ie 'worn', should always be considered as carried
            if (+v.unarmored_worn === 1 && +v.unarmored_carried === 0) {
              output[`repeating_equipment_${newID}_equipment_carried_select`] = 1;
              output.unarmored_carried = 1;
            } else {
              output[`repeating_equipment_${newID}_equipment_carried_select`] = +v.unarmored_carried;
            }
            output[`repeating_equipment_${newID}_equipment_weight`] = +v.unarmored_weight || 0;
            output[`repeating_equipment_${newID}_equipment_cost`] = +v.unarmored_cost || 0;
            clog(`syncArmorToEquipment - repeating Armor exists for 'armor1':${newID}`);
          } else {
            // has name but NO id = CREATE NEW ROW
            newID = generateUniqueRowID();
            output.unarmored_row_id = newID.toLowerCase();
            output[`repeating_equipment_${newID}_equipment_type`] = 2;
            output[`repeating_equipment_${newID}_equipment_armor_type`] = 0;
            output[`repeating_equipment_${newID}_equipment_armor_worn`] = +v.unarmored_worn;
            output[`repeating_equipment_${newID}_equipment_item`] = v.unarmored.trim();
            output[`repeating_equipment_${newID}_equipment_armor_ac`] = +v.unarmored_ac;
            output[`repeating_equipment_${newID}_equipment_armor_base`] = +v.unarmored_base;
            output[`repeating_equipment_${newID}_equipment_armor_bulk`] = +v.unarmored_bulk;
            // armor in use ie 'worn', should always be considered as carried
            if (+v.unarmored_worn === 1 && +v.unarmored_carried === 0) {
              output[`repeating_equipment_${newID}_equipment_carried_select`] = 1;
              output.unarmored_carried = 1;
            } else {
              output[`repeating_equipment_${newID}_equipment_carried_select`] = +v.unarmored_carried;
            }
            output[`repeating_equipment_${newID}_equipment_weight`] = +v.unarmored_weight || 0;
            output[`repeating_equipment_${newID}_equipment_cost`] = +v.unarmored_cost || 0;
            output[`repeating_equipment_${newID}_equipment_sync_armor_flag`] = 1;
            clog(`syncArmorToEquipment - repeating Armor does not exist. Creating armor1: ${newID}`);
          }
        } else if (unarmored0_ID === idArray[0]) {
          // id exists but no name: Armor Detail row has been REMOVED - RESETING ROW
          output.unarmored_row_id = 0;
          output.unarmored_worn = +v.unarmored_worn;
          output.unarmored = '';
          output.unarmored_ac = +v.unarmored_ac;
          output.unarmored_base = +v.unarmored_base;
          output.unarmored_bulk = +v.unarmored_bulk;
          output.unarmored_weight = +v.unarmored_weight || 0;
          output.unarmored_cost = +v.unarmored_cost || 0;
          // armor in use ie 'worn', should always be considered as carried
          if (+v.unarmored_worn === 1 && +v.unarmored_carried === 0) {
            output.unarmored_carried = 1;
          } else {
            output.unarmored_carried = +v.unarmored_carried;
          }
          clog(`syncArmorToEquipment - Armor Details removed - ID Exists. Deleted from Armor Detail unarmored:${newID}`);
        }
      } else if (matchingArray === null && row_removed) {
        // matchingArray === null means repeating_row removed: NO Name and/or id REMOVED - RESETING ROW
        output.unarmored_row_id = 0;
        output.unarmored_worn = 1;
        output.unarmored = '';
        output.unarmored_ac = 10;
        output.unarmored_base = 10;
        output.unarmored_bulk = 0;
        output.unarmored_weight = 0;
        output.unarmored_cost = 0;
        output.unarmored_carried = 1;
        clog(`syncArmorToEquipment - Armor Details removed - NO name and/or NO ID. Deleted from Equipment unarmored:${newID}`);
      }
    }
    if (matchingArray === 'armor1Attrs' || id_low === idArray[1] || migrate) {
      if (matchingArray === 'armor1Attrs' || migrate) {
        if (armor1) {
          if (armortype1_ID.length === 20) {
            // has name && has id = UPDATE ROW
            newID = armortype1_ID.toLowerCase();
            output.armortype1_row_id = newID;
            output[`repeating_equipment_${newID}_equipment_type`] = 2;
            output[`repeating_equipment_${newID}_equipment_armor_type`] = 1;
            output[`repeating_equipment_${newID}_equipment_armor_worn`] = +v.armortype_worn;
            output[`repeating_equipment_${newID}_equipment_item`] = v.armortype.trim();
            output[`repeating_equipment_${newID}_equipment_armor_ac`] = +v.armortype_ac;
            output[`repeating_equipment_${newID}_equipment_armor_base`] = +v.armortype_base;
            output[`repeating_equipment_${newID}_equipment_armor_magic`] = +v.armortype_magic || 0;
            output[`repeating_equipment_${newID}_equipment_armor_bulk`] = +v.armortype_bulk;
            // armor in use ie 'worn', should always be considered as carried
            if (+v.armortype_worn === 1 && +v.armortype_carried === 0) {
              output[`repeating_equipment_${newID}_equipment_carried_select`] = 1;
              output.armortype_carried = 1;
            } else {
              output[`repeating_equipment_${newID}_equipment_carried_select`] = +v.armortype_carried;
            }
            output[`repeating_equipment_${newID}_equipment_weight`] = +v.armor_weight || 0;
            output[`repeating_equipment_${newID}_equipment_cost`] = +v.armor_cost || 0;
            clog(`syncArmorToEquipment - repeating Armor exists for 'armor1':${newID}`);
          } else {
            // has name but NO id = CREATE NEW ROW
            newID = generateUniqueRowID();
            output.armortype1_row_id = newID.toLowerCase();
            output[`repeating_equipment_${newID}_equipment_type`] = 2;
            output[`repeating_equipment_${newID}_equipment_armor_type`] = 1;
            output[`repeating_equipment_${newID}_equipment_armor_worn`] = +v.armortype_worn;
            output[`repeating_equipment_${newID}_equipment_item`] = v.armortype.trim();
            output[`repeating_equipment_${newID}_equipment_armor_ac`] = +v.armortype_ac;
            output[`repeating_equipment_${newID}_equipment_armor_base`] = +v.armortype_base;
            output[`repeating_equipment_${newID}_equipment_armor_magic`] = +v.armortype_magic || 0;
            output[`repeating_equipment_${newID}_equipment_armor_bulk`] = +v.armortype_bulk;
            output[`repeating_equipment_${newID}_equipment_carried_select`] = +v.armortype_carried;
            output[`repeating_equipment_${newID}_equipment_weight`] = +v.armor_weight || 0;
            output[`repeating_equipment_${newID}_equipment_cost`] = +v.armor_cost || 0;
            output[`repeating_equipment_${newID}_equipment_sync_armor_flag`] = 1;
            clog(`syncArmorToEquipment - repeating Armor does not exist. Creating armor1: ${newID}`);
          }
        } else if (armortype1_ID === idArray[1]) {
          // id exists but no name: Armor Detail row has been REMOVED - RESETING ROW
          output.armortype1_row_id = 0;
          output.armortype_worn = 0;
          output.armortype = '';
          output.armortype_ac = 10;
          output.armortype_base = 10;
          output.armortype_magic = 0;
          output.armortype_bulk = 0;
          output.armortype_weight = 0;
          output.armortype_cost = 0;
          output.armortype_carried = 1;
          clog(`syncArmorToEquipment - Armor Details row removed. Resetting armor1:${newID}`);
        }
      } else if (matchingArray === null && row_removed) {
        // matchingArray === null means repeating_row removed: NO Name and/or id REMOVED - RESETING ROW
        output.armortype1_row_id = 0;
        output.armortype_worn = 0;
        output.armortype = '';
        output.armortype_ac = 10;
        output.armortype_base = 10;
        output.armortype_magic = 0;
        output.armortype_bulk = 0;
        output.armortype_weight = 0;
        output.armortype_cost = 0;
        output.armortype_carried = 1;
        clog(`repeating row_removed:${row_removed} - Armor Details row has been reset for armor1`);
      }
    }
    if (matchingArray === 'armor2Attrs' || id_low === idArray[2] || migrate) {
      if (matchingArray === 'armor2Attrs' || migrate) {
        if (armor2) {
          if (armortype2_ID.length === 20) {
            // has name && has id = UPDATE ROW
            newID = armortype2_ID.toLowerCase();
            output.armortype2_row_id = newID;
            output[`repeating_equipment_${newID}_equipment_type`] = 2;
            output[`repeating_equipment_${newID}_equipment_armor_type`] = 2;
            output[`repeating_equipment_${newID}_equipment_armor_worn`] = +v.armortype2_worn;
            output[`repeating_equipment_${newID}_equipment_item`] = v.armortype2.trim();
            output[`repeating_equipment_${newID}_equipment_armor_ac`] = +v.armortype2_ac;
            output[`repeating_equipment_${newID}_equipment_armor_base`] = +v.armortype2_base;
            output[`repeating_equipment_${newID}_equipment_armor_magic`] = +v.armortype2_magic || 0;
            output[`repeating_equipment_${newID}_equipment_armor_bulk`] = +v.armortype2_bulk;
            // armor in use ie 'worn', should always be considered as carried
            if (+v.armortype2_worn === 1 && +v.armortype2_carried === 0) {
              output[`repeating_equipment_${newID}_equipment_carried_select`] = 1;
              output.armortype2_carried = 1;
            } else {
              output[`repeating_equipment_${newID}_equipment_carried_select`] = +v.armortype2_carried;
            }
            output[`repeating_equipment_${newID}_equipment_weight`] = +v.armortype2_weight || 0;
            output[`repeating_equipment_${newID}_equipment_cost`] = +v.armortype2_cost || 0;
            clog(`syncArmorToEquipment - repeating Armor exists for 'armor2':${newID}`);
          } else {
            // has name but NO id = CREATE NEW ROW
            newID = generateUniqueRowID();
            output.armortype2_row_id = newID.toLowerCase();
            output[`repeating_equipment_${newID}_equipment_type`] = 2;
            output[`repeating_equipment_${newID}_equipment_armor_type`] = 2;
            output[`repeating_equipment_${newID}_equipment_armor_worn`] = +v.armortype2_worn;
            output[`repeating_equipment_${newID}_equipment_item`] = v.armortype2.trim();
            output[`repeating_equipment_${newID}_equipment_armor_ac`] = +v.armortype2_ac;
            output[`repeating_equipment_${newID}_equipment_armor_base`] = +v.armortype2_base;
            output[`repeating_equipment_${newID}_equipment_armor_magic`] = +v.armortype2_magic || 0;
            output[`repeating_equipment_${newID}_equipment_armor_bulk`] = +v.armortype2_bulk;
            output[`repeating_equipment_${newID}_equipment_carried_select`] = +v.armortype2_carried;
            output[`repeating_equipment_${newID}_equipment_weight`] = +v.armortype2_weight || 0;
            output[`repeating_equipment_${newID}_equipment_cost`] = +v.armortype2_cost || 0;
            output[`repeating_equipment_${newID}_equipment_sync_armor_flag`] = 1;
            clog(`syncArmorToEquipment - repeating Armor does not exist. Creating armor2: ${newID}`);
          }
        } else if (armortype2_ID === idArray[2]) {
          // id exists but no name: Armor Detail row has been REMOVED - RESETING ROW
          output.armortype2_row_id = 0;
          output.armortype2_worn = 0;
          output.armortype2 = '';
          output.armortype2_ac = 10;
          output.armortype2_base = 10;
          output.armortype2_magic = 0;
          output.armortype2_bulk = 0;
          output.armortype2_weight = 0;
          output.armortype2_cost = 0;
          output.armortype2_carried = 1;
          clog(`syncArmorToEquipment - Armor Details row removed. Resetting armor2:${newID}`);
        }
      } else if (matchingArray === null && row_removed) {
        // matchingArray === null means repeating_row removed: NO Name and/or id REMOVED - RESETING ROW
        output.armortype2_row_id = 0;
        output.armortype2_worn = 0;
        output.armortype2 = '';
        output.armortype2_ac = 10;
        output.armortype2_base = 10;
        output.armortype2_magic = 0;
        output.armortype2_bulk = 0;
        output.armortype2_weight = 0;
        output.armortype2_cost = 0;
        output.armortype2_carried = 1;
        clog(`repeating row_removed:${row_removed} - Armor Details row has been reset for armor2`);
      }
    }
    if (matchingArray === 'shieldAttrs' || id_low === idArray[3] || migrate) {
      if (matchingArray === 'shieldAttrs' || migrate) {
        if (shield) {
          if (armorshield_ID.length === 20) {
            // has name && has id = UPDATE ROW
            newID = armorshield_ID.toLowerCase();
            output.armorshield_row_id = newID;
            output[`repeating_equipment_${newID}_equipment_type`] = 2;
            output[`repeating_equipment_${newID}_equipment_armor_type`] = 3;
            output[`repeating_equipment_${newID}_equipment_armor_worn`] = +v.armorshield_worn;
            output[`repeating_equipment_${newID}_equipment_item`] = v.armorshield.trim();
            output[`repeating_equipment_${newID}_equipment_armor_ac`] = +v.armorshield_ac;
            output[`repeating_equipment_${newID}_equipment_armor_base`] = +v.armorshield_base;
            output[`repeating_equipment_${newID}_equipment_armor_magic`] = v.armorshield_magic;
            output[`repeating_equipment_${newID}_equipment_armor_mod`] = v.armorshield_mod;
            output[`repeating_equipment_${newID}_equipment_armor_bulk`] = +v.armorshield_bulk;
            // armor in use ie 'worn', should always be considered as carried
            if (+v.armorshield_worn === 1 && +v.armorshield_carried === 0) {
              output[`repeating_equipment_${newID}_equipment_carried_select`] = 1;
              output.armorshield_carried = 1;
            } else {
              output[`repeating_equipment_${newID}_equipment_carried_select`] = +v.armorshield_carried;
            }
            output[`repeating_equipment_${newID}_equipment_weight`] = +v.armorshield_weight || 0;
            output[`repeating_equipment_${newID}_equipment_cost`] = +v.armorshield_cost || 0;
            clog(`syncArmorToEquipment - repeating Armor exists for 'shield':${newID}`);
          } else {
            // has name but NO id = CREATE NEW ROW
            newID = generateUniqueRowID();
            output.armorshield_row_id = newID.toLowerCase();
            output[`repeating_equipment_${newID}_equipment_type`] = 2;
            output[`repeating_equipment_${newID}_equipment_armor_type`] = 3;
            output[`repeating_equipment_${newID}_equipment_armor_worn`] = +v.armorshield_worn;
            output[`repeating_equipment_${newID}_equipment_item`] = v.armorshield.trim();
            output[`repeating_equipment_${newID}_equipment_armor_ac`] = +v.armorshield_ac;
            output[`repeating_equipment_${newID}_equipment_armor_base`] = +v.armorshield_base;
            output[`repeating_equipment_${newID}_equipment_armor_magic`] = v.armorshield_magic;
            output[`repeating_equipment_${newID}_equipment_armor_mod`] = v.armorshield_mod;
            output[`repeating_equipment_${newID}_equipment_armor_bulk`] = +v.armorshield_bulk;
            output[`repeating_equipment_${newID}_equipment_carried_select`] = +v.armorshield_carried;
            output[`repeating_equipment_${newID}_equipment_weight`] = +v.armorshield_weight || 0;
            output[`repeating_equipment_${newID}_equipment_cost`] = +v.armorshield_cost || 0;
            output[`repeating_equipment_${newID}_equipment_sync_armor_flag`] = 1;
            clog(`syncArmorToEquipment - repeating Armor does not exist. Creating shield: ${newID}`);
          }
        } else if (armorshield_ID === idArray[3]) {
          // id exists but no name: Armor Detail row has been REMOVED - RESETING ROW
          output.armorshield_row_id = 0;
          output.armorshield_worn = 0;
          output.armorshield = '';
          output.armorshield_ac = 0;
          output.armorshield_base = 0;
          output.armorshield_magic = 0;
          output.armorshield_mod = 0;
          output.armorshield_bulk = 0;
          output.armorshield_weight = 0;
          output.armorshield_cost = 0;
          output.armorshield_carried = 1;
          clog(`syncArmorToEquipment - Armor Details row removed. Resetting shield:${newID}`);
        }
      } else if (matchingArray === null && row_removed) {
        // matchingArray === null means repeating_row removed: NO Name and/or id REMOVED - RESETING ROW
        output.armorshield_row_id = 0;
        output.armorshield_worn = 0;
        output.armorshield = '';
        output.armorshield_ac = 0;
        output.armorshield_base = 0;
        output.armorshield_magic = 0;
        output.armorshield_mod = 0;
        output.armorshield_bulk = 0;
        output.armorshield_weight = 0;
        output.armorshield_cost = 0;
        output.armorshield_carried = 1;
        clog(`repeating row_removed:${row_removed} - Armor Details row has been reset for shield`);
      }
    }
    if (matchingArray === 'helmetAttrs' || id_low === idArray[4] || migrate) {
      if (matchingArray === 'helmetAttrs' || migrate) {
        if (helmet) {
          if (armorhelmet_ID.length === 20) {
            // has name && has id = UPDATE ROW
            newID = armorhelmet_ID.toLowerCase();
            output.armorhelmet_row_id = newID;
            output[`repeating_equipment_${newID}_equipment_type`] = 2;
            output[`repeating_equipment_${newID}_equipment_armor_type`] = 4;
            output[`repeating_equipment_${newID}_equipment_armor_worn`] = +v.armorhelmet_worn;
            output[`repeating_equipment_${newID}_equipment_item`] = v.armorhelmet.trim();
            output[`repeating_equipment_${newID}_equipment_armor_ac`] = +v.armorhelmet_ac;
            output[`repeating_equipment_${newID}_equipment_armor_magic`] = v.armorhelmet_magic;
            // armor in use ie 'worn', should always be considered as carried
            if (+v.armorhelmet_worn === 1 && +v.armorhelmet_carried === 0) {
              output[`repeating_equipment_${newID}_equipment_carried_select`] = 1;
              output.armorhelmet_carried = 1;
            } else {
              output[`repeating_equipment_${newID}_equipment_carried_select`] = +v.armorhelmet_carried;
            }
            output[`repeating_equipment_${newID}_equipment_weight`] = +v.armorhelmet_weight || 0;
            output[`repeating_equipment_${newID}_equipment_cost`] = +v.armorhelmet_cost || 0;
            clog(`syncArmorToEquipment - repeating Armor exists for 'helmet':${newID}`);
          } else {
            // has name but NO id = CREATE NEW ROW
            newID = generateUniqueRowID();
            output.armorhelmet_row_id = newID.toLowerCase();
            output[`repeating_equipment_${newID}_equipment_type`] = 2;
            output[`repeating_equipment_${newID}_equipment_armor_type`] = 4;
            output[`repeating_equipment_${newID}_equipment_armor_worn`] = +v.armorhelmet_worn;
            output[`repeating_equipment_${newID}_equipment_item`] = v.armorhelmet.trim();
            output[`repeating_equipment_${newID}_equipment_armor_ac`] = +v.armorhelmet_ac;
            output[`repeating_equipment_${newID}_equipment_armor_magic`] = v.armorhelmet_magic;
            output[`repeating_equipment_${newID}_equipment_carried_select`] = +v.armorhelmet_carried;
            output[`repeating_equipment_${newID}_equipment_weight`] = +v.armorhelmet_weight || 0;
            output[`repeating_equipment_${newID}_equipment_cost`] = +v.armorhelmet_cost || 0;
            output[`repeating_equipment_${newID}_equipment_sync_armor_flag`] = 1;
            clog(`syncArmorToEquipment - repeating Armor does not exist. Creating helmet: ${newID}`);
          }
        } else if (armorhelmet_ID === idArray[4]) {
          // id exists but no name: Armor Detail row has been REMOVED - RESETING ROW
          output.armorhelmet_row_id = 0;
          output.armorhelmet_worn = 0;
          output.armorhelmet = '';
          output.armorhelmet_ac = 10;
          output.armorhelmet_base = 10;
          output.armorhelmet_magic = 0;
          output.armorhelmet_bulk = 0;
          output.armorhelmet_weight = 0;
          output.armorhelmet_cost = 0;
          output.armorhelmet_carried = 1;
          clog(`syncArmorToEquipment - Armor Details row removed. Resetting helmet:${newID}`);
        }
      } else if (matchingArray === null && row_removed) {
        // matchingArray === null means repeating_row removed: NO Name and/or id REMOVED - RESETING ROW
        output.armorhelmet_row_id = 0;
        output.armorhelmet_worn = 0;
        output.armorhelmet = '';
        output.armorhelmet_ac = 10;
        output.armorhelmet_base = 10;
        output.armorhelmet_magic = 0;
        output.armorhelmet_bulk = 0;
        output.armorhelmet_weight = 0;
        output.armorhelmet_cost = 0;
        output.armorhelmet_carried = 1;
        clog(`repeating row_removed:${row_removed} - Armor Details row has been reset for helmet`);
      }
    }
    if (matchingArray === 'other1Attrs' || id_low === idArray[5] || migrate) {
      if (matchingArray === 'other1Attrs' || migrate) {
        if (other1) {
          if (armorother1_ID.length === 20) {
            // has name && has id = UPDATE ROW
            newID = armorother1_ID.toLowerCase();
            output.armorother1_row_id = newID;
            output[`repeating_equipment_${newID}_equipment_type`] = 2;
            output[`repeating_equipment_${newID}_equipment_armor_type`] = 5;
            output[`repeating_equipment_${newID}_equipment_armor_worn`] = +v.armorother_worn;
            output[`repeating_equipment_${newID}_equipment_item`] = v.armorother.trim();
            output[`repeating_equipment_${newID}_equipment_armor_ac`] = +v.armorother_ac;
            output[`repeating_equipment_${newID}_equipment_armor_base`] = +v.armorother_base;
            output[`repeating_equipment_${newID}_equipment_armor_magic`] = +v.armorother_magic || 0;
            output[`repeating_equipment_${newID}_equipment_armor_mod`] = +v.armorother_mod || 0;
            // armor in use ie 'worn', should always be considered as carried
            output[`repeating_equipment_${newID}_equipment_carried_select`] = +v.armorother_worn === 1 ? 1 : 0;
            clog(`syncArmorToEquipment - repeating Armor exists for 'other1':${newID}`);
          } else {
            // has name but NO id = CREATE NEW ROW
            newID = generateUniqueRowID();
            output.armorother1_row_id = newID.toLowerCase();
            output[`repeating_equipment_${newID}_equipment_type`] = 2;
            output[`repeating_equipment_${newID}_equipment_armor_type`] = 5;
            output[`repeating_equipment_${newID}_equipment_armor_worn`] = +v.armorother_worn;
            output[`repeating_equipment_${newID}_equipment_item`] = v.armorother.trim();
            output[`repeating_equipment_${newID}_equipment_armor_ac`] = +v.armorother_ac;
            output[`repeating_equipment_${newID}_equipment_armor_base`] = +v.armorother_base;
            output[`repeating_equipment_${newID}_equipment_armor_magic`] = +v.armorother_magic || 0;
            output[`repeating_equipment_${newID}_equipment_armor_mod`] = +v.armorother_mod || 0;
            output[`repeating_equipment_${newID}_equipment_sync_armor_flag`] = 1;
            clog(`syncArmorToEquipment - repeating Armor does not exist. Creating other1: ${newID}`);
          }
        } else if (armorother1_ID === idArray[5]) {
          // id exists but no name: Armor Detail row has been REMOVED - RESETING ROW
          output.armorother1_row_id = 0;
          output.armorother_worn = 0;
          output.armorother = '';
          output.armorother_ac = 10;
          output.armorother_base = 10;
          output.armorother_magic = 0;
          output.armorother_mod = 0;
          output.armorother_bulk = 0;
          clog(`syncArmorToEquipment - Armor Details row removed. Resetting other1:${newID}`);
        }
      } else if (matchingArray === null && row_removed) {
        // matchingArray === null means repeating_row removed: NO Name and/or id REMOVED - RESETING ROW
        output.armorother1_row_id = 0;
        output.armorother_worn = 0;
        output.armorother = '';
        output.armorother_ac = 10;
        output.armorother_base = 10;
        output.armorother_magic = 0;
        output.armorother_mod = 0;
        output.armorother_bulk = 0;
        clog(`repeating row_removed:${row_removed} - Armor Details row has been reset for other1`);
      }
    }
    if (matchingArray === 'other2Attrs' || id_low === idArray[6] || migrate) {
      if (matchingArray === 'other2Attrs' || migrate) {
        if (other2) {
          if (armorother2_ID.length === 20) {
            // has name && has id = UPDATE ROW
            newID = armorother2_ID.toLowerCase();
            output.armorother2_row_id = newID;
            output[`repeating_equipment_${newID}_equipment_type`] = 2;
            output[`repeating_equipment_${newID}_equipment_armor_type`] = 6;
            output[`repeating_equipment_${newID}_equipment_armor_worn`] = +v.armorother2_worn;
            output[`repeating_equipment_${newID}_equipment_item`] = v.armorother2.trim();
            output[`repeating_equipment_${newID}_equipment_armor_ac`] = +v.armorother2_ac;
            output[`repeating_equipment_${newID}_equipment_armor_base`] = +v.armorother2_base;
            output[`repeating_equipment_${newID}_equipment_armor_magic`] = +v.armorother2_magic || 0;
            output[`repeating_equipment_${newID}_equipment_armor_mod`] = +v.armorother2_mod || 0;
            // armor in use ie 'worn', should always be considered as carried
            output[`repeating_equipment_${newID}_equipment_carried_select`] = +v.armorother2_worn === 1 ? 1 : 0;
          } else {
            // has name but NO id = CREATE NEW ROW
            newID = generateUniqueRowID();
            output.armorother2_row_id = newID.toLowerCase();
            output[`repeating_equipment_${newID}_equipment_type`] = 2;
            output[`repeating_equipment_${newID}_equipment_armor_type`] = 6;
            output[`repeating_equipment_${newID}_equipment_armor_worn`] = +v.armorother2_worn;
            output[`repeating_equipment_${newID}_equipment_item`] = v.armorother2.trim();
            output[`repeating_equipment_${newID}_equipment_armor_ac`] = +v.armorother2_ac;
            output[`repeating_equipment_${newID}_equipment_armor_base`] = +v.armorother2_base;
            output[`repeating_equipment_${newID}_equipment_armor_magic`] = +v.armorother2_magic || 0;
            output[`repeating_equipment_${newID}_equipment_armor_mod`] = +v.armorother2_mod || 0;
            output[`repeating_equipment_${newID}_equipment_sync_armor_flag`] = 1;
            clog(`syncArmorToEquipment - repeating Armor does not exist. Creating other2: ${newID}`);
          }
        } else if (armorother2_ID === idArray[6]) {
          // id exists but no name: Armor Detail row has been REMOVED - RESETING ROW
          output.armorother2_row_id = 0;
          output.armorother2_worn = 0;
          output.armorother2 = '';
          output.armorother2_ac = 0;
          output.armorother2_base = 0;
          output.armorother2_magic = 0;
          output.armorother2_mod = 0;
          output.armorother2_bulk = 0;
          clog(`syncArmorToEquipment - Armor Details row removed. Resetting other2:${newID}`);
        }
      } else if (matchingArray === null && row_removed) {
        // matchingArray === null means repeating_row removed: NO Name and/or id REMOVED - RESETING ROW
        output.armorother2_row_id = 0;
        output.armorother2_worn = 0;
        output.armorother2 = '';
        output.armorother2_ac = 0;
        output.armorother2_base = 0;
        output.armorother2_magic = 0;
        output.armorother2_mod = 0;
        output.armorother2_bulk = 0;
        clog(`repeating row_removed:${row_removed} - Armor Details row has been reset for other2`);
      }
    }
    if (matchingArray === 'other3Attrs' || id_low === idArray[7] || migrate) {
      if (matchingArray === 'other3Attrs' || migrate) {
        if (other3) {
          if (armorother3_ID.length === 20) {
            // has name && has id = UPDATE ROW
            newID = armorother3_ID.toLowerCase();
            output.armorother3_row_id = newID;
            output[`repeating_equipment_${newID}_equipment_type`] = 2;
            output[`repeating_equipment_${newID}_equipment_armor_type`] = 7;
            output[`repeating_equipment_${newID}_equipment_armor_worn`] = +v.armorother3_worn;
            output[`repeating_equipment_${newID}_equipment_item`] = v.armorother3.trim();
            output[`repeating_equipment_${newID}_equipment_armor_ac`] = +v.armorother3_ac;
            output[`repeating_equipment_${newID}_equipment_armor_base`] = +v.armorother3_base;
            output[`repeating_equipment_${newID}_equipment_armor_magic`] = +v.armorother3_magic || 0;
            output[`repeating_equipment_${newID}_equipment_armor_mod`] = +v.armorother3_mod || 0;
            // armor in use ie 'worn', should always be considered as carried
            output[`repeating_equipment_${newID}_equipment_carried_select`] = +v.armorother3_worn === 1 ? 1 : 0;
            clog(`syncArmorToEquipment - repeating Armor exists for 'other3':${newID}`);
          } else {
            // has name but NO id = CREATE NEW ROW
            newID = generateUniqueRowID();
            output.armorother3_row_id = newID.toLowerCase();
            output[`repeating_equipment_${newID}_equipment_type`] = 2;
            output[`repeating_equipment_${newID}_equipment_armor_type`] = 7;
            output[`repeating_equipment_${newID}_equipment_armor_worn`] = +v.armorother3_worn;
            output[`repeating_equipment_${newID}_equipment_item`] = v.armorother3.trim();
            output[`repeating_equipment_${newID}_equipment_armor_ac`] = +v.armorother3_ac;
            output[`repeating_equipment_${newID}_equipment_armor_base`] = +v.armorother3_base;
            output[`repeating_equipment_${newID}_equipment_armor_magic`] = +v.armorother3_magic || 0;
            output[`repeating_equipment_${newID}_equipment_armor_mod`] = +v.armorother3_mod || 0;
            output[`repeating_equipment_${newID}_equipment_sync_armor_flag`] = 1;
            clog(`syncArmorToEquipment - repeating Armor does not exist. Creating other3: ${newID}`);
          }
        } else if (armorother3_ID === idArray[7]) {
          // id exists but no name: Armor Detail row has been REMOVED - RESETING ROW
          output.armorother3_row_id = 0;
          output.armorother3_worn = 0;
          output.armorother3 = '';
          output.armorother3_ac = 0;
          output.armorother3_base = 0;
          output.armorother3_magic = 0;
          output.armorother3_mod = 0;
          output.armorother3_bulk = 0;
          clog(`syncArmorToEquipment - Armor Details row removed. Resetting other3:${newID}`);
        }
      } else if (matchingArray === null && row_removed) {
        // matchingArray === null means repeating_row removed: NO Name and/or id REMOVED - RESETING ROW
        output.armorother3_row_id = 0;
        output.armorother3_worn = 0;
        output.armorother3 = '';
        output.armorother3_ac = 0;
        output.armorother3_base = 0;
        output.armorother3_magic = 0;
        output.armorother3_mod = 0;
        output.armorother3_bulk = 0;
        clog(`repeating row_removed:${row_removed} - Armor Details row has been reset for other3`);
      }
    }
    if (matchingArray === 'other4Attrs' || id_low === idArray[8] || migrate) {
      if (matchingArray === 'other4Attrs' || migrate) {
        if (other4) {
          if (armorother4_ID.length === 20) {
            // has name && has id = UPDATE ROW
            newID = armorother4_ID.toLowerCase();
            output.armorother4_row_id = newID;
            output[`repeating_equipment_${newID}_equipment_type`] = 2;
            output[`repeating_equipment_${newID}_equipment_armor_type`] = 8;
            output[`repeating_equipment_${newID}_equipment_armor_worn`] = +v.armorother4_worn;
            output[`repeating_equipment_${newID}_equipment_item`] = v.armorother4.trim();
            output[`repeating_equipment_${newID}_equipment_armor_ac`] = +v.armorother4_ac;
            output[`repeating_equipment_${newID}_equipment_armor_base`] = +v.armorother4_base;
            output[`repeating_equipment_${newID}_equipment_armor_magic`] = +v.armorother4_magic || 0;
            output[`repeating_equipment_${newID}_equipment_armor_mod`] = +v.armorother4_mod || 0;
            // armor in use ie 'worn', should always be considered as carried
            output[`repeating_equipment_${newID}_equipment_carried_select`] = +v.armorother4_worn === 1 ? 1 : 0;
            clog(`syncArmorToEquipment - repeating Armor exists for 'other4':${newID}`);
          } else {
            // has name but NO id = CREATE NEW ROW
            newID = generateUniqueRowID();
            output.armorother4_row_id = newID.toLowerCase();
            output[`repeating_equipment_${newID}_equipment_type`] = 2;
            output[`repeating_equipment_${newID}_equipment_armor_type`] = 8;
            output[`repeating_equipment_${newID}_equipment_armor_worn`] = +v.armorother4_worn;
            output[`repeating_equipment_${newID}_equipment_item`] = v.armorother4.trim();
            output[`repeating_equipment_${newID}_equipment_armor_ac`] = +v.armorother4_ac;
            output[`repeating_equipment_${newID}_equipment_armor_base`] = +v.armorother4_base;
            output[`repeating_equipment_${newID}_equipment_armor_magic`] = +v.armorother4_magic || 0;
            output[`repeating_equipment_${newID}_equipment_armor_mod`] = +v.armorother4_mod || 0;
            output[`repeating_equipment_${newID}_equipment_sync_armor_flag`] = 1;
            clog(`syncArmorToEquipment - repeating Armor does not exist. Creating other4: ${newID}`);
          }
        } else if (armorother4_ID === idArray[8]) {
          // id exists but no name: Armor Detail row has been REMOVED - RESETING ROW
          output.armorother4_row_id = 0;
          output.armorother4_worn = 0;
          output.armorother4 = '';
          output.armorother4_ac = 0;
          output.armorother4_base = 0;
          output.armorother4_magic = 0;
          output.armorother4_mod = 0;
          output.armorother4_bulk = 0;
          clog(`syncArmorToEquipment - Armor Details row removed. Resetting other4:${newID}`);
        }
      } else if (matchingArray === null && row_removed) {
        // matchingArray === null means repeating_row removed: NO Name and/or id REMOVED - RESETING ROW
        output.armorother4_row_id = 0;
        output.armorother4_worn = 0;
        output.armorother4 = '';
        output.armorother4_ac = 0;
        output.armorother4_base = 0;
        output.armorother4_magic = 0;
        output.armorother4_mod = 0;
        output.armorother4_bulk = 0;
        clog(`repeating row_removed:${row_removed} - Armor Details row has been reset for other4`);
      }
    }
    if (matchingArray === 'other5Attrs' || id_low === idArray[9] || migrate) {
      if (matchingArray === 'other5Attrs' || migrate) {
        if (other5) {
          if (armorother5_ID.length === 20) {
            // has name && has id = UPDATE ROW
            newID = armorother5_ID.toLowerCase();
            output.armorother5_row_id = newID;
            output[`repeating_equipment_${newID}_equipment_type`] = 2;
            output[`repeating_equipment_${newID}_equipment_armor_type`] = 9;
            output[`repeating_equipment_${newID}_equipment_armor_worn`] = +v.armorother5_worn;
            output[`repeating_equipment_${newID}_equipment_item`] = v.armorother5.trim();
            output[`repeating_equipment_${newID}_equipment_armor_ac`] = +v.armorother5_ac;
            output[`repeating_equipment_${newID}_equipment_armor_base`] = +v.armorother5_base;
            output[`repeating_equipment_${newID}_equipment_armor_magic`] = +v.armorother5_magic || 0;
            output[`repeating_equipment_${newID}_equipment_armor_mod`] = +v.armorother5_mod || 0;
            // armor in use ie 'worn', should always be considered as carried
            output[`repeating_equipment_${newID}_equipment_carried_select`] = +v.armorother5_worn === 1 ? 1 : 0;
            clog(`syncArmorToEquipment - repeating Armor exists for 'other5':${newID}`);
          } else {
            // has name but NO id = CREATE NEW ROW
            newID = generateUniqueRowID();
            output.armorother5_row_id = newID.toLowerCase();
            output[`repeating_equipment_${newID}_equipment_type`] = 2;
            output[`repeating_equipment_${newID}_equipment_armor_type`] = 9;
            output[`repeating_equipment_${newID}_equipment_armor_worn`] = +v.armorother5_worn;
            output[`repeating_equipment_${newID}_equipment_item`] = v.armorother5.trim();
            output[`repeating_equipment_${newID}_equipment_armor_ac`] = +v.armorother5_ac;
            output[`repeating_equipment_${newID}_equipment_armor_base`] = +v.armorother5_base;
            output[`repeating_equipment_${newID}_equipment_armor_magic`] = +v.armorother5_magic || 0;
            output[`repeating_equipment_${newID}_equipment_armor_mod`] = +v.armorother5_mod || 0;
            output[`repeating_equipment_${newID}_equipment_sync_armor_flag`] = 1;
            clog(`syncArmorToEquipment - repeating Armor does not exist. Creating other5: ${newID}`);
          }
        } else if (armorother5_ID === idArray[9]) {
          // id exists but no name: Armor Detail row has been REMOVED - RESETING ROW
          output.armorother5_row_id = 0;
          output.armorother5_worn = 0;
          output.armorother5 = '';
          output.armorother5_ac = 0;
          output.armorother5_base = 0;
          output.armorother5_magic = 0;
          output.armorother5_mod = 0;
          output.armorother5_bulk = 0;
          clog(`syncArmorToEquipment - Armor Details row removed. Resetting other5:${newID}`);
        }
      } else if (matchingArray === null && row_removed) {
        // matchingArray === null means repeating_row removed: NO Name and/or id REMOVED - RESETING ROW
        output.armorother5_row_id = 0;
        output.armorother5_worn = 0;
        output.armorother5 = '';
        output.armorother5_ac = 0;
        output.armorother5_base = 0;
        output.armorother5_magic = 0;
        output.armorother5_mod = 0;
        output.armorother5_bulk = 0;
        clog(`repeating row_removed:${row_removed} - Armor Details row has been reset for other5`);
      }
    }
    if (matchingArray === 'other6Attrs' || id_low === idArray[10] || migrate) {
      if (matchingArray === 'other6Attrs' || migrate) {
        if (other6) {
          if (armorother6_ID.length === 20) {
            // has name && has id = UPDATE ROW
            newID = armorother6_ID.toLowerCase();
            output.armorother6_row_id = newID;
            output[`repeating_equipment_${newID}_equipment_type`] = 2;
            output[`repeating_equipment_${newID}_equipment_armor_type`] = 10;
            output[`repeating_equipment_${newID}_equipment_armor_worn`] = +v.armorother6_worn;
            output[`repeating_equipment_${newID}_equipment_item`] = v.armorother6.trim();
            output[`repeating_equipment_${newID}_equipment_armor_ac`] = +v.armorother6_ac;
            output[`repeating_equipment_${newID}_equipment_armor_base`] = +v.armorother6_base;
            output[`repeating_equipment_${newID}_equipment_armor_magic`] = +v.armorother6_magic || 0;
            output[`repeating_equipment_${newID}_equipment_armor_mod`] = +v.armorother6_mod || 0;
            // armor in use ie 'worn', should always be considered as carried
            output[`repeating_equipment_${newID}_equipment_carried_select`] = +v.armorother6_worn === 1 ? 1 : 0;
            clog(`syncArmorToEquipment - repeating Armor exists for 'other6':${newID}`);
          } else {
            // has name but NO id = CREATE NEW ROW
            newID = generateUniqueRowID();
            output.armorother6_row_id = newID.toLowerCase();
            output[`repeating_equipment_${newID}_equipment_type`] = 2;
            output[`repeating_equipment_${newID}_equipment_armor_type`] = 10;
            output[`repeating_equipment_${newID}_equipment_armor_worn`] = +v.armorother6_worn;
            output[`repeating_equipment_${newID}_equipment_item`] = v.armorother6.trim();
            output[`repeating_equipment_${newID}_equipment_armor_ac`] = +v.armorother6_ac;
            output[`repeating_equipment_${newID}_equipment_armor_base`] = +v.armorother6_base;
            output[`repeating_equipment_${newID}_equipment_armor_magic`] = +v.armorother6_magic || 0;
            output[`repeating_equipment_${newID}_equipment_armor_mod`] = +v.armorother6_mod || 0;
            output[`repeating_equipment_${newID}_equipment_sync_armor_flag`] = 1;
            clog(`syncArmorToEquipment - repeating Armor does not exist. Creating other6: ${newID}`);
          }
        } else if (armorother6_ID === idArray[10]) {
          // id exists but no name: Armor Detail row has been REMOVED - RESETING ROW
          output.armorother6_row_id = 0;
          output.armorother6_worn = 0;
          output.armorother6 = '';
          output.armorother6_ac = 0;
          output.armorother6_base = 0;
          output.armorother6_magic = 0;
          output.armorother6_mod = 0;
          output.armorother6_bulk = 0;
          clog(`syncArmorToEquipment - Armor Details row removed. Resetting other6:${newID}`);
        }
      } else if (matchingArray === null && row_removed) {
        // matchingArray === null means repeating_row removed: NO Name and/or id REMOVED - RESETING ROW
        output.armorother6_row_id = 0;
        output.armorother6_worn = 0;
        output.armorother6 = '';
        output.armorother6_ac = 0;
        output.armorother6_base = 0;
        output.armorother6_magic = 0;
        output.armorother6_mod = 0;
        output.armorother6_bulk = 0;
        clog(`repeating row_removed:${row_removed} - Armor Details row has been reset for other6`);
      }
    }
    // setAttrs(output, armorDetailsRowidArray(id_low), calcAC);
    setAttrs(output, {silent: true}, armorDetailsRowidArray(id_low), calcAC);
  });
}

// One-time update:  migrate Armor Details to repeating_equipment
const migrateArmorDetails = (current_version, final_version) => {
  const output = {};
  const row_removed = 0;
  const migrate = 1;
  syncArmorToEquipment(null, null, row_removed, migrate);
  output.sheet_version = current_version;
  clog(`VERSION UPDATE: migrateArmorDetails completed`);
  setAttrs(output, {silent: true}, () => {
    versionator(current_version, final_version);
  });
};

// One-time update: sets all equipment default values
const setEquipmentUpdate = (current_version, final_version) => {
  getSectionIDs('repeating_equipment', (idArray) => {
    const output = {};
    const fields = [];
    _.each(idArray, (id) => {
      fields.push(section_attribute('equipment', id, 'equipment_type'));
      fields.push(section_attribute('equipment', id, 'equipment_current'));
      fields.push(section_attribute('equipment', id, 'equipment_current_max'));
      fields.push(section_attribute('equipment', id, 'equipment_carried_select'));
      fields.push(section_attribute('equipment', id, 'equipment_carried'));
      fields.push(section_attribute('equipment', id, 'equipment_quantity'));
      fields.push(section_attribute('equipment', id, 'equipment_quantity_max'));
      fields.push(section_attribute('equipment', id, 'equipment_weight'));
      fields.push(section_attribute('equipment', id, 'equipment_cost'));
      fields.push(section_attribute('equipment', id, 'equipment_armor_type'));
      fields.push(section_attribute('equipment', id, 'equipment_armor_worn'));
      fields.push(section_attribute('equipment', id, 'equipment_armor_ac'));
      fields.push(section_attribute('equipment', id, 'equipment_armor_base'));
      fields.push(section_attribute('equipment', id, 'equipment_armor_magic'));
      fields.push(section_attribute('equipment', id, 'equipment_armor_mod'));
      fields.push(section_attribute('equipment', id, 'equipment_armor_bulk'));
      fields.push(section_attribute('equipment', id, 'equipment_macro_text'));
    });
    getAttrs(fields, (v) => {
      _.each(idArray, (id) => {
        output[section_attribute('equipment', id, 'equipment_type')] = +v[section_attribute('equipment', id, 'equipment_type')];
        output[section_attribute('equipment', id, 'equipment_current')] = +v[section_attribute('equipment', id, 'equipment_current')] || 0;
        output[section_attribute('equipment', id, 'equipment_current_max')] = +v[section_attribute('equipment', id, 'equipment_current_max')] || 0;
        output[section_attribute('equipment', id, 'equipment_carried_select')] = +v[section_attribute('equipment', id, 'equipment_carried')]; // setting to carried to preserve existing value
        output[section_attribute('equipment', id, 'equipment_carried')] = +v[section_attribute('equipment', id, 'equipment_carried')];
        output[section_attribute('equipment', id, 'equipment_quantity')] = +v[section_attribute('equipment', id, 'equipment_quantity')] || 0;
        output[section_attribute('equipment', id, 'equipment_quantity_max')] = +v[section_attribute('equipment', id, 'equipment_quantity_max')] || 0;
        output[section_attribute('equipment', id, 'equipment_weight')] = +v[section_attribute('equipment', id, 'equipment_weight')] || 0;
        output[section_attribute('equipment', id, 'equipment_cost')] = +v[section_attribute('equipment', id, 'equipment_cost')] || 0;
        output[section_attribute('equipment', id, 'equipment_armor_type')] = +v[section_attribute('equipment', id, 'equipment_armor_type')];
        output[section_attribute('equipment', id, 'equipment_armor_worn')] = +v[section_attribute('equipment', id, 'equipment_armor_worn')];
        output[section_attribute('equipment', id, 'equipment_armor_ac')] = +v[section_attribute('equipment', id, 'equipment_armor_ac')];
        output[section_attribute('equipment', id, 'equipment_armor_base')] = +v[section_attribute('equipment', id, 'equipment_armor_base')];
        output[section_attribute('equipment', id, 'equipment_armor_magic')] = +v[section_attribute('equipment', id, 'equipment_armor_magic')] || 0;
        output[section_attribute('equipment', id, 'equipment_armor_mod')] = +v[section_attribute('equipment', id, 'equipment_armor_mod')] || 0;
        output[section_attribute('equipment', id, 'equipment_armor_bulk')] = +v[section_attribute('equipment', id, 'equipment_armor_bulk')];
        output[section_attribute('equipment', id, 'equipment_macro_text')] = v[section_attribute('equipment', id, 'equipment_macro_text')];
      });
      output.sheet_version = current_version;
      clog(`VERSION UPDATE: setEquipmentUpdate completed`);
      setAttrs(output, {silent: true}, () => {
        versionator(current_version, final_version);
      });
    });
  });
};

// One-time update: sets all weapons default values
const setWeaponsUpdate = (current_version, final_version) => {
  getSectionIDs('repeating_weapon', (idArray) => {
    const output = {};
    const fields = [];
    _.each(idArray, (id) => {
      fields.push(section_attribute('weapon', id, 'weapon_attack_type'));
      fields.push(section_attribute('weapon', id, 'weapon_dual'));
      fields.push(section_attribute('weapon', id, 'weapon_whisper_to_hit'));
      fields.push(section_attribute('weapon', id, 'weapon_whisper_to_hit_select'));
      fields.push(section_attribute('weapon', id, 'weapon_dual_pen'));
      fields.push(section_attribute('weapon', id, 'weapon_backstab_var'));
      fields.push(section_attribute('weapon', id, 'weapon_tohitbonus'));
      fields.push(section_attribute('weapon', id, 'weapon_magicbonus'));
      fields.push(section_attribute('weapon', id, 'weapon_prof'));
      fields.push(section_attribute('weapon', id, 'weapon_backstab'));
      fields.push(section_attribute('weapon', id, 'weapon_backstab_bonus'));
      fields.push(section_attribute('weapon', id, 'weapon_backstab_mult'));
      fields.push(section_attribute('weapon', id, 'weapon_attackdmgbonus'));
      fields.push(section_attribute('weapon', id, 'weapon_num_attacks'));
      fields.push(section_attribute('weapon', id, 'weapon_quantity'));
      fields.push(section_attribute('weapon', id, 'weapon_ammo'));
      fields.push(section_attribute('weapon', id, 'weapon_ammo_max'));
      fields.push(section_attribute('weapon', id, 'weapon_weight'));
      fields.push(section_attribute('weapon', id, 'weapon_cost'));
      fields.push(section_attribute('weapon', id, 'weapon_range_short'));
      fields.push(section_attribute('weapon', id, 'weapon_range_medium'));
      fields.push(section_attribute('weapon', id, 'weapon_range_long'));
      fields.push(section_attribute('weapon', id, 'weapon_length'));
      fields.push(section_attribute('weapon', id, 'weapon_space'));
      fields.push(section_attribute('weapon', id, 'weapon_speed'));
      fields.push(section_attribute('weapon', id, 'weapon_misc'));
      fields.push(section_attribute('weapon', id, 'weapon_thac_adj0'));
      fields.push(section_attribute('weapon', id, 'weapon_thac_adj1'));
      fields.push(section_attribute('weapon', id, 'weapon_thac_adj2'));
      fields.push(section_attribute('weapon', id, 'weapon_thac_adj3'));
      fields.push(section_attribute('weapon', id, 'weapon_thac_adj4'));
      fields.push(section_attribute('weapon', id, 'weapon_thac_adj5'));
      fields.push(section_attribute('weapon', id, 'weapon_thac_adj6'));
      fields.push(section_attribute('weapon', id, 'weapon_thac_adj7'));
      fields.push(section_attribute('weapon', id, 'weapon_thac_adj8'));
      fields.push(section_attribute('weapon', id, 'weapon_thac_adj9'));
      fields.push(section_attribute('weapon', id, 'weapon_thac_adj10'));
      fields.push(section_attribute('weapon', id, 'weapon_macro_text'));
      fields.push(section_attribute('weapon', id, 'weapon_damagesmallmedium_chat_menu'));
      fields.push(section_attribute('weapon', id, 'weapon_damagelarge_chat_menu'));
      fields.push(section_attribute('weapon', id, 'weapon_damagesmallmedium_npc_chat_menu'));
      fields.push(section_attribute('weapon', id, 'weapon_damagelarge_npc_chat_menu'));
      fields.push(section_attribute('weapon', id, 'weapon_critdamagesmallmedium_chat_menu'));
      fields.push(section_attribute('weapon', id, 'weapon_critdamagelarge_chat_menu'));
      fields.push(section_attribute('weapon', id, 'weapon_critdamagesmallmedium_npc_chat_menu'));
      fields.push(section_attribute('weapon', id, 'weapon_critdamagelarge_npc_chat_menu'));
      fields.push(section_attribute('weapon', id, 'weapon_damage_chat_menu_npc'));
    });
    getAttrs(fields, (v) => {
      _.each(idArray, (id) => {
        output[`repeating_weapon_${id}_weapon_attack_type`] = +v[section_attribute('weapon', id, 'weapon_attack_type')];
        output[`repeating_weapon_${id}_weapon_dual`] = v[section_attribute('weapon', id, 'weapon_dual')];
        output[`repeating_weapon_${id}_weapon_whisper_to_hit`] = v[section_attribute('weapon', id, 'weapon_whisper_to_hit')];
        output[`repeating_weapon_${id}_weapon_whisper_to_hit_select`] = +v[section_attribute('weapon', id, 'weapon_whisper_to_hit_select')];
        output[`repeating_weapon_${id}_weapon_dual_pen`] = +v[section_attribute('weapon', id, 'weapon_dual_pen')] || 0;
        output[`repeating_weapon_${id}_weapon_backstab_var`] = +v[section_attribute('weapon', id, 'weapon_backstab_var')] || 0;
        output[`repeating_weapon_${id}_weapon_tohitbonus`] = +v[section_attribute('weapon', id, 'weapon_tohitbonus')] || 0;
        output[`repeating_weapon_${id}_weapon_magicbonus`] = +v[section_attribute('weapon', id, 'weapon_magicbonus')] || 0;
        output[`repeating_weapon_${id}_weapon_prof`] = +v[section_attribute('weapon', id, 'weapon_prof')] || 0;
        output[`repeating_weapon_${id}_weapon_backstab`] = +v[section_attribute('weapon', id, 'weapon_backstab')] || 0;
        output[`repeating_weapon_${id}_weapon_backstab_bonus`] = +v[section_attribute('weapon', id, 'weapon_backstab_bonus')] || 0;
        output[`repeating_weapon_${id}_weapon_backstab_mult`] = +v[section_attribute('weapon', id, 'weapon_backstab_mult')] || 0;
        output[`repeating_weapon_${id}_weapon_attackdmgbonus`] = +v[section_attribute('weapon', id, 'weapon_attackdmgbonus')] || 0;
        output[`repeating_weapon_${id}_weapon_num_attacks`] = +v[section_attribute('weapon', id, 'weapon_num_attacks')] || 0;
        output[`repeating_weapon_${id}_weapon_quantity`] = +v[section_attribute('weapon', id, 'weapon_quantity')] || 0;
        output[`repeating_weapon_${id}_weapon_ammo`] = +v[section_attribute('weapon', id, 'weapon_ammo')] || 0;
        output[`repeating_weapon_${id}_weapon_ammo_max`] = +v[section_attribute('weapon', id, 'weapon_ammo_max')] || 0;
        output[`repeating_weapon_${id}_weapon_weight`] = +v[section_attribute('weapon', id, 'weapon_weight')] || 0;
        output[`repeating_weapon_${id}_weapon_cost`] = +v[section_attribute('weapon', id, 'weapon_cost')] || 0;
        output[`repeating_weapon_${id}_weapon_range_short`] = +v[section_attribute('weapon', id, 'weapon_range_short')] || 0;
        output[`repeating_weapon_${id}_weapon_range_medium`] = +v[section_attribute('weapon', id, 'weapon_range_medium')] || 0;
        output[`repeating_weapon_${id}_weapon_range_long`] = +v[section_attribute('weapon', id, 'weapon_range_long')] || 0;
        output[`repeating_weapon_${id}_weapon_length`] = v[section_attribute('weapon', id, 'weapon_length')];
        output[`repeating_weapon_${id}_weapon_space`] = v[section_attribute('weapon', id, 'weapon_space')];
        output[`repeating_weapon_${id}_weapon_speed`] = v[section_attribute('weapon', id, 'weapon_speed')];
        output[`repeating_weapon_${id}_weapon_misc`] = v[section_attribute('weapon', id, 'weapon_misc')];
        output[`repeating_weapon_${id}_weapon_thac_adj0`] = +v[section_attribute('weapon', id, 'weapon_thac_adj0')] || 0;
        output[`repeating_weapon_${id}_weapon_thac_adj1`] = +v[section_attribute('weapon', id, 'weapon_thac_adj1')] || 0;
        output[`repeating_weapon_${id}_weapon_thac_adj2`] = +v[section_attribute('weapon', id, 'weapon_thac_adj2')] || 0;
        output[`repeating_weapon_${id}_weapon_thac_adj3`] = +v[section_attribute('weapon', id, 'weapon_thac_adj3')] || 0;
        output[`repeating_weapon_${id}_weapon_thac_adj4`] = +v[section_attribute('weapon', id, 'weapon_thac_adj4')] || 0;
        output[`repeating_weapon_${id}_weapon_thac_adj5`] = +v[section_attribute('weapon', id, 'weapon_thac_adj5')] || 0;
        output[`repeating_weapon_${id}_weapon_thac_adj6`] = +v[section_attribute('weapon', id, 'weapon_thac_adj6')] || 0;
        output[`repeating_weapon_${id}_weapon_thac_adj7`] = +v[section_attribute('weapon', id, 'weapon_thac_adj7')] || 0;
        output[`repeating_weapon_${id}_weapon_thac_adj8`] = +v[section_attribute('weapon', id, 'weapon_thac_adj8')] || 0;
        output[`repeating_weapon_${id}_weapon_thac_adj9`] = +v[section_attribute('weapon', id, 'weapon_thac_adj9')] || 0;
        output[`repeating_weapon_${id}_weapon_thac_adj10`] = +v[section_attribute('weapon', id, 'weapon_thac_adj10')] || 0;
        output[`repeating_weapon_${id}_weapon_macro_text`] = v[section_attribute('weapon', id, 'weapon_macro_text')];
        output[`repeating_weapon_${id}_weapon_damagesmallmedium_chat_menu`] = v[section_attribute('weapon', id, 'weapon_damagesmallmedium_chat_menu')];
        output[`repeating_weapon_${id}_weapon_damagelarge_chat_menu`] = v[section_attribute('weapon', id, 'weapon_damagelarge_chat_menu')];
        output[`repeating_weapon_${id}_weapon_damagesmallmedium_npc_chat_menu`] = v[section_attribute('weapon', id, 'weapon_damagesmallmedium_npc_chat_menu')];
        output[`repeating_weapon_${id}_weapon_damagelarge_npc_chat_menu`] = v[section_attribute('weapon', id, 'weapon_damagelarge_npc_chat_menu')];
        output[`repeating_weapon_${id}_weapon_critdamagesmallmedium_chat_menu`] = v[section_attribute('weapon', id, 'weapon_critdamagesmallmedium_chat_menu')];
        output[`repeating_weapon_${id}_weapon_critdamagelarge_chat_menu`] = v[section_attribute('weapon', id, 'weapon_critdamagelarge_chat_menu')];
        output[`repeating_weapon_${id}_weapon_critdamagesmallmedium_npc_chat_menu`] = v[section_attribute('weapon', id, 'weapon_critdamagesmallmedium_npc_chat_menu')];
        output[`repeating_weapon_${id}_weapon_critdamagelarge_npc_chat_menu`] = v[section_attribute('weapon', id, 'weapon_critdamagelarge_npc_chat_menu')];
        output[`repeating_weapon_${id}_weapon_damage_chat_menu_npc`] = v[section_attribute('weapon', id, 'weapon_damage_chat_menu_npc')];
      });
      output.sheet_version = current_version;
      clog(`VERSION UPDATE: setWeaponsUpdate completed`);
      setAttrs(output, {silent: true}, () => {
        versionator(current_version, final_version);
      });
    });
  });
};

// One-time update: sets all NWP default values
const setNWPUpdate = (current_version, final_version) => {
  getSectionIDs('nonweaponproficiencies', (idArray) => {
    const output = {};
    const fields = [];
    _.each(idArray, (id) => {
      fields.push(section_attribute('nonweaponproficiencies', id, 'nwp_attribute'));
      fields.push(section_attribute('nonweaponproficiencies', id, 'nwp_slots'));
      fields.push(section_attribute('nonweaponproficiencies', id, 'nwp_modifier'));
      fields.push(section_attribute('nonweaponproficiencies', id, 'nwp_macro_text'));
    });
    getAttrs(fields, (v) => {
      _.each(idArray, (id) => {
        output[`repeating_nonweaponproficiencies_${id}_attribute`] = v[section_attribute('nonweaponproficiencies', id, 'nwp_attribute')];
        output[`repeating_nonweaponproficiencies_${id}_slots`] = +v[section_attribute('nonweaponproficiencies', id, 'nwp_slots')] || 0;
        output[`repeating_nonweaponproficiencies_${id}_modifier`] = +v[section_attribute('nonweaponproficiencies', id, 'nwp_modifier')] || 0;
        output[`repeating_nonweaponproficiencies_${id}_macro_text`] = v[section_attribute('nonweaponproficiencies', id, 'nwp_macro_text')] || 0;
      });
      output.sheet_version = current_version;
      clog(`VERSION UPDATE: setNWPUpdate completed`);
      setAttrs(output, {silent: true}, () => {
        versionator(current_version, final_version);
      });
    });
  });
};

// One-time update: migrate Weapon weight and cost to repeating_equipment
const clearWeaponsWeightCost = () => {
  // clear old weapon weight and cost values
  getSectionIDs('repeating_weapon', (idArray) => {
    const output = {};
    const fields = [];
    _.each(idArray, (id) => {
      fields.push(section_attribute('weapon', id, 'weapon_quantity'));
      fields.push(section_attribute('weapon', id, 'weapon_weight'));
      fields.push(section_attribute('weapon', id, 'weapon_cost'));
    });
    getAttrs(fields, (v) => {
      _.each(idArray, (id) => {
        output[section_attribute('weapon', id, 'weapon_quantity')] = +v[section_attribute('weapon', id, 'weapon_quantity')] || 0;
        output[section_attribute('weapon', id, 'weapon_weight')] = 0;
        output[section_attribute('weapon', id, 'weapon_cost')] = 0;
        // clog(`CLEARED OLD WEAPON WEIGHT AND COST`);
      });
      setAttrs(output);
    });
  });
};

const migrateWeaponWtCostFunction = () => {
  getSectionIDs('repeating_weapon', (weaponsArray) => {
    getSectionIDs('repeating_equipment', (equipmentArray) => {
      const output = {};
      const weaponFields = [];
      const equipmentFields = [];
      const fields = [...weaponFields, ...equipmentFields];
      _.each(weaponsArray, (id) => {
        fields.push(section_attribute('weapon', id, 'weapon_name'));
        fields.push(section_attribute('weapon', id, 'weapon_quantity'));
        fields.push(section_attribute('weapon', id, 'weapon_weight'));
        fields.push(section_attribute('weapon', id, 'weapon_cost'));
      });
      _.each(equipmentArray, (idEquip) => {
        fields.push(section_attribute('equipment', idEquip, 'equipment_item'));
        fields.push(section_attribute('equipment', idEquip, 'equipment_quantity'));
        fields.push(section_attribute('equipment', idEquip, 'equipment_weight'));
        fields.push(section_attribute('equipment', idEquip, 'equipment_cost'));
      });
      getAttrs(fields, (v) => {
        const equipmentNamesArray = [];
        const equipmentWeightsArray = [];
        const equipmentCostsArray = [];
        const equipmentIdsArray = [];
        let newID = '';
        _.each(weaponsArray, (id) => {
          const weaponName = v[section_attribute('weapon', id, 'weapon_name')];
          const weaponQuantity = v[section_attribute('weapon', id, 'weapon_quantity')];
          const weaponWeight = v[section_attribute('weapon', id, 'weapon_weight')];
          const weaponCost = v[section_attribute('weapon', id, 'weapon_cost')];
          _.each(equipmentArray, (idEquip) => {
            const equipmentId = idEquip;
            equipmentIdsArray.push(equipmentId);
            const equipmentName = v[section_attribute('equipment', idEquip, 'equipment_item')];
            equipmentNamesArray.push(equipmentName);
            const equipmentWeight = v[section_attribute('equipment', idEquip, 'equipment_weight')];
            equipmentWeightsArray.push(equipmentWeight);
            const equipmentCost = v[section_attribute('equipment', idEquip, 'equipment_cost')];
            equipmentCostsArray.push(equipmentCost);
          });
          // weapon weight, cost, or both are being tracked on the weapon row
          if (weaponWeight !== 0 || weaponCost !== 0) {
            clog(`weaponName:${weaponName} weaponWeight:${weaponWeight} weaponCost:${weaponCost}`);
            // test weapon name against equipment names
            const nameIndex = equipmentNamesArray.indexOf(weaponName);
            if (nameIndex === -1) {
              clog(`NO MATCH || COPY TO NEW ROW ||`);
              // create a new row
              newID = generateUniqueRowID();
              output[`repeating_equipment_${newID}_equipment_type`] = 1;
              output[`repeating_equipment_${newID}_equipment_item`] = weaponName;
              output[`repeating_equipment_${newID}_equipment_quantity`] = weaponQuantity;
              output[`repeating_equipment_${newID}_equipment_quantity_max`] = weaponQuantity;
              output[`repeating_equipment_${newID}_equipment_weight`] = weaponWeight;
              output[`repeating_equipment_${newID}_equipment_cost`] = weaponCost;
            } else if (equipmentWeightsArray[nameIndex] === '0' && equipmentCostsArray[nameIndex] === '0') {
              // weight & cost are being tracked on weapons
              clog(
                `MATCH w/weight & cost tracked on weapons. || UPDATE ROW || name:${weaponName} weight:${equipmentWeightsArray[nameIndex]} cost:${equipmentCostsArray[nameIndex]} at index:${nameIndex} id:${equipmentIdsArray[nameIndex]}`,
              );
              // update existing row
              newID = equipmentIdsArray[nameIndex];
              output[`repeating_equipment_${newID}_equipment_type`] = 1;
              output[`repeating_equipment_${newID}_equipment_quantity`] = weaponQuantity;
              output[`repeating_equipment_${newID}_equipment_quantity_max`] = weaponQuantity;
              output[`repeating_equipment_${newID}_equipment_weight`] = weaponWeight;
              output[`repeating_equipment_${newID}_equipment_cost`] = weaponCost;
            } else if (equipmentWeightsArray[nameIndex] !== '0' && equipmentCostsArray[nameIndex] === '0') {
              // weight is being tracked on equipment but costs are not
              clog(
                `MATCH w/weight tracked on equipment. || UPDATE ROW || name:${weaponName} weight:${equipmentWeightsArray[nameIndex]} cost:${equipmentCostsArray[nameIndex]} at index:${nameIndex} id:${equipmentIdsArray[nameIndex]}`,
              );
              // update existing row
              newID = equipmentIdsArray[nameIndex];
              output[`repeating_equipment_${newID}_equipment_type`] = 1;
              output[`repeating_equipment_${newID}_equipment_cost`] = weaponCost;
            } else if (equipmentWeightsArray[nameIndex] === '0' && equipmentCostsArray[nameIndex] !== '0') {
              // weight is not being tracked on equipment but costs are
              clog(
                `MATCH w/cost tracked on equipment. || UPDATE ROW || name:${weaponName} weight:${equipmentWeightsArray[nameIndex]} cost:${equipmentCostsArray[nameIndex]} at index:${nameIndex} id:${equipmentIdsArray[nameIndex]}`,
              );
              // update existing row
              newID = equipmentIdsArray[nameIndex];
              output[`repeating_equipment_${newID}_equipment_type`] = 1;
              output[`repeating_equipment_${newID}_equipment_weight`] = weaponWeight;
            } else if (equipmentWeightsArray[nameIndex] !== '0' && equipmentCostsArray[nameIndex] !== '0') {
              clog(
                `100% MATCH weight & cost tracked on equipment. || IGNORE ROW || name:${weaponName} weight: ${equipmentWeightsArray[nameIndex]} cost:${equipmentCostsArray[nameIndex]} at index:${nameIndex}`,
              );
            } else {
              // ignore
              clog(`No attribute data to migrate. || IGNORE ROW ||`);
            }
          }
        });
        // zero out weapon row weight and cost with clearWeaponsWeightCost()
        setAttrs(output, {silent: true}, clearWeaponsWeightCost);
      });
    });
  });
};

const migrateWeaponWtCost = (current_version, final_version) => {
  const output = {};
  migrateWeaponWtCostFunction();
  output.sheet_version = current_version;
  clog(`VERSION UPDATE: migrateWeaponWtCost completed`);
  setAttrs(output, {silent: true}, () => {
    versionator(current_version, final_version);
  });
};

// One-time update:  checks and sets equipment-gear but the value was set out-of-range
const setEquipmentType = (current_version, final_version) => {
  getSectionIDs('repeating_equipment', (idArray) => {
    const output = {};
    const fields = [];
    _.each(idArray, (id) => {
      fields.push(section_attribute('equipment', id, 'equipment_type'));
    });
    getAttrs(fields, (v) => {
      _.each(idArray, (id) => {
        const equipType = +v[section_attribute('equipment', id, 'equipment_type')];
        if (equipType >= 0) return;
        output[section_attribute('equipment', id, 'equipment_type')] = 0;
        clog(`equipType -1:${equipType} reset to Gear`);
      });
      output.sheet_version = current_version;
      clog(`VERSION UPDATE: setEquipmentType completed`);
      setAttrs(output, {silent: true}, () => {
        versionator(current_version, final_version);
      });
    });
  });
};

const migrateSetSpellsCasterClass = (current_version, final_version) => {
  const output = {};
  setSpellsCasterClass();
  output.sheet_version = current_version;
  clog(`VERSION UPDATE: migrateSetSpellsCasterClass completed`);
  setAttrs(output, {silent: true}, () => {
    versionator(current_version, final_version);
  });
};

// One-time update: ensures warning flag is correct
const recalcAC = (current_version, final_version) => {
  const output = {};
  const recalc = 0;
  calcAC(recalc);
  output.sheet_version = current_version;
  clog(`VERSION UPDATE: recalcAC completed`);
  setAttrs(output, {silent: true}, () => {
    versionator(current_version, final_version);
  });
};

// One-time update: initiative macro subtitle fix
const initMacroUpdate = (current_version, final_version) => {
  const output = {};
  output.init_macro_text = '';
  output.sheet_version = current_version;
  clog(`VERSION UPDATE: recalcAC completed`);
  setAttrs(output, {silent: true}, () => {
    versionator(current_version, final_version);
  });
};

// One-time update: add parenthesis to critical damage macro-text
const updateCriticalDamageMacro = (current_version, final_version) => {
  getSectionIDs('repeating_weapon', (idArray) => {
    const fields = [];
    _.each(idArray, (id) => {
      fields.push(section_attribute('weapon', id, 'weapon_critdamagesmallmedium'));
      fields.push(section_attribute('weapon', id, 'weapon_critdamagelarge'));
    });
    getAttrs([...fields], (v) => {
      const output = {};
      const macrodefaultSmall = '(@{weapon_damagesmallmedium})*2';
      const macrodefaultLarge = '(@{weapon_damagelarge})*2';
      _.each(idArray, (id) => {
        const macrotextSmall = v[section_attribute('weapon', id, 'weapon_critdamagesmallmedium')] || macrodefaultSmall;
        const macrotextLarge = v[section_attribute('weapon', id, 'weapon_critdamagelarge')] || macrodefaultLarge;
        output[section_attribute('weapon', id, 'weapon_critdamagesmallmedium')] = macrotextSmall.replace(/@{weapon_damagesmallmedium}*2/g, '(@{weapon_damagesmallmedium})*2');
        output[section_attribute('weapon', id, 'weapon_critdamagelarge')] = macrotextLarge.replace(/@{weapon_damagelarge}*2/g, '(@{weapon_damagelarge})*2');
      });
      output.sheet_version = current_version;
      clog(`VERSION UPDATE: updateCriticalDamageMacro completed`);
      setAttrs(output, {silent: true}, () => {
        versionator(current_version, final_version);
      });
    });
  });
};

// Check and set Ability defaults to 8 on new sheets
const newSheet = () => {
  getAttrs(['hitdice', 'armorclass', 'strength', 'intelligence', 'wisdom', 'dexterity', 'constitution', 'charisma', 'old_character'], (v) => {
    const output = {};
    const testOldChar = +v.old_character || 0;
    if (testOldChar === 1) return;
    const testHitdice = +v.hitdice;
    const testAC = +v.armorclass;
    const testStr = +v.strength;
    const testInt = +v.intelligence;
    const testWis = +v.wisdom;
    const testDex = +v.dexterity;
    const testCon = +v.constitution;
    const testCha = +v.charisma;
    // new sheets will have all abilities '10' by default
    // defaults will then be set to '8' default
    const testAbility = testStr + testInt + testWis + testDex + testCon + testCha;
    // clog(`~~~~~~ Average Ability detected: ${testAbility}, Hit Dice: ${testHitdice}, AC: ${testAC}`);
    if (testHitdice === 0 && testAC === 10 && testAbility === 60) {
      // clog(`~~~~~~ NEW SHEET DETECTED old_character:${testOldChar}, Ability Defaults set to "8".`);
      output.strength = testStr === 10 ? 8 : testStr;
      output.intelligence = testInt === 10 ? 8 : testInt;
      output.wisdom = testWis === 10 ? 8 : testWis;
      output.dexterity = testDex === 10 ? 8 : testDex;
      output.constitution = testCon === 10 ? 8 : testCon;
      output.charisma = testCha === 10 ? 8 : testCha;
      output.old_character = 1;
      stat_functions();
    } else {
      // clog(`~~~~~~ OLD SHEET DETECTED old_character:${testOldChar}`);
      output.old_character = 1;
    }
    setAttrs(output, {silent: true});
  });
};

// One-time update: set repeating_equipment_equipment_sync_armor_flag
const updateSyncArmorFlag = (current_version, final_version) => {
  getSectionIDs('repeating_equipment', (idArray) => {
    const fields = [];
    _.each(idArray, (id) => {
      fields.push(section_attribute('equipment', id, 'equipment_armor_type'));
    });
    getAttrs([...armorRowIDs, ...fields], (v) => {
      const output = {};
      // #of repeating rows to check
      let pendingUpdates = idArray.length;
      // run version update only after all rows have been checked
      const checkForCompletion = () => {
        pendingUpdates--;
        if (pendingUpdates === 0) {
          output.sheet_version = current_version;
          clog(`VERSION UPDATE: updateSyncArmorFlag completed`);
          setAttrs(output, {silent: true}, () => {
            versionator(current_version, final_version);
          });
        }
      };

      // finish if no rows
      if (idArray.length === 0) {
        checkForCompletion();
        return;
      }

      // check each row
      _.each(idArray, (id) => {
        const type = v[section_attribute('equipment', id, 'equipment_armor_type')];
        testArmorRowIDs(id, (isMatch) => {
          if (type !== 99 && isMatch) {
            clog(`updateSyncArmorFlag - match from testArmorRowIDs():${isMatch} type:${type}`);
            output[section_attribute('equipment', id, 'equipment_sync_armor_flag')] = 1;
          } else {
            clog(`updateSyncArmorFlag - NO match:${isMatch} type:${type}`);
            output[section_attribute('equipment', id, 'equipment_sync_armor_flag')] = 0;
          }
          checkForCompletion();
        });
      });
    });
  });
};

// versioning routine to handle attribute changes
versionator = (current_version, final_version) => {
  if (current_version < 0.1) {
    dmgSwap(0.1, final_version);
  } else if (current_version < 1.2) {
    maxSwap(1.2, final_version);
  } else if (current_version < 1.5) {
    nwpMacroUpdate(1.5, final_version);
  } else if (current_version < 1.52) {
    weaponNameFix(1.52, final_version);
  } else if (current_version < 1.53) {
    spellNameFix(1.53, final_version);
  } else if (current_version < 1.54) {
    equipmentNameFix(1.54, final_version);
  } else if (current_version < 1.55) {
    abilityNameFix(1.55, final_version);
  } else if (current_version < 1.56) {
    nwpNameFix(1.56, final_version);
  } else if (current_version < 1.57) {
    macroColorUpdate(1.57, final_version);
    //-------------------------------------------
    //
    // 1E REVISED SHEET IS ANY UPDATE > v1.58
    //
    //-------------------------------------------
  } else if (current_version < 1.591) {
    autoCalcAbilityRows(1.591, final_version);
  } else if (current_version < 1.592) {
    autoCalcSaveRows(1.592, final_version);
  } else if (current_version < 1.593) {
    autoCalcThiefRows(1.593, final_version);
  } else if (current_version < 1.594) {
    removeWhisper(1.594, final_version);
  } else if (current_version < 1.595) {
    weaponMacroUpdate(1.595, final_version);
  } else if (current_version < 1.596) {
    abilityMacroUpdate(1.596, final_version);
  } else if (current_version < 1.597) {
    nwpMacroUpdate2(1.597, final_version);
  } else if (current_version < 1.598) {
    spellsMacroUpdate(1.598, final_version);
  } else if (current_version < 1.61) {
    updateRange(1.61, final_version);
  } else if (current_version < 1.62) {
    updateAttackTypeMacro(1.62, final_version);
  } else if (current_version < 1.634) {
    weaponMacroUpdate(1.634, final_version);
  } else if (current_version < 1.635) {
    migrateHP(1.635, final_version);
  } else if (current_version < 1.636) {
    migrateAC(1.636, final_version);
  } else if (current_version < 1.637) {
    weaponMacroUpdate(1.637, final_version);
  } else if (current_version < 1.638) {
    monsterHD(1.638, final_version);
  } else if (current_version < 1.639) {
    clearArmorOther(1.639, final_version);
  } else if (current_version < 1.64) {
    migrateArmorDetails(1.641, final_version);
  } else if (current_version < 1.642) {
    equipmentMacroUpdate(1.643, final_version);
  } else if (current_version < 1.644) {
    setEquipmentUpdate(1.644, final_version);
  } else if (current_version < 1.645) {
    setWeaponsUpdate(1.645, final_version);
  } else if (current_version < 1.646) {
    migrateWeaponWtCost(1.646, final_version);
  } else if (current_version < 1.648) {
    setEquipmentType(1.648, final_version);
  } else if (current_version < 1.65) {
    migrateSetSpellsCasterClass(1.65, final_version);
  } else if (current_version < 1.652) {
    abilityMacroUpdate(1.652, final_version);
  } else if (current_version < 1.654) {
    recalcAC(1.654, final_version);
  } else if (current_version < 1.656) {
    initMacroUpdate(1.656, final_version);
  } else if (current_version < 1.658) {
    updateCriticalDamageMacro(1.658, final_version);
  } else if (current_version < 1.659) {
    setNWPUpdate(1.66, final_version);
  } else if (current_version < 1.681) {
    updateSyncArmorFlag(1.69, final_version);
    // all updates completed
  } else if (current_version < final_version) {
    setAttrs({
      sheet_version: final_version,
    });
  } else if (current_version === final_version) {
    // check if new sheet and set abilities
    newSheet();
  }
};
// Versioning
on('sheet:opened', () => {
  // SET LATEST VERSION HERE. needs to be => the last update made in versionator
  const final_version = 1.69;
  getAttrs(['sheet_version', 'old_character'], (v) => {
    const output = {};
    let current_version = float(v.sheet_version);
    // prevent new sheets from stepping through versionator
    if (+v.old_character === 0 && current_version === 0) {
      // clog(`New Sheet:${v.old_character}`);
      current_version = final_version;
      output.sheet_version = final_version;
      setAttrs(output, {silent: true});
    }
    clog(`Current sheet data version:${current_version}, Sheet code version:${final_version}`);
    versionator(current_version, final_version);
  });
});

// Exceptional
on('change:abilities_info_show change:toggle_exceptional change:intelligence change:wisdom change:dexterity change:constitution change:charisma change:comeliness', (eventInfo) => {
  getAttrs(['intelligence', 'wisdom', 'dexterity', 'constitution', 'charisma', 'comeliness', 'toggle_exceptional'], (v) => {
    const output = {};
    const toggle_exceptional = +v.toggle_exceptional;
    if (toggle_exceptional === 1) return;
    output.exceptional_intelligence_flag = 1;
    output.exceptional_wisdom_flag = 1;
    output.exceptional_dexterity_flag = 1;
    output.exceptional_constitution_flag = 1;
    output.exceptional_charisma_flag = 1;
    output.exceptional_comeliness_flag = 1;
    setAttrs(output, {silent: true});
  });
});

on('change:abilities_info_show change:toggle_exceptional change:strength', (eventInfo) => {
  getAttrs(['strength'], (v) => {
    const output = {};
    output.exceptional_strength_flag = 1;
    setAttrs(output, {silent: true});
  });
});

// PC or NPC sheet role
on('change:is_npc', (eventInfo) => {
  getAttrs(['is_npc', 'toggle_npc'], (v) => {
    // clog(`Change Detected:${eventInfo.sourceAttribute}`);
    const output = {};
    const isNPC = +v.is_npc;
    let toggleNPC = +v.toggle_npc;
    toggleNPC = isNPC === 0 ? 0 : 1;
    output.toggle_npc = toggleNPC;
    setAttrs(output, {silent: true});
  });
});

const sumEquipmentCost = () => {
  getSectionIDs('repeating_equipment', (idArray) => {
    const output = {};
    const fields = [];
    _.each(idArray, (id) => {
      fields.push(section_attribute('equipment', id, 'equipment_quantity'));
      fields.push(section_attribute('equipment', id, 'equipment_cost'));
    });
    getAttrs(fields, (v) => {
      const equipmentCosts = [];
      _.each(idArray, (id) => {
        const quantity = +v[section_attribute('equipment', id, 'equipment_quantity')] || 0;
        let cost = +v[section_attribute('equipment', id, 'equipment_cost')] || 0;
        // costs
        cost = quantity > 0 ? cost * quantity : 0;
        equipmentCosts.push(cost);
      });
      const total_equipment_cost = equipmentCosts.reduce((sum, cost) => sum + cost, 0);
      output.total_equipment_cost = total_equipment_cost.toFixed(2);
      output.total_cost = total_equipment_cost.toFixed(2);
      setAttrs(output, {silent: true});
    });
  });
};

const sumEquipmentWeight = () => {
  getSectionIDs('repeating_equipment', (idArray) => {
    const output = {};
    const fields = [];
    _.each(idArray, (id) => {
      fields.push(section_attribute('equipment', id, 'equipment_type'));
      fields.push(section_attribute('equipment', id, 'equipment_armor_type'));
      fields.push(section_attribute('equipment', id, 'equipment_location'));
      fields.push(section_attribute('equipment', id, 'equipment_weight'));
      fields.push(section_attribute('equipment', id, 'equipment_quantity'));
      fields.push(section_attribute('equipment', id, 'equipment_carried'));
      fields.push(section_attribute('equipment', id, 'equipment_carried_select'));
    });
    getAttrs(['total_coin_weight', ...fields], (v) => {
      const weaponWeights = [];
      const armorWeights = [];
      const totalEquipmentWeights = [];
      _.each(idArray, (id) => {
        const type = +v[section_attribute('equipment', id, 'equipment_type')];
        // const armorType = +v[section_attribute('equipment', id, 'equipment_armor_type')];
        // const location = v[section_attribute('equipment', id, 'equipment_location')];
        // Weight calcs use equipment_carried
        let carried = 0;
        const carriedSelect = +v[section_attribute('equipment', id, 'equipment_carried_select')];
        output[section_attribute('equipment', id, 'equipment_carried')] = carriedSelect === 1 ? 1 : 0;
        carried = carriedSelect === 1 ? 1 : 0;
        const quantity = +v[section_attribute('equipment', id, 'equipment_quantity')] || 0;
        let weight = +v[section_attribute('equipment', id, 'equipment_weight')] || 0;
        let weaponWeight = 0;
        let armorWeight = 0;
        weight = weight * quantity * carried;
        if (type === 1) weaponWeight = weight;
        if (type === 2) armorWeight = weight;
        weaponWeights.push(weaponWeight);
        armorWeights.push(armorWeight);
        totalEquipmentWeights.push(weight);
      });
      const totalWeaponWeight = weaponWeights.reduce((sum, weaponWeight) => sum + weaponWeight, 0);
      const totalArmorWeight = armorWeights.reduce((sum, armorWeight) => sum + armorWeight, 0);
      const totalEquipmentWeight = totalEquipmentWeights.reduce((sum, weight) => sum + weight, 0);
      const total_equipment_weight_adjusted = totalEquipmentWeight - totalArmorWeight - totalWeaponWeight;
      // conversion for coin lbs weight outside this function
      const total_weight = Math.round(float(v.total_coin_weight) + float(totalEquipmentWeight));
      output.total_weapon_weight = totalWeaponWeight.toFixed(2);
      output.total_armor_weight = totalArmorWeight.toFixed(2);
      output.total_equipment_weight = totalEquipmentWeight.toFixed(2);
      output.total_equipment_weight_adjusted = total_equipment_weight_adjusted.toFixed(2);
      output.total_weight = total_weight;
      setAttrs(output, {silent: true});
    });
  });
};

// Equipment Cost Calcs
on('change:repeating_equipment:equipment_quantity change:repeating_equipment:equipment_cost remove:repeating_equipment', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  sumEquipmentCost();
});

// Equipment Weight Calcs
on(
  'change:repeating_equipment:equipment_weight change:repeating_equipment:equipment_quantity change:repeating_equipment:equipment_carried change:repeating_equipment:equipment_carried_select change:repeating_equipment:equipment_armor_worn change:total_coin_weight remove:repeating_equipment change:toggle_lbs',
  (eventInfo) => {
    // clog(`Change Detected:${eventInfo.sourceAttribute}`);
    sumEquipmentWeight();
  },
);

// Coin Weight
on('change:pp change:gp change:ep change:sp change:cp change:toggle_lbs', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  getAttrs(['pp', 'gp', 'ep', 'sp', 'cp', 'toggle_lbs'], (v) => {
    const lbsConversion = +(v.toggle_lbs || 0) ? 10 : 1;
    setAttrs({
      total_coin_weight: (Math.round((float(v.pp) + float(v.gp) + float(v.ep) + float(v.sp) + float(v.cp)) / 1) / lbsConversion).toFixed(2),
    });
  });
});

// Encumbrance Calcs
function setCurrentEncumbranceFlag() {
  getAttrs(['normal_load_adjusted', 'heavy_load', 'very_heavy_load', 'total_weight', 'autocalc_movement_flag', 'current_bulk', 'current_encumbrance_move'], (v) => {
    // clog('Current Encumbrance flag has been re-calculated');
    const output = {};
    const autocalc_movement_flag = +v.autocalc_movement_flag;
    const normal_load_adjusted = +v.normal_load_adjusted || 0;
    const heavy_load = +v.heavy_load || 0;
    const very_heavy_load = +v.very_heavy_load || 0;
    const total_weight = +v.total_weight || 0;
    const current_bulk = +v.current_bulk;
    let currentEncumbrance = 0;

    if (total_weight <= normal_load_adjusted) {
      output.current_encumbrance_label = 'Unencumbered';
      currentEncumbrance = 0;
      output.current_encumbrance = currentEncumbrance;
      // Bail out of IF unless auto-calc movement is enabled
      output.current_encumbrance_move = autocalc_movement_flag === 1 ? Math.max(currentEncumbrance, current_bulk) : v.current_encumbrance_move;
      // clog('===== Carrying Capacity is Unencumbered =====');
    } else if (total_weight > normal_load_adjusted && total_weight <= heavy_load) {
      output.current_encumbrance_label = 'Heavy';
      currentEncumbrance = 1;
      output.current_encumbrance = currentEncumbrance;
      // Bail out of IF unless auto-calc movement is enabled
      output.current_encumbrance_move = autocalc_movement_flag === 1 ? Math.max(currentEncumbrance, current_bulk) : v.current_encumbrance_move;
      // clog('===== Carrying Capacity is Heavy =====');
    } else if (total_weight > heavy_load && total_weight <= very_heavy_load) {
      output.current_encumbrance_label = 'Very Heavy';
      currentEncumbrance = 2;
      output.current_encumbrance = currentEncumbrance;
      // Bail out of IF unless auto-calc movement is enabled
      output.current_encumbrance_move = autocalc_movement_flag === 1 ? Math.max(currentEncumbrance, current_bulk) : v.current_encumbrance_move;
      // clog('===== Carrying Capacity is Very Heavy =====');
    } else {
      output.current_encumbrance_label = 'Encumbered';
      // no DEX Bonus to AC
      currentEncumbrance = 3;
      output.current_encumbrance = currentEncumbrance;
      // Bail out of IF unless auto-calc movement is enabled
      output.current_encumbrance_move = autocalc_movement_flag === 1 ? Math.max(currentEncumbrance, current_bulk) : v.current_encumbrance_move;
      // clog('===== Carrying Capacity is Encumbered =====');
    }
    setAttrs(output);
  });
}

on(
  'sheet:opened change:encumbrancebonus change:normal_load change:total_weight change:autocalc_movement_flag change:current_bulk change:encumbrancebonus_lbs change:toggle_lbs',
  (eventInfo) => {
    // clog(`Change Detected:${eventInfo.sourceAttribute}`);
    getAttrs(['encumbrancebonus', 'toggle_lbs'], (v) => {
      // clog('Encumbrance has been re-calculated');
      const output = {};
      const useLbs = +(v.toggle_lbs || 0);
      const lbsConversion = useLbs ? 0.1 : 1;
      const normal = 350 * lbsConversion;
      const encumbranceBonus = +v.encumbrancebonus || 0;
      const encumbranceBonusLbs = float(encumbranceBonus * lbsConversion);
      const thisBonus = useLbs ? encumbranceBonusLbs : encumbranceBonus;
      const normalAdjusted = normal + thisBonus;
      const heavy = normalAdjusted + normal;
      const veryHeavy = heavy + normal;
      const max = veryHeavy;
      output.encumbrancebonus_lbs = encumbranceBonusLbs;
      output.normal_load = normal;
      output.normal_load_adjusted = normalAdjusted;
      output.heavy_load = heavy;
      output.very_heavy_load = veryHeavy;
      output.max_load = max + 1;
      setAttrs(output, {silent: true}, setCurrentEncumbranceFlag);
    });
  },
);

// Movement Calcs
function setCurrentMovement() {
  getAttrs(['current_encumbrance_move', 'movement'], (v) => {
    // clog('Movement Rates have been re-calculated');
    const output = {};
    // only extract an integer from movement
    const movement = +v.movement.toString().replace(/[^0-9]/g, '');
    const current_encumbrance_move = +v.current_encumbrance_move;
    let adjustedMove = 0;
    if (current_encumbrance_move === 0) {
      adjustedMove = movement;
      // clog('=====Movement is Normal=====');
    } else if (current_encumbrance_move === 1) {
      adjustedMove = int(movement - 3);
      // clog('=====Movement is Heavy=====');
    } else if (current_encumbrance_move === 2) {
      adjustedMove = int(movement - 6);
      // clog('=====Movement is Very Heavy=====');
    } else {
      adjustedMove = int(movement - 9);
      // clog('=====Movement is Encumbered=====');
    }
    output.movement_normal = adjustedMove;
    output.movement_known = adjustedMove * 5;
    output.movement_run = adjustedMove * 10;
    setAttrs(output, {silent: true});
  });
}

on('change:movement change:current_encumbrance change:current_encumbrance_move change:autocalc_movement_flag', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  // clog('Current Base Movement has been re-calculated');
  getAttrs(['movement'], (v) => {
    const output = {};
    const recalc = 0;
    // only extract an integer from movement
    const movement = +v.movement.toString().replace(/[^0-9]/g, '');
    output.movement_heavy = Math.max(movement - 3, 0);
    output.movement_load = Math.max(movement - 6, 0);
    output.movement_max = Math.max(movement - 9, 0);
    setAttrs(output, {silent: true}, () => {
      setCurrentMovement();
      calcAC(recalc);
    });
  });
});

// Bulk Calcs
function setCurrentBulk() {
  getAttrs(
    ['unarmored_bulk', 'armortype_bulk', 'armortype2_bulk', 'armorshield_bulk', 'unarmored_worn', 'armortype_worn', 'armortype2_worn', 'armorshield_worn', 'armorshield_carried'],
    (v) => {
      const output = {};
      const {unarmored_worn} = v;
      const {armortype_worn} = v;
      const {armortype2_worn} = v;
      const {armorshield_worn} = v;
      const {armorshield_carried} = v;
      // shield bulk s/b considered even if it's just carried
      const armorShieldWornOrCarried = Math.max(armorshield_worn, armorshield_carried);
      const unarmored_bulk = v.unarmored_bulk * unarmored_worn;
      const armortype_bulk = v.armortype_bulk * armortype_worn;
      const armortype2_bulk = v.armortype2_bulk * armortype2_worn;
      const armorshield_bulk = v.armorshield_bulk * armorShieldWornOrCarried;
      const armorBulk = Math.max(unarmored_bulk, armortype_bulk, armortype2_bulk, armorshield_bulk);
      switch (armorBulk) {
        case 0:
          output.current_bulk_label = 'Not Bulky';
          output.current_bulk = 0;
          break;
        case 1:
          output.current_bulk_label = 'Not Bulky/Light';
          output.current_bulk = 0;
          break;
        case 2:
          output.current_bulk_label = 'Fairly/Moderate';
          output.current_bulk = 1;
          break;
        case 3:
          output.current_bulk_label = 'Bulky/Heavy';
          output.current_bulk = 2;
          break;
        default:
          clog(`>> failure in bulk calculation <<`);
      }
      setAttrs(output);
    },
  );
}

on(
  'change:unarmored_bulk change:armortype_bulk change:armortype2_bulk change:armorshield_bulk change:armorhelmet_bulk change:unarmored_worn change:armortype_worn change:armortype2_worn change:armorshield_worn change:armorhelmet_worn change:armorshield_carried remove:repeating_equipment',
  (eventInfo) => {
    // clog(`Change Detected:${eventInfo.sourceAttribute}`);
    setCurrentBulk();
  },
);

// type/carry should jump to follow selector unless set to Show All or matches the type/carry tab
// carried_select/carried sync are used for weight calcs
on(
  'change:repeating_equipment:equipment_carried_select change:repeating_equipment:equipment_type change:repeating_equipment:equipment_carried_select change:repeating_equipment:equipment_magical',
  (eventInfo) => {
    const id = eventInfo.sourceAttribute.split('_')[2];
    const source = `${eventInfo.sourceAttribute}`;
    const pattern = /equipment_type/; // parses the event text
    const isType = pattern.test(source); // boolean for equipment_type change
    const fields = [section_attribute('equipment', id, 'equipment_type'), section_attribute('equipment', id, 'equipment_carried_select')];
    getAttrs(['equipment_tabs_type', 'equipment_tabs_carry', ...fields], (v) => {
      const output = {};
      const carriedTab = +v.equipment_tabs_carry; // 1, 0, 2, -1
      const typeTab = +v.equipment_tabs_type; // 0, 1, 2, 3, 4, -1
      const thisType = +v[section_attribute('equipment', id, 'equipment_type')]; // 0, 1, 2, 3, 4
      const thisCarriedSelect = +v[section_attribute('equipment', id, 'equipment_carried_select')]; // 0, 1, 2
      // Weight calcs use equipment_carried so keep them synced
      output[section_attribute('equipment', id, 'equipment_carried')] = thisCarriedSelect === 1 ? 1 : 0;
      // jumps to equip type tab unless Show All or same equip type tab
      output.equipment_tabs_type = typeTab !== -1 && isType ? thisType : typeTab;
      // jumps to carry type tab unless Show All or same carry type tab
      output.equipment_tabs_carry = carriedTab === -1 || carriedTab === thisCarriedSelect ? -1 : thisCarriedSelect;
      setAttrs(output);
    });
  },
);

// Equipment Tabs hide/show Rows
on('change:equipment_tabs_type change:equipment_tabs_carry', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  getSectionIDs('repeating_equipment', (idArray) => {
    const fields = [];
    _.each(idArray, (id) => {
      fields.push(section_attribute('equipment', id, 'equipment_type'));
      fields.push(section_attribute('equipment', id, 'equipment_carried_select'));
      fields.push(section_attribute('equipment', id, 'equipment_magical'));
    });
    getAttrs(['equipment_tabs_type', 'equipment_tabs_carry', 'equipment_magical', ...fields], (v) => {
      const output = {};
      const typeTab = +v.equipment_tabs_type; // 0, 1, 2, 3, 4, -1
      const carriedTab = +v.equipment_tabs_carry; // 1, 0, 2, -1
      _.each(idArray, (id) => {
        const isMagical = +v[section_attribute('equipment', id, 'equipment_magical')]; // checkbox
        const thisType = +v[section_attribute('equipment', id, 'equipment_type')]; // 0, 1, 2, 3, 4
        const thisCarriedSelect = +v[section_attribute('equipment', id, 'equipment_carried_select')]; // 0, 1, 2
        // CSS to hide/show the repeating row based on typeTab and/or carriedTab
        if (typeTab === -1 || typeTab === thisType || (typeTab === 3 && isMagical)) {
          output[section_attribute('equipment', id, 'equipment_show_carry')] = carriedTab === -1 || carriedTab === thisCarriedSelect ? 1 : 0;
          return (output[section_attribute('equipment', id, 'equipment_show_type')] = 1);
        } else {
          output[section_attribute('equipment', id, 'equipment_show_carry')] = carriedTab === -1 || carriedTab === thisCarriedSelect ? 1 : 0;
          output[section_attribute('equipment', id, 'equipment_show_type')] = 0;
        }
      });
      setAttrs(output);
    });
  });
});

const removeEmptyArmorRows = () => {
  getSectionIDs('repeating_equipment', (idArray) => {
    const output = {};
    const fields = [];
    _.each(idArray, (id) => {
      fields.push(section_attribute('equipment', id, 'equipment_armor_type'));
    });
    getAttrs(fields, (v) => {
      generateArmorDetailsArray((armorDetailsArray) => {
        clog(`removeEmptyArmorRows - armorDetailsArray:`);
        console.log(armorDetailsArray);
        _.each(idArray, (id) => {
          // this id is the trigger
          const type = +v[`repeating_equipment_${id}_equipment_armor_type`];
          // Armor Type not selected
          if (type === 99) return;
          clog(`removeEmptyArmorRows - Armor Type:${type}`);
          // Find Armor Details row position where the id matches in armorDetailsArray
          const matchingIndices = armorDetailsArray
            .map((element, index) => {
              // Check if an array element is equal to the id
              if (element === id) {
                // If there's a match, return the corresponding Armor Details row number
                return `${Math.floor(index) + 1}`;
              }
              // If there's no match, return null
              return null;
            })
            .filter((index) => index !== null);
          // Do stuff only when there are multiple matches
          if (matchingIndices.length > 1) {
            rowType = type + 1; // aligns Armor type with actual the Actual Armor Details row
            clog(`removeEmptyArmorRows - matchingIndices: [${matchingIndices}] id:${id} type:${rowType}`);
            // Create a new array of Armor Details row index positions with multiple matches
            const indicesWithMultipleMatches = matchingIndices;
            // Convert indicesWithMultipleMatches array to a comma-separated string
            const indicesString = indicesWithMultipleMatches.join(',');
            // Create a new variable called "removeRows" with values that don't equal "rowType"
            const removeRows = indicesString.split(',').filter((value) => value !== String(rowType));
            // Log the resulting array (should only be a single match)
            clog(`removeEmptyArmorRows - matching rows: ${removeRows}`);
            // Further filter removeRows and save the value at index 0 to removeRow
            const removeRow = removeRows.length > 0 ? removeRows[0] : null;
            // Log the final result
            clog(`removeEmptyArmorRows - removeRow at index: ${removeRow}`);
            // Use removeRow to delete the old Armor Details row

            switch (removeRow) {
              case '1':
                output.unarmored = '';
                output.unarmored_worn = 0;
                output.unarmored_row_id = 0;
                clog(`>> DELETE/RESET ROW 0 - Unarmored <<`);
                break;
              case '2':
                output.armortype = '';
                output.armortype_worn = 0;
                output.armortype_row_id = 0;
                clog(`>> DELETE/RESET ROW 1 - Armor 1 <<`);
                break;
              case '3':
                output.armortype2 = '';
                output.armortype2_worn = 0;
                output.armortype2_row_id = 0;
                clog(`>> DELETE/RESET ROW 2 - Armor 2 <<`);
                break;
              case '4':
                output.armorshield = '';
                output.armorshield_worn = 0;
                output.armorshield_row_id = 0;
                clog(`>> DELETE/RESET ROW 3 - Shield <<`);
                break;
              case '5':
                output.armorhelmet = '';
                output.armorhelmet_worn = 0;
                output.armorhelmet_row_id = 0;
                clog(`>> DELETE/RESET ROW 4 - Helmet <<`);
                break;
              case '6':
                output.armorother = '';
                output.armorother_worn = 0;
                output.armorother_row_id = 0;
                clog(`>> DELETE/RESET ROW 5 - Other <<`);
                break;
              case '7':
                output.armorother2 = '';
                output.armorother2_worn = 0;
                output.armorother2_row_id = 0;
                clog(`>> DELETE/RESET ROW 6 - Other 2 <<`);
                break;
              case '8':
                output.armorother3 = '';
                output.armorother3_worn = 0;
                output.armorother3_row_id = 0;
                clog(`>> DELETE/RESET ROW 7 - Other 3 <<`);
                break;
              case '9':
                output.armorother4 = '';
                output.armorother4_worn = 0;
                output.armorother4_row_id = 0;
                clog(`>> DELETE/RESET ROW 8 - Other 4 <<`);
                break;
              case '10':
                output.armorother5 = '';
                output.armorother5_worn = 0;
                output.armorother5_row_id = 0;
                clog(`>> DELETE/RESET ROW 9 - Other 5 <<`);
                break;
              case '11':
                output.armorother6 = '';
                output.armorother6_worn = 0;
                output.armorother6_row_id = 0;
                clog(`>> DELETE/RESET ROW 10 - Other 6 <<`);
                break;
              default:
                clog(`>> NOTHING TO DELETE/RESET <<`);
            }
          }
        });
        setAttrs(output);
      });
    });
  });
};

// Changes in Armor Details
// IF this is a new row, add new repeating_equipment armor
// OR update existing synced row
const armorDetailslisteners = `${armorAttrs.map((stat) => `change:${stat}`).join(' ')}`;
on(armorDetailslisteners, (eventInfo) => {
  clog(`armorDetailslisteners - sourceType:${eventInfo.sourceType}`);
  if (eventInfo.sourceType === 'sheetworker') return;
  const attr = eventInfo.sourceAttribute;
  const attrPrev = eventInfo.previousValue;
  const attrNew = eventInfo.newValue;
  const row_removed = 0;
  clog(`armorDetailslisteners - ${attrPrev === undefined ? `Adding new repeating_equipment '${attr}': ${attrNew}.` : `Sync '${attr}' with existing repeating_equipment Armor.`}`);
  getAttrs(armorAttrs, (v) => {
    const output = {};
    let newID = '';
    if (attrPrev === undefined) {
      if (attr === 'unarmored') {
        // new name and NO id = CREATE NEW ROW
        newID = generateUniqueRowID();
        output.unarmored_row_id = newID.toLowerCase();
        output.unarmored_worn = 1;
        output[`repeating_equipment_${newID}_equipment_type`] = 2;
        output[`repeating_equipment_${newID}_equipment_armor_type`] = 0;
        output[`repeating_equipment_${newID}_equipment_armor_worn`] = 1;
        output[`repeating_equipment_${newID}_equipment_item`] = v.unarmored.trim();
        output[`repeating_equipment_${newID}_equipment_armor_ac`] = +v.unarmored_ac;
        output[`repeating_equipment_${newID}_equipment_armor_base`] = +v.unarmored_base;
        output[`repeating_equipment_${newID}_equipment_carried_select`] = 1;
        output[`repeating_equipment_${newID}_equipment_sync_armor_flag`] = 1;
        clog(`Creating a new repeating_equipment row for unarmored: ${newID}`);
      }
      if (attr === 'armortype') {
        // new name and NO id = CREATE NEW ROW
        newID = generateUniqueRowID();
        output.armortype1_row_id = newID.toLowerCase();
        output.armortype_worn = 1;
        output[`repeating_equipment_${newID}_equipment_type`] = 2;
        output[`repeating_equipment_${newID}_equipment_armor_type`] = 1;
        output[`repeating_equipment_${newID}_equipment_armor_worn`] = 1;
        output[`repeating_equipment_${newID}_equipment_item`] = v.armortype.trim();
        output[`repeating_equipment_${newID}_equipment_armor_ac`] = +v.armortype_ac;
        output[`repeating_equipment_${newID}_equipment_armor_base`] = +v.armortype_base;
        output[`repeating_equipment_${newID}_equipment_armor_magic`] = +v.armortype_magic || 0;
        output[`repeating_equipment_${newID}_equipment_armor_bulk`] = +v.armortype_bulk;
        output[`repeating_equipment_${newID}_equipment_carried_select`] = +v.armortype_carried;
        output[`repeating_equipment_${newID}_equipment_sync_armor_flag`] = 1;
        output[`repeating_equipment_${newID}_equipment_weight`] = +v.armor_weight || 0;
        output[`repeating_equipment_${newID}_equipment_cost`] = +v.armor_cost || 0;
        // clog(`Creating a new repeating_equipment row for armor1: ${newID}`);
      }
      if (attr === 'armortype2') {
        // new name and NO id = CREATE NEW ROW
        newID = generateUniqueRowID();
        output.armortype2_row_id = newID.toLowerCase();
        output.armortype2_worn = 1;
        output[`repeating_equipment_${newID}_equipment_type`] = 2;
        output[`repeating_equipment_${newID}_equipment_armor_type`] = 2;
        output[`repeating_equipment_${newID}_equipment_armor_worn`] = 1;
        output[`repeating_equipment_${newID}_equipment_item`] = v.armortype2.trim();
        output[`repeating_equipment_${newID}_equipment_armor_ac`] = +v.armortype2_ac;
        output[`repeating_equipment_${newID}_equipment_armor_base`] = +v.armortype2_base;
        output[`repeating_equipment_${newID}_equipment_armor_magic`] = +v.armortype2_magic || 0;
        output[`repeating_equipment_${newID}_equipment_armor_bulk`] = +v.armortype2_bulk;
        output[`repeating_equipment_${newID}_equipment_carried_select`] = +v.armortype2_carried;
        output[`repeating_equipment_${newID}_equipment_sync_armor_flag`] = 1;
        output[`repeating_equipment_${newID}_equipment_weight`] = +v.armortype2_weight || 0;
        output[`repeating_equipment_${newID}_equipment_cost`] = +v.armortype2_cost || 0;
        // clog(`Creating a new repeating_equipment row for armor2: ${newID}`);
      }
      if (attr === 'armorshield') {
        // new name and NO id = CREATE NEW ROW
        newID = generateUniqueRowID();
        output.armorshield_row_id = newID.toLowerCase();
        output.armorshield_worn = 1;
        output[`repeating_equipment_${newID}_equipment_type`] = 2;
        output[`repeating_equipment_${newID}_equipment_armor_type`] = 3;
        output[`repeating_equipment_${newID}_equipment_armor_worn`] = 1;
        output[`repeating_equipment_${newID}_equipment_item`] = v.armorshield.trim();
        output[`repeating_equipment_${newID}_equipment_armor_ac`] = +v.armorshield_ac;
        output[`repeating_equipment_${newID}_equipment_armor_base`] = +v.armorshield_base;
        output[`repeating_equipment_${newID}_equipment_armor_magic`] = +v.armorshield_magic || 0;
        output[`repeating_equipment_${newID}_equipment_armor_mod`] = +v.armorshield_mod || 0;
        output[`repeating_equipment_${newID}_equipment_armor_bulk`] = +v.armorshield_bulk;
        output[`repeating_equipment_${newID}_equipment_carried_select`] = +v.armorshield_carried;
        output[`repeating_equipment_${newID}_equipment_sync_armor_flag`] = 1;
        output[`repeating_equipment_${newID}_equipment_weight`] = +v.armorshield_weight || 0;
        output[`repeating_equipment_${newID}_equipment_cost`] = +v.armorshield_cost || 0;
        // clog(`Creating a new repeating_equipment row for shield: ${newID}`);
      }
      if (attr === 'armorhelmet') {
        // new name and NO id = CREATE NEW ROW
        newID = generateUniqueRowID();
        output.armorhelmet_row_id = newID.toLowerCase();
        output.armorhelmet_worn = 1;
        output[`repeating_equipment_${newID}_equipment_type`] = 2;
        output[`repeating_equipment_${newID}_equipment_armor_type`] = 4;
        output[`repeating_equipment_${newID}_equipment_armor_worn`] = 1;
        output[`repeating_equipment_${newID}_equipment_item`] = v.armorhelmet.trim();
        output[`repeating_equipment_${newID}_equipment_armor_ac`] = +v.armorhelmet_ac;
        output[`repeating_equipment_${newID}_equipment_armor_magic`] = +v.armorhelmet_magic || 0;
        output[`repeating_equipment_${newID}_equipment_carried_select`] = +v.armorhelmet_carried;
        output[`repeating_equipment_${newID}_equipment_sync_armor_flag`] = 1;
        output[`repeating_equipment_${newID}_equipment_weight`] = +v.armorhelmet_weight || 0;
        output[`repeating_equipment_${newID}_equipment_cost`] = +v.armorhelmet_cost || 0;
        // clog(`Creating a new repeating_equipment row for helmet: ${newID}`);
      }
      if (attr === 'armorother') {
        // new name and NO id = CREATE NEW ROW
        newID = generateUniqueRowID();
        output.armorother1_row_id = newID.toLowerCase();
        output.armorother1_worn = 1;
        output[`repeating_equipment_${newID}_equipment_type`] = 2;
        output[`repeating_equipment_${newID}_equipment_armor_type`] = 5;
        output[`repeating_equipment_${newID}_equipment_armor_worn`] = 1;
        output[`repeating_equipment_${newID}_equipment_item`] = v.armorother.trim();
        output[`repeating_equipment_${newID}_equipment_armor_ac`] = +v.armorother_ac;
        output[`repeating_equipment_${newID}_equipment_armor_base`] = +v.armorother_base;
        output[`repeating_equipment_${newID}_equipment_armor_magic`] = +v.armorother_magic || 0;
        output[`repeating_equipment_${newID}_equipment_armor_mod`] = +v.armorother_mod || 0;
        output[`repeating_equipment_${newID}_equipment_sync_armor_flag`] = 1;
        // clog(`Creating a new repeating_equipment row for other1: ${newID}`);
      }
      if (attr === 'armorother2') {
        // new name and NO id = CREATE NEW ROW
        newID = generateUniqueRowID();
        output.armorother2_row_id = newID.toLowerCase();
        output.armorother2_worn = 1;
        output[`repeating_equipment_${newID}_equipment_type`] = 2;
        output[`repeating_equipment_${newID}_equipment_armor_type`] = 6;
        output[`repeating_equipment_${newID}_equipment_armor_worn`] = 1;
        output[`repeating_equipment_${newID}_equipment_item`] = v.armorother2.trim();
        output[`repeating_equipment_${newID}_equipment_armor_ac`] = +v.armorother2_ac;
        output[`repeating_equipment_${newID}_equipment_armor_base`] = +v.armorother2_base;
        output[`repeating_equipment_${newID}_equipment_armor_magic`] = +v.armorother2_magic || 0;
        output[`repeating_equipment_${newID}_equipment_armor_mod`] = +v.armorother2_mod || 0;
        output[`repeating_equipment_${newID}_equipment_sync_armor_flag`] = 1;
        // clog(`Creating a new repeating_equipment row for other2: ${newID}`);
      }
      if (attr === 'armorother3') {
        // new name and NO id = CREATE NEW ROW
        newID = generateUniqueRowID();
        output.armorother3_row_id = newID.toLowerCase();
        output.armorother3_worn = 1;
        output[`repeating_equipment_${newID}_equipment_type`] = 2;
        output[`repeating_equipment_${newID}_equipment_armor_type`] = 7;
        output[`repeating_equipment_${newID}_equipment_armor_worn`] = 1;
        output[`repeating_equipment_${newID}_equipment_item`] = v.armorother3.trim();
        output[`repeating_equipment_${newID}_equipment_armor_ac`] = +v.armorother3_ac;
        output[`repeating_equipment_${newID}_equipment_armor_base`] = +v.armorother3_base;
        output[`repeating_equipment_${newID}_equipment_armor_magic`] = +v.armorother3_magic || 0;
        output[`repeating_equipment_${newID}_equipment_armor_mod`] = +v.armorother3_mod || 0;
        output[`repeating_equipment_${newID}_equipment_sync_armor_flag`] = 1;
        // clog(`Creating a new repeating_equipment row for other3: ${newID}`);
      }
      if (attr === 'armorother4') {
        // new name and NO id = CREATE NEW ROW
        newID = generateUniqueRowID();
        output.armorother4_row_id = newID.toLowerCase();
        output.armorother4_worn = 1;
        output[`repeating_equipment_${newID}_equipment_type`] = 2;
        output[`repeating_equipment_${newID}_equipment_armor_type`] = 8;
        output[`repeating_equipment_${newID}_equipment_armor_worn`] = 1;
        output[`repeating_equipment_${newID}_equipment_item`] = v.armorother4.trim();
        output[`repeating_equipment_${newID}_equipment_armor_ac`] = +v.armorother4_ac;
        output[`repeating_equipment_${newID}_equipment_armor_base`] = +v.armorother4_base;
        output[`repeating_equipment_${newID}_equipment_armor_magic`] = +v.armorother4_magic || 0;
        output[`repeating_equipment_${newID}_equipment_armor_mod`] = +v.armorother4_mod || 0;
        output[`repeating_equipment_${newID}_equipment_sync_armor_flag`] = 1;
        // clog(`Creating a new repeating_equipment row for other4: ${newID}`);
      }
      if (attr === 'armorother5') {
        // new name and NO id = CREATE NEW ROW
        newID = generateUniqueRowID();
        output.armorother5_row_id = newID.toLowerCase();
        output.armorother5_worn = 1;
        output[`repeating_equipment_${newID}_equipment_type`] = 2;
        output[`repeating_equipment_${newID}_equipment_armor_type`] = 9;
        output[`repeating_equipment_${newID}_equipment_armor_worn`] = 1;
        output[`repeating_equipment_${newID}_equipment_item`] = v.armorother5.trim();
        output[`repeating_equipment_${newID}_equipment_armor_ac`] = +v.armorother5_ac;
        output[`repeating_equipment_${newID}_equipment_armor_base`] = +v.armorother5_base;
        output[`repeating_equipment_${newID}_equipment_armor_magic`] = +v.armorother5_magic || 0;
        output[`repeating_equipment_${newID}_equipment_armor_mod`] = +v.armorother5_mod || 0;
        output[`repeating_equipment_${newID}_equipment_sync_armor_flag`] = 1;
        // clog(`Creating a new repeating_equipment row for other5: ${newID}`);
      }
      if (attr === 'armorother6') {
        // new name and NO id = CREATE NEW ROW
        newID = generateUniqueRowID();
        output.armorother6_row_id = newID.toLowerCase();
        output.armorother6_worn = 1;
        output[`repeating_equipment_${newID}_equipment_type`] = 2;
        output[`repeating_equipment_${newID}_equipment_armor_type`] = 10;
        output[`repeating_equipment_${newID}_equipment_armor_worn`] = 1;
        output[`repeating_equipment_${newID}_equipment_item`] = v.armorother6.trim();
        output[`repeating_equipment_${newID}_equipment_armor_ac`] = +v.armorother6_ac;
        output[`repeating_equipment_${newID}_equipment_armor_base`] = +v.armorother6_base;
        output[`repeating_equipment_${newID}_equipment_armor_magic`] = +v.armorother6_magic || 0;
        output[`repeating_equipment_${newID}_equipment_armor_mod`] = +v.armorother6_mod || 0;
        output[`repeating_equipment_${newID}_equipment_sync_armor_flag`] = 1;
        // clog(`Creating a new repeating_equipment row for other6: ${newID}`);
      }
    }
    // setAttrs(output, {silent: true});
    // syncArmorToEquipment(null, attr, row_removed);
    setAttrs(output, {silent: true}, () => {
      syncArmorToEquipment(null, attr, row_removed);
    });
  });
});

// sets Armor Details row from repeating_equipment
function fillArmorDetails(id, callback) {
  clog(`fillArmorDetails - id passed:${id}`);
  getAttrs(
    [
      `repeating_equipment_${id}_equipment_armor_type`,
      `repeating_equipment_${id}_equipment_item`,
      `repeating_equipment_${id}_equipment_armor_worn`,
      `repeating_equipment_${id}_equipment_armor_ac`,
      `repeating_equipment_${id}_equipment_armor_base`,
      `repeating_equipment_${id}_equipment_armor_magic`,
      `repeating_equipment_${id}_equipment_armor_mod`,
      `repeating_equipment_${id}_equipment_armor_bulk`,
      `repeating_equipment_${id}_equipment_carried_select`,
      `repeating_equipment_${id}_equipment_carried`,
      `repeating_equipment_${id}_equipment_weight`,
      `repeating_equipment_${id}_equipment_cost`,
    ],
    (v) => {
      const output = {};
      const recalc = 0;
      const type = +v[`repeating_equipment_${id}_equipment_armor_type`];
      const item = v[`repeating_equipment_${id}_equipment_item`];
      const worn = +v[`repeating_equipment_${id}_equipment_armor_worn`];
      const ac = +v[`repeating_equipment_${id}_equipment_armor_ac`];
      const base = +v[`repeating_equipment_${id}_equipment_armor_base`];
      const magic = +v[`repeating_equipment_${id}_equipment_armor_magic`] || 0;
      const mod = +v[`repeating_equipment_${id}_equipment_armor_mod`] || 0;
      const bulk = +v[`repeating_equipment_${id}_equipment_armor_bulk`];
      let carriedSelect = +v[`repeating_equipment_${id}_equipment_carried_select`];
      const weight = +v[`repeating_equipment_${id}_equipment_weight`] || 0;
      const cost = +v[`repeating_equipment_${id}_equipment_cost`] || 0;
      // armor in use ie 'worn', should always be considered as carried
      if (worn === 1) {
        carriedSelect = 1;
        output[`repeating_equipment_${id}_equipment_carried_select`] = 1;
        // clog(`armor is worn: so armor is carried`);
      } else if (worn === 0 && (carriedSelect === 0 || carriedSelect === 2)) {
        output[`repeating_equipment_${id}_equipment_carried_select`] = carriedSelect;
        // clog(`armor is not worn: so armor is not carried or on mount.`);
      }
      const thisLog = [
        `fillArmorDetails - id:${id} item:${item} type:${type} worn:${worn} ac:${ac} base:${base} magic:${magic} mod:${mod} bulk:${bulk} carried:${carriedSelect} weight:${weight} cost:${cost} UPDATED:`,
      ];
      switch (type) {
        case 99:
          clog(`Choose an armor row.`);
          break;
        case 0:
          clog(`${thisLog}Unarmored`);
          output.unarmored_worn = worn;
          output.unarmored = item;
          output.unarmored_ac = ac;
          output.unarmored_base = base;
          output.unarmored_bulk = bulk;
          // unarmored is always "in use" but is hidden attr,
          // but should be able to drop clothing ie swim, sleep, etc.
          output.unarmored_carried = carriedSelect;
          output.unarmored_row_id = id;
          break;
        case 1:
          clog(`${thisLog}Armor 1`);
          output.armortype_worn = worn;
          output.armortype = item;
          output.armortype_ac = ac;
          output.armortype_base = base;
          output.armortype_magic = magic;
          output.armortype_bulk = bulk;
          output.armortype_carried = carriedSelect;
          output.armor_weight = weight;
          output.armor_cost = cost;
          output.armortype1_row_id = id;
          break;
        case 2:
          clog(`${thisLog}Armor 2`);
          output.armortype2_worn = worn;
          output.armortype2 = item;
          output.armortype2_ac = ac;
          output.armortype2_base = base;
          output.armortype2_magic = magic;
          output.armortype2_bulk = bulk;
          output.armortype2_carried = carriedSelect;
          output.armortype2_weight = weight;
          output.armortype2_cost = cost;
          output.armortype2_row_id = id;
          break;
        case 3:
          clog(`${thisLog}Shield`);
          output.armorshield_worn = worn;
          output.armorshield = item;
          output.armorshield_ac = ac >= 0 ? 0 : -Math.abs(ac);
          output.armorshield_base = base >= 0 ? 0 : -Math.abs(base);
          output.armorshield_magic = magic;
          output.armorshield_mod = mod;
          output.armorshield_bulk = bulk;
          output.armorshield_carried = carriedSelect;
          output.armorshield_weight = weight;
          output.armorshield_cost = cost;
          output.armorshield_row_id = id;
          break;
        case 4:
          clog(`${thisLog}Helmet`);
          output.armorhelmet_worn = worn;
          output.armorhelmet = item;
          output.armorhelmet_base = base;
          output.armorhelmet_magic = magic;
          output.armorhelmet_carried = carriedSelect;
          output.armorhelmet_weight = weight;
          output.armorhelmet_cost = cost;
          output.armorhelmet_row_id = id;
          break;
        case 5:
          clog(`${thisLog}Other`);
          output.armorother_worn = worn;
          output.armorother = item;
          output.armorother_ac = ac;
          output.armorother_base = base;
          output.armorother_magic = magic;
          output.armorother_mod = mod;
          output.armorother1_row_id = id;
          break;
        case 6:
          clog(`${thisLog}Other 2`);
          output.armorother2_worn = worn;
          output.armorother2 = item;
          output.armorother2_ac = ac >= 0 ? 0 : -Math.abs(ac);
          output.armorother2_base = base >= 0 ? 0 : -Math.abs(base);
          output.armorother2_magic = magic;
          output.armorother2_mod = mod;
          output.armorother2_row_id = id;
          break;
        case 7:
          clog(`${thisLog}Other 3`);
          output.armorother3_worn = worn;
          output.armorother3 = item;
          output.armorother3_ac = ac >= 0 ? 0 : -Math.abs(ac);
          output.armorother3_base = base >= 0 ? 0 : -Math.abs(base);
          output.armorother3_magic = magic;
          output.armorother3_mod = mod;
          output.armorother3_row_id = id;
          break;
        case 8:
          clog(`${thisLog}Other 4`);
          output.armorother4_worn = worn;
          output.armorother4 = item;
          output.armorother4_ac = ac >= 0 ? 0 : -Math.abs(ac);
          output.armorother4_base = base >= 0 ? 0 : -Math.abs(base);
          output.armorother4_magic = magic;
          output.armorother4_mod = mod;
          output.armorother4_row_id = id;
          break;
        case 9:
          clog(`${thisLog}Other 5`);
          output.armorother5_worn = worn;
          output.armorother5 = item;
          output.armorother5_ac = ac >= 0 ? 0 : -Math.abs(ac);
          output.armorother5_base = base >= 0 ? 0 : -Math.abs(base);
          output.armorother5_magic = magic;
          output.armorother5_mod = mod;
          output.armorother5_row_id = id;
          break;
        case 10:
          clog(`${thisLog}Other 6`);
          output.armorother6_worn = worn;
          output.armorother6 = item;
          output.armorother6_ac = ac >= 0 ? 0 : -Math.abs(ac);
          output.armorother6_base = base >= 0 ? 0 : -Math.abs(base);
          output.armorother6_magic = magic;
          output.armorother6_mod = mod;
          output.armorother6_row_id = id;
          break;
        default:
          clog(`Armor row is out of range.`);
      }
      // Once done, call the provided callback
      if (callback) callback();
      setAttrs(output, () => {
        calcAC(recalc);
      });
    },
  );
}

function createAttack(id) {
  const output = {};
  getAttrs(
    [
      `repeating_equipment_${id}_equipment_item`,
      `repeating_equipment_${id}_equipment_weapon_type`,
      `repeating_equipment_${id}_equipment_weapon_speed`,
      `repeating_equipment_${id}_equipment_weapon_length`,
      `repeating_equipment_${id}_equipment_weapon_space`,
      `repeating_equipment_${id}_equipment_weapon_misc`,
      `repeating_equipment_${id}_equipment_weapon_damagesmallmedium`,
      `repeating_equipment_${id}_equipment_weapon_damagelarge`,
      `repeating_equipment_${id}_equipment_weapon_attackdmgtype`,
      `repeating_equipment_${id}_equipment_weapon_rateoffire`,
      `repeating_equipment_${id}_equipment_weapon_range`,
      `repeating_equipment_${id}_equipment_quantity`,
      `repeating_equipment_${id}_equipment_description`,
    ],
    (v) => {
      const newID = generateUniqueRowID();
      // clog(`Creating a new attack newID:${newID}`);
      output[`repeating_weapon_${newID}_weapon_name`] = v[`repeating_equipment_${id}_equipment_item`];
      output[`repeating_weapon_${newID}_weapon_type`] = +v[`repeating_equipment_${id}_equipment_weapon_type`];
      output[`repeating_weapon_${newID}_weapon_speed`] = v[`repeating_equipment_${id}_equipment_weapon_speed`];
      output[`repeating_weapon_${newID}_weapon_length`] = v[`repeating_equipment_${id}_equipment_weapon_length`];
      output[`repeating_weapon_${newID}_weapon_space`] = v[`repeating_equipment_${id}_equipment_weapon_space`];
      output[`repeating_weapon_${newID}_weapon_misc`] = v[`repeating_equipment_${id}_equipment_weapon_misc`];
      output[`repeating_weapon_${newID}_weapon_damagesmallmedium`] = v[`repeating_equipment_${id}_equipment_weapon_damagesmallmedium`];
      output[`repeating_weapon_${newID}_weapon_damagelarge`] = v[`repeating_equipment_${id}_equipment_weapon_damagelarge`];
      output[`repeating_weapon_${newID}_weapon_attackdmgtype`] = v[`repeating_equipment_${id}_equipment_weapon_attackdmgtype`];
      output[`repeating_weapon_${newID}_weapon_rateoffire`] = v[`repeating_equipment_${id}_equipment_weapon_rateoffire`];
      output[`repeating_weapon_${newID}_weapon_range`] = v[`repeating_equipment_${id}_equipment_weapon_range`];
      output[`repeating_weapon_${newID}_weapon_quantity`] = +v[`repeating_equipment_${id}_equipment_quantity`] || 0;
      output[`repeating_weapon_${newID}_weapon_notes`] = v[`repeating_equipment_${id}_equipment_description`];
      // set new row with equip values then set attack defaults and damage macros
      setAttrs(output, {silent: true}, setWeapons(id), damageMacro(newID));
    },
  );
}

function generateArmorDetailsArray(callback) {
  getAttrs(armorRowIDs, (v) => {
    const unarmored0_ID = v.unarmored_row_id.toString();
    const armortype1_ID = v.armortype1_row_id.toString();
    const armortype2_ID = v.armortype2_row_id.toString();
    const armorshield_ID = v.armorshield_row_id.toString();
    const armorhelmet_ID = v.armorhelmet_row_id.toString();
    const armorother1_ID = v.armorother1_row_id.toString();
    const armorother2_ID = v.armorother2_row_id.toString();
    const armorother3_ID = v.armorother3_row_id.toString();
    const armorother4_ID = v.armorother4_row_id.toString();
    const armorother5_ID = v.armorother5_row_id.toString();
    const armorother6_ID = v.armorother6_row_id.toString();
    const idArray = [
      unarmored0_ID,
      armortype1_ID,
      armortype2_ID,
      armorshield_ID,
      armorhelmet_ID,
      armorother1_ID,
      armorother2_ID,
      armorother3_ID,
      armorother4_ID,
      armorother5_ID,
      armorother6_ID,
    ].map((str) => (str ? str.toString().toLowerCase() : '0'));
    // Check if callback is a function before calling it
    if (typeof callback === 'function') {
      callback(idArray);
    }
  });
}

// checks repeating_equipment id against Armor Detail's ids
function testArmorRowIDs(id, callback) {
  generateArmorDetailsArray((idArray) => {
    let isMatch = '';
    isMatch = idArray.includes(id) ? 1 : 0;
    clog(`testArmorRowIDs - isMatch?: ${isMatch} for id:${id}\n ${!isMatch ? 'No match found in armorDetailsArray' : 'Match found in armorDetailsArray:'}`);
    // Check if callback is a function before calling it
    if (typeof callback === 'function') {
      callback(isMatch, idArray);
    }
  });
}

armorDetailsRowidArray = (id) => {
  const output = {};
  // Pass a callback function to handle armorDetailsArray
  testArmorRowIDs(id, (result, armorDetailsArray) => {
    output.armordetails_array = [`${armorDetailsArray}`];
    clog(`armorDetailsRowidArray - id:${id}`);
    setAttrs(output, {silent: true}, () => {
      generateArmorDetailsArray((idArray) => {
        console.log(`armorDetailsRowidArray - has been updated.`);
        console.log(idArray);
      });
    });
  });
};

// ensures armordetails_array stays updated when the ids change
const updateArrayEventListener = `${armorRowIDs.map((stat) => `change:${stat}`).join(' ')}`;
on(updateArrayEventListener, (eventInfo) => {
  const attr = eventInfo.sourceAttribute;
  console.log(`updateArrayEventListener - ARMOR DETAILS ARRAY HAS CHANGED attr:${attr} sourceType: ${eventInfo.sourceType}`);
  // if (eventInfo.sourceType === 'sheetworker') return;
  getAttrs([`${attr}`, 'armordetails_array'], (v) => {
    const id = v[`${eventInfo.sourceAttribute}`];
    console.log(`updateArrayEventListener - source type: ${eventInfo.sourceType} id:${id} UPDATING armordetails_array...`);
    armorDetailsRowidArray(id);
  });
});

// sync/update Armor Details when repeating_equipment armor changes
on(
  'change:repeating_equipment:equipment_item change:repeating_equipment:equipment_armor_worn change:repeating_equipment:equipment_armor_ac change:repeating_equipment:equipment_armor_base change:repeating_equipment:equipment_armor_magic change:repeating_equipment:equipment_armor_mod change:repeating_equipment:equipment_armor_bulk change:repeating_equipment:equipment_carried_select change:repeating_equipment:equipment_weight change:repeating_equipment:equipment_cost',
  (eventInfo) => {
    const id = eventInfo.sourceAttribute.split('_')[2].toLowerCase();
    if (eventInfo.sourceType === 'sheetworker') return;
    clog(`Δ detected - ${eventInfo.sourceAttribute}`);
    // checks repeating_equipment id against armor details ids
    testArmorRowIDs(id, (result) => {
      if (result) {
        clog(`callback from testArmorRowIDs - id:${id} found in armordetails_array`);
        fillArmorDetails(id);
      }
    });
  },
);

// sync armor button - fill armor details row with repeating attr values
// IF the row already exists, but is then moved to a new row,
// removeEmptyArmorRows will test for duplicates and reset old row
on('clicked:repeating_equipment:addarmor change:repeating_equipment:equipment_armor_type', (eventInfo) => {
  const id = eventInfo.sourceAttribute.split('_')[2].toLowerCase();
  const trigger = eventInfo.sourceAttribute.split('_').slice(3).join('_').toLowerCase();
  getAttrs([`repeating_equipment_${id}_equipment_armor_type`, `repeating_equipment_${id}_equipment_sync_armor_flag`], (v) => {
    const output = {};
    const synced = +v[`repeating_equipment_${id}_equipment_sync_armor_flag`];
    const type = +v[`repeating_equipment_${id}_equipment_armor_type`];
    clog(`${trigger} - id:${id} type:${type} synced:${synced}`);
    if (trigger === 'addarmor' && type !== 99) {
      // callback to run removeEmptyArmorRows()
      fillArmorDetails(id, () => {
        removeEmptyArmorRows();
      });
      output[`repeating_equipment_${id}_equipment_sync_armor_flag`] = 1;
    }
    if (trigger === 'equipment_armor_type' && synced === 1) {
      // callback to run removeEmptyArmorRows()
      fillArmorDetails(id, () => {
        removeEmptyArmorRows();
      });
    }
    setAttrs(output, {silent: true});
  });
});

on('clicked:repeating_equipment:addattack', (eventInfo) => {
  const id = eventInfo.sourceAttribute.split('_')[2];
  createAttack(id);
});

// resets the matching Armor Detail row attributes if removed
on('remove:repeating_equipment', (eventInfo) => {
  const id = eventInfo.sourceAttribute.split('_')[2].toLowerCase();
  const row_removed = 1;
  console.log({event: 'remove:repeating_equipment', eventInfo, id});
  // Pass a callback function to handle the result and armorDetailsArray
  testArmorRowIDs(id, (result) => {
    if (result) {
      syncArmorToEquipment(id, null, row_removed);
    }
  });
});

on('clicked:addturnundead', (eventInfo) => {
  const output = {};
  const newID = generateUniqueRowID();
  output[`repeating_ability_${newID}_ability_name`] = 'Turn Undead by Type';
  output[`repeating_ability_${newID}_ability_short_description`] = '[Turn Undead by Type](~selected|turn_undead_roll)';
  setAttrs(output, {silent: true});
});

on('clicked:addturnundead2', (eventInfo) => {
  const output = {};
  const newID = generateUniqueRowID();
  output[`repeating_ability_${newID}_ability_name`] = 'Turn Undead by HD';
  output[`repeating_ability_${newID}_ability_short_description`] = '[Turn Undead by HD](~selected|turn_undead2_roll)';
  setAttrs(output, {silent: true});
});

// Spell Tabs and Memorized toggle
on('change:spell_tabs change:toggle_show_memorized change:spell_caster_tabs change:toggle_caster2', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  getSectionIDs('repeating_spells', (idArray) => {
    const fields = [];
    _.each(idArray, (id) => {
      fields.push(section_attribute('spells', id, 'spell_memorized'));
      fields.push(section_attribute('spells', id, 'spell_show_all'));
      fields.push(section_attribute('spells', id, 'spell_level'));
      fields.push(section_attribute('spells', id, 'spell_caster_class'));
    });
    getAttrs(['spell_tabs', 'toggle_show_memorized', 'spell_caster_tabs', 'toggle_caster2', ...fields], (v) => {
      const output = {};
      const memorizedOnly = +v.toggle_show_memorized;
      const casterTab = +v.spell_caster_tabs; // -1, 0, 1
      const hideCaster2 = +v.toggle_caster2;
      const levelTab = +v.spell_tabs;
      _.each(idArray, (id) => {
        const thisMemorizedOnly = +v[section_attribute('spells', id, 'spell_memorized')] || 0;
        const thisCaster = +v[section_attribute('spells', id, 'spell_caster_class')]; // 0, 1, 2
        const thisLevel = +v[section_attribute('spells', id, 'spell_level')] || 0;
        output[section_attribute('spells', id, 'spell_show_memorized')] = memorizedOnly === 1 && thisMemorizedOnly > 0 ? 1 : 0;
        output[section_attribute('spells', id, 'spell_show_all')] = memorizedOnly === 1 ? 0 : 1;
        // show THIS spell if spell level and spell tab match
        if (levelTab === -1 || levelTab === thisLevel) {
          // one caster: ignore caster tabs and show THIS spell
          if (hideCaster2 === 1) {
            output[section_attribute('spells', id, 'spell_show')] = 1;
            // multi-caster: continue using caster tabs
          } else if (hideCaster2 === 0) {
            // caster tab is All or spell class is 'n/a': show THIS spell
            if (casterTab === -1 || thisCaster === 0) {
              output[section_attribute('spells', id, 'spell_show')] = 1;
              // caster tab is caster1 and spell is caster1: show THIS spell
            } else if (casterTab === 0 && thisCaster === 1) {
              output[section_attribute('spells', id, 'spell_show')] = 1;
              // caster tab is caster2 and spell is caster2: show THIS spell
            } else if (casterTab === 1 && thisCaster === 2) {
              output[section_attribute('spells', id, 'spell_show')] = 1;
              // hide THIS spell
            } else {
              output[section_attribute('spells', id, 'spell_show')] = 0;
            }
          }
          // hide THIS spell if it does not match spell level tab selected
        } else {
          output[section_attribute('spells', id, 'spell_show')] = 0;
        }
      });
      setAttrs(output);
    });
  });
});

// Spell Tabs level change sync
on('change:repeating_spells:spell_level change:repeating_spells:spell_caster_class', (eventInfo) => {
  // test if API is creating the repeating row and bail
  if (eventInfo.sourceType !== 'player') return;
  getAttrs(['repeating_spells_spell_level', 'repeating_spells_spell_caster_class', 'spell_caster_tabs', 'spell_tabs'], (v) => {
    const output = {};
    const casterTab = +v.spell_caster_tabs; // 0, 1, -1
    const thisCaster = +v.repeating_spells_spell_caster_class; // 0, 1, 2
    const levelTab = +v.spell_tabs;
    const thisLevel = v.repeating_spells_spell_level;
    // jumps to spell level tab unless Show All or same level tab
    output.spell_tabs = levelTab >= 0 && levelTab !== thisLevel ? thisLevel : levelTab;
    // jumps to caster class tab unless Show All or same caster tab
    output.spell_caster_tabs = casterTab !== -1 && thisCaster <= 1 ? 0 : 1;
    setAttrs(output);
  });
});

setSpellsCasterClass = () => {
  getSectionIDs('repeating_spells', (idArray) => {
    const output = {};
    const nonRep = ['caster_class1_name', 'caster_class2_name', 'caster_class1_level', 'caster_class2_level'];
    const fields = [];
    _.each(idArray, (id) => {
      fields.push(section_attribute('spells', id, 'spell_caster_class'));
    });
    const combined = [...nonRep, ...fields];
    getAttrs(combined, (v) => {
      _.each(idArray, (id) => {
        const thisClass = +v[section_attribute('spells', id, 'spell_caster_class')];
        if (thisClass === 0) {
          output[section_attribute('spells', id, 'spell_caster_class_name')] = '';
          output[section_attribute('spells', id, 'spell_caster_class')] = thisClass;
          // clog(`thisClass 0:${thisClass}`);
        } else if (thisClass === 1) {
          output[section_attribute('spells', id, 'spell_caster_class_name')] = v.caster_class1_name;
          output[section_attribute('spells', id, 'spell_caster_class_level')] = +v.caster_class1_level || 0;
          output[section_attribute('spells', id, 'spell_caster_class')] = thisClass;
          // clog(`thisClass 1:${thisClass}`);
        } else if (thisClass === 2) {
          output[section_attribute('spells', id, 'spell_caster_class_name')] = v.caster_class2_name;
          output[section_attribute('spells', id, 'spell_caster_class_level')] = +v.caster_class2_level || 0;
          output[section_attribute('spells', id, 'spell_caster_class')] = thisClass;
          // clog(`thisClass 2:${thisClass}`);
        }
      });
      setAttrs(output, {silent: true});
    });
  });
};

// Update ALL Spells to match new Caster and/or Level
on('change:caster_class1_name change:caster_class2_name change:caster_class1_level change:caster_class2_level', (eventInfo) => {
  // clog(`spell changed by who:${eventInfo.sourceType}`);
  setSpellsCasterClass();
});

// Set Caster Class and level for THIS Spell based on Caster Tab
on('change:repeating_spells:spell_name change:repeating_spells:spell_caster_class', (eventInfo) => {
  // console.log(`sourceType:${eventInfo.sourceType}`);
  // test if API is creating the repeating row and bail
  if (eventInfo.sourceType !== 'player') return;
  const previousValue = eventInfo.previousValue;
  const trigger = eventInfo.sourceAttribute.split('_').slice(3).join('_');
  const id = eventInfo.sourceAttribute.split('_')[2];
  const newSpell = previousValue === undefined && trigger === 'spell_name' ? 1 : 0;
  getAttrs(
    ['repeating_spells_spell_caster_class', 'caster_class1_name', 'caster_class1_level', 'caster_class2_name', 'caster_class2_level', 'spell_caster_tabs', 'toggle_caster2'],
    (v) => {
      const output = {};
      const caster2 = +v.toggle_caster2;
      const casterTab = +v.spell_caster_tabs; // 0, 1, -1
      let thisClass = +v[section_attribute('spells', id, 'spell_caster_class')]; // 0, 1, 2
      console.log(`Change detected:PRE-CHECK Hide Caster2:${caster2} CasterTab:${casterTab} thisClass:${thisClass}`);
      // Caster Class 2 is enabled
      if (caster2 === 0) {
        // test for New and not on All tab
        if (newSpell === 1 && casterTab !== -1) thisClass = casterTab === 0 ? 1 : 2;
      } else {
        thisClass = 1;
      }
      console.log(`Change detected:POST-CHECK Hide Caster2:${caster2} CasterTab:${casterTab} thisClass:${thisClass}`);
      if (thisClass === 0) {
        output[section_attribute('spells', id, 'spell_caster_class_name')] = '';
        output[section_attribute('spells', id, 'spell_caster_class')] = thisClass;
      } else if (thisClass === 1) {
        output[section_attribute('spells', id, 'spell_caster_class_name')] = v.caster_class1_name;
        output[section_attribute('spells', id, 'spell_caster_class_level')] = +v.caster_class1_level || 0;
        output[section_attribute('spells', id, 'spell_caster_class')] = thisClass;
      } else if (thisClass === 2) {
        output[section_attribute('spells', id, 'spell_caster_class_name')] = v.caster_class2_name;
        output[section_attribute('spells', id, 'spell_caster_class_level')] = +v.caster_class2_level || 0;
        output[section_attribute('spells', id, 'spell_caster_class')] = thisClass;
      }
      setAttrs(output, {silent: true});
    },
  );
});

// Set Spell's Level for new spells based selected Spell level Tab
on('change:repeating_spells:spell_name', (eventInfo) => {
  // console.log(`sourceType:${eventInfo.sourceType}`);
  // test if API is creating the repeating row and bail
  if (eventInfo.sourceType !== 'player') return;
  const id = eventInfo.sourceAttribute.split('_')[2];
  getAttrs([`repeating_spells_${id}_spell_level`, 'spell_tabs'], (v) => {
    const output = {};
    const levelTab = +v.spell_tabs;
    const thisSpellLevel = v[section_attribute('spells', id, 'spell_level')] || 0;
    // console.log(`Change detected: [Setting Spell Level based on Spell Tab] SpellTab:${levelTab} ThisSpellLvl:${thisSpellLevel}`);
    // test if Spell Tab is set to 'All' or if this Spell's Lvl has already been set
    if (levelTab === -1 || thisSpellLevel != '?') return;
    output[`repeating_spells_${id}_spell_level`] = levelTab;
    setAttrs(output, {silent: true});
  });
});

// ToHitACadj Toggle
on(
  'change:repeating_weapon:weapon_tohitacadj_flag change:repeating_weapon:weapon_thac_adj0 change:repeating_weapon:weapon_thac_adj1 change:repeating_weapon:weapon_thac_adj2 change:repeating_weapon:weapon_thac_adj3 change:repeating_weapon:weapon_thac_adj4 change:repeating_weapon:weapon_thac_adj5 change:repeating_weapon:weapon_thac_adj6 change:repeating_weapon:weapon_thac_adj7 change:repeating_weapon:weapon_thac_adj8 change:repeating_weapon:weapon_thac_adj9 change:repeating_weapon:weapon_thac_adj10',
  (eventInfo) => {
    // clog(`Change Detected:${eventInfo.sourceAttribute}`);
    getAttrs(['repeating_weapon_weapon_ToHitACadj_flag', 'repeating_weapon_weapon_ToHitACadj'], (v) => {
      const output = {};
      const thisflag = +v.repeating_weapon_weapon_ToHitACadj_flag;
      output.repeating_weapon_weapon_ToHitACadj =
        thisflag === 1
          ? '{{ToHitACadj2to10=HitAdj:[[ @{weapon_thac_adj0} ]]|[[ @{weapon_thac_adj1} ]]|[[ @{weapon_thac_adj2} ]]|[[ @{weapon_thac_adj3} ]]|[[ @{weapon_thac_adj4} ]]|[[ @{weapon_thac_adj5} ]]|[[ @{weapon_thac_adj6} ]]|[[ @{weapon_thac_adj7} ]]|[[ @{weapon_thac_adj8} ]]|[[ @{weapon_thac_adj9} ]]|[[ @{weapon_thac_adj10} ]] }}'
          : '{{ToHitACadj2to10}}';
      setAttrs(output, {silent: true});
    });
  },
);

// Matrix or THAC0 Toggle for repeating_weapon
on('change:toggle_to_hit_table change:repeating_weapon:weapon_name change:repeating_weapon:weapon_whisper_to_hit_select', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  getSectionIDs('repeating_weapon', (idArray) => {
    const fields = [];
    _.each(idArray, (id) => {
      fields.push(`repeating_weapon_${id}_weapon_whisper_to_hit_select`);
      fields.push(`repeating_weapon_${id}_weapon_whisper_to_hit`);
    });
    getAttrs(['toggle_to_hit_table', ...fields], (v) => {
      const output = {};
      const flag = +v.toggle_to_hit_table;

      _.each(idArray, (id) => {
        let thishitTableSelect = +v[`repeating_weapon_${id}_weapon_whisper_to_hit_select`];
        let thishitTableMacro = v[`repeating_weapon_${id}_weapon_whisper_to_hit`];
        const noMacro = '&nbsp;';
        const matrixMacro =
          '%NEWLINE%/w gm &{template:attacks-table} {{color=@{color_option}}} {{ToHitAC-10to0=ToHit:[[ @{thac-10} ]]|[[ @{thac-9} ]]|[[ @{thac-8} ]]|[[ @{thac-7} ]]|[[ @{thac-6} ]]|[[ @{thac-5} ]]|[[ @{thac-4} ]]|[[ @{thac-3} ]]|[[ @{thac-2} ]]|[[ @{thac-1} ]]|[[ @{thac0} ]]}} {{ToHitAC1to10=ToHit:[[ @{thac0} ]]|[[ @{thac1} ]]|[[ @{thac2} ]]|[[ @{thac3} ]]|[[ @{thac4} ]]|[[ @{thac5} ]]|[[ @{thac6} ]]|[[ @{thac7} ]]|[[ @{thac8} ]]|[[ @{thac9} ]]|[[ @{thac10} ]] }}';
        const thac0Macro =
          '%NEWLINE%/w gm &{template:attacks-table} {{color=@{color_option}}} {{ToHitAC-10to0=ToHit:[[ @{thac0-10} ]]|[[ @{thac0-9} ]]|[[ @{thac0-8} ]]|[[ @{thac0-7} ]]|[[ @{thac0-6} ]]|[[ @{thac0-5} ]]|[[ @{thac0-4} ]]|[[ @{thac0-3} ]]|[[ @{thac0-2} ]]|[[ @{thac0-1} ]]|[[ @{thac00} ]]}} {{ToHitAC1to10=ToHit:[[ @{thac00} ]]|[[ @{thac01} ]]|[[ @{thac02} ]]|[[ @{thac03} ]]|[[ @{thac04} ]]|[[ @{thac05} ]]|[[ @{thac06} ]]|[[ @{thac07} ]]|[[ @{thac08} ]]|[[ @{thac09} ]]|[[ @{thac010} ]] }}';

        if (thishitTableSelect === 2) {
          thishitTableMacro = noMacro;
          thishitTableSelect = 2;
        } else if (thishitTableSelect === 0) {
          if (flag === 0) {
            thishitTableMacro = matrixMacro;
            thishitTableSelect = 0;
          } else if (flag === 1) {
            thishitTableMacro = thac0Macro;
            thishitTableSelect = 1;
          }
        } else if (thishitTableSelect === 1) {
          if (flag === 0) {
            thishitTableMacro = matrixMacro;
            thishitTableSelect = 0;
          } else if (flag === 1) {
            thishitTableMacro = thac0Macro;
            thishitTableSelect = 1;
          }
        }
        output[`repeating_weapon_${id}_weapon_whisper_to_hit`] = thishitTableMacro;
        output[`repeating_weapon_${id}_weapon_whisper_to_hit_select`] = thishitTableSelect;
      });
      setAttrs(output, {silent: true});
    });
  });
});

// Weapon Proficiency Toggle
on('change:repeating_weapon:weapon_prof_flag change:weapon_proficiency_initial change:weapon_proficiency_added_per_level change:weapon_proficiency_penalty', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  getSectionIDs('repeating_weapon', (idArray) => {
    const fields = [];
    _.each(idArray, (id) => {
      fields.push(`repeating_weapon_${id}_weapon_prof_flag`);
    });
    getAttrs(['weapon_proficiency_penalty', ...fields], (v) => {
      // clog('Weapon Proficiency has been re-calculated');
      const output = {};
      _.each(idArray, (id) => {
        const thisflag = +v[`repeating_weapon_${id}_weapon_prof_flag`];
        const thispenalty = +v.weapon_proficiency_penalty || 0;
        output[`repeating_weapon_${id}_weapon_prof`] = thispenalty;
        output[`repeating_weapon_${id}_weapon_prof_pen`] = thisflag === 0 ? '0' : thispenalty;
      });
      setAttrs(output, {silent: true});
    });
  });
});

// Weapon Backstab Toggle
on('change:repeating_weapon:weapon_backstab_flag change:backstab change:backstab_bonus change:toggle_thief_skills', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  getSectionIDs('repeating_weapon', (idArray) => {
    const fields = [];
    _.each(idArray, (id) => {
      fields.push(`repeating_weapon_${id}_weapon_backstab_flag`);
    });
    getAttrs(['backstab', 'backstab_bonus', 'toggle_thief_skills', ...fields], (v) => {
      const output = {};
      const thiefSkills = +v.toggle_thief_skills;
      const thisMult = +v.backstab;
      const thisBonus = +v.backstab_bonus || 0;
      _.each(idArray, (id) => {
        const thisFlag = +v[`repeating_weapon_${id}_weapon_backstab_flag`];
        if (thiefSkills === 0) {
          output[`repeating_weapon_${id}_weapon_backstab_var`] = thisFlag === 0 ? 0 : `+${thisBonus}`;
          output[`repeating_weapon_${id}_weapon_backstab_bonus`] = thisFlag === 0 ? 0 : thisBonus;
          output[`repeating_weapon_${id}_weapon_backstab`] = thisFlag === 0 ? 1 : `x${thisMult}`;
          output[`repeating_weapon_${id}_weapon_backstab_mult`] = thisFlag === 0 ? 1 : thisMult;
        }
        if (thiefSkills === 1) {
          output[`repeating_weapon_${id}_weapon_backstab_var`] = 0;
          output[`repeating_weapon_${id}_weapon_backstab_bonus`] = 0;
          output[`repeating_weapon_${id}_weapon_backstab`] = 1;
          output[`repeating_weapon_${id}_weapon_backstab_mult`] = 1;
        }
      });
      setAttrs(output, {silent: true});
    });
  });
});

function syncDualPen() {
  getSectionIDs('repeating_weapon', (idArray) => {
    const output = {};
    const fields = [];
    _.each(idArray, (id) => {
      fields.push(section_attribute('weapon', id, 'weapon_dual'));
    });
    getAttrs(['dual_pen_primary', 'dual_pen_secondary', ...fields], (v) => {
      // clog('Weapon Attack Type has been re-calculated');
      const primary = +v.dual_pen_primary || 0;
      const secondary = +v.dual_pen_secondary || 0;
      _.each(idArray, (id) => {
        const attack_type = v[section_attribute('weapon', id, 'weapon_dual')];
        let handed_mod = 0;
        if (attack_type === 'Normal') handed_mod = 0;
        else if (attack_type === 'Primary') handed_mod = primary;
        else if (attack_type === 'Secondary') handed_mod = secondary;
        const thispenalty = Math.min(0, handed_mod);
        output[section_attribute('weapon', id, 'weapon_dual_pen')] = thispenalty;
      });
      setAttrs(output, {silent: true});
    });
  });
}

on('change:repeating_weapon:weapon_dual', (eventInfo) => {
  const output = {};
  getAttrs(['dual_pen_primary', 'dual_pen_secondary', 'repeating_weapon_weapon_dual'], (v) => {
    // clog('this weapon attack Type has been re-calculated');
    const primary = +v.dual_pen_primary || 0;
    const secondary = +v.dual_pen_secondary || 0;
    const attack_type = v.repeating_weapon_weapon_dual;
    let handed_mod = 0;
    if (attack_type === 'Normal') handed_mod = 0;
    else if (attack_type === 'Primary') handed_mod = primary;
    else if (attack_type === 'Secondary') handed_mod = secondary;
    const thispenalty = Math.min(0, handed_mod);
    output.repeating_weapon_weapon_dual_pen = thispenalty;
    setAttrs(output, {silent: true});
  });
});

// Weapon Dual-Wield Calc Penalty
on('change:dual_pen_primary change:dual_pen_secondary change:dexterity', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  getAttrs(['dexterity'], (v) => {
    // clog('Weapon Attack Type has been re-calculated');
    const output = {};
    const dex = +v.dexterity || 0;
    let dex_mod = 0;
    if (dex < 6) {
      dex_mod = Math.max(-3, dex - 6);
      // clog(`low dex penalty: ${dex_mod}`);
    } else if (dex >= 18) {
      dex_mod = Math.min(5, Math.floor(dex / 3) - 3);
      // clog(`very high dex penalty: ${dex_mod}`);
    } else if (dex > 15) {
      dex_mod = dex - 15;
      // clog(`high dex penalty: ${dex_mod}`);
    }
    const primary_mod = Math.min(0, dex_mod - 2);
    const secondary_mod = Math.min(0, dex_mod - 4);
    output.dual_pen_primary = primary_mod;
    output.dual_pen_secondary = secondary_mod;
    setAttrs(output, {silent: true}, syncDualPen);
  });
});

// Weapon Range: Parse Ranges
calcRange = (id) => {
  const output = {};
  const fields = [
    section_attribute('weapon', id, 'weapon_range'),
    section_attribute('weapon', id, 'weapon_range_short'),
    section_attribute('weapon', id, 'weapon_range_medium'),
    section_attribute('weapon', id, 'weapon_range_long'),
    section_attribute('weapon', id, 'weapon_attack_type'),
    section_attribute('weapon', id, 'weapon_range_error'),
  ];
  getAttrs(fields, (v) => {
    // attack types selector: melee=0, ranged=1, touch=2, ranged_touch=3
    const thisType = +v[section_attribute('weapon', id, 'weapon_attack_type')];
    if (thisType === 0 || thisType === 2) return;
    let thisRange = v[section_attribute('weapon', id, 'weapon_range')];
    // remove quotes to prevent NaN (ie distance indicators)
    thisRange = thisRange.replace(/'/g, '');
    thisRange = thisRange.replace(/"/g, '');
    // parse ranges
    const thisRangeArray = thisRange.split('/').join(',').split(' ').join(',').split('-').join(',').split(',');
    // clog(`thisRangeArray: ${thisRangeArray}`);
    const thisRangeShort = Number(thisRangeArray[0]);
    let thisRangeMedium = Number(thisRangeArray[1]);
    let thisRangeLong = Number(thisRangeArray[2]);

    // clog(`Attack is Ranged. repeating_weapon_weapon_attack_type = ${thisType}`);

    // if only a single number is entered, make it Long ie Manticore spikes
    if (thisRangeArray.length === 1 && thisRangeShort >= 0 && !thisRangeMedium && !thisRangeLong) {
      thisRangeMedium = thisRangeShort;
      thisRangeLong = thisRangeShort;
    }
    // clog(`thisRangeShort: ${thisRangeShort} |thisRangeMedium: ${thisRangeMedium} |thisRangeLong: ${thisRangeLong}`);

    // check to see if range is in the proper format.
    if (Number.isNaN(thisRangeShort)) {
      output[section_attribute('weapon', id, 'weapon_range_short')] = 0;
      output[section_attribute('weapon', id, 'weapon_range_error')] = thisRange === '' ? 1 : 0;
      // clog(`WARNING: Field is not in the proper format.`);
    } else {
      output[section_attribute('weapon', id, 'weapon_range_short')] = thisRangeShort;
    }
    if (Number.isNaN(thisRangeMedium)) {
      output[section_attribute('weapon', id, 'weapon_range_medium')] = 0;
      output[section_attribute('weapon', id, 'weapon_range_error')] = thisRange === '' ? 1 : 0;
      // clog(`WARNING: Field is not in the proper format.`);
    } else {
      output[section_attribute('weapon', id, 'weapon_range_medium')] = thisRangeMedium;
    }
    if (Number.isNaN(thisRangeLong)) {
      output[section_attribute('weapon', id, 'weapon_range_long')] = 0;
      output[section_attribute('weapon', id, 'weapon_range_error')] = thisRange === '' ? 1 : 0;
      // clog(`WARNING: Field is not in the proper format.`);
    } else {
      output[section_attribute('weapon', id, 'weapon_range_long')] = thisRangeLong;
    }
    if (!Number.isNaN(thisRangeShort) && !Number.isNaN(thisRangeMedium) && !Number.isNaN(thisRangeLong)) {
      output[section_attribute('weapon', id, 'weapon_range_error')] = 1;
    } else {
      // clog(`Value did not parse.`);
    }
    setAttrs(output, {silent: true});
  });
};

on('change:repeating_weapon:weapon_range change:repeating_weapon:weapon_attack_type', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  const id = eventInfo.sourceAttribute.split('_')[2];
  calcRange(id);
});

// set flag for css to show/hide fields according to weapon type
on('change:repeating_weapon:weapon_attack_type', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  getAttrs(['repeating_weapon_weapon_attack_type', 'repeating_weapon_weapon_attack_type_flag'], (v) => {
    const output = {};
    const currentType = +v.repeating_weapon_weapon_attack_type;
    const currentTypeFlag = +v.repeating_weapon_weapon_attack_type_flag;
    if (currentType !== currentTypeFlag) {
      output.repeating_weapon_weapon_attack_type_flag = currentType;
    }
    setAttrs(output, {silent: true});
  });
});

// HP Calcs
calcHP = () => {
  // clog('HP re-calculated');
  getAttrs(['hitpoints', 'hitpoints_max', 'sync_hp_flag', 'hitpoints_1_class', 'hitpoints_2_class', 'hitpoints_3_class'], (v) => {
    const output = {};
    const syncHpFlag = +v.sync_hp_flag;
    const hitPointsMax = +v.hitpoints_max || 0;
    const hitpoints_1_class = Math.max(0, +v.hitpoints_1_class || 0);
    const hitpoints_2_class = Math.max(0, +v.hitpoints_2_class || 0);
    const hitpoints_3_class = Math.max(0, +v.hitpoints_3_class || 0);
    const class1 = hitpoints_1_class !== 0 ? 1 : 0;
    const class2 = hitpoints_2_class !== 0 ? 1 : 0;
    const class3 = hitpoints_3_class !== 0 ? 1 : 0;
    const numberOfClasses = class1 + class2 + class3;
    const totalClassHP = int(hitpoints_1_class + hitpoints_2_class + hitpoints_3_class);
    const totalHP = float(totalClassHP / numberOfClasses).toFixed(2);
    output.hitpoints_class_total = totalClassHP;
    output.hp_quotient = numberOfClasses;
    output.hitpoints_total = totalHP;
    output.hitpoints_max = syncHpFlag === 1 ? int(totalHP) : hitPointsMax;
    setAttrs(output, {silent: true});
  });
};

on('change:sync_hp_flag change:hitpoints change:hitpoints_max change:hitpoints_1_class change:hitpoints_2_class change:hitpoints_3_class', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  calcHP();
});

// AC Calcs
calcAC = (recalc) => {
  // clog('Armor re-calculated');
  getAttrs(
    [
      armorAttrs,
      'armor_rating_flag',
      'armorbonus',
      'armorbonus_inverted',
      'armorbonus_toggle',
      'armorclass',
      'armorclass_magic',
      'armorclass_mod',
      'autocalc_ac',
      'current_encumbrance_move',
      'sync_ac_flag',
    ],
    (v) => {
      const autoCalcAcFlag = +v.autocalc_ac;
      if (autoCalcAcFlag + recalc === 0) return;
      // RecalcAC button overrides sync checkbox = continue
      // Or sync is on and an armor change detected = continue
      const output = {};
      const armorClass = +v.armorclass;
      const syncAcFlag = +v.sync_ac_flag;
      const armorRatingFlag = +v.armor_rating_flag;
      const armorShield_mod = +v.armorshield_mod * -1 || 0;
      const armorOther_mod = +v.armorother_mod * -1 || 0;
      const armorOther2_mod = +v.armorother2_mod * -1 || 0;
      const armorOther3_mod = +v.armorother3_mod * -1 || 0;
      const armorOther4_mod = +v.armorother4_mod * -1 || 0;
      const armorOther5_mod = +v.armorother5_mod * -1 || 0;
      const armorOther6_mod = +v.armorother6_mod * -1 || 0;
      const armorType_magic = +v.armortype_magic * -1 || 0;
      const armorType2_magic = +v.armortype2_magic * -1 || 0;
      const armorShield_magic = +v.armorshield_magic * -1 || 0;
      const armorHelmet_magic = +v.armorhelmet_magic * -1 || 0;
      const armorOther_magic = +v.armorother_magic * -1 || 0;
      const armorOther2_magic = +v.armorother2_magic * -1 || 0;
      const armorOther3_magic = +v.armorother3_magic * -1 || 0;
      const armorOther4_magic = +v.armorother4_magic * -1 || 0;
      const armorOther5_magic = +v.armorother5_magic * -1 || 0;
      const armorOther6_magic = +v.armorother6_magic * -1 || 0;
      const unarmored_worn = +v.unarmored_worn;
      const armorType_worn = +v.armortype_worn;
      const armorType2_worn = +v.armortype2_worn;
      const armorShield_worn = +v.armorshield_worn;
      const armorHelmet_worn = +v.armorhelmet_worn;
      const armorOther_worn = +v.armorother_worn;
      const armorOther2_worn = +v.armorother2_worn;
      const armorOther3_worn = +v.armorother3_worn;
      const armorOther4_worn = +v.armorother4_worn;
      const armorOther5_worn = +v.armorother5_worn;
      const armorOther6_worn = +v.armorother6_worn;
      // check encumbrance/bulk for DEX penalty
      const current_encumbrance_move = +v.current_encumbrance_move || 0;
      let armorBonusToggle = +v.armorbonus_toggle || 0;
      let armorBonus = +v.armorbonus || 0;
      let encumbranceConditionFlag = 0;
      // encumbered and has a DEX bonus
      if (current_encumbrance_move === 3 && armorBonus < 0) {
        armorBonusToggle = 0;
        armorBonus = 0;
        encumbranceConditionFlag = 1;
        // toggle off DEX only if there is a DEX bonus
      } else if (armorBonus < 0) {
        armorBonus = +v.armorbonus * armorBonusToggle || 0;
      } else {
        armorBonus = +v.armorbonus || 0;
      }
      output.encumbrance_flag = encumbranceConditionFlag;
      const unarmored_base = +v.unarmored_base;
      const armorType_base = +v.armortype_base;
      const armorType2_base = +v.armortype2_base;
      const armorShield_base = +v.armorshield_base;
      const armorOther_base = +v.armorother_base;
      // must do the extra checks on these to ensure they are bonuses and not flat AC|AR values
      const armorOther2_base = v.armorother2_base >= 0 ? 0 : -Math.abs(v.armorother2_base) || 0;
      const armorOther3_base = v.armorother3_base >= 0 ? 0 : -Math.abs(v.armorother3_base) || 0;
      const armorOther4_base = v.armorother4_base >= 0 ? 0 : -Math.abs(v.armorother4_base) || 0;
      const armorOther5_base = v.armorother5_base >= 0 ? 0 : -Math.abs(v.armorother5_base) || 0;
      const armorOther6_base = v.armorother6_base >= 0 ? 0 : -Math.abs(v.armorother6_base) || 0;
      const unarmored_ac = +v.unarmored_ac;
      const armorType_ac = +v.armortype_ac;
      const armorType2_ac = +v.armortype2_ac;
      const armorShield_ac = +v.armorshield_ac;
      const armorOther_ac = +v.armorother_ac;
      // must do the extra checks on these to ensure they are bonuses and not flat AC|AR values
      const armorOther2_ac = v.armorother2_ac >= 0 ? 0 : -Math.abs(v.armorother2_ac) || 0;
      const armorOther3_ac = v.armorother3_ac >= 0 ? 0 : -Math.abs(v.armorother3_ac) || 0;
      const armorOther4_ac = v.armorother4_ac >= 0 ? 0 : -Math.abs(v.armorother4_ac) || 0;
      const armorOther5_ac = v.armorother5_ac >= 0 ? 0 : -Math.abs(v.armorother5_ac) || 0;
      const armorOther6_ac = v.armorother6_ac >= 0 ? 0 : -Math.abs(v.armorother6_ac) || 0;
      const armorType_baseValue = armorType_worn ? armorType_base : 10;
      const armorType2_baseValue = armorType2_worn ? armorType2_base : 10;
      const armorShield_baseValue = armorShield_worn ? armorShield_base : 0;
      const armorOther_baseValue = armorOther_worn ? armorOther_base : 10;
      const armorOther2_baseValue = armorOther2_worn ? armorOther2_base : 0;
      const armorOther3_baseValue = armorOther3_worn ? armorOther3_base : 0;
      const armorOther4_baseValue = armorOther4_worn ? armorOther4_base : 0;
      const armorOther5_baseValue = armorOther5_worn ? armorOther5_base : 0;
      const armorOther6_baseValue = armorOther6_worn ? armorOther6_base : 0;
      const unArmored_baseValue = unarmored_worn ? unarmored_base : 10;
      const armorType_acValue = armorType_worn ? armorType_ac : 10;
      const armorType2_acValue = armorType2_worn ? armorType2_ac : 10;
      const armorShield_acValue = armorShield_worn ? armorShield_ac : 0;
      const armorOther_acValue = armorOther_worn ? armorOther_ac : 10;
      const armorOther2_acValue = armorOther2_worn ? armorOther2_ac : 0;
      const armorOther3_acValue = armorOther3_worn ? armorOther3_ac : 0;
      const armorOther4_acValue = armorOther4_worn ? armorOther4_ac : 0;
      const armorOther5_acValue = armorOther5_worn ? armorOther5_ac : 0;
      const armorOther6_acValue = armorOther6_worn ? armorOther6_ac : 0;
      const unArmored_acValue = unarmored_worn ? unarmored_ac : 10;
      const shieldModValue = armorShield_worn ? armorShield_mod : 0;
      const shieldMagicValue = armorShield_worn ? armorShield_magic : 0;
      const baseAR_best = int(
        Math.min(armorType_base, armorType2_base, armorOther_base, unarmored_base) +
          armorShield_base +
          armorOther2_base +
          armorOther3_base +
          armorOther4_base +
          armorOther5_base +
          armorOther6_base,
      );
      const baseAC_best = int(
        Math.min(armorType_ac, armorType2_ac, armorOther_ac, unarmored_ac) + (armorShield_ac + armorOther2_ac + armorOther3_ac + armorOther4_ac + armorOther5_ac + armorOther6_ac),
      );
      const baseAR = int(
        Math.min(armorType_baseValue, armorType2_baseValue, armorOther_baseValue, unArmored_baseValue) +
          (armorShield_baseValue + armorOther2_baseValue + armorOther3_baseValue + armorOther4_baseValue + armorOther5_baseValue + armorOther6_baseValue),
      );
      const baseAC = int(
        Math.min(armorType_acValue, armorType2_acValue, armorOther_acValue, unArmored_acValue) +
          (armorOther2_acValue + armorOther3_acValue + armorOther4_acValue + armorOther5_acValue + armorOther6_acValue),
      );
      const armorMagicAC_total = int(
        armorType_magic +
          armorType2_magic +
          armorHelmet_magic +
          armorOther_magic +
          armorOther2_magic +
          armorOther3_magic +
          armorOther4_magic +
          armorOther5_magic +
          armorOther6_magic +
          armorShield_magic,
      );
      const armorMagicAC = int(
        armorType_worn * armorType_magic +
          armorType2_worn * armorType2_magic +
          armorHelmet_worn * armorHelmet_magic +
          armorOther_worn * armorOther_magic +
          armorOther2_worn * armorOther2_magic +
          armorOther3_worn * armorOther3_magic +
          armorOther4_worn * armorOther4_magic +
          armorOther5_worn * armorOther5_magic +
          armorOther6_worn * armorOther6_magic,
      );
      const armorModAC_total = int(armorOther_mod + armorOther2_mod + armorOther3_mod + armorOther4_mod + armorOther5_mod + armorOther6_mod + armorShield_mod) || 0;
      const armorModAC = int(
        armorOther_worn * armorOther_mod +
          armorOther2_worn * armorOther2_mod +
          armorOther3_worn * armorOther3_mod +
          armorOther4_worn * armorOther4_mod +
          armorOther5_worn * armorOther5_mod +
          armorOther6_worn * armorOther6_mod,
      );
      const combinedModMagic = int(armorModAC + armorMagicAC);
      const rearAC = int(baseAC + armorModAC + armorMagicAC);

      // Dex penalty only applies up to AC 10
      // "Armor class below 10 is not possible except through cursed items." DMG p73
      // check for low Dex pen and do not apply if AC >= 10
      let armorBonusPenaltyCap = 1;
      if (armorBonus > 0 && rearAC >= 10) {
        // clog(`Check1: Dex Penalty & AC is 10+ \n armorBonus:${armorBonus} rearAC:${rearAC} \n Dex Penalty set to 0`);
        armorBonusPenaltyCap = 0;
      }
      // prettier-ignore
      const shieldlessAC = int(rearAC + (armorBonus * armorBonusPenaltyCap));
      const combinedShieldModMagic = int(armorShield_acValue + shieldModValue + shieldMagicValue);
      let totalAC = int(shieldlessAC + combinedShieldModMagic);

      // check for low Dex pen after shield and do not apply if AC >= 10
      if (armorBonus > 0 && combinedShieldModMagic >= 10) {
        // clog(`Check2: Dex Penalty & AC is 10+ \n armorBonus:${armorBonus} combinedShieldModMagic:${combinedShieldModMagic} \n Dex Penalty set to 0`);
        totalAC = int(shieldlessAC + armorBonus + combinedShieldModMagic); // removes Dex pen
      }

      //const totalAC = int(shieldlessAC + combinedShieldModMagic);

      // add a plus sign to result (n<=0?"":"+") + n
      const armorclass_magic_with_shield_add_sign = (-1 * (armorMagicAC + shieldMagicValue) <= 0 ? '' : '+') + -1 * (armorMagicAC + shieldMagicValue);
      const armorclass_magic_total_add_sign = (-1 * armorMagicAC_total <= 0 ? '' : '+') + -1 * armorMagicAC_total;
      const armorclass_mod_with_shield_add_sign = (-1 * (armorModAC + shieldModValue) <= 0 ? '' : '+') + -1 * (armorModAC + shieldModValue);
      const armorclass_mod_total_add_sign = (-1 * armorModAC_total <= 0 ? '' : '+') + -1 * armorModAC_total;
      const armorBonusInverted_add_sign = (-1 * armorBonus <= 0 ? '' : '+') + -1 * armorBonus;
      const armorclass_combined_mod_magic_add_sign = (-1 * combinedModMagic <= 0 ? '' : '+') + -1 * combinedModMagic;
      const combinedShieldModMagic_add_sign = (-1 * combinedShieldModMagic <= 0 ? '' : '+') + -1 * combinedShieldModMagic;
      output.armorclass_rating_used = baseAR;
      output.armorclass_rating = armorRatingFlag === 1 ? '-' : baseAR;
      output.armorclass_rating_best = baseAR_best;
      output.armorclass_base_used = baseAC + armorShield_acValue;
      output.armorclass_base = baseAC;
      output.armorclass_base_best = baseAC_best;
      output.armorclass_magic = armorMagicAC;
      output.armorclass_magic_with_shield = armorclass_magic_with_shield_add_sign;
      output.armorclass_magic_total = armorclass_magic_total_add_sign;
      output.armorclass_mod = armorModAC;
      output.armorclass_mod_with_shield = armorclass_mod_with_shield_add_sign;
      output.armorclass_mod_total = armorclass_mod_total_add_sign;
      output.armorclass_combined_mod_magic = combinedModMagic;
      output.armorclass_combined_mod_magic_inverted = armorclass_combined_mod_magic_add_sign;
      output.armorclass_rear = rearAC;
      output.armorbonus_inverted = armorBonusInverted_add_sign;
      output.armorclass_shieldless = shieldlessAC;
      output.armorclass_shield_magic = shieldMagicValue;
      output.armorclass_shield_mod = shieldModValue;
      output.armorclass_combined_shield_mod_magic = combinedShieldModMagic;
      output.armorclass_combined_shield_mod_magic_inverted = combinedShieldModMagic_add_sign;
      output.armorclass_total = totalAC;
      output.armorclass = syncAcFlag ? totalAC : armorClass;
      setAttrs(output, {silent: true});
    },
  );
};

on(
  'change:armor_details_show change:armor_rating_flag change:sync_ac_flag change:autocalc_ac change:unarmored change:armortype change:armortype2 change:armorshield change:armorhelmet change:armorother change:armorother2 change:armorother3 change:armorother4 change:armorother5 change:armorother6 change:armorclass_mod change:armorclass_magic change:armorbonus change:armorbonus_toggle change:unarmored_worn change:armortype_worn change:armortype2_worn change:armorshield_worn change:armorhelmet_worn change:armorother_worn change:armorother2_worn change:armorother3_worn change:armorother4_worn change:armorother5_worn change:armorother6_worn change:armortype_base change:armortype2_base change:armorshield_base change:armorother_base change:armorother2_base change:armorother3_base change:armorother4_base change:armorother5_base change:armorother6_base change:unarmored_base change:armortype_ac change:armortype2_ac change:armorshield_ac change:armorhelmet_ac change:armorother_ac change:armorother2_ac change:armorother3_ac change:armorother4_ac change:armorother5_ac change:armorother6_ac change:unarmored_ac change:armorshield_mod change:armorother_mod change:armorother2_mod change:armorother3_mod change:armorother4_mod change:armorother5_mod change:armorother6_mod change:armortype_magic change:armortype2_magic change:armorshield_magic change:armorhelmet_magic change:armorother_magic change:armorother2_magic change:armorother3_magic change:armorother4_magic change:armorother5_magic change:armorother6_magic',
  (eventInfo) => {
    // const thisEvent = eventInfo.sourceAttribute === undefined ? 'sheet opened' : eventInfo.sourceAttribute;
    const recalc = 0;
    // clog(`AC change detected by: ${eventInfo.sourceType}`);
    calcAC(recalc);
  },
);

on('clicked:calcac', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  const recalc = 1;
  calcAC(recalc);
});

// Creates the chat menu buttons or auto rolls damage with the attack based on settings
damageMacro = (id) => {
  getAttrs(['toggle_auto_damage'], (v) => {
    const output = {};
    const autoDamage = +v.toggle_auto_damage;
    // clog(`auto damage toggle:${autoDamage}`);
    // NOTE: these macros substitute the damage rolls for the chatmenu buttons directly to support crit logic
    const damageSmallMedium = `Damage vs S/M [[ (@{repeating_weapon_${id}_weapon_damagesmallmedium}) * @{repeating_weapon_${id}_weapon_backstab_mult}[MULT] + ( @{repeating_weapon_${id}_weapon_attackdmgbonus}[DMG_BON] ) + ( @{repeating_weapon_${id}_weapon_magicbonus}[MAG_BON] ) + ( ?{Damage Modifier?|0}[MISC_MOD] ) ]]`;
    const damageLarge = ` vs LG [[ (@{repeating_weapon_${id}_weapon_damagelarge}) * @{repeating_weapon_${id}_weapon_backstab_mult}[MULT] + ( @{repeating_weapon_${id}_weapon_attackdmgbonus}[DMG_BON] ) + ( @{repeating_weapon_${id}_weapon_magicbonus}[MAG_BON] ) + ( ?{Damage Modifier?|0}[MISC_MOD] ) ]]`;
    const damageSmallMediumNpc = `Damage vs S/M [[ (@{repeating_weapon_${id}_weapon_damagesmallmedium}) * @{repeating_weapon_${id}_weapon_backstab_mult}[MULT] + ( @{repeating_weapon_${id}_weapon_attackdmgbonus}[DMG_BON] ) + ( @{repeating_weapon_${id}_weapon_magicbonus}[MAG_BON] ) + ( ?{Damage Modifier?|0}[MISC_MOD] ) ]]`;
    const damageLargeNPC = ` vs LG [[ (@{repeating_weapon_${id}_weapon_damagelarge}) * @{repeating_weapon_${id}_weapon_backstab_mult}[MULT] + ( @{repeating_weapon_${id}_weapon_attackdmgbonus}[DMG_BON] ) + ( @{repeating_weapon_${id}_weapon_magicbonus}[MAG_BON] ) + ( ?{Damage Modifier?|0}[MISC_MOD] ) ]]`;
    const damageSmallMediumCrit = `Damage vs S/M [[ (@{repeating_weapon_${id}_weapon_critdamagesmallmedium}) * @{repeating_weapon_${id}_weapon_backstab_mult}[MULT] + ( @{repeating_weapon_${id}_weapon_attackdmgbonus}[DMG_BON] ) + ( @{repeating_weapon_${id}_weapon_magicbonus}[MAG_BON] ) + ( ?{Damage Modifier?|0}[MISC_MOD] ) ]]`;
    const damageLargeCrit = ` vs LG [[ (@{repeating_weapon_${id}_weapon_critdamagelarge}) * @{repeating_weapon_${id}_weapon_backstab_mult}[MULT] + ( @{repeating_weapon_${id}_weapon_attackdmgbonus}[DMG_BON] ) + ( @{repeating_weapon_${id}_weapon_magicbonus}[MAG_BON] ) + ( ?{Damage Modifier?|0}[MISC_MOD] ) ]]`;
    const damageSmallMediumNpcCrit = `Damage vs S/M [[ (@{repeating_weapon_${id}_weapon_critdamagesmallmedium}) * @{repeating_weapon_${id}_weapon_backstab_mult}[MULT] + ( @{repeating_weapon_${id}_weapon_attackdmgbonus}[DMG_BON] ) + ( @{repeating_weapon_${id}_weapon_magicbonus}[MAG_BON] ) + ( ?{Damage Modifier?|0}[MISC_MOD] ) ]]}}`;
    const damageLargeNpcCrit = ` vs LG [[ (@{repeating_weapon_${id}_weapon_critdamagelarge}) * @{repeating_weapon_${id}_weapon_backstab_mult}[MULT] + ( @{repeating_weapon_${id}_weapon_attackdmgbonus}[DMG_BON] ) + ( @{repeating_weapon_${id}_weapon_magicbonus}[MAG_BON] ) + ( ?{Damage Modifier?|0}[MISC_MOD] ) ]]`;
    if (autoDamage === 0) {
      output[`repeating_weapon_${id}_weapon_damagesmallmedium_chat_menu`] = `[Roll Damage](~@{character_id}|repeating_weapon_${id}_weapon_damagesmallmedium_roll)`;
      output[`repeating_weapon_${id}_weapon_damagelarge_chat_menu`] = `[Roll Damage vs LG](~@{character_id}|repeating_weapon_${id}_weapon_damagelarge_roll)`;
      output[`repeating_weapon_${id}_weapon_damagesmallmedium_npc_chat_menu`] = `[Damage](~@{character_id}|repeating_weapon_${id}_weapon_damagesmallmedium_npc_roll)`;
      output[`repeating_weapon_${id}_weapon_damagelarge_npc_chat_menu`] = `[Damage vs LG](~@{character_id}|repeating_weapon_${id}_weapon_damagelarge_npc_roll)`;
      output[`repeating_weapon_${id}_weapon_critdamagesmallmedium_chat_menu`] = `[Roll Damage](~@{character_id}|repeating_weapon_${id}_weapon_critdamagesmallmedium_roll)`;
      output[`repeating_weapon_${id}_weapon_critdamagelarge_chat_menu`] = `[Roll Damage vs LG](~@{character_id}|repeating_weapon_${id}_weapon_critdamagelarge_roll)`;
      output[`repeating_weapon_${id}_weapon_critdamagesmallmedium_npc_chat_menu`] = `[Damage](~@{character_id}|repeating_weapon_${id}_weapon_critdamagesmallmedium_npc_roll)`;
      output[`repeating_weapon_${id}_weapon_critdamagelarge_npc_chat_menu`] = `[Damage vs LG](~@{character_id}|repeating_weapon_${id}_weapon_critdamagelarge_npc_roll)`;
    } else {
      output[`repeating_weapon_${id}_weapon_damagesmallmedium_chat_menu`] = damageSmallMedium;
      output[`repeating_weapon_${id}_weapon_damagelarge_chat_menu`] = damageLarge;
      output[`repeating_weapon_${id}_weapon_damagesmallmedium_npc_chat_menu`] = damageSmallMediumNpc;
      output[`repeating_weapon_${id}_weapon_damagelarge_npc_chat_menu`] = damageLargeNPC;
      output[`repeating_weapon_${id}_weapon_critdamagesmallmedium_chat_menu`] = damageSmallMediumCrit;
      output[`repeating_weapon_${id}_weapon_critdamagelarge_chat_menu`] = damageLargeCrit;
      output[`repeating_weapon_${id}_weapon_critdamagesmallmedium_npc_chat_menu`] = damageSmallMediumNpcCrit;
      output[`repeating_weapon_${id}_weapon_critdamagelarge_npc_chat_menu`] = damageLargeNpcCrit;
    }
    setAttrs(output, {silent: true});
  });
};

// Ensures Chat Menu Buttons have updated Damage Rolls
on(
  'change:repeating_weapon:weapon_name change:repeating_weapon:weapon_damagesmallmedium change:repeating_weapon:weapon_damagelarge change:repeating_weapon:weapon_critdamagesmallmedium change:repeating_weapon:weapon_critdamagelarge change:repeating_weapon:weapon_attackdmgbonus change:repeating_weapon:weapon_critdamage_flag',
  (eventInfo) => {
    // clog(`Change Detected:${eventInfo.sourceAttribute}`);
    const id = eventInfo.sourceAttribute.split('_')[2];
    damageMacro(id);
  },
);

on('change:toggle_critdamage', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  getSectionIDs('repeating_weapon', (idArray) => {
    const output = {};
    const fields = [];
    _.each(idArray, (id) => {
      fields.push(section_attribute('weapon', id, 'weapon_critdamage_flag'));
    });
    getAttrs(fields, (v) => {
      idArray.forEach((id) => {
        const currentValue = +v[section_attribute('weapon', id, 'weapon_critdamage_flag')];
        output[section_attribute('weapon', id, 'weapon_critdamage_flag')] = 1 - currentValue;
      });
      setAttrs(output);
    });
  });
});

on('change:toggle_auto_damage change:toggle_critdamage', (eventInfo) => {
  clog(`Change Detected:${eventInfo.sourceAttribute}`);
  getSectionIDs('repeating_weapon', (idArray) => {
    const fields = [];
    getAttrs(fields, (v) => {
      idArray.forEach((id) => {
        damageMacro(id);
      });
    });
  });
});

function setWeapons(id) {
  const output = {};
  const fields = [
    section_attribute('weapon', id, 'weapon_use'),
    section_attribute('weapon', id, 'weapon_attack_type'),
    section_attribute('weapon', id, 'weapon_attack_type_flag'),
    section_attribute('weapon', id, 'weapon_critdamage_flag'),
    section_attribute('weapon', id, 'weapon_prof_pen'),
    section_attribute('weapon', id, 'weapon_range_error'),
    section_attribute('weapon', id, 'weapon_tohitacadj'),
    section_attribute('weapon', id, 'weapon_dual'),
    section_attribute('weapon', id, 'weapon_whisper_to_hit'),
    section_attribute('weapon', id, 'weapon_whisper_to_hit_select'),
    section_attribute('weapon', id, 'weapon_dual_pen'),
    section_attribute('weapon', id, 'weapon_backstab_var'),
    section_attribute('weapon', id, 'weapon_tohitbonus'),
    section_attribute('weapon', id, 'weapon_magicbonus'),
    section_attribute('weapon', id, 'weapon_prof'),
    section_attribute('weapon', id, 'weapon_backstab'),
    section_attribute('weapon', id, 'weapon_backstab_bonus'),
    section_attribute('weapon', id, 'weapon_backstab_mult'),
    section_attribute('weapon', id, 'weapon_attackdmgbonus'),
    section_attribute('weapon', id, 'weapon_num_attacks'),
    section_attribute('weapon', id, 'weapon_quantity'),
    section_attribute('weapon', id, 'weapon_ammo'),
    section_attribute('weapon', id, 'weapon_ammo_max'),
    section_attribute('weapon', id, 'weapon_weight'),
    section_attribute('weapon', id, 'weapon_cost'),
    section_attribute('weapon', id, 'weapon_range_short'),
    section_attribute('weapon', id, 'weapon_range_medium'),
    section_attribute('weapon', id, 'weapon_range_long'),
    section_attribute('weapon', id, 'weapon_length'),
    section_attribute('weapon', id, 'weapon_space'),
    section_attribute('weapon', id, 'weapon_speed'),
    section_attribute('weapon', id, 'weapon_misc'),
    section_attribute('weapon', id, 'weapon_thac_adj0'),
    section_attribute('weapon', id, 'weapon_thac_adj1'),
    section_attribute('weapon', id, 'weapon_thac_adj2'),
    section_attribute('weapon', id, 'weapon_thac_adj3'),
    section_attribute('weapon', id, 'weapon_thac_adj4'),
    section_attribute('weapon', id, 'weapon_thac_adj5'),
    section_attribute('weapon', id, 'weapon_thac_adj6'),
    section_attribute('weapon', id, 'weapon_thac_adj7'),
    section_attribute('weapon', id, 'weapon_thac_adj8'),
    section_attribute('weapon', id, 'weapon_thac_adj9'),
    section_attribute('weapon', id, 'weapon_thac_adj10'),
    section_attribute('weapon', id, 'weapon_macro_text'),
    section_attribute('weapon', id, 'weapon_damagesmallmedium_chat_menu'),
    section_attribute('weapon', id, 'weapon_damagelarge_chat_menu'),
    section_attribute('weapon', id, 'weapon_damagesmallmedium_npc_chat_menu'),
    section_attribute('weapon', id, 'weapon_damagelarge_npc_chat_menu'),
    section_attribute('weapon', id, 'weapon_critdamagesmallmedium_chat_menu'),
    section_attribute('weapon', id, 'weapon_critdamagelarge_chat_menu'),
    section_attribute('weapon', id, 'weapon_critdamagesmallmedium_npc_chat_menu'),
    section_attribute('weapon', id, 'weapon_critdamagelarge_npc_chat_menu'),
    section_attribute('weapon', id, 'weapon_damage_chat_menu_npc'),
  ];
  getAttrs(fields, (v) => {
    // console.log(`Change detected: ${fields}`);
    output.repeating_weapon_weapon_use = +v[section_attribute('weapon', id, 'weapon_use')];
    output.repeating_weapon_weapon_attack_type_flag = +v[section_attribute('weapon', id, 'weapon_attack_type_flag')];
    output.repeating_weapon_weapon_critdamage_flag = +v[section_attribute('weapon', id, 'weapon_critdamage_flag')];
    output.repeating_weapon_weapon_prof_pen = +v[section_attribute('weapon', id, 'weapon_prof_pen')];
    output.repeating_weapon_weapon_range_error = +v[section_attribute('weapon', id, 'weapon_range_error')];
    output.repeating_weapon_weapon_tohitacadj = +v[section_attribute('weapon', id, 'weapon_tohitacadj')];
    output.repeating_weapon_weapon_attack_type = +v[section_attribute('weapon', id, 'weapon_attack_type')];
    output.repeating_weapon_weapon_dual = v[section_attribute('weapon', id, 'weapon_dual')];
    output.repeating_weapon_weapon_whisper_to_hit = v[section_attribute('weapon', id, 'weapon_whisper_to_hit')];
    output.repeating_weapon_weapon_whisper_to_hit_select = +v[section_attribute('weapon', id, 'weapon_whisper_to_hit_select')];
    output.repeating_weapon_weapon_dual_pen = +v[section_attribute('weapon', id, 'weapon_dual_pen')];
    output.repeating_weapon_weapon_backstab_var = +v[section_attribute('weapon', id, 'weapon_backstab_var')];
    output.repeating_weapon_weapon_tohitbonus = +v[section_attribute('weapon', id, 'weapon_tohitbonus')];
    output.repeating_weapon_weapon_magicbonus = +v[section_attribute('weapon', id, 'weapon_magicbonus')];
    output.repeating_weapon_weapon_prof = +v[section_attribute('weapon', id, 'weapon_prof')];
    output.repeating_weapon_weapon_backstab = +v[section_attribute('weapon', id, 'weapon_backstab')];
    output.repeating_weapon_weapon_backstab_bonus = +v[section_attribute('weapon', id, 'weapon_backstab_bonus')];
    output.repeating_weapon_weapon_backstab_mult = +v[section_attribute('weapon', id, 'weapon_backstab_mult')];
    output.repeating_weapon_weapon_attackdmgbonus = +v[section_attribute('weapon', id, 'weapon_attackdmgbonus')];
    output.repeating_weapon_weapon_num_attacks = +v[section_attribute('weapon', id, 'weapon_num_attacks')];
    output.repeating_weapon_weapon_quantity = +v[section_attribute('weapon', id, 'weapon_quantity')];
    output.repeating_weapon_weapon_ammo = +v[section_attribute('weapon', id, 'weapon_ammo')];
    output.repeating_weapon_weapon_ammo_max = +v[section_attribute('weapon', id, 'weapon_ammo_max')];
    output.repeating_weapon_weapon_weight = +v[section_attribute('weapon', id, 'weapon_weight')];
    output.repeating_weapon_weapon_cost = +v[section_attribute('weapon', id, 'weapon_cost')];
    output.repeating_weapon_weapon_range_short = +v[section_attribute('weapon', id, 'weapon_range_short')];
    output.repeating_weapon_weapon_range_medium = +v[section_attribute('weapon', id, 'weapon_range_medium')];
    output.repeating_weapon_weapon_range_long = +v[section_attribute('weapon', id, 'weapon_range_long')];
    output.repeating_weapon_weapon_length = v[section_attribute('weapon', id, 'weapon_length')];
    output.repeating_weapon_weapon_space = v[section_attribute('weapon', id, 'weapon_space')];
    output.repeating_weapon_weapon_speed = v[section_attribute('weapon', id, 'weapon_speed')];
    output.repeating_weapon_weapon_misc = v[section_attribute('weapon', id, 'weapon_misc')];
    output.repeating_weapon_weapon_thac_adj0 = +v[section_attribute('weapon', id, 'weapon_thac_adj0')];
    output.repeating_weapon_weapon_thac_adj1 = +v[section_attribute('weapon', id, 'weapon_thac_adj1')];
    output.repeating_weapon_weapon_thac_adj2 = +v[section_attribute('weapon', id, 'weapon_thac_adj2')];
    output.repeating_weapon_weapon_thac_adj3 = +v[section_attribute('weapon', id, 'weapon_thac_adj3')];
    output.repeating_weapon_weapon_thac_adj4 = +v[section_attribute('weapon', id, 'weapon_thac_adj4')];
    output.repeating_weapon_weapon_thac_adj5 = +v[section_attribute('weapon', id, 'weapon_thac_adj5')];
    output.repeating_weapon_weapon_thac_adj6 = +v[section_attribute('weapon', id, 'weapon_thac_adj6')];
    output.repeating_weapon_weapon_thac_adj7 = +v[section_attribute('weapon', id, 'weapon_thac_adj7')];
    output.repeating_weapon_weapon_thac_adj8 = +v[section_attribute('weapon', id, 'weapon_thac_adj8')];
    output.repeating_weapon_weapon_thac_adj9 = +v[section_attribute('weapon', id, 'weapon_thac_adj9')];
    output.repeating_weapon_weapon_thac_adj10 = +v[section_attribute('weapon', id, 'weapon_thac_adj10')];
    output.repeating_weapon_weapon_macro_text = v[section_attribute('weapon', id, 'weapon_macro_text')];
    output.repeating_weapon_weapon_damagesmallmedium_chat_menu = v[section_attribute('weapon', id, 'weapon_damagesmallmedium_chat_menu')];
    output.repeating_weapon_weapon_damagelarge_chat_menu = v[section_attribute('weapon', id, 'weapon_damagelarge_chat_menu')];
    output.repeating_weapon_weapon_damagesmallmedium_npc_chat_menu = v[section_attribute('weapon', id, 'weapon_damagesmallmedium_npc_chat_menu')];
    output.repeating_weapon_weapon_damagelarge_npc_chat_menu = v[section_attribute('weapon', id, 'weapon_damagelarge_npc_chat_menu')];
    output.repeating_weapon_weapon_critdamagesmallmedium_chat_menu = v[section_attribute('weapon', id, 'weapon_critdamagesmallmedium_chat_menu')];
    output.repeating_weapon_weapon_critdamagelarge_chat_menu = v[section_attribute('weapon', id, 'weapon_critdamagelarge_chat_menu')];
    output.repeating_weapon_weapon_critdamagesmallmedium_npc_chat_menu = v[section_attribute('weapon', id, 'weapon_critdamagesmallmedium_npc_chat_menu')];
    output.repeating_weapon_weapon_critdamagelarge_npc_chat_menu = v[section_attribute('weapon', id, 'weapon_critdamagelarge_npc_chat_menu')];
    output.repeating_weapon_weapon_damage_chat_menu_npc = v[section_attribute('weapon', id, 'weapon_damage_chat_menu_npc')];
    setAttrs(output, {silent: true});
  });
}

function setEquipment(id) {
  const output = {};
  const nonRep = ['equipment_tabs_type', 'equipment_tabs_carry'];
  const fields = [
    section_attribute('equipment', id, 'equipment_type'),
    section_attribute('equipment', id, 'equipment_magical'),
    section_attribute('equipment', id, 'equipment_show_type'),
    section_attribute('equipment', id, 'equipment_show_carry'),
    section_attribute('equipment', id, 'equipment_current'),
    section_attribute('equipment', id, 'equipment_current_max'),
    section_attribute('equipment', id, 'equipment_carried_select'),
    section_attribute('equipment', id, 'equipment_carried'),
    section_attribute('equipment', id, 'equipment_quantity'),
    section_attribute('equipment', id, 'equipment_quantity_max'),
    section_attribute('equipment', id, 'equipment_weight'),
    section_attribute('equipment', id, 'equipment_cost'),
    section_attribute('equipment', id, 'equipment_armor_type'),
    section_attribute('equipment', id, 'equipment_armor_worn'),
    section_attribute('equipment', id, 'equipment_armor_ac'),
    section_attribute('equipment', id, 'equipment_armor_base'),
    section_attribute('equipment', id, 'equipment_armor_magic'),
    section_attribute('equipment', id, 'equipment_armor_mod'),
    section_attribute('equipment', id, 'equipment_armor_bulk'),
    section_attribute('equipment', id, 'equipment_sync_armor_flag'),
    section_attribute('equipment', id, 'equipment_macro_text'),
    section_attribute('equipment', id, 'equipment_weapon_type'),
    section_attribute('equipment', id, 'equipment_weapon_speed'),
    section_attribute('equipment', id, 'equipment_weapon_misc'),
    section_attribute('equipment', id, 'equipment_weapon_length'),
    section_attribute('equipment', id, 'equipment_weapon_space'),
    section_attribute('equipment', id, 'equipment_weapon_damagesmallmedium'),
    section_attribute('equipment', id, 'equipment_weapon_damagelarge'),
    section_attribute('equipment', id, 'equipment_weapon_attackdmgtype'),
    section_attribute('equipment', id, 'equipment_weapon_rateoffire'),
    section_attribute('equipment', id, 'equipment_weapon_range'),
  ];
  const combined = [...nonRep, ...fields];
  getAttrs(combined, (v) => {
    // console.log(`Change detected: ${fields}`);
    const equipTab = +v.equipment_tabs_type; // 0, 1, 2, 3, 4, -1
    const equipType = +v[section_attribute('equipment', id, 'equipment_type')];
    // output.repeating_equipment_equipment_type = equipType <= 0 || equipTab === -1 ? 0 : equipType;
    // Set Equipment type for new rows based on selected Type Tab
    output.repeating_equipment_equipment_type = equipTab !== -1 ? equipTab : equipType;
    output.repeating_equipment_equipment_magical = equipType === 3 || equipTab === 3 ? 1 : +v[section_attribute('equipment', id, 'equipment_magical')];
    output.repeating_equipment_equipment_show_type = +v[section_attribute('equipment', id, 'equipment_show_type')];
    output.repeating_equipment_equipment_current = +v[section_attribute('equipment', id, 'equipment_current')];
    output.repeating_equipment_equipment_current_max = +v[section_attribute('equipment', id, 'equipment_current_max')];
    output.repeating_equipment_equipment_carried_select = +v[section_attribute('equipment', id, 'equipment_carried_select')];
    output.repeating_equipment_equipment_carried = +v[section_attribute('equipment', id, 'equipment_carried')];
    output.repeating_equipment_equipment_quantity = +v[section_attribute('equipment', id, 'equipment_quantity')];
    output.repeating_equipment_equipment_quantity_max = +v[section_attribute('equipment', id, 'equipment_quantity_max')];
    output.repeating_equipment_equipment_weight = +v[section_attribute('equipment', id, 'equipment_weight')];
    output.repeating_equipment_equipment_cost = +v[section_attribute('equipment', id, 'equipment_cost')];
    output.repeating_equipment_equipment_armor_type = +v[section_attribute('equipment', id, 'equipment_armor_type')];
    output.repeating_equipment_equipment_armor_worn = +v[section_attribute('equipment', id, 'equipment_armor_worn')];
    output.repeating_equipment_equipment_armor_ac = +v[section_attribute('equipment', id, 'equipment_armor_ac')];
    output.repeating_equipment_equipment_armor_base = +v[section_attribute('equipment', id, 'equipment_armor_base')];
    output.repeating_equipment_equipment_armor_magic = +v[section_attribute('equipment', id, 'equipment_armor_magic')];
    output.repeating_equipment_equipment_armor_mod = +v[section_attribute('equipment', id, 'equipment_armor_mod')];
    output.repeating_equipment_equipment_armor_bulk = +v[section_attribute('equipment', id, 'equipment_armor_bulk')];
    output.repeating_equipment_equipment_sync_armor_flag = +v[section_attribute('equipment', id, 'equipment_sync_armor_flag')];
    output.repeating_equipment_equipment_macro_text = v[section_attribute('equipment', id, 'equipment_macro_text')];
    output.repeating_equipment_equipment_weapon_type = +v[section_attribute('equipment', id, 'equipment_weapon_type')];
    output.repeating_equipment_equipment_weapon_speed = v[section_attribute('equipment', id, 'equipment_weapon_speed')];
    output.repeating_equipment_equipment_weapon_misc = v[section_attribute('equipment', id, 'equipment_weapon_misc')];
    output.repeating_equipment_equipment_weapon_length = v[section_attribute('equipment', id, 'equipment_weapon_length')];
    output.repeating_equipment_equipment_weapon_space = v[section_attribute('equipment', id, 'equipment_weapon_space')];
    output.repeating_equipment_equipment_weapon_damagesmallmedium = v[section_attribute('equipment', id, 'equipment_weapon_damagesmallmedium')];
    output.repeating_equipment_equipment_weapon_damagelarge = v[section_attribute('equipment', id, 'equipment_weapon_damagelarge')];
    output.repeating_equipment_equipment_weapon_attackdmgtype = v[section_attribute('equipment', id, 'equipment_weapon_attackdmgtype')];
    output.repeating_equipment_equipment_weapon_rateoffire = v[section_attribute('equipment', id, 'equipment_weapon_rateoffire')];
    output.repeating_equipment_equipment_weapon_range = v[section_attribute('equipment', id, 'equipment_weapon_range')];
    setAttrs(output, {silent: true});
  });
}

function setNWP(id) {
  const output = {};
  const fields = [
    section_attribute('nonweaponproficiencies', id, 'nwp_attribute'),
    section_attribute('nonweaponproficiencies', id, 'nwp_slots'),
    section_attribute('nonweaponproficiencies', id, 'nwp_modifier'),
    section_attribute('nonweaponproficiencies', id, 'nwp_macro_text'),
  ];
  getAttrs(fields, (v) => {
    // console.log(`Change detected: ${fields}`);
    output.repeating_nonweaponproficiencies_attribute = +v[section_attribute('nonweaponproficiencies', id, 'nwp_attribute')];
    output.repeating_nonweaponproficiencies_slots = +v[section_attribute('nonweaponproficiencies', id, 'nwp_slots')];
    output.repeating_nonweaponproficiencies_modifier = +v[section_attribute('nonweaponproficiencies', id, 'nwp_modifier')];
    output.repeating_nonweaponproficiencies_macro_text = v[section_attribute('nonweaponproficiencies', id, 'nwp_macro_text')];
    setAttrs(output, {silent: true});
  });
}

// Set repeating attr values for new rows. Makes visible to API
on('change:repeating_weapon:weapon_name change:repeating_equipment:equipment_item change:repeating_nonweaponproficiencies:nwp_name', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  const id = eventInfo.sourceAttribute.split('_')[2];
  // test if API is creating the repeating row and bail
  if (eventInfo.sourceType !== 'player') return;

  // test for new row name (ie no existing value)
  // console.log(`Change detected: new: ${eventInfo.newValue} previous:${eventInfo.previousValue}`);
  if (eventInfo.previousValue !== undefined) return;

  if (eventInfo.sourceAttribute.includes('equipment_item')) {
    // clog(`new ${eventInfo.sourceAttribute.match(/^[^_]+_[^_]+/)[0]} row added. Setting default values.`);
    setEquipment(id);
  }
  if (eventInfo.sourceAttribute.includes('weapon_name')) {
    // clog(`new ${eventInfo.sourceAttribute.match(/^[^_]+_[^_]+/)[0]} row added. Setting default values.`);
    setWeapons(id);
  }
  if (eventInfo.sourceAttribute.includes('nwp_name')) {
    // clog(`new ${eventInfo.sourceAttribute.match(/^[^_]+_[^_]+/)[0]} row added. Setting default values.`);
    setNWP(id);
  }
});

// Auto-generates a repeating row as a placeholder
on('sheet:opened', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  getSectionIDs('repeating_weapon', (weaponID) => {
    getSectionIDs('repeating_ability', (abilityID) => {
      getSectionIDs('repeating_nonweaponproficiencies', (nwpID) => {
        getSectionIDs('repeating_equipment', (equipmentID) => {
          getSectionIDs('repeating_spells', (spellsID) => {
            const output = {};
            const weaponRows = weaponID.length;
            const abilityRows = abilityID.length;
            const nwpRows = nwpID.length;
            const equipmentRows = equipmentID.length;
            const spellsRows = spellsID.length;
            if (weaponRows === 0) {
              const newrowid = generateUniqueRowID();
              output[`repeating_weapon_${newrowid}_weapon_value`] = 1;
            }
            if (abilityRows === 0) {
              const newrowid = generateUniqueRowID();
              output[`repeating_ability_${newrowid}_ability_value`] = 1;
            }
            if (nwpRows === 0) {
              const newrowid = generateUniqueRowID();
              output[`repeating_nonweaponproficiencies_${newrowid}_nwp_value`] = 1;
            }
            if (equipmentRows === 0) {
              const newrowid = generateUniqueRowID();
              output[`repeating_equipment_${newrowid}_equipment_value`] = 1;
            }
            if (spellsRows === 0) {
              const newrowid = generateUniqueRowID();
              output[`repeating_spells_${newrowid}_spell_value`] = 1;
            } else {
              return;
            }
            setAttrs(output, {silent: true});
          });
        });
      });
    });
  });
});

// Reset Macros to default
on('clicked:resetallmacros clicked:resetequipmentmacros clicked:resetweaponsmacros clicked:resetabilitiesmacros clicked:resetnwpsmacros clicked:resetspellsmacros', (eventInfo) => {
  const eventTrigger = eventInfo.triggerName;
  // Use a regular expression to match and capture the word after "clicked:"
  const match = eventTrigger.match(/clicked:(\w+)/);
  // Check if there is a match and extract the captured word
  const clickedWord = match ? match[1] : null;
  // clog(`Change Detected:${JSON.stringify(eventInfo)}`);
  // clog(`reset macros detected: ${clickedWord}`);
  getSectionIDs('repeating_equipment', (idequipment) => {
    getSectionIDs('repeating_weapon', (idweapons) => {
      getSectionIDs('repeating_ability', (idabilities) => {
        getSectionIDs('repeating_nonweaponproficiencies', (idnwps) => {
          getSectionIDs('repeating_spells', (idspells) => {
            const output = {};
            const attrsEquipment = [];
            const attrsWeapon = [];
            const attrsAbility = [];
            const attrsNWP = [];
            const attrsSpells = [];
            _.each(idequipment, (itemid) => {
              attrsEquipment.push(`repeating_equipment_${itemid}_equipment_macro_text`);
            });
            _.each(idweapons, (itemid) => {
              attrsWeapon.push(`repeating_weapon_${itemid}_weapon_macro_text`);
            });
            _.each(idabilities, (itemid) => {
              attrsAbility.push(`repeating_ability_${itemid}_ability_macro_text`);
            });
            _.each(idnwps, (itemid) => {
              attrsNWP.push(`repeating_nonweaponproficiencies_${itemid}_nwp_macro_text`);
            });
            _.each(idspells, (itemid) => {
              attrsSpells.push(`repeating_spells_${itemid}_spell_macro_text`);
            });

            if (clickedWord === 'resetallmacros') {
              output.surprise_macro_text = '';
              output.surprise_others_macro_text = '';
              output.init_macro_text = '';
              _.each(idequipment, (id) => {
                output[`repeating_equipment_${id}_equipment_macro_text`] = '';
                // clog(`macro reset completed on: ${attrsEquipment}`);
              });
              _.each(idweapons, (id) => {
                output[`repeating_weapon_${id}_weapon_macro_text`] = '';
                // clog(`macro reset completed on: ${attrsWeapon}`);
              });
              _.each(idabilities, (id) => {
                output[`repeating_ability_${id}_ability_macro_text`] = '';
                // clog(`macro reset completed on: ${attrsAbility}`);
              });
              _.each(idnwps, (id) => {
                output[`repeating_nonweaponproficiencies_${id}_nwp_macro_text`] = '';
                // clog(`macro reset completed on: ${attrsNWP}`);
              });
              _.each(idspells, (id) => {
                output[`repeating_spells_${id}_spell_macro_text`] = '';
                // clog(`macro reset completed on: ${attrsSpells}`);
              });
            }
            if (clickedWord === 'resetequipmentmacros') {
              _.each(idequipment, (id) => {
                output[`repeating_equipment_${id}_equipment_macro_text`] = '';
                // clog(`macro reset completed on: ${attrsEquipment}`);
              });
            }
            if (clickedWord === 'resetweaponsmacros') {
              _.each(idweapons, (id) => {
                output[`repeating_weapon_${id}_weapon_macro_text`] = '';
                // clog(`macro reset completed on: ${attrsWeapon}`);
              });
            }
            if (clickedWord === 'resetabilitiesmacros') {
              _.each(idabilities, (id) => {
                output[`repeating_ability_${id}_ability_macro_text`] = '';
                // clog(`macro reset completed on: ${attrsAbility}`);
              });
            }
            if (clickedWord === 'resetnwpsmacros') {
              _.each(idnwps, (id) => {
                output[`repeating_nonweaponproficiencies_${id}_nwp_macro_text`] = '';
                // clog(`macro reset completed on: ${attrsNWP}`);
              });
            }
            if (clickedWord === 'resetspellsmacros') {
              _.each(idspells, (id) => {
                output[`repeating_spells_${id}_spell_macro_text`] = '';
                // clog(`macro reset completed on: ${attrsSpells}`);
              });
            }
            setAttrs(output, {silent: true});
          });
        });
      });
    });
  });
});

// Thief Calcs
pickpocketsCalc = (migrate) => {
  getAttrs(['pickpockets', 'pickpockets_base', 'pickpockets_racial_mod', 'pickpockets_ability_mod', 'pickpockets_magic'], (v) => {
    const output = {};
    const basePickpockets = +v.pickpockets_base || 0;
    const racialPickpockets = +v.pickpockets_racial_mod || 0;
    const abilityPickpockets = +v.pickpockets_ability_mod || 0;
    const magicPickpockets = +v.pickpockets_magic || 0;
    const oldSkill = +v.pickpockets || 0;
    const newSkill = Math.max(0, int(basePickpockets + racialPickpockets + abilityPickpockets + magicPickpockets));
    // clog(`oldThiefSkill: ${oldSkill} newThiefSkill: ${newSkill}`);
    if (migrate === 1) {
      if (oldSkill >= 0 && newSkill === 0) {
        output.pickpockets_base = oldSkill;
        // clog('Old pickpockets copied to Base/Class column');
      } else {
        output.pickpockets = newSkill;
      }
    } else {
      output.pickpockets = newSkill;
    }
    setAttrs(output, {silent: true});
  });
};

openlocksCalc = (migrate) => {
  getAttrs(['openlocks', 'openlocks_base', 'openlocks_racial_mod', 'openlocks_ability_mod', 'openlocks_magic'], (v) => {
    const output = {};
    const baseOpenlocks = +v.openlocks_base || 0;
    const racialOpenlocks = +v.openlocks_racial_mod || 0;
    const abilityOpenlocks = +v.openlocks_ability_mod || 0;
    const magicOpenlocks = +v.openlocks_magic || 0;
    const oldSkill = +v.openlocks || 0;
    const newSkill = Math.max(0, Math.min(100, int(baseOpenlocks + racialOpenlocks + abilityOpenlocks + magicOpenlocks)));
    // clog(`oldThiefSkill: ${oldSkill} newThiefSkill: ${newSkill}`);
    if (migrate === 1) {
      if (oldSkill >= 0 && newSkill === 0) {
        output.openlocks_base = oldSkill;
        // clog('Old openlocks copied to Base/Class column');
      } else {
        output.openlocks = newSkill;
      }
    } else {
      output.openlocks = newSkill;
    }
    setAttrs(output, {silent: true});
  });
};

findtrapsCalc = (migrate) => {
  getAttrs(['findtraps', 'findtraps_base', 'findtraps_racial_mod', 'findtraps_ability_mod', 'findtraps_magic'], (v) => {
    const output = {};
    const baseFindtraps = +v.findtraps_base || 0;
    const racialFindtraps = +v.findtraps_racial_mod || 0;
    const abilityFindtraps = +v.findtraps_ability_mod || 0;
    const magicFindtraps = +v.findtraps_magic || 0;
    const oldSkill = +v.findtraps || 0;
    const newSkill = Math.max(0, Math.min(100, int(baseFindtraps + racialFindtraps + abilityFindtraps + magicFindtraps)));
    // clog(`oldThiefSkill: ${oldSkill} newThiefSkill: ${newSkill}`);
    if (migrate === 1) {
      if (oldSkill >= 0 && newSkill === 0) {
        output.findtraps_base = oldSkill;
        // clog('Old findtraps copied to Base/Class column');
      } else {
        output.findtraps = newSkill;
      }
    } else {
      output.findtraps = newSkill;
    }
    setAttrs(output, {silent: true});
  });
};

movequietlyCalc = (migrate) => {
  getAttrs(['movequietly', 'movequietly_base', 'movequietly_racial_mod', 'movequietly_ability_mod', 'movequietly_magic'], (v) => {
    const output = {};
    const baseMovequietly = +v.movequietly_base || 0;
    const racialMovequietly = +v.movequietly_racial_mod || 0;
    const abilityMovequietly = +v.movequietly_ability_mod || 0;
    const magicMovequietly = +v.movequietly_magic || 0;
    const oldSkill = +v.movequietly || 0;
    const newSkill = Math.max(0, Math.min(100, int(baseMovequietly + racialMovequietly + abilityMovequietly + magicMovequietly)));
    // clog(`oldThiefSkill: ${oldSkill} newThiefSkill: ${newSkill}`);
    if (migrate === 1) {
      if (oldSkill >= 0 && newSkill === 0) {
        output.movequietly_base = oldSkill;
        // clog('Old movequietly copied to Base/Class column');
      } else {
        output.movequietly = newSkill;
      }
    } else {
      output.movequietly = newSkill;
    }
    setAttrs(output, {silent: true});
  });
};

hideinshadowsCalc = (migrate) => {
  getAttrs(['hideinshadows', 'hideinshadows_base', 'hideinshadows_racial_mod', 'hideinshadows_ability_mod', 'hideinshadows_magic'], (v) => {
    const output = {};
    const baseHideinshadows = +v.hideinshadows_base || 0;
    const racialHideinshadows = +v.hideinshadows_racial_mod || 0;
    const abilityHideinshadows = +v.hideinshadows_ability_mod || 0;
    const magicHideinshadows = +v.hideinshadows_magic || 0;
    const oldSkill = +v.hideinshadows || 0;
    const newSkill = Math.max(0, Math.min(100, int(baseHideinshadows + racialHideinshadows + abilityHideinshadows + magicHideinshadows)));
    // clog(`oldThiefSkill: ${oldSkill} newThiefSkill: ${newSkill}`);
    if (migrate === 1) {
      if (oldSkill >= 0 && newSkill === 0) {
        output.hideinshadows_base = oldSkill;
        // clog('Old hideinshadows copied to Base/Class column');
      } else {
        output.hideinshadows = newSkill;
      }
    } else {
      output.hideinshadows = newSkill;
    }
    setAttrs(output, {silent: true});
  });
};

hearnoiseCalc = (migrate) => {
  getAttrs(['hearnoise', 'hearnoise_base', 'hearnoise_racial_mod', 'hearnoise_ability_mod', 'hearnoise_magic'], (v) => {
    const output = {};
    const baseHearnoise = +v.hearnoise_base || 0;
    const racialHearnoise = +v.hearnoise_racial_mod || 0;
    const abilityHearnoise = +v.hearnoise_ability_mod || 0;
    const magicHearnoise = +v.hearnoise_magic || 0;
    const oldSkill = +v.hearnoise || 0;
    const newSkill = Math.max(0, Math.min(100, int(baseHearnoise + racialHearnoise + abilityHearnoise + magicHearnoise)));
    // clog(`oldThiefSkill: ${oldSkill} newThiefSkill: ${newSkill}`);
    if (migrate === 1) {
      if (oldSkill >= 0 && newSkill === 0) {
        output.hearnoise_base = oldSkill;
        // clog('Old hearnoise copied to Base/Class column');
      } else {
        output.hearnoise = newSkill;
      }
    } else {
      output.hearnoise = newSkill;
    }
    setAttrs(output, {silent: true});
  });
};

climbwallsCalc = (migrate) => {
  getAttrs(['climbwalls', 'climbwalls_base', 'climbwalls_racial_mod', 'climbwalls_ability_mod', 'climbwalls_magic'], (v) => {
    const output = {};
    let baseClimbwalls = +v.climbwalls_base || 0;
    baseClimbwalls = baseClimbwalls >= 99.1 ? baseClimbwalls.toFixed(1) : Math.floor(baseClimbwalls);
    const racialClimbwalls = +v.climbwalls_racial_mod || 0;
    const abilityClimbwalls = +v.climbwalls_ability_mod || 0;
    const magicClimbwalls = +v.climbwalls_magic || 0;
    const oldSkill = +v.climbwalls || 0;
    const newSkill = Math.max(0, Math.min(100, baseClimbwalls + int(racialClimbwalls + abilityClimbwalls + magicClimbwalls)));
    const macroNormal =
      '@{whisper_pc} &{template:general} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=Climb Walls}} {{roll_low=[[ 1d100 ]]%}} {{roll_target=[[ @{climbwalls} ]]%}}';
    const macroExceptional =
      '@{whisper_pc} &{template:general} {{color=@{color_option}}} {{name=@{character_name}}} {{subtag=Climb Walls}} {{roll_low=[[ 1d100 + [[1d10/10]] ]]%}} {{roll_target=[[ @{climbwalls} ]]%}}';
    // clog(`oldThiefSkill: ${oldSkill} newThiefSkill: ${newSkill}`);
    if (migrate === 1) {
      if (oldSkill >= 0 && newSkill === 0) {
        output.climbwalls_base = oldSkill;
        // clog('Old climbwalls copied to Base/Class column');
      } else {
        output.climbwalls = newSkill;
      }
    } else {
      output.climbwalls = newSkill;
      output.climbwalls_macro_text = newSkill >= 99.1 ? macroExceptional : macroNormal;
    }
    setAttrs(output, {silent: true});
  });
};

readlanguagesCalc = (migrate) => {
  getAttrs(['readlanguages', 'readlanguages_base', 'readlanguages_racial_mod', 'readlanguages_ability_mod', 'readlanguages_magic'], (v) => {
    const output = {};
    const baseReadlanguages = +v.readlanguages_base || 0;
    const racialReadlanguages = +v.readlanguages_racial_mod || 0;
    const abilityReadlanguages = +v.readlanguages_ability_mod || 0;
    const magicReadlanguages = +v.readlanguages_magic || 0;
    const oldSkill = +v.readlanguages || 0;
    const newSkill = Math.max(0, Math.min(100, int(baseReadlanguages + racialReadlanguages + abilityReadlanguages + magicReadlanguages)));
    // clog(`oldThiefSkill: ${oldSkill} newThiefSkill: ${newSkill}`);
    if (migrate === 1) {
      if (oldSkill >= 0 && newSkill === 0) {
        output.readlanguages_base = oldSkill;
        // clog('Old readlanguages copied to Base/Class column');
      } else {
        output.readlanguages = newSkill;
      }
    } else {
      output.readlanguages = newSkill;
    }
    setAttrs(output, {silent: true});
  });
};

thiefmiscCalc = () => {
  getAttrs(['thiefmisc', 'thiefmisc_base', 'thiefmisc_racial_mod', 'thiefmisc_ability_mod', 'thiefmisc_magic'], (v) => {
    const output = {};
    const baseThiefmisc = +v.thiefmisc_base || 0;
    const racialThiefmisc = +v.thiefmisc_racial_mod || 0;
    const abilityThiefmisc = +v.thiefmisc_ability_mod || 0;
    const magicThiefmisc = +v.thiefmisc_magic || 0;
    // const oldSkill = +v.thiefmisc || 0;
    const newSkill = Math.max(0, Math.min(100, int(baseThiefmisc + racialThiefmisc + abilityThiefmisc + magicThiefmisc)));
    output.thiefmisc = newSkill;
    setAttrs(output, {silent: true});
  });
};

thiefmisc1Calc = () => {
  getAttrs(['thiefmisc1', 'thiefmisc1_base', 'thiefmisc1_racial_mod', 'thiefmisc1_ability_mod', 'thiefmisc1_magic'], (v) => {
    const output = {};
    const baseThiefmisc1 = +v.thiefmisc1_base || 0;
    const racialThiefmisc1 = +v.thiefmisc1_racial_mod || 0;
    const abilityThiefmisc1 = +v.thiefmisc1_ability_mod || 0;
    const magicThiefmisc1 = +v.thiefmisc1_magic || 0;
    // const oldSkill = +v.thiefmisc1 || 0;
    const newSkill = Math.max(0, Math.min(100, int(baseThiefmisc1 + racialThiefmisc1 + abilityThiefmisc1 + magicThiefmisc1)));
    output.thiefmisc1 = newSkill;
    setAttrs(output, {silent: true});
  });
};

thiefmisc2Calc = () => {
  getAttrs(['thiefmisc2', 'thiefmisc2_base', 'thiefmisc2_racial_mod', 'thiefmisc2_ability_mod', 'thiefmisc2_magic'], (v) => {
    const output = {};
    const baseThiefmisc2 = +v.thiefmisc2_base || 0;
    const racialThiefmisc2 = +v.thiefmisc2_racial_mod || 0;
    const abilityThiefmisc2 = +v.thiefmisc2_ability_mod || 0;
    const magicThiefmisc2 = +v.thiefmisc2_magic || 0;
    // const oldSkill = +v.thiefmisc2 || 0;
    const newSkill = Math.max(0, Math.min(100, int(baseThiefmisc2 + racialThiefmisc2 + abilityThiefmisc2 + magicThiefmisc2)));
    output.thiefmisc2 = newSkill;
    setAttrs(output, {silent: true});
  });
};

on('change:pickpockets_base change:pickpockets_racial_mod change:pickpockets_ability_mod change:pickpockets_magic', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  pickpocketsCalc();
});
on('change:openlocks_base change:openlocks_racial_mod change:openlocks_ability_mod change:openlocks_magic', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  openlocksCalc();
});
on('change:findtraps_base change:findtraps_racial_mod change:findtraps_ability_mod change:findtraps_magic', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  findtrapsCalc();
});
on('change:movequietly_base change:movequietly_racial_mod change:movequietly_ability_mod change:movequietly_magic', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  movequietlyCalc();
});
on('change:hideinshadows_base change:hideinshadows_racial_mod change:hideinshadows_ability_mod change:hideinshadows_magic', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  hideinshadowsCalc();
});
on('change:hearnoise_base change:hearnoise_racial_mod change:hearnoise_ability_mod change:hearnoise_magic', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  hearnoiseCalc();
});
on('change:climbwalls_base change:climbwalls_racial_mod change:climbwalls_ability_mod change:climbwalls_magic', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  climbwallsCalc();
});
on('change:readlanguages_base change:readlanguages_racial_mod change:readlanguages_ability_mod change:readlanguages_magic', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  readlanguagesCalc();
});
on('change:thiefmisc_base change:thiefmisc_racial_mod change:thiefmisc_ability_mod change:thiefmisc_magic', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  thiefmiscCalc();
});
on('change:thiefmisc1_base change:thiefmisc1_racial_mod change:thiefmisc1_ability_mod change:thiefmisc1_magic', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  thiefmisc1Calc();
});
on('change:thiefmisc2_base change:thiefmisc2_racial_mod change:thiefmisc2_ability_mod change:thiefmisc2_magic', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  thiefmisc2Calc();
});

// Thief Autofill Base Column
on(
  'change:thief_level change:autofill_thief change:sync_thief_class change:thief_class_selected change:class change:secondclass change:thirdclass change:level change:level_2 change:level_3',
  (eventInfo) => {
    // clog(`Thief Autofill Change Detected:${eventInfo.sourceAttribute}`);
    getAttrs(['thief_level', 'autofill_thief', 'sync_thief_class', 'thief_class_selected', 'class', 'secondclass', 'thirdclass', 'level', 'level_2', 'level_3'], (v) => {
      const output = {};
      const autocalcFill = +v.autofill_thief;
      const syncClass = +v.sync_thief_class;
      // bail out if auto-fill is not enabled.
      if (!autocalcFill) return;
      const classLinked = +v.thief_class_selected;
      let levelSelected = +v.thief_level || 0;
      const class1Name = (v.class || '').trim();
      const class2Name = (v.secondclass || '').trim();
      const class3Name = (v.thirdclass || '').trim();
      const setThiefSkills = (levelSelected) => {
        if (levelSelected === 0) {
          output.pickpockets_base = 0;
          output.openlocks_base = 0;
          output.findtraps_base = 0;
          output.movequietly_base = 0;
          output.hideinshadows_base = 0;
          output.hearnoise_base = 0;
          output.climbwalls_base = 0;
          output.readlanguages_base = 0;
        }
        if (levelSelected === 1) {
          output.pickpockets_base = 30;
          output.openlocks_base = 25;
          output.findtraps_base = 20;
          output.movequietly_base = 15;
          output.hideinshadows_base = 10;
          output.hearnoise_base = 10;
          output.climbwalls_base = 85;
          output.readlanguages_base = 0;
        }
        if (levelSelected === 2) {
          output.pickpockets_base = 35;
          output.openlocks_base = 29;
          output.findtraps_base = 25;
          output.movequietly_base = 21;
          output.hideinshadows_base = 15;
          output.hearnoise_base = 10;
          output.climbwalls_base = 86;
          output.readlanguages_base = 0;
        }
        if (levelSelected === 3) {
          output.pickpockets_base = 40;
          output.openlocks_base = 33;
          output.findtraps_base = 30;
          output.movequietly_base = 27;
          output.hideinshadows_base = 20;
          output.hearnoise_base = 15;
          output.climbwalls_base = 87;
          output.readlanguages_base = 0;
        }
        if (levelSelected === 4) {
          output.pickpockets_base = 45;
          output.openlocks_base = 37;
          output.findtraps_base = 35;
          output.movequietly_base = 33;
          output.hideinshadows_base = 25;
          output.hearnoise_base = 15;
          output.climbwalls_base = 88;
          output.readlanguages_base = 20;
        }
        if (levelSelected === 5) {
          output.pickpockets_base = 50;
          output.openlocks_base = 42;
          output.findtraps_base = 40;
          output.movequietly_base = 40;
          output.hideinshadows_base = 31;
          output.hearnoise_base = 20;
          output.climbwalls_base = 90;
          output.readlanguages_base = 25;
        }
        if (levelSelected === 6) {
          output.pickpockets_base = 55;
          output.openlocks_base = 47;
          output.findtraps_base = 45;
          output.movequietly_base = 47;
          output.hideinshadows_base = 37;
          output.hearnoise_base = 20;
          output.climbwalls_base = 92;
          output.readlanguages_base = 30;
        }
        if (levelSelected === 7) {
          output.pickpockets_base = 60;
          output.openlocks_base = 52;
          output.findtraps_base = 50;
          output.movequietly_base = 55;
          output.hideinshadows_base = 43;
          output.hearnoise_base = 25;
          output.climbwalls_base = 94;
          output.readlanguages_base = 35;
        }
        if (levelSelected === 8) {
          output.pickpockets_base = 65;
          output.openlocks_base = 57;
          output.findtraps_base = 55;
          output.movequietly_base = 62;
          output.hideinshadows_base = 49;
          output.hearnoise_base = 25;
          output.climbwalls_base = 96;
          output.readlanguages_base = 40;
        }
        if (levelSelected === 9) {
          output.pickpockets_base = 70;
          output.openlocks_base = 62;
          output.findtraps_base = 60;
          output.movequietly_base = 70;
          output.hideinshadows_base = 56;
          output.hearnoise_base = 30;
          output.climbwalls_base = 98;
          output.readlanguages_base = 45;
        }
        if (levelSelected === 10) {
          output.pickpockets_base = 80;
          output.openlocks_base = 67;
          output.findtraps_base = 65;
          output.movequietly_base = 78;
          output.hideinshadows_base = 63;
          output.hearnoise_base = 30;
          output.climbwalls_base = 99;
          output.readlanguages_base = 50;
        }
        if (levelSelected === 11) {
          output.pickpockets_base = 90;
          output.openlocks_base = 72;
          output.findtraps_base = 70;
          output.movequietly_base = 86;
          output.hideinshadows_base = 70;
          output.hearnoise_base = 35;
          output.climbwalls_base = 99.1;
          output.readlanguages_base = 55;
        }
        if (levelSelected === 12) {
          output.pickpockets_base = 100;
          output.openlocks_base = 77;
          output.findtraps_base = 75;
          output.movequietly_base = 94;
          output.hideinshadows_base = 77;
          output.hearnoise_base = 35;
          output.climbwalls_base = 99.2;
          output.readlanguages_base = 60;
        }
        if (levelSelected === 13) {
          output.pickpockets_base = 105;
          output.openlocks_base = 82;
          output.findtraps_base = 80;
          output.movequietly_base = 99;
          output.hideinshadows_base = 85;
          output.hearnoise_base = 40;
          output.climbwalls_base = 99.3;
          output.readlanguages_base = 65;
        }
        if (levelSelected === 14) {
          output.pickpockets_base = 110;
          output.openlocks_base = 87;
          output.findtraps_base = 85;
          output.movequietly_base = 99;
          output.hideinshadows_base = 93;
          output.hearnoise_base = 40;
          output.climbwalls_base = 99.4;
          output.readlanguages_base = 70;
        }
        if (levelSelected === 15) {
          output.pickpockets_base = 115;
          output.openlocks_base = 92;
          output.findtraps_base = 90;
          output.movequietly_base = 99;
          output.hideinshadows_base = 99;
          output.hearnoise_base = 50;
          output.climbwalls_base = 99.5;
          output.readlanguages_base = 75;
        }
        if (levelSelected === 16) {
          output.pickpockets_base = 125;
          output.openlocks_base = 97;
          output.findtraps_base = 95;
          output.movequietly_base = 99;
          output.hideinshadows_base = 99;
          output.hearnoise_base = 50;
          output.climbwalls_base = 99.6;
          output.readlanguages_base = 80;
        }
        if (levelSelected === 17) {
          output.pickpockets_base = 125;
          output.openlocks_base = 99;
          output.findtraps_base = 99;
          output.movequietly_base = 99;
          output.hideinshadows_base = 99;
          output.hearnoise_base = 55;
          output.climbwalls_base = 99.7;
          output.readlanguages_base = 80;
        }
        if (levelSelected > 17) {
          output.pickpockets_base = 125;
          output.openlocks_base = 99;
          output.findtraps_base = 99;
          output.movequietly_base = 99;
          output.hideinshadows_base = 99;
          output.hearnoise_base = 55;
          output.climbwalls_base = 99.7;
          output.readlanguages_base = 80;
        }
      };
      // sync enabled?
      // check for selected class and use that class level unless changed
      if (syncClass === 1) {
        if (classLinked === 1) {
          classSelected = matchClassName(class1Name);
          levelSelected = +v.level;
          clog(`Linked Class is: ${class1Name} ${classSelected} Current Level:${v.level}`);
          output.thief_level = classSelected === 4 ? levelSelected : 0;
          setThiefSkills(levelSelected);
        } else if (classLinked === 2) {
          classSelected = matchClassName(class2Name);
          levelSelected = +v.level_2;
          clog(`Linked Class is: ${class2Name} ${classSelected} Current Level:${v.level_2}`);
          output.thief_level = classSelected === 4 ? levelSelected : 0;
          setThiefSkills(levelSelected);
        } else if (classLinked === 3) {
          classSelected = matchClassName(class3Name);
          levelSelected = +v.level_3;
          clog(`Linked Class is: ${class3Name} ${classSelected} Current Level:${v.level_3}`);
          output.thief_level = classSelected === 4 ? levelSelected : 0;
          setThiefSkills(levelSelected);
        }
      } else {
        setThiefSkills(levelSelected);
      }
      setAttrs(output);
    });
  },
);

// Save Calcs
saveparalysispoisondeathCalc = (migrate) => {
  getAttrs(
    [
      'saveparalysispoisondeath',
      'saveparalysispoisondeath_base',
      'saveparalysispoisondeath_racial_mod',
      'saveparalysispoisondeath_ability_mod',
      'saveparalysispoisondeath_misc_mod',
      'saveparalysispoisondeath_temp_mod',
    ],
    (v) => {
      const output = {};
      const baseSaveparalysispoisondeath = +v.saveparalysispoisondeath_base;
      const racialSaveparalysispoisondeath = +v.saveparalysispoisondeath_racial_mod;
      const abilitySaveparalysispoisondeath = +v.saveparalysispoisondeath_ability_mod;
      const miscSaveparalysispoisondeath = +v.saveparalysispoisondeath_misc_mod;
      const tempSaveparalysispoisondeath = +v.saveparalysispoisondeath_temp_mod;
      const oldSave = +v.saveparalysispoisondeath || 0;
      const newSave = int(
        baseSaveparalysispoisondeath + racialSaveparalysispoisondeath + abilitySaveparalysispoisondeath + miscSaveparalysispoisondeath + tempSaveparalysispoisondeath,
      );
      // clog(`oldSave: ${oldSave} newSave: ${newSave}`);
      if (migrate === 1) {
        if (oldSave <= 20 && newSave === 20) {
          output.saveparalysispoisondeath_base = oldSave;
          // clog('Old saveparalysispoisondeath copied to Base/Class column');
        } else {
          output.saveparalysispoisondeath = newSave;
        }
      } else {
        output.saveparalysispoisondeath = newSave;
      }
      setAttrs(output, {silent: true});
    },
  );
};

savepetrificationpolymorphCalc = (migrate) => {
  getAttrs(
    [
      'savepetrificationpolymorph',
      'savepetrificationpolymorph_base',
      'savepetrificationpolymorph_racial_mod',
      'savepetrificationpolymorph_ability_mod',
      'savepetrificationpolymorph_misc_mod',
      'savepetrificationpolymorph_temp_mod',
    ],
    (v) => {
      const output = {};
      const baseSavepetrificationpolymorph = +v.savepetrificationpolymorph_base;
      const racialSavepetrificationpolymorph = +v.savepetrificationpolymorph_racial_mod;
      const abilitySavepetrificationpolymorph = +v.savepetrificationpolymorph_ability_mod;
      const miscSavepetrificationpolymorph = +v.savepetrificationpolymorph_misc_mod;
      const tempSavepetrificationpolymorph = +v.savepetrificationpolymorph_temp_mod;
      const oldSave = +v.savepetrificationpolymorph || 0;
      const newSave = int(
        baseSavepetrificationpolymorph + racialSavepetrificationpolymorph + abilitySavepetrificationpolymorph + miscSavepetrificationpolymorph + tempSavepetrificationpolymorph,
      );
      // clog(`oldSave: ${oldSave} newSave: ${newSave}`);
      if (migrate === 1) {
        if (oldSave <= 20 && newSave === 20) {
          output.savepetrificationpolymorph_base = oldSave;
          // clog('Old savepetrificationpolymorph copied to Base/Class column');
        } else {
          output.savepetrificationpolymorph = newSave;
        }
      } else {
        output.savepetrificationpolymorph = newSave;
      }
      setAttrs(output, {silent: true});
    },
  );
};

saverodsstaveswandsCalc = (migrate) => {
  getAttrs(
    [
      'saverodsstaveswands',
      'saverodsstaveswands_base',
      'saverodsstaveswands_racial_mod',
      'saverodsstaveswands_ability_mod',
      'saverodsstaveswands_misc_mod',
      'saverodsstaveswands_temp_mod',
    ],
    (v) => {
      const output = {};
      const baseSaverodsstaveswands = +v.saverodsstaveswands_base;
      const racialSaverodsstaveswands = +v.saverodsstaveswands_racial_mod;
      const abilitySaverodsstaveswands = +v.saverodsstaveswands_ability_mod;
      const miscSaverodsstaveswands = +v.saverodsstaveswands_misc_mod;
      const tempSaverodsstaveswands = +v.saverodsstaveswands_temp_mod;
      const oldSave = +v.saverodsstaveswands || 0;
      const newSave = int(baseSaverodsstaveswands + racialSaverodsstaveswands + abilitySaverodsstaveswands + miscSaverodsstaveswands + tempSaverodsstaveswands);
      // clog(`oldSave: ${oldSave} newSave: ${newSave}`);
      if (migrate === 1) {
        if (oldSave <= 20 && newSave === 20) {
          output.saverodsstaveswands_base = oldSave;
          // clog('Old saverodsstaveswands copied to Base/Class column');
        } else {
          output.saverodsstaveswands = newSave;
        }
      } else {
        output.saverodsstaveswands = newSave;
      }
      setAttrs(output, {silent: true});
    },
  );
};

savebreathweaponsCalc = (migrate) => {
  getAttrs(
    ['savebreathweapons', 'savebreathweapons_base', 'savebreathweapons_racial_mod', 'savebreathweapons_ability_mod', 'savebreathweapons_misc_mod', 'savebreathweapons_temp_mod'],
    (v) => {
      const output = {};
      const baseSavebreathweapons = +v.savebreathweapons_base;
      const racialSavebreathweapons = +v.savebreathweapons_racial_mod;
      const abilitySavebreathweapons = +v.savebreathweapons_ability_mod;
      const miscSavebreathweapons = +v.savebreathweapons_misc_mod;
      const tempSavebreathweapons = +v.savebreathweapons_temp_mod;
      const oldSave = +v.savebreathweapons || 0;
      const newSave = int(baseSavebreathweapons + racialSavebreathweapons + abilitySavebreathweapons + miscSavebreathweapons + tempSavebreathweapons);
      // clog(`oldSave: ${oldSave} newSave: ${newSave}`);
      if (migrate === 1) {
        if (oldSave <= 20 && newSave === 20) {
          output.savebreathweapons_base = oldSave;
          // clog('Old savebreathweapons copied to Base/Class column');
        } else {
          output.savebreathweapons = newSave;
        }
      } else {
        output.savebreathweapons = newSave;
      }
      setAttrs(output, {silent: true});
    },
  );
};

savespellsCalc = (migrate) => {
  getAttrs(['savespells', 'savespells_base', 'savespells_racial_mod', 'savespells_ability_mod', 'savespells_misc_mod', 'savespells_temp_mod'], (v) => {
    const output = {};
    const baseSavespells = +v.savespells_base;
    const racialSavespells = +v.savespells_racial_mod;
    const abilitySavespells = +v.savespells_ability_mod;
    const miscSavespells = +v.savespells_misc_mod;
    const tempSavespells = +v.savespells_temp_mod;
    const oldSave = +v.savespells || 0;
    const newSave = int(baseSavespells + racialSavespells + abilitySavespells + miscSavespells + tempSavespells);
    // clog(`oldSave: ${oldSave} newSave: ${newSave}`);
    if (migrate === 1) {
      if (oldSave <= 20 && newSave === 20) {
        output.savespells_base = oldSave;
        // clog('Old savespells copied to Base/Class column');
      } else {
        output.savespells = newSave;
      }
    } else {
      output.savespells = newSave;
      // clog('Save row calculated');
    }
    setAttrs(output, {silent: true});
  });
};

savemiscCalc = () => {
  getAttrs(['savemisc', 'savemisc_base', 'savemisc_racial_mod', 'savemisc_ability_mod', 'savemisc_misc_mod', 'savemisc_temp_mod'], (v) => {
    const output = {};
    const baseSavemisc = +v.savemisc_base;
    const racialSavemisc = +v.savemisc_racial_mod;
    const abilitySavemisc = +v.savemisc_ability_mod;
    const miscSavemisc = +v.savemisc_misc_mod;
    const tempSavemisc = +v.savemisc_temp_mod;
    const newSave = int(baseSavemisc + racialSavemisc + abilitySavemisc + miscSavemisc + tempSavemisc);
    output.savemisc = newSave;
    setAttrs(output, {silent: true});
  });
};

savemisc1Calc = () => {
  getAttrs(['savemisc1', 'savemisc1_base', 'savemisc1_racial_mod', 'savemisc1_ability_mod', 'savemisc1_misc_mod', 'savemisc1_temp_mod'], (v) => {
    const output = {};
    const baseSavemisc1 = +v.savemisc1_base;
    const racialSavemisc1 = +v.savemisc1_racial_mod;
    const abilitySavemisc1 = +v.savemisc1_ability_mod;
    const miscSavemisc1 = +v.savemisc1_misc_mod;
    const tempSavemisc1 = +v.savemisc1_temp_mod;
    // const oldSave = +v.savemisc1 || 0;
    const newSave = int(baseSavemisc1 + racialSavemisc1 + abilitySavemisc1 + miscSavemisc1 + tempSavemisc1);
    output.savemisc1 = newSave;
    setAttrs(output, {silent: true});
  });
};

savemisc2Calc = () => {
  getAttrs(['savemisc2', 'savemisc2_base', 'savemisc2_racial_mod', 'savemisc2_ability_mod', 'savemisc2_misc_mod', 'savemisc2_temp_mod'], (v) => {
    const output = {};
    const baseSavemisc2 = +v.savemisc2_base;
    const racialSavemisc2 = +v.savemisc2_racial_mod;
    const abilitySavemisc2 = +v.savemisc2_ability_mod;
    const miscSavemisc2 = +v.savemisc2_misc_mod;
    const tempSavemisc2 = +v.savemisc2_temp_mod;
    // const oldSave = +v.savemisc1 || 0;
    const newSave = int(baseSavemisc2 + racialSavemisc2 + abilitySavemisc2 + miscSavemisc2 + tempSavemisc2);
    output.savemisc2 = newSave;
    setAttrs(output, {silent: true});
  });
};

on(
  'change:saveparalysispoisondeath_base change:saveparalysispoisondeath_racial_mod change:saveparalysispoisondeath_ability_mod change:saveparalysispoisondeath_misc_mod change:saveparalysispoisondeath_temp_mod',
  (eventInfo) => {
    // clog(`Change Detected:${eventInfo.sourceAttribute}`);
    saveparalysispoisondeathCalc();
  },
);
on(
  'change:savepetrificationpolymorph_base change:savepetrificationpolymorph_racial_mod change:savepetrificationpolymorph_ability_mod change:savepetrificationpolymorph_misc_mod change:savepetrificationpolymorph_temp_mod',
  (eventInfo) => {
    // clog(`Change Detected:${eventInfo.sourceAttribute}`);
    savepetrificationpolymorphCalc();
  },
);
on(
  'change:saverodsstaveswands_base change:saverodsstaveswands_racial_mod change:saverodsstaveswands_ability_mod change:saverodsstaveswands_misc_mod change:saverodsstaveswands_temp_mod',
  (eventInfo) => {
    // clog(`Change Detected:${eventInfo.sourceAttribute}`);
    saverodsstaveswandsCalc();
  },
);
on(
  'change:savebreathweapons_base change:savebreathweapons_racial_mod change:savebreathweapons_ability_mod change:savebreathweapons_misc_mod change:savebreathweapons_temp_mod',
  (eventInfo) => {
    // clog(`Change Detected:${eventInfo.sourceAttribute}`);
    savebreathweaponsCalc();
  },
);
on('change:savespells_base change:savespells_racial_mod change:savespells_ability_mod change:savespells_misc_mod change:savespells_temp_mod', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  savespellsCalc();
});
on('change:savemisc_base change:savemisc_racial_mod change:savemisc_ability_mod change:savemisc_misc_mod change:savemisc_temp_mod', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  savemiscCalc();
});
on('change:savemisc1_base change:savemisc1_racial_mod change:savemisc1_ability_mod change:savemisc1_misc_mod change:savemisc1_temp_mod', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  savemisc1Calc();
});
on('change:savemisc2_base change:savemisc2_racial_mod change:savemisc2_ability_mod change:savemisc2_misc_mod change:savemisc2_temp_mod', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  savemisc2Calc();
});

// Saves Autofill Base Column
on('change:saves_class change:saves_level change:autofill_saves', (eventInfo) => {
  clog(`Saves Autofill Change Detected:${eventInfo.sourceAttribute}`);
  getAttrs(['saves_class', 'saves_level', 'autofill_saves'], (v) => {
    const output = {};
    const autocalcFill = +v.autofill_saves;
    // bail out if auto-fill is not enabled.
    if (!autocalcFill) return;
    const classSelected = +v.saves_class;
    const levelSelected = +v.saves_level || 0;
    clog(`Class:${classSelected} Level:${levelSelected}`);
    // do saves per class and level here
    if (classSelected === 0) return;
    // Cleric
    if (classSelected === 1) {
      if (levelSelected === 0) {
        // clog('Need to choose a class level greater than 0 to continue.');
      } else if (levelSelected < 4) {
        output.saveparalysispoisondeath_base = 10;
        output.savepetrificationpolymorph_base = 13;
        output.saverodsstaveswands_base = 14;
        output.savebreathweapons_base = 16;
        output.savespells_base = 15;
      } else if (levelSelected < 7) {
        output.saveparalysispoisondeath_base = 9;
        output.savepetrificationpolymorph_base = 12;
        output.saverodsstaveswands_base = 13;
        output.savebreathweapons_base = 15;
        output.savespells_base = 14;
      } else if (levelSelected < 10) {
        output.saveparalysispoisondeath_base = 7;
        output.savepetrificationpolymorph_base = 10;
        output.saverodsstaveswands_base = 11;
        output.savebreathweapons_base = 13;
        output.savespells_base = 12;
      } else if (levelSelected < 13) {
        output.saveparalysispoisondeath_base = 6;
        output.savepetrificationpolymorph_base = 9;
        output.saverodsstaveswands_base = 10;
        output.savebreathweapons_base = 12;
        output.savespells_base = 11;
      } else if (levelSelected < 16) {
        output.saveparalysispoisondeath_base = 5;
        output.savepetrificationpolymorph_base = 8;
        output.saverodsstaveswands_base = 9;
        output.savebreathweapons_base = 11;
        output.savespells_base = 10;
      } else if (levelSelected < 19) {
        output.saveparalysispoisondeath_base = 4;
        output.savepetrificationpolymorph_base = 7;
        output.saverodsstaveswands_base = 8;
        output.savebreathweapons_base = 10;
        output.savespells_base = 9;
      } else if (levelSelected >= 19) {
        output.saveparalysispoisondeath_base = 2;
        output.savepetrificationpolymorph_base = 5;
        output.saverodsstaveswands_base = 6;
        output.savebreathweapons_base = 8;
        output.savespells_base = 7;
      }
    }
    // Druid
    if (classSelected === 2) {
      if (levelSelected === 0) {
        // clog('Need to choose a class level greater than 0 to continue.');
      } else if (levelSelected < 4) {
        output.saveparalysispoisondeath_base = 10;
        output.savepetrificationpolymorph_base = 13;
        output.saverodsstaveswands_base = 14;
        output.savebreathweapons_base = 16;
        output.savespells_base = 15;
      } else if (levelSelected < 7) {
        output.saveparalysispoisondeath_base = 9;
        output.savepetrificationpolymorph_base = 12;
        output.saverodsstaveswands_base = 13;
        output.savebreathweapons_base = 15;
        output.savespells_base = 14;
      } else if (levelSelected < 10) {
        output.saveparalysispoisondeath_base = 7;
        output.savepetrificationpolymorph_base = 10;
        output.saverodsstaveswands_base = 11;
        output.savebreathweapons_base = 13;
        output.savespells_base = 12;
      } else if (levelSelected < 13) {
        output.saveparalysispoisondeath_base = 6;
        output.savepetrificationpolymorph_base = 9;
        output.saverodsstaveswands_base = 10;
        output.savebreathweapons_base = 12;
        output.savespells_base = 11;
      } else if (levelSelected < 16) {
        output.saveparalysispoisondeath_base = 5;
        output.savepetrificationpolymorph_base = 8;
        output.saverodsstaveswands_base = 9;
        output.savebreathweapons_base = 11;
        output.savespells_base = 10;
      } else if (levelSelected >= 16) {
        output.saveparalysispoisondeath_base = 5;
        output.savepetrificationpolymorph_base = 8;
        output.saverodsstaveswands_base = 9;
        output.savebreathweapons_base = 11;
        output.savespells_base = 10;
      }
    }
    // Fighter, Paladin, or Ranger or Other 0-lvl Types
    if (classSelected === 3 || classSelected === 8) {
      if (levelSelected === 0) {
        output.saveparalysispoisondeath_base = 16;
        output.savepetrificationpolymorph_base = 17;
        output.saverodsstaveswands_base = 18;
        output.savebreathweapons_base = 20;
        output.savespells_base = 19;
      } else if (levelSelected < 3) {
        output.saveparalysispoisondeath_base = 14;
        output.savepetrificationpolymorph_base = 15;
        output.saverodsstaveswands_base = 16;
        output.savebreathweapons_base = 17;
        output.savespells_base = 17;
      } else if (levelSelected < 5) {
        output.saveparalysispoisondeath_base = 13;
        output.savepetrificationpolymorph_base = 14;
        output.saverodsstaveswands_base = 15;
        output.savebreathweapons_base = 16;
        output.savespells_base = 16;
      } else if (levelSelected < 7) {
        output.saveparalysispoisondeath_base = 11;
        output.savepetrificationpolymorph_base = 12;
        output.saverodsstaveswands_base = 13;
        output.savebreathweapons_base = 13;
        output.savespells_base = 14;
      } else if (levelSelected < 9) {
        output.saveparalysispoisondeath_base = 10;
        output.savepetrificationpolymorph_base = 11;
        output.saverodsstaveswands_base = 12;
        output.savebreathweapons_base = 12;
        output.savespells_base = 13;
      } else if (levelSelected < 11) {
        output.saveparalysispoisondeath_base = 8;
        output.savepetrificationpolymorph_base = 9;
        output.saverodsstaveswands_base = 10;
        output.savebreathweapons_base = 9;
        output.savespells_base = 11;
      } else if (levelSelected < 13) {
        output.saveparalysispoisondeath_base = 7;
        output.savepetrificationpolymorph_base = 8;
        output.saverodsstaveswands_base = 9;
        output.savebreathweapons_base = 8;
        output.savespells_base = 10;
      } else if (levelSelected < 15) {
        output.saveparalysispoisondeath_base = 5;
        output.savepetrificationpolymorph_base = 6;
        output.saverodsstaveswands_base = 7;
        output.savebreathweapons_base = 5;
        output.savespells_base = 8;
      } else if (levelSelected < 17) {
        output.saveparalysispoisondeath_base = 4;
        output.savepetrificationpolymorph_base = 5;
        output.saverodsstaveswands_base = 6;
        output.savebreathweapons_base = 4;
        output.savespells_base = 7;
      } else if (levelSelected >= 17) {
        output.saveparalysispoisondeath_base = 3;
        output.savepetrificationpolymorph_base = 4;
        output.saverodsstaveswands_base = 5;
        output.savebreathweapons_base = 4;
        output.savespells_base = 6;
      }
    }
    // Magic-User or Illusionist
    if (classSelected === 4) {
      if (levelSelected === 0) {
        // clog('Need to choose a class level greater than 0 to continue.');
      } else if (levelSelected < 6) {
        output.saveparalysispoisondeath_base = 14;
        output.savepetrificationpolymorph_base = 13;
        output.saverodsstaveswands_base = 11;
        output.savebreathweapons_base = 15;
        output.savespells_base = 12;
      } else if (levelSelected < 11) {
        output.saveparalysispoisondeath_base = 13;
        output.savepetrificationpolymorph_base = 11;
        output.saverodsstaveswands_base = 9;
        output.savebreathweapons_base = 13;
        output.savespells_base = 10;
      } else if (levelSelected < 16) {
        output.saveparalysispoisondeath_base = 11;
        output.savepetrificationpolymorph_base = 9;
        output.saverodsstaveswands_base = 7;
        output.savebreathweapons_base = 11;
        output.savespells_base = 8;
      } else if (levelSelected < 21) {
        output.saveparalysispoisondeath_base = 10;
        output.savepetrificationpolymorph_base = 7;
        output.saverodsstaveswands_base = 5;
        output.savebreathweapons_base = 9;
        output.savespells_base = 6;
      } else if (levelSelected >= 21) {
        output.saveparalysispoisondeath_base = 8;
        output.savepetrificationpolymorph_base = 5;
        output.saverodsstaveswands_base = 3;
        output.savebreathweapons_base = 7;
        output.savespells_base = 4;
      }
    }
    // Thief
    if (classSelected === 5) {
      if (levelSelected === 0) {
        // clog('Need to choose a class level greater than 0 to continue.');
      } else if (levelSelected < 5) {
        output.saveparalysispoisondeath_base = 13;
        output.savepetrificationpolymorph_base = 12;
        output.saverodsstaveswands_base = 14;
        output.savebreathweapons_base = 16;
        output.savespells_base = 15;
      } else if (levelSelected < 9) {
        output.saveparalysispoisondeath_base = 12;
        output.savepetrificationpolymorph_base = 11;
        output.saverodsstaveswands_base = 12;
        output.savebreathweapons_base = 15;
        output.savespells_base = 13;
      } else if (levelSelected < 13) {
        output.saveparalysispoisondeath_base = 11;
        output.savepetrificationpolymorph_base = 10;
        output.saverodsstaveswands_base = 10;
        output.savebreathweapons_base = 14;
        output.savespells_base = 11;
      } else if (levelSelected < 17) {
        output.saveparalysispoisondeath_base = 10;
        output.savepetrificationpolymorph_base = 9;
        output.saverodsstaveswands_base = 8;
        output.savebreathweapons_base = 13;
        output.savespells_base = 9;
      } else if (levelSelected < 21) {
        output.saveparalysispoisondeath_base = 9;
        output.savepetrificationpolymorph_base = 8;
        output.saverodsstaveswands_base = 6;
        output.savebreathweapons_base = 12;
        output.savespells_base = 7;
      } else if (levelSelected >= 21) {
        output.saveparalysispoisondeath_base = 8;
        output.savepetrificationpolymorph_base = 7;
        output.saverodsstaveswands_base = 4;
        output.savebreathweapons_base = 11;
        output.savespells_base = 5;
      }
    }
    // Monk
    if (classSelected === 6) {
      if (levelSelected === 0) {
        // clog('Need to choose a class level greater than 0 to continue.');
      } else if (levelSelected < 5) {
        output.saveparalysispoisondeath_base = 13;
        output.savepetrificationpolymorph_base = 12;
        output.saverodsstaveswands_base = 14;
        output.savebreathweapons_base = 16;
        output.savespells_base = 15;
      } else if (levelSelected < 9) {
        output.saveparalysispoisondeath_base = 12;
        output.savepetrificationpolymorph_base = 11;
        output.saverodsstaveswands_base = 12;
        output.savebreathweapons_base = 15;
        output.savespells_base = 13;
      } else if (levelSelected < 13) {
        output.saveparalysispoisondeath_base = 11;
        output.savepetrificationpolymorph_base = 10;
        output.saverodsstaveswands_base = 10;
        output.savebreathweapons_base = 14;
        output.savespells_base = 11;
      } else if (levelSelected < 17) {
        output.saveparalysispoisondeath_base = 10;
        output.savepetrificationpolymorph_base = 9;
        output.saverodsstaveswands_base = 8;
        output.savebreathweapons_base = 13;
        output.savespells_base = 9;
      } else if (levelSelected >= 17) {
        output.saveparalysispoisondeath_base = 9;
        output.savepetrificationpolymorph_base = 8;
        output.saverodsstaveswands_base = 6;
        output.savebreathweapons_base = 12;
        output.savespells_base = 7;
      }
    }
    // Assassin
    if (classSelected === 7) {
      if (levelSelected === 0) {
        // clog('Need to choose a class level greater than 0 to continue.');
      } else if (levelSelected < 5) {
        output.saveparalysispoisondeath_base = 13;
        output.savepetrificationpolymorph_base = 12;
        output.saverodsstaveswands_base = 14;
        output.savebreathweapons_base = 16;
        output.savespells_base = 15;
      } else if (levelSelected < 9) {
        output.saveparalysispoisondeath_base = 12;
        output.savepetrificationpolymorph_base = 11;
        output.saverodsstaveswands_base = 12;
        output.savebreathweapons_base = 15;
        output.savespells_base = 13;
      } else if (levelSelected < 13) {
        output.saveparalysispoisondeath_base = 11;
        output.savepetrificationpolymorph_base = 10;
        output.saverodsstaveswands_base = 10;
        output.savebreathweapons_base = 14;
        output.savespells_base = 11;
      } else if (levelSelected < 16) {
        output.saveparalysispoisondeath_base = 10;
        output.savepetrificationpolymorph_base = 9;
        output.saverodsstaveswands_base = 8;
        output.savebreathweapons_base = 13;
        output.savespells_base = 9;
      } else if (levelSelected >= 16) {
        output.saveparalysispoisondeath_base = 10;
        output.savepetrificationpolymorph_base = 9;
        output.saverodsstaveswands_base = 8;
        output.savebreathweapons_base = 13;
        output.savespells_base = 9;
      }
    }
    setAttrs(output);
  });
});

// toggle monster HD selector
on('change:matrix_class', (eventInfo) => {
  getAttrs(['matrix_class'], (v) => {
    const output = {};
    const classSelected = +v.matrix_class;
    output.toggle_matrixhd = classSelected === 5 ? 1 : 0;
    setAttrs(output, {silent: true});
  });
});

// match class name to core class & return # for hit table lookup
function matchClassName(name) {
  const lowerCaseName = name.trim().toLowerCase();
  if (/cleric|druid|monk/.test(lowerCaseName)) {
    return 1;
  } else if (/fighter|paladin|ranger|bard|cavalier|barbarian/.test(lowerCaseName)) {
    return 2;
  } else if (/magic-user|illusionist|magic|mage|wizard/.test(lowerCaseName)) {
    return 3;
  } else if (/thief|assassin|rogue|thief-acrobat|acrobat/.test(lowerCaseName)) {
    return 4;
  } else {
    return 99;
  }
}

// THAC0
function calcThac0() {
  getAttrs(['thac00', 'autofill_matrix'], (v) => {
    const output = {};
    const autocalcFill = +v.autofill_matrix;
    // bail out if auto-fill is not enabled.
    if (!autocalcFill) return;
    const baseThac0 = +v.thac00;
    output[`thac0-10`] = baseThac0 + 10;
    output[`thac0-9`] = baseThac0 + 9;
    output[`thac0-8`] = baseThac0 + 8;
    output[`thac0-7`] = baseThac0 + 7;
    output[`thac0-6`] = baseThac0 + 6;
    output[`thac0-5`] = baseThac0 + 5;
    output[`thac0-4`] = baseThac0 + 4;
    output[`thac0-3`] = baseThac0 + 3;
    output[`thac0-2`] = baseThac0 + 2;
    output[`thac0-1`] = baseThac0 + 1;
    output.thac01 = baseThac0 - 1;
    output.thac02 = baseThac0 - 2;
    output.thac03 = baseThac0 - 3;
    output.thac04 = baseThac0 - 4;
    output.thac05 = baseThac0 - 5;
    output.thac06 = baseThac0 - 6;
    output.thac07 = baseThac0 - 7;
    output.thac08 = baseThac0 - 8;
    output.thac09 = baseThac0 - 9;
    output.thac010 = baseThac0 - 10;
    setAttrs(output, {silent: true});
  });
}

// Attack Matrix Autofill To-Hit table
on(
  'change:matrix_class change:matrix_level change:matrix_hitdice change:autofill_matrix change:sync_matrix_class change:toggle_fighter5 change:class_selected change:class change:secondclass change:thirdclass change:level change:level_2 change:level_3',
  (eventInfo) => {
    // clog(`Matrix Autofill Change Detected:${eventInfo.sourceAttribute}`);
    getAttrs(
      [
        'matrix_class',
        'matrix_level',
        'matrix_hitdice',
        'autofill_matrix',
        'toggle_fighter5',
        'sync_matrix_class',
        'class_selected',
        'class',
        'secondclass',
        'thirdclass',
        'level',
        'level_2',
        'level_3',
      ],
      (v) => {
        const output = {};
        const autocalcFill = +v.autofill_matrix;
        const syncClass = +v.sync_matrix_class;
        // bail out if auto-fill is not enabled.
        if (!autocalcFill) return;
        const classLinked = +v.class_selected;
        let levelSelected = +v.matrix_level || 0;
        let classSelected = +v.matrix_class;
        const class1Name = (v.class || '').trim();
        const class2Name = (v.secondclass || '').trim();
        const class3Name = (v.thirdclass || '').trim();
        const hitdiceSelected = +v.matrix_hitdice || 0;
        const fighter5Selected = +v.toggle_fighter5;
        // sync enabled?
        // check for selected class and use that class level unless changed
        if (syncClass === 1) {
          if (classLinked === 1) {
            // clog(`Linked Class is: ${class1Name} Current Level:${v.level}`);
            classSelected = matchClassName(class1Name);
            levelSelected = +v.level;
            output.matrix_level = levelSelected;
            output.matrix_class = classSelected;
          }
          if (classLinked === 2) {
            // clog(`Linked Class is: ${class2Name} Current Level:${v.level_2}`);
            classSelected = matchClassName(class2Name);
            levelSelected = +v.level_2;
            output.matrix_level = levelSelected;
            output.matrix_class = classSelected;
          }
          if (classLinked === 3) {
            // clog(`Linked Class is: ${class3Name} Current Level:${v.level_3}`);
            classSelected = matchClassName(class3Name);
            levelSelected = +v.level_3;
            output.matrix_level = levelSelected;
            output.matrix_class = classSelected;
          }
        }
        // clog('Ready to autofill attack matrix.');
        if (classSelected === 0) return;
        // clerics table
        if (classSelected === 1) {
          if (levelSelected === 0) {
            // clog('Need to choose a class level greater than 0 to continue.');
          } else if (levelSelected < 4) {
            output[`thac-10`] = 25;
            output[`thac-9`] = 24;
            output[`thac-8`] = 23;
            output[`thac-7`] = 22;
            output[`thac-6`] = 21;
            output[`thac-5`] = 20;
            output[`thac-4`] = 20;
            output[`thac-3`] = 20;
            output[`thac-2`] = 20;
            output[`thac-1`] = 20;
            output.thac00 = 20;
            output.thac0 = 20;
            output.thac1 = 19;
            output.thac2 = 18;
            output.thac3 = 17;
            output.thac4 = 16;
            output.thac5 = 15;
            output.thac6 = 14;
            output.thac7 = 13;
            output.thac8 = 12;
            output.thac9 = 11;
            output.thac10 = 10;
          } else if (levelSelected < 7) {
            output[`thac-10`] = 23;
            output[`thac-9`] = 22;
            output[`thac-8`] = 21;
            output[`thac-7`] = 20;
            output[`thac-6`] = 20;
            output[`thac-5`] = 20;
            output[`thac-4`] = 20;
            output[`thac-3`] = 20;
            output[`thac-2`] = 20;
            output[`thac-1`] = 19;
            output.thac00 = 18;
            output.thac0 = 18;
            output.thac1 = 17;
            output.thac2 = 16;
            output.thac3 = 15;
            output.thac4 = 14;
            output.thac5 = 13;
            output.thac6 = 12;
            output.thac7 = 11;
            output.thac8 = 10;
            output.thac9 = 9;
            output.thac10 = 8;
          } else if (levelSelected < 10) {
            output[`thac-10`] = 21;
            output[`thac-9`] = 20;
            output[`thac-8`] = 20;
            output[`thac-7`] = 20;
            output[`thac-6`] = 20;
            output[`thac-5`] = 20;
            output[`thac-4`] = 20;
            output[`thac-3`] = 19;
            output[`thac-2`] = 18;
            output[`thac-1`] = 17;
            output.thac00 = 16;
            output.thac0 = 16;
            output.thac1 = 15;
            output.thac2 = 14;
            output.thac3 = 13;
            output.thac4 = 12;
            output.thac5 = 11;
            output.thac6 = 10;
            output.thac7 = 9;
            output.thac8 = 8;
            output.thac9 = 7;
            output.thac10 = 6;
          } else if (levelSelected < 13) {
            output[`thac-10`] = 20;
            output[`thac-9`] = 20;
            output[`thac-8`] = 20;
            output[`thac-7`] = 20;
            output[`thac-6`] = 20;
            output[`thac-5`] = 19;
            output[`thac-4`] = 18;
            output[`thac-3`] = 17;
            output[`thac-2`] = 16;
            output[`thac-1`] = 15;
            output.thac00 = 14;
            output.thac0 = 14;
            output.thac1 = 13;
            output.thac2 = 12;
            output.thac3 = 11;
            output.thac4 = 10;
            output.thac5 = 9;
            output.thac6 = 8;
            output.thac7 = 7;
            output.thac8 = 6;
            output.thac9 = 5;
            output.thac10 = 4;
          } else if (levelSelected < 16) {
            output[`thac-10`] = 20;
            output[`thac-9`] = 20;
            output[`thac-8`] = 20;
            output[`thac-7`] = 19;
            output[`thac-6`] = 18;
            output[`thac-5`] = 17;
            output[`thac-4`] = 16;
            output[`thac-3`] = 15;
            output[`thac-2`] = 14;
            output[`thac-1`] = 13;
            output.thac00 = 12;
            output.thac0 = 12;
            output.thac1 = 11;
            output.thac2 = 10;
            output.thac3 = 9;
            output.thac4 = 8;
            output.thac5 = 7;
            output.thac6 = 6;
            output.thac7 = 5;
            output.thac8 = 4;
            output.thac9 = 3;
            output.thac10 = 2;
          } else if (levelSelected < 19) {
            output[`thac-10`] = 20;
            output[`thac-9`] = 19;
            output[`thac-8`] = 18;
            output[`thac-7`] = 17;
            output[`thac-6`] = 16;
            output[`thac-5`] = 15;
            output[`thac-4`] = 14;
            output[`thac-3`] = 13;
            output[`thac-2`] = 12;
            output[`thac-1`] = 11;
            output.thac00 = 10;
            output.thac0 = 10;
            output.thac1 = 9;
            output.thac2 = 8;
            output.thac3 = 7;
            output.thac4 = 6;
            output.thac5 = 5;
            output.thac6 = 4;
            output.thac7 = 3;
            output.thac8 = 2;
            output.thac9 = 1;
            output.thac10 = 0;
          } else if (levelSelected >= 19) {
            output[`thac-10`] = 19;
            output[`thac-9`] = 18;
            output[`thac-8`] = 17;
            output[`thac-7`] = 16;
            output[`thac-6`] = 15;
            output[`thac-5`] = 14;
            output[`thac-4`] = 13;
            output[`thac-3`] = 12;
            output[`thac-2`] = 11;
            output[`thac-1`] = 10;
            output.thac00 = 9;
            output.thac0 = 9;
            output.thac1 = 8;
            output.thac2 = 7;
            output.thac3 = 6;
            output.thac4 = 5;
            output.thac5 = 4;
            output.thac6 = 3;
            output.thac7 = 2;
            output.thac8 = 1;
            output.thac9 = 0;
            output.thac10 = -1;
          }
          output.attack_matrix_flag = 0;
        }
        // fighters table
        if (classSelected === 2 || classSelected === 6) {
          if (levelSelected === 0) {
            output[`thac-10`] = 26;
            output[`thac-9`] = 25;
            output[`thac-8`] = 24;
            output[`thac-7`] = 23;
            output[`thac-6`] = 22;
            output[`thac-5`] = 21;
            output[`thac-4`] = 20;
            output[`thac-3`] = 20;
            output[`thac-2`] = 20;
            output[`thac-1`] = 20;
            output.thac00 = 20;
            output.thac0 = 20;
            output.thac1 = 20;
            output.thac2 = 19;
            output.thac3 = 18;
            output.thac4 = 17;
            output.thac5 = 16;
            output.thac6 = 15;
            output.thac7 = 14;
            output.thac8 = 13;
            output.thac9 = 12;
            output.thac10 = 11;
          } else if (levelSelected < 3) {
            output[`thac-10`] = 25 - fighter5Selected;
            output[`thac-9`] = 24 - fighter5Selected;
            output[`thac-8`] = 23 - fighter5Selected;
            output[`thac-7`] = 22 - fighter5Selected;
            output[`thac-6`] = 21 - fighter5Selected; //20
            output[`thac-5`] = 20; //20
            output[`thac-4`] = 20; //20
            output[`thac-3`] = 20; //20
            output[`thac-2`] = 20; //20
            output[`thac-1`] = 20; //20
            output.thac00 = 20 - fighter5Selected;
            output.thac0 = 20 - fighter5Selected; //19
            output.thac1 = 19 - fighter5Selected;
            output.thac2 = 18 - fighter5Selected;
            output.thac3 = 17 - fighter5Selected;
            output.thac4 = 16 - fighter5Selected;
            output.thac5 = 15 - fighter5Selected;
            output.thac6 = 14 - fighter5Selected;
            output.thac7 = 13 - fighter5Selected;
            output.thac8 = 12 - fighter5Selected;
            output.thac9 = 11 - fighter5Selected;
            output.thac10 = 10 - fighter5Selected;
          } else if (levelSelected < 5) {
            output[`thac-10`] = 23 - fighter5Selected;
            output[`thac-9`] = 22 - fighter5Selected;
            output[`thac-8`] = 21 - fighter5Selected; //20
            output[`thac-7`] = 20; //20
            output[`thac-6`] = 20; //20
            output[`thac-5`] = 20; //20
            output[`thac-4`] = 20; //20
            output[`thac-3`] = 20; //20
            output[`thac-2`] = 20 - fighter5Selected; //19
            output[`thac-1`] = 19 - fighter5Selected;
            output.thac00 = 18 - fighter5Selected;
            output.thac0 = 18 - fighter5Selected;
            output.thac1 = 17 - fighter5Selected;
            output.thac2 = 16 - fighter5Selected;
            output.thac3 = 15 - fighter5Selected;
            output.thac4 = 14 - fighter5Selected;
            output.thac5 = 13 - fighter5Selected;
            output.thac6 = 12 - fighter5Selected;
            output.thac7 = 11 - fighter5Selected;
            output.thac8 = 10 - fighter5Selected;
            output.thac9 = 9 - fighter5Selected;
            output.thac10 = 8 - fighter5Selected;
          } else if (levelSelected < 7) {
            output[`thac-10`] = 21 - fighter5Selected; //20
            output[`thac-9`] = 20; //20
            output[`thac-8`] = 20; //20
            output[`thac-7`] = 20; //20
            output[`thac-6`] = 20; //20
            output[`thac-5`] = 20; //20
            output[`thac-4`] = 20 - fighter5Selected; //19
            output[`thac-3`] = 19 - fighter5Selected;
            output[`thac-2`] = 18 - fighter5Selected;
            output[`thac-1`] = 17 - fighter5Selected;
            output.thac00 = 16 - fighter5Selected;
            output.thac0 = 16 - fighter5Selected;
            output.thac1 = 15 - fighter5Selected;
            output.thac2 = 14 - fighter5Selected;
            output.thac3 = 13 - fighter5Selected;
            output.thac4 = 12 - fighter5Selected;
            output.thac5 = 11 - fighter5Selected;
            output.thac6 = 10 - fighter5Selected;
            output.thac7 = 9 - fighter5Selected;
            output.thac8 = 8 - fighter5Selected;
            output.thac9 = 7 - fighter5Selected;
            output.thac10 = 6 - fighter5Selected;
          } else if (levelSelected < 9) {
            output[`thac-10`] = 20; //20
            output[`thac-9`] = 20; //20
            output[`thac-8`] = 20; //20
            output[`thac-7`] = 20; //20
            output[`thac-6`] = 20 - fighter5Selected; //19
            output[`thac-5`] = 19 - fighter5Selected;
            output[`thac-4`] = 18 - fighter5Selected;
            output[`thac-3`] = 17 - fighter5Selected;
            output[`thac-2`] = 16 - fighter5Selected;
            output[`thac-1`] = 15 - fighter5Selected;
            output.thac00 = 14 - fighter5Selected;
            output.thac0 = 14 - fighter5Selected;
            output.thac1 = 13 - fighter5Selected;
            output.thac2 = 12 - fighter5Selected;
            output.thac3 = 11 - fighter5Selected;
            output.thac4 = 10 - fighter5Selected;
            output.thac5 = 9 - fighter5Selected;
            output.thac6 = 8 - fighter5Selected;
            output.thac7 = 7 - fighter5Selected;
            output.thac8 = 6 - fighter5Selected;
            output.thac9 = 5 - fighter5Selected;
            output.thac10 = 4 - fighter5Selected;
          } else if (levelSelected < 11) {
            output[`thac-10`] = 20; //20
            output[`thac-9`] = 20; //20
            output[`thac-8`] = 20 - fighter5Selected; //19
            output[`thac-7`] = 19 - fighter5Selected;
            output[`thac-6`] = 18 - fighter5Selected;
            output[`thac-5`] = 17 - fighter5Selected;
            output[`thac-4`] = 16 - fighter5Selected;
            output[`thac-3`] = 15 - fighter5Selected;
            output[`thac-2`] = 14 - fighter5Selected;
            output[`thac-1`] = 13 - fighter5Selected;
            output.thac00 = 12 - fighter5Selected;
            output.thac0 = 12 - fighter5Selected;
            output.thac1 = 11 - fighter5Selected;
            output.thac2 = 10 - fighter5Selected;
            output.thac3 = 9 - fighter5Selected;
            output.thac4 = 8 - fighter5Selected;
            output.thac5 = 7 - fighter5Selected;
            output.thac6 = 6 - fighter5Selected;
            output.thac7 = 5 - fighter5Selected;
            output.thac8 = 4 - fighter5Selected;
            output.thac9 = 3 - fighter5Selected;
            output.thac10 = 2 - fighter5Selected;
          } else if (levelSelected < 13) {
            output[`thac-10`] = 20 - fighter5Selected; //19
            output[`thac-9`] = 19 - fighter5Selected;
            output[`thac-8`] = 18 - fighter5Selected;
            output[`thac-7`] = 17 - fighter5Selected;
            output[`thac-6`] = 16 - fighter5Selected;
            output[`thac-5`] = 15 - fighter5Selected;
            output[`thac-4`] = 14 - fighter5Selected;
            output[`thac-3`] = 13 - fighter5Selected;
            output[`thac-2`] = 12 - fighter5Selected;
            output[`thac-1`] = 11 - fighter5Selected;
            output.thac00 = 10 - fighter5Selected;
            output.thac0 = 10 - fighter5Selected;
            output.thac1 = 9 - fighter5Selected;
            output.thac2 = 8 - fighter5Selected;
            output.thac3 = 7 - fighter5Selected;
            output.thac4 = 6 - fighter5Selected;
            output.thac5 = 5 - fighter5Selected;
            output.thac6 = 4 - fighter5Selected;
            output.thac7 = 3 - fighter5Selected;
            output.thac8 = 2 - fighter5Selected;
            output.thac9 = 1 - fighter5Selected;
            output.thac10 = 0 - fighter5Selected;
          } else if (levelSelected < 15) {
            output[`thac-10`] = 18 - fighter5Selected;
            output[`thac-9`] = 17 - fighter5Selected;
            output[`thac-8`] = 16 - fighter5Selected;
            output[`thac-7`] = 15 - fighter5Selected;
            output[`thac-6`] = 14 - fighter5Selected;
            output[`thac-5`] = 13 - fighter5Selected;
            output[`thac-4`] = 12 - fighter5Selected;
            output[`thac-3`] = 11 - fighter5Selected;
            output[`thac-2`] = 10 - fighter5Selected;
            output[`thac-1`] = 9 - fighter5Selected;
            output.thac00 = 8 - fighter5Selected;
            output.thac0 = 8 - fighter5Selected;
            output.thac1 = 7 - fighter5Selected;
            output.thac2 = 6 - fighter5Selected;
            output.thac3 = 5 - fighter5Selected;
            output.thac4 = 4 - fighter5Selected;
            output.thac5 = 3 - fighter5Selected;
            output.thac6 = 2 - fighter5Selected;
            output.thac7 = 1 - fighter5Selected;
            output.thac8 = 0 - fighter5Selected;
            output.thac9 = -1 - fighter5Selected;
            output.thac10 = -2 - fighter5Selected;
          } else if (levelSelected < 17) {
            output[`thac-10`] = 16 - fighter5Selected;
            output[`thac-9`] = 15 - fighter5Selected;
            output[`thac-8`] = 14 - fighter5Selected;
            output[`thac-7`] = 13 - fighter5Selected;
            output[`thac-6`] = 12 - fighter5Selected;
            output[`thac-5`] = 11 - fighter5Selected;
            output[`thac-4`] = 10 - fighter5Selected;
            output[`thac-3`] = 9 - fighter5Selected;
            output[`thac-2`] = 8 - fighter5Selected;
            output[`thac-1`] = 7 - fighter5Selected;
            output.thac00 = 6 - fighter5Selected;
            output.thac0 = 6 - fighter5Selected;
            output.thac1 = 5 - fighter5Selected;
            output.thac2 = 4 - fighter5Selected;
            output.thac3 = 3 - fighter5Selected;
            output.thac4 = 2 - fighter5Selected;
            output.thac5 = 1 - fighter5Selected;
            output.thac6 = 0 - fighter5Selected;
            output.thac7 = -1 - fighter5Selected;
            output.thac8 = -2 - fighter5Selected;
            output.thac9 = -3 - fighter5Selected;
            output.thac10 = -4 - fighter5Selected;
          } else if (levelSelected >= 17) {
            output[`thac-10`] = 14 - fighter5Selected;
            output[`thac-9`] = 13 - fighter5Selected;
            output[`thac-8`] = 12 - fighter5Selected;
            output[`thac-7`] = 11 - fighter5Selected;
            output[`thac-6`] = 10 - fighter5Selected;
            output[`thac-5`] = 9 - fighter5Selected;
            output[`thac-4`] = 8 - fighter5Selected;
            output[`thac-3`] = 7 - fighter5Selected;
            output[`thac-2`] = 6 - fighter5Selected;
            output[`thac-1`] = 5 - fighter5Selected;
            output.thac00 = 4 - fighter5Selected;
            output.thac0 = 4 - fighter5Selected;
            output.thac1 = 3 - fighter5Selected;
            output.thac2 = 2 - fighter5Selected;
            output.thac3 = 1 - fighter5Selected;
            output.thac4 = 0 - fighter5Selected;
            output.thac5 = -1 - fighter5Selected;
            output.thac6 = -2 - fighter5Selected;
            output.thac7 = -3 - fighter5Selected;
            output.thac8 = -4 - fighter5Selected;
            output.thac9 = -5 - fighter5Selected;
            output.thac10 = -6 - fighter5Selected;
          }
          output.attack_matrix_flag = 0;
        }
        // magic-users table
        if (classSelected === 3) {
          if (levelSelected === 0) {
            // clog('Need to choose a class level greater than 0 to continue.');
          } else if (levelSelected < 6) {
            output[`thac-10`] = 26;
            output[`thac-9`] = 25;
            output[`thac-8`] = 24;
            output[`thac-7`] = 23;
            output[`thac-6`] = 22;
            output[`thac-5`] = 21;
            output[`thac-4`] = 20;
            output[`thac-3`] = 20;
            output[`thac-2`] = 20;
            output[`thac-1`] = 20;
            output.thac00 = 20;
            output.thac0 = 20;
            output.thac1 = 20;
            output.thac2 = 19;
            output.thac3 = 18;
            output.thac4 = 17;
            output.thac5 = 16;
            output.thac6 = 15;
            output.thac7 = 14;
            output.thac8 = 13;
            output.thac9 = 12;
            output.thac10 = 11;
          } else if (levelSelected < 11) {
            output[`thac-10`] = 24;
            output[`thac-9`] = 23;
            output[`thac-8`] = 22;
            output[`thac-7`] = 21;
            output[`thac-6`] = 20;
            output[`thac-5`] = 20;
            output[`thac-4`] = 20;
            output[`thac-3`] = 20;
            output[`thac-2`] = 20;
            output[`thac-1`] = 20;
            output.thac00 = 19;
            output.thac0 = 19;
            output.thac1 = 18;
            output.thac2 = 17;
            output.thac3 = 16;
            output.thac4 = 15;
            output.thac5 = 14;
            output.thac6 = 13;
            output.thac7 = 12;
            output.thac8 = 11;
            output.thac9 = 10;
            output.thac10 = 9;
          } else if (levelSelected < 16) {
            output[`thac-10`] = 21;
            output[`thac-9`] = 20;
            output[`thac-8`] = 20;
            output[`thac-7`] = 20;
            output[`thac-6`] = 20;
            output[`thac-5`] = 20;
            output[`thac-4`] = 20;
            output[`thac-3`] = 19;
            output[`thac-2`] = 18;
            output[`thac-1`] = 17;
            output.thac00 = 16;
            output.thac0 = 16;
            output.thac1 = 15;
            output.thac2 = 14;
            output.thac3 = 13;
            output.thac4 = 12;
            output.thac5 = 11;
            output.thac6 = 10;
            output.thac7 = 9;
            output.thac8 = 8;
            output.thac9 = 7;
            output.thac10 = 6;
          } else if (levelSelected < 21) {
            output[`thac-10`] = 20;
            output[`thac-9`] = 20;
            output[`thac-8`] = 20;
            output[`thac-7`] = 20;
            output[`thac-6`] = 19;
            output[`thac-5`] = 18;
            output[`thac-4`] = 17;
            output[`thac-3`] = 16;
            output[`thac-2`] = 15;
            output[`thac-1`] = 14;
            output.thac00 = 13;
            output.thac0 = 13;
            output.thac1 = 12;
            output.thac2 = 11;
            output.thac3 = 10;
            output.thac4 = 9;
            output.thac5 = 8;
            output.thac6 = 7;
            output.thac7 = 6;
            output.thac8 = 5;
            output.thac9 = 4;
            output.thac10 = 3;
          } else if (levelSelected >= 21) {
            output[`thac-10`] = 20;
            output[`thac-9`] = 20;
            output[`thac-8`] = 19;
            output[`thac-7`] = 18;
            output[`thac-6`] = 17;
            output[`thac-5`] = 16;
            output[`thac-4`] = 15;
            output[`thac-3`] = 14;
            output[`thac-2`] = 13;
            output[`thac-1`] = 12;
            output.thac00 = 11;
            output.thac0 = 11;
            output.thac1 = 10;
            output.thac2 = 9;
            output.thac3 = 8;
            output.thac4 = 7;
            output.thac5 = 6;
            output.thac6 = 5;
            output.thac7 = 4;
            output.thac8 = 3;
            output.thac9 = 2;
            output.thac10 = 1;
          }
          output.attack_matrix_flag = 0;
        }
        // thieves table
        if (classSelected === 4) {
          if (levelSelected === 0) {
            // clog('Need to choose a class level greater than 0 to continue.');
          } else if (levelSelected < 5) {
            output[`thac-10`] = 26;
            output[`thac-9`] = 25;
            output[`thac-8`] = 24;
            output[`thac-7`] = 23;
            output[`thac-6`] = 22;
            output[`thac-5`] = 21;
            output[`thac-4`] = 20;
            output[`thac-3`] = 20;
            output[`thac-2`] = 20;
            output[`thac-1`] = 20;
            output.thac00 = 20;
            output.thac0 = 20;
            output.thac1 = 20;
            output.thac2 = 19;
            output.thac3 = 18;
            output.thac4 = 17;
            output.thac5 = 16;
            output.thac6 = 15;
            output.thac7 = 14;
            output.thac8 = 13;
            output.thac9 = 12;
            output.thac10 = 11;
          } else if (levelSelected < 9) {
            output[`thac-10`] = 24;
            output[`thac-9`] = 23;
            output[`thac-8`] = 22;
            output[`thac-7`] = 21;
            output[`thac-6`] = 20;
            output[`thac-5`] = 20;
            output[`thac-4`] = 20;
            output[`thac-3`] = 20;
            output[`thac-2`] = 20;
            output[`thac-1`] = 20;
            output.thac00 = 19;
            output.thac0 = 19;
            output.thac1 = 18;
            output.thac2 = 17;
            output.thac3 = 16;
            output.thac4 = 15;
            output.thac5 = 14;
            output.thac6 = 13;
            output.thac7 = 12;
            output.thac8 = 11;
            output.thac9 = 10;
            output.thac10 = 9;
          } else if (levelSelected < 13) {
            output[`thac-10`] = 21;
            output[`thac-9`] = 20;
            output[`thac-8`] = 20;
            output[`thac-7`] = 20;
            output[`thac-6`] = 20;
            output[`thac-5`] = 20;
            output[`thac-4`] = 20;
            output[`thac-3`] = 19;
            output[`thac-2`] = 18;
            output[`thac-1`] = 17;
            output.thac00 = 16;
            output.thac0 = 16;
            output.thac1 = 15;
            output.thac2 = 14;
            output.thac3 = 13;
            output.thac4 = 12;
            output.thac5 = 11;
            output.thac6 = 10;
            output.thac7 = 9;
            output.thac8 = 8;
            output.thac9 = 7;
            output.thac10 = 6;
          } else if (levelSelected < 17) {
            output[`thac-10`] = 20;
            output[`thac-9`] = 20;
            output[`thac-8`] = 20;
            output[`thac-7`] = 20;
            output[`thac-6`] = 20;
            output[`thac-5`] = 19;
            output[`thac-4`] = 18;
            output[`thac-3`] = 17;
            output[`thac-2`] = 16;
            output[`thac-1`] = 15;
            output.thac00 = 14;
            output.thac0 = 14;
            output.thac1 = 13;
            output.thac2 = 12;
            output.thac3 = 11;
            output.thac4 = 10;
            output.thac5 = 9;
            output.thac6 = 8;
            output.thac7 = 7;
            output.thac8 = 6;
            output.thac9 = 5;
            output.thac10 = 4;
          } else if (levelSelected < 21) {
            output[`thac-10`] = 20;
            output[`thac-9`] = 20;
            output[`thac-8`] = 20;
            output[`thac-7`] = 19;
            output[`thac-6`] = 18;
            output[`thac-5`] = 17;
            output[`thac-4`] = 16;
            output[`thac-3`] = 15;
            output[`thac-2`] = 14;
            output[`thac-1`] = 13;
            output.thac00 = 12;
            output.thac0 = 12;
            output.thac1 = 11;
            output.thac2 = 10;
            output.thac3 = 9;
            output.thac4 = 8;
            output.thac5 = 7;
            output.thac6 = 6;
            output.thac7 = 5;
            output.thac8 = 4;
            output.thac9 = 3;
            output.thac10 = 2;
          } else if (levelSelected >= 21) {
            output[`thac-10`] = 20;
            output[`thac-9`] = 19;
            output[`thac-8`] = 18;
            output[`thac-7`] = 17;
            output[`thac-6`] = 16;
            output[`thac-5`] = 15;
            output[`thac-4`] = 14;
            output[`thac-3`] = 13;
            output[`thac-2`] = 12;
            output[`thac-1`] = 11;
            output.thac00 = 10;
            output.thac0 = 10;
            output.thac1 = 9;
            output.thac2 = 8;
            output.thac3 = 7;
            output.thac4 = 6;
            output.thac5 = 5;
            output.thac6 = 4;
            output.thac7 = 3;
            output.thac8 = 2;
            output.thac9 = 1;
            output.thac10 = 0;
          }
          output.attack_matrix_flag = 0;
        }
        // monsters table
        if (classSelected === 5) {
          if (hitdiceSelected === 0) {
            // clog('Need to select HD to continue.');
          } else if (hitdiceSelected === 1) {
            output[`thac-10`] = 26;
            output[`thac-9`] = 25;
            output[`thac-8`] = 24;
            output[`thac-7`] = 23;
            output[`thac-6`] = 22;
            output[`thac-5`] = 21;
            output[`thac-4`] = 20;
            output[`thac-3`] = 20;
            output[`thac-2`] = 20;
            output[`thac-1`] = 20;
            output.thac00 = 20;
            output.thac0 = 20;
            output.thac1 = 20;
            output.thac2 = 19;
            output.thac3 = 18;
            output.thac4 = 17;
            output.thac5 = 16;
            output.thac6 = 15;
            output.thac7 = 14;
            output.thac8 = 13;
            output.thac9 = 12;
            output.thac10 = 11;
          } else if (hitdiceSelected === 2) {
            output[`thac-10`] = 25;
            output[`thac-9`] = 24;
            output[`thac-8`] = 23;
            output[`thac-7`] = 22;
            output[`thac-6`] = 21;
            output[`thac-5`] = 20;
            output[`thac-4`] = 20;
            output[`thac-3`] = 20;
            output[`thac-2`] = 20;
            output[`thac-1`] = 20;
            output.thac00 = 20;
            output.thac0 = 20;
            output.thac1 = 19;
            output.thac2 = 18;
            output.thac3 = 17;
            output.thac4 = 16;
            output.thac5 = 15;
            output.thac6 = 14;
            output.thac7 = 13;
            output.thac8 = 12;
            output.thac9 = 11;
            output.thac10 = 10;
          } else if (hitdiceSelected === 3) {
            output[`thac-10`] = 24;
            output[`thac-9`] = 23;
            output[`thac-8`] = 22;
            output[`thac-7`] = 21;
            output[`thac-6`] = 20;
            output[`thac-5`] = 20;
            output[`thac-4`] = 20;
            output[`thac-3`] = 20;
            output[`thac-2`] = 20;
            output[`thac-1`] = 20;
            output.thac00 = 19;
            output.thac0 = 19;
            output.thac1 = 18;
            output.thac2 = 17;
            output.thac3 = 16;
            output.thac4 = 15;
            output.thac5 = 14;
            output.thac6 = 13;
            output.thac7 = 12;
            output.thac8 = 11;
            output.thac9 = 10;
            output.thac10 = 9;
          } else if (hitdiceSelected === 4) {
            output[`thac-10`] = 23;
            output[`thac-9`] = 22;
            output[`thac-8`] = 21;
            output[`thac-7`] = 20;
            output[`thac-6`] = 20;
            output[`thac-5`] = 20;
            output[`thac-4`] = 20;
            output[`thac-3`] = 20;
            output[`thac-2`] = 20;
            output[`thac-1`] = 19;
            output.thac00 = 18;
            output.thac0 = 18;
            output.thac1 = 17;
            output.thac2 = 16;
            output.thac3 = 15;
            output.thac4 = 14;
            output.thac5 = 13;
            output.thac6 = 12;
            output.thac7 = 11;
            output.thac8 = 10;
            output.thac9 = 9;
            output.thac10 = 8;
          } else if (hitdiceSelected === 5) {
            output[`thac-10`] = 21;
            output[`thac-9`] = 20;
            output[`thac-8`] = 20;
            output[`thac-7`] = 20;
            output[`thac-6`] = 20;
            output[`thac-5`] = 20;
            output[`thac-4`] = 20;
            output[`thac-3`] = 19;
            output[`thac-2`] = 18;
            output[`thac-1`] = 17;
            output.thac00 = 16;
            output.thac0 = 16;
            output.thac1 = 15;
            output.thac2 = 14;
            output.thac3 = 13;
            output.thac4 = 12;
            output.thac5 = 11;
            output.thac6 = 10;
            output.thac7 = 9;
            output.thac8 = 8;
            output.thac9 = 7;
            output.thac10 = 6;
          } else if (hitdiceSelected === 6) {
            output[`thac-10`] = 20;
            output[`thac-9`] = 20;
            output[`thac-8`] = 20;
            output[`thac-7`] = 20;
            output[`thac-6`] = 20;
            output[`thac-5`] = 20;
            output[`thac-4`] = 19;
            output[`thac-3`] = 18;
            output[`thac-2`] = 17;
            output[`thac-1`] = 16;
            output.thac00 = 15;
            output.thac0 = 15;
            output.thac1 = 14;
            output.thac2 = 13;
            output.thac3 = 12;
            output.thac4 = 11;
            output.thac5 = 10;
            output.thac6 = 9;
            output.thac7 = 8;
            output.thac8 = 7;
            output.thac9 = 6;
            output.thac10 = 5;
          } else if (hitdiceSelected === 7) {
            output[`thac-10`] = 20;
            output[`thac-9`] = 20;
            output[`thac-8`] = 20;
            output[`thac-7`] = 20;
            output[`thac-6`] = 19;
            output[`thac-5`] = 18;
            output[`thac-4`] = 17;
            output[`thac-3`] = 16;
            output[`thac-2`] = 15;
            output[`thac-1`] = 14;
            output.thac00 = 13;
            output.thac0 = 13;
            output.thac1 = 12;
            output.thac2 = 11;
            output.thac3 = 10;
            output.thac4 = 9;
            output.thac5 = 8;
            output.thac6 = 7;
            output.thac7 = 6;
            output.thac8 = 5;
            output.thac9 = 4;
            output.thac10 = 3;
          } else if (hitdiceSelected === 8) {
            output[`thac-10`] = 20;
            output[`thac-9`] = 20;
            output[`thac-8`] = 20;
            output[`thac-7`] = 19;
            output[`thac-6`] = 18;
            output[`thac-5`] = 17;
            output[`thac-4`] = 16;
            output[`thac-3`] = 15;
            output[`thac-2`] = 14;
            output[`thac-1`] = 13;
            output.thac00 = 12;
            output.thac0 = 12;
            output.thac1 = 11;
            output.thac2 = 10;
            output.thac3 = 9;
            output.thac4 = 8;
            output.thac5 = 7;
            output.thac6 = 6;
            output.thac7 = 5;
            output.thac8 = 4;
            output.thac9 = 3;
            output.thac10 = 2;
          } else if (hitdiceSelected === 9) {
            output[`thac-10`] = 20;
            output[`thac-9`] = 19;
            output[`thac-8`] = 18;
            output[`thac-7`] = 17;
            output[`thac-6`] = 16;
            output[`thac-5`] = 15;
            output[`thac-4`] = 14;
            output[`thac-3`] = 13;
            output[`thac-2`] = 12;
            output[`thac-1`] = 11;
            output.thac00 = 10;
            output.thac0 = 10;
            output.thac1 = 9;
            output.thac2 = 8;
            output.thac3 = 7;
            output.thac4 = 6;
            output.thac5 = 5;
            output.thac6 = 4;
            output.thac7 = 3;
            output.thac8 = 2;
            output.thac9 = 1;
            output.thac10 = 0;
          } else if (hitdiceSelected === 10) {
            output[`thac-10`] = 19;
            output[`thac-9`] = 18;
            output[`thac-8`] = 17;
            output[`thac-7`] = 16;
            output[`thac-6`] = 15;
            output[`thac-5`] = 14;
            output[`thac-4`] = 13;
            output[`thac-3`] = 12;
            output[`thac-2`] = 11;
            output[`thac-1`] = 10;
            output.thac00 = 9;
            output.thac0 = 9;
            output.thac1 = 8;
            output.thac2 = 7;
            output.thac3 = 6;
            output.thac4 = 5;
            output.thac5 = 4;
            output.thac6 = 3;
            output.thac7 = 2;
            output.thac8 = 1;
            output.thac9 = 0;
            output.thac10 = -1;
          } else if (hitdiceSelected === 11) {
            output[`thac-10`] = 18;
            output[`thac-9`] = 17;
            output[`thac-8`] = 16;
            output[`thac-7`] = 15;
            output[`thac-6`] = 14;
            output[`thac-5`] = 13;
            output[`thac-4`] = 12;
            output[`thac-3`] = 11;
            output[`thac-2`] = 10;
            output[`thac-1`] = 9;
            output.thac00 = 8;
            output.thac0 = 8;
            output.thac1 = 7;
            output.thac2 = 6;
            output.thac3 = 5;
            output.thac4 = 4;
            output.thac5 = 3;
            output.thac6 = 2;
            output.thac7 = 1;
            output.thac8 = 0;
            output.thac9 = -1;
            output.thac10 = -2;
          } else if (hitdiceSelected === 12) {
            output[`thac-10`] = 17;
            output[`thac-9`] = 16;
            output[`thac-8`] = 15;
            output[`thac-7`] = 14;
            output[`thac-6`] = 13;
            output[`thac-5`] = 12;
            output[`thac-4`] = 11;
            output[`thac-3`] = 10;
            output[`thac-2`] = 9;
            output[`thac-1`] = 8;
            output.thac00 = 7;
            output.thac0 = 7;
            output.thac1 = 6;
            output.thac2 = 5;
            output.thac3 = 4;
            output.thac4 = 3;
            output.thac5 = 2;
            output.thac6 = 1;
            output.thac7 = 0;
            output.thac8 = -1;
            output.thac9 = -2;
            output.thac10 = -3;
          }
          output.attack_matrix_flag = 0;
        }
        // NO CLASS found when Sync is enabled: Reset table
        if (classSelected === 99) {
          clog('Error: Class not recognized or class name is empty.');
          output[`thac-10`] = 20;
          output[`thac-9`] = 20;
          output[`thac-8`] = 20;
          output[`thac-7`] = 20;
          output[`thac-6`] = 20;
          output[`thac-5`] = 20;
          output[`thac-4`] = 20;
          output[`thac-3`] = 20;
          output[`thac-2`] = 20;
          output[`thac-1`] = 20;
          output.thac00 = 20;
          output.thac0 = 20;
          output.thac1 = 20;
          output.thac2 = 20;
          output.thac3 = 20;
          output.thac4 = 20;
          output.thac5 = 20;
          output.thac6 = 20;
          output.thac7 = 20;
          output.thac8 = 20;
          output.thac9 = 20;
          output.thac10 = 20;
          output.attack_matrix_flag = 0;
        }
        setAttrs(output, {silent: true});
        calcThac0();
      },
    );
  },
);

on('sheet:opened change:thac0 change:thac00 change:autofill_matrix', (eventInfo) => {
  getAttrs(['attack_matrix_flag', 'matrix_class', 'thac0', 'thac1', 'thac2', 'thac00', 'thac01', 'thac02', 'autofill_matrix'], (v) => {
    const output = {};
    const autocalcFill = +v.autofill_matrix;
    // bail out if auto-fill is not enabled.
    if (!autocalcFill) return;
    const attack_matrix_flag = +v.attack_matrix_flag;
    const matrix_class = +v.matrix_class;
    if (attack_matrix_flag === 0 || matrix_class > 0) {
      // clog(`attack_matrix_flag:${attack_matrix_flag} matrix_class:${matrix_class}`);
      output.attack_matrix_flag = 0;
    } else {
      const thac0 = +v.thac0;
      const thac1 = +v.thac1;
      const thac2 = +v.thac2;
      const thac00 = +v.thac00;
      const thac01 = +v.thac01;
      const thac02 = +v.thac02;
      const toHitIsDefaultValue = thac0 + thac1 + thac2;
      const thac0IsDefaultValue = thac00 + thac01 + thac02;
      // clog(`toHitIsDefaultValue:${toHitIsDefaultValue} thac0IsDefaultValue:${thac0IsDefaultValue}`);
      output.attack_matrix_flag = toHitIsDefaultValue === 60 && thac0IsDefaultValue === 60 ? 1 : 0;
    }
    setAttrs(output, {silent: true});
  });
});

on('change:thac00', (eventInfo) => {
  calcThac0();
});

// Auto-fill Abilities
function getValidVariable(str_value, string_type, lower_bound, higher_bound) {
  if (str_value < lower_bound) {
    console.log(`Error: ${string_type} value is not a number or out of range. [${str_value}].\\nDefaulting to ${lower_bound}.`);
    return lower_bound;
  }
  if (str_value > higher_bound) {
    console.log(`Error: ${string_type} value is out of range. [${str_value}].\\nDefaulting to ${higher_bound}.`);
    return higher_bound;
  }
  // Keep value between lowerbound and higherbound.
  return Math.min(Math.max(str_value, lower_bound), higher_bound);
}

// Strength Table Entry
class StrengthCheck {
  constructor(meleebonus, dmgbonus, encumbrancebonus, minorstrengthfeat, minorstrengthfeat_locked, majorstrengthfeat) {
    this.meleebonus = meleebonus;
    this.dmgbonus = dmgbonus;
    this.majorstrengthfeat = majorstrengthfeat;
    this.minorstrengthfeat = minorstrengthfeat;
    this.minorstrengthfeat_locked = minorstrengthfeat_locked;
    this.encumbrancebonus = encumbrancebonus;
  }

  getMeleeAttackBonus() {
    return this.meleebonus;
  }

  getMeleeDamageBonus() {
    return this.dmgbonus;
  }

  getMajorStrengthCheck() {
    return this.majorstrengthfeat;
  }

  getMinorStrengthCheck(locked = false) {
    if (!locked) return this.minorstrengthfeat;
    return this.minorstrengthfeat_locked;
  }

  getEncumbranceBonus() {
    return this.encumbrancebonus;
  }
}

class StrengthAdjustmentTable {
  constructor() {
    // MeleeAttackBonus, MeleeDamageBonus, EncumbranceBonus, MinorStrengthCheck, MinorStrengthCheck(locked), MajorStrengthCheck
    this.strength_dict = {
      3: new StrengthCheck(-3, -1, -350, 1, 0, 0),
      4: new StrengthCheck(-2, -1, -250, 1, 0, 0),
      5: new StrengthCheck(-2, -1, -250, 1, 0, 0),
      6: new StrengthCheck(-1, 0, -150, 1, 0, 0),
      7: new StrengthCheck(-1, 0, -150, 1, 0, 0),
      8: new StrengthCheck(0, 0, 0, 2, 0, 1),
      9: new StrengthCheck(0, 0, 0, 2, 0, 1),
      10: new StrengthCheck(0, 0, 0, 2, 0, 2),
      11: new StrengthCheck(0, 0, 0, 2, 0, 2),
      12: new StrengthCheck(0, 0, 100, 2, 0, 4),
      13: new StrengthCheck(0, 0, 100, 2, 0, 4),
      14: new StrengthCheck(0, 0, 200, 2, 0, 7),
      15: new StrengthCheck(0, 0, 200, 2, 0, 7),
      16: new StrengthCheck(0, 1, 350, 3, 0, 10),
      17: new StrengthCheck(1, 1, 500, 3, 0, 13),
      18: {
        None: new StrengthCheck(1, 2, 750, 3, 0, 16),
        '01-50': new StrengthCheck(1, 3, 1000, 3, 0, 20),
        '51-75': new StrengthCheck(2, 3, 1250, 4, 0, 25),
        '76-90': new StrengthCheck(2, 4, 1500, 4, 0, 30),
        '91-99': new StrengthCheck(2, 5, 2000, 4, 1, 35),
        '00': new StrengthCheck(3, 6, 3000, 5, 2, 40),
      },
      19: new StrengthCheck(3, 7, 4500, 7, 3, 50),
      20: new StrengthCheck(3, 8, 5000, 7, 3, 60),
      21: new StrengthCheck(4, 9, 6000, 9, 4, 70),
      22: new StrengthCheck(4, 10, 7500, 11, 4, 80),
      23: new StrengthCheck(5, 11, 9000, 11, 5, 90),
      24: new StrengthCheck(6, 12, 12000, 19, 7, 100),
      25: new StrengthCheck(7, 14, 15000, 23, 9, 100),
    };
  }

  // Grab the correct data row corresponding to Strength
  getEntry(str_value, str_per_value) {
    const str_value_STR = getValidVariable(str_value, 'strength', 3, 25);
    // Get the normal [1-17],[19-25] table entries.
    if (str_value_STR !== 18) return this.strength_dict[str_value_STR];
    // Get the 18 + percentile table entries
    if (str_per_value <= 0) return this.strength_dict[str_value_STR].None;
    if (str_per_value <= 50) return this.strength_dict[str_value_STR]['01-50'];
    if (str_per_value <= 75) return this.strength_dict[str_value_STR]['51-75'];
    if (str_per_value <= 90) return this.strength_dict[str_value_STR]['76-90'];
    if (str_per_value <= 99) return this.strength_dict[str_value_STR]['91-99'];
    return this.strength_dict[str_value_STR]['00'];
  }

  getStrengthValue(type, str_value_STR, str_per_value = 0, lock_flag = false) {
    switch (type) {
      case 'Attack':
        return this.getEntry(str_value_STR, str_per_value).getMeleeAttackBonus();
      case 'Damage':
        return this.getEntry(str_value_STR, str_per_value).getMeleeDamageBonus();
      case 'Major':
        return this.getEntry(str_value_STR, str_per_value).getMajorStrengthCheck();
      case 'Minor':
        return this.getEntry(str_value_STR, str_per_value).getMinorStrengthCheck(lock_flag);
      case 'Encumbrance':
        return this.getEntry(str_value_STR, str_per_value).getEncumbranceBonus();
      default:
        return 'Invalid Test';
    }
  }
}

// Intelligence Table Entry
class IntelligenceEntry {
  constructor(bonuslanguages, knowspell, minspells, maxspells) {
    this.bonuslanguages = bonuslanguages;
    this.knowspell = knowspell;
    this.minspells = minspells;
    this.maxspells = maxspells;
  }

  getBonusLanguages() {
    return this.bonuslanguages;
  }

  getKnowSpell() {
    return this.knowspell;
  }

  getMinSpells() {
    return this.minspells;
  }

  getMaxSpells() {
    return this.maxspells;
  }
}

class IntelligenceAdjustmentTable {
  constructor() {
    // bonuslanguages, knowspell, minspells, maxspells
    this.intelligence_dict = {
      8: new IntelligenceEntry(1, 0, 0, 0),
      9: new IntelligenceEntry(1, 35, 4, 6),
      10: new IntelligenceEntry(2, 45, 5, 7),
      11: new IntelligenceEntry(2, 45, 5, 7),
      12: new IntelligenceEntry(3, 45, 5, 7),
      13: new IntelligenceEntry(3, 55, 6, 9),
      14: new IntelligenceEntry(4, 55, 6, 9),
      15: new IntelligenceEntry(4, 65, 7, 11),
      16: new IntelligenceEntry(5, 65, 7, 11),
      17: new IntelligenceEntry(6, 75, 8, 14),
      18: new IntelligenceEntry(7, 85, 9, 18),
      19: new IntelligenceEntry(8, 95, 10, 99),
      20: new IntelligenceEntry(9, 96, 11, 99),
      21: new IntelligenceEntry(10, 97, 12, 99),
      22: new IntelligenceEntry(11, 98, 13, 99),
      23: new IntelligenceEntry(12, 99, 14, 99),
      24: new IntelligenceEntry(13, 100, 15, 99),
      25: new IntelligenceEntry(14, 100, 16, 99),
    };
  }

  getEntry(str_value) {
    return this.intelligence_dict[getValidVariable(str_value, 'intelligence', 8, 25)];
  }
}

// Wisdom Table Entry
class WisdomEntry {
  constructor(mentalsavebonus, spellbonus, spellfailure) {
    this.mentalsavebonus = mentalsavebonus;
    this.spellbonus = spellbonus;
    this.spellfailure = spellfailure;
  }

  getMentalSaveBonus() {
    return this.mentalsavebonus;
  }

  getSpellBonus() {
    return this.spellbonus;
  }

  getSpellFailure() {
    return this.spellfailure;
  }
}

class WisdomAdjustmentTable {
  constructor() {
    // mentalsavebonus, spellbonus, spellfailure
    this.wisdom_dict = {
      3: new WisdomEntry('-3', 'None', 20),
      4: new WisdomEntry('-2', 'None', 20),
      5: new WisdomEntry('-1', 'None', 20),
      6: new WisdomEntry('-1', 'None', 20),
      7: new WisdomEntry('-1', 'None', 20),
      8: new WisdomEntry('0', 'None', 20),
      9: new WisdomEntry('0', 'None', 20),
      10: new WisdomEntry('0', 'None', 15),
      11: new WisdomEntry('0', 'None', 10),
      12: new WisdomEntry('0', 'None', 5),
      13: new WisdomEntry('0', '1/0/0/0/0/0/0', 0),
      14: new WisdomEntry('0', '2/0/0/0/0/0/0', 0),
      15: new WisdomEntry('1', '2/1/0/0/0/0/0', 0),
      16: new WisdomEntry('2', '2/2/0/0/0/0/0', 0),
      17: new WisdomEntry('3', '2/2/1/0/0/0/0', 0),
      18: new WisdomEntry('4', '2/2/1/1/0/0/0', 0),
      19: new WisdomEntry('4', '3/2/1/2/0/0/0', 0),
      20: new WisdomEntry('4', '3/3/1/3/0/0/0', 0),
      21: new WisdomEntry('4', '3/3/2/3/1/0/0', 0),
      22: new WisdomEntry('4', '3/3/2/4/2/0/0', 0),
      23: new WisdomEntry('4', '3/3/2/4/4/0/0', 0),
      24: new WisdomEntry('4', '3/3/2/4/4/2/1', 0),
      25: new WisdomEntry('4', '3/3/2/4/4/3/1', 0),
    };
  }

  getEntry(str_value) {
    return this.wisdom_dict[getValidVariable(str_value, 'wisdom', 3, 25)];
  }
}

// Dexterity Class Entry
class DexterityEntry {
  constructor(surprisebonus, rangedbonus, armorbonus) {
    this.surprisebonus = surprisebonus;
    this.rangedbonus = rangedbonus;
    this.armorbonus = armorbonus;
  }

  getSurpriseBonus() {
    return this.surprisebonus;
  }

  getRangedBonus() {
    return this.rangedbonus;
  }

  getArmorBonus() {
    return this.armorbonus;
  }
}

class DexterityAdjustmentTable {
  constructor() {
    // surprisebonus rangedbonus armorbonus
    this.dexterity_dict = {
      3: new DexterityEntry(3, -3, 4),
      4: new DexterityEntry(2, -2, 3),
      5: new DexterityEntry(1, -1, 2),
      6: new DexterityEntry(0, 0, 1),
      7: new DexterityEntry(0, 0, 0),
      8: new DexterityEntry(0, 0, 0),
      9: new DexterityEntry(0, 0, 0),
      10: new DexterityEntry(0, 0, 0),
      11: new DexterityEntry(0, 0, 0),
      12: new DexterityEntry(0, 0, 0),
      13: new DexterityEntry(0, 0, 0),
      14: new DexterityEntry(0, 0, 0),
      15: new DexterityEntry(0, 0, -1),
      16: new DexterityEntry(-1, 1, -2),
      17: new DexterityEntry(-2, 2, -3),
      18: new DexterityEntry(-3, 3, -4),
      19: new DexterityEntry(-3, 3, -4),
      20: new DexterityEntry(-3, 3, -4),
      21: new DexterityEntry(-4, 4, -5),
      22: new DexterityEntry(-4, 4, -5),
      23: new DexterityEntry(-4, 4, -5),
      24: new DexterityEntry(-5, 5, -6),
      25: new DexterityEntry(-5, 5, -6),
    };
  }

  getEntry(str_value) {
    return this.dexterity_dict[getValidVariable(str_value, 'dexterity', 3, 25)];
  }
}

class ConstitutionEntry {
  constructor(hitpointbonus, systemshock, resurrectionsurvival) {
    this.hitpointbonus = hitpointbonus;
    this.systemshock = systemshock;
    this.resurrectionsurvival = resurrectionsurvival;
  }

  getHitpointBonus() {
    return this.hitpointbonus;
  }

  getSystemShock() {
    return this.systemshock;
  }

  getResurrectionSurvival() {
    return this.resurrectionsurvival;
  }
}

class ConstitutionAdjustmentTable {
  constructor() {
    // hitpointbonus systemshock resurrectionsurvival
    this.constitution_dict = {
      3: new ConstitutionEntry('-2', 35, 40),
      4: new ConstitutionEntry('-1', 40, 45),
      5: new ConstitutionEntry('-1', 45, 50),
      6: new ConstitutionEntry('0', 50, 55),
      7: new ConstitutionEntry('0', 55, 60),
      8: new ConstitutionEntry('0', 60, 65),
      9: new ConstitutionEntry('0', 65, 70),
      10: new ConstitutionEntry('0', 70, 75),
      11: new ConstitutionEntry('0', 75, 80),
      12: new ConstitutionEntry('0', 80, 85),
      13: new ConstitutionEntry('0', 85, 90),
      14: new ConstitutionEntry('0', 88, 92),
      15: new ConstitutionEntry('1', 91, 94),
      16: new ConstitutionEntry('2', 95, 96),
      // *cap @ +2 unless fighter type
      // 17 +3*
      // 18 +4*
      17: new ConstitutionEntry('3', 97, 98),
      18: new ConstitutionEntry('4', 99, 100),
      19: new ConstitutionEntry('5', 99, 100),
      20: new ConstitutionEntry('5', 99, 100),
      21: new ConstitutionEntry('6', 99, 100),
      22: new ConstitutionEntry('6', 99, 100),
      23: new ConstitutionEntry('6', 99, 100),
      24: new ConstitutionEntry('7', 99, 100),
      25: new ConstitutionEntry('7', 99, 100),
    };
  }

  getEntry(str_value) {
    return this.constitution_dict[getValidVariable(str_value, 'constitution', 3, 25)];
  }
}

class CharismaEntry {
  constructor(maximumhenchmen, loyaltybonus, reactionbonus, comeliness_cha_adj) {
    this.maximumhenchmen = maximumhenchmen;
    this.loyaltybonus = loyaltybonus;
    this.reactionbonus = reactionbonus;
    this.comeliness = comeliness_cha_adj;
  }

  MaximumHenchmen() {
    return this.maximumhenchmen;
  }

  getLoyaltyBonus() {
    return this.loyaltybonus;
  }

  getReactionBonus() {
    return this.reactionbonus;
  }

  getComeliness() {
    return this.comeliness;
  }
}

class CharismaAdjustmentTable {
  constructor() {
    // maximumhenchmen loyaltybonus reactionbonus comeliness_cha_adj
    this.charisma_dict = {
      3: new CharismaEntry(1, -30, -25, -5),
      4: new CharismaEntry(1, -25, -20, -3),
      5: new CharismaEntry(2, -20, -15, -3),
      6: new CharismaEntry(2, -15, -10, -1),
      7: new CharismaEntry(3, -10, -5, -1),
      8: new CharismaEntry(3, -5, 0, -1),
      9: new CharismaEntry(4, 0, 0, 0),
      10: new CharismaEntry(4, 0, 0, 0),
      11: new CharismaEntry(4, 0, 0, 0),
      12: new CharismaEntry(5, 0, 0, 0),
      13: new CharismaEntry(5, 0, 5, 1),
      14: new CharismaEntry(6, 5, 10, 1),
      15: new CharismaEntry(7, 15, 15, 1),
      16: new CharismaEntry(8, 20, 25, 2),
      17: new CharismaEntry(10, 30, 30, 2),
      18: new CharismaEntry(15, 40, 35, 3),
      19: new CharismaEntry(20, 50, 40, 5),
      20: new CharismaEntry(25, 60, 45, 5),
      21: new CharismaEntry(30, 70, 50, 5),
      22: new CharismaEntry(35, 80, 55, 5),
      23: new CharismaEntry(40, 90, 60, 5),
      24: new CharismaEntry(45, 100, 65, 5),
      25: new CharismaEntry(50, 100, 70, 5),
    };
  }

  getEntry(str_value) {
    return this.charisma_dict[getValidVariable(str_value, 'charisma', 3, 25)];
  }
}

// Thief Skills Dex Entry
class ThiefSkillsDexEntry {
  constructor(pickPockets, openLocks, findRemoveTraps, moveSilently, hideInShadows) {
    this.pickPockets = pickPockets;
    this.openLocks = openLocks;
    this.findRemoveTraps = findRemoveTraps;
    this.moveSilently = moveSilently;
    this.hideInShadows = hideInShadows;
  }
  getPickPockets() {
    return this.pickPockets;
  }
  getOpenLocks() {
    return this.openLocks;
  }
  getFindRemoveTraps() {
    return this.findRemoveTraps;
  }
  getMoveSilently() {
    return this.moveSilently;
  }
  getHideInShadows() {
    return this.hideInShadows;
  }
}

class ThiefSkillsDexAdjustmentTable {
  constructor() {
    // pickPockets, openLocks, findRemoveTraps, moveSilently, hideInShadows
    this.dexterity_dict = {
      9: new ThiefSkillsDexEntry(-15, -10, -10, -20, -10),
      10: new ThiefSkillsDexEntry(-10, -5, -10, -15, -5),
      11: new ThiefSkillsDexEntry(-5, 0, -5, -10, 0),
      12: new ThiefSkillsDexEntry(0, 0, 0, -5, 0),
      13: new ThiefSkillsDexEntry(0, 0, 0, 0, 0),
      14: new ThiefSkillsDexEntry(0, 0, 0, 0, 0),
      15: new ThiefSkillsDexEntry(0, 0, 0, 0, 0),
      16: new ThiefSkillsDexEntry(0, 5, 0, 0, 0),
      17: new ThiefSkillsDexEntry(5, 10, 0, 5, 5),
      18: new ThiefSkillsDexEntry(10, 15, 5, 10, 10),
      19: new ThiefSkillsDexEntry(15, 20, 10, 12, 12),
      20: new ThiefSkillsDexEntry(20, 25, 15, 15, 15),
      21: new ThiefSkillsDexEntry(25, 30, 20, 18, 18),
      22: new ThiefSkillsDexEntry(30, 35, 25, 20, 20),
      23: new ThiefSkillsDexEntry(35, 40, 30, 23, 23),
      24: new ThiefSkillsDexEntry(40, 45, 35, 25, 25),
      25: new ThiefSkillsDexEntry(45, 50, 40, 30, 30),
    };
  }
  getEntry(str_value) {
    return this.dexterity_dict[getValidVariable(str_value, 'dexterity', 9, 25)];
  }
}

// Thief Skills Racial Entry
class ThiefSkillsRacialEntry {
  constructor(pickPockets, openLocks, findRemoveTraps, moveSilently, hideInShadows, hearNoise, climbWalls, readLanguages) {
    this.pickPockets = pickPockets;
    this.openLocks = openLocks;
    this.findRemoveTraps = findRemoveTraps;
    this.moveSilently = moveSilently;
    this.hideInShadows = hideInShadows;
    this.hearNoise = hearNoise;
    this.climbWalls = climbWalls;
    this.readLanguages = readLanguages;
  }
  getPickPockets() {
    return this.pickPockets;
  }
  getOpenLocks() {
    return this.openLocks;
  }
  getFindRemoveTraps() {
    return this.findRemoveTraps;
  }
  getMoveSilently() {
    return this.moveSilently;
  }
  getHideInShadows() {
    return this.hideInShadows;
  }
  getHearNoise() {
    return this.hearNoise;
  }
  getClimbWalls() {
    return this.climbWalls;
  }
  getReadLanguages() {
    return this.readLanguages;
  }
}

class ThiefSkillsRacialAdjustmentTable {
  // thief_race_selected selector is 0=n/a, 1=Human, 2=Dwarf, 3=Elf, 4=Gnome, 5=Half-elf, 6=Halfling, 7=Half-orc
  constructor() {
    // pickPockets, openLocks, findRemoveTraps, moveSilently, hideInShadows, hearNoise, climbWalls, readLanguages
    this.dexterity_dict = {
      0: new ThiefSkillsRacialEntry(0, 0, 0, 0, 0, 0, 0, 0), // n/a
      1: new ThiefSkillsRacialEntry(0, 0, 0, 0, 0, 0, 0, 0), // human
      2: new ThiefSkillsRacialEntry(0, 10, 15, 0, 0, 0, -10, -5), // dwarf
      3: new ThiefSkillsRacialEntry(5, -5, 0, 5, 10, 5, 0, 0), // elf
      4: new ThiefSkillsRacialEntry(0, 5, 10, 5, 5, 10, -15, 0), // gnome
      5: new ThiefSkillsRacialEntry(10, 0, 0, 0, 5, 0, 0, 0), // half-elf
      6: new ThiefSkillsRacialEntry(5, 5, 5, 10, 15, 5, -15, -5), // halfling
      7: new ThiefSkillsRacialEntry(-5, 5, 5, 0, 0, 5, 5, -10), // half-orc
    };
  }
  getEntry(str_value) {
    return this.dexterity_dict[getValidVariable(str_value, 'thief_race_selected', 0, 7)];
  }
}

// Globals for Ability Calcs
const AT_STR = new StrengthAdjustmentTable();
const AT_INT = new IntelligenceAdjustmentTable();
const AT_WIS = new WisdomAdjustmentTable();
const AT_DEX = new DexterityAdjustmentTable();
const AT_CON = new ConstitutionAdjustmentTable();
const AT_CHA = new CharismaAdjustmentTable();
const AT_THIEF_SKILLS_DEX = new ThiefSkillsDexAdjustmentTable();
const AT_THIEF_SKILLS_RACIAL = new ThiefSkillsRacialAdjustmentTable();

// Allows easy modification of variables
const parseValues = (values, stat, type = 'int') => {
  if (type === 'int') return parseInt(values[stat]) || 0;
  if (type === 'float') return parseFloat(values[stat]) || 0;
  if (type === 'str') return values[stat];
  return null;
};

// Ability Row Calculations
strengthCalcs = () => {
  getAttrs(['strength', 'exceptionalstrength'], (values) => {
    const output = {};
    const stat_str = parseValues(values, 'strength', 'int');
    let stat_str_per = parseValues(values, 'exceptionalstrength');
    // Special check for perfect strength
    if (parseValues(values, 'exceptionalstrength', 'str') === '00') stat_str_per = 100;
    output.exceptionalstrength = stat_str_per;
    output.meleebonus = (AT_STR.getStrengthValue('Attack', stat_str, stat_str_per) <= 0 ? '' : '+') + AT_STR.getStrengthValue('Attack', stat_str, stat_str_per);
    output.dmgbonus = (AT_STR.getStrengthValue('Damage', stat_str, stat_str_per) <= 0 ? '' : '+') + AT_STR.getStrengthValue('Damage', stat_str, stat_str_per);
    output.majorstrengthfeat = AT_STR.getStrengthValue('Major', stat_str, stat_str_per);
    output.minorstrengthfeat = AT_STR.getStrengthValue('Minor', stat_str, stat_str_per);
    output.minorstrengthfeat_locked = AT_STR.getStrengthValue('Minor', stat_str, stat_str_per, true);
    output.encumbrancebonus = (AT_STR.getStrengthValue('Encumbrance', stat_str, stat_str_per) <= 0 ? '' : '+') + AT_STR.getStrengthValue('Encumbrance', stat_str, stat_str_per);
    setAttrs(output);
  });
};

intelligenceCalcs = () => {
  getAttrs(['intelligence', 'bonuslanguages', 'race'], (values) => {
    const output = {};
    const stat_int = parseValues(values, 'intelligence', 'int');
    const race_value = parseValues(values, 'race', 'str');
    let tableBonus = +AT_INT.getEntry(stat_int).getBonusLanguages();
    if (/human/gi.test(race_value)) {
      // bonus language INT table data is given for humans
      output.bonuslanguages = tableBonus;
    } else if (/dwarf/gi.test(race_value) || /gnome/gi.test(race_value) || /orc/gi.test(race_value)) {
      // dwarf, gnome, and half-orc are capped at 2
      output.bonuslanguages = Math.min(tableBonus, 2);
    } else if (/half-elf/gi.test(race_value) || /halfling/gi.test(race_value) || /hobbit/gi.test(race_value)) {
      // half-elf or halfling gain +1 for every point above 16
      if (tableBonus <= 5) {
        tableBonus = 0;
      } else if (tableBonus === 6) {
        tableBonus = 1;
      } else if (tableBonus === 7) {
        tableBonus = 2;
      } else if (tableBonus === 8) {
        tableBonus = 3;
      } else if (tableBonus === 9) {
        tableBonus = 4;
      } else if (tableBonus === 10) {
        tableBonus = 5;
      } else if (tableBonus === 11) {
        tableBonus = 6;
      } else if (tableBonus === 12) {
        tableBonus = 7;
      } else if (tableBonus === 13) {
        tableBonus = 8;
      } else if (tableBonus >= 14) {
        tableBonus = 9;
      }
      output.bonuslanguages = tableBonus;
    } else if (/elf/gi.test(race_value)) {
      // elf +1 for every point above 15
      if (tableBonus <= 4) {
        tableBonus = 0;
      } else if (tableBonus === 5) {
        tableBonus = 1;
      } else if (tableBonus == 6) {
        tableBonus = 2;
      } else if (tableBonus === 7) {
        tableBonus = 3;
      } else if (tableBonus === 8) {
        tableBonus = 4;
      } else if (tableBonus === 9) {
        tableBonus = 5;
      } else if (tableBonus === 10) {
        tableBonus = 6;
      } else if (tableBonus === 11) {
        tableBonus = 7;
      } else if (tableBonus === 12) {
        tableBonus = 8;
      } else if (tableBonus === 13) {
        tableBonus = 9;
      } else if (tableBonus >= 14) {
        tableBonus = 10;
      }
      output.bonuslanguages = tableBonus;
    } else {
      output.bonuslanguages = 0;
    }
    output.knowspell = AT_INT.getEntry(stat_int).getKnowSpell();
    output.minspells = AT_INT.getEntry(stat_int).getMinSpells();
    output.maxspells = AT_INT.getEntry(stat_int).getMaxSpells();
    setAttrs(output, {silent: true});
  });
};

wisdomCalcs = () => {
  getAttrs(['wisdom'], (values) => {
    const output = {};
    const stat_wis = parseValues(values, 'wisdom', 'int');
    output.mentalsavebonus = (AT_WIS.getEntry(stat_wis).getMentalSaveBonus() <= 0 ? '' : '+') + AT_WIS.getEntry(stat_wis).getMentalSaveBonus();
    output.spellbonus = AT_WIS.getEntry(stat_wis).getSpellBonus();
    output.spellfailure = AT_WIS.getEntry(stat_wis).getSpellFailure();
    setAttrs(output, {silent: true});
  });
};

dexterityCalcs = () => {
  getAttrs(['dexterity'], (values) => {
    const output = {};
    const stat_dex = parseValues(values, 'dexterity', 'int');
    const surpriseBon = AT_DEX.getEntry(stat_dex).getSurpriseBonus();
    const surprisebonus_add_sign = (-1 * surpriseBon <= 0 ? '' : '+') + -1 * surpriseBon;
    output.surprisebonus = AT_DEX.getEntry(stat_dex).getSurpriseBonus();
    output.surprisebonus_inverted = surprisebonus_add_sign;
    output.rangedbonus = (AT_DEX.getEntry(stat_dex).getRangedBonus() <= 0 ? '' : '+') + AT_DEX.getEntry(stat_dex).getRangedBonus();
    output.armorbonus = (AT_DEX.getEntry(stat_dex).getArmorBonus() <= 0 ? '' : '+') + AT_DEX.getEntry(stat_dex).getArmorBonus();
    setAttrs(output);
  });
};

constitutionCalcs = () => {
  getAttrs(['constitution', 'class', 'secondclass', 'thirdclass'], (values) => {
    const output = {};
    const stat_con = parseValues(values, 'constitution', 'int');
    // check classes for FRP otherwise cap at HP bonus at +2
    const classes = [values.class, values.secondclass, values.thirdclass];
    if (/fighter/gi.test(classes) || /paladin/gi.test(classes) || /ranger/gi.test(classes)) {
      // clog(`${classes.join(' ')} class. Using expanded HP bonus.`);
      output.hitpointbonus = (AT_CON.getEntry(stat_con).getHitpointBonus() <= 0 ? '' : '+') + AT_CON.getEntry(stat_con).getHitpointBonus();
    } else {
      output.hitpointbonus = (Math.min(AT_CON.getEntry(stat_con).getHitpointBonus(), 2) <= 0 ? '' : '+') + Math.min(AT_CON.getEntry(stat_con).getHitpointBonus(), 2);
    }
    output.systemshock = AT_CON.getEntry(stat_con).getSystemShock();
    output.resurrectionsurvival = AT_CON.getEntry(stat_con).getResurrectionSurvival();
    setAttrs(output);
  });
};

charismaCalcs = () => {
  getAttrs(['charisma'], (values) => {
    const output = {};
    const stat_cha = parseValues(values, 'charisma', 'int');
    output.maximumhenchmen = AT_CHA.getEntry(stat_cha).MaximumHenchmen();
    output.loyaltybonus = (AT_CHA.getEntry(stat_cha).getLoyaltyBonus() <= 0 ? '' : '+') + AT_CHA.getEntry(stat_cha).getLoyaltyBonus();
    output.reactionbonus = (AT_CHA.getEntry(stat_cha).getReactionBonus() <= 0 ? '' : '+') + AT_CHA.getEntry(stat_cha).getReactionBonus();
    output.comeliness_cha_adj = (AT_CHA.getEntry(stat_cha).getComeliness() <= 0 ? '' : '+') + AT_CHA.getEntry(stat_cha).getComeliness();
    setAttrs(output, {silent: true});
  });
};

thiefSkillsDexCalcs = (autofill_thief_dex) => {
  getAttrs(['dexterity'], (values) => {
    const output = {};
    //get dexterity value and look up table data
    const stat_dex = parseValues(values, 'dexterity', 'int');
    const pickPockets = AT_THIEF_SKILLS_DEX.getEntry(stat_dex).getPickPockets();
    const openLocks = AT_THIEF_SKILLS_DEX.getEntry(stat_dex).getOpenLocks();
    const findRemoveTraps = AT_THIEF_SKILLS_DEX.getEntry(stat_dex).getFindRemoveTraps();
    const moveSilently = AT_THIEF_SKILLS_DEX.getEntry(stat_dex).getMoveSilently();
    const hideInShadows = AT_THIEF_SKILLS_DEX.getEntry(stat_dex).getHideInShadows();
    output.pickpockets_ability_mod = autofill_thief_dex === 1 ? pickPockets : 0;
    output.openlocks_ability_mod = autofill_thief_dex === 1 ? openLocks : 0;
    output.findtraps_ability_mod = autofill_thief_dex === 1 ? findRemoveTraps : 0;
    output.movequietly_ability_mod = autofill_thief_dex === 1 ? moveSilently : 0;
    output.hideinshadows_ability_mod = autofill_thief_dex === 1 ? hideInShadows : 0;
    setAttrs(output);
  });
};

thiefSkillsRacialCalcs = (autofill_thief_race) => {
  getAttrs(['thief_race_selected'], (values) => {
    const output = {};
    //get racial value from select and look up table data
    const stat_dex = parseValues(values, 'thief_race_selected', 'int');
    const pickPockets = AT_THIEF_SKILLS_RACIAL.getEntry(stat_dex).getPickPockets();
    const openLocks = AT_THIEF_SKILLS_RACIAL.getEntry(stat_dex).getOpenLocks();
    const findRemoveTraps = AT_THIEF_SKILLS_RACIAL.getEntry(stat_dex).getFindRemoveTraps();
    const moveSilently = AT_THIEF_SKILLS_RACIAL.getEntry(stat_dex).getMoveSilently();
    const hideInShadows = AT_THIEF_SKILLS_RACIAL.getEntry(stat_dex).getHideInShadows();
    const hearNoise = AT_THIEF_SKILLS_RACIAL.getEntry(stat_dex).getHearNoise();
    const climbWalls = AT_THIEF_SKILLS_RACIAL.getEntry(stat_dex).getClimbWalls();
    const readLanguages = AT_THIEF_SKILLS_RACIAL.getEntry(stat_dex).getReadLanguages();

    output.pickpockets_racial_mod = autofill_thief_race === 1 ? pickPockets : 0;
    output.openlocks_racial_mod = autofill_thief_race === 1 ? openLocks : 0;
    output.findtraps_racial_mod = autofill_thief_race === 1 ? findRemoveTraps : 0;
    output.movequietly_racial_mod = autofill_thief_race === 1 ? moveSilently : 0;
    output.hideinshadows_racial_mod = autofill_thief_race === 1 ? hideInShadows : 0;
    output.hearnoise_racial_mod = autofill_thief_race === 1 ? hearNoise : 0;
    output.climbwalls_racial_mod = autofill_thief_race === 1 ? climbWalls : 0;
    output.readlanguages_racial_mod = autofill_thief_race === 1 ? readLanguages : 0;

    setAttrs(output);
  });
};

// Thief Skills Dex Calculations
on('change:autofill_thief_dex change:dexterity', (eventInfo) => {
  getAttrs(['autofill_thief_dex'], (v) => {
    const autofill_thief_dex = +v.autofill_thief_dex;
    thiefSkillsDexCalcs(autofill_thief_dex);
  });
});

// match class name to core class & return # for hit table lookup
function matchRaceName(name) {
  const lowerCaseName = name.trim().toLowerCase();
  if (/human/.test(lowerCaseName)) {
    return 1;
  } else if (/dwarf/.test(lowerCaseName)) {
    return 2;
  } else if (/half-elf/.test(lowerCaseName)) {
    // Check for "half-elf" before "elf"
    return 5;
  } else if (/elf/.test(lowerCaseName)) {
    return 3;
  } else if (/gnome/.test(lowerCaseName)) {
    return 4;
  } else if (/halfling|hobbit/.test(lowerCaseName)) {
    return 6;
  } else if (/half-orc/.test(lowerCaseName)) {
    return 7;
  } else {
    return 0;
  }
}

// Thief Skills Racial Calculations
on('change:race change:autofill_thief_race change:thief_race_selected', (eventInfo) => {
  const triggerAttr = eventInfo.sourceAttribute;
  getAttrs(['race', 'autofill_thief_race'], (v) => {
    const output = {};
    const autofill_thief_race = +v.autofill_thief_race;

    // check attr_race for a match to the race selector
    const race = (v.race || 'human').trim();
    if (triggerAttr === 'autofill_thief_race' || triggerAttr === 'race') {
      output.thief_race_selected = matchRaceName(race);
    }
    setAttrs(output, {silent: true}, () => {
      thiefSkillsRacialCalcs(autofill_thief_race);
    });
  });
});

// Strength Calculations
on('change:strength change:exceptionalstrength', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  strengthCalcs();
});

// Intelligence Calculations
on('change:intelligence change:race', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  intelligenceCalcs();
});

// Wisdom Calculations
on('change:wisdom', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  wisdomCalcs();
});

// Dexterity Calculations
on('change:dexterity', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  dexterityCalcs();
});

// Constitution Calculations
on('change:constitution change:class change:secondclass change:thirdclass', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  constitutionCalcs();
});

// Charisma Calculations
on('change:charisma change:comeliness', (eventInfo) => {
  // clog(`Change Detected:${eventInfo.sourceAttribute}`);
  charismaCalcs();
});

portraitUrlCalc = () => {
  getAttrs(['character_avatar', 'sheet_image', 'sheet_image_url'], (v) => {
    const output = {};
    const whichImage = +v.sheet_image;
    // roll20 urls includes extra meta after the image extension
    const avatarURL = (function getAvatarUrl(url) {
      // check url for common image extension
      const extensions = /(\.png|\.jpg|\.gif)/i;
      const match = url.match(extensions);
      // trim excess after extension
      if (match) {
        return url.slice(0, match.index + match[0].length);
      }
      return url;
    })(v.character_avatar);

    const sheetURL = v.sheet_image_url || avatarURL;
    if (whichImage === 0) {
      output.sheet_image_src = sheetURL;
    }
    if (whichImage === 1) {
      output.sheet_image_src = avatarURL;
    }
    if (whichImage === 2) {
      output.sheet_image_src = '';
    }
    setAttrs(output, {silent: true});
  });
};

on('change:character_avatar change:sheet_image change:sheet_image_url', (eventInfo) => {
  // clog(`change detected:${eventInfo.sourceAttribute}`);
  portraitUrlCalc();
});

// uses CRP to auto-update link with sheet_image_src
on('clicked:postimage', async (eventInfo) => {
  portraitUrlCalc();
  const roll_string = `?{Display the portrait image?|YES,@{sheet_image_src}|NO,&nbsp;}`;
  await new Promise((resolve) => {
    startRoll(roll_string, (roll) => {
      finishRoll(roll.rollId);
      resolve();
    });
  });
});

// psionic calcs
on('change:psionic_ability_strength_max change:psionic_attack change:psionic_defense', (eventInfo) => {
  getAttrs(['psionic_ability_strength_max'], (v) => {
    const output = {};
    const strengthMax = v.psionic_ability_strength_max;
    output.psionic_attack_max = float(strengthMax / 2).toFixed(1);
    output.psionic_defense_max = float(strengthMax / 2).toFixed(1);
    setAttrs(output, {silent: true});
  });
});

weaponInUse = () => {
  getSectionIDs('repeating_weapon', (idArray) => {
    const output = {};
    const fields = [];
    const weaponsInUse = [];
    // Array to store weapons with inUse === 1
    idArray.forEach((id) => {
      fields.push(section_attribute('weapon', id, 'weapon_name'));
      fields.push(section_attribute('weapon', id, 'weapon_use'));
      fields.push(section_attribute('weapon', id, 'weapon_speed'));
      fields.push(section_attribute('weapon', id, 'weapon_misc'));
    });
    getAttrs(fields, (v) => {
      idArray.forEach((id) => {
        const inUse = +v[section_attribute('weapon', id, 'weapon_use')] || 0;
        if (inUse === 0) return;
        const name = v[section_attribute('weapon', id, 'weapon_name')];
        // default to 0 if empty otherwise grab the first integer entered
        const speedStr = v[section_attribute('weapon', id, 'weapon_speed')] || '0';
        const speed = parseInt(speedStr.match(/\d+/)?.[0]) || 0;
        const misc = v[section_attribute('weapon', id, 'weapon_misc')];
        weaponsInUse.push({id, name, inUse, speed, misc});
      });

      // Find fastest(ie lowest) speed factor
      if (weaponsInUse.length > 0) {
        let lowestSpeedWeapon = weaponsInUse[0];
        weaponsInUse.forEach((weapon) => {
          if (weapon.speed < lowestSpeedWeapon.speed) {
            lowestSpeedWeapon = weapon;
          }
        });
        // set global attr with lowest speed weapon/attack
        const {name, speed, misc} = lowestSpeedWeapon;
        // console.log(`Lowest speed weapon - name: ${name}, speed: ${speed}, misc: ${misc}`);
        output.weapon_in_use = name;
        output.weapon_in_use_speed = speed;
        output.weapon_in_use_misc = misc;
      } else {
        output.weapon_in_use = '';
        output.weapon_in_use_speed = '';
        output.weapon_in_use_misc = '';
      }
      setAttrs(output, {silent: true});
    });
  });
};

on('change:repeating_weapon:weapon_name change:repeating_weapon:weapon_use change:repeating_weapon:weapon_speed change:repeating_weapon:weapon_misc', (eventInfo) => {
  // clog(eventInfo.sourceAttribute);
  weaponInUse();
});

// utility function to grab row order
const getSectionIDsOrdered = function (sectionName, callback) {
  getAttrs([`_reporder_${sectionName}`], function (v) {
    getSectionIDs(sectionName, function (idArray) {
      let reporderArray = v[`_reporder_${sectionName}`] ? v[`_reporder_${sectionName}`].toLowerCase().split(',') : [],
        ids = [...new Set(reporderArray.filter((x) => idArray.includes(x)).concat(idArray))];
      callback(ids);
    });
  });
};

// sort repeating rows
on('clicked:spell-sort-alphabetical clicked:spell-sort-level', function (eventInfo) {
  // console.log(`Change detected: Sorting Spells`);
  const sectionName = 'repeating_spells';
  // needed to grab current/previous order
  getSectionIDsOrdered(sectionName, function (ids) {
    getSectionIDs(sectionName, (idArray) => {
      // Bail out IF 0 repeating entries
      if (!idArray.length) return;
      const fields = [];
      const buttonClicked = eventInfo.triggerName.replace('clicked:', '');
      // grab any attrs used for sorting
      idArray.forEach((id) => {
        fields.push(section_attribute('spells', id, 'spell_caster_class'));
        fields.push(section_attribute('spells', id, 'spell_level'));
        fields.push(section_attribute('spells', id, 'spell_name'));
      });
      getAttrs([...fields], (v) => {
        const output = {};
        const spells = idArray.map((id) => ({
          id,
          casterClass: v[section_attribute('spells', id, 'spell_caster_class')] || 0,
          level: v[section_attribute('spells', id, 'spell_level')], // can be '?'
          name: (v[section_attribute('spells', id, 'spell_name')] || '').trim(),
        }));

        const getLevelValue = (level) => {
          if (level === '?') return -1;
          return level || 0;
        };

        // SORT LOGIC
        if (buttonClicked === 'spell-sort-alphabetical') {
          spells.sort((a, b) => {
            // sort by spell name A-Z
            return a.name.localeCompare(b.name, undefined, {sensitivity: 'base'});
          });
        } else if (buttonClicked === 'spell-sort-level') {
          // sort by Caster Class, then level 0-9, then by spell name A-Z
          spells.sort((a, b) => {
            const aLevel = getLevelValue(a.level);
            const bLevel = getLevelValue(b.level);
            return (
              a.casterClass - b.casterClass ||
              aLevel - bLevel || // Sort using the new values
              a.name.localeCompare(b.name, undefined, {sensitivity: 'base'})
            );
          });
        }

        // new sort order
        const order = spells.map((s) => `${s.id}`);

        // save previous order/state for 'Undo'
        output.spells_previous_order_array = ids.join(',');
        // console.log(`Previous Order has been saved.`);
        // console.log(ids);

        // set new sort order
        setAttrs(output, {silent: true}, () => {
          setSectionOrder('spells', order);
        });
        // console.log(`${buttonClicked} Reordered ${sectionName}:`, spells);
      });
    });
  });
});

// restores previous order
on('clicked:spell-sort-undo', (eventInfo) => {
  // console.log(`Change detected: Undo last Sort`);
  getAttrs(['spells_previous_order_array'], (v) => {
    const order = v.spells_previous_order_array;
    if (!order || typeof order !== 'string') return;
    const previousOrder = order.split(',');
    // console.log(`Previous Order:${previousOrder}`);
    setSectionOrder('spells', previousOrder);
  });
});

on('clicked:equipment-sort-alphabetical clicked:equipment-sort-location', function (eventInfo) {
  // console.log(`Change detected: Sorting Equipment`);
  const sectionName = 'repeating_equipment';
  // needed to grab current/previous order
  getSectionIDsOrdered(sectionName, function (ids) {
    getSectionIDs(sectionName, (idArray) => {
      // Bail out IF 0 repeating entries
      if (!idArray.length) return;
      const fields = [];
      const buttonClicked = eventInfo.triggerName.replace('clicked:', '');
      // grab any attrs used for sorting
      idArray.forEach((id) => {
        fields.push(section_attribute('equipment', id, 'equipment_item'));
        fields.push(section_attribute('equipment', id, 'equipment_location'));
      });
      getAttrs([...fields], (v) => {
        const output = {};
        const equipment = idArray.map((id) => ({
          id,
          name: (v[section_attribute('equipment', id, 'equipment_item')] || '').trim(),
          location: (v[section_attribute('equipment', id, 'equipment_location')] || '').trim(),
        }));

        if (buttonClicked === 'equipment-sort-alphabetical') {
          equipment.sort((a, b) => {
            // sort by equipment name A-Z
            return a.name.localeCompare(b.name, undefined, {sensitivity: 'base'});
          });
        } else if (buttonClicked === 'equipment-sort-location') {
          equipment.sort((a, b) => {
            // 1. Compare by location first
            const locationComparison = a.location.localeCompare(b.location, undefined, {sensitivity: 'base'});
            // If locations are different (non-zero result), return the location comparison
            if (locationComparison !== 0) {
              return locationComparison;
            }
            // 2. If locations are the same (locationComparison is 0), then compare by equipment name
            return a.name.localeCompare(b.name, undefined, {sensitivity: 'base'});
          });
        }
        // Apply the new order
        const order = equipment.map((s) => `${s.id}`);
        // save previous order/state for 'Undo'
        output.equipment_previous_order_array = ids.join(',');
        // console.log(`Previous Order has been saved.`);
        // console.log(ids);
        // set new sort order
        setAttrs(output, {silent: true}, () => {
          setSectionOrder('equipment', order);
        });
        // console.log(`${buttonClicked} Reordered ${sectionName}:`, equipment);
      });
    });
  });
});

// restores previous order
on('clicked:equipment-sort-undo', (eventInfo) => {
  // console.log(`Change detected: Undo last Sort`);
  getAttrs(['equipment_previous_order_array'], (v) => {
    const order = v.equipment_previous_order_array;
    if (!order || typeof order !== 'string') return;
    const previousOrder = order.split(',');
    // console.log(`Previous Order:${previousOrder}`);
    setSectionOrder('equipment', previousOrder);
  });
});
