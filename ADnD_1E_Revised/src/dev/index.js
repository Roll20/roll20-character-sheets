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

// used in getSectionIds to separate a repeating attribute names into 3 components
const section_attribute = (section, id, field) => `repeating_${section}_${id}_${field}`;

// VERSIONATOR example
// use blankUpdateTemplate below as a guide to add updates to versionator.
// const blankUpdateTemplate = (current_version, final_version) => {
// have this line up near the start
//  const output = {};
// do stuff. ie geSectionIDs, getAttrs, all the various calculations
// then end the worker
//  output.sheet_version = current_version;
//  setAttrs(output, {silent: true}, versionator(current_version, final_version));
// don't forget any close brackets for getattrs, etc.
//  };
// END

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
      setAttrs(output, {silent: true}, versionator(current_version, final_version));
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
      setAttrs(output, {silent: true}, versionator(current_version, final_version));
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
      setAttrs(output, {silent: true}, versionator(current_version, final_version));
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
      setAttrs(output, {silent: true}, versionator(current_version, final_version));
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
      setAttrs(output, {silent: true}, versionator(current_version, final_version));
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
      setAttrs(output, {silent: true}, versionator(current_version, final_version));
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
      setAttrs(output, {silent: true}, versionator(current_version, final_version));
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
      setAttrs(output, {silent: true}, versionator(current_version, final_version));
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
            setAttrs(output, {silent: true}, versionator(current_version, final_version));
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
  setAttrs(output, versionator(current_version, final_version));
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
  setAttrs(output, {silent: true}, versionator(current_version, final_version));
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
  setAttrs(output, {silent: true}, versionator(current_version, final_version));
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
      setAttrs(output, {silent: true}, versionator(current_version, final_version));
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
    setAttrs(output, {silent: true}, versionator(current_version, final_version), calcHP());
  });
};

// migrate AC
const migrateAC = (current_version, final_version) => {
  getAttrs(['armorclass', 'armortype_ac', 'armorclass_total', 'armorbonus', 'armorshield'], (v) => {
    const output = {};
    const recalc = 0;
    let armorClass = +v.armorclass || 0;
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
    setAttrs(output, {silent: true}, versionator(current_version, final_version), calcAC(recalc));
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
      setAttrs(output, {silent: true}, versionator(current_version, final_version));
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
      setAttrs(output, {silent: true}, versionator(current_version, final_version));
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
      setAttrs(output, {silent: true}, versionator(current_version, final_version));
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
      setAttrs(output, {silent: true}, versionator(current_version, final_version));
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
      setAttrs(output, {silent: true}, versionator(current_version, final_version));
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
      setAttrs(output, {silent: true}, versionator(current_version, final_version));
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
      setAttrs(output, {silent: true}, versionator(current_version, final_version));
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
    setAttrs(output, {silent: true}, versionator(current_version, final_version));
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
  setAttrs(output, {silent: true}, versionator(current_version, final_version));
};

// combines 2 arrays so that the row_id attr is ONLY used with copyArmorToEquipment()
const armorIDsAndAttrs = armorAttrs.concat(armorRowIDs);
// sync armor
function syncArmorToEquipment(id, attr, row_removed, migrate) {
  getAttrs(armorIDsAndAttrs, (v) => {
    const output = {};
    let newID = '';
    let id_low = id;
    id_low = id_low !== null ? id.toLowerCase() : id_low;
    // clog(`syncArmorToEquipment id:${id_low}  attr:${attr}  row_removed:${row_removed}`);
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
    // clog(`syncArmorToEquipment idArray: [${idArray}]`);
    // use arrays to determine what row to create/update/reset
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
    const helmetAttrs = [
      'armorhelmet_worn',
      'armorhelmet',
      'armorhelmet_ac',
      'armorhelmet_magic',
      'armorhelmet_bulk',
      'armorhelmet_carried',
      'armorhelmet_weight',
      'armorhelmet_cost',
    ];
    const other1Attrs = ['armorother_worn', 'armorother', 'armorother_ac', 'armorother_base', 'armorother_magic', 'armorother_mod'];
    const other2Attrs = ['armorother2_worn', 'armorother2', 'armorother2_ac', 'armorother2_base', 'armorother2_magic', 'armorother2_mod'];
    const other3Attrs = ['armorother3_worn', 'armorother3', 'armorother3_ac', 'armorother3_base', 'armorother3_magic', 'armorother3_mod'];
    const other4Attrs = ['armorother4_worn', 'armorother4', 'armorother4_ac', 'armorother4_base', 'armorother4_magic', 'armorother4_mod'];
    const other5Attrs = ['armorother5_worn', 'armorother5', 'armorother5_ac', 'armorother5_base', 'armorother5_magic', 'armorother5_mod'];
    const other6Attrs = ['armorother6_worn', 'armorother6', 'armorother6_ac', 'armorother6_base', 'armorother6_magic', 'armorother6_mod'];
    function matchAttr(attribute) {
      const arrays = {unarmoredAttrs, armor1Attrs, armor2Attrs, shieldAttrs, helmetAttrs, other1Attrs, other2Attrs, other3Attrs, other4Attrs, other5Attrs, other6Attrs};
      const matchingArray = Object.entries(arrays).find(([arrayName, array]) => array.includes(attribute));
      return matchingArray ? matchingArray[0] : null; // Return the array name or null if no match is found
    }
    const attrToCheck = attr;
    const matchingArray = matchAttr(attrToCheck);
    if (matchingArray) {
      // console.log(`Match found in array: ${matchingArray}`);
    } else {
      // console.log(`No match found for attribute: ${attrToCheck}`);
    }
    const armor0 = v.unarmored;
    const armor1 = v.armortype;
    const armor2 = v.armortype2;
    const shield = v.armorshield;
    const helmet = v.armorhelmet;
    const other1 = v.armorother;
    const other2 = v.armorother2;
    const other3 = v.armorother3;
    const other4 = v.armorother4;
    const other5 = v.armorother5;
    const other6 = v.armorother6;
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
            output[`repeating_equipment_${newID}_equipment_armor_worn`] = +v.unarmored_worn || 0;
            output[`repeating_equipment_${newID}_equipment_item`] = v.unarmored;
            output[`repeating_equipment_${newID}_equipment_armor_ac`] = 