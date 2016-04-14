/* global setAttrs:false, getAttrs:false, on:false, getSectionIDs:false, generateRowID:false */
'use strict';

const currentVersion = '2.4.13';
let TRANSLATIONS;
const SKILLS = {
  acrobatics: 'dexterity',
  animalHandling: 'wisdom',
  arcana: 'intelligence',
  athletics: 'strength',
  deception: 'charisma',
  history: 'intelligence',
  insight: 'wisdom',
  intimidation: 'charisma',
  investigation: 'intelligence',
  medicine: 'wisdom',
  nature: 'intelligence',
  perception: 'wisdom',
  performance: 'charisma',
  persuasion: 'charisma',
  religion: 'intelligence',
  sleightOfHand: 'dexterity',
  stealth: 'dexterity',
  survival: 'wisdom',
};
const CLASSES = ['barbarian', 'bard', 'cleric', 'druid', 'fighter', 'monk', 'paladin', 'ranger', 'rogue', 'sorcerer', 'warlock', 'wizard'];
const ABILITIES = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];

const translate = (language, key) => {
  let translatedValue;
  if (key.indexOf('.') !== -1) {
    translatedValue = key.split('.').reduce((a, b) => a[b], TRANSLATIONS[language]);
  }

  if (TRANSLATIONS[language] && TRANSLATIONS[language][key]) {
    translatedValue = TRANSLATIONS[language][key];
  }

  if (!translatedValue && language !== 'en') {
    translate('en', key);
  }
  return translatedValue;
};
const capitalize = (string) => {
  return string.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1);
  });
};
const firstThree = (string) => {
  return string.substring(0, 3);
};
const round = (value, places) => {
  return +(`${Math.round(`${value}e+${places}`)}e-${places}`);
};
const getKeyByValue = (obj, value) => {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (obj[prop] === value) {
        return prop;
      }
    }
  }
  return null;
};
const calculatePercentDifference = (oldValue, newValue) => {
  return Math.abs(((oldValue - newValue) / oldValue) * 100);
};
const isUndefined = (value) => {
  if (typeof value === 'undefined' || value === '') {
    return true;
  }
  return false;
};
const getIntValue = (value, defaultValue) => {
  if (!defaultValue) {
    defaultValue = 0;
  }
  return parseInt(value, 10) || defaultValue;
};
const getFloatValue = (value, defaultValue) => {
  if (!defaultValue) {
    defaultValue = 0;
  }
  return parseFloat(value) || defaultValue;
};
const exists = (value) => {
  if (isUndefined(value) || value === '' || value === '0' || value === 0) {
    return false;
  }
  return true;
};
const getAbilityModName = (varName) => {
  if (!varName) {
    return 'strength_mod';
  } else if (typeof varName === 'string') {
    varName = varName.replace(/\W/g, '');
  }
  return varName;
};
const getAbilityName = (varName) => {
  if (!varName) {
    return 'strength';
  }
  return getAbilityModName(varName).replace('_mod', '');
};
const getAbilityValue = (v, varName, defaultAbility) => {
  if (typeof varName === 'undefined') {
    if (defaultAbility) {
      return getIntValue(v[defaultAbility]);
    }
  } else if (exists(varName)) {
    varName = getAbilityModName(varName);
    return getIntValue(v[varName], 0);
  }
  return 0;
};
const getAbilityShortName = (varName, capital) => {
  if (!varName) {
    return 'Str';
  }
  varName = getAbilityModName(varName);
  if (capital) {
    varName = capitalize(varName);
  }
  return firstThree(varName);
};
const getRepeatingInfo = (leadingString, eventInfo) => {
  const re = new RegExp(`${leadingString}_(-[a-zA-Z0-9\-]*)_(.*)`);
  const match = eventInfo.sourceAttribute.match(re);

  let result;
  if (match && match[1] && match[2]) {
    result = {
      rowId: match[1],
      field: match[2],
    };
  }
  return result;
};
const isEmpty = (obj) => {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
};
const setFinalAttrs = (v, finalSetAttrs, callback) => {
  if (!isEmpty(finalSetAttrs)) {
    for (const key in finalSetAttrs) {
      if (finalSetAttrs.hasOwnProperty(key)) {
        if (v[key] === finalSetAttrs[key]) {
          delete finalSetAttrs[key];
        }
      }
    }
    if (!isEmpty(finalSetAttrs)) {
      console.info('finalSetAttrs', finalSetAttrs);
    }
    if (!isEmpty(finalSetAttrs)) {
      if (callback) {
        setAttrs(finalSetAttrs, {}, callback);
      } else {
        setAttrs(finalSetAttrs);
      }
    }
  }
};
const fromVOrFinalSetAttrs = (v, finalSetAttrs, value) => {
  if (exists(finalSetAttrs[value])) {
    return finalSetAttrs[value];
  }
  return v[value];
};
const parseAttackComponent = (v, repeatingString, finalSetAttrs, options) => {
  let parsed = v[`${repeatingString}parsed`];

  if (isUndefined(parsed)) {
    parsed = finalSetAttrs[`${repeatingString}parsed`];
  }

  if (isUndefined(parsed) || parsed.indexOf(options.parseName) === -1) {
    let aTriggerFieldExists = false;

    for (const triggerField of options.triggerFields) {
      if (exists(v[repeatingString + triggerField])) {
        aTriggerFieldExists = true;
      }
    }
    if (aTriggerFieldExists && isUndefined(v[repeatingString + options.toggleField])) {
      finalSetAttrs[repeatingString + options.toggleField] = options.toggleFieldSetTo;

      if (isUndefined(finalSetAttrs[`${repeatingString}parsed`])) {
        finalSetAttrs[`${repeatingString}parsed`] = '';
      }
      finalSetAttrs[`${repeatingString}parsed`] += ` ${options.parseName}`;
    }
    if (options.attackAbility && isUndefined(v[`${repeatingString}attack_ability`])) {
      finalSetAttrs[`${repeatingString}attack_ability`] = v.default_ability;
    }

    if (options.addCastingModifier) {
      if (!isUndefined(v[`${repeatingString}damage`]) && isUndefined(v[`${repeatingString}damage_ability`])) {
        finalSetAttrs[`${repeatingString}damage_ability`] = v.default_ability;
      }
      if (!isUndefined(v[`${repeatingString}heal`]) && isUndefined(v[`${repeatingString}heal_ability`])) {
        finalSetAttrs[`${repeatingString}heal_ability`] = v.default_ability;
      }
    }
  }
};
const hasUpperCase = (string) => {
  return (/[A-Z]/.test(string));
};
const ordinalSpellLevel = (level) => {
  let spellLevel = '';
  if (level === 0) {
    spellLevel = 'Cantrip';
  } else {
    switch (level % 10) {
      case 1:
        spellLevel = `${level}st-level`;
        break;
      case 2:
        spellLevel = `${level}nd-level`;
        break;
      case 3:
        spellLevel = `${level}rd-level`;
        break;
      default:
        spellLevel = `${level}th-level`;
        break;
    }
  }
  return spellLevel;
};
const versionCompare = (v1, v2, options) => {
  const lexicographical = options && options.lexicographical;
  const zeroExtend = options && options.zeroExtend;
  let v1parts = v1.split('.');
  let v2parts = v2.split('.');

  const isValidPart = (x) => {
    return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
  };

  if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
    return NaN;
  }

  if (zeroExtend) {
    while (v1parts.length < v2parts.length) {
      v1parts.push('0');
    }
    while (v2parts.length < v1parts.length) {
      v2parts.push('0');
    }
  }

  if (!lexicographical) {
    v1parts = v1parts.map(Number);
    v2parts = v2parts.map(Number);
  }

  for (let i = 0; i < v1parts.length; ++i) {
    if (v2parts.length === i) {
      return 1;
    }

    if (v1parts[i] === v2parts[i]) {
      continue;
    } else if (v1parts[i] > v2parts[i]) {
      return 1;
    } else {
      return -1;
    }
  }

  if (v1parts.length !== v2parts.length) {
    return -1;
  }

  return 0;
};
const getAbilityMod = (score) => {
  return Math.floor((getIntValue(score) - 10) / 2);
};
const addArithmeticOperator = (string, number) => {
  let value = number;
  if (string) {
    if (number < 0) {
      value = ` - ${Math.abs(number)}`;
    } else {
      value = ` + ${number}`;
    }
  }
  return value;
};
const numberWithCommas = (x) => {
  const parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};
const findClosest = (array, goal) => {
  return array.reduce((prev, curr) => {
    return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
  });
};
const getCorrectAbilityBasedOnBonus = (finalSetAttrs, repeatingString, fieldName, bonus, spellMods, meleeMods, spellAttack, rangedAttack, dexMod) => {
  let closest;
  if (bonus) {
    if (spellAttack) {
      closest = findClosest(spellMods, bonus);
      bonus -= closest;
      if (closest === spellMods[0]) {
        finalSetAttrs[repeatingString + fieldName] = '@{intelligence_mod}';
      } else if (closest === spellMods[1]) {
        finalSetAttrs[repeatingString + fieldName] = '@{wisdom_mod}';
      } else if (closest === spellMods[2]) {
        finalSetAttrs[repeatingString + fieldName] = '@{charisma_mod}';
      }
    } else {
      if (rangedAttack) {
        finalSetAttrs[`${repeatingString}attack_ability`] = '@{dexterity_mod}';
        bonus -= dexMod;
      } else {
        closest = findClosest(meleeMods, bonus);
        bonus -= closest;
        if (closest === meleeMods[0]) {
          finalSetAttrs[repeatingString + fieldName] = '@{strength_mod}';
        } else if (closest === meleeMods[1]) {
          finalSetAttrs[repeatingString + fieldName] = '@{dexterity_mod}';
        }
      }
    }
  } else {
    finalSetAttrs[repeatingString + fieldName] = 0;
  }
  return bonus;
};
const getAnyCorrectAbilityBasedOnBonus = (finalSetAttrs, repeatingString, fieldName, bonus, abilityMods) => {
  const closest = findClosest(abilityMods, bonus);
  if (bonus) {
    bonus -= closest;

    if (closest === abilityMods[0]) {
      finalSetAttrs[repeatingString + fieldName] = '@{strength_mod}';
    } else if (closest === abilityMods[1]) {
      finalSetAttrs[repeatingString + fieldName] = '@{dexterity_mod}';
    } else if (closest === abilityMods[2]) {
      finalSetAttrs[repeatingString + fieldName] = '@{constitution_mod}';
    } else if (closest === abilityMods[3]) {
      finalSetAttrs[repeatingString + fieldName] = '@{intelligence_mod}';
    } else if (closest === abilityMods[4]) {
      finalSetAttrs[repeatingString + fieldName] = '@{wisdom_mod}';
    } else if (closest === abilityMods[5]) {
      finalSetAttrs[repeatingString + fieldName] = '@{charisma_mod}';
    }
  } else {
    finalSetAttrs[repeatingString + fieldName] = 0;
  }
  return bonus;
};

const lowercaseDamageTypes = (string) => {
  if (!string) {
    string = '';
  }
  return string
    .replace('Acid', 'acid')
    .replace('Cold', 'cold')
    .replace('Fire', 'fire')
    .replace('Force', 'force')
    .replace('Lightning', 'lightning')
    .replace('Necrotic', 'necrotic')
    .replace('Poison', 'poison')
    .replace('Psychic', 'psychic')
    .replace('Radiant', 'radiant')
    .replace('Thunder', 'thunder')
    .replace('Bludgeoning', 'bludgeoning')
    .replace('Piercing', 'piercing')
    .replace('Slashing', 'slashing')
    .replace('And', 'and')
    .replace('From', 'from')
    .replace('Nonmagical', 'nonmagical')
    .replace('Weapons', 'weapons')
    .replace('That', 'that')
    .replace('Aren\'t', 'aren\'t')
    .replace('Silvered', 'silvered')
    .replace('Adamantine', 'adamantine');
};
const showSign = (value) => {
  if (value >= 0) {
    value = `+${value}`;
  }
  return value;
};

const calculateGold = () => {
  const collectionArray = ['cp', 'copper_per_gold', 'sp', 'silver_per_gold', 'ep', 'electrum_per_gold', 'gp', 'pp', 'platinum_per_gold'];
  const finalSetAttrs = {};

  getAttrs(collectionArray, (v) => {
    const copperPieces = getFloatValue(v.cp);
    const silverPieces = getFloatValue(v.sp);
    const electrumPieces = getFloatValue(v.ep);
    const goldPieces = getFloatValue(v.gp);
    const platinumPieces = getFloatValue(v.pp);
    const copperPerGold = getFloatValue(v.copper_per_gold, 100);
    const silverPerGold = getFloatValue(v.silver_per_gold, 10);
    const electrumPerGold = getFloatValue(v.electrum_per_gold, 2);
    const platinumPerGold = getFloatValue(v.platinum_per_gold, 10);

    finalSetAttrs.total_gp = ((copperPieces / copperPerGold) + (silverPieces / silverPerGold) + (electrumPieces / electrumPerGold) + goldPieces + (platinumPieces * platinumPerGold)).toFixed(2);
    finalSetAttrs.weight_coinage = (copperPieces + silverPieces + electrumPieces + goldPieces + platinumPieces) / 50;

    setFinalAttrs(v, finalSetAttrs);
  });
};
on('change:cp change:copper_per_gold change:sp change:silver_per_gold change:ep change:electrum_per_gold change:gp change:pp change:platinum_per_gold', () => {
  calculateGold();
});

const updateAbilityModifier = (ability) => {
  const collectionArray = [ability, `${ability}_bonus`, `${ability}_mod`, `${ability}_mod_with_sign`, `${ability}_check_mod`, `${ability}_check_mod_formula`, `${ability}_check_bonus`, 'global_ability_bonus', 'strength_mod', 'dexterity_mod', 'jack_of_all_trades_toggle', 'jack_of_all_trades', 'remarkable_athlete_toggle', 'remarkable_athlete', 'global_check_bonus'];
  const finalSetAttrs = {};

  if (ability === 'strength' || ability === 'dexterity') {
    collectionArray.push('finesse_mod');
  }
  if (ability === 'strength') {
    collectionArray.push('weight_multiplier');
    collectionArray.push('carrying_capacity');
    collectionArray.push('max_push_drag_lift');
    collectionArray.push('encumbered');
    collectionArray.push('heavily_encumbered');
  }

  getAttrs(collectionArray, (v) => {
    const abilityScore = getIntValue(v[ability]);
    const abilityBonus = getIntValue(v[`${ability}_bonus`]);
    const globalAbilityBonus = v.global_ability_bonus;
    let abilityScoreCalc = abilityScore + abilityBonus;

    if (!isNaN(globalAbilityBonus)) {
      abilityScoreCalc += getIntValue(globalAbilityBonus);
    }

    const abilityCheckBonus = getIntValue(v[`${ability}_check_bonus`]);
    const abilityMod = getAbilityMod(abilityScoreCalc);

    let abilityCheck = abilityMod;
    let abilityCheckFormula = `${abilityMod}[${firstThree(ability)} mod with bonus]`;
    if ((ability === 'strength' || ability === 'dexterity' || ability === 'constitution') && v.remarkable_athlete_toggle === '@{remarkable_athlete}') {
      const remarkableAthlete = getIntValue(v.remarkable_athlete);
      abilityCheck += remarkableAthlete;
      abilityCheckFormula += `${addArithmeticOperator(abilityCheckFormula, remarkableAthlete)}[remarkable athlete]`;
    } else if (v.jack_of_all_trades_toggle === '@{jack_of_all_trades}') {
      const jackOfAllTrades = getIntValue(v.jack_of_all_trades);
      abilityCheck += jackOfAllTrades;
      abilityCheckFormula += `${addArithmeticOperator(abilityCheckFormula, jackOfAllTrades)}[jack of all trades]`;
    }
    if (abilityCheckBonus) {
      abilityCheck += abilityCheckBonus;
      abilityCheckFormula += `${addArithmeticOperator(abilityCheckFormula, abilityCheckBonus)}[${ability} check bonus]`;
    }
    if (v.global_check_bonus) {
      if (!isNaN(v.global_check_bonus)) {
        abilityCheck += getIntValue(v.global_check_bonus);
      }
      abilityCheckFormula += ' + (@{global_check_bonus})[global check bonus]';
    }

    finalSetAttrs[`${ability}_calculated`] = abilityScoreCalc;
    finalSetAttrs[`${ability}_mod`] = abilityMod;
    finalSetAttrs[`${ability}_mod_with_sign`] = showSign(abilityMod);
    finalSetAttrs[`${ability}_check_mod`] = abilityCheck;
    finalSetAttrs[`${ability}_check_mod_with_sign`] = showSign(abilityCheck);
    finalSetAttrs[`${ability}_check_mod_formula`] = abilityCheckFormula;

    if (ability === 'strength') {
      finalSetAttrs.finesse_mod = Math.max(abilityMod, getIntValue(v.dexterity_mod));
      const weightMultiplier = getFloatValue(v.weight_multiplier, 1);
      finalSetAttrs.carrying_capacity = abilityScore * 15 * weightMultiplier;
      finalSetAttrs.max_push_drag_lift = abilityScore * 30 * weightMultiplier;
      finalSetAttrs.encumbered = abilityScore * 5 * weightMultiplier;
      finalSetAttrs.heavily_encumbered = abilityScore * 10 * weightMultiplier;
    } else if (ability === 'dexterity') {
      finalSetAttrs.finesse_mod = Math.max(abilityMod, getIntValue(v.strength_mod));
    }
    setFinalAttrs(v, finalSetAttrs);
  });
};
const updateAbilityModifiers = () => {
  updateAbilityModifier('strength');
  updateAbilityModifier('dexterity');
  updateAbilityModifier('constitution');
  updateAbilityModifier('intelligence');
  updateAbilityModifier('wisdom');
  updateAbilityModifier('charisma');
};

on('change:jack_of_all_trades_toggle change:jack_of_all_trades change:global_ability_bonus change:global_check_bonus', () => {
  updateAbilityModifiers();
});
on('change:strength change:strength_bonus change:strength_check_mod change:strength_check_bonus change:remarkable_athlete_toggle change:remarkable_athlete change:weight_multiplier', () => {
  updateAbilityModifier('strength');
});
on('change:dexterity change:dexterity_bonus change:dexterity_check_mod change:dexterity_check_bonus change:remarkable_athlete_toggle change:remarkable_athlete', () => {
  updateAbilityModifier('dexterity');
});
on('change:constitution change:constitution_bonus change:constitution_check_mod change:constitution_check_bonus change:remarkable_athlete_toggle change:remarkable_athlete', () => {
  updateAbilityModifier('constitution');
});
on('change:intelligence change:intelligence_bonus change:intelligence_check_mod change:intelligence_check_bonus', () => {
  updateAbilityModifier('intelligence');
});
on('change:wisdom change:wisdom_bonus change:wisdom_check_mod change:wisdom_check_bonus', () => {
  updateAbilityModifier('wisdom');
});
on('change:charisma change:charisma_bonus change:charisma_check_mod change:charisma_check_bonus', () => {
  updateAbilityModifier('charisma');
});

const setTrait = (obj) => {
  const repeatingItem = 'repeating_trait';
  const collectionArray = [];
  const finalSetAttrs = {};
  let itemId;

  if (!obj.name) {
    obj.name = obj.storageName;
  }

  getSectionIDs(repeatingItem, (ids) => {
    for (const id of ids) {
      const repeatingString = `${repeatingItem}_${id}_`;
      collectionArray.push(`${repeatingString}storage_name`);
      collectionArray.push(`${repeatingString}name`);
      collectionArray.push(`${repeatingString}uses`);
      collectionArray.push(`${repeatingString}freetext`);
      collectionArray.push(`${repeatingString}saving_throw_toggle`);
      collectionArray.push(`${repeatingString}damage_toggle`);
      collectionArray.push(`${repeatingString}heal_toggle`);
      collectionArray.push(`${repeatingString}extras_toggle`);
      if (repeatingItem === 'repeating_trait') {
        collectionArray.push(`${repeatingString}display_text`);
      }
      for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          collectionArray.push(`${repeatingString}${prop}`);
        }
      }
    }

    getAttrs(collectionArray, (v) => {
      let repeatingString;
      for (const id of ids) {
        repeatingString = `${repeatingItem}_${id}_`;

        if (v[`${repeatingString}storage_name`] === obj.storageName) {
          itemId = id;
        }
      }
      if (!itemId) {
        itemId = generateRowID();
      }

      repeatingString = `${repeatingItem}_${itemId}_`;
      if (!obj.clear && isUndefined(v[`${repeatingString}storage_name`])) {
        finalSetAttrs[`${repeatingString}storage_name`] = obj.storageName;
      }
      if (!obj.clear && v[`${repeatingString}name`] !== obj.name) {
        finalSetAttrs[`${repeatingString}name`] = obj.name;
      }
      delete obj.storageName;

      if (obj.clear) {
        delete obj.clear;
        for (const prop in obj) {
          if (obj.hasOwnProperty(prop) && !isUndefined(v[`${repeatingString}${prop}`])) {
            finalSetAttrs[`${repeatingString}${prop}`] = obj[prop];
          }
        }
      } else {
        for (const prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            if ((prop === 'name' || prop === 'freetext') && (isUndefined(v[`${repeatingString}${prop}`]) || calculatePercentDifference(v[`${repeatingString}${prop}`].length, obj[prop].length) < 10)) {
              finalSetAttrs[`${repeatingString}${prop}`] = obj[prop];
            } else if (v[`${repeatingString}${prop}`] !== obj[prop]) {
              finalSetAttrs[`${repeatingString}${prop}`] = obj[prop];
            }
          }
        }
        if (obj.saving_throw_ability || obj.saving_throw_bonus || obj.saving_throw_vs_ability) {
          finalSetAttrs[`${repeatingString}saving_throw_toggle`] = '@{saving_throw_toggle_var}';
        }
        if (obj.damage || obj.damage_ability || obj.damage_bonus) {
          finalSetAttrs[`${repeatingString}damage_toggle`] = '@{damage_toggle_var}';
        }
        if (obj.heal || obj.heal_ability || obj.heal_bonus || obj.heal_query_toggle) {
          finalSetAttrs[`${repeatingString}heal_toggle`] = '@{heal_toggle_var}';
        }
        if (obj.freetext && isUndefined(v[`${repeatingString}extras_toggle`])) {
          finalSetAttrs[`${repeatingString}extras_toggle`] = '@{extras_var}';
        }
        if (obj.uses_max && !obj.uses && isUndefined(v[`${repeatingString}uses`])) {
          finalSetAttrs[`${repeatingString}uses`] = obj.uses_max;
        }
        if (obj.freetext && repeatingItem === 'repeating_trait' && (isUndefined(v[`${repeatingString}display_text`]) ||
          calculatePercentDifference(v[`${repeatingString}display_text`].length, obj.freetext.length) < 10)) {
          finalSetAttrs[`${repeatingString}display_text`] = obj.freetext;
        }
      }

      setFinalAttrs(v, finalSetAttrs);
      return itemId;
    });
  });
};

const setClassFeatures = () => {
  const finalSetAttrs = {};
  const collectionArray = ['ac_unarmored_ability', 'lang', 'jack_of_all_trades_toggle', 'careful_spell_toggle', 'distant_spell_toggle', 'empowered_spell_toggle', 'extended_spell_toggle', 'heightened_spell_toggle', 'quickened_spell_toggle', 'subtle_spell_toggle', 'twinned_spell_toggle'];

  for (const ability of ABILITIES) {
    collectionArray.push(`${ability}_mod`);
  }
  for (const className of CLASSES) {
    collectionArray.push(`${className}_level`);
  }

  getAttrs(collectionArray, (v) => {
    const language = v.lang || 'en';

    if (v.fighter_level >= 5) {
      let extraAttackTimes;
      if (v.fighter_level >= 20) {
        extraAttackTimes = translate(language, 'CLASS_FEATURES.EXTRA_ATTACK_FOUR');
      } else if (v.fighter_level >= 11) {
        extraAttackTimes = translate(language, 'CLASS_FEATURES.EXTRA_ATTACK_THREE');
      } else {
        extraAttackTimes = translate(language, 'CLASS_FEATURES.EXTRA_ATTACK_TWICE');
      }
      setTrait({
        freetext: translate(language, 'CLASS_FEATURES.EXTRA_ATTACK_TEXT').replace('NUMBER_OF_TIMES', extraAttackTimes),
        name: translate(language, 'CLASS_FEATURES.EXTRA_ATTACK'),
        storageName: 'Extra Attack',
      });
    } else if (v.barbarian_level >= 5 || v.monk_level >= 5 || v.paladin_level >= 5 || v.ranger_level >= 5) {
      setTrait({
        freetext: translate(language, 'CLASS_FEATURES.EXTRA_ATTACK_TEXT').replace('NUMBER_OF_TIMES', translate(language, 'CLASS_FEATURES.EXTRA_ATTACK_TWICE')),
        name: translate(language, 'CLASS_FEATURES.EXTRA_ATTACK'),
        storageName: 'Extra Attack',
      });
    }

    if (v.barbarian_level) {
      let rageUses;
      if (v.barbarian_level >= 20) {
        rageUses = 999999;
      } else if (v.barbarian_level >= 17) {
        rageUses = 6;
      } else if (v.barbarian_level >= 12) {
        rageUses = 5;
      } else if (v.barbarian_level >= 6) {
        rageUses = 4;
      } else if (v.barbarian_level >= 3) {
        rageUses = 3;
      } else {
        rageUses = 2;
      }

      let rageDamage;
      if (v.barbarian_level >= 16) {
        rageDamage = 4;
      } else if (v.barbarian_level >= 9) {
        rageDamage = 3;
      } else {
        rageDamage = 2;
      }
      setTrait({
        freetext: translate(language, 'CLASS_FEATURES.RAGE_TEXT').replace('RAGE_DAMAGE', rageDamage),
        name: translate(language, 'CLASS_FEATURES.RAGE'),
        recharge: 'Long Rest',
        storageName: 'Rage',
        uses_max: rageUses,
      });

      if (isUndefined(v.ac_unarmored_ability)) {
        finalSetAttrs.ac_unarmored_ability = '@{constitution_mod}';
      }
      setTrait({
        freetext: translate(language, 'CLASS_FEATURES.UNARMORED_DEFENSE_BARBARIAN_TEXT'),
        name: translate(language, 'CLASS_FEATURES.UNARMORED_DEFENSE'),
        storageName: 'Unarmored Defense Barbarian',
      });

      if (v.barbarian_level >= 2) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.RECKLESS_ATTACK_TEXT'),
          name: translate(language, 'CLASS_FEATURES.RECKLESS_ATTACK'),
          storageName: 'Reckless Attack',
        });
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.DANGER_SENSE_TEXT'),
          name: translate(language, 'CLASS_FEATURES.DANGER_SENSE'),
          storageName: 'Danger Sense',
        });
      }
      if (v.barbarian_level >= 5) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.FAST_MOVEMENT_TEXT'),
          name: translate(language, 'CLASS_FEATURES.FAST_MOVEMENT'),
          storageName: 'Fast Movement',
        });
      }
      if (v.barbarian_level >= 7) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.FERAL_INSTINCT_TEXT'),
          name: translate(language, 'CLASS_FEATURES.FERAL_INSTINCT'),
          storageName: 'Feral Instinct',
        });
      }
      if (v.barbarian_level >= 9) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.BRUTAL_CRITICAL_TEXT'),
          name: translate(language, 'CLASS_FEATURES.BRUTAL_CRITICAL'),
          storageName: 'Brutal Critical',
        });
      }
      if (v.barbarian_level >= 11) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.RELENTLESS_RAGE_TEXT'),
          name: translate(language, 'CLASS_FEATURES.RELENTLESS_RAGE'),
          storageName: 'Relentless Rage',
        });
      }
      if (v.barbarian_level >= 15) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.PERSISTENT_RAGE_TEXT'),
          name: translate(language, 'CLASS_FEATURES.PERSISTENT_RAGE'),
          storageName: 'Persistent Rage',
        });
      }
      if (v.barbarian_level >= 18) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.INDOMITABLE_MIGHT_TEXT'),
          name: translate(language, 'CLASS_FEATURES.INDOMITABLE_MIGHT'),
          storageName: 'Indomitable Might',
        });
      }
      if (v.barbarian_level >= 20) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.PRIMAL_CHAMPION_TEXT'),
          name: translate(language, 'CLASS_FEATURES.PRIMAL_CHAMPION'),
          storageName: 'Primal Champion',
        });
      }
    }

    if (v.bard_level) {
      let die;
      if (v.bard_level >= 15) {
        die = 'd12';
      } else if (v.bard_level >= 10) {
        die = 'd10';
      } else if (v.bard_level >= 5) {
        die = 'd8';
      } else {
        die = 'd6';
      }
      let recharge = 'Long Rest';
      if (v.bard_level >= 5) {
        recharge = 'Short Rest';
      }
      setTrait({
        freetext: translate(language, 'CLASS_FEATURES.BARDIC_INSPIRATION_TEXT').replace('d6', die),
        name: translate(language, 'CLASS_FEATURES.BARDIC_INSPIRATION'),
        recharge,
        storageName: 'Bardic Inspiration',
        uses_max: Math.max(getIntValue(v.charisma_mod), 1),
      });

      if (v.bard_level >= 2) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.JACK_OF_ALL_TRADES_TEXT'),
          name: translate(language, 'CLASS_FEATURES.JACK_OF_ALL_TRADES'),
          storageName: 'Jack of All Trades',
        });
        finalSetAttrs.jack_of_all_trades_toggle = '@{jack_of_all_trades}';

        let heal;
        if (v.bard_level >= 17) {
          heal = 'd12';
        } else if (v.bard_level >= 13) {
          heal = 'd10';
        } else if (v.bard_level >= 9) {
          heal = 'd8';
        } else {
          heal = 'd6';
        }
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.SONG_OF_REST_TEXT'),
          heal,
          name: translate(language, 'CLASS_FEATURES.SONG_OF_REST'),
          storageName: 'Song of Rest',
        });
      }
      if (v.bard_level >= 3) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.EXPERTISE_BARD_TEXT'),
          name: translate(language, 'CLASS_FEATURES.EXPERTISE'),
          storageName: 'Expertise Bard',
        });
      }
      if (v.bard_level >= 6) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.COUNTERCHARM_TEXT'),
          name: translate(language, 'CLASS_FEATURES.COUNTERCHARM'),
          storageName: 'Countercharm',
        });
      }
      if (v.bard_level >= 10) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.MAGICAL_SECRETS_TEXT'),
          name: translate(language, 'CLASS_FEATURES.MAGICAL_SECRETS'),
          storageName: 'Magical Secrets',
        });
      }
      if (v.bard_level >= 20) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.SUPERIOR_INSPIRATION_TEXT'),
          name: translate(language, 'CLASS_FEATURES.SUPERIOR_INSPIRATION'),
          storageName: 'Superior Inspiration',
        });
      }
    }

    if (v.cleric_level) {
      if (v.cleric_level >= 2) {
        let channelDivinityUses;
        if (v.cleric_level >= 18) {
          channelDivinityUses = 3;
        } else if (v.cleric_level >= 6) {
          channelDivinityUses = 2;
        } else {
          channelDivinityUses = 1;
        }
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.CHANNEL_DIVINITY_CLERIC_TEXT'),
          name: translate(language, 'CLASS_FEATURES.CHANNEL_DIVINITY'),
          recharge: 'Short Rest',
          storageName: 'Channel Divinity Cleric',
          uses_max: channelDivinityUses,
        });

        let turnUndeadText = translate(language, 'CLASS_FEATURES.CHANNEL_DIVINITY_TURN_UNDEAD_TEXT');
        if (v.cleric_level >= 5) {
          let turnUndeadDestroyCR;
          if (v.cleric_level >= 17) {
            turnUndeadDestroyCR = '4';
          } else if (v.cleric_level >= 14) {
            turnUndeadDestroyCR = '3';
          } else if (v.cleric_level >= 11) {
            turnUndeadDestroyCR = '2';
          } else if (v.cleric_level >= 8) {
            turnUndeadDestroyCR = '1';
          } else {
            turnUndeadDestroyCR = '1/2';
          }
          turnUndeadText += `\n${translate(language, 'CLASS_FEATURES.CHANNEL_DIVINITY_TURN_UNDEAD_TEXT_PART_2').replace('CHALLENGE_RATING', turnUndeadDestroyCR)}`;
        }
        setTrait({
          freetext: turnUndeadText,
          name: translate(language, 'CLASS_FEATURES.CHANNEL_DIVINITY_TURN_UNDEAD'),
          saving_throw_ability: '@{wisdom_mod}',
          saving_throw_vs_ability: 'Wisdom',
          storageName: 'Turn Undead',
        });
        if (v.cleric_level >= 10) {
          setTrait({
            freeform: '{{text_top=[[d100]] > [[@{cleric_level}]]}}',
            freetext: translate(language, 'CLASS_FEATURES.DIVINE_INTERVENTION_TEXT'),
            name: translate(language, 'CLASS_FEATURES.DIVINE_INTERVENTION'),
            storageName: 'Divine Intervention',
            uses_max: 1,
          });
        }
      }
    }

    if (v.druid_level) {
      if (v.druid_level >= 2) {
        const wildShapeHours = Math.floor(v.druid_level / 2);
        let wildShapeUses;
        let wildShapeCR;
        let wildShapeLimitations;

        if (v.druid_level >= 4) {
          wildShapeCR = '1/2';
          wildShapeLimitations = translate(language, 'CLASS_FEATURES.WILD_SHAPE_NO_FLYING');
        } else if (v.druid_level >= 8) {
          wildShapeCR = 1;
          wildShapeLimitations = '';
        } else {
          wildShapeCR = '1/4';
          wildShapeLimitations = translate(language, 'CLASS_FEATURES.WILD_SHAPE_NO_FLYING_OR_SWIMMING');
        }
        if (v.druid_level >= 20) {
          wildShapeUses = 999999;
        } else {
          wildShapeUses = 2;
        }
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.WILD_SHAPE_TEXT').replace('WILD_SHAPE_HOURS', wildShapeHours).replace('CHALLENGE_RATING', wildShapeCR).replace('LIMITATIONS', ` ${wildShapeLimitations}`),
          name: translate(language, 'CLASS_FEATURES.WILD_SHAPE'),
          recharge: 'Short Rest',
          storageName: 'Wild Shape',
          uses_max: wildShapeUses,
        });
      }
      if (v.druid_level >= 18) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.TIMELESS_BODY_DRUID_TEXT'),
          name: translate(language, 'CLASS_FEATURES.TIMELESS_BODY'),
          storageName: 'Timeless Body',
        });
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.BEAST_SPELLS_TEXT'),
          name: translate(language, 'CLASS_FEATURES.BEAST_SPELLS'),
          storageName: 'Beast Spells',
        });
      }
      if (v.druid_level >= 20) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.ARCHDRUID_TEXT'),
          name: translate(language, 'CLASS_FEATURES.ARCHDRUID'),
          storageName: 'Archdruid',
        });
      }
    }

    if (v.fighter_level) {
      setTrait({
        freetext: `${translate(language, 'CLASS_FEATURES.FIGHTING_STYLE_TEXT')} ${translate(language, 'CLASS_FEATURES.FIGHTING_STYLE_FIGHTER_OPTIONS')}`,
        name: translate(language, 'CLASS_FEATURES.FIGHTING_STYLE'),
        storageName: 'Fighting Style',
      });
      setTrait({
        freetext: translate(language, 'CLASS_FEATURES.SECOND_WIND_TEXT'),
        name: translate(language, 'CLASS_FEATURES.SECOND_WIND'),
        heal: 'd10 + @{fighter_level}',
        recharge: 'Short Rest',
        storageName: 'Second Wind',
        uses_max: 1,
      });

      if (v.fighter_level >= 2) {
        let actionSurgeUses;
        if (v.fighter_level >= 17) {
          actionSurgeUses = 2;
        } else {
          actionSurgeUses = 1;
        }
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.ACTION_SURGE_TEXT'),
          name: translate(language, 'CLASS_FEATURES.ACTION_SURGE'),
          recharge: 'Short Rest',
          storageName: 'Action Surge',
          uses_max: actionSurgeUses,
        });
      }
      if (v.fighter_level >= 9) {
        let indomitableUses;
        if (v.fighter_level >= 17) {
          indomitableUses = 3;
        } else if (v.fighter_level >= 13) {
          indomitableUses = 2;
        } else {
          indomitableUses = 1;
        }
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.INDOMITABLE_TEXT'),
          name: translate(language, 'CLASS_FEATURES.INDOMITABLE'),
          recharge: 'Long Rest',
          storageName: 'Indomitable',
          uses_max: indomitableUses,
        });
      }
    }

    if (v.monk_level) {
      if (isUndefined(v.ac_unarmored_ability)) {
        finalSetAttrs.ac_unarmored_ability = '@{wisdom_mod}';
      }
      setTrait({
        freetext: translate(language, 'CLASS_FEATURES.UNARMORED_DEFENSE_MONK_TEXT'),
        name: translate(language, 'CLASS_FEATURES.UNARMORED_DEFENSE'),
        storageName: 'Unarmored Defense Monk',
      });
      setTrait({
        freetext: translate(language, 'CLASS_FEATURES.MARTIAL_ARTS_TEXT'),
        name: translate(language, 'CLASS_FEATURES.MARTIAL_ARTS'),
        storageName: 'Martial Arts',
      });
      if (v.monk_level >= 2) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.KI_TEXT'),
          name: translate(language, 'CLASS_FEATURES.KI'),
          recharge: 'Short Rest',
          storageName: 'Ki',
          uses_max: v.monk_level,
        });
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.FLURRY_OF_BLOWS_TEXT'),
          name: translate(language, 'CLASS_FEATURES.FLURRY_OF_BLOWS'),
          storageName: 'Flurry of Blows',
        });
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.PATIENT_DEFENSE_TEXT'),
          name: translate(language, 'CLASS_FEATURES.PATIENT_DEFENSE'),
          storageName: 'Patient Defense',
        });
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.STEP_OF_THE_WIND_TEXT'),
          name: translate(language, 'CLASS_FEATURES.STEP_OF_THE_WIND'),
          storageName: 'Step of the Wind',
        });

        let unarmoredMovementFeet;
        if (v.monk_level >= 18) {
          unarmoredMovementFeet = 30;
        } else if (v.monk_level >= 14) {
          unarmoredMovementFeet = 25;
        } else if (v.monk_level >= 10) {
          unarmoredMovementFeet = 20;
        } else if (v.monk_level >= 6) {
          unarmoredMovementFeet = 15;
        } else {
          unarmoredMovementFeet = 10;
        }
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.UNARMORED_MOVEMENT_TEXT').replace('UNARMORED_MOVEMENT_FEET', unarmoredMovementFeet),
          name: translate(language, 'CLASS_FEATURES.UNARMORED_MOVEMENT'),
          storageName: 'Unarmored Movement',
        });
      }
      if (v.monk_level >= 3) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.DEFLECT_MISSILES_TEXT'),
          name: translate(language, 'CLASS_FEATURES.DEFLECT_MISSILES'),
          storageName: 'Deflect Missiles',
        });
      }
      if (v.monk_level >= 4) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.SLOW_FALL_TEXT'),
          name: translate(language, 'CLASS_FEATURES.SLOW_FALL'),
          storageName: 'Slow Fall',
        });
      }
      if (v.monk_level >= 5) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.STUNNING_STRIKE_TEXT'),
          name: translate(language, 'CLASS_FEATURES.STUNNING_STRIKE'),
          saving_throw_ability: '@{wisdom_mod}',
          saving_throw_failure: translate(language, 'CLASS_FEATURES.STUNNING_STRIKE_SAVING_THROW_FAILURE'),
          saving_throw_vs_ability: 'Constitution',
          storageName: 'Stunning Strike',
        });
      }
      if (v.monk_level >= 6) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.KI_EMPOWERED_STRIKES_TEXT'),
          name: translate(language, 'CLASS_FEATURES.KI_EMPOWERED_STRIKES'),
          storageName: 'Ki-Empowered Strikes',
        });
      }
      if (v.monk_level >= 7) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.EVASION_TEXT'),
          name: translate(language, 'CLASS_FEATURES.EVASION'),
          storageName: 'Evasion',
        });
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.STILLNESS_OF_MIND_TEXT'),
          name: translate(language, 'CLASS_FEATURES.STILLNESS_OF_MIND'),
          storageName: 'Stillness of Mind',
        });
      }
      if (v.monk_level >= 10) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.PURITY_OF_BODY_TEXT'),
          name: translate(language, 'CLASS_FEATURES.PURITY_OF_BODY'),
          storageName: 'Purity of Body',
        });
      }
      if (v.monk_level >= 13) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.TONGUE_OF_THE_SUN_AND_MOON_TEXT'),
          name: translate(language, 'CLASS_FEATURES.TONGUE_OF_THE_SUN_AND_MOON'),
          storageName: 'Tongue of the Sun and Moon',
        });
      }
      if (v.monk_level >= 14) {
        finalSetAttrs.death_saving_throw_prof = '@{pb}';
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.DIAMOND_SOUL_TEXT'),
          name: translate(language, 'CLASS_FEATURES.DIAMOND_SOUL'),
          storageName: 'Diamond Soul',
        });
      }
      if (v.monk_level >= 15) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.TIMELESS_BODY_MONK_TEXT'),
          name: translate(language, 'CLASS_FEATURES.TIMELESS_BODY'),
          storageName: 'Timeless Body',
        });
      }
      if (v.monk_level >= 15) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.EMPTY_BODY_TEXT'),
          name: translate(language, 'CLASS_FEATURES.EMPTY_BODY'),
          storageName: 'Empty Body',
        });
      }
      if (v.monk_level >= 20) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.PERFECT_SELF_TEXT'),
          name: translate(language, 'CLASS_FEATURES.PERFECT_SELF'),
          storageName: 'Perfect Self',
        });
      }
    }

    if (v.paladin_level) {
      setTrait({
        freetext: translate(language, 'CLASS_FEATURES.DIVINE_SENSE_TEXT'),
        name: translate(language, 'CLASS_FEATURES.DIVINE_SENSE'),
        recharge: 'Long Rest',
        storageName: 'Divine Sense',
        uses_max: Math.max(1 + v.charisma_mod, 1),
      });
      setTrait({
        freetext: translate(language, 'CLASS_FEATURES.LAY_ON_HANDS_TEXT'),
        heal_query_toggle: '@{heal_query}',
        name: translate(language, 'CLASS_FEATURES.LAY_ON_HANDS'),
        recharge: 'Long Rest',
        storageName: 'Lay on Hands',
        uses_max: 5 * v.paladin_level,
      });

      if (v.paladin_level >= 2) {
        setTrait({
          freetext: `${translate(language, 'CLASS_FEATURES.FIGHTING_STYLE_TEXT')} ${translate(language, 'CLASS_FEATURES.FIGHTING_STYLE_PALADIN_OPTIONS')}`,
          name: translate(language, 'CLASS_FEATURES.FIGHTING_STYLE'),
          storageName: 'Fighting Style',
        });
        setTrait({
          damage: '(?{Spell Level|1|2|3|4+, 4} + 1)d8',
          damage_type: translate(language, 'DAMAGE_TYPES.RADIANT'),
          freeform: '{{subheader=(as ?{Spell Level|1|2|3|4+})}}',
          freetext: translate(language, 'CLASS_FEATURES.DIVINE_SMITE_TEXT'),
          name: translate(language, 'CLASS_FEATURES.DIVINE_SMITE'),
          second_damage: 'd8',
          second_damage_type: translate(language, 'VS_FIEND_OR_UNDEAD'),
          storageName: 'Divine Smite',
        });
      }
      if (v.paladin_level >= 3) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.DIVINE_HEALTH_TEXT'),
          name: translate(language, 'CLASS_FEATURES.DIVINE_HEALTH'),
          storageName: 'Divine Health',
        });
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.CHANNEL_DIVINITY_PALADIN_TEXT'),
          name: translate(language, 'CLASS_FEATURES.CHANNEL_DIVINITY'),
          recharge: 'Short Rest',
          storageName: 'Channel Divinity Paladin',
          uses_max: 1,
        });
      }
      if (v.paladin_level >= 6) {
        let auraRange;
        if (v.paladin_level >= 18) {
          auraRange = 30;
        } else {
          auraRange = 10;
        }
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.AURA_OF_PROTECTION_TEXT').replace('AURA_RANGE', auraRange),
          name: translate(language, 'CLASS_FEATURES.AURA_OF_PROTECTION'),
          storageName: 'Aura of Protection',
        });

        if (v.paladin_level >= 10) {
          setTrait({
            freetext: translate(language, 'CLASS_FEATURES.AURA_OF_COURAGE_TEXT').replace('AURA_RANGE', auraRange),
            name: translate(language, 'CLASS_FEATURES.AURA_OF_COURAGE'),
            storageName: 'Aura of Courage',
          });
        }
      }
      if (v.paladin_level >= 11) {
        setTrait({
          damage: 'd8',
          damage_type: 'radiant',
          freetext: translate(language, 'CLASS_FEATURES.IMPROVED_DIVINE_SMITE_TEXT'),
          name: translate(language, 'CLASS_FEATURES.IMPROVED_DIVINE_SMITE'),
          storageName: 'Improved Divine Smite',
        });
      }
      if (v.paladin_level >= 14) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.CLEANSING_TOUCH_TEXT'),
          name: translate(language, 'CLASS_FEATURES.CLEANSING_TOUCH'),
          recharge: 'Long Rest',
          storageName: 'Cleaning Touch',
          uses_max: Math.max(getIntValue(v.charisma_mod), 1),
        });
      }
    }

    if (v.ranger_level) {
      setTrait({
        freetext: translate(language, 'CLASS_FEATURES.FAVORED_ENEMY_TEXT'),
        name: translate(language, 'CLASS_FEATURES.FAVORED_ENEMY'),
        storageName: 'Favored Enemy',
      });
      setTrait({
        freetext: translate(language, 'CLASS_FEATURES.NATURAL_EXPLORER_TEXT'),
        name: translate(language, 'CLASS_FEATURES.NATURAL_EXPLORER'),
        storageName: 'Natural Explorer',
      });
      if (v.ranger_level >= 2) {
        setTrait({
          freetext: `${translate(language, 'CLASS_FEATURES.FIGHTING_STYLE_TEXT')} ${translate(language, 'CLASS_FEATURES.FIGHTING_STYLE_RANGER_OPTIONS')}`,
          name: translate(language, 'CLASS_FEATURES.FIGHTING_STYLE'),
          storageName: 'Fighting Style',
        });
      }
      if (v.ranger_level >= 3) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.PRIMEVAL_AWARENESS_TEXT'),
          name: translate(language, 'CLASS_FEATURES.PRIMEVAL_AWARENESS'),
          storageName: 'Primeval Awareness',
        });
      }
      if (v.ranger_level >= 8) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.LANDS_STRIDE_TEXT'),
          name: translate(language, 'CLASS_FEATURES.LANDS_STRIDE'),
          storageName: 'Land\'s Stride',
        });
      }
      if (v.ranger_level >= 10) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.HIDE_IN_PLAIN_SIGHT_TEXT'),
          name: translate(language, 'CLASS_FEATURES.HIDE_IN_PLAIN_SIGHT'),
          storageName: 'Hide in Plain Sight',
        });
      }
      if (v.ranger_level >= 14) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.VANISH_TEXT'),
          name: translate(language, 'CLASS_FEATURES.VANISH'),
          storageName: 'Vanish',
        });
      }
      if (v.ranger_level >= 18) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.FERAL_SENSES_TEXT'),
          name: translate(language, 'CLASS_FEATURES.FERAL_SENSES'),
          storageName: 'Feral Senses',
        });
      }
      if (v.ranger_level >= 20) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.FOE_SLAYER_TEXT'),
          name: translate(language, 'CLASS_FEATURES.FOE_SLAYER'),
          storageName: 'Foe Slayer',
        });
      }
    }

    if (v.rogue_level) {
      setTrait({
        freetext: translate(language, 'CLASS_FEATURES.EXPERTISE_ROGUE_TEXT'),
        name: translate(language, 'CLASS_FEATURES.EXPERTISE'),
        storageName: 'Expertise Rogue',
      });
      setTrait({
        damage: `${Math.ceil(getIntValue(v.rogue_level) / 2)}d6`,
        freetext: translate(language, 'CLASS_FEATURES.SNEAK_ATTACK_TEXT'),
        name: translate(language, 'CLASS_FEATURES.SNEAK_ATTACK'),
        storageName: 'Sneak Attack',
      });
      setTrait({
        freetext: translate(language, 'CLASS_FEATURES.THIEVES_CANT_TEXT'),
        name: translate(language, 'CLASS_FEATURES.THIEVES_CANT'),
        storageName: 'Thieves\' Cant',
      });
      if (v.rogue_level >= 2) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.CUNNING_ACTION_TEXT'),
          name: translate(language, 'CLASS_FEATURES.CUNNING_ACTION'),
          storageName: 'Cunning Action',
        });
      }
      if (v.rogue_level >= 5) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.UNCANNY_DODGE_TEXT'),
          name: translate(language, 'CLASS_FEATURES.UNCANNY_DODGE'),
          storageName: 'Uncanny Dodge',
        });
      }
      if (v.rogue_level >= 7) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.EVASION_TEXT'),
          name: translate(language, 'CLASS_FEATURES.EVASION'),
          storageName: 'Evasion',
        });
      }
      if (v.rogue_level >= 11) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.RELIABLE_TALENT_TEXT'),
          name: translate(language, 'CLASS_FEATURES.RELIABLE_TALENT'),
          storageName: 'Reliable Talent',
        });
      }
      if (v.rogue_level >= 14) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.BLINDSENSE_TEXT'),
          name: translate(language, 'CLASS_FEATURES.BLINDSENSE'),
          storageName: 'Blindsense',
        });
      }
      if (v.rogue_level >= 15) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.SLIPPERY_MIND_TEXT'),
          name: translate(language, 'CLASS_FEATURES.SLIPPERY_MIND'),
          storageName: 'Slippery Mind',
        });
      }
      if (v.rogue_level >= 18) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.ELUSIVE_TEXT'),
          name: translate(language, 'CLASS_FEATURES.ELUSIVE'),
          storageName: 'Elusive',
        });
      }
      if (v.rogue_level >= 20) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.STROKE_OF_LUCK_TEXT'),
          name: translate(language, 'CLASS_FEATURES.STROKE_OF_LUCK'),
          recharge: 'Short Rest',
          storageName: 'Stroke of Luck',
          uses_max: 1,
        });
      }
    }

    if (v.sorcerer_level) {
      if (v.sorcerer_level >= 2) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.SORCERY_POINTS_TEXT'),
          name: translate(language, 'CLASS_FEATURES.SORCERY_POINTS'),
          recharge: 'Long Rest',
          storageName: 'Sorcery Points',
          uses_max: v.sorcerer_level,
        });
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.FLEXIBLE_CASTING_TEXT'),
          name: translate(language, 'CLASS_FEATURES.FLEXIBLE_CASTING'),
          storageName: 'Flexible Casting',
        });
        if (v.sorcerer_level >= 3) {
          setTrait({
            freetext: translate(language, 'CLASS_FEATURES.METAMAGIC_TEXT'),
            name: translate(language, 'CLASS_FEATURES.METAMAGIC'),
            storageName: 'Metamagic',
          });
          if (v.careful_spell_toggle === '@{careful_spell_toggle_var}') {
            setTrait({
              freetext: translate(language, 'CLASS_FEATURES.METAMAGIC_CAREFUL_SPELL_TEXT'),
              name: translate(language, 'CLASS_FEATURES.METAMAGIC_CAREFUL_SPELL'),
              storageName: 'Careful Spell',
            });
          }
          if (v.distant_spell_toggle === '@{distant_spell_toggle_var}') {
            setTrait({
              freetext: translate(language, 'CLASS_FEATURES.METAMAGIC_DISTANT_SPELL_TEXT'),
              name: translate(language, 'CLASS_FEATURES.METAMAGIC_DISTANT_SPELL'),
              storageName: 'Distant Spell',
            });
          }
          if (v.empowered_spell_toggle === '@{empowered_spell_toggle_var}') {
            setTrait({
              freetext: translate(language, 'CLASS_FEATURES.METAMAGIC_EMPOWERED_SPELL_TEXT'),
              name: translate(language, 'CLASS_FEATURES.METAMAGIC_EMPOWERED_SPELL'),
              storageName: 'Empowered Spell',
            });
          }
          if (v.extended_spell_toggle === '@{extended_spell_toggle_var}') {
            setTrait({
              freetext: translate(language, 'CLASS_FEATURES.METAMAGIC_EXTENDED_SPELL_TEXT'),
              name: translate(language, 'CLASS_FEATURES.METAMAGIC_EXTENDED_SPELL'),
              storageName: 'Extended Spell',
            });
          }
          if (v.heightened_spell_toggle === '@{heightened_spell_toggle_var}') {
            setTrait({
              freetext: translate(language, 'CLASS_FEATURES.METAMAGIC_HEIGHTENED_SPELL_TEXT'),
              name: translate(language, 'CLASS_FEATURES.METAMAGIC_HEIGHTENED_SPELL'),
              storageName: 'Heightened Spell',
            });
          }
          if (v.quickened_spell_toggle === '@{quickened_spell_toggle_var}') {
            setTrait({
              freetext: translate(language, 'CLASS_FEATURES.METAMAGIC_QUICKENED_SPELL_TEXT'),
              name: translate(language, 'CLASS_FEATURES.METAMAGIC_QUICKENED_SPELL'),
              storageName: 'Quickened Spell',
            });
          }
          if (v.subtle_spell_toggle === '@{subtle_spell_toggle_var}') {
            setTrait({
              freetext: translate(language, 'CLASS_FEATURES.METAMAGIC_SUBTLE_SPELL_TEXT'),
              name: translate(language, 'CLASS_FEATURES.METAMAGIC_SUBTLE_SPELL'),
              storageName: 'Subtle Spell',
            });
          }
          if (v.twinned_spell_toggle === '@{twinned_spell_toggle_var}') {
            setTrait({
              freetext: translate(language, 'CLASS_FEATURES.METAMAGIC_TWINNED_SPELL_TEXT'),
              name: translate(language, 'CLASS_FEATURES.METAMAGIC_TWINNED_SPELL'),
              storageName: 'Twinned Spell',
            });
          }
        }
        if (v.sorcerer_level >= 20) {
          setTrait({
            freetext: translate(language, 'CLASS_FEATURES.SORCEROUS_RESTORATION_TEXT'),
            name: translate(language, 'CLASS_FEATURES.SORCEROUS_RESTORATION'),
            storageName: 'Sorcerous Restoration',
          });
        }
      }
    }

    if (v.warlock_level) {
      let warlockSpellSlots;
      if (v.warlock_level >= 17) {
        warlockSpellSlots = 4;
      } else if (v.warlock_level >= 11) {
        warlockSpellSlots = 3;
      } else if (v.warlock_level >= 2) {
        warlockSpellSlots = 2;
      } else {
        warlockSpellSlots = 1;
      }
      setTrait({
        freetext: translate(language, 'CLASS_FEATURES.WARLOCK_SPELL_SLOTS_TEXT'),
        name: translate(language, 'CLASS_FEATURES.WARLOCK_SPELL_SLOTS'),
        recharge: 'Short Rest',
        storageName: 'Warlock Spell Slots',
        uses_max: warlockSpellSlots,
      });

      if (v.warlock_level >= 2) {
        let eldritchInvocations;
        if (v.warlock_level >= 17) {
          eldritchInvocations = 8;
        } else if (v.warlock_level >= 15) {
          eldritchInvocations = 7;
        } else if (v.warlock_level >= 12) {
          eldritchInvocations = 6;
        } else if (v.warlock_level >= 9) {
          eldritchInvocations = 5;
        } else if (v.warlock_level >= 7) {
          eldritchInvocations = 4;
        } else if (v.warlock_level >= 5) {
          eldritchInvocations = 3;
        } else {
          eldritchInvocations = 2;
        }
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.ELDRITCH_INVOCATIONS_TEXT').replace('NUMBER_OF_INVOCATIONS_KNOWN', eldritchInvocations),
          name: translate(language, 'CLASS_FEATURES.ELDRITCH_INVOCATIONS'),
          storageName: 'Eldritch Invocations',
        });
      }
      if (v.warlock_level >= 3) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.PACT_BOON_TEXT'),
          name: translate(language, 'CLASS_FEATURES.PACT_BOON'),
          storageName: 'Pact Boon',
        });
      }
      if (v.warlock_level >= 11) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.MYSTIC_ARCANUM_TEXT'),
          name: translate(language, 'CLASS_FEATURES.MYSTIC_ARCANUM'),
          storageName: 'Mystic Arcanum',
        });
      }
      if (v.warlock_level >= 20) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.ELDRITCH_MASTER_TEXT'),
          name: translate(language, 'CLASS_FEATURES.ELDRITCH_MASTER'),
          recharge: 'Long Rest',
          storageName: 'Eldritch Master',
        });
      }
    }

    if (v.wizard_level) {
      setTrait({
        freetext: translate(language, 'CLASS_FEATURES.ARCANE_RECOVERY_TEXT'),
        name: translate(language, 'CLASS_FEATURES.ARCANE_RECOVERY'),
        recharge: 'Long Rest',
        storageName: 'Arcane Recovery',
        uses_max: 1,
      });
      if (v.wizard_level >= 18) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.SPELL_MASTERY_TEXT'),
          name: translate(language, 'CLASS_FEATURES.SPELL_MASTERY'),
          storageName: 'Spell Mastery',
        });
      }
      if (v.wizard_level >= 20) {
        setTrait({
          freetext: translate(language, 'CLASS_FEATURES.SIGNATURE_SPELLS_TEXT'),
          name: translate(language, 'CLASS_FEATURES.SIGNATURE_SPELLS'),
          storageName: 'Signature Spells',
        });
      }
    }

    setFinalAttrs(v, finalSetAttrs);
  });
};

const updateSpellSlots = () => {
  const collectionArray = ['caster_level', 'caster_type'];
  const finalSetAttrs = {};

  const spellSlots = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
  };

  for (const level in spellSlots) {
    if (spellSlots.hasOwnProperty(level)) {
      const repeatingString = `spell_slots_l${level}_`;
      collectionArray.push(`${repeatingString}calc`);
      collectionArray.push(`${repeatingString}bonus`);
      collectionArray.push(`${repeatingString}max`);
      collectionArray.push(`${repeatingString}toggle`);
    }
  }
  getAttrs(collectionArray, (v) => {
    let casterLevel = getIntValue(v.caster_level);
    let casterType = v.caster_type;
    if (isUndefined(casterType)) {
      casterType = 'full';
    }

    if (casterType === 'full') {
      casterLevel = getIntValue(v.caster_level);

      if (casterLevel >= 3) {
        spellSlots[1] = 4;
      } else if (casterLevel === 2) {
        spellSlots[1] = 3;
      } else if (casterLevel === 1) {
        spellSlots[1] = 2;
      }
      if (casterLevel >= 4) {
        spellSlots[2] = 3;
      } else if (casterLevel === 3) {
        spellSlots[2] = 2;
      }
      if (casterLevel >= 6) {
        spellSlots[3] = 3;
      } else if (casterLevel === 5) {
        spellSlots[3] = 2;
      }
      if (casterLevel >= 9) {
        spellSlots[4] = 3;
      } else if (casterLevel === 8) {
        spellSlots[4] = 2;
      } else if (casterLevel === 7) {
        spellSlots[4] = 1;
      }
      if (casterLevel >= 18) {
        spellSlots[5] = 3;
      } else if (casterLevel >= 10) {
        spellSlots[5] = 2;
      } else if (casterLevel === 9) {
        spellSlots[5] = 1;
      }
      if (casterLevel >= 19) {
        spellSlots[6] = 2;
      } else if (casterLevel >= 11) {
        spellSlots[6] = 1;
      }
      if (casterLevel >= 20) {
        spellSlots[7] = 2;
      } else if (casterLevel >= 13) {
        spellSlots[7] = 1;
      }
      if (casterLevel >= 15) {
        spellSlots[8] = 1;
      }
      if (casterLevel >= 17) {
        spellSlots[9] = 1;
      }
    }

    if (casterType === 'half') {
      if (casterLevel >= 5) {
        spellSlots[1] = 4;
      } else if (casterLevel >= 3) {
        spellSlots[1] = 3;
      } else if (casterLevel === 2) {
        spellSlots[1] = 2;
      }
      if (casterLevel >= 7) {
        spellSlots[2] = 3;
      } else if (casterLevel >= 5) {
        spellSlots[2] = 2;
      }
      if (casterLevel >= 11) {
        spellSlots[3] = 3;
      } else if (casterLevel >= 9) {
        spellSlots[3] = 2;
      }
      if (casterLevel >= 17) {
        spellSlots[4] = 3;
      } else if (casterLevel >= 15) {
        spellSlots[4] = 2;
      } else if (casterLevel >= 13) {
        spellSlots[4] = 1;
      }
      if (casterLevel >= 19) {
        spellSlots[5] = 2;
      } else if (casterLevel >= 17) {
        spellSlots[5] = 1;
      }
    }

    if (casterType === 'third') {
      if (casterLevel >= 7) {
        spellSlots[1] = 4;
      } else if (casterLevel >= 4) {
        spellSlots[1] = 3;
      } else if (casterLevel === 3) {
        spellSlots[1] = 2;
      }
      if (casterLevel >= 10) {
        spellSlots[2] = 3;
      } else if (casterLevel >= 7) {
        spellSlots[2] = 2;
      }
      if (casterLevel >= 16) {
        spellSlots[3] = 3;
      } else if (casterLevel >= 13) {
        spellSlots[3] = 2;
      }
      if (casterLevel >= 19) {
        spellSlots[4] = 1;
      }
    }

    for (const level in spellSlots) {
      if (spellSlots.hasOwnProperty(level)) {
        if (spellSlots[level] !== 0 || exists(v[`spell_slots_l${level}_calc`])) {
          finalSetAttrs[`spell_slots_l${level}_calc`] = spellSlots[level];
        }

        const slotBonus = getIntValue(v[`spell_slots_l${level}_bonus`]);
        const spellSlotMax = spellSlots[level] + slotBonus;

        if (spellSlotMax > 0) {
          finalSetAttrs[`spell_slots_l${level}_max`] = spellSlotMax;
          finalSetAttrs[`spell_slots_l${level}_toggle`] = 'on';
        } else {
          if (exists(v[`spell_slots_l${level}_max`])) {
            finalSetAttrs[`spell_slots_l${level}_max`] = 0;
          }
          if (exists(v[`spell_slots_l${level}_toggle`])) {
            finalSetAttrs[`spell_slots_l${level}_toggle`] = 0;
          }
        }
      }
    }
    setFinalAttrs(v, finalSetAttrs);
  });
};

const updateLevels = (changedField) => {
  const repeatingItem = 'repeating_class';
  const collectionArray = ['is_npc', 'lang', 'caster_level', 'caster_type', 'class_and_level', 'level', 'xp_next_level'];
  const finalSetAttrs = {};

  for (const className of CLASSES) {
    collectionArray.push(`${className}_level`);
    collectionArray.push(`has_${className}_levels`);
  }

  const defaultClassDetails = {
    barbarian: {
      hd: 'd12',
    },
    bard: {
      hd: 'd8',
      spellcasting: 'full',
    },
    cleric: {
      hd: 'd8',
      spellcasting: 'full',
    },
    druid: {
      hd: 'd8',
      spellcasting: 'full',
    },
    fighter: {
      hd: 'd10',
    },
    monk: {
      hd: 'd8',
    },
    paladin: {
      hd: 'd10',
      spellcasting: 'half',
    },
    ranger: {
      hd: 'd10',
      spellcasting: 'half',
    },
    rogue: {
      hd: 'd8',
    },
    sorcerer: {
      hd: 'd6',
      spellcasting: 'full',
    },
    warlock: {
      hd: 'd8',
      spellcasting: 'warlock',
    },
    wizard: {
      hd: 'd6',
      spellcasting: 'full',
    },
  };
  const hd = {
    d20: 0,
    d12: 0,
    d10: 0,
    d8: 0,
    d6: 0,
    d4: 0,
    d2: 0,
    d0: 0,
  };
  const spellcasting = {
    full: 0,
    half: 0,
    third: 0,
    warlock: 0,
  };
  let totalLevel = 0;
  const classLevels = {};
  let classesWithSpellcasting = 0;
  const xpTable = [0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000, 385000, 405000, 435000, 465000, 495000, 525000, 555000, 585000, 605000, 635000, 665000];

  for (const key in hd) {
    if (hd.hasOwnProperty(key)) {
      collectionArray.push(`hd_${key}_max`);
      collectionArray.push(`hd_${key}_query`);
      collectionArray.push(`hd_${key}_toggle`);
    }
  }

  getSectionIDs(repeatingItem, (ids) => {
    for (const id of ids) {
      const repeatingString = `${repeatingItem}_${id}_`;
      collectionArray.push(`${repeatingString}level`);
      collectionArray.push(`${repeatingString}name`);
      collectionArray.push(`${repeatingString}custom_name`);
      collectionArray.push(`${repeatingString}hd`);
      collectionArray.push(`${repeatingString}spellcasting`);
      collectionArray.push(`${repeatingString}custom_class_toggle`);
    }

    getAttrs(collectionArray, (v) => {
      for (const className of CLASSES) {
        finalSetAttrs[`${className}_level`] = 0;
      }

      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;

        let className = v[`${repeatingString}name`];
        let classLevel = v[`${repeatingString}level`];

        if (isUndefined(className) && isUndefined(classLevel)) {
          continue;
        }

        if (isUndefined(className)) {
          className = 'barbarian';
        }
        if (className === 'custom') {
          finalSetAttrs[`${repeatingString}custom_class_toggle`] = 'on';
          const customName = v[`${repeatingString}custom_name`];
          if (exists(customName)) {
            className = customName;
          } else {
            className = 'custom';
          }
        } else if (v[`${repeatingString}custom_class_toggle`]) {
          finalSetAttrs[`${repeatingString}custom_class_toggle`] = 0;
        }

        if (isUndefined(classLevel)) {
          classLevel = 1;
          finalSetAttrs[`${repeatingString}level`] = classLevel;
          finalSetAttrs[`${className}_level`] = classLevel;
        } else {
          classLevel = getIntValue(classLevel);
          totalLevel += classLevel;
          if (classLevels[className]) {
            classLevels[className] += classLevel;
          } else {
            classLevels[className] = classLevel;
          }
        }

        let classHd = v[`${repeatingString}hd`];
        if (isUndefined(classHd) || changedField === 'name') {
          if (defaultClassDetails.hasOwnProperty(className)) {
            classHd = defaultClassDetails[className].hd;
          } else {
            classHd = 'd12';
          }
          finalSetAttrs[`${repeatingString}hd`] = classHd;
        }
        if (classHd && classLevel) {
          hd[classHd] += classLevel;
        }

        let classSpellcasting = v[`${repeatingString}spellcasting`];
        if (isUndefined(classSpellcasting) || changedField === 'name') {
          if (defaultClassDetails.hasOwnProperty(className)) {
            classSpellcasting = defaultClassDetails[className].spellcasting;
            finalSetAttrs[`${repeatingString}spellcasting`] = classSpellcasting;
          } else {
            finalSetAttrs[`${repeatingString}spellcasting`] = 'none';
          }
        } else if (classSpellcasting === 'warlock') {
          spellcasting[classSpellcasting] += classLevel;
        } else {
          classesWithSpellcasting += 1;
          spellcasting[classSpellcasting] += classLevel;
        }
      }

      finalSetAttrs.class_and_level = '';
      for (const prop in classLevels) {
        if (classLevels.hasOwnProperty(prop)) {
          finalSetAttrs[`${prop}_level`] = classLevels[prop];
          if (finalSetAttrs.class_and_level !== '') {
            finalSetAttrs.class_and_level += ', ';
          }
          finalSetAttrs.class_and_level += `${capitalize(prop)} ${classLevels[prop]}`;
        }
      }

      finalSetAttrs.level = totalLevel;

      let xpForNextLevel = 0;
      if (!totalLevel) {
        totalLevel = 0;
      }
      if (totalLevel > 30) {
        xpForNextLevel = xpTable[30];
      } else {
        xpForNextLevel = xpTable[totalLevel];
      }
      finalSetAttrs.xp_next_level = xpForNextLevel;

      for (const className of CLASSES) {
        if (finalSetAttrs[`${className}_level`] > 0) {
          finalSetAttrs[`has_${className}_levels`] = 1;
        } else if (!isUndefined(v[`has_${className}_levels`])) {
          finalSetAttrs[`has_${className}_levels`] = 0;
        }
      }

      for (const key in hd) {
        if (hd.hasOwnProperty(key)) {
          if (hd[key] && hd[key] !== 0) {
            finalSetAttrs[`hd_${key}_max`] = hd[key];
            finalSetAttrs[`hd_${key}_query`] = '?{HD';
            for (let x = 1; x <= hd[key]; x++) {
              finalSetAttrs[`hd_${key}_query`] += `|${x}`;
            }
            finalSetAttrs[`hd_${key}_query`] += '}';
            finalSetAttrs[`hd_${key}_toggle`] = 1;
          } else {
            if (!isUndefined(v[`hd_${key}_max`])) {
              finalSetAttrs[`hd_${key}_max`] = 0;
            }
            if (!isUndefined(v[`hd_${key}_query`])) {
              finalSetAttrs[`hd_${key}_query`] = '';
            }
            if (exists(v[`hd_${key}_toggle`])) {
              finalSetAttrs[`hd_${key}_toggle`] = 0;
            }
          }
        }
      }

      let casterLevel = 0;
      if (!v.is_npc || v.is_npc === '0' || v.is_npc === 0) {
        if (classesWithSpellcasting > 1) {
          casterLevel += spellcasting.full;
          casterLevel += Math.floor(spellcasting.half / 2);
          casterLevel += Math.floor(spellcasting.third / 3);
        } else {
          casterLevel = spellcasting.full + spellcasting.half + spellcasting.third;
        }
        finalSetAttrs.caster_level = casterLevel;
      }

      if (classesWithSpellcasting > 1 || spellcasting.full) {
        finalSetAttrs.caster_type = 'full';
      } else if (spellcasting.half) {
        finalSetAttrs.caster_type = 'half';
      } else if (spellcasting.third) {
        finalSetAttrs.caster_type = 'third';
      } else {
        finalSetAttrs.caster_type = 'full';
      }

      setFinalAttrs(v, finalSetAttrs, () => {
        setClassFeatures();
        updateSpellSlots();
      });
    });
  });
};

on('change:repeating_class', (eventInfo) => {
  const repeatingInfo = getRepeatingInfo('repeating_class', eventInfo);
  if (repeatingInfo) {
    updateLevels(repeatingInfo.field);
  }
});
on('remove:repeating_class', () => {
  updateLevels();
});

const watchForClassLevelChanges = () => {
  const classFeatureWatch = [];
  for (const ability of ABILITIES) {
    classFeatureWatch.push(`change:${ability}_mod`);
  }
  classFeatureWatch.push('change:careful_spell_toggle');
  classFeatureWatch.push('change:distant_spell_toggle');
  classFeatureWatch.push('change:empowered_spell_toggle');
  classFeatureWatch.push('change:extended_spell_toggle');
  classFeatureWatch.push('change:heightened_spell_toggle');
  classFeatureWatch.push('change:quickened_spell_toggle');
  classFeatureWatch.push('change:subtle_spell_toggle');
  classFeatureWatch.push('change:twinned_spell_toggle');

  on(classFeatureWatch.join(' '), () => {
    setClassFeatures();
  });
};
watchForClassLevelChanges();
on('change:spell_slots_l1_bonus change:spell_slots_l2_bonus change:spell_slots_l3_bonus change:spell_slots_l4_bonus change:spell_slots_l5_bonus change:spell_slots_l6_bonus change:spell_slots_l7_bonus change:spell_slots_l8_bonus change:spell_slots_l9_bonus', () => {
  updateSpellSlots();
});

const getPB = (level, challenge) => {
  let pb = 2;

  level = getIntValue(level);
  if (challenge === '1/8' || challenge === '1/4' || challenge === '1/2') {
    challenge = 1;
  } else {
    getIntValue(challenge);
  }
  const levelOrChallenge = Math.max(level, challenge);

  if (exists(levelOrChallenge)) {
    pb += Math.floor(Math.abs((levelOrChallenge - 1) / 4));
  }
  return pb;
};
const updatePb = () => {
  const collectionArray = ['level', 'challenge', 'pb', 'exp', 'h_PB'];
  const finalSetAttrs = {};

  getAttrs(collectionArray, (v) => {
    const pb = getPB(v.level, v.challenge);

    finalSetAttrs.pb = pb;
    finalSetAttrs.exp = pb * 2;
    finalSetAttrs.h_PB = pb / 2;
    setFinalAttrs(v, finalSetAttrs);
  });
};

on('change:level', () => {
  updatePb();
});

const sumRepeating = (options, sumItems) => {
  const repeatingItem = `repeating_${options.collection}`;
  let collectionArray = [];
  const finalSetAttrs = {};

  getSectionIDs(repeatingItem, (ids) => {
    for (const id of ids) {
      const repeatingString = `${repeatingItem}_${id}_`;
      collectionArray.push(repeatingString + options.toggle);
      if (options.qty) {
        collectionArray.push(repeatingString + options.qty);
      }

      for (const sumItem of sumItems) {
        finalSetAttrs[sumItem.totalField] = 0;
        if (sumItem.totalFieldSecondary) {
          finalSetAttrs[sumItem.totalFieldSecondary] = 0;
        }
        collectionArray.push(repeatingString + sumItem.fieldToAdd);
        if (sumItem.bonus) {
          collectionArray.push(repeatingString + sumItem.bonus);
        }
        if (sumItem.armorType) {
          collectionArray.push(repeatingString + sumItem.armorType);
        }
        if (sumItem.addOnAfterQty) {
          collectionArray.push(repeatingString + sumItem.addOnAfterQty);
        }
      }
    }
    if (options.getExtraFields) {
      collectionArray = collectionArray.concat(options.getExtraFields);
    }

    getAttrs(collectionArray, (v) => {
      let dexMod = 0;
      if (options.collection === 'armor') {
        dexMod = getIntValue(v.dexterity_mod);
      }

      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;
        const qty = getIntValue(v[repeatingString + options.qty], 1);

        for (const sumItem of sumItems) {
          let fieldToAdd = getFloatValue(v[repeatingString + sumItem.fieldToAdd]);
          if (sumItem.bonus) {
            fieldToAdd += getFloatValue(v[repeatingString + sumItem.bonus]);
          }
          if (sumItem.armorType) {
            if (!v[repeatingString + sumItem.armorType] || v[repeatingString + sumItem.armorType] === 'Light Armor') {
              fieldToAdd += dexMod;
            } else if (v[repeatingString + sumItem.armorType] === 'Medium Armor') {
              const mediumArmorDexMod = getIntValue(v.medium_armor_max_dex, 2);
              fieldToAdd += Math.min(mediumArmorDexMod, dexMod);
            }
          }

          let itemTotal = round((qty * fieldToAdd), 2);

          if (sumItem.addOnAfterQty) {
            itemTotal += getFloatValue(v[repeatingString + sumItem.addOnAfterQty]);
          }

          itemTotal = round(itemTotal, 2);

          if (sumItem.itemTotal) {
            finalSetAttrs[repeatingString + sumItem.itemTotal] = itemTotal;
          }

          const toggle = v[repeatingString + options.toggle];
          if (toggle !== 0 && toggle !== '0') {
            let addToPrimary = true;
            let addToSecondary = false;

            if (sumItem.armorType) {
              if (v[repeatingString + sumItem.armorType] === 'Shield' || v[repeatingString + sumItem.armorType] === 'AC') {
                addToSecondary = true;
              } else if (v[repeatingString + sumItem.armorType] === 'Unarmored') {
                addToPrimary = false;
                addToSecondary = true;
              }
            }

            if (addToPrimary) {
              finalSetAttrs[sumItem.totalField] += itemTotal;
            }
            if (addToSecondary) {
              finalSetAttrs[sumItem.totalFieldSecondary] += itemTotal;
            }
          }
        }
      }
      for (const sumItem of sumItems) {
        if (sumItem.totalField && !exists(finalSetAttrs[sumItem.totalField])) {
          finalSetAttrs[sumItem.totalField] = 0;
        }
        if (sumItem.totalFieldSecondary && !exists(finalSetAttrs[sumItem.totalFieldSecondary])) {
          finalSetAttrs[sumItem.totalFieldSecondary] = 0;
        }
      }

      if (options.collection === 'armor' && !getIntValue(v.is_npc)) {
        finalSetAttrs.ac_unarmored_calc += 10 + dexMod + getAbilityValue(v, v.ac_unarmored_ability);

        finalSetAttrs.AC = Math.max(finalSetAttrs.ac_armored_calc, finalSetAttrs.ac_unarmored_calc);
      }
      setFinalAttrs(v, finalSetAttrs);
    });
  });
};

const updateArmor = (rowId) => {
  const repeatingItem = 'repeating_armor';
  const collectionArray = [];
  const finalSetAttrs = {};

  getSectionIDs(repeatingItem, (ids) => {
    if (rowId) {
      ids = [];
      ids.push(rowId);
    }
    for (const id of ids) {
      const repeatingString = `${repeatingItem}_${id}_`;
      collectionArray.push(`${repeatingString}parsed`);
      collectionArray.push(`${repeatingString}modifiers`);
    }

    getAttrs(collectionArray, (v) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;

        if (isUndefined(v[`${repeatingString}parsed`]) || v[`${repeatingString}parsed`].indexOf('acBonus') === -1) {
          const armorModifiers = v[`${repeatingString}modifiers`];
          if (exists(armorModifiers)) {
            finalSetAttrs[`${repeatingString}ac_bonus`] = armorModifiers.replace(/^\D+/g, '');
          }
          if (isUndefined(finalSetAttrs[`${repeatingString}parsed`])) {
            finalSetAttrs[`${repeatingString}parsed`] = '';
          }
          finalSetAttrs[`${repeatingString}parsed`] += ' acBonus';
        }
      }
      setFinalAttrs(v, finalSetAttrs);
    });
  });

  const options = {
    collection: 'armor',
    getExtraFields: ['medium_armor_max_dex', 'dexterity_mod', 'ac_unarmored_ability', 'is_npc'],
    toggle: 'worn',
  };
  for (const ability of ABILITIES) {
    options.getExtraFields.push(`${ability}_mod`);
  }
  const sumItems = [
    {
      fieldToAdd: 'weight',
      totalField: 'weight_armor',
    },
    {
      fieldToAdd: 'ac_base',
      bonus: 'ac_bonus',
      armorType: 'type',
      itemTotal: 'ac_total',
      totalField: 'ac_armored_calc',
      totalFieldSecondary: 'ac_unarmored_calc',
    },
  ];
  sumRepeating(options, sumItems);
};
on('change:repeating_armor', (eventInfo) => {
  const repeatingInfo = getRepeatingInfo('repeating_armor', eventInfo);
  if (repeatingInfo && repeatingInfo.field !== 'ac_total') {
    updateArmor(repeatingInfo.rowId);
  }
});
on('change:dexterity_mod change:medium_armor_max_dex change:ac_unarmored_ability remove:repeating_armor', () => {
  updateArmor();
});

const updateEquipment = (rowId) => {
  const repeatingItem = 'repeating_equipment';
  const collectionArray = [];
  const finalSetAttrs = {};

  getSectionIDs(repeatingItem, (ids) => {
    if (rowId) {
      ids = [];
      ids.push(rowId);
    }
    for (const id of ids) {
      const repeatingString = `${repeatingItem}_${id}_`;
      collectionArray.push(`${repeatingString}content`);
    }

    getAttrs(collectionArray, (v) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;

        if (isUndefined(v[`${repeatingString}parsed`]) || v[`${repeatingString}parsed`].indexOf('content') === -1) {
          let content = v[`${repeatingString}content`];
          if (exists(content)) {
            content = content.replace(/\s(\d+d\d+\s(?:\+|\-)\s\d+)\s/g, ' [[$1]] ')
              .replace(/\s(\d+d\d+)\s/g, ' [[$1]] ')
              .replace(/\s(\d+)\s/g, ' [[$1]] ');

            finalSetAttrs[`${repeatingString}content`] = content;

            if (isUndefined(finalSetAttrs[`${repeatingString}parsed`])) {
              finalSetAttrs[`${repeatingString}parsed`] = '';
            }
            finalSetAttrs[`${repeatingString}parsed`] += ' content';
          }
        }
      }
      setFinalAttrs(v, finalSetAttrs);
    });
  });
};

on('change:repeating_equipment', (eventInfo) => {
  const repeatingInfo = getRepeatingInfo('repeating_equipment', eventInfo);
  updateEquipment(repeatingInfo.rowId);
});
const weighEquipment = () => {
  const options = {
    collection: 'equipment',
    toggle: 'carried',
    qty: 'qty',
  };
  const sumItems = [
    {
      fieldToAdd: 'weight',
      itemTotal: 'weight_total',
      totalField: 'weight_equipment',
    },
  ];
  sumRepeating(options, sumItems);
};
on('change:repeating_equipment:carried change:repeating_equipment:qty change:repeating_equipment:weight remove:repeating_equipment', () => {
  weighEquipment();
});

const weighAmmo = () => {
  const options = {
    collection: 'ammo',
    qty: 'qty',
  };
  const sumItems = [
    {
      fieldToAdd: 'weight',
      totalField: 'weight_ammo',
    },
  ];
  sumRepeating(options, sumItems);
};
on('change:repeating_ammo:weight change:repeating_ammo:qty', () => {
  weighAmmo();
});

const updateJackOfAllTrades = () => {
  const collectionArray = ['pb', 'jack_of_all_trades'];
  const finalSetAttrs = {};

  getAttrs(collectionArray, (v) => {
    finalSetAttrs.jack_of_all_trades = Math.floor(getIntValue(v.pb) / 2);
    setFinalAttrs(v, finalSetAttrs);
  });
};
on('change:jack_of_all_trades_toggle', () => {
  updateJackOfAllTrades();
});

const updateRemarkableAthlete = () => {
  const collectionArray = ['pb', 'remarkable_athlete'];
  const finalSetAttrs = {};

  getAttrs(collectionArray, (v) => {
    finalSetAttrs.remarkable_athlete = Math.ceil(getIntValue(v.pb) / 2);
    setFinalAttrs(v, finalSetAttrs);
  });
};
on('change:remarkable_athlete_toggle', () => {
  updateRemarkableAthlete();
});

const updateInitiative = () => {
  const collectionArray = ['initiative', 'initiative_formula', 'dexterity_mod', 'dexterity_check_bonus', 'initiative_bonus', 'jack_of_all_trades_toggle', 'jack_of_all_trades', 'remarkable_athlete_toggle', 'remarkable_athlete', 'global_check_bonus'];
  const finalSetAttrs = {};

  finalSetAttrs.initiative = 0;
  getAttrs(collectionArray, (v) => {
    const dexMod = getIntValue(v.dexterity_mod);
    if (exists(dexMod)) {
      finalSetAttrs.initiative += dexMod;
    }
    finalSetAttrs.initiative_formula = `${dexMod}[dex]`;

    const dexCheckBonus = getIntValue(v.dexterity_check_bonus);
    if (exists(dexCheckBonus)) {
      finalSetAttrs.initiative += dexCheckBonus;
      finalSetAttrs.initiative_formula += `${addArithmeticOperator(finalSetAttrs.initiative_formula, dexCheckBonus)}[dex check bonus]`;
    }

    const initiativeBonus = v.initiative_bonus;
    if (exists(initiativeBonus)) {
      if (!isNaN(initiativeBonus)) {
        finalSetAttrs.initiative += getIntValue(initiativeBonus);
      }
      finalSetAttrs.initiative_formula += `${addArithmeticOperator(finalSetAttrs.initiative_formula, initiativeBonus)}[initiative bonus]`;
    }

    if (v.remarkable_athlete_toggle === '@{remarkable_athlete}') {
      const remarkableAthlete = getIntValue(v.remarkable_athlete);
      if (exists(remarkableAthlete)) {
        finalSetAttrs.initiative += remarkableAthlete;
        finalSetAttrs.initiative_formula += `${addArithmeticOperator(finalSetAttrs.initiative_formula, remarkableAthlete)}[remarkable athlete]`;
      }
    } else if (v.jack_of_all_trades_toggle === '@{jack_of_all_trades}') {
      const jackOfAllTrades = getIntValue(v.jack_of_all_trades);
      if (exists(jackOfAllTrades)) {
        finalSetAttrs.initiative += jackOfAllTrades;
        finalSetAttrs.initiative_formula += `${addArithmeticOperator(finalSetAttrs.initiative_formula, jackOfAllTrades)}[jack of all trades]`;
      }
    }

    const globalCheckBonus = v.global_check_bonus;
    if (exists(globalCheckBonus)) {
      finalSetAttrs.initiative_formula += ' + (@{global_check_bonus})[global check bonus]';
    }
    setFinalAttrs(v, finalSetAttrs);
  });
};
on('change:dexterity_mod change:dexterity_check_bonus change:initiative_bonus change:jack_of_all_trades_toggle change:jack_of_all_trades change:remarkable_athlete_toggle change:remarkable_athlete change:global_check_bonus', () => {
  updateInitiative();
});

const updateWeight = () => {
  const collectionArray = ['weight_attacks', 'weight_ammo', 'weight_armor', 'weight_equipment', 'weight_coinage'];
  const finalSetAttrs = {};

  getAttrs(collectionArray, (v) => {
    finalSetAttrs.weight_total = round((getFloatValue(v.weight_attacks) + getFloatValue(v.weight_ammo) + getFloatValue(v.weight_armor) + getFloatValue(v.weight_equipment) + getFloatValue(v.weight_coinage)), 2);
    setFinalAttrs(v, finalSetAttrs);
  });
};
on('change:weight_attacks change:weight_ammo change:weight_armor change:weight_equipment change:weight_coinage', () => {
  updateWeight();
});
const updateAttackToggle = (v, finalSetAttrs, repeatingString, options) => {
  const attackParse = {
    attackAbility: options.attackAbility,
    parseName: 'attack',
    toggleField: 'roll_toggle',
    toggleFieldSetTo: '@{roll_toggle_var}',
    triggerFields: ['type', 'attack_bonus'],
  };
  parseAttackComponent(v, repeatingString, finalSetAttrs, attackParse);

  let attackFormula = '';
  const attackToggle = v[`${repeatingString}roll_toggle`];

  let toHit = 0;
  if (!attackToggle || attackToggle === '@{roll_toggle_var}') {
    const proficiency = v[`${repeatingString}proficiency`];
    if (!proficiency || proficiency === 'on') {
      const pb = getIntValue(v.pb);
      toHit += pb;
      attackFormula += `${pb}[proficient]`;
    }

    let attackAbility = v[`${repeatingString}attack_ability`];
    if (isUndefined(attackAbility) && v[`${repeatingString}type`] === 'Ranged Weapon') {
      attackAbility = '@{dexterity_mod}';
      finalSetAttrs[`${repeatingString}attack_ability`] = attackAbility;
    } else if (finalSetAttrs[`${repeatingString}attack_ability`]) {
      attackAbility = finalSetAttrs[`${repeatingString}attack_ability`];
    }
    attackAbility = getAbilityValue(v, attackAbility, options.defaultAbility);
    if (exists(attackAbility)) {
      toHit += attackAbility;
      attackFormula += `${addArithmeticOperator(attackFormula, attackAbility)}[${getAbilityShortName(v[`${repeatingString}attack_ability`])}]`;
    }

    const attackBonus = getIntValue(v[`${repeatingString}attack_bonus`]);
    if (exists(attackBonus)) {
      toHit += attackBonus;
      attackFormula += `${addArithmeticOperator(attackFormula, attackBonus)}[bonus]`;
    }

    if (exists(options.globalAttackBonus)) {
      if (!isNaN(options.globalAttackBonus)) {
        toHit += getIntValue(options.globalAttackBonus);
      }
      attackFormula += `${addArithmeticOperator(attackFormula, options.globalAttackBonus)}[${options.globalAttackBonusLabel}]`;
    }

    if (!v[`${repeatingString}type`] || v[`${repeatingString}type`] === 'Melee Weapon') {
      if (exists(options.globalMeleeAttackBonus)) {
        if (!isNaN(options.globalMeleeAttackBonus)) {
          toHit += getIntValue(options.globalMeleeAttackBonus);
        }
        attackFormula += `${addArithmeticOperator(attackFormula, options.globalMeleeAttackBonus)}[global melee attack bonus]`;
      }
    } else if (v[`${repeatingString}type`] === 'Ranged Weapon') {
      if (exists(options.globalRangedAttackBonus)) {
        if (!isNaN(options.globalRangedAttackBonus)) {
          toHit += getIntValue(options.globalRangedAttackBonus);
        }
        attackFormula += `${addArithmeticOperator(attackFormula, options.globalRangedAttackBonus)}[global ranged attack bonus]`;
      }
    }
    finalSetAttrs[`${repeatingString}attack_formula`] = attackFormula;
  }
  if (options.type === 'attack') {
    finalSetAttrs[`${repeatingString}to_hit`] = toHit;
  }
};

const updateSavingThrowToggle = (v, finalSetAttrs, repeatingString, options) => {
  const savingThrowParse = {
    parseName: 'savingThrow',
    toggleField: 'saving_throw_toggle',
    toggleFieldSetTo: '@{saving_throw_toggle_var}',
    triggerFields: ['saving_throw_ability', 'saving_throw_bonus', 'saving_throw_vs_ability'],
  };
  parseAttackComponent(v, repeatingString, finalSetAttrs, savingThrowParse);

  const savingThrowToggle = v[`${repeatingString}saving_throw_toggle`];
  if (savingThrowToggle === '@{saving_throw_toggle_var}') {
    let savingThrowDC = 8 + getIntValue(v.pb);
    let savingThrowAbility = v[`${repeatingString}saving_throw_ability`];
    if (!savingThrowAbility && savingThrowAbility !== '0') {
      savingThrowAbility = v.default_ability;
      finalSetAttrs[`${repeatingString}saving_throw_ability`] = v.default_ability;
    }

    savingThrowDC += getAbilityValue(v, savingThrowAbility, 'strength_mod');
    if (options && options.bonusDC) {
      savingThrowDC += getIntValue(options.bonusDC);
    }
    savingThrowDC += getIntValue(v[`${repeatingString}saving_throw_bonus`]);
    finalSetAttrs[`${repeatingString}saving_throw_dc`] = savingThrowDC;
  }
};

const updateDamageToggle = (v, finalSetAttrs, repeatingString, options) => {
  const damageParse = {
    addCastingModifier: exists(v[`${repeatingString}add_casting_modifier`]),
    parseName: 'damage',
    toggleField: 'damage_toggle',
    toggleFieldSetTo: '@{damage_toggle_var}',
    triggerFields: ['damage', 'damage_ability', 'damage_bonus', 'damage_type'],
  };
  parseAttackComponent(v, repeatingString, finalSetAttrs, damageParse);

  let damageString = '';
  let damageFormula = '';
  const damageToggle = v[`${repeatingString}damage_toggle`];
  let damageAbility;
  let damageType;

  if (!damageToggle || damageToggle === '@{damage_toggle_var}') {
    let damageAddition = 0;

    const damage = v[`${repeatingString}damage`];
    if (exists(damage)) {
      damageString += damage;
      damageFormula += `${damage}[damage]`;
    }

    if (!options.defaultDamageAbility) {
      options.defaultDamageAbility = 0;
    }

    damageAbility = v[`${repeatingString}damage_ability`];
    if (isUndefined(damageAbility) && v[`${repeatingString}type`] === 'Ranged Weapon') {
      damageAbility = '@{dexterity_mod}';
      finalSetAttrs[`${repeatingString}damage_ability`] = damageAbility;
    }
    if (exists(damageAbility) || options.defaultDamageAbility) {
      const damageAbilityValue = getAbilityValue(v, damageAbility, options.defaultDamageAbility);
      if (exists(damageAbilityValue)) {
        damageAddition += damageAbilityValue;
        damageFormula += `${addArithmeticOperator(damageFormula, damageAbilityValue)}[${getAbilityShortName(v[`${repeatingString}damage_ability`])}]`;
      }
    }

    const damageBonus = getIntValue(v[`${repeatingString}damage_bonus`]);
    if (exists(damageBonus)) {
      damageAddition += damageBonus;
      damageFormula += `${addArithmeticOperator(damageFormula, damageBonus)}[bonus]`;
    }

    if (exists(options.globalDamageBonus)) {
      if (!isNaN(options.globalDamageBonus)) {
        damageAddition += getIntValue(options.globalDamageBonus);
      } else {
        damageString += `${addArithmeticOperator(damageString, options.globalDamageBonus)}`;
      }
      damageFormula += `${addArithmeticOperator(damageFormula, options.globalDamageBonus)}[global damage bonus]`;
    }

    if (options && exists(options.globalMeleeDamageBonus) && (!v[`${repeatingString}type`] || v[`${repeatingString}type`] === 'Melee Weapon')) {
      if (!isNaN(options.globalMeleeDamageBonus)) {
        damageAddition += getIntValue(options.globalMeleeDamageBonus);
      } else {
        damageString += `${addArithmeticOperator(damageString, options.globalMeleeDamageBonus)}`;
      }
      damageFormula += `${addArithmeticOperator(damageFormula, options.globalMeleeDamageBonus)}[global melee damage bonus]`;
    } else if (options && exists(options.globalRangedDamageBonus) && v[`${repeatingString}type`] === 'Ranged Weapon') {
      if (!isNaN(options.globalRangedDamageBonus)) {
        damageAddition += getIntValue(options.globalRangedDamageBonus);
      } else {
        damageString += `${addArithmeticOperator(damageString, options.globalRangedDamageBonus)}`;
      }
      damageFormula += `${addArithmeticOperator(damageFormula, options.globalRangedDamageBonus)}[global ranged damage bonus]`;
    }

    if (exists(damageAddition)) {
      damageString += addArithmeticOperator(damageString, damageAddition);
    }

    damageType = v[`${repeatingString}damage_type`];
    if (exists(damageType)) {
      if (hasUpperCase(damageType)) {
        damageType = damageType.toLowerCase();
        finalSetAttrs[`${repeatingString}damage_type`] = damageType;
      }
      damageString += ` ${damageType}`;
    }
  }
  if (!exists(damageFormula)) {
    damageFormula = 0;
  }
  finalSetAttrs[`${repeatingString}damage_formula`] = damageFormula;

  const secondDamageParse = {
    parseName: 'secondDamage',
    toggleField: 'second_damage_toggle',
    toggleFieldSetTo: '@{second_damage_toggle_var}',
    triggerFields: ['second_damage', 'second_damage_ability', 'second_damage_bonus', 'second_damage_type'],
  };
  parseAttackComponent(v, repeatingString, finalSetAttrs, secondDamageParse);

  let secondDamageFormula = '';

  const secondDamageToggle = fromVOrFinalSetAttrs(v, finalSetAttrs, `${repeatingString}second_damage_toggle`);
  if (secondDamageToggle === '@{second_damage_toggle_var}') {
    let secondDamageAddition = 0;
    const secondDamage = v[`${repeatingString}second_damage`];
    if (exists(secondDamage)) {
      damageString += ` + ${secondDamage}`;
      secondDamageFormula += `${secondDamage}[second damage]`;
    }

    let secondDamageAbility = v[`${repeatingString}second_damage_ability`];
    if (exists(secondDamageAbility)) {
      secondDamageAbility = getAbilityValue(v, secondDamageAbility);
      if (exists(secondDamageAbility)) {
        secondDamageAddition += secondDamageAbility;
        secondDamageFormula += `${addArithmeticOperator(secondDamageFormula, secondDamageAbility)}[${getAbilityShortName(v[`${repeatingString}second_damage_ability`])}]`;
      }
    }

    const secondDamageBonus = getIntValue(v[`${repeatingString}second_damage_bonus`]);
    if (exists(secondDamageBonus)) {
      secondDamageAddition += secondDamageBonus;
      secondDamageFormula += `${addArithmeticOperator(secondDamageFormula, secondDamageBonus)}[bonus]`;
    }

    if (exists(secondDamageAddition)) {
      damageString += addArithmeticOperator(damageString, secondDamageAddition);
    }

    let secondDamageType = v[`${repeatingString}second_damage_type`];
    if (exists(secondDamageType)) {
      if (hasUpperCase(secondDamageType)) {
        secondDamageType = secondDamageType.toLowerCase();
        finalSetAttrs[`${repeatingString}second_damage_type`] = secondDamageType;
      }
      damageString += ` ${secondDamageType}`;
    }

    if (isUndefined(v[`${repeatingString}parsed`]) || v[`${repeatingString}parsed`].indexOf('damageProperties') === -1) {
      const damageProperties = v[`${repeatingString}properties`];
      if (exists(damageProperties)) {
        if (damageProperties.indexOf('Versatile') !== -1) {
          if (!exists(damageAbility)) {
            damageAbility = '@{strength_mod}';
          }
          finalSetAttrs[`${repeatingString}second_damage_ability`] = damageAbility;
          finalSetAttrs[`${repeatingString}second_damage_type`] = damageType;
        }
        if (!finalSetAttrs[`${repeatingString}parsed`]) {
          finalSetAttrs[`${repeatingString}parsed`] = '';
        }
        finalSetAttrs[`${repeatingString}parsed`] += ' damageProperties';
      }
    }
  }
  if (!exists(secondDamageFormula)) {
    secondDamageFormula = 0;
  }
  finalSetAttrs[`${repeatingString}second_damage_formula`] = secondDamageFormula;
  if (options.type === 'attack') {
    finalSetAttrs[`${repeatingString}damage_string`] = damageString;
  }
};

const updateHealToggle = (v, finalSetAttrs, repeatingString) => {
  const healParse = {
    addCastingModifier: exists(v[`${repeatingString}add_casting_modifier`]),
    parseName: 'heal',
    toggleField: 'heal_toggle',
    toggleFieldSetTo: '@{heal_toggle_var}',
    triggerFields: ['heal', 'heal_query_toggle'],
  };
  parseAttackComponent(v, repeatingString, finalSetAttrs, healParse);

  let healFormula = '@{heal}[heal]';
  const healToggle = v[`${repeatingString}heal_toggle`];
  if (healToggle === '@{heal_toggle_var}') {
    let healAbility = v[`${repeatingString}heal_ability`];
    healAbility = getAbilityValue(v, healAbility);
    if (exists(healAbility)) {
      healFormula += `${addArithmeticOperator(healFormula, healAbility)}[${getAbilityShortName(v[`${repeatingString}heal_ability`])}]`;
    }

    const healBonus = getIntValue(v[`${repeatingString}heal_bonus`]);
    if (exists(healBonus)) {
      healFormula += `${addArithmeticOperator(healFormula, healBonus)}[bonus]`;
    }

    if (exists(v.global_spell_heal_bonus)) {
      healFormula += ' + @{global_spell_heal_bonus}[global spell heal bonus]';
    }
    if (v[`${repeatingString}heal_query_toggle`] === '@{heal_query}') {
      healFormula += ' + @{heal_query_toggle}[query amount]';
    }

    finalSetAttrs[`${repeatingString}heal_formula`] = healFormula;
  }
};

const updateHigherLevelToggle = (v, finalSetAttrs, repeatingString) => {
  const higherLevelParse = {
    addCastingModifier: exists(v[`${repeatingString}add_casting_modifier`]),
    parseName: 'higherLevel',
    toggleField: 'higher_level_toggle',
    toggleFieldSetTo: '@{higher_level_toggle_var}',
    triggerFields: ['higher_level_dice', 'higher_level_die', 'second_higher_level_dice', 'second_higher_level_die', 'higher_level_heal'],
  };
  parseAttackComponent(v, repeatingString, finalSetAttrs, higherLevelParse);

  const higherLevelToggle = v[`${repeatingString}higher_level_toggle`];
  if (exists(higherLevelToggle) && higherLevelToggle === '@{higher_level_toggle_var}') {
    let spellLevelQuery = '?{Spell Level';

    const spellLevel = getIntValue(v[`${repeatingString}spell_level`]);
    for (let i = spellLevel; i <= 9; i++) {
      spellLevelQuery += `|${i}`;
    }
    spellLevelQuery += '}';
    finalSetAttrs[`${repeatingString}higher_level_query`] = spellLevelQuery;

    const damageToggle = v[`${repeatingString}damage_toggle`];
    if (damageToggle && damageToggle === '@{damage_toggle_var}') {
      const higherLevelDamage = '((@{higher_level_query} - @{spell_level}) * @{higher_level_dice})@{higher_level_die}[higher lvl]';
      finalSetAttrs[`${repeatingString}damage_formula`] += addArithmeticOperator(finalSetAttrs[`${repeatingString}damage_formula`], higherLevelDamage);;
      finalSetAttrs[`${repeatingString}damage_crit_formula`] = higherLevelDamage;
    }

    const secondDamageToggle = v[`${repeatingString}second_damage_toggle`];
    if (secondDamageToggle && secondDamageToggle === '@{second_damage_toggle_var}') {
      const higherLevelSecondDamage = '((@{higher_level_query} - @{spell_level}) * @{second_higher_level_dice})@{second_higher_level_die}[higher lvl]';
      finalSetAttrs[`${repeatingString}second_damage_formula`] += addArithmeticOperator(finalSetAttrs[`${repeatingString}second_damage_formula`], higherLevelSecondDamage);
      finalSetAttrs[`${repeatingString}second_damage_crit_formula`] = higherLevelSecondDamage;
    }

    const healToggle = v[`${repeatingString}heal_toggle`];
    if (healToggle && healToggle === '@{heal_toggle_var}') {
      finalSetAttrs[`${repeatingString}heal_formula`] += ' + ((@{higher_level_query} - @{spell_level}) * @{higher_level_dice})@{higher_level_die}[higher lvl] + (@{higher_level_heal} * (@{higher_level_query} - @{spell_level}))[higher lvl flat amount]';
    }
  }
};

const findAmmo = (name, callback) => {
  const repeatingItem = 'repeating_ammo';
  const collectionArray = [];

  getSectionIDs(repeatingItem, (ids) => {
    for (const id of ids) {
      const repeatingString = `${repeatingItem}_${id}_`;
      collectionArray.push(`${repeatingString}name`);
      collectionArray.push(`${repeatingString}qty`);
    }

    getAttrs(collectionArray, (v) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;
        if (v[`${repeatingString}name`] === name) {
          callback(`@{${repeatingString}qty}`);
        }
      }
      console.warn(`cannot find ammo field by the name ${name}`);
    });
  });
};

const updateActionChatMacro = (type) => {
  const repeatingItem = `repeating_${type}`;
  const collectionArray = [`${type}s_macro_var`, `${type}s_chat_var`, `${type}s_exist`];
  const finalSetAttrs = {};

  finalSetAttrs[`${type}s_macro_var`] = '';
  finalSetAttrs[`${type}s_chat_var`] = '';

  getSectionIDs(repeatingItem, (ids) => {
    for (const id of ids) {
      const repeatingString = `${repeatingItem}_${id}_`;
      collectionArray.push(`${repeatingString}name`);
      collectionArray.push(`${repeatingString}display_text`);
    }

    getAttrs(collectionArray, (v) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;
        let actionName = v[`${repeatingString}name`];
        const displayText = v[`${repeatingString}display_text`];

        if (id !== ids[0]) {
          finalSetAttrs[`${type}s_macro_var`] += ', ';
        }
        let actionType = 'action';
        let title;
        if (type === 'trait') {
          title = 'Traits';
          actionType = 'trait';
        } else if (type === 'action') {
          title = 'Actions';
        } else if (type === 'reaction') {
          title = 'Reactions';
        } else if (type === 'legendaryaction') {
          title = 'Legendary Actions';
        } else if (type === 'lairaction') {
          title = 'Lair Actions';
          actionName = displayText;
        } else if (type === 'regionaleffect') {
          title = 'Regional Effects';
          actionName = displayText;
        }

        if (actionName && actionName.length > 50) {
          actionName = `${actionName.substring(0, 50)}...`;
        }

        finalSetAttrs[`${type}s_macro_var`] += `[${actionName}](~repeating_${type}_${id}_${actionType})`;
        finalSetAttrs[`${type}s_chat_var`] += `{{${title}=${finalSetAttrs[`${type}s_macro_var`]}}}`;
      }
      setFinalAttrs(v, finalSetAttrs);
    });
  });
};

const updateAction = (type, rowId) => {
  const repeatingItem = `repeating_${type}`;
  const collectionArray = ['pb', 'strength_mod', 'finesse_mod', 'global_attack_bonus', 'global_melee_attack_bonus', 'global_ranged_attack_bonus', 'global_damage_bonus', 'global_melee_damage_bonus', 'global_ranged_damage_bonus', 'default_ability'];
  const finalSetAttrs = {};

  const rechargeRegex = /\s*?\((?:Recharge\s*?(\d+\-\d+|\d+)|Recharges\safter\sa\s(.*))\)/gi;
  const rechargeDayRegex = /\s*?\((\d+\/Day)\)/gi;

  for (const ability of ABILITIES) {
    collectionArray.push(`${ability}_mod`);
  }

  getSectionIDs(repeatingItem, (ids) => {
    if (rowId) {
      ids = [];
      ids.push(rowId);
    }
    for (const id of ids) {
      const repeatingString = `${repeatingItem}_${id}_`;
      collectionArray.push(`${repeatingString}name`);
      collectionArray.push(`${repeatingString}type`);
      collectionArray.push(`${repeatingString}uses`);
      collectionArray.push(`${repeatingString}uses_max`);
      collectionArray.push(`${repeatingString}has_uses`);
      collectionArray.push(`${repeatingString}roll_toggle`);
      collectionArray.push(`${repeatingString}to_hit`);
      collectionArray.push(`${repeatingString}attack_formula`);
      collectionArray.push(`${repeatingString}proficiency`);
      collectionArray.push(`${repeatingString}attack_ability`);
      collectionArray.push(`${repeatingString}attack_bonus`);
      collectionArray.push(`${repeatingString}saving_throw_toggle`);
      collectionArray.push(`${repeatingString}saving_throw_ability`);
      collectionArray.push(`${repeatingString}saving_throw_bonus`);
      collectionArray.push(`${repeatingString}saving_throw_dc`);
      collectionArray.push(`${repeatingString}damage_toggle`);
      collectionArray.push(`${repeatingString}damage_formula`);
      collectionArray.push(`${repeatingString}damage`);
      collectionArray.push(`${repeatingString}damage_ability`);
      collectionArray.push(`${repeatingString}damage_bonus`);
      collectionArray.push(`${repeatingString}damage_type`);
      collectionArray.push(`${repeatingString}second_damage_toggle`);
      collectionArray.push(`${repeatingString}second_damage_formula`);
      collectionArray.push(`${repeatingString}second_damage`);
      collectionArray.push(`${repeatingString}second_damage_ability`);
      collectionArray.push(`${repeatingString}second_damage_bonus`);
      collectionArray.push(`${repeatingString}second_damage_type`);
      collectionArray.push(`${repeatingString}damage_string`);
      collectionArray.push(`${repeatingString}heal_toggle`);
      collectionArray.push(`${repeatingString}heal`);
      collectionArray.push(`${repeatingString}heal_ability`);
      collectionArray.push(`${repeatingString}heal_bonus`);
      collectionArray.push(`${repeatingString}heal_query_toggle`);
      collectionArray.push(`${repeatingString}parsed`);
      collectionArray.push(`${repeatingString}recharge`);
      collectionArray.push(`${repeatingString}recharge_display`);
      collectionArray.push(`${repeatingString}extras_toggle`);
      collectionArray.push(`${repeatingString}emote`);
      collectionArray.push(`${repeatingString}freetext`);
      collectionArray.push(`${repeatingString}freeform`);
    }

    getAttrs(collectionArray, (v) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;

        const actionName = v[`${repeatingString}name`];
        if (!isUndefined(actionName)) {
          const rechargeResult = rechargeRegex.exec(actionName);
          if (rechargeResult) {
            finalSetAttrs[`${repeatingString}recharge`] = rechargeResult[1] || rechargeResult[2];
            finalSetAttrs[`${repeatingString}name`] = actionName.replace(rechargeRegex, '');
          }
          const rechargeDayResult = rechargeDayRegex.exec(actionName);
          if (rechargeDayResult) {
            finalSetAttrs[`${repeatingString}recharge`] = rechargeDayResult[1] || rechargeDayResult[2];
            finalSetAttrs[`${repeatingString}name`] = actionName.replace(rechargeDayRegex, '');
          }
        }

        if (v[`${repeatingString}uses`] || v[`${repeatingString}uses_max`]) {
          finalSetAttrs[`${repeatingString}has_uses`] = 1;
        } else if (!isUndefined(v[`${repeatingString}has_uses`])) {
          finalSetAttrs[`${repeatingString}has_uses`] = 0;
        }

        const recharge = fromVOrFinalSetAttrs(v, finalSetAttrs, `${repeatingString}recharge`);
        if (exists(recharge)) {
          if (isNaN(recharge)) {
            finalSetAttrs[`${repeatingString}recharge_display`] = ` (${recharge})`;
          } else {
            finalSetAttrs[`${repeatingString}recharge_display`] = ` (Recharge ${recharge})`;
          }
        } else if (exists(v[`${repeatingString}recharge_display`])) {
          finalSetAttrs[`${repeatingString}recharge_display`] = '';
        }

        let attackOptions = {};
        if (type !== 'trait') {
          attackOptions = {
            defaultAbility: 'strength_mod',
            globalAttackBonus: v.global_attack_bonus,
            globalAttackBonusLabel: 'global attack bonus',
            globalMeleeAttackBonus: v.global_melee_attack_bonus,
            globalRangedAttackBonus: v.global_ranged_attack_bonus,
            type: 'attack',
          };
        }
        updateAttackToggle(v, finalSetAttrs, repeatingString, attackOptions);

        updateSavingThrowToggle(v, finalSetAttrs, repeatingString);

        let damageOptions = {};
        if (type !== 'trait') {
          damageOptions = {
            defaultDamageAbility: 'strength_mod',
            globalDamageBonus: v.global_damage_bonus,
            globalMeleeDamageBonus: v.global_melee_damage_bonus,
            globalRangedDamageBonus: v.global_ranged_damage_bonus,
            type: 'attack',
          };
        }
        updateDamageToggle(v, finalSetAttrs, repeatingString, damageOptions);

        updateHealToggle(v, finalSetAttrs, repeatingString);

        if (v[`${repeatingString}emote`] || v[`${repeatingString}freetext`] || v[`${repeatingString}freeform`]) {
          finalSetAttrs[`${repeatingString}extras_toggle`] = '@{extras_var}';
        }
      }
      setFinalAttrs(v, finalSetAttrs, () => {
        updateActionChatMacro(type);
      });
    });
  });
};
on('change:repeating_trait', (eventInfo) => {
  const repeatingInfo = getRepeatingInfo('repeating_trait', eventInfo);
  if (repeatingInfo && repeatingInfo.field !== 'name' && repeatingInfo.field !== 'freetext' && repeatingInfo.field !== 'to_hit' && repeatingInfo.field !== 'attack_formula' && repeatingInfo.field !== 'damage_formula' && repeatingInfo.field !== 'second_damage_formula' && repeatingInfo.field !== 'damage_string' && repeatingInfo.field !== 'saving_throw_dc' && repeatingInfo.field !== 'parsed' && repeatingInfo.field !== 'recharge_display') {
    updateAction('trait', repeatingInfo.rowId);
  }
});
on('change:repeating_action', (eventInfo) => {
  const repeatingInfo = getRepeatingInfo('repeating_action', eventInfo);
  if (repeatingInfo && repeatingInfo.field !== 'name' && repeatingInfo.field !== 'freetext' && repeatingInfo.field !== 'to_hit' && repeatingInfo.field !== 'attack_formula' && repeatingInfo.field !== 'damage_formula' && repeatingInfo.field !== 'second_damage_formula' && repeatingInfo.field !== 'damage_string' && repeatingInfo.field !== 'saving_throw_dc' && repeatingInfo.field !== 'parsed' && repeatingInfo.field !== 'recharge_display') {
    updateAction('action', repeatingInfo.rowId);
  }
});
on('change:repeating_reaction', (eventInfo) => {
  const repeatingInfo = getRepeatingInfo('repeating_reaction', eventInfo);
  if (repeatingInfo && repeatingInfo.field !== 'name' && repeatingInfo.field !== 'freetext' && repeatingInfo.field !== 'to_hit' && repeatingInfo.field !== 'attack_formula' && repeatingInfo.field !== 'damage_formula' && repeatingInfo.field !== 'second_damage_formula' && repeatingInfo.field !== 'damage_string' && repeatingInfo.field !== 'saving_throw_dc' && repeatingInfo.field !== 'parsed' && repeatingInfo.field !== 'recharge_display') {
    updateAction('reaction', repeatingInfo.rowId);
  }
});
on('change:repeating_legendaryaction', (eventInfo) => {
  const repeatingInfo = getRepeatingInfo('repeating_legendaryaction', eventInfo);
  if (repeatingInfo && repeatingInfo.field !== 'name' && repeatingInfo.field !== 'freetext' && repeatingInfo.field !== 'to_hit' && repeatingInfo.field !== 'attack_formula' && repeatingInfo.field !== 'damage_formula' && repeatingInfo.field !== 'second_damage_formula' && repeatingInfo.field !== 'damage_string' && repeatingInfo.field !== 'saving_throw_dc' && repeatingInfo.field !== 'parsed' && repeatingInfo.field !== 'recharge_display') {
    updateAction('legendaryaction', repeatingInfo.rowId);
  }
});
on('change:repeating_lairaction', (eventInfo) => {
  const repeatingInfo = getRepeatingInfo('repeating_lairaction', eventInfo);
  if (repeatingInfo && repeatingInfo.field !== 'name' && repeatingInfo.field !== 'to_hit' && repeatingInfo.field !== 'freetext' && repeatingInfo.field !== 'attack_formula' && repeatingInfo.field !== 'damage_formula' && repeatingInfo.field !== 'second_damage_formula' && repeatingInfo.field !== 'damage_string' && repeatingInfo.field !== 'saving_throw_dc' && repeatingInfo.field !== 'parsed' && repeatingInfo.field !== 'recharge_display') {
    updateAction('lairaction', repeatingInfo.rowId);
  }
});
on('change:repeating_regionaleffect', (eventInfo) => {
  const repeatingInfo = getRepeatingInfo('repeating_regionaleffect', eventInfo);
  if (repeatingInfo && repeatingInfo.field !== 'name' && repeatingInfo.field !== 'to_hit' && repeatingInfo.field !== 'freetext' && repeatingInfo.field !== 'attack_formula' && repeatingInfo.field !== 'damage_formula' && repeatingInfo.field !== 'second_damage_formula' && repeatingInfo.field !== 'damage_string' && repeatingInfo.field !== 'saving_throw_dc' && repeatingInfo.field !== 'parsed' && repeatingInfo.field !== 'recharge_display') {
    updateAction('regionaleffect', repeatingInfo.rowId);
  }
});

const updateAttack = (rowId) => {
  const repeatingItem = 'repeating_attack';
  const collectionArray = ['pb', 'strength_mod', 'finesse_mod', 'global_attack_bonus', 'global_melee_attack_bonus', 'global_ranged_attack_bonus', 'global_damage_bonus', 'global_melee_damage_bonus', 'global_ranged_damage_bonus', 'default_ability', 'ammo_auto_use'];
  const finalSetAttrs = {};

  for (const ability of ABILITIES) {
    collectionArray.push(`${ability}_mod`);
  }

  getSectionIDs(repeatingItem, (ids) => {
    if (rowId) {
      ids = [];
      ids.push(rowId);
    }
    for (const id of ids) {
      const repeatingString = `${repeatingItem}_${id}_`;
      collectionArray.push(`${repeatingString}name`);
      collectionArray.push(`${repeatingString}type`);
      collectionArray.push(`${repeatingString}roll_toggle`);
      collectionArray.push(`${repeatingString}to_hit`);
      collectionArray.push(`${repeatingString}attack_formula`);
      collectionArray.push(`${repeatingString}proficiency`);
      collectionArray.push(`${repeatingString}attack_ability`);
      collectionArray.push(`${repeatingString}attack_bonus`);
      collectionArray.push(`${repeatingString}ammo_toggle_var`);
      collectionArray.push(`${repeatingString}ammo_field_name`);
      collectionArray.push(`${repeatingString}ammo_used`);
      collectionArray.push(`${repeatingString}saving_throw_toggle`);
      collectionArray.push(`${repeatingString}saving_throw_ability`);
      collectionArray.push(`${repeatingString}saving_throw_bonus`);
      collectionArray.push(`${repeatingString}saving_throw_dc`);
      collectionArray.push(`${repeatingString}damage_toggle`);
      collectionArray.push(`${repeatingString}damage_formula`);
      collectionArray.push(`${repeatingString}damage`);
      collectionArray.push(`${repeatingString}damage_ability`);
      collectionArray.push(`${repeatingString}damage_bonus`);
      collectionArray.push(`${repeatingString}damage_type`);
      collectionArray.push(`${repeatingString}second_damage_toggle`);
      collectionArray.push(`${repeatingString}second_damage_formula`);
      collectionArray.push(`${repeatingString}second_damage`);
      collectionArray.push(`${repeatingString}second_damage_ability`);
      collectionArray.push(`${repeatingString}second_damage_bonus`);
      collectionArray.push(`${repeatingString}second_damage_type`);
      collectionArray.push(`${repeatingString}damage_string`);
      collectionArray.push(`${repeatingString}modifiers`);
      collectionArray.push(`${repeatingString}properties`);
      collectionArray.push(`${repeatingString}weight`);
      collectionArray.push(`${repeatingString}parsed`);
    }

    getAttrs(collectionArray, (v) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;

        const attackName = v[`${repeatingString}name`];
        if (isUndefined(attackName)) {
          return;
        }

        if (isUndefined(v[`${repeatingString}parsed`]) || v[`${repeatingString}parsed`].indexOf('modifiers') === -1) {
          const attackModifiers = v[`${repeatingString}modifiers`];
          if (exists(attackModifiers)) {
            const attackBonus = attackModifiers.replace(/.*(?:Melee|Ranged) Attacks \+(\d+).*/gi, '$1');
            const damageBonus = attackModifiers.replace(/.*(?:Melee|Ranged) Damage \+(\d+).*/gi, '$1');

            finalSetAttrs[`${repeatingString}attack_bonus`] = attackBonus;
            finalSetAttrs[`${repeatingString}damage_bonus`] = damageBonus;
            if (!finalSetAttrs[`${repeatingString}parsed`]) {
              finalSetAttrs[`${repeatingString}parsed`] = '';
            }
            finalSetAttrs[`${repeatingString}parsed`] += ' modifiers';
          }
        }
        if (isUndefined(v[`${repeatingString}parsed`]) || v[`${repeatingString}parsed`].indexOf('attackProperties') === -1) {
          const attackProperties = v[`${repeatingString}properties`];
          if (exists(attackProperties)) {
            if (attackProperties.indexOf('Reach') !== -1) {
              finalSetAttrs[`${repeatingString}reach`] = '10 ft';
            } else if (v[`${repeatingString}type`] === 'Melee Weapon') {
              finalSetAttrs[`${repeatingString}reach`] = '5 ft';
            }
            if (attackProperties.indexOf('Finesse') !== -1) {
              finalSetAttrs[`${repeatingString}attack_ability`] = '@{finesse_mod}';
              finalSetAttrs[`${repeatingString}damage_ability`] = '@{finesse_mod}';
            }
            if (!finalSetAttrs[`${repeatingString}parsed`]) {
              finalSetAttrs[`${repeatingString}parsed`] = '';
            }
            finalSetAttrs[`${repeatingString}parsed`] += ' attackProperties';
          }
        }

        const attackOptions = {
          defaultAbility: 'strength_mod',
          globalAttackBonus: v.global_attack_bonus,
          globalAttackBonusLabel: 'global attack bonus',
          globalMeleeAttackBonus: v.global_melee_attack_bonus,
          globalRangedAttackBonus: v.global_ranged_attack_bonus,
          type: 'attack',
        };
        updateAttackToggle(v, finalSetAttrs, repeatingString, attackOptions);

        const ammoName = v[`${repeatingString}ammo_field_name`];
        const ammoUsed = getIntValue(v[`${repeatingString}ammo_used`], 1);
        if (!isUndefined(ammoName)) {
          let ammoAutoUse;
          if (v.ammo_auto_use === '@{ammo_auto_use_var}') {
            ammoAutoUse = 1;
          } else {
            ammoAutoUse = 0;
          }

          findAmmo(ammoName, (ammoQtyName) => {
            const setAmmo = {};
            setAmmo[`${repeatingString}ammo_toggle_var`] = `{{ammo=[[${ammoQtyName}-${ammoAutoUse * ammoUsed}]]}} {{ammo_name=${ammoName}}}`;
            setFinalAttrs(v, setAmmo);
          });
        }

        updateSavingThrowToggle(v, finalSetAttrs, repeatingString);

        const damageOptions = {
          defaultDamageAbility: 'strength_mod',
          globalDamageBonus: v.global_damage_bonus,
          globalMeleeDamageBonus: v.global_melee_damage_bonus,
          globalRangedDamageBonus: v.global_ranged_damage_bonus,
          type: 'attack',
        };
        updateDamageToggle(v, finalSetAttrs, repeatingString, damageOptions);
      }
      setFinalAttrs(v, finalSetAttrs);
    });
  });
};
on('change:repeating_attack', (eventInfo) => {
  const repeatingInfo = getRepeatingInfo('repeating_attack', eventInfo);
  if (repeatingInfo && repeatingInfo.field !== 'toggle_details' && repeatingInfo.field !== 'to_hit' && repeatingInfo.field !== 'attack_formula' && repeatingInfo.field !== 'damage_formula' && repeatingInfo.field !== 'second_damage_formula' && repeatingInfo.field !== 'damage_string' && repeatingInfo.field !== 'saving_throw_dc' && repeatingInfo.field !== 'qty' && repeatingInfo.field !== 'weight' && repeatingInfo.field !== 'parsed') {
    updateAttack(repeatingInfo.row);
  }
});
const weighAttacks = () => {
  const options = {
    collection: 'attack',
    toggle: 'carried',
    qty: 'qty',
  };
  const sumItems = [
    {
      fieldToAdd: 'weight',
      itemTotal: 'weight_total',
      totalField: 'weight_attacks',
    },
  ];
  sumRepeating(options, sumItems);
};
on('change:repeating_attack:carried change:repeating_attack:qty change:repeating_attack:weight remove:repeating_attack', () => {
  weighAttacks();
});
on('change:global_attack_bonus change:global_melee_attack_bonus change:global_ranged_attack_bonus change:global_damage_bonus change:global_melee_damage_bonus change:global_ranged_damage_bonus change:ammo_auto_use', () => {
  updateAttack();
  updateAction('action');
  updateAction('reaction');
  updateAction('legendaryaction');
  updateAction('lairaction');
});

const updateSpell = (rowId) => {
  const repeatingItem = 'repeating_spell';
  const collectionArray = ['is_npc', 'pb', 'finesse_mod', 'global_spell_attack_bonus', 'global_spell_damage_bonus', 'global_spell_dc_bonus', 'global_spell_heal_bonus', 'default_ability', 'caster_level'];
  const finalSetAttrs = {};

  for (const ability of ABILITIES) {
    collectionArray.push(`${ability}_mod`);
  }

  getSectionIDs(repeatingItem, (ids) => {
    if (rowId) {
      ids = [];
      ids.push(rowId);
    }
    for (const id of ids) {
      const repeatingString = `${repeatingItem}_${id}_`;
      collectionArray.push(`${repeatingString}name`);
      collectionArray.push(`${repeatingString}type`);
      collectionArray.push(`${repeatingString}roll_toggle`);
      collectionArray.push(`${repeatingString}to_hit`);
      collectionArray.push(`${repeatingString}attack_formula`);
      collectionArray.push(`${repeatingString}proficiency`);
      collectionArray.push(`${repeatingString}attack_ability`);
      collectionArray.push(`${repeatingString}attack_bonus`);
      collectionArray.push(`${repeatingString}saving_throw_toggle`);
      collectionArray.push(`${repeatingString}saving_throw_ability`);
      collectionArray.push(`${repeatingString}saving_throw_vs_ability`);
      collectionArray.push(`${repeatingString}saving_throw_bonus`);
      collectionArray.push(`${repeatingString}saving_throw_dc`);
      collectionArray.push(`${repeatingString}damage_toggle`);
      collectionArray.push(`${repeatingString}damage_formula`);
      collectionArray.push(`${repeatingString}damage`);
      collectionArray.push(`${repeatingString}damage_ability`);
      collectionArray.push(`${repeatingString}damage_bonus`);
      collectionArray.push(`${repeatingString}damage_type`);
      collectionArray.push(`${repeatingString}second_damage_toggle`);
      collectionArray.push(`${repeatingString}second_damage_formula`);
      collectionArray.push(`${repeatingString}second_damage`);
      collectionArray.push(`${repeatingString}second_damage_ability`);
      collectionArray.push(`${repeatingString}second_damage_bonus`);
      collectionArray.push(`${repeatingString}second_damage_type`);
      collectionArray.push(`${repeatingString}damage_string`);
      collectionArray.push(`${repeatingString}parsed`);
      collectionArray.push(`${repeatingString}spell_level`);
      collectionArray.push(`${repeatingString}casting_time`);
      collectionArray.push(`${repeatingString}components`);
      collectionArray.push(`${repeatingString}heal_toggle`);
      collectionArray.push(`${repeatingString}heal`);
      collectionArray.push(`${repeatingString}heal_ability`);
      collectionArray.push(`${repeatingString}heal_bonus`);
      collectionArray.push(`${repeatingString}heal_query_toggle`);
      collectionArray.push(`${repeatingString}add_casting_modifier`);
      collectionArray.push(`${repeatingString}higher_level_toggle`);
      collectionArray.push(`${repeatingString}higher_level_dice`);
      collectionArray.push(`${repeatingString}higher_level_die`);
      collectionArray.push(`${repeatingString}second_higher_level_dice`);
      collectionArray.push(`${repeatingString}second_higher_level_die`);
      collectionArray.push(`${repeatingString}higher_level_heal`);
      collectionArray.push(`${repeatingString}components_verbal`);
      collectionArray.push(`${repeatingString}components_somatic`);
      collectionArray.push(`${repeatingString}components_material`);
      collectionArray.push(`${repeatingString}duration`);
      collectionArray.push(`${repeatingString}concentration`);
      collectionArray.push(`${repeatingString}concentration_text`);
      collectionArray.push(`${repeatingString}ritual`);
      collectionArray.push(`${repeatingString}ritual_show`);
      collectionArray.push(`${repeatingString}materials`);
      collectionArray.push(`${repeatingString}materials_show`);
      collectionArray.push(`${repeatingString}extras_toggle`);
      collectionArray.push(`${repeatingString}emote`);
      collectionArray.push(`${repeatingString}freetext`);
      collectionArray.push(`${repeatingString}freeform`);
    }

    getAttrs(collectionArray, (v) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;

        const spellLevel = getIntValue(v[`${repeatingString}spell_level`]);
        if (spellLevel === 0) {
          finalSetAttrs[`${repeatingString}spell_level`] = spellLevel;
          finalSetAttrs[`${repeatingString}is_prepared`] = 'on';
        }
        finalSetAttrs[`${repeatingString}friendly_level`] = ordinalSpellLevel(spellLevel);

        const concentration = v[`${repeatingString}concentration`];
        if (concentration === 'Yes') {
          finalSetAttrs[`${repeatingString}concentration_show`] = 1;
          finalSetAttrs[`${repeatingString}concentration_text`] = 'Concentration, ';
        } else if (!isUndefined(v[`${repeatingString}concentration_text`])) {
          finalSetAttrs[`${repeatingString}concentration_text`] = '';
          finalSetAttrs[`${repeatingString}concentration_show`] = 0;
        }
        if (v.duration) {
          finalSetAttrs.duration = v.duration.toLowerCase();
        }
        const ritual = v[`${repeatingString}ritual`];
        if (ritual === 'Yes') {
          finalSetAttrs[`${repeatingString}ritual_show`] = 1;
        } else if (!isUndefined(v[`${repeatingString}ritual_show`])) {
          finalSetAttrs[`${repeatingString}ritual_show`] = 0;
        }
        const materials = v[`${repeatingString}materials`];
        if (!isUndefined(materials) && materials !== '') {
          finalSetAttrs[`${repeatingString}materials_show`] = 1;
        } else if (!isUndefined(v[`${repeatingString}materials_show`])) {
          finalSetAttrs[`${repeatingString}materials_show`] = 0;
        }

        const spellComponents = v[`${repeatingString}components`];
        finalSetAttrs[`${repeatingString}components_verbal`] = 0;
        finalSetAttrs[`${repeatingString}components_somatic`] = 0;
        finalSetAttrs[`${repeatingString}components_material`] = 0;
        if (exists(spellComponents)) {
          if (spellComponents.indexOf('V') !== -1) {
            finalSetAttrs[`${repeatingString}components_verbal`] = 1;
          }
          if (spellComponents.indexOf('S') !== -1) {
            finalSetAttrs[`${repeatingString}components_somatic`] = 1;
          }
          if (spellComponents.indexOf('M') !== -1) {
            finalSetAttrs[`${repeatingString}components_material`] = 1;
          }
        }

        const attackOptions = {
          attackAbility: true,
          globalAttackBonus: v.global_spell_attack_bonus,
          type: 'spell',
        };
        updateAttackToggle(v, finalSetAttrs, repeatingString, attackOptions);

        const savingThrowOptions = {
          bonusDC: v.global_spell_dc_bonus,
        };
        updateSavingThrowToggle(v, finalSetAttrs, repeatingString, savingThrowOptions);

        const damageOptions = {
          globalDamageBonus: v.global_spell_damage_bonus,
          type: 'spell',
        };
        updateDamageToggle(v, finalSetAttrs, repeatingString, damageOptions);

        if (getIntValue(v.is_npc) === 1 && v.caster_level && v[`${repeatingString}damage`] && v[`${repeatingString}damage`].indexOf('@{level}') !== -1) {
          finalSetAttrs[`${repeatingString}damage`] = v[`${repeatingString}damage`].replace('@{level}', '@{caster_level}');
        }

        updateHealToggle(v, finalSetAttrs, repeatingString);

        updateHigherLevelToggle(v, finalSetAttrs, repeatingString);

        if (v[`${repeatingString}emote`] || v[`${repeatingString}freetext`] || v[`${repeatingString}freeform`]) {
          finalSetAttrs[`${repeatingString}extras_toggle`] = '@{extras_var}';
        }
      }
      setFinalAttrs(v, finalSetAttrs);
    });
  });
};
on('change:repeating_spell', (eventInfo) => {
  const repeatingInfo = getRepeatingInfo('repeating_spell', eventInfo);
  if (repeatingInfo && repeatingInfo.field !== 'toggle_details' && repeatingInfo.field !== 'to_hit' && repeatingInfo.field !== 'attack_formula' && repeatingInfo.field !== 'damage_formula' && repeatingInfo.field !== 'second_damage_formula' && repeatingInfo.field !== 'damage_string' && repeatingInfo.field !== 'saving_throw_dc' && repeatingInfo.field !== 'heal_formula' && repeatingInfo.field !== 'higher_level_query' && repeatingInfo.field !== 'parsed') {
    console.info('spell repeatingInfo.field', repeatingInfo.field);
    updateSpell(repeatingInfo.rowId);
  }
});
on('change:global_spell_attack_bonus change:global_spell_damage_bonus change:global_spell_dc_bonus change:global_spell_heal_bonus', () => {
  updateSpell();
});

function updateD20Mod() {
  const collectionArray = ['halfling_luck'];
  const finalSetAttrs = {};

  getAttrs(collectionArray, (v) => {
    if (v.halfling_luck === 'on') {
      finalSetAttrs.d20_mod = 'ro<1[halfling luck]';
    } else {
      finalSetAttrs.d20_mod = '';
    }
    setFinalAttrs(v, finalSetAttrs);
  });
}

on('change:halfling_luck', () => {
  updateD20Mod();
});

const updateAbilityChecksMacro = () => {
  const repeatingItem = 'repeating_skill';
  const collectionArray = ['ability_checks_query_var', 'ability_checks_macro_var'];
  const finalSetAttrs = {};

  finalSetAttrs.ability_checks_query_var = '?{Ability Check';
  finalSetAttrs.ability_checks_macro_var = '';
  finalSetAttrs.skills_macro_var = '';

  for (const ability of ABILITIES) {
    collectionArray.push(`${ability}_check_mod`);
    collectionArray.push(`${ability}_check_mod_with_sign`);
  }
  getSectionIDs(repeatingItem, (ids) => {
    for (const id of ids) {
      const repeatingString = `${repeatingItem}_${id}_`;
      collectionArray.push(`${repeatingString}name`);
      collectionArray.push(`${repeatingString}ability`);
      collectionArray.push(`${repeatingString}total_with_sign`);
    }

    getAttrs(collectionArray, (v) => {
      for (const ability of ABILITIES) {
        if (!v[`${ability}_check_mod_with_sign`]) {
          console.warn('rerun until the fields are set');
          updateAbilityModifiers();
          updateAbilityChecksMacro();
        }

        finalSetAttrs.ability_checks_query_var += `|${capitalize(ability)},{{title=${capitalize(ability)}&#125;&#125; {{roll1=[[@{preroll}d20@{postroll}@{d20_mod} + ${v[`${ability}_check_mod`]}]]&#125;&#125; @{roll_setting}@{d20_mod} + ${v[`${ability}_check_mod`]}]]&#125;&#125;`;
        finalSetAttrs.ability_checks_macro_var += `[${capitalize(ability)} ${v[`${ability}_check_mod_with_sign`]}](~${ability}_check)`;
        finalSetAttrs.ability_checks_macro_var += ', ';
      }
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;
        finalSetAttrs.ability_checks_query_var += `|${v[`${repeatingString}name`]}, {{title=${v[`${repeatingString}name`]} (${capitalize(getAbilityShortName(v[`${repeatingString}ability`]))})&#125;&#125; {{roll1=[[@{preroll}d20@{postroll}@{d20_mod} + @{${repeatingString}formula}]]&#125;&#125; @{roll_setting}@{d20_mod} + @{${repeatingString}formula}]]&#125;&#125;`;
        if (id !== ids[0]) {
          finalSetAttrs.ability_checks_macro_var += ', ';
          finalSetAttrs.skills_macro_var += ', ';
        }
        const skillButton = `[${v[`${repeatingString}name`]} ${v[`${repeatingString}total_with_sign`]}](~repeating_skill_${id}_skill)`;
        finalSetAttrs.ability_checks_macro_var += skillButton;
        finalSetAttrs.skills_macro_var += skillButton;
      }
      finalSetAttrs.ability_checks_query_var += '}';
      setFinalAttrs(v, finalSetAttrs);
    });
  });
};

const updatePreAndPostRoll = () => {
  const collectionArray = ['roll_setting', 'roll_info', 'preroll', 'postroll'];
  const finalSetAttrs = {};

  getAttrs(collectionArray, (v) => {
    finalSetAttrs.roll_info = '';
    finalSetAttrs.preroll = '';
    finalSetAttrs.postroll = '';

    if (v.roll_setting === '@{roll_advantage}') {
      finalSetAttrs.roll_info = '{{advantage=1}}';
      finalSetAttrs.preroll = 2;
      finalSetAttrs.postroll = 'kh1';
    } else if (v.roll_setting === '@{roll_disadvantage}') {
      finalSetAttrs.roll_info = '{{disadvantage=1}}';
      finalSetAttrs.preroll = 2;
      finalSetAttrs.postroll = 'kl1';
    }

    setFinalAttrs(v, finalSetAttrs);
  });
};
on('change:roll_setting', () => {
  updatePreAndPostRoll();
});

const updateSkill = (rowId) => {
  const repeatingItem = 'repeating_skill';
  const collectionArray = ['jack_of_all_trades_toggle', 'jack_of_all_trades', 'remarkable_athlete_toggle', 'remarkable_athlete', 'pb', 'exp', 'global_check_bonus'];
  const finalSetAttrs = {};

  for (const ability of ABILITIES) {
    collectionArray.push(`${ability}_mod`);
    collectionArray.push(`${ability}_check_bonus`);
  }

  getSectionIDs(repeatingItem, (ids) => {
    if (rowId) {
      ids = [];
      ids.push(rowId);
    }
    for (const id of ids) {
      const repeatingString = `${repeatingItem}_${id}_`;
      collectionArray.push(`${repeatingString}proficiency`);
      collectionArray.push(`${repeatingString}name`);
      collectionArray.push(`${repeatingString}ability`);
      collectionArray.push(`${repeatingString}bonus`);
      collectionArray.push(`${repeatingString}ability_short_name`);
      collectionArray.push(`${repeatingString}formula`);
      collectionArray.push(`${repeatingString}total`);
      collectionArray.push(`${repeatingString}total_with_sign`);
    }

    getAttrs(collectionArray, (v) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;

        const skillName = v[`${repeatingString}name`];
        if (isUndefined(skillName)) {
          return;
        }

        const ability = getAbilityModName(v[`${repeatingString}ability`]);
        const abilityName = getAbilityName(v[`${repeatingString}ability`]);
        finalSetAttrs[`${repeatingString}ability_short_name`] = getAbilityShortName(ability, true);

        let total = 0;
        let totalFormula = '';
        const proficiency = v[`${repeatingString}proficiency`];
        if (!proficiency || proficiency === 'unproficient') {
          if ((abilityName === 'strength' || abilityName === 'dexterity' || abilityName === 'constitution') && v.remarkable_athlete_toggle === '@{remarkable_athlete}') {
            const remarkableAthlete = getIntValue(v.remarkable_athlete);
            total += remarkableAthlete;
            totalFormula += `${remarkableAthlete}[remarkable athlete]`;
          } else if (v.jack_of_all_trades_toggle === '@{jack_of_all_trades}') {
            const jackOfAllTrades = getIntValue(v.jack_of_all_trades);
            total += jackOfAllTrades;
            totalFormula += `${jackOfAllTrades}[jack of all trades]`;
          }
        } else if (proficiency === 'proficient') {
          const pb = getIntValue(v.pb);
          total += pb;
          totalFormula += `${pb}[proficient]`;
        } else if (proficiency === 'expertise') {
          const exp = getIntValue(v.exp);
          total += exp;
          totalFormula += `${exp}[expertise]`;
        }

        const skillAbility = getAbilityValue(v, ability, 'strength_mod');
        if (exists(skillAbility)) {
          total += skillAbility;
          totalFormula += `${addArithmeticOperator(totalFormula, skillAbility)}[${getAbilityShortName(ability)}]`;
        }

        const skillBonus = getIntValue(v[`${repeatingString}bonus`]);
        if (exists(skillBonus)) {
          total += skillBonus;
          totalFormula += `${addArithmeticOperator(totalFormula, skillBonus)}[bonus]`;
        }

        const skillAbilityName = getAbilityName(ability);
        if (exists(skillAbilityName)) {
          let checkBonus = v[`${skillAbilityName}_check_bonus`];
          if (exists(checkBonus)) {
            checkBonus = getIntValue(checkBonus);
            total += checkBonus;
            totalFormula += `${addArithmeticOperator(totalFormula, checkBonus)}[${getAbilityShortName(ability)} check bonus]`;
          }
        }

        const globalCheckBonus = v.global_check_bonus;
        if (exists(globalCheckBonus)) {
          if (!isNaN(globalCheckBonus)) {
            total += getIntValue(globalCheckBonus);
          }
          totalFormula += ' + (@{global_check_bonus})[global check bonus]';
        }

        finalSetAttrs[`${repeatingString}total`] = total;
        finalSetAttrs[`${repeatingString}total_with_sign`] = showSign(total);
        finalSetAttrs[`${repeatingString}formula`] = totalFormula;
      }
      setFinalAttrs(v, finalSetAttrs, () => {
        updateAbilityChecksMacro();
      });
    });
  });
};

on('change:repeating_skill', (eventInfo) => {
  const repeatingInfo = getRepeatingInfo('repeating_skill', eventInfo);
  if (repeatingInfo && repeatingInfo.field !== 'ability_short_name' && repeatingInfo.field !== 'total' && repeatingInfo.field !== 'total_with_sign' && repeatingInfo.field !== 'formula') {
    updateSkill(repeatingInfo.rowId);
  }
});
on('remove:repeating_skill', () => {
  updateAbilityChecksMacro();
});
on('change:jack_of_all_trades_toggle change:jack_of_all_trades change:remarkable_athlete_toggle change:remarkable_athlete change:global_check_bonus change:strength_check_bonus change:dexterity_check_bonus change:constitution_check_bonus change:intelligence_check_bonus change:wisdom_check_bonus change:charisma_check_bonus', () => {
  updateSkill();
});

const updateSkillsFromSRD = () => {
  const repeatingItem = 'repeating_skill';
  const collectionArray = ['skills_srd', 'level', 'challenge', 'strength_mod', 'dexterity_mod', 'constitution_mod', 'intelligence_mod', 'wisdom_mod', 'charisma_mod'];
  const finalSetAttrs = {};

  getSectionIDs(repeatingItem, (ids) => {
    for (const id of ids) {
      const repeatingString = `${repeatingItem}_${id}_`;
      collectionArray.push(`${repeatingString}name`);
      collectionArray.push(`${repeatingString}ability`);
    }
    getAttrs(collectionArray, (v) => {
      const skillsFromSRD = v.skills_srd;
      const skillsObj = {};
      const pb = getPB(v.level, v.challenge);
      const expertise = pb * 2;
      let skillName;
      let repeatingString;

      if (!isUndefined(skillsFromSRD)) {
        for (const id of ids) {
          repeatingString = `${repeatingItem}_${id}_`;
          skillName = v[`${repeatingString}name`];
          skillsObj[skillName] = id;
        }

        const re = /(\w+)\s?((?:\+|\-)\d+)/gi;
        let match;
        while ((match = re.exec(skillsFromSRD)) !== null) {
          if (match && match[1] && match[2]) {
            skillName = match[1];
            if (skillsObj[skillName]) {
              const skillId = skillsObj[skillName];
              repeatingString = `${repeatingItem}_${skillId}_`;

              const skillAbility = v[`${repeatingString}ability`];
              const abilityValue = getAbilityValue(v, skillAbility);
              const skillBonus = getIntValue(match[2]) - abilityValue;

              if (skillBonus >= expertise) {
                finalSetAttrs[`${repeatingString}proficiency`] = 'expertise';
                if (skillBonus > expertise) {
                  finalSetAttrs[`${repeatingString}bonus`] = skillBonus - expertise;
                }
              } else if (skillBonus >= pb) {
                finalSetAttrs[`${repeatingString}proficiency`] = 'proficient';
                if (skillBonus > pb) {
                  finalSetAttrs[`${repeatingString}bonus`] = skillBonus - pb;
                }
              }
            } else {
              console.warn(`${skillName} does not exist in the list of skills`);
            }
          }
        }
      }
      setFinalAttrs(v, finalSetAttrs);
    });
  });
};
on('change:skills_srd', () => {
  updateSkillsFromSRD();
});

const updateSavingThrow = (ability) => {
  const collectionArray = ['pb', `${ability}_mod`, `${ability}_save_prof`, `${ability}_save_bonus`, 'global_saving_throw_bonus', 'saving_throws_half_proficiency'];
  const finalSetAttrs = {};

  getAttrs(collectionArray, (v) => {
    const abilityMod = getIntValue(v[`${ability}_mod`]);
    let total = abilityMod;
    let totalFormula = `${abilityMod}[${getAbilityShortName(ability)}]`;

    const pb = getIntValue(v.pb);
    if (v[`${ability}_save_prof`] === '@{PB}') {
      total += pb;
      totalFormula += `${addArithmeticOperator(totalFormula, pb)}[proficient]`;
    } else if (v.saving_throws_half_proficiency === 'on') {
      const halfPB = Math.floor(pb / 2);
      total += halfPB;
      totalFormula += `${addArithmeticOperator(totalFormula, halfPB)}[half proficiency]`;
    }

    const abilitySavingThrowBonus = getIntValue(v[`${ability}_save_bonus`]);
    if (abilitySavingThrowBonus) {
      total += abilitySavingThrowBonus;
      totalFormula += `${addArithmeticOperator(totalFormula, abilitySavingThrowBonus)}[${getAbilityShortName(ability)}saving throw bonus]`;
    }

    const globalSavingThrowBonus = v.global_saving_throw_bonus;
    if (!isUndefined(globalSavingThrowBonus)) {
      if (!isNaN(globalSavingThrowBonus)) {
        total += getIntValue(globalSavingThrowBonus);
      }
      totalFormula += `${addArithmeticOperator(totalFormula, globalSavingThrowBonus)}[global saving throw bonus]`;
    }

    finalSetAttrs[`${ability}_saving_throw_mod`] = totalFormula;
    finalSetAttrs[`${ability}_saving_throw_mod_with_sign`] = showSign(total);
    setFinalAttrs(v, finalSetAttrs);
  });
};
const updateSavingThrows = () => {
  updateSavingThrow('strength');
  updateSavingThrow('dexterity');
  updateSavingThrow('constitution');
  updateSavingThrow('intelligence');
  updateSavingThrow('wisdom');
  updateSavingThrow('charisma');
};
on('change:pb change:global_saving_throw_bonus change:saving_throws_half_proficiency', () => {
  updateSavingThrows();
});
on('change:strength_mod change:strength_save_prof change:strength_save_bonus', () => {
  updateSavingThrow('strength');
});
on('change:dexterity_mod change:dexterity_save_prof change:dexterity_save_bonus', () => {
  updateSavingThrow('dexterity');
});
on('change:constitution_mod change:constitution_save_prof change:constitution_save_bonus', () => {
  updateSavingThrow('constitution');
});
on('change:intelligence_mod change:intelligence_save_prof change:intelligence_save_bonus', () => {
  updateSavingThrow('intelligence');
});
on('change:wisdom_mod change:wisdom_save_prof change:wisdom_save_bonus', () => {
  updateSavingThrow('wisdom');
});
on('change:charisma_mod change:charisma_save_prof change:charisma_save_bonus', () => {
  updateSavingThrow('charisma');
});

const updateSavingThrowsFromSRD = () => {
  const collectionArray = ['saving_throws_srd'];
  const finalSetAttrs = {};

  getAttrs(collectionArray, (v) => {
    const savingThrowsFromSRD = v.saving_throws_srd;
    const pbVar = '@{PB}';

    if (savingThrowsFromSRD.indexOf('Str') !== -1) {
      finalSetAttrs.strength_save_prof = pbVar;
    }
    if (savingThrowsFromSRD.indexOf('Dex') !== -1) {
      finalSetAttrs.dexterity_save_prof = pbVar;
    }
    if (savingThrowsFromSRD.indexOf('Con') !== -1) {
      finalSetAttrs.constitution_save_prof = pbVar;
    }
    if (savingThrowsFromSRD.indexOf('Int') !== -1) {
      finalSetAttrs.intelligence_save_prof = pbVar;
    }
    if (savingThrowsFromSRD.indexOf('Wis') !== -1) {
      finalSetAttrs.wisdom_save_prof = pbVar;
    }
    if (savingThrowsFromSRD.indexOf('Cha') !== -1) {
      finalSetAttrs.charisma_save_prof = pbVar;
    }
    setFinalAttrs(v, finalSetAttrs);
  });
};
on('change:saving_throws_srd', () => {
  updateSavingThrowsFromSRD();
});

const updateSpellsFromSRD = () => {
  const collectionArray = ['spells_srd'];
  const finalSetAttrs = {};

  getAttrs(collectionArray, (v) => {
    const spells = v.spells_srd.split(', ');

    for (const spell of spells) {
      const repeatingString = `repeating_spell_${generateRowID()}_`;
      finalSetAttrs[`${repeatingString}name`] = spell;
    }
    setFinalAttrs(v, finalSetAttrs);
  });
};
on('change:spells_srd', () => {
  updateSpellsFromSRD();
});

const updateAttachers = () => {
  const repeatingItem = 'repeating_attacher';
  const collectionArray = ['attacher_initiative', 'attacher_death_saving_throw', 'attacher_hit_dice', 'attacher_attack', 'attacher_spell', 'attacher_skill', 'attacher_crit'];
  const finalSetAttrs = {};
  const itemsToPush = ['initiative', 'death_saving_throw', 'hit_dice', 'attack', 'spell', 'skill'];

  for (const ability of ABILITIES) {
    collectionArray.push(`attacher_${ability}_check`);
    collectionArray.push(`attacher_${ability}_saving_throw`);
    itemsToPush.push(`${ability}_check`);
    itemsToPush.push(`${ability}_saving_throw`);
  }

  getSectionIDs(repeatingItem, (ids) => {
    for (const id of ids) {
      const repeatingString = `${repeatingItem}_${id}_`;
      collectionArray.push(`${repeatingString}name`);
      collectionArray.push(`${repeatingString}freetext`);
      collectionArray.push(`${repeatingString}freeform`);
      collectionArray.push(`${repeatingString}crit_attacher`);

      for (const itemToPush of itemsToPush) {
        collectionArray.push(`${repeatingString}${itemToPush}_attacher`);
        finalSetAttrs[`attacher_${itemToPush}`] = '';
      }
    }
    getAttrs(collectionArray, (v) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;

        for (const itemToPush of itemsToPush) {
          const attacher = v[`${repeatingString}${itemToPush}_attacher`];
          if (exists(attacher) && attacher === 'on') {
            const attacherName = v[`${repeatingString}name`] || '';

            const freeText = v[`${repeatingString}freetext`];
            if (exists(attacherName) && exists(freeText)) {
              const critAttacher = v[`${repeatingString}crit_attacher`];
              if (critAttacher === 'on') {
                finalSetAttrs[`attacher_${itemToPush}`] += `{{crit_name=${attacherName}}} `;
                finalSetAttrs[`attacher_${itemToPush}`] += `{{crit_text=${freeText}}} `;
              } else {
                finalSetAttrs[`attacher_${itemToPush}`] += `{{${attacherName}=${freeText}}} `;
              }
            }
            const freeForm = v[`${repeatingString}freeform`];
            if (exists(freeForm)) {
              finalSetAttrs[`attacher_${itemToPush}`] += `${freeForm} `;
            }
          }
        }
      }
      setFinalAttrs(v, finalSetAttrs);
    });
  });
};

on('change:repeating_attacher remove:repeating_attacher', () => {
  updateAttachers();
});

const updateNPCChallenge = () => {
  const collectionArray = ['challenge', 'xp'];
  const finalSetAttrs = {};

  getAttrs(collectionArray, (v) => {
    const challenge = v.challenge;
    const xpPerChallenge = {
      0: 0,
      '1/8': 25,
      '1/4': 50,
      '1/2': 100,
      1: 200,
      2: 450,
      3: 700,
      4: 1100,
      5: 1800,
      6: 2300,
      7: 2900,
      8: 3900,
      9: 5000,
      10: 5900,
      11: 7200,
      12: 8400,
      13: 10000,
      14: 11500,
      15: 13000,
      16: 15000,
      17: 18000,
      18: 20000,
      19: 22000,
      20: 25000,
      21: 33000,
      22: 41000,
      23: 50000,
      24: 62000,
      25: 75000,
      26: 90000,
      27: 105000,
      28: 120000,
      29: 135000,
      30: 155000,
    };

    finalSetAttrs.xp = xpPerChallenge[challenge];
    finalSetAttrs.xp_readable = numberWithCommas(finalSetAttrs.xp);

    finalSetAttrs.level = challenge;
    if (finalSetAttrs.level < 1) {
      finalSetAttrs.level = 1;
    }
    setFinalAttrs(v, finalSetAttrs);
  });
};

on('change:challenge', () => {
  updateNPCChallenge();
});

const updateNPCHPFromSRD = () => {
  const collectionArray = ['hp_srd', 'constitution', 'constitution_mod', 'constitution_bonus', 'global_ability_bonus'];
  const finalSetAttrs = {};

  getAttrs(collectionArray, (v) => {
    if (exists(v.hp_srd)) {
      const match = v.hp_srd.match(/\((\d+)d(\d+)(?:\s?(\+|\-)\s?(\d+))?\)/i);
      if (!match || !match[1] || !match[2]) {
        console.warn('Character doesn\'t have valid HP/HD format');
      } else {
        const hdNum = getIntValue(match[1]);

        let conMod = getIntValue(v.constitution_mod);
        if (!conMod) {
          const conScore = getIntValue(v.constitution);
          const conBonus = getIntValue(v.constitution_bonus);
          const globalAbilityBonus = getIntValue(v.global_ability_bonus);

          conMod = getAbilityMod((conScore + conBonus + globalAbilityBonus));
        }

        finalSetAttrs.hit_dice = hdNum;
        finalSetAttrs.hit_die = `d${getIntValue(match[2])}`;

        const hpExpectedBonus = hdNum * conMod;
        const hpBonusSign = match[3];
        const hpBonus = getIntValue(match[4]);
        if (hpBonus !== hpExpectedBonus) {
          if (hpBonusSign === '-') {
            finalSetAttrs.hp_extra = hpBonus + hpExpectedBonus;
          } else {
            finalSetAttrs.hp_extra = hpBonus - hpExpectedBonus;
          }
        }
      }
    }
    setFinalAttrs(v, finalSetAttrs);
  });
};
on('change:hp_srd', () => {
  updateNPCHPFromSRD();
});

const updateNPCHP = () => {
  const collectionArray = ['HP', 'HP_max', 'hp_formula', 'hit_dice', 'hit_die', 'hp_extra', 'constitution_mod'];
  const finalSetAttrs = {};

  getAttrs(collectionArray, (v) => {
    const hdNum = getIntValue(v.hit_dice);
    const hdSize = getIntValue(v.hit_die.replace('d', ''));
    const hdAverage = (hdSize / 2) + 0.5;
    let hpFormula = `${hdNum}d${hdSize}`;
    const conMod = getIntValue(v.constitution_mod);
    let totalHP = Math.floor(hdNum * hdAverage);
    let amount;

    if (conMod !== 0) {
      const bonusHP = hdNum * conMod;
      totalHP += bonusHP;
      hpFormula += addArithmeticOperator(hpFormula, bonusHP);
    }

    if (exists(v.hp_extra)) {
      const regex = (/(?:(\+|\-)\s?)?(\d+)(?:d(\d+))?/gi);
      let splitFormula;

      while ((splitFormula = regex.exec(v.hp_extra)) !== null) {
        if (!splitFormula || !splitFormula[2]) {
          console.warn('Character doesn\'t have valid hp formula');
        } else {
          amount = 0;

          if (!splitFormula[3]) {
            amount = getIntValue(splitFormula[2]);
          } else {
            const extraHdNum = getIntValue(splitFormula[2]);
            const extraHdSize = getIntValue(splitFormula[3]);
            const extraHdAverage = (extraHdSize / 2) + 0.5;
            amount = Math.floor(extraHdNum * extraHdAverage);
          }

          if (!splitFormula[1] || splitFormula[1] === '+') {
            totalHP += amount;
            hpFormula += `${addArithmeticOperator(hpFormula, amount)}`;
          } else if (splitFormula[1] === '-') {
            totalHP -= amount;
            hpFormula += `${addArithmeticOperator(hpFormula, amount)}`;
          }
        }
        v.hp_extra.toString().replace(splitFormula[0], '');
      }
    }

    if (totalHP) {
      finalSetAttrs.HP = totalHP;
      finalSetAttrs.HP_max = totalHP;
      finalSetAttrs.hp_formula = hpFormula;
    }
    setFinalAttrs(v, finalSetAttrs);
  });
};
on('change:hit_dice change:hit_die change:hp_extra change:constitution_mod', () => {
  updateNPCHP();
});

const updateNPCAC = () => {
  const collectionArray = ['ac_srd', 'ac', 'ac_note', 'dexterity_mod'];
  const finalSetAttrs = {};

  getAttrs(collectionArray, (v) => {
    if (exists(v.ac_srd)) {
      const match = v.ac_srd.match(/(\d+)\s?(.*)/);
      if (match && match[1]) {
        finalSetAttrs.AC = match[1];
      }
      if (match && match[2]) {
        finalSetAttrs.ac_note = match[2].replace(/\(|\)/g, '');
      }
    }
    setFinalAttrs(v, finalSetAttrs);
  });
};

on('change:ac_srd', () => {
  updateNPCAC();
});

const setDefaultAbility = (v, finalSetAttrs) => {
  const abilityScores = [getIntValue(v.intelligence), getIntValue(v.wisdom), getIntValue(v.charisma)];
  const highestAbilityScore = Math.max.apply(Math, abilityScores);
  let highestAbilityName = 'intelligence';

  if (highestAbilityScore === abilityScores[1]) {
    highestAbilityName = 'wisdom';
  } else if (highestAbilityScore === abilityScores[2]) {
    highestAbilityName = 'charisma';
  }

  finalSetAttrs.default_ability = `@{${highestAbilityName}_mod}`;
};

const parseSRDContentSection = (content, finalSetAttrs, title, name) => {
  const re = /@(.*)@:\s([^@]+)/gi;
  let match;
  let section;

  if (content.indexOf(title) !== -1) {
    const contentSplit = content.split(`${title}\n`);
    section = contentSplit[1];
    content = contentSplit[0];
  }
  if (exists(section)) {
    if (name === 'legendaryaction') {
      const legendaryActionsMatch = content.match(/Can take (\d+) Legendary Actions/gi);
      if (legendaryActionsMatch && legendaryActionsMatch[1]) {
        finalSetAttrs.legendary_action_amount = legendaryActionAmount[1];
      }
    }

    while ((match = re.exec(section.replace(/\*\*/g, '@'))) !== null) {
      if (match && match[1] && match[2]) {
        const repeatingString = `repeating_${name}_${generateRowID()}_`;
        finalSetAttrs[`${repeatingString}name`] = match[1];
        const text = match[2].trim();
        if (name === 'trait') {
          finalSetAttrs[`${repeatingString}display_text`] = text;
        }
        finalSetAttrs[`${repeatingString}freetext`] = text;
      } else {
        console.warn(`Character doesn\'t have a valid ${name} format`);
      }
    }
  }
  return content;
};

const updateNPCContent = () => {
  const collectionArray = ['content_srd'];
  const finalSetAttrs = {};

  for (const ability of ABILITIES) {
    collectionArray.push(ability);
  }

  getAttrs(collectionArray, (v) => {
    let content = v.content_srd;
    let regionalEffects;
    let lairActions;
    let repeatingString;

    setDefaultAbility(v, finalSetAttrs);

    if (exists(content)) {
      if (content.indexOf('Regional Effects') !== -1) {
        const regionalEffectsSplit = content.split(/Regional Effects\n/);
        regionalEffects = regionalEffectsSplit[1];
        content = regionalEffectsSplit[0];
      }
      if (exists(regionalEffects)) {
        const regionalEffectsList = regionalEffects.split(/\*\*/);
        regionalEffectsList.slice(1, -1).forEach((regionalEffect) => {
          repeatingString = `repeating_regionaleffect_${generateRowID()}_`;
          finalSetAttrs[`${repeatingString}freetext`] = regionalEffect.trim();
        });
        finalSetAttrs.regional_effects_fade = regionalEffectsList.slice(-1)[0];
      }
      if (content.indexOf('Lair Actions') !== -1) {
        const lairActionsSplit = content.split(/Lair Actions\n/);
        lairActions = lairActionsSplit[1];
        content = lairActionsSplit[0];
      }
      if (exists(lairActions)) {
        lairActions.split(/\*\*/).slice(1).forEach((lairAction) => {
          repeatingString = `repeating_lairaction_${generateRowID()}_`;
          finalSetAttrs[`${repeatingString}freetext`] = lairAction.trim();
        });
      }

      content = parseSRDContentSection(content, finalSetAttrs, 'Legendary Actions', 'legendaryaction');
      content = parseSRDContentSection(content, finalSetAttrs, 'Reactions', 'reaction');
      content = parseSRDContentSection(content, finalSetAttrs, 'Actions', 'action');
      parseSRDContentSection(content, finalSetAttrs, 'Traits', 'trait');
    }

    setFinalAttrs(v, finalSetAttrs);
  });
};
on('change:content_srd', () => {
  updateNPCContent();
});

const displayTextForTraits = () => {
  const repeatingItem = 'repeating_trait';
  const collectionArray = [];
  const finalSetAttrs = {};

  getSectionIDs(repeatingItem, (ids) => {
    for (const id of ids) {
      const repeatingString = `${repeatingItem}_${id}_`;
      collectionArray.push(`${repeatingString}display_text`);
      collectionArray.push(`${repeatingString}freetext`);
    }

    getAttrs(collectionArray, (v) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;

        if (isUndefined(v.display_text)) {
          finalSetAttrs[`${repeatingString}display_text`] = v[`${repeatingString}freetext`];
        }
      }
      setFinalAttrs(v, finalSetAttrs);
    });
  });
};

const parseDamage = (finalSetAttrs, repeatingString, freetext, regex, name, spellMods, meleeMods, spellAttack, rangedAttack, dexMod) => {
  const damageParseRegex = /(\d+d?\d+)(?:\s?(?:\+|\-)\s?(\d+))?/gi;
  const damage = regex.exec(freetext);
  let damageBonus;
  if (damage) {
    /*
     1 is damage without dice. Example '1'
     2 is damage with dice. Example '2d6+4'
     3 is damage type. Example 'slashing' or 'lightning or thunder'
     */
    if (damage[1]) {
      damageBonus = damage[1];
    }
    if (damage[2]) {
      const damageParsed = damageParseRegex.exec(damage[2]);
      if (damageParsed) {
        if (damageParsed[1]) {
          finalSetAttrs[repeatingString + name] = damageParsed[1];
        }
        if (damageParsed[2]) {
          damageBonus = damageParsed[2];
        }
      }
    }
    damageBonus = getCorrectAbilityBasedOnBonus(finalSetAttrs, repeatingString, `${name}_ability`, damageBonus, spellMods, meleeMods, spellAttack, rangedAttack, dexMod);
    if (damage[3]) {
      finalSetAttrs[`${repeatingString}${name}_type`] = damage[3];
    }
    if (damageBonus) {
      finalSetAttrs[`${repeatingString}${name}_bonus`] = damageBonus;
    }
    freetext = freetext.replace(regex, '');
    finalSetAttrs[`${repeatingString}${name}_toggle`] = `@{${name}_toggle_var}`;
  }
  return freetext;
};

const parseAction = (type, rowId) => {
  const repeatingItem = `repeating_${type}`;
  const collectionArray = ['level', 'challenge', 'global_attack_bonus', 'global_melee_attack_bonus', 'global_ranged_attack_bonus', 'global_damage_bonus', 'global_melee_damage_bonus', 'global_ranged_damage_bonus', 'default_ability'];
  const finalSetAttrs = {};

  const damageSyntax = /(?:(\d+)|.*?\(([\dd\s\+\-]*)\).*?)\s*?/;
  const damageType = /((?:[a-zA-Z]+|[a-zA-Z]+\s(?:or|and)\s[a-zA-Z]+)(?:\s*?\([a-zA-Z\s]+\))?)\s*?damage\s?(\([a-zA-Z'\s]+\))?/;
  const altDamageSyntax = /(?:,\s*?or\s*?)/;
  const plus = /\s*?plus\s*?/;
  const savingThrowRe = /(?:DC)\s*?(\d+)\s*?([a-zA-Z]*)\s*?(?:saving throw)/;
  const saveSuccess = /or\s(.*)?\son a successful one./;
  const damageRegex = new RegExp(damageSyntax.source + damageType.source, 'i');
  const damagePlusRegex = new RegExp(plus.source + damageSyntax.source + damageType.source, 'i');
  const altDamageRegex = new RegExp(altDamageSyntax.source + damageSyntax.source + damageType.source, 'i');
  const savingThrowRegex = new RegExp(savingThrowRe.source, 'i');
  const saveSuccessRegex = new RegExp(saveSuccess.source, 'i');

  const typeRegex = /(melee|ranged|melee or ranged)\s*(spell|weapon)\s*/gi;
  const toHitRegex = /:\s?\+\s?(\d+)\s*(?:to hit)/gi;
  const reachRegex = /(?:reach)\s?(\d+)\s?(?:ft)/gi;
  const rangeRegex = /(?:range)\s?(\d+)\/(\d+)\s?(ft)/gi;
  const spellcastingRegex = /(\d+)\w+\slevel\s\((\d+)\s?slot(?:s)?\)/gi;
  const spellcastingLevelRegex = /(\d+)(?:st|dn|rd|th)-level spellcaster/i;
  const spellcastingAbilityRegex = /spellcasting ability is (\w+)/i;

  for (const ability of ABILITIES) {
    collectionArray.push(`${ability}_mod`);
  }

  getSectionIDs(repeatingItem, (ids) => {
    if (rowId) {
      ids = [];
      ids.push(rowId);
    }
    for (const id of ids) {
      const repeatingString = `${repeatingItem}_${id}_`;
      collectionArray.push(`${repeatingString}name`);
      collectionArray.push(`${repeatingString}freetext`);
    }

    getAttrs(collectionArray, (v) => {
      const pb = getPB(v.level, v.challenge);
      const strMod = getIntValue(v.strength_mod);
      const dexMod = getIntValue(v.dexterity_mod);
      const conMod = getIntValue(v.constitution_mod);
      const intMod = getIntValue(v.intelligence_mod);
      const wisMod = getIntValue(v.wisdom_mod);
      const chaMod = getIntValue(v.charisma_mod);
      const meleeMods = [strMod, dexMod];
      const spellMods = [intMod, wisMod, chaMod];
      const abilityMods = [strMod, dexMod, conMod, intMod, wisMod, chaMod];

      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;

        let rangedAttack = false;
        let spellAttack = false;

        const name = v[`${repeatingString}name`];
        let freetext = v[`${repeatingString}freetext`];

        if (name && name.indexOf('Spellcasting') !== -1) {
          const spellcastingSearch = spellcastingAbilityRegex.exec(freetext);
          if (spellcastingSearch && spellcastingSearch[1]) {
            const spellcastingAbility = spellcastingSearch[1].toLowerCase();
            finalSetAttrs.default_ability = `@{${spellcastingAbility}_mod}`;
          }
          const spellcastingLevelSearch = spellcastingLevelRegex.exec(freetext);
          if (spellcastingLevelSearch && spellcastingLevelSearch[1]) {
            finalSetAttrs.caster_level = spellcastingLevelSearch[1];
          }

          let match;
          while ((match = spellcastingRegex.exec(freetext)) !== null) {
            if (match && match[1] && match[2]) {
              finalSetAttrs[`spell_slots_l${match[1]}_bonus`] = match[2];
            }
          }
        }

        const actionType = typeRegex.exec(freetext);
        if (actionType) {
          if (actionType[1]) {
            actionType[1] = actionType[1].toLowerCase();
            if (actionType[1] === 'melee') {
              finalSetAttrs[`${repeatingString}type`] = 'Melee Weapon';
            }
            if (actionType[1] === 'ranged') {
              finalSetAttrs[`${repeatingString}type`] = 'Ranged Weapon';
              rangedAttack = true;
            }
            if (actionType[1] === 'melee or ranged') {
              finalSetAttrs[`${repeatingString}type`] = 'Other';
            }
          }
          if (actionType[2]) {
            actionType[2] = actionType[2].toLowerCase();
            if (actionType[2] === 'spell') {
              spellAttack = true;
            }
          }
          freetext = freetext.replace(typeRegex, '');
        }

        const reach = reachRegex.exec(freetext);
        if (reach && reach[1]) {
          finalSetAttrs[`${repeatingString}reach`] = `${reach[1]}ft.`;
          freetext = freetext.replace(reachRegex, '');
        }
        const range = rangeRegex.exec(freetext);
        if (range && range[1] && range[2]) {
          finalSetAttrs[`${repeatingString}range`] = `${range[1]}ft.`;
          freetext = freetext.replace(rangeRegex, '');
        }

        const toHit = toHitRegex.exec(freetext);
        if (toHit && toHit[1]) {
          let hitBonus = toHit[1];
          hitBonus -= pb;

          hitBonus = getCorrectAbilityBasedOnBonus(finalSetAttrs, repeatingString, 'attack_ability', hitBonus, spellMods, meleeMods, spellAttack, rangedAttack, dexMod);

          if (hitBonus) {
            finalSetAttrs[`${repeatingString}attack_bonus`] = hitBonus;
          }
          freetext = freetext.replace(toHitRegex, '');
          finalSetAttrs[`${repeatingString}roll_toggle`] = '@{roll_toggle_var}';
        } else {
          finalSetAttrs[`${repeatingString}roll_toggle`] = '0';
        }

        const savingThrow = savingThrowRegex.exec(freetext);
        if (savingThrow) {
          if (savingThrow[1]) {
            let savingThrowTotal = savingThrow[1];
            savingThrowTotal -= 8;
            savingThrowTotal -= pb;

            savingThrowTotal = getAnyCorrectAbilityBasedOnBonus(finalSetAttrs, repeatingString, 'saving_throw_ability', savingThrowTotal, abilityMods);

            if (savingThrowTotal) {
              finalSetAttrs[`${repeatingString}saving_throw_bonus`] = savingThrowTotal;
            }
            freetext = freetext.replace(savingThrowRegex, '');
            finalSetAttrs[`${repeatingString}saving_throw_toggle`] = '@{saving_throw_toggle_var}';
          }
          if (savingThrow[2]) {
            finalSetAttrs[`${repeatingString}saving_throw_vs_ability`] = savingThrow[2];
          }
          const halfDamage = saveSuccessRegex.exec(freetext);
          if (halfDamage && halfDamage[1]) {
            finalSetAttrs[`${repeatingString}saving_throw_success`] = halfDamage[1];
            freetext = freetext.replace(saveSuccessRegex, '');
          }
        } else {
          finalSetAttrs[`${repeatingString}saving_throw_toggle`] = '0';
        }

        freetext = parseDamage(finalSetAttrs, repeatingString, freetext, damageRegex, 'damage', spellMods, meleeMods, spellAttack, rangedAttack, dexMod);
        freetext = parseDamage(finalSetAttrs, repeatingString, freetext, altDamageRegex, 'second_damage', spellMods, meleeMods, spellAttack, rangedAttack, dexMod);
        freetext = parseDamage(finalSetAttrs, repeatingString, freetext, damagePlusRegex, 'second_damage', spellMods, meleeMods, spellAttack, rangedAttack, dexMod);
        if (!exists(finalSetAttrs[`${repeatingString}second_damage`])) {
          freetext = parseDamage(finalSetAttrs, repeatingString, freetext, damageRegex, 'second_damage', spellMods, meleeMods, spellAttack, rangedAttack, dexMod);
        }

        finalSetAttrs[`${repeatingString}extras_toggle`] = '@{extras_var}';
      }
      setFinalAttrs(v, finalSetAttrs, () => {
        updateAction(type, rowId);
      });
    });
  });
};
on('change:repeating_trait:freetext', (eventInfo) => {
  const repeatingInfo = getRepeatingInfo('repeating_trait', eventInfo);
  parseAction('trait', repeatingInfo.rowId);
});
on('change:repeating_action:freetext', (eventInfo) => {
  const repeatingInfo = getRepeatingInfo('repeating_action', eventInfo);
  parseAction('action', repeatingInfo.rowId);
});
on('change:repeating_reaction:freetext', (eventInfo) => {
  const repeatingInfo = getRepeatingInfo('repeating_reaction', eventInfo);
  parseAction('reaction', repeatingInfo.rowId);
});
on('change:repeating_legendaryaction:freetext', (eventInfo) => {
  const repeatingInfo = getRepeatingInfo('repeating_legendaryaction', eventInfo);
  parseAction('legendaryaction', repeatingInfo.rowId);
});
on('change:repeating_lairaction:freetext', (eventInfo) => {
  const repeatingInfo = getRepeatingInfo('repeating_lairaction', eventInfo);
  parseAction('lairaction', repeatingInfo.rowId);
});

const countAction = (type) => {
  const repeatingItem = `repeating_${type}`;
  const collectionArray = [`${type}s_exist`];
  const finalSetAttrs = {};


  getSectionIDs(repeatingItem, (ids) => {
    getAttrs(collectionArray, (v) => {
      if (ids.length > 0) {
        finalSetAttrs[`${type}s_exist`] = 1;
      } else if (exists(v[`${type}s_exist`])) {
        finalSetAttrs[`${type}s_exist`] = 0;
      }

      setFinalAttrs(v, finalSetAttrs);
    });
  });
};
on('change:repeating_trait remove:repeating_trait', () => {
  countAction('trait');
});
on('change:repeating_action remove:repeating_action', () => {
  countAction('action');
});
on('change:repeating_reaction remove:repeating_reaction', () => {
  countAction('reaction');
});
on('change:repeating_legendaryaction remove:repeating_legendaryaction', () => {
  countAction('legendaryaction');
});
on('change:repeating_lairaction remove:repeating_lairaction', () => {
  countAction('lairaction');
});
on('change:repeating_regionaleffect remove:repeating_regionaleffect', () => {
  countAction('regionaleffect');
});

const switchToNPC = () => {
  const collectionArray = ['is_npc', 'size'];
  const finalSetAttrs = {};

  getAttrs(collectionArray, (v) => {
    const isNPC = getIntValue(v.is_npc) === 1;

    if (isNPC && isUndefined(v.size)) {
      finalSetAttrs.size = 'Large';
    }
    setFinalAttrs(v, finalSetAttrs);
  });
};
on('change:is_npc', () => {
  switchToNPC();
});

const updateSize = () => {
  const collectionArray = ['size'];
  const finalSetAttrs = {};

  getAttrs(collectionArray, (v) => {
    const creatureSize = v.size || 'Large';
    const sizeToHdSize = {
      Tiny: 4,
      Small: 6,
      Medium: 8,
      Large: 10,
      Huge: 12,
      Gargantuan: 20,
    };
    finalSetAttrs.hit_die = `d${sizeToHdSize[creatureSize]}`;
    setFinalAttrs(v, finalSetAttrs);
  });
};
on('change:size', () => {
  updateSize();
});

const updateType = () => {
  const collectionArray = ['type'];
  const finalSetAttrs = {};

  getAttrs(collectionArray, (v) => {
    if (v.type) {
      finalSetAttrs.type = v.type.toLowerCase();
    }
    setFinalAttrs(v, finalSetAttrs);
  });
};
on('change:type', () => {
  updateType();
});

const updateAlignment = () => {
  const collectionArray = ['alignment', 'is_npc'];
  const finalSetAttrs = {};

  getAttrs(collectionArray, (v) => {
    if (v.alignment && v.is_npc === '1') {
      finalSetAttrs.alignment = v.alignment.toLowerCase();
    }
    setFinalAttrs(v, finalSetAttrs);
  });
};
on('change:alignment', () => {
  updateAlignment();
});

const updateSenses = () => {
  const collectionArray = ['senses'];
  const finalSetAttrs = {};

  getAttrs(collectionArray, (v) => {
    if (v.senses) {
      finalSetAttrs.senses_exist = 1;
      finalSetAttrs.senses = v.senses.toLowerCase();
    } else {
      finalSetAttrs.senses_exist = 0;
    }
    setFinalAttrs(v, finalSetAttrs);
  });
};
on('change:senses', () => {
  updateSenses();
});

const updateLanguages = () => {
  const collectionArray = ['languages', 'languages_exist', 'languages_chat_var'];
  const finalSetAttrs = {};

  finalSetAttrs.languages_exist = 0;
  finalSetAttrs.languages_chat_var = '';

  getAttrs(collectionArray, (v) => {
    if (v.languages) {
      finalSetAttrs.languages_exist = 1;
      finalSetAttrs.languages_chat_var = '{{Languages=@{languages}}}';
    }
    setFinalAttrs(v, finalSetAttrs);
  });
};
on('change:languages', () => {
  updateLanguages();
});

const updateSpeed = () => {
  const collectionArray = ['npc_speed'];
  const finalSetAttrs = {};

  getAttrs(collectionArray, (v) => {
    finalSetAttrs.npc_speed = v.npc_speed.toLowerCase();
    const match = finalSetAttrs.npc_speed.match(/^\s*(\d+)\s*ft/);
    if (match && match[1]) {
      finalSetAttrs.speed = match[1];
    }
    setFinalAttrs(v, finalSetAttrs);
  });
};
on('change:npc_speed', () => {
  updateSpeed();
});

const updateACNote = () => {
  const collectionArray = ['ac_note'];
  const finalSetAttrs = {};

  getAttrs(collectionArray, (v) => {
    finalSetAttrs.ac_note = v.ac_note.toLowerCase();
    setFinalAttrs(v, finalSetAttrs);
  });
};
on('change:ac_note', () => {
  updateACNote();
});

const updateDamageResistancesVar = () => {
  const collectionArray = ['damage_resistances_var', 'damage_vulnerabilities_exist', 'damage_resistances_exist', 'damage_immunities_exist', 'condition_immunities_exist'];
  const finalSetAttrs = {};

  finalSetAttrs.damage_resistances_var = '';

  getAttrs(collectionArray, (v) => {
    if (v.damage_vulnerabilities_exist) {
      finalSetAttrs.damage_resistances_var = '{{Damage Vulnerabilities=@{damage_vulnerabilities}}}';
    }
    if (v.damage_resistances_exist) {
      if (finalSetAttrs.damage_resistances_var !== '') {
        finalSetAttrs.damage_resistances_var += ' ';
      }
      finalSetAttrs.damage_resistances_var = '{{Damage Resistances=@{damage_resistances}}}';
    }
    if (v.damage_immunities_exist) {
      if (finalSetAttrs.damage_resistances_var !== '') {
        finalSetAttrs.damage_resistances_var += ' ';
      }
      finalSetAttrs.damage_resistances_var = '{{Damage Immunities=@{damage_immunities}}}';
    }
    if (v.condition_immunities_exist) {
      if (finalSetAttrs.damage_resistances_var !== '') {
        finalSetAttrs.damage_resistances_var += ' ';
      }
      finalSetAttrs.damage_resistances_var = '{{Condition Immunities=@{condition_immunities}}}';
    }
    setFinalAttrs(v, finalSetAttrs);
  });
};

const updateDamageVulnerabilities = () => {
  const collectionArray = ['damage_vulnerabilities'];
  const finalSetAttrs = {};

  getAttrs(collectionArray, (v) => {
    if (v.damage_vulnerabilities) {
      finalSetAttrs.damage_vulnerabilities_exist = 1;
      finalSetAttrs.damage_vulnerabilities = lowercaseDamageTypes(v.damage_vulnerabilities);
    } else {
      finalSetAttrs.damage_vulnerabilities_exist = 0;
    }
    setFinalAttrs(v, finalSetAttrs, () => {
      updateDamageResistancesVar();
    });
  });
};
on('change:damage_vulnerabilities', () => {
  updateDamageVulnerabilities();
});
const updateDamageResistances = () => {
  const collectionArray = ['damage_resistances'];
  const finalSetAttrs = {};

  getAttrs(collectionArray, (v) => {
    if (v.damage_resistances) {
      finalSetAttrs.damage_resistances_exist = 1;
      finalSetAttrs.damage_resistances = lowercaseDamageTypes(v.damage_resistances);
    } else {
      finalSetAttrs.damage_resistances_exist = 0;
    }
    setFinalAttrs(v, finalSetAttrs, () => {
      updateDamageResistancesVar();
    });
  });
};
on('change:damage_resistances', () => {
  updateDamageResistances();
});
const updateDamageImmunities = () => {
  const collectionArray = ['damage_immunities'];
  const finalSetAttrs = {};

  getAttrs(collectionArray, (v) => {
    if (v.damage_immunities) {
      finalSetAttrs.damage_immunities_exist = 1;
      finalSetAttrs.damage_immunities = lowercaseDamageTypes(v.damage_immunities);
    } else {
      finalSetAttrs.damage_immunities_exist = 0;
    }
    setFinalAttrs(v, finalSetAttrs, () => {
      updateDamageResistancesVar();
    });
  });
};
on('change:damage_immunities', () => {
  updateDamageImmunities();
});
const updateConditionImmunities = () => {
  const collectionArray = ['condition_immunities'];
  const finalSetAttrs = {};

  getAttrs(collectionArray, (v) => {
    if (v.condition_immunities) {
      finalSetAttrs.condition_immunities_exist = 1;
      finalSetAttrs.condition_immunities = lowercaseDamageTypes(v.condition_immunities);
    } else {
      finalSetAttrs.condition_immunities_exist = 0;
    }
    setFinalAttrs(v, finalSetAttrs, () => {
      updateDamageResistancesVar();
    });
  });
};
on('change:condition_immunities', () => {
  updateConditionImmunities();
});

const updateLanguageSelection = () => {
  const collectionArray = ['lang'];
  const finalSetAttrs = {};

  getAttrs(collectionArray, (v) => {
    const language = v.lang;

    if (language) {
      if (language === 'English') {
        finalSetAttrs.lang = 'en';
      } else if (language === 'French') {
        finalSetAttrs.lang = 'fr';
      } else if (language === 'German') {
        finalSetAttrs.lang = 'de';
      } else if (language === 'Russian') {
        finalSetAttrs.lang = 'ru';
      }
    }
    setFinalAttrs(v, finalSetAttrs);
  });
};

const resourcesToTraits = () => {
  const repeatingItem = 'repeating_resource';
  const newRepeatingItem = 'repeating_trait';
  const collectionArray = [];
  const finalSetAttrs = {};

  let repeatingString;
  getSectionIDs(repeatingItem, (ids) => {
    for (const id of ids) {
      repeatingString = `${repeatingItem}_${id}_`;
      collectionArray.push(`${repeatingString}name`);
      collectionArray.push(`${repeatingString}uses`);
      collectionArray.push(`${repeatingString}uses_max`);
      collectionArray.push(`${repeatingString}toggle_details`);
      collectionArray.push(`${repeatingString}recharge`);
      collectionArray.push(`${repeatingString}extras_toggle`);
      collectionArray.push(`${repeatingString}freetext`);
      collectionArray.push(`${repeatingString}freeform`);
    }

    getAttrs(collectionArray, (v) => {
      for (const id of ids) {
        repeatingString = `${repeatingItem}_${id}_`;
        const newRepeatingString = `${newRepeatingItem}_${generateRowID()}_`;

        finalSetAttrs[`${newRepeatingString}name`] = v[`${repeatingString}name`];
        finalSetAttrs[`${newRepeatingString}uses`] = v[`${repeatingString}uses`];
        finalSetAttrs[`${newRepeatingString}uses_max`] = v[`${repeatingString}uses_max`];
        finalSetAttrs[`${newRepeatingString}toggle_details`] = v[`${repeatingString}toggle_details`];
        finalSetAttrs[`${newRepeatingString}recharge`] = v[`${repeatingString}recharge`];
        finalSetAttrs[`${newRepeatingString}extras_toggle`] = v[`${repeatingString}extras_toggle`];
        finalSetAttrs[`${newRepeatingString}freetext`] = v[`${repeatingString}freetext`];
        finalSetAttrs[`${newRepeatingString}freeform`] = v[`${repeatingString}freeform`];
      }
      setFinalAttrs(v, finalSetAttrs);
    });
  });
};

const classFeaturesToTraits = () => {
  const repeatingItem = 'repeating_classfeature';
  const newRepeatingItem = 'repeating_trait';
  const collectionArray = ['lang'];
  const finalSetAttrs = {};

  let repeatingString;
  getSectionIDs(repeatingItem, (ids) => {
    for (const id of ids) {
      repeatingString = `${repeatingItem}_${id}_`;
      collectionArray.push(`${repeatingString}name`);
      collectionArray.push(`${repeatingString}uses`);
      collectionArray.push(`${repeatingString}uses_max`);
      collectionArray.push(`${repeatingString}recharge`);
      collectionArray.push(`${repeatingString}saving_throw_toggle`);
      collectionArray.push(`${repeatingString}saving_throw_condition`);
      collectionArray.push(`${repeatingString}saving_throw_ability`);
      collectionArray.push(`${repeatingString}saving_throw_bonus`);
      collectionArray.push(`${repeatingString}saving_throw_vs_ability`);
      collectionArray.push(`${repeatingString}saving_throw_failure`);
      collectionArray.push(`${repeatingString}saving_throw_success`);
      collectionArray.push(`${repeatingString}damage_toggle`);
      collectionArray.push(`${repeatingString}damage`);
      collectionArray.push(`${repeatingString}damage_ability`);
      collectionArray.push(`${repeatingString}damage_bonus`);
      collectionArray.push(`${repeatingString}damage_type`);
      collectionArray.push(`${repeatingString}second_damage_toggle`);
      collectionArray.push(`${repeatingString}second_damage`);
      collectionArray.push(`${repeatingString}second_damage_ability`);
      collectionArray.push(`${repeatingString}second_damage_bonus`);
      collectionArray.push(`${repeatingString}second_damage_type`);
      collectionArray.push(`${repeatingString}heal`);
      collectionArray.push(`${repeatingString}heal_ability`);
      collectionArray.push(`${repeatingString}heal_bonus`);
      collectionArray.push(`${repeatingString}heal_query_toggle`);
      collectionArray.push(`${repeatingString}extras_toggle`);
      collectionArray.push(`${repeatingString}emote`);
      collectionArray.push(`${repeatingString}freetext`);
      collectionArray.push(`${repeatingString}freeform`);
    }

    getAttrs(collectionArray, (v) => {
      const language = v.lang;
      for (const id of ids) {
        repeatingString = `${repeatingItem}_${id}_`;
        const newRepeatingString = `${newRepeatingItem}_${generateRowID()}_`;
        const name = v[`${repeatingString}name`];
        const classFeatures = TRANSLATIONS[language].CLASS_FEATURES;
        let featureExistsInDefinedList = false;

        for (const classFeature in classFeatures) {
          if (classFeatures.hasOwnProperty(classFeature)) {
            if (classFeatures[classFeature] === name) {
              featureExistsInDefinedList = true;
            }
          }
        }
        if (!featureExistsInDefinedList) {
          finalSetAttrs[`${newRepeatingString}name`] = name;
        } else {
          finalSetAttrs[`${newRepeatingString}name`] = `DELETE - ${name}`;
        }
        finalSetAttrs[`${newRepeatingString}uses`] = v[`${repeatingString}uses`];
        finalSetAttrs[`${newRepeatingString}uses_max`] = v[`${repeatingString}uses_max`];
        finalSetAttrs[`${newRepeatingString}recharge`] = v[`${repeatingString}recharge`];
        finalSetAttrs[`${newRepeatingString}saving_throw_toggle`] = v[`${repeatingString}saving_throw_toggle`];
        finalSetAttrs[`${newRepeatingString}saving_throw_condition`] = v[`${repeatingString}saving_throw_condition`];
        finalSetAttrs[`${newRepeatingString}saving_throw_ability`] = v[`${repeatingString}saving_throw_ability`];
        finalSetAttrs[`${newRepeatingString}saving_throw_bonus`] = v[`${repeatingString}saving_throw_bonus`];
        finalSetAttrs[`${newRepeatingString}saving_throw_vs_ability`] = v[`${repeatingString}saving_throw_vs_ability`];
        finalSetAttrs[`${newRepeatingString}saving_throw_failure`] = v[`${repeatingString}saving_throw_failure`];
        finalSetAttrs[`${newRepeatingString}saving_throw_success`] = v[`${repeatingString}saving_throw_success`];
        finalSetAttrs[`${newRepeatingString}damage_toggle`] = v[`${repeatingString}damage_toggle`];
        finalSetAttrs[`${newRepeatingString}damage`] = v[`${repeatingString}damage`];
        finalSetAttrs[`${newRepeatingString}damage_ability`] = v[`${repeatingString}damage_ability`];
        finalSetAttrs[`${newRepeatingString}damage_bonus`] = v[`${repeatingString}damage_bonus`];
        finalSetAttrs[`${newRepeatingString}damage_type`] = v[`${repeatingString}damage_type`];
        finalSetAttrs[`${newRepeatingString}second_damage_toggle`] = v[`${repeatingString}second_damage_toggle`];
        finalSetAttrs[`${newRepeatingString}second_damage`] = v[`${repeatingString}second_damage`];
        finalSetAttrs[`${newRepeatingString}second_damage_ability`] = v[`${repeatingString}second_damage_ability`];
        finalSetAttrs[`${newRepeatingString}second_damage_bonus`] = v[`${repeatingString}second_damage_bonus`];
        finalSetAttrs[`${newRepeatingString}second_damage_type`] = v[`${repeatingString}second_damage_type`];
        finalSetAttrs[`${newRepeatingString}heal`] = v[`${repeatingString}heal`];
        finalSetAttrs[`${newRepeatingString}heal_ability`] = v[`${repeatingString}heal_ability`];
        finalSetAttrs[`${newRepeatingString}heal_bonus`] = v[`${repeatingString}heal_bonus`];
        finalSetAttrs[`${newRepeatingString}heal_query_toggle`] = v[`${repeatingString}heal_query_toggle`];
        finalSetAttrs[`${newRepeatingString}extras_toggle`] = v[`${repeatingString}extras_toggle`];
        finalSetAttrs[`${newRepeatingString}emote`] = v[`${repeatingString}emote`];
        finalSetAttrs[`${newRepeatingString}freetext`] = v[`${repeatingString}freetext`];
        finalSetAttrs[`${newRepeatingString}display_text`] = v[`${repeatingString}freetext`];
        finalSetAttrs[`${newRepeatingString}freeform`] = v[`${repeatingString}freeform`];
      }

      setFinalAttrs(v, finalSetAttrs);
    });
  });
};

const setSkillStorageNames = () => {
  const repeatingItem = 'repeating_skill';
  const collectionArray = ['lang'];
  const finalSetAttrs = {};

  let repeatingString;

  getSectionIDs(repeatingItem, (ids) => {
    for (const id of ids) {
      repeatingString = `${repeatingItem}_${id}_`;
      collectionArray.push(`${repeatingString}storage_name`);
      collectionArray.push(`${repeatingString}name`);
    }

    getAttrs(collectionArray, (v) => {
      const language = v.lang;
      if (!language || language === 'en') {
        for (const id of ids) {
          repeatingString = `${repeatingItem}_${id}_`;

          const name = v[`${repeatingString}name`];
          if (!isUndefined(name)) {
            const storageName = getKeyByValue(TRANSLATIONS.en.SKILLS, name);
            if (storageName && isUndefined(v[`${repeatingString}storage_name`])) {
              finalSetAttrs[`${repeatingString}storage_name`] = storageName;
            }
          }
        }
        setFinalAttrs(v, finalSetAttrs);
      }
    });
  });
};
const generateSkills = () => {
  const repeatingItem = 'repeating_skill';
  const collectionArray = ['lang'];
  const finalSetAttrs = {};

  let repeatingString;

  getSectionIDs(repeatingItem, (ids) => {
    for (const id of ids) {
      repeatingString = `${repeatingItem}_${id}_`;
      collectionArray.push(`${repeatingString}storage_name`);
      collectionArray.push(`${repeatingString}name`);
      collectionArray.push(`${repeatingString}ability`);
    }

    getAttrs(collectionArray, (v) => {
      const language = v.lang || 'en';

      for (const prop in SKILLS) {
        if (SKILLS.hasOwnProperty(prop)) {
          let skillId;

          for (const id of ids) {
            repeatingString = `${repeatingItem}_${id}_`;
            if (v[`${repeatingString}storage_name`] === prop) {
              skillId = id;
              break;
            }
          }
          if (!skillId) {
            skillId = generateRowID();
          }
          repeatingString = `${repeatingItem}_${skillId}_`;

          finalSetAttrs[`${repeatingString}storage_name`] = prop;
          finalSetAttrs[`${repeatingString}name`] = translate(language, `SKILLS.${prop}`);
          finalSetAttrs[`${repeatingString}ability`] = `@{${SKILLS[prop]}_mod}`;
          updateSkill(skillId);
        }
      }
      setFinalAttrs(v, finalSetAttrs);
    });
  });
};
on('change:lang', () => {
  generateSkills();
  updateLevels();
});
on('change:generate_skills', () => {
  generateSkills();
});

on('change:pb', () => {
  updateSkill();
  updateAttack();
  updateSpell();
  updateJackOfAllTrades();
  updateRemarkableAthlete();
  updateAction('trait');
  updateAction('action');
  updateAction('reaction');
  updateAction('legendaryaction');
  updateAction('lairaction');
  updateAction('regionaleffect');
});

const extasToExtrasFix = (repeatingItem) => {
  const collectionArray = [];
  const finalSetAttrs = {};

  getSectionIDs(repeatingItem, (ids) => {
    for (const id of ids) {
      const repeatingString = `${repeatingItem}_${id}_`;
      collectionArray.push(`${repeatingString}extas_toggle`);
    }

    getAttrs(collectionArray, (v) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;

        const extrasToggle = v[`${repeatingString}extas_toggle`];
        if (!isUndefined(extrasToggle)) {
          finalSetAttrs[`${repeatingString}extras_toggle`] = extrasToggle;
        }
      }
      setFinalAttrs(v, finalSetAttrs);
    });
  });
};

const armorPlusDexRemoval = () => {
  const repeatingItem = 'repeating_armor';
  const collectionArray = [];
  const finalSetAttrs = {};

  getSectionIDs(repeatingItem, (ids) => {
    for (const id of ids) {
      const repeatingString = `${repeatingItem}_${id}_`;
      collectionArray.push(`${repeatingString}type`);
    }

    getAttrs(collectionArray, (v) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;

        const armorType = v[`${repeatingString}type`];
        if (armorType === 'Armor + Dex') {
          finalSetAttrs[`${repeatingString}type`] = 'Light Armor';
        }
      }
      setFinalAttrs(v, finalSetAttrs);
    });
  });
};

const fixRollTwo = () => {
  const collectionArray = ['roll_setting'];
  const finalSetAttrs = {};

  getAttrs(collectionArray, (v) => {
    if (v.roll_setting === '@{attr_roll_2}') {
      finalSetAttrs.roll_setting = '@{roll_2}';
    }
    setFinalAttrs(v, finalSetAttrs);
  });
};

const importData = () => {
  getAttrs(['import_data'], v => {
    if (v.import_data) {
      const finalSetAttrs = {};
      const importObject = JSON.parse(v.import_data);

      if (importObject.npc) {
        for (const prop in importObject.npc) {
          if (importObject.npc.hasOwnProperty(prop)) {
            finalSetAttrs[prop] = importObject.npc[prop];
          }
        }
      }
      if (importObject.spells) {
        importObject.spells.forEach(spell => {
          const repeatingString = `repeating_spell_${generateRowID()}_`;
          for (const prop in spell) {
            if (spell.hasOwnProperty(prop)) {
              finalSetAttrs[`${repeatingString}${prop}`] = spell[prop];
            }
          }
        });
      }
      finalSetAttrs.import_data = '';
      finalSetAttrs.import_data_present = 'off';
      setFinalAttrs(v, finalSetAttrs);
    }
  });
};

const deleteImportData = () => {
  setFinalAttrs({}, {
    import_data: '',
    import_data_present: 'off',
  });
};

const checkVersionFormat = (version, finalSetAttrs) => {
  const versionRegex = /\d+\.\d+\.\d+/gi;
  const versionIsProperFormat = versionRegex.exec(version);

  if (version && !versionIsProperFormat) {
    finalSetAttrs.version = version = currentVersion;
  }
  return version;
};

on('change:accept_import', importData);
on('change:reject_import', deleteImportData);

const sheetOpened = () => {
  const collectionArray = ['version', 'strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma', 'import_data'];
  const finalSetAttrs = {};

  getAttrs(collectionArray, (v) => {
    const version = checkVersionFormat(v.version, finalSetAttrs);

    if (!version) {
      if (!v.import_data) {
        finalSetAttrs.edit_mode = 'on';
      }
      finalSetAttrs.roll_info = '';
      finalSetAttrs.roll_setting = '@{roll_1}';
      const setAbilities = {};
      if (isUndefined(v.strength)) {
        setAbilities.strength = 10;
      }
      if (isUndefined(v.dexterity)) {
        setAbilities.dexterity = 10;
      }
      if (isUndefined(v.constitution)) {
        setAbilities.constitution = 10;
      }
      if (isUndefined(v.intelligence)) {
        setAbilities.intelligence = 10;
      }
      if (isUndefined(v.wisdom)) {
        setAbilities.wisdom = 10;
      }
      if (isUndefined(v.charisma)) {
        setAbilities.charisma = 10;
      }
      setFinalAttrs(v, setAbilities, () => {
        updatePb();
        generateSkills();
        updateSavingThrows();
        updateLevels();
        updateAbilityChecksMacro();
        updateInitiative();
        updateArmor();
      });
    } else {
      if (versionCompare(version, '2.0.10') < 0) {
        updateAbilityModifiers();
      }
      if (versionCompare(version, '2.0.14') < 0) {
        updateSkill();
        updateSavingThrows();
      }
      if (versionCompare(version, '2.1.0') < 0) {
        updateNPCChallenge();
        updateDamageVulnerabilities();
        updateDamageResistances();
        updateDamageImmunities();
        updateConditionImmunities();
        updateLanguages();
        updateSenses();
      }
      if (versionCompare(version, '2.1.3') < 0) {
        updateType();
        updateAlignment();
      }
      if (versionCompare(version, '2.1.5') < 0) {
        updateLevels();
        updateNPCAC();
        updateLanguageSelection();
      }
      if (versionCompare(version, '2.1.7') < 0) {
        setSkillStorageNames();
      }
      if (versionCompare(version, '2.1.10') < 0) {
        updateSavingThrows();
        updateAttack();
      }
      if (versionCompare(version, '2.1.11') < 0) {
        updateLevels();
        updateAbilityChecksMacro();
      }
      if (versionCompare(version, '2.1.13') < 0) {
        weighEquipment();
        updateSpell();
      }
      if (versionCompare(version, '2.1.14') < 0) {
        updateLevels();
      }
      if (versionCompare(version, '2.1.15') < 0) {
        updateLevels();
        displayTextForTraits();
      }
      if (versionCompare(version, '2.2.1') < 0) {
        updateAbilityModifiers();
      }
      if (versionCompare(version, '2.2.2') < 0) {
        resourcesToTraits();
      }
      if (versionCompare(version, '2.2.4') < 0) {
        updateInitiative();
      }
      if (versionCompare(version, '2.2.5') < 0) {
        weighAmmo();
      }
      if (versionCompare(version, '2.2.6') < 0) {
        updateLevels();
        extasToExtrasFix('repeating_attack');
        extasToExtrasFix('repeating_action');
        extasToExtrasFix('repeating_spell');
      }
      if (versionCompare(version, '2.2.8') < 0) {
        updateAttack();
      }
      if (versionCompare(version, '2.2.11') < 0) {
        setClassFeatures();
      }
      if (versionCompare(version, '2.2.12') < 0) {
        updateAbilityChecksMacro();
      }
      if (versionCompare(version, '2.2.15') < 0) {
        updateAbilityChecksMacro();
        updatePreAndPostRoll();
      }
      if (versionCompare(version, '2.2.19') < 0) {
        updateAbilityModifiers();
        updateSpell();
      }
      if (versionCompare(version, '2.3.3') < 0) {
        updateAttachers();
      }
      if (versionCompare(version, '2.4.2') < 0) {
        updateAbilityModifiers();
        updateSkill();
        updateActionChatMacro('trait');
        updateActionChatMacro('action');
        updateActionChatMacro('reaction');
        updateActionChatMacro('legendaryaction');
        updateActionChatMacro('lairaction');
        updateActionChatMacro('regionaleffect');
        updateDamageResistancesVar();
      }
      if (versionCompare(version, '2.4.3') < 0) {
        setClassFeatures();
      }
      if (versionCompare(version, '2.4.4') < 0) {
        updateSkill();
        updateAttack();
        updateSpell();
      }
      if (versionCompare(version, '2.4.7') < 0) {
        classFeaturesToTraits();
        updateAction('trait');
      }
      if (versionCompare(version, '2.4.8') < 0) {
        fixRollTwo();
      }
      if (versionCompare(version, '2.4.11') < 0) {
        updateSpell();
      }
      if (versionCompare(version, '2.4.12') < 0) {
        armorPlusDexRemoval();
        updateArmor();
      }
    }

    if (isUndefined(version) || !version || version !== currentVersion) {
      finalSetAttrs.version = currentVersion;
    }

    setFinalAttrs(v, finalSetAttrs);
  });
};

on('sheet:opened', () => {
  sheetOpened();
});
