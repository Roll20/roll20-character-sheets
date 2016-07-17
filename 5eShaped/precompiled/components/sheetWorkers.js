/* global setAttrs:false, getAttrs:false, on:false, getSectionIDs:false, generateRowID:false, getTranslationByKey:false */
'use strict';

const currentVersion = '5.2.1';
const SKILLS = {
  ACROBATICS: 'dexterity',
  ANIMALHANDLING: 'wisdom',
  ARCANA: 'intelligence',
  ATHLETICS: 'strength',
  DECEPTION: 'charisma',
  HISTORY: 'intelligence',
  INSIGHT: 'wisdom',
  INTIMIDATION: 'charisma',
  INVESTIGATION: 'intelligence',
  MEDICINE: 'wisdom',
  NATURE: 'intelligence',
  PERCEPTION: 'wisdom',
  PERFORMANCE: 'charisma',
  PERSUASION: 'charisma',
  RELIGION: 'intelligence',
  SLEIGHTOFHAND: 'dexterity',
  STEALTH: 'dexterity',
  SURVIVAL: 'wisdom',
};
const CLASSES = ['barbarian', 'bard', 'cleric', 'druid', 'fighter', 'monk', 'paladin', 'ranger', 'rogue', 'sorcerer', 'warlock', 'wizard'];
const ABILITIES = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];

const toggleVars = {
  roll: '{{vs_ac=1}} @{roll_info} {{roll1=[[@{shaped_d20}cs>@{crit_range} + @{attack_formula}]]}} @{roll_setting}cs>@{crit_range} + @{attack_formula}]]}} {{targetAC=@{attacks_vs_target_ac}}} {{targetName=@{attacks_vs_target_name}}}',
  saving_throw: '{{saving_throw_condition=@{saving_throw_condition}}} {{saving_throw_dc=@{saving_throw_dc}}} {{saving_throw_vs_ability=@{saving_throw_vs_ability}}} {{saving_throw_failure=@{saving_throw_failure}}} {{saving_throw_success=@{saving_throw_success}}} {{targetName=@{attacks_vs_target_name}}}',
  damage: '{{damage=[[@{damage_formula}]]}} {{damage_type=@{damage_type}}} {{crit_damage=[[0d0 + @{damage_crit}[crit damage] @{damage_crit_formula}]]}}',
  second_damage: '{{second_damage=[[@{second_damage_formula}]]}} {{second_damage_type=@{second_damage_type}}} {{second_crit_damage=[[0d0 + @{second_damage_crit}[crit damage] @{second_damage_crit_formula}]]}}',
  heal: '{{heal=[[@{heal_formula}]]}}',
  heal_query: '?{Heal Bonus Amount|}',
  extras: '{{emote=@{emote}}} {{freetext=@{freetext}}} @{freeform}',
  higher_level: '{{cast_as_level=@{higher_level_query}}}',
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
const calculatePercentDifference = (oldValue, newValue) => {
  return Math.abs(((oldValue - newValue) / oldValue) * 100);
};
const isUndefined = (value) => {
  if (typeof value === 'undefined') {
    return true;
  }
  return false;
};
const isUndefinedOrEmpty = (value) => {
  if (typeof value === 'undefined' || value === '') {
    return true;
  }
  return false;
};
const getIntValue = (value, defaultValue) => {
  if (!defaultValue) {
    defaultValue = 0;
  }
  if (value === 0 || value === '0') {
    return 0;
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
  if (isUndefinedOrEmpty(value) || value === '' || value === '0' || value === 0) {
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
const getAbilityValue = (v, varName) => {
  if (exists(varName)) {
    varName = getAbilityModName(varName);
    return getIntValue(v[`${varName}_mod`], 0);
  }
  return 0;
};
const getAbilityShortName = (varName, capital) => {
  if (!varName) {
    return 'Str';
  }
  varName = varName.replace(/\W/g, '');
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

  if (isUndefinedOrEmpty(parsed)) {
    parsed = finalSetAttrs[`${repeatingString}parsed`];
  }

  if (isUndefinedOrEmpty(parsed) || parsed.indexOf(options.parseName) === -1) {
    let aTriggerFieldExists = false;

    if (options.triggerFields) {
      for (const triggerField of options.triggerFields) {
        if (!isUndefinedOrEmpty(v[`${repeatingString}${triggerField}`])) {
          aTriggerFieldExists = true;
        }
      }
    }
    if (aTriggerFieldExists && isUndefinedOrEmpty(v[repeatingString + options.toggleField])) {
      finalSetAttrs[repeatingString + options.toggleField] = options.toggleFieldSetTo;

      if (isUndefinedOrEmpty(finalSetAttrs[`${repeatingString}parsed`])) {
        finalSetAttrs[`${repeatingString}parsed`] = '';
      }
      finalSetAttrs[`${repeatingString}parsed`] += ` ${options.parseName}`;
    }
    if (options.attackAbility && isUndefined(v[`${repeatingString}attack_ability`])) {
      finalSetAttrs[`${repeatingString}attack_ability`] = v.default_ability;
    }

    if (options.addCastingModifier) {
      if (!isUndefinedOrEmpty(v[`${repeatingString}damage`]) && isUndefined(v[`${repeatingString}damage_ability`])) {
        finalSetAttrs[`${repeatingString}damage_ability`] = v.default_ability;
      }
      if (!isUndefinedOrEmpty(v[`${repeatingString}heal`]) && isUndefined(v[`${repeatingString}heal_ability`])) {
        finalSetAttrs[`${repeatingString}heal_ability`] = v.default_ability;
      }
    }
    if (options.addSecondCastingModifier) {
      if (!isUndefinedOrEmpty(v[`${repeatingString}second_damage`]) && isUndefined(v[`${repeatingString}second_damage_ability`])) {
        finalSetAttrs[`${repeatingString}second_damage_ability`] = v.default_ability;
      }
    }
  }
};
const hasUpperCase = (string) => {
  return (/[A-Z]/.test(string));
};
const ordinalSpellLevel = (level) => {
  let spellLevel = '';
  level = getIntValue(level);
  if (level === 0) {
    spellLevel = 'CANTRIP';
  } else {
    switch (level % 10) {
      case 1:
        spellLevel = `${level}ST_LEVEL`;
        break;
      case 2:
        spellLevel = `${level}ND_LEVEL`;
        break;
      case 3:
        spellLevel = `${level}RD_LEVEL`;
        break;
      default:
        spellLevel = `${level}TH_LEVEL`;
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
        finalSetAttrs[repeatingString + fieldName] = 'intelligence';
      } else if (closest === spellMods[1]) {
        finalSetAttrs[repeatingString + fieldName] = 'wisdom';
      } else if (closest === spellMods[2]) {
        finalSetAttrs[repeatingString + fieldName] = 'charisma';
      }
    } else {
      if (rangedAttack) {
        finalSetAttrs[`${repeatingString}attack_ability`] = 'dexterity';
        bonus -= dexMod;
      } else {
        closest = findClosest(meleeMods, bonus);
        bonus -= closest;
        if (closest === meleeMods[0]) {
          finalSetAttrs[repeatingString + fieldName] = 'strength';
        } else if (closest === meleeMods[1]) {
          finalSetAttrs[repeatingString + fieldName] = 'dexterity';
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
      finalSetAttrs[repeatingString + fieldName] = 'strength';
    } else if (closest === abilityMods[1]) {
      finalSetAttrs[repeatingString + fieldName] = 'dexterity';
    } else if (closest === abilityMods[2]) {
      finalSetAttrs[repeatingString + fieldName] = 'constitution';
    } else if (closest === abilityMods[3]) {
      finalSetAttrs[repeatingString + fieldName] = 'intelligence';
    } else if (closest === abilityMods[4]) {
      finalSetAttrs[repeatingString + fieldName] = 'wisdom';
    } else if (closest === abilityMods[5]) {
      finalSetAttrs[repeatingString + fieldName] = 'charisma';
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

const camelize = (str) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
    if (+match === 0) return '';
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
};

const getSetItems = (obj) => {
  const collectionArray = obj.collectionArray || [];
  const finalSetAttrs = {};

  getAttrs(collectionArray, (v) => {
    if (obj.callback) {
      obj.callback(v, finalSetAttrs);
    }
    setFinalAttrs(v, finalSetAttrs, () => {
      if (obj.setFinalAttrsCallback) {
        obj.setFinalAttrsCallback();
      }
    });
    if (obj.returnCallback) {
      obj.returnCallback();
    }
  });
};

const getSetRepeatingItems = (obj) => {
  const collectionArray = obj.collectionArray || [];
  const finalSetAttrs = {};

  if (obj.repeatingItems) {
    for (const repeatingItem of obj.repeatingItems) {
      getSectionIDs(repeatingItem, (ids) => {
        if (obj.rowId) {
          ids = [];
          ids.push(obj.rowId);
        }
        if (ids) {
          for (const id of ids) {
            const repeatingString = `${repeatingItem}_${id}_`;
            if (obj.collectionArrayAddItems) {
              for (const addItem of obj.collectionArrayAddItems) {
                collectionArray.push(`${repeatingString}${addItem}`);
              }
            }
            if (obj.itemsToPush) {
              for (const itemToPush of obj.itemsToPush) {
                collectionArray.push(`${repeatingString}${itemToPush}_${obj.itemToPushSuffix}`);
              }
            }
          }
        }
        getAttrs(collectionArray, (v) => {
          if (obj.callback) {
            obj.callback(v, finalSetAttrs, ids, repeatingItem);
          }
          setFinalAttrs(v, finalSetAttrs, () => {
            if (obj.setFinalAttrsCallback) {
              obj.setFinalAttrsCallback();
            }
          });
          if (obj.returnCallback) {
            obj.returnCallback();
          }
        });
      });
    }
  }
};

const calculateGold = () => {
  getSetItems({
    collectionArray: ['cp', 'copper_per_gold', 'sp', 'silver_per_gold', 'ep', 'electrum_per_gold', 'gp', 'pp', 'platinum_per_gold'],
    callback: (v, finalSetAttrs) => {
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
    },
  });
};
on('change:cp change:copper_per_gold change:sp change:silver_per_gold change:ep change:electrum_per_gold change:gp change:pp change:platinum_per_gold', () => {
  calculateGold();
});

const updateAbilityModifier = (ability) => {
  const collectionArray = [ability, `${ability}_bonus`, `${ability}_mod`, `${ability}_mod_with_sign`, `${ability}_check_mod`, `${ability}_check_mod_formula`, `${ability}_check_bonus`, 'global_ability_bonus', 'strength_mod', 'dexterity_mod', 'jack_of_all_trades_toggle', 'jack_of_all_trades', 'remarkable_athlete_toggle', 'remarkable_athlete', 'global_check_bonus'];
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

  getSetItems({
    collectionArray,
    callback: (v, finalSetAttrs) => {
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
      let abilityCheckFormula = '';

      if (abilityMod !== 0) {
        abilityCheckFormula = `${abilityMod}[${firstThree(ability)} mod with bonus]`;
      }
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
        if (abilityCheckFormula) {
          abilityCheckFormula += ' + ';
        }
        abilityCheckFormula += '(@{global_check_bonus})[global check bonus]';
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
    },
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
  if (!obj.name) {
    obj.name = obj.storageName;
  }
  const collectionArrayAddItems = ['storage_name', 'name', 'uses', 'freetext', 'saving_throw_toggle', 'damage_toggle', 'heal_toggle', 'extras_toggle', 'display_text'];
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      collectionArrayAddItems.push(prop);
    }
  }
  let itemId;
  let repeatingString;

  getSetRepeatingItems({
    repeatingItems: ['repeating_trait'],
    collectionArrayAddItems,
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
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
      if (!obj.clear && isUndefinedOrEmpty(v[`${repeatingString}storage_name`])) {
        finalSetAttrs[`${repeatingString}storage_name`] = obj.storageName;
      }
      if (!obj.clear && v[`${repeatingString}name`] !== obj.name) {
        finalSetAttrs[`${repeatingString}name`] = obj.name;
      }
      delete obj.storageName;

      if (obj.clear) {
        delete obj.clear;
        for (const prop in obj) {
          if (obj.hasOwnProperty(prop) && !isUndefinedOrEmpty(v[`${repeatingString}${prop}`])) {
            finalSetAttrs[`${repeatingString}${prop}`] = obj[prop];
          }
        }
      } else {
        for (const prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            if ((prop === 'name' || prop === 'freetext') && (isUndefinedOrEmpty(v[`${repeatingString}${prop}`]) || calculatePercentDifference(v[`${repeatingString}${prop}`].length, obj[prop].length) < 10)) {
              finalSetAttrs[`${repeatingString}${prop}`] = obj[prop];
            } else if (v[`${repeatingString}${prop}`] !== obj[prop]) {
              finalSetAttrs[`${repeatingString}${prop}`] = obj[prop];
            }
          }
        }
        if (obj.saving_throw_ability || obj.saving_throw_bonus || obj.saving_throw_vs_ability) {
          finalSetAttrs[`${repeatingString}saving_throw_toggle`] = toggleVars.saving_throw;
        }
        if (obj.damage || obj.damage_ability || obj.damage_bonus) {
          finalSetAttrs[`${repeatingString}damage_toggle`] = toggleVars.damage;
        }
        if (obj.heal || obj.heal_ability || obj.heal_bonus || obj.heal_query_toggle) {
          finalSetAttrs[`${repeatingString}heal_toggle`] = toggleVars.heal;
        }
        if (obj.freetext && isUndefinedOrEmpty(v[`${repeatingString}extras_toggle`])) {
          finalSetAttrs[`${repeatingString}extras_toggle`] = toggleVars.extras;
        }
        if (obj.uses_max && !obj.uses && isUndefinedOrEmpty(v[`${repeatingString}uses`])) {
          finalSetAttrs[`${repeatingString}uses`] = obj.uses_max;
        }
        if (obj.freetext && repeatingItem === 'repeating_trait' && (isUndefinedOrEmpty(v[`${repeatingString}display_text`]) ||
          calculatePercentDifference(v[`${repeatingString}display_text`].length, obj.freetext.length) < 10)) {
          finalSetAttrs[`${repeatingString}display_text`] = obj.freetext;
        }
      }
    },
    returnCallback: () => {
      return itemId;
    },
  });
};

const setClassFeatures = () => {
  const collectionArray = ['ac_unarmored_ability', 'jack_of_all_trades_toggle', 'careful_spell_toggle', 'distant_spell_toggle', 'empowered_spell_toggle', 'extended_spell_toggle', 'heightened_spell_toggle', 'quickened_spell_toggle', 'subtle_spell_toggle', 'twinned_spell_toggle'];
  for (const ability of ABILITIES) {
    collectionArray.push(`${ability}_mod`);
  }
  for (const className of CLASSES) {
    collectionArray.push(`${className}_level`);
  }

  getSetItems({
    collectionArray,
    callback: (v, finalSetAttrs) => {
      if (v.fighter_level >= 5) {
        let extraAttackTimes;
        if (v.fighter_level >= 20) {
          extraAttackTimes = getTranslationByKey('CLASS_FEATURE_EXTRA_ATTACK_FOUR');
        } else if (v.fighter_level >= 11) {
          extraAttackTimes = getTranslationByKey('CLASS_FEATURE_EXTRA_ATTACK_THREE');
        } else {
          extraAttackTimes = getTranslationByKey('CLASS_FEATURE_EXTRA_ATTACK_TWICE');
        }
        setTrait({
          freetext: getTranslationByKey('CLASS_FEATURE_EXTRA_ATTACK_TEXT').replace('NUMBER_OF_TIMES', extraAttackTimes),
          name: getTranslationByKey('CLASS_FEATURE_EXTRA_ATTACK'),
          storageName: 'Extra Attack',
        });
      } else if (v.barbarian_level >= 5 || v.monk_level >= 5 || v.paladin_level >= 5 || v.ranger_level >= 5) {
        setTrait({
          freetext: getTranslationByKey('CLASS_FEATURE_EXTRA_ATTACK_TEXT').replace('NUMBER_OF_TIMES', getTranslationByKey('CLASS_FEATURE_EXTRA_ATTACK_TWICE')),
          name: getTranslationByKey('CLASS_FEATURE_EXTRA_ATTACK'),
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
          freetext: getTranslationByKey('CLASS_FEATURE_RAGE_TEXT').replace('RAGE_DAMAGE', rageDamage),
          name: getTranslationByKey('CLASS_FEATURE_RAGE'),
          recharge: 'Long Rest',
          storageName: 'Rage',
          uses_max: rageUses,
        });

        if (isUndefinedOrEmpty(v.ac_unarmored_ability)) {
          finalSetAttrs.ac_unarmored_ability = 'constitution';
        }
        setTrait({
          freetext: getTranslationByKey('CLASS_FEATURE_UNARMORED_DEFENSE_BARBARIAN_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_UNARMORED_DEFENSE'),
          storageName: 'Unarmored Defense Barbarian',
        });

        if (v.barbarian_level >= 2) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_RECKLESS_ATTACK_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_RECKLESS_ATTACK'),
            storageName: 'Reckless Attack',
          });
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_DANGER_SENSE_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_DANGER_SENSE'),
            storageName: 'Danger Sense',
          });
        }
        if (v.barbarian_level >= 5) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_FAST_MOVEMENT_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_FAST_MOVEMENT'),
            storageName: 'Fast Movement',
          });
        }
        if (v.barbarian_level >= 7) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_FERAL_INSTINCT_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_FERAL_INSTINCT'),
            storageName: 'Feral Instinct',
          });
        }
        if (v.barbarian_level >= 9) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_BRUTAL_CRITICAL_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_BRUTAL_CRITICAL'),
            storageName: 'Brutal Critical',
          });
        }
        if (v.barbarian_level >= 11) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_RELENTLESS_RAGE_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_RELENTLESS_RAGE'),
            storageName: 'Relentless Rage',
          });
        }
        if (v.barbarian_level >= 15) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_PERSISTENT_RAGE_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_PERSISTENT_RAGE'),
            storageName: 'Persistent Rage',
          });
        }
        if (v.barbarian_level >= 18) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_INDOMITABLE_MIGHT_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_INDOMITABLE_MIGHT'),
            storageName: 'Indomitable Might',
          });
        }
        if (v.barbarian_level >= 20) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_PRIMAL_CHAMPION_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_PRIMAL_CHAMPION'),
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
          freetext: getTranslationByKey('CLASS_FEATURE_BARDIC_INSPIRATION_TEXT').replace('d6', die),
          name: getTranslationByKey('CLASS_FEATURE_BARDIC_INSPIRATION'),
          recharge,
          storageName: 'Bardic Inspiration',
          uses_max: Math.max(getIntValue(v.charisma_mod), 1),
        });

        if (v.bard_level >= 2) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_JACK_OF_ALL_TRADES_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_JACK_OF_ALL_TRADES'),
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
            freetext: getTranslationByKey('CLASS_FEATURE_SONG_OF_REST_TEXT'),
            heal,
            name: getTranslationByKey('CLASS_FEATURE_SONG_OF_REST'),
            storageName: 'Song of Rest',
          });
        }
        if (v.bard_level >= 3) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_EXPERTISE_BARD_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_EXPERTISE'),
            storageName: 'Expertise Bard',
          });
        }
        if (v.bard_level >= 6) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_COUNTERCHARM_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_COUNTERCHARM'),
            storageName: 'Countercharm',
          });
        }
        if (v.bard_level >= 10) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_MAGICAL_SECRETS_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_MAGICAL_SECRETS'),
            storageName: 'Magical Secrets',
          });
        }
        if (v.bard_level >= 20) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_SUPERIOR_INSPIRATION_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_SUPERIOR_INSPIRATION'),
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
            freetext: getTranslationByKey('CLASS_FEATURE_CHANNEL_DIVINITY_CLERIC_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_CHANNEL_DIVINITY'),
            recharge: 'Short Rest',
            storageName: 'Channel Divinity Cleric',
            uses_max: channelDivinityUses,
          });

          let turnUndeadText = getTranslationByKey('CLASS_FEATURE_CHANNEL_DIVINITY_TURN_UNDEAD_TEXT');
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
            turnUndeadText += `\n${getTranslationByKey('CLASS_FEATURE_CHANNEL_DIVINITY_TURN_UNDEAD_TEXT_PART_2').replace('CHALLENGE_RATING', turnUndeadDestroyCR)}`;
          }
          setTrait({
            freetext: turnUndeadText,
            name: getTranslationByKey('CLASS_FEATURE_CHANNEL_DIVINITY_TURN_UNDEAD'),
            saving_throw_ability: 'wisdom',
            saving_throw_vs_ability: 'WISDOM',
            storageName: 'Turn Undead',
          });
          if (v.cleric_level >= 10) {
            setTrait({
              freeform: '{{text_top=[[d100]] > [[@{cleric_level}]]}}',
              freetext: getTranslationByKey('CLASS_FEATURE_DIVINE_INTERVENTION_TEXT'),
              name: getTranslationByKey('CLASS_FEATURE_DIVINE_INTERVENTION'),
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
            wildShapeLimitations = getTranslationByKey('CLASS_FEATURE_WILD_SHAPE_NO_FLYING');
          } else if (v.druid_level >= 8) {
            wildShapeCR = 1;
            wildShapeLimitations = '';
          } else {
            wildShapeCR = '1/4';
            wildShapeLimitations = getTranslationByKey('CLASS_FEATURE_WILD_SHAPE_NO_FLYING_OR_SWIMMING');
          }
          if (v.druid_level >= 20) {
            wildShapeUses = 999999;
          } else {
            wildShapeUses = 2;
          }
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_WILD_SHAPE_TEXT').replace('WILD_SHAPE_HOURS', wildShapeHours).replace('CHALLENGE_RATING', wildShapeCR).replace('LIMITATIONS', ` ${wildShapeLimitations}`),
            name: getTranslationByKey('CLASS_FEATURE_WILD_SHAPE'),
            recharge: 'Short Rest',
            storageName: 'Wild Shape',
            uses_max: wildShapeUses,
          });
        }
        if (v.druid_level >= 18) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_TIMELESS_BODY_DRUID_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_TIMELESS_BODY'),
            storageName: 'Timeless Body',
          });
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_BEAST_SPELLS_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_BEAST_SPELLS'),
            storageName: 'Beast Spells',
          });
        }
        if (v.druid_level >= 20) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_ARCHDRUID_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_ARCHDRUID'),
            storageName: 'Archdruid',
          });
        }
      }

      if (v.fighter_level) {
        setTrait({
          freetext: `${getTranslationByKey('CLASS_FEATURE_FIGHTING_STYLE_TEXT')} ${getTranslationByKey('CLASS_FEATURE_FIGHTING_STYLE_FIGHTER_OPTIONS')}`,
          name: getTranslationByKey('CLASS_FEATURE_FIGHTING_STYLE'),
          storageName: 'Fighting Style',
        });
        setTrait({
          freetext: getTranslationByKey('CLASS_FEATURE_SECOND_WIND_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_SECOND_WIND'),
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
            freetext: getTranslationByKey('CLASS_FEATURE_ACTION_SURGE_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_ACTION_SURGE'),
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
            freetext: getTranslationByKey('CLASS_FEATURE_INDOMITABLE_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_INDOMITABLE'),
            recharge: 'Long Rest',
            storageName: 'Indomitable',
            uses_max: indomitableUses,
          });
        }
      }

      if (v.monk_level) {
        if (isUndefinedOrEmpty(v.ac_unarmored_ability)) {
          finalSetAttrs.ac_unarmored_ability = 'wisdom';
        }
        setTrait({
          freetext: getTranslationByKey('CLASS_FEATURE_UNARMORED_DEFENSE_MONK_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_UNARMORED_DEFENSE'),
          storageName: 'Unarmored Defense Monk',
        });
        setTrait({
          freetext: getTranslationByKey('CLASS_FEATURE_MARTIAL_ARTS_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_MARTIAL_ARTS'),
          storageName: 'Martial Arts',
        });
        if (v.monk_level >= 2) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_KI_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_KI'),
            recharge: 'Short Rest',
            storageName: 'Ki',
            uses_max: v.monk_level,
          });
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_FLURRY_OF_BLOWS_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_FLURRY_OF_BLOWS'),
            storageName: 'Flurry of Blows',
          });
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_PATIENT_DEFENSE_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_PATIENT_DEFENSE'),
            storageName: 'Patient Defense',
          });
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_STEP_OF_THE_WIND_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_STEP_OF_THE_WIND'),
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
            freetext: getTranslationByKey('CLASS_FEATURE_UNARMORED_MOVEMENT_TEXT').replace('UNARMORED_MOVEMENT_FEET', unarmoredMovementFeet),
            name: getTranslationByKey('CLASS_FEATURE_UNARMORED_MOVEMENT'),
            storageName: 'Unarmored Movement',
          });
        }
        if (v.monk_level >= 3) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_DEFLECT_MISSILES_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_DEFLECT_MISSILES'),
            storageName: 'Deflect Missiles',
          });
        }
        if (v.monk_level >= 4) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_SLOW_FALL_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_SLOW_FALL'),
            storageName: 'Slow Fall',
          });
        }
        if (v.monk_level >= 5) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_STUNNING_STRIKE_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_STUNNING_STRIKE'),
            saving_throw_ability: 'wisdom',
            saving_throw_failure: getTranslationByKey('CLASS_FEATURE_STUNNING_STRIKE_SAVING_THROW_FAILURE'),
            saving_throw_vs_ability: 'CONSTITUTION',
            storageName: 'Stunning Strike',
          });
        }
        if (v.monk_level >= 6) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_KI_EMPOWERED_STRIKES_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_KI_EMPOWERED_STRIKES'),
            storageName: 'Ki-Empowered Strikes',
          });
        }
        if (v.monk_level >= 7) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_EVASION_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_EVASION'),
            storageName: 'Evasion',
          });
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_STILLNESS_OF_MIND_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_STILLNESS_OF_MIND'),
            storageName: 'Stillness of Mind',
          });
        }
        if (v.monk_level >= 10) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_PURITY_OF_BODY_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_PURITY_OF_BODY'),
            storageName: 'Purity of Body',
          });
        }
        if (v.monk_level >= 13) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_TONGUE_OF_THE_SUN_AND_MOON_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_TONGUE_OF_THE_SUN_AND_MOON'),
            storageName: 'Tongue of the Sun and Moon',
          });
        }
        if (v.monk_level >= 14) {
          finalSetAttrs.death_saving_throw_prof = '@{pb}';
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_DIAMOND_SOUL_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_DIAMOND_SOUL'),
            storageName: 'Diamond Soul',
          });
        }
        if (v.monk_level >= 15) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_TIMELESS_BODY_MONK_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_TIMELESS_BODY'),
            storageName: 'Timeless Body',
          });
        }
        if (v.monk_level >= 15) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_EMPTY_BODY_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_EMPTY_BODY'),
            storageName: 'Empty Body',
          });
        }
        if (v.monk_level >= 20) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_PERFECT_SELF_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_PERFECT_SELF'),
            storageName: 'Perfect Self',
          });
        }
      }

      if (v.paladin_level) {
        setTrait({
          freetext: getTranslationByKey('CLASS_FEATURE_DIVINE_SENSE_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_DIVINE_SENSE'),
          recharge: 'Long Rest',
          storageName: 'Divine Sense',
          uses_max: Math.max(1 + v.charisma_mod, 1),
        });
        setTrait({
          freetext: getTranslationByKey('CLASS_FEATURE_LAY_ON_HANDS_TEXT'),
          heal_query_toggle: toggleVars.heal_query,
          name: getTranslationByKey('CLASS_FEATURE_LAY_ON_HANDS'),
          recharge: 'Long Rest',
          storageName: 'Lay on Hands',
          uses_max: 5 * v.paladin_level,
        });

        if (v.paladin_level >= 2) {
          setTrait({
            freetext: `${getTranslationByKey('CLASS_FEATURE_FIGHTING_STYLE_TEXT')} ${getTranslationByKey('CLASS_FEATURE_FIGHTING_STYLE_PALADIN_OPTIONS')}`,
            name: getTranslationByKey('CLASS_FEATURE_FIGHTING_STYLE'),
            storageName: 'Fighting Style',
          });
          setTrait({
            damage: '(?{Spell Level|1|2|3|4+, 4} + 1)d8',
            damage_type: getTranslationByKey('RADIANT'),
            freeform: '{{subheader=(as ?{Spell Level|1|2|3|4+})}}',
            freetext: getTranslationByKey('CLASS_FEATURE_DIVINE_SMITE_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_DIVINE_SMITE'),
            second_damage: 'd8',
            second_damage_type: getTranslationByKey('VS_FIEND_OR_UNDEAD'),
            storageName: 'Divine Smite',
          });
        }
        if (v.paladin_level >= 3) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_DIVINE_HEALTH_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_DIVINE_HEALTH'),
            storageName: 'Divine Health',
          });
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_CHANNEL_DIVINITY_PALADIN_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_CHANNEL_DIVINITY'),
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
            freetext: getTranslationByKey('CLASS_FEATURE_AURA_OF_PROTECTION_TEXT').replace('AURA_RANGE', auraRange),
            name: getTranslationByKey('CLASS_FEATURE_AURA_OF_PROTECTION'),
            storageName: 'Aura of Protection',
          });

          if (v.paladin_level >= 10) {
            setTrait({
              freetext: getTranslationByKey('CLASS_FEATURE_AURA_OF_COURAGE_TEXT').replace('AURA_RANGE', auraRange),
              name: getTranslationByKey('CLASS_FEATURE_AURA_OF_COURAGE'),
              storageName: 'Aura of Courage',
            });
          }
        }
        if (v.paladin_level >= 11) {
          setTrait({
            damage: '1d8',
            damage_ability: '',
            damage_type: 'radiant',
            freetext: getTranslationByKey('CLASS_FEATURE_IMPROVED_DIVINE_SMITE_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_IMPROVED_DIVINE_SMITE'),
            storageName: 'Improved Divine Smite',
          });
        }
        if (v.paladin_level >= 14) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_CLEANSING_TOUCH_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_CLEANSING_TOUCH'),
            recharge: 'Long Rest',
            storageName: 'Cleaning Touch',
            uses_max: Math.max(getIntValue(v.charisma_mod), 1),
          });
        }
      }

      if (v.ranger_level) {
        setTrait({
          freetext: getTranslationByKey('CLASS_FEATURE_FAVORED_ENEMY_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_FAVORED_ENEMY'),
          storageName: 'Favored Enemy',
        });
        setTrait({
          freetext: getTranslationByKey('CLASS_FEATURE_NATURAL_EXPLORER_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_NATURAL_EXPLORER'),
          storageName: 'Natural Explorer',
        });
        if (v.ranger_level >= 2) {
          setTrait({
            freetext: `${getTranslationByKey('CLASS_FEATURE_FIGHTING_STYLE_TEXT')} ${getTranslationByKey('CLASS_FEATURE_FIGHTING_STYLE_RANGER_OPTIONS')}`,
            name: getTranslationByKey('CLASS_FEATURE_FIGHTING_STYLE'),
            storageName: 'Fighting Style',
          });
        }
        if (v.ranger_level >= 3) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_PRIMEVAL_AWARENESS_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_PRIMEVAL_AWARENESS'),
            storageName: 'Primeval Awareness',
          });
        }
        if (v.ranger_level >= 8) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_LANDS_STRIDE_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_LANDS_STRIDE'),
            storageName: 'Land\'s Stride',
          });
        }
        if (v.ranger_level >= 10) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_HIDE_IN_PLAIN_SIGHT_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_HIDE_IN_PLAIN_SIGHT'),
            storageName: 'Hide in Plain Sight',
          });
        }
        if (v.ranger_level >= 14) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_VANISH_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_VANISH'),
            storageName: 'Vanish',
          });
        }
        if (v.ranger_level >= 18) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_FERAL_SENSES_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_FERAL_SENSES'),
            storageName: 'Feral Senses',
          });
        }
        if (v.ranger_level >= 20) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_FOE_SLAYER_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_FOE_SLAYER'),
            storageName: 'Foe Slayer',
          });
        }
      }

      if (v.rogue_level) {
        setTrait({
          freetext: getTranslationByKey('CLASS_FEATURE_EXPERTISE_ROGUE_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_EXPERTISE'),
          storageName: 'Expertise Rogue',
        });
        setTrait({
          damage: `${Math.ceil(getIntValue(v.rogue_level) / 2)}d6`,
          freetext: getTranslationByKey('CLASS_FEATURE_SNEAK_ATTACK_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_SNEAK_ATTACK'),
          storageName: 'Sneak Attack',
        });
        setTrait({
          freetext: getTranslationByKey('CLASS_FEATURE_THIEVES_CANT_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_THIEVES_CANT'),
          storageName: 'Thieves\' Cant',
        });
        if (v.rogue_level >= 2) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_CUNNING_ACTION_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_CUNNING_ACTION'),
            storageName: 'Cunning Action',
          });
        }
        if (v.rogue_level >= 5) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_UNCANNY_DODGE_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_UNCANNY_DODGE'),
            storageName: 'Uncanny Dodge',
          });
        }
        if (v.rogue_level >= 7) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_EVASION_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_EVASION'),
            storageName: 'Evasion',
          });
        }
        if (v.rogue_level >= 11) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_RELIABLE_TALENT_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_RELIABLE_TALENT'),
            storageName: 'Reliable Talent',
          });
        }
        if (v.rogue_level >= 14) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_BLINDSENSE_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_BLINDSENSE'),
            storageName: 'Blindsense',
          });
        }
        if (v.rogue_level >= 15) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_SLIPPERY_MIND_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_SLIPPERY_MIND'),
            storageName: 'Slippery Mind',
          });
        }
        if (v.rogue_level >= 18) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_ELUSIVE_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_ELUSIVE'),
            storageName: 'Elusive',
          });
        }
        if (v.rogue_level >= 20) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_STROKE_OF_LUCK_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_STROKE_OF_LUCK'),
            recharge: 'Short Rest',
            storageName: 'Stroke of Luck',
            uses_max: 1,
          });
        }
      }

      if (v.sorcerer_level) {
        if (v.sorcerer_level >= 2) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_SORCERY_POINTS_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_SORCERY_POINTS'),
            recharge: 'Long Rest',
            storageName: 'Sorcery Points',
            uses_max: v.sorcerer_level,
          });
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_FLEXIBLE_CASTING_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_FLEXIBLE_CASTING'),
            storageName: 'Flexible Casting',
          });
          if (v.sorcerer_level >= 3) {
            setTrait({
              freetext: getTranslationByKey('CLASS_FEATURE_METAMAGIC_TEXT'),
              name: getTranslationByKey('CLASS_FEATURE_METAMAGIC'),
              storageName: 'Metamagic',
            });
          }
          if (v.sorcerer_level >= 20) {
            setTrait({
              freetext: getTranslationByKey('CLASS_FEATURE_SORCEROUS_RESTORATION_TEXT'),
              name: getTranslationByKey('CLASS_FEATURE_SORCEROUS_RESTORATION'),
              storageName: 'Sorcerous Restoration',
            });
          }
        }
      }

      if (v.careful_spell_toggle === '1') {
        setTrait({
          freetext: getTranslationByKey('CLASS_FEATURE_METAMAGIC_CAREFUL_SPELL_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_METAMAGIC_CAREFUL_SPELL'),
          storageName: 'Careful Spell',
        });
      }
      if (v.distant_spell_toggle === '1') {
        setTrait({
          freetext: getTranslationByKey('CLASS_FEATURE_METAMAGIC_DISTANT_SPELL_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_METAMAGIC_DISTANT_SPELL'),
          storageName: 'Distant Spell',
        });
      }
      if (v.empowered_spell_toggle === '1') {
        setTrait({
          freetext: getTranslationByKey('CLASS_FEATURE_METAMAGIC_EMPOWERED_SPELL_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_METAMAGIC_EMPOWERED_SPELL'),
          storageName: 'Empowered Spell',
        });
      }
      if (v.extended_spell_toggle === '1') {
        setTrait({
          freetext: getTranslationByKey('CLASS_FEATURE_METAMAGIC_EXTENDED_SPELL_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_METAMAGIC_EXTENDED_SPELL'),
          storageName: 'Extended Spell',
        });
      }
      if (v.heightened_spell_toggle === '1') {
        setTrait({
          freetext: getTranslationByKey('CLASS_FEATURE_METAMAGIC_HEIGHTENED_SPELL_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_METAMAGIC_HEIGHTENED_SPELL'),
          storageName: 'Heightened Spell',
        });
      }
      if (v.quickened_spell_toggle === '1') {
        setTrait({
          freetext: getTranslationByKey('CLASS_FEATURE_METAMAGIC_QUICKENED_SPELL_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_METAMAGIC_QUICKENED_SPELL'),
          storageName: 'Quickened Spell',
        });
      }
      if (v.subtle_spell_toggle === '1') {
        setTrait({
          freetext: getTranslationByKey('CLASS_FEATURE_METAMAGIC_SUBTLE_SPELL_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_METAMAGIC_SUBTLE_SPELL'),
          storageName: 'Subtle Spell',
        });
      }
      if (v.twinned_spell_toggle === '1') {
        setTrait({
          freetext: getTranslationByKey('CLASS_FEATURE_METAMAGIC_TWINNED_SPELL_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_METAMAGIC_TWINNED_SPELL'),
          storageName: 'Twinned Spell',
        });
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
          freetext: getTranslationByKey('CLASS_FEATURE_WARLOCK_SPELL_SLOTS_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_WARLOCK_SPELL_SLOTS'),
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
            freetext: getTranslationByKey('CLASS_FEATURE_ELDRITCH_INVOCATIONS_TEXT').replace('NUMBER_OF_INVOCATIONS_KNOWN', eldritchInvocations),
            name: getTranslationByKey('CLASS_FEATURE_ELDRITCH_INVOCATIONS'),
            storageName: 'Eldritch Invocations',
          });
        }
        if (v.warlock_level >= 3) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_PACT_BOON_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_PACT_BOON'),
            storageName: 'Pact Boon',
          });
        }
        if (v.warlock_level >= 11) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_MYSTIC_ARCANUM_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_MYSTIC_ARCANUM'),
            storageName: 'Mystic Arcanum',
          });
        }
        if (v.warlock_level >= 20) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_ELDRITCH_MASTER_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_ELDRITCH_MASTER'),
            recharge: 'Long Rest',
            storageName: 'Eldritch Master',
          });
        }
      }

      if (v.wizard_level) {
        setTrait({
          freetext: getTranslationByKey('CLASS_FEATURE_ARCANE_RECOVERY_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_ARCANE_RECOVERY'),
          recharge: 'Long Rest',
          storageName: 'Arcane Recovery',
          uses_max: 1,
        });
        if (v.wizard_level >= 18) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_SPELL_MASTERY_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_SPELL_MASTERY'),
            storageName: 'Spell Mastery',
          });
        }
        if (v.wizard_level >= 20) {
          setTrait({
            freetext: getTranslationByKey('CLASS_FEATURE_SIGNATURE_SPELLS_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_SIGNATURE_SPELLS'),
            storageName: 'Signature Spells',
          });
        }
      }
    },
  });
};

const updateSpellSlots = () => {
  const collectionArray = ['caster_level', 'caster_type'];
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
      const repeatingString = `spell_slots_l${level}`;
      collectionArray.push(`${repeatingString}_calc`);
      collectionArray.push(`${repeatingString}_bonus`);
      collectionArray.push(`${repeatingString}_max`);
      collectionArray.push(`${repeatingString}_toggle`);
    }
  }

  getSetItems({
    collectionArray,
    callback: (v, finalSetAttrs) => {
      const casterLevel = getIntValue(v.caster_level);
      const casterType = v.caster_type;

      if (casterType === 'full') {
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
          const repeatingString = `spell_slots_l${level}`;
          finalSetAttrs[repeatingString] = 0;
          if (spellSlots[level] !== 0 || exists(v[`${repeatingString}_calc`])) {
            finalSetAttrs[`spell_slots_l${level}_calc`] = spellSlots[level];
          }

          const slots = v[`${repeatingString}`];
          const slotBonus = getIntValue(v[`${repeatingString}_bonus`]);
          const spellSlotMax = spellSlots[level] + slotBonus;

          if (spellSlotMax > 0) {
            finalSetAttrs[`${repeatingString}_max`] = spellSlotMax;
            if (isUndefinedOrEmpty(slots)) {
              finalSetAttrs[repeatingString] = spellSlotMax;
            }
          } else {
            if (exists(v[`${repeatingString}_max`])) {
              finalSetAttrs[`${repeatingString}_max`] = 0;
            }
          }
        }
      }
    },
  });
};

const updateHD = (v, finalSetAttrs, hd) => {
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
        if (!isUndefinedOrEmpty(v[`hd_${key}_max`])) {
          finalSetAttrs[`hd_${key}_max`] = 0;
        }
        if (!isUndefinedOrEmpty(v[`hd_${key}_query`])) {
          finalSetAttrs[`hd_${key}_query`] = '';
        }
        if (exists(v[`hd_${key}_toggle`])) {
          finalSetAttrs[`hd_${key}_toggle`] = 0;
        }
      }
    }
  }
};

const updateLevels = (repeatingInfo) => {
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

  const collectionArray = ['is_npc', 'caster_level', 'caster_type', 'class_and_level', 'level', 'xp_next_level'];
  for (const className of CLASSES) {
    collectionArray.push(`${className}_level`);
    collectionArray.push(`has_${className}_levels`);
  }
  for (const key in hd) {
    if (hd.hasOwnProperty(key)) {
      collectionArray.push(`hd_${key}_max`);
      collectionArray.push(`hd_${key}_query`);
      collectionArray.push(`hd_${key}_toggle`);
    }
  }

  getSetRepeatingItems({
    repeatingItems: ['repeating_class'],
    collectionArray,
    collectionArrayAddItems: ['level', 'name', 'custom_name', 'hd', 'spellcasting', 'custom_class_toggle'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const className of CLASSES) {
        finalSetAttrs[`${className}_level`] = 0;
      }
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;

        let className = v[`${repeatingString}name`];
        let classLevel = v[`${repeatingString}level`];

        if (isUndefinedOrEmpty(className) && isUndefinedOrEmpty(classLevel)) {
          continue;
        }

        if (isUndefinedOrEmpty(className)) {
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

        if (isUndefinedOrEmpty(classLevel)) {
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
        if (isUndefinedOrEmpty(classHd) || repeatingInfo.field === 'name') {
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
        if (isUndefinedOrEmpty(classSpellcasting)) {
          if (defaultClassDetails.hasOwnProperty(className)) {
            classSpellcasting = defaultClassDetails[className].spellcasting;
            if (classSpellcasting) {
              finalSetAttrs[`${repeatingString}spellcasting`] = classSpellcasting;
            }
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

      finalSetAttrs.number_of_classes = 0;
      finalSetAttrs.class_and_level = '';
      for (const prop in classLevels) {
        if (classLevels.hasOwnProperty(prop)) {
          finalSetAttrs.number_of_classes = finalSetAttrs.number_of_classes + 1;
          if (classLevels.hasOwnProperty(prop)) {
            finalSetAttrs[`${prop}_level`] = classLevels[prop];
            if (finalSetAttrs.class_and_level !== '') {
              finalSetAttrs.class_and_level += ', ';
            }
            finalSetAttrs.class_and_level += `${capitalize(prop)} ${classLevels[prop]}`;
          }
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
        } else if (!isUndefinedOrEmpty(v[`has_${className}_levels`])) {
          finalSetAttrs[`has_${className}_levels`] = 0;
        }
      }

      updateHD(v, finalSetAttrs, hd);

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
      }
    },
    setFinalAttrsCallback: () => {
      setClassFeatures();
      updateSpellSlots();
    },
  });
};

on('change:repeating_class', (eventInfo) => {
  const repeatingInfo = getRepeatingInfo('repeating_class', eventInfo);
  if (repeatingInfo) {
    updateLevels(repeatingInfo);
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
  getSetItems({
    collectionArray: ['level', 'challenge', 'pb', 'exp', 'h_PB'],
    callback: (v, finalSetAttrs) => {
      const pb = getPB(v.level, v.challenge);
      finalSetAttrs.pb = pb;
      finalSetAttrs.exp = pb * 2;
      finalSetAttrs.h_PB = pb / 2;
    },
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

const getSkillIdByStorageName = (v, repeatingItem, ids, prop) => {
  for (const id of ids) {
    const repeatingString = `${repeatingItem}_${id}_`;
    if (v[`${repeatingString}storage_name`] === prop || v[`${repeatingString}storage_name`] === camelize(prop)) {
      return id;
    }
  }
};

const setAdvantageOnStealth = (mode) => {
  getSetRepeatingItems({
    repeatingItems: ['repeating_skill'],
    collectionArrayAddItems: ['storage_name', 'skill_d20'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const prop in SKILLS) {
        if (SKILLS.hasOwnProperty(prop)) {
          const skillId = getSkillIdByStorageName(v, repeatingItem, ids, prop);
          const repeatingString = `${repeatingItem}_${skillId}_`;

          if (v[`${repeatingString}storage_name`] === 'STEALTH') {
            if (mode === 'dis') {
              finalSetAttrs[`${repeatingString}skill_d20`] = '2d20@{d20_mod}kl1';
            } else if (mode === 'normal') {
              finalSetAttrs[`${repeatingString}skill_d20`] = '@{shaped_d20}';
            }
          }
        }
      }
    },
  });
};

const updateArmor = (rowId) => {
  let stealthPenalty;

  getSetRepeatingItems({
    repeatingItems: ['repeating_armor'],
    collectionArrayAddItems: ['parsed', 'modifiers', 'stealth'],
    rowId,
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;
        if (isUndefinedOrEmpty(v[`${repeatingString}parsed`]) || v[`${repeatingString}parsed`].indexOf('acBonus') === -1) {
          const armorModifiers = v[`${repeatingString}modifiers`];
          if (exists(armorModifiers)) {
            finalSetAttrs[`${repeatingString}ac_bonus`] = armorModifiers.replace(/^\D+/g, '');
          }
          if (isUndefinedOrEmpty(finalSetAttrs[`${repeatingString}parsed`])) {
            finalSetAttrs[`${repeatingString}parsed`] = '';
          }
          finalSetAttrs[`${repeatingString}parsed`] += ' acBonus';
        }

        if (v[`${repeatingString}stealth`] === 'Disadvantage') {
          stealthPenalty = true;
        }
      }
      if (stealthPenalty) {
        setAdvantageOnStealth('dis');
      } else {
        setAdvantageOnStealth('normal');
      }
    },
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
  getSetRepeatingItems({
    repeatingItems: ['repeating_equipment'],
    collectionArrayAddItems: ['content'],
    rowId,
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;

        if (isUndefinedOrEmpty(v[`${repeatingString}parsed`]) || v[`${repeatingString}parsed`].indexOf('content') === -1) {
          let content = v[`${repeatingString}content`];
          if (exists(content)) {
            content = content.replace(/\s(\d+d\d+\s(?:\+|\-)\s\d+)\s/g, ' [[$1]] ')
              .replace(/\s(\d+d\d+)\s/g, ' [[$1]] ')
              .replace(/\s(\d+)\s/g, ' [[$1]] ');

            finalSetAttrs[`${repeatingString}content`] = content;

            if (isUndefinedOrEmpty(finalSetAttrs[`${repeatingString}parsed`])) {
              finalSetAttrs[`${repeatingString}parsed`] = '';
            }
            finalSetAttrs[`${repeatingString}parsed`] += ' content';
          }
        }
      }
    },
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
  getSetItems({
    collectionArray: ['pb', 'jack_of_all_trades'],
    callback: (v, finalSetAttrs) => {
      finalSetAttrs.jack_of_all_trades = Math.floor(getIntValue(v.pb) / 2);
    },
  });
};
on('change:jack_of_all_trades_toggle', () => {
  updateJackOfAllTrades();
});

const updateRemarkableAthlete = () => {
  getSetItems({
    collectionArray: ['pb', 'remarkable_athlete'],
    callback: (v, finalSetAttrs) => {
      finalSetAttrs.remarkable_athlete = Math.ceil(getIntValue(v.pb) / 2);
    },
  });
};
on('change:remarkable_athlete_toggle', () => {
  updateRemarkableAthlete();
});

const updateInitiative = () => {
  const collectionArray = ['initiative', 'initiative_ability', 'initiative_formula', 'initiative_bonus', 'jack_of_all_trades_toggle', 'jack_of_all_trades', 'remarkable_athlete_toggle', 'remarkable_athlete', 'global_check_bonus'];
  for (const ability of ABILITIES) {
    collectionArray.push(`${ability}_mod`);
    collectionArray.push(`${ability}_check_bonus`);
  }

  getSetItems({
    collectionArray,
    callback: (v, finalSetAttrs) => {
      finalSetAttrs.initiative = 0;

      let initiativeAbility = v.initiative_ability;

      if (isUndefined(initiativeAbility)) {
        initiativeAbility = 'dexterity';
      }

      const abilityMod = getAbilityValue(v, initiativeAbility);
      if (exists(abilityMod)) {
        finalSetAttrs.initiative += abilityMod;
      }
      finalSetAttrs.initiative_formula = `${abilityMod}[${getAbilityShortName(initiativeAbility)}]`;

      const abilityCheckBonus = getIntValue(v[`${initiativeAbility}_check_bonus`]);
      if (exists(abilityCheckBonus)) {
        finalSetAttrs.initiative += abilityCheckBonus;
        finalSetAttrs.initiative_formula += `${addArithmeticOperator(finalSetAttrs.initiative_formula, abilityCheckBonus)}[${getAbilityShortName(initiativeAbility)} check bonus]`;
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
        if (finalSetAttrs.initiative_formula) {
          finalSetAttrs.initiative_formula += ' + ';
        }
        finalSetAttrs.initiative_formula += '(@{global_check_bonus})[global check bonus]';
      }
    },
  });
};
const watchInitiativeChanges = () => {
  const initiativeWatch = ['change:initiative_ability', 'change:initiative_bonus', 'change:jack_of_all_trades_toggle', 'change:jack_of_all_trades', 'change:remarkable_athlete_toggle', 'change:remarkable_athlete', 'change:global_check_bonus'];
  for (const ability of ABILITIES) {
    initiativeWatch.push(`change:${ability}_mod`);
    initiativeWatch.push(`change:${ability}_check_bonus`);
  }
  on(initiativeWatch.join(' '), () => {
    updateInitiative();
  });
};
watchInitiativeChanges();

const updateWeight = () => {
  getSetItems({
    collectionArray: ['weight_attacks', 'weight_ammo', 'weight_armor', 'weight_equipment', 'weight_coinage'],
    callback: (v, finalSetAttrs) => {
      finalSetAttrs.weight_total = round((getFloatValue(v.weight_attacks) + getFloatValue(v.weight_ammo) + getFloatValue(v.weight_armor) + getFloatValue(v.weight_equipment) + getFloatValue(v.weight_coinage)), 2);
    },
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
    toggleFieldSetTo: toggleVars.roll,
    triggerFields: ['type', 'attack_bonus'],
  };
  parseAttackComponent(v, repeatingString, finalSetAttrs, attackParse);

  let attackFormula = '';
  const attackToggle = v[`${repeatingString}roll_toggle`];

  let toHit = 0;
  if (!attackToggle || attackToggle === toggleVars.roll) {
    const proficiency = v[`${repeatingString}proficiency`];
    if (!proficiency || proficiency === 'on') {
      const pb = getIntValue(v.pb);
      toHit += pb;
      attackFormula += `${pb}[proficient]`;
    }

    let attackAbility = v[`${repeatingString}attack_ability`];

    if (isUndefined(attackAbility) && v[`${repeatingString}type`] === 'Melee Weapon') {
      attackAbility = 'strength';
      finalSetAttrs[`${repeatingString}attack_ability`] = attackAbility;
    } else if (isUndefined(attackAbility) && v[`${repeatingString}type`] === 'Ranged Weapon') {
      attackAbility = 'dexterity';
      finalSetAttrs[`${repeatingString}attack_ability`] = attackAbility;
    } else if (finalSetAttrs[`${repeatingString}attack_ability`]) {
      attackAbility = finalSetAttrs[`${repeatingString}attack_ability`];
    }
    attackAbility = getAbilityValue(v, attackAbility);
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

    if (v[`${repeatingString}type`] === 'Melee Weapon') {
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
    toggleFieldSetTo: toggleVars.saving_throw,
    triggerFields: ['saving_throw_ability', 'saving_throw_bonus', 'saving_throw_vs_ability'],
  };
  parseAttackComponent(v, repeatingString, finalSetAttrs, savingThrowParse);
  if (fromVOrFinalSetAttrs(v, finalSetAttrs, `${repeatingString}saving_throw_toggle`) === toggleVars.saving_throw) {
    let savingThrowDC = getIntValue(v.base_dc) + getIntValue(v.pb);
    let savingThrowAbility = v[`${repeatingString}saving_throw_ability`];
    if (isUndefined(savingThrowAbility) && v.default_ability) {
      savingThrowAbility = v.default_ability;
      finalSetAttrs[`${repeatingString}saving_throw_ability`] = v.default_ability;
    }

    savingThrowDC += getAbilityValue(v, savingThrowAbility);
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
    toggleFieldSetTo: toggleVars.damage,
    triggerFields: ['damage', 'damage_ability', 'damage_bonus', 'damage_type'],
  };
  parseAttackComponent(v, repeatingString, finalSetAttrs, damageParse);

  let damageString = '';
  let damageFormula = '';
  const damageToggle = v[`${repeatingString}damage_toggle`];
  let damageAbility = v[`${repeatingString}damage_ability`];
  let damageType;

  if (!damageToggle || damageToggle === toggleVars.damage) {
    let damageAddition = 0;

    const damage = v[`${repeatingString}damage`];
    if (exists(damage)) {
      damageString += damage;
      damageFormula += `${damage}[damage]`;
    }

    if (isUndefined(damageAbility) && v[`${repeatingString}type`] === 'Melee Weapon') {
      damageAbility = 'strength';
      finalSetAttrs[`${repeatingString}damage_ability`] = damageAbility;
    }
    if (isUndefined(damageAbility) && v[`${repeatingString}type`] === 'Ranged Weapon') {
      damageAbility = 'dexterity';
      finalSetAttrs[`${repeatingString}damage_ability`] = damageAbility;
    }
    if (exists(damageAbility)) {
      const damageAbilityValue = getAbilityValue(v, damageAbility);
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

    if (options && exists(options.globalMeleeDamageBonus) && (v[`${repeatingString}type`] === 'Melee Weapon')) {
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
    addSecondCastingModifier: exists(v[`${repeatingString}add_second_casting_modifier`]),
    parseName: 'secondDamage',
    toggleField: 'second_damage_toggle',
    toggleFieldSetTo: toggleVars.second_damage,
    triggerFields: ['second_damage', 'second_damage_ability', 'second_damage_bonus', 'second_damage_type'],
  };
  parseAttackComponent(v, repeatingString, finalSetAttrs, secondDamageParse);

  let secondDamageFormula = '';

  const secondDamageToggle = fromVOrFinalSetAttrs(v, finalSetAttrs, `${repeatingString}second_damage_toggle`);
  if (secondDamageToggle === toggleVars.second_damage) {
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

    if (isUndefinedOrEmpty(v[`${repeatingString}parsed`]) || v[`${repeatingString}parsed`].indexOf('damageProperties') === -1) {
      const damageProperties = v[`${repeatingString}properties`];
      if (exists(damageProperties)) {
        if (damageProperties.indexOf('Versatile') !== -1) {
          if (!exists(damageAbility)) {
            damageAbility = 'strength';
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
    toggleFieldSetTo: toggleVars.heal,
    triggerFields: ['heal', 'heal_query_toggle'],
  };
  parseAttackComponent(v, repeatingString, finalSetAttrs, healParse);
  let healFormula = '';
  const healToggle = v[`${repeatingString}heal_toggle`];
  if (healToggle === toggleVars.heal) {
    if (!isUndefined(v[`${repeatingString}heal`])) {
      healFormula = '@{heal}[heal]';
    }
    if (!isUndefined(v[`${repeatingString}heal_ability`])) {
      const healAbility = getAbilityValue(v, v[`${repeatingString}heal_ability`]);
      healFormula += `${addArithmeticOperator(healFormula, healAbility)}[${getAbilityShortName(v[`${repeatingString}heal_ability`])}]`;
    }
    if (!isUndefined(v[`${repeatingString}heal_bonus`])) {
      const healBonus = getIntValue(v[`${repeatingString}heal_bonus`]);
      healFormula += `${addArithmeticOperator(healFormula, healBonus)}[bonus]`;
    }

    if (!isUndefined(v.global_spell_heal_bonus)) {
      if (healFormula) {
        healFormula += ' + ';
      }
      healFormula += '@{global_spell_heal_bonus}[global spell heal bonus]';
    }
    if (v[`${repeatingString}heal_query_toggle`] === toggleVars.heal_query) {
      if (healFormula) {
        healFormula += ' + ';
      }
      healFormula += '@{heal_query_toggle}[query amount]';
    }

    finalSetAttrs[`${repeatingString}heal_formula`] = healFormula;
  }
};

const updateHigherLevelToggle = (v, finalSetAttrs, repeatingString) => {
  const higherLevelParse = {
    addCastingModifier: exists(v[`${repeatingString}add_casting_modifier`]),
    parseName: 'higherLevel',
    toggleField: 'higher_level_toggle',
    toggleFieldSetTo: toggleVars.higher_level,
    triggerFields: ['higher_level_dice', 'higher_level_die', 'second_higher_level_dice', 'second_higher_level_die', 'higher_level_heal'],
  };
  parseAttackComponent(v, repeatingString, finalSetAttrs, higherLevelParse);

  const higherLevelToggle = v[`${repeatingString}higher_level_toggle`];
  if (exists(higherLevelToggle) && higherLevelToggle === toggleVars.higher_level) {
    const spellLevel = getIntValue(v[`${repeatingString}spell_level`]);
    finalSetAttrs[`${repeatingString}higher_level_query`] = `@{higher_level_query_${spellLevel}}`;

    const damageToggle = v[`${repeatingString}damage_toggle`];
    if (damageToggle && damageToggle === toggleVars.damage) {
      const higherLevelDamage = `((@{higher_level_query} - ${spellLevel}) * @{higher_level_dice})@{higher_level_die}[higher lvl]`;
      finalSetAttrs[`${repeatingString}damage_formula`] += addArithmeticOperator(finalSetAttrs[`${repeatingString}damage_formula`], higherLevelDamage);
      finalSetAttrs[`${repeatingString}damage_crit_formula`] = higherLevelDamage;
    }

    const secondDamageToggle = v[`${repeatingString}second_damage_toggle`];
    if (secondDamageToggle && secondDamageToggle === toggleVars.second_damage) {
      const higherLevelSecondDamage = `((@{higher_level_query} - ${spellLevel}) * @{second_higher_level_dice})@{second_higher_level_die}[higher lvl]`;
      finalSetAttrs[`${repeatingString}second_damage_formula`] += addArithmeticOperator(finalSetAttrs[`${repeatingString}second_damage_formula`], higherLevelSecondDamage);
      finalSetAttrs[`${repeatingString}second_damage_crit_formula`] = higherLevelSecondDamage;
    }

    const healToggle = v[`${repeatingString}heal_toggle`];
    if (healToggle && healToggle === toggleVars.heal) {
      if (finalSetAttrs[`${repeatingString}heal_formula`]) {
        finalSetAttrs[`${repeatingString}heal_formula`] += ' + ';
      }
      finalSetAttrs[`${repeatingString}heal_formula`] += `((@{higher_level_query} - ${spellLevel}) * @{higher_level_dice})@{higher_level_die}[higher lvl] + (@{higher_level_heal} * (@{higher_level_query} - ${spellLevel}))[higher lvl flat amount]`;
    }
  }
};

const updateCritDamage = () => {
  getSetRepeatingItems({
    repeatingItems: ['repeating_attack', 'repeating_spell', 'repeating_trait', 'repeating_action', 'repeating_reaction', 'repeating_legendaryaction', 'repeating_lairaction', 'repeating_regionaleffect'],
    collectionArrayAddItems: ['damage', 'damage_crit', 'second_damage', 'second_damage_crit'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;
        if (!v[`${repeatingString}damage_crit`] && v[`${repeatingString}damage`]) {
          finalSetAttrs[`${repeatingString}damage_crit`] = v[`${repeatingString}damage`];
        } else if (v[`${repeatingString}damage`] && v[`${repeatingString}damage_crit`]) {
          finalSetAttrs[`${repeatingString}damage_crit`] = `${v[`${repeatingString}damage`]} + ${v[`${repeatingString}damage_crit`]}`;
        }
        if (!v[`${repeatingString}second_damage_crit`] && v[`${repeatingString}second_damage`]) {
          finalSetAttrs[`${repeatingString}second_damage_crit`] = v[`${repeatingString}second_damage`];
        } else if (v[`${repeatingString}second_damage`] && v[`${repeatingString}second_damage_crit`]) {
          finalSetAttrs[`${repeatingString}second_damage_crit`] = `${v[`${repeatingString}second_damage`]} + ${v[`${repeatingString}second_damage_crit`]}`;
        }
      }
    },
  });
};

const setCritDamage = (v, finalSetAttrs, repeatingString) => {
  if (!v[`${repeatingString}damage_crit`] && v[`${repeatingString}damage`]) {
    finalSetAttrs[`${repeatingString}damage_crit`] = v[`${repeatingString}damage`];
  }
  if (!v[`${repeatingString}second_damage_crit`] && v[`${repeatingString}second_damage`]) {
    finalSetAttrs[`${repeatingString}second_damage_crit`] = v[`${repeatingString}second_damage`];
  }
};

const findAmmo = (name, callback) => {
  let repeatingString;

  getSetRepeatingItems({
    repeatingItems: ['repeating_ammo'],
    collectionArrayAddItems: ['name', 'qty'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const id of ids) {
        repeatingString = `${repeatingItem}_${id}_`;
        if (v[`${repeatingString}name`] === name) {
          callback(`@{${repeatingString}qty}`);
          return;
        }
      }
      console.warn(`cannot find ammo field by the name ${name}, adding it`);
      repeatingString = `${repeatingItem}_${generateRowID()}_`;
      finalSetAttrs[`${repeatingString}name`] = name;
      finalSetAttrs[`${repeatingString}qty`] = 20;
      callback(`@{${repeatingString}qty}`);
    },
  });
};

const updateActionChatMacro = (type) => {
  getSetRepeatingItems({
    repeatingItems: [`repeating_${type}`],
    collectionArray: [`${type}s_macro_var`, `${type}s_chat_var`, `${type}s_exist`],
    collectionArrayAddItems: ['name', 'freetext'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      finalSetAttrs[`${type}s_macro_var`] = '';
      finalSetAttrs[`${type}s_chat_var`] = '';

      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;
        let actionName = v[`${repeatingString}name`];
        const freeText = v[`${repeatingString}freetext`];

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
          actionName = freeText;
        } else if (type === 'regionaleffect') {
          title = 'Regional Effects';
          actionName = freeText;
        }

        if (actionName && actionName.length > 50) {
          actionName = `${actionName.substring(0, 50)}...`;
        }

        finalSetAttrs[`${type}s_macro_var`] += `[${actionName}](~repeating_${type}_${id}_${actionType})`;
        finalSetAttrs[`${type}s_chat_var`] += `{{${title}=${finalSetAttrs[`${type}s_macro_var`]}}}`;
      }
    },
  });
};

const updateAction = (type, rowId) => {
  const rechargeRegex = /\s*?\((?:Recharge\s*?(\d+\-\d+|\d+)|Recharges\safter\sa\s(.*))\)/gi;
  const rechargeDayRegex = /\s*?\((\d+\/Day)\)/gi;
  const collectionArray = ['pb', 'strength_mod', 'finesse_mod', 'global_attack_bonus', 'global_melee_attack_bonus', 'global_ranged_attack_bonus', 'global_damage_bonus', 'global_melee_damage_bonus', 'global_ranged_damage_bonus', 'default_ability', 'base_dc'];

  for (const ability of ABILITIES) {
    collectionArray.push(`${ability}_mod`);
  }

  getSetRepeatingItems({
    repeatingItems: [`repeating_${type}`],
    collectionArray,
    collectionArrayAddItems: ['name', 'type', 'uses', 'uses_max', 'has_uses', 'roll_toggle', 'to_hit', 'attack_formula', 'proficiency', 'attack_ability', 'attack_bonus', 'saving_throw_toggle', 'saving_throw_ability', 'saving_throw_bonus', 'saving_throw_dc', 'damage_toggle', 'damage_formula', 'damage', 'damage_ability', 'damage_bonus', 'damage_type', 'damage_crit', 'second_damage_toggle', 'second_damage_formula', 'second_damage', 'second_damage_ability', 'second_damage_bonus', 'second_damage_type', 'second_damage_crit', 'damage_string', 'heal_toggle', 'heal', 'heal_ability', 'heal_bonus', 'heal_query_toggle', 'parsed', 'recharge', 'recharge_display', 'extras_toggle', 'emote', 'freetext', 'freeform'],
    rowId,
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;

        const actionName = v[`${repeatingString}name`];
        if (!isUndefinedOrEmpty(actionName)) {
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
        } else if (!isUndefinedOrEmpty(v[`${repeatingString}has_uses`])) {
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
            globalDamageBonus: v.global_damage_bonus,
            globalMeleeDamageBonus: v.global_melee_damage_bonus,
            globalRangedDamageBonus: v.global_ranged_damage_bonus,
            type: 'attack',
          };
        }
        updateDamageToggle(v, finalSetAttrs, repeatingString, damageOptions);
        if (v.damage_type) {
          finalSetAttrs.damage_type = lowercaseDamageTypes(v.damage_type);
        }
        if (v.second_damage_type) {
          finalSetAttrs.second_damage_type = lowercaseDamageTypes(v.second_damage_type);
        }
        setCritDamage(v, finalSetAttrs, repeatingString);

        updateHealToggle(v, finalSetAttrs, repeatingString);

        if (isUndefined(v[`${repeatingString}extras_toggle`]) && (v[`${repeatingString}emote`] || v[`${repeatingString}freetext`] || v[`${repeatingString}freeform`])) {
          finalSetAttrs[`${repeatingString}extras_toggle`] = toggleVars.extras;
        }
      }
    },
  });
};
const updateActions = () => {
  updateAction('trait');
  updateAction('action');
  updateAction('reaction');
  updateAction('legendaryaction');
  updateAction('lairaction');
  updateAction('regionaleffect');
};

const updateActionIfTriggered = (type, eventInfo) => {
  const repeatingInfo = getRepeatingInfo(`repeating_${type}`, eventInfo);
  if (repeatingInfo && repeatingInfo.field !== 'name' && repeatingInfo.field !== 'freetext' && repeatingInfo.field !== 'to_hit' && repeatingInfo.field !== 'attack_formula' && repeatingInfo.field !== 'damage_formula' && repeatingInfo.field !== 'damage_crit' && repeatingInfo.field !== 'second_damage_formula' && repeatingInfo.field !== 'second_damage_crit' && repeatingInfo.field !== 'damage_string' && repeatingInfo.field !== 'saving_throw_dc' && repeatingInfo.field !== 'parsed' && repeatingInfo.field !== 'recharge_display') {
    updateAction(type, repeatingInfo.rowId);
  }
};
on('change:repeating_trait', (eventInfo) => {
  updateActionIfTriggered('trait', eventInfo);
});
on('change:repeating_action', (eventInfo) => {
  updateActionIfTriggered('action', eventInfo);
});
on('change:repeating_reaction', (eventInfo) => {
  updateActionIfTriggered('reaction', eventInfo);
});
on('change:repeating_legendaryaction', (eventInfo) => {
  updateActionIfTriggered('legendaryaction', eventInfo);
});
on('change:repeating_lairaction', (eventInfo) => {
  updateActionIfTriggered('lairaction', eventInfo);
});
on('change:repeating_regionaleffect', (eventInfo) => {
  updateActionIfTriggered('regionaleffect', eventInfo);
});

const updateAttack = (rowId) => {
  const collectionArray = ['pb', 'strength_mod', 'finesse_mod', 'global_attack_bonus', 'global_melee_attack_bonus', 'global_ranged_attack_bonus', 'global_damage_bonus', 'global_melee_damage_bonus', 'global_ranged_damage_bonus', 'default_ability', 'ammo_auto_use', 'base_dc'];
  for (const ability of ABILITIES) {
    collectionArray.push(`${ability}_mod`);
  }

  getSetRepeatingItems({
    repeatingItems: ['repeating_attack'],
    collectionArray,
    collectionArrayAddItems: ['name', 'type', 'roll_toggle', 'to_hit', 'attack_formula', 'proficiency', 'attack_ability', 'attack_bonus', 'ammo_toggle_var', 'ammo_field_name', 'ammo_used', 'saving_throw_toggle', 'saving_throw_ability', 'saving_throw_bonus', 'saving_throw_dc', 'damage_toggle', 'damage_formula', 'damage', 'damage_ability', 'damage_bonus', 'damage_type', 'damage_crit', 'second_damage_toggle', 'second_damage_formula', 'second_damage', 'second_damage_ability', 'second_damage_bonus', 'second_damage_type', 'second_damage_crit', 'damage_string', 'modifiers', 'properties', 'weight', 'parsed'],
    rowId,
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;
        const attackName = v[`${repeatingString}name`];
        if (isUndefinedOrEmpty(attackName)) {
          return;
        }

        if (isUndefinedOrEmpty(v[`${repeatingString}parsed`]) || v[`${repeatingString}parsed`].indexOf('modifiers') === -1) {
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
        if (isUndefinedOrEmpty(v[`${repeatingString}parsed`]) || v[`${repeatingString}parsed`].indexOf('attackProperties') === -1) {
          const attackProperties = v[`${repeatingString}properties`];
          if (exists(attackProperties)) {
            if (attackProperties.indexOf('Reach') !== -1) {
              finalSetAttrs[`${repeatingString}reach`] = '10 ft';
            } else if (v[`${repeatingString}type`] === 'Melee Weapon') {
              finalSetAttrs[`${repeatingString}reach`] = '5 ft';
            }
            if (attackProperties.indexOf('Finesse') !== -1) {
              finalSetAttrs[`${repeatingString}attack_ability`] = 'finesse';
              finalSetAttrs[`${repeatingString}damage_ability`] = 'finesse';
            }
            if (!finalSetAttrs[`${repeatingString}parsed`]) {
              finalSetAttrs[`${repeatingString}parsed`] = '';
            }
            finalSetAttrs[`${repeatingString}parsed`] += ' attackProperties';
          }
        }

        const attackOptions = {
          globalAttackBonus: v.global_attack_bonus,
          globalAttackBonusLabel: 'global attack bonus',
          globalMeleeAttackBonus: v.global_melee_attack_bonus,
          globalRangedAttackBonus: v.global_ranged_attack_bonus,
          type: 'attack',
        };
        updateAttackToggle(v, finalSetAttrs, repeatingString, attackOptions);

        const ammoName = v[`${repeatingString}ammo_field_name`];
        const ammoUsed = getIntValue(v[`${repeatingString}ammo_used`], 1);
        if (!isUndefinedOrEmpty(ammoName)) {
          let ammoAutoUse;
          if (v.ammo_auto_use === '1') {
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
          globalDamageBonus: v.global_damage_bonus,
          globalMeleeDamageBonus: v.global_melee_damage_bonus,
          globalRangedDamageBonus: v.global_ranged_damage_bonus,
          type: 'attack',
        };
        updateDamageToggle(v, finalSetAttrs, repeatingString, damageOptions);
        if (v.damage_type) {
          finalSetAttrs.damage_type = lowercaseDamageTypes(v.damage_type);
        }
        if (v.second_damage_type) {
          finalSetAttrs.second_damage_type = lowercaseDamageTypes(v.second_damage_type);
        }
        setCritDamage(v, finalSetAttrs, repeatingString);
      }
    },
  });
};
on('change:repeating_attack', (eventInfo) => {
  const repeatingInfo = getRepeatingInfo('repeating_attack', eventInfo);
  if (repeatingInfo && repeatingInfo.field !== 'roll_toggle' && repeatingInfo.field !== 'toggle_details' && repeatingInfo.field !== 'to_hit' && repeatingInfo.field !== 'attack_formula' && repeatingInfo.field !== 'damage_formula' && repeatingInfo.field !== 'damage_crit' && repeatingInfo.field !== 'second_damage_formula' && repeatingInfo.field !== 'second_damage_crit' && repeatingInfo.field !== 'damage_string' && repeatingInfo.field !== 'saving_throw_dc' && repeatingInfo.field !== 'qty' && repeatingInfo.field !== 'weight' && repeatingInfo.field !== 'parsed') {
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

const updateAttackChatMacro = () => {
  getSetRepeatingItems({
    repeatingItems: ['repeating_attack'],
    collectionArray: ['attacks_macro_var'],
    collectionArrayAddItems: ['name'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      finalSetAttrs.attacks_macro_var = '';

      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;
        let actionName = v[`${repeatingString}name`];
        if (actionName && actionName.length > 50) {
          actionName = `${actionName.substring(0, 50)}...`;
        }

        if (id !== ids[0]) {
          finalSetAttrs.attacks_macro_var += ', ';
        }

        finalSetAttrs.attacks_macro_var += `[${actionName}](~repeating_attack_${id}_attack)`;
      }
    },
  });
};
on('change:repeating_attack remove:repeating_attack', () => {
  updateAttackChatMacro();
});
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

const updateSpellToTranslations = () => {
  getSetRepeatingItems({
    repeatingItems: ['repeating_spell'],
    collectionArrayAddItems: ['spell_level', 'school', 'casting_time', 'components', 'duration', 'concentration', 'saving_throw_vs_ability'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;
        if (v[`${repeatingString}spell_level`]) {
          finalSetAttrs[`${repeatingString}spell_level`] = ordinalSpellLevel(v[`${repeatingString}spell_level`]);
        }
        if (v[`${repeatingString}school`]) {
          finalSetAttrs[`${repeatingString}school`] = v[`${repeatingString}school`].toUpperCase();
        }
        if (v[`${repeatingString}casting_time`]) {
          finalSetAttrs[`${repeatingString}casting_time`] = v[`${repeatingString}casting_time`].trim().toUpperCase().replace(/\s/g, '_');
        }
        if (v[`${repeatingString}components`]) {
          finalSetAttrs[`${repeatingString}components`] = `COMPONENTS_${v[`${repeatingString}components`].trim().toUpperCase().replace(/\s/g, '_')}`;
        }
        if (v[`${repeatingString}duration`]) {
          let duration = '';
          if (v[`${repeatingString}concentration`] === 'Yes') {
            duration += 'CONCENTRATION_';
          }
          duration += v[`${repeatingString}duration`].trim().toUpperCase().replace(/\s/g, '_');
          finalSetAttrs[`${repeatingString}duration`] = duration;
        }
        if (finalSetAttrs[`${repeatingString}saving_throw_vs_ability`]) {
          finalSetAttrs[`${repeatingString}saving_throw_vs_ability`] = v[`${repeatingString}saving_throw_vs_ability`].toUpperCase();
        }
      }
    },
  });
};
const updateSpellLevelForCantrips = () => {
  getSetRepeatingItems({
    repeatingItems: ['repeating_spell'],
    collectionArrayAddItems: ['spell_level'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;
        if (isUndefinedOrEmpty(v[`${repeatingString}spell_level`]) || v[`${repeatingString}spell_level`] === '0' || v[`${repeatingString}spell_level`] === 0) {
          finalSetAttrs[`${repeatingString}spell_level`] = 'CANTRIP';
        }
      }
    },
  });
};

const updateSpellFromSRD = (v, finalSetAttrs, repeatingString) => {
  if (v[`${repeatingString}spell_level_from_srd`]) {
    finalSetAttrs[`${repeatingString}spell_level`] = ordinalSpellLevel(v[`${repeatingString}spell_level_from_srd`]);
    finalSetAttrs[`${repeatingString}spell_level_from_srd`] = '';
  }
  if (v[`${repeatingString}school_from_srd`]) {
    finalSetAttrs[`${repeatingString}school`] = v[`${repeatingString}school_from_srd`].toUpperCase();
    finalSetAttrs[`${repeatingString}school_from_srd`] = '';
  }
  if (v[`${repeatingString}casting_time_from_srd`]) {
    finalSetAttrs[`${repeatingString}casting_time`] = v[`${repeatingString}casting_time_from_srd`].trim().toUpperCase().replace(/\s/g, '_');
    finalSetAttrs[`${repeatingString}casting_time_from_srd`] = '';
  }
  if (v[`${repeatingString}components_from_srd`]) {
    finalSetAttrs[`${repeatingString}components`] = `COMPONENTS_${v[`${repeatingString}components_from_srd`].trim().toUpperCase().replace(/\s/g, '_')}`;
    finalSetAttrs[`${repeatingString}components_from_srd`] = '';
  }
  if (v[`${repeatingString}duration_from_srd`]) {
    let duration = '';
    if (v[`${repeatingString}duration_from_srd`].toLowerCase().indexOf('up to') !== -1) {
      duration += 'CONCENTRATION_';
    }
    duration += v[`${repeatingString}duration_from_srd`].trim().toUpperCase().replace(/\s/g, '_');
    finalSetAttrs[`${repeatingString}duration`] = duration;
    finalSetAttrs[`${repeatingString}duration_from_srd`] = '';
  }
  if (v[`${repeatingString}saving_throw_vs_ability_from_srd`]) {
    finalSetAttrs[`${repeatingString}saving_throw_vs_ability`] = v[`${repeatingString}saving_throw_vs_ability_from_srd`].toUpperCase();
    finalSetAttrs[`${repeatingString}saving_throw_vs_ability_from_srd`] = '';
  }
};

const updateSpell = (rowId) => {
  const collectionArray = ['is_npc', 'pb', 'finesse_mod', 'global_spell_attack_bonus', 'global_spell_damage_bonus', 'global_spell_dc_bonus', 'global_spell_heal_bonus', 'default_ability', 'caster_level', 'base_dc'];
  for (const ability of ABILITIES) {
    collectionArray.push(`${ability}_mod`);
  }
  getSetRepeatingItems({
    repeatingItems: ['repeating_spell'],
    collectionArray,
    collectionArrayAddItems: ['name', 'school', 'spell_level', 'spell_level_from_srd', 'school_from_srd', 'casting_time', 'casting_time_from_srd', 'components', 'components_from_srd', 'concentration', 'duration', 'duration_from_srd', 'type', 'roll_toggle', 'to_hit', 'attack_formula', 'proficiency', 'attack_ability', 'attack_bonus', 'saving_throw_toggle', 'saving_throw_ability', 'saving_throw_vs_ability', 'saving_throw_vs_ability_from_srd', 'saving_throw_bonus', 'saving_throw_dc', 'damage_toggle', 'damage_formula', 'damage', 'damage_ability', 'damage_bonus', 'damage_type', 'damage_crit', 'second_damage_toggle', 'second_damage_formula', 'second_damage', 'second_damage_ability', 'second_damage_bonus', 'second_damage_type', 'second_damage_crit', 'damage_string', 'parsed', 'heal_toggle', 'heal', 'heal_ability', 'heal_bonus', 'heal_query_toggle', 'add_casting_modifier', 'add_second_casting_modifier', 'higher_level_toggle', 'higher_level_dice', 'higher_level_die', 'second_higher_level_dice', 'second_higher_level_die', 'higher_level_heal', 'ritual', 'ritual_output', 'materials', 'materials_show', 'extras_toggle', 'emote', 'freetext', 'freeform'],
    rowId,
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;

        updateSpellFromSRD(v, finalSetAttrs, repeatingString);

        if (v[`${repeatingString}spell_level`] === 'CANTRIP') {
          finalSetAttrs[`${repeatingString}is_prepared`] = 'on';
        }

        if (!isUndefined(fromVOrFinalSetAttrs(v, finalSetAttrs, `${repeatingString}duration`)) && fromVOrFinalSetAttrs(v, finalSetAttrs, `${repeatingString}duration`).indexOf('CONCENTRATION') !== -1) {
          finalSetAttrs[`${repeatingString}concentration`] = 'Yes';
        } else {
          finalSetAttrs[`${repeatingString}concentration`] = '';
        }
        if (v[`${repeatingString}ritual`] === 'Yes') {
          finalSetAttrs[`${repeatingString}ritual_output`] = '?{Cast as|Ritual,{{ritual=1&#125;&#125;|Spell,}';
        } else {
          finalSetAttrs[`${repeatingString}ritual_output`] = '';
        }
        if (!isUndefinedOrEmpty(v[`${repeatingString}materials`])) {
          finalSetAttrs[`${repeatingString}materials_show`] = 1;
        } else if (!isUndefinedOrEmpty(v[`${repeatingString}materials_show`])) {
          finalSetAttrs[`${repeatingString}materials_show`] = 0;
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
        if (v.damage_type) {
          finalSetAttrs.damage_type = lowercaseDamageTypes(v.damage_type);
        }
        if (v.second_damage_type) {
          finalSetAttrs.second_damage_type = lowercaseDamageTypes(v.second_damage_type);
        }
        setCritDamage(v, finalSetAttrs, repeatingString);

        if (getIntValue(v.is_npc) === 1 && v.caster_level && v[`${repeatingString}damage`] && v[`${repeatingString}damage`].indexOf('@{level}') !== -1) {
          finalSetAttrs[`${repeatingString}damage`] = v[`${repeatingString}damage`].replace('@{level}', '@{caster_level}');
        }

        updateHealToggle(v, finalSetAttrs, repeatingString);

        updateHigherLevelToggle(v, finalSetAttrs, repeatingString);

        if (isUndefinedOrEmpty(v[`${repeatingString}extras_toggle`]) && (v[`${repeatingString}emote`] || v[`${repeatingString}freetext`] || v[`${repeatingString}freeform`])) {
          finalSetAttrs[`${repeatingString}extras_toggle`] = toggleVars.extras;
        }
      }
    },
  });
};
on('change:repeating_spell', (eventInfo) => {
  const repeatingInfo = getRepeatingInfo('repeating_spell', eventInfo);
  if (repeatingInfo && repeatingInfo.field !== 'roll_toggle' && repeatingInfo.field !== 'toggle_details' && repeatingInfo.field !== 'to_hit' && repeatingInfo.field !== 'attack_formula' && repeatingInfo.field !== 'damage_formula' && repeatingInfo.field !== 'damage_crit' && repeatingInfo.field !== 'second_damage_formula' && repeatingInfo.field !== 'second_damage_crit' && repeatingInfo.field !== 'damage_string' && repeatingInfo.field !== 'saving_throw_dc' && repeatingInfo.field !== 'heal_formula' && repeatingInfo.field !== 'higher_level_query' && repeatingInfo.field !== 'parsed') {
    updateSpell(repeatingInfo.rowId);
  }
});
on('change:global_spell_attack_bonus change:global_spell_damage_bonus change:global_spell_dc_bonus change:global_spell_heal_bonus', () => {
  updateSpell();
});

const updateSpellChatMacro = () => {
  const spells = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
  };

  const collectionArray = ['spells_show_unprepared'];
  for (let i = 0; i <= 9; i++) {
    collectionArray.push(`spells_level_${0}_macro_var`);
  }
  getSetRepeatingItems({
    repeatingItems: ['repeating_spell'],
    collectionArray,
    collectionArrayAddItems: ['name', 'spell_level', 'is_prepared'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;
        const showUnprepared = v.spells_show_unprepared === 'on' || isUndefinedOrEmpty(v.spells_show_unprepared);
        const spellName = v[`${repeatingString}name`];
        const spellLevel = getIntValue(v[`${repeatingString}spell_level`], 0);
        const spellPrepared = v[`${repeatingString}is_prepared`] === 'on';

        if (spellName && spellPrepared) {
          spells[spellLevel].push(`[${spellName}](~repeating_spell_${id}_spell)`);
        } else if (spellName && showUnprepared) {
          spells[spellLevel].push(`<span class="sheet-unprepared">[${spellName}](~repeating_spell_${id}_spell)</span>`);
        }
      }

      for (let i = 0; i <= 9; i++) {
        if (spells[i].length > 0) {
          finalSetAttrs[`spells_level_${i}_macro_var`] = spells[i].join(', ');
        } else {
          finalSetAttrs[`spells_level_${i}_macro_var`] = '';
        }
      }
    },
  });
};
on('change:repeating_spell', (eventInfo) => {
  const repeatingInfo = getRepeatingInfo('repeating_spell', eventInfo);
  if (repeatingInfo && (repeatingInfo.field === 'name' || repeatingInfo.field === 'spell_level' || repeatingInfo.field === 'is_prepared')) {
    updateSpellChatMacro();
  }
});
on('change:spells_show_unprepared', () => {
  updateSpellChatMacro();
});
on('remove:repeating_spell', () => {
  updateSpellChatMacro();
});

const updateSpellShowHide = () => {
  const collectionArray = ['spells_show_spell_level_if_all_slots_are_used'];
  for (let i = 0; i <= 9; i++) {
    collectionArray.push(`spell_slots_l${i}`);
    collectionArray.push(`spell_slots_l${i}_max`);
    collectionArray.push(`spell_slots_l${i}_toggle`);
    collectionArray.push(`spells_level_${i}_macro_var`);
    collectionArray.push(`spells_level_${i}_show`);
  }

  getSetItems({
    collectionArray,
    callback: (v, finalSetAttrs) => {
      const showLevelIfAllSlotsAreUsed = isUndefinedOrEmpty(v.spells_show_spell_level_if_all_slots_are_used) || v.spells_show_spell_level_if_all_slots_are_used === 'on';

      for (let level = 0; level <= 9; level++) {
        if (v[`spells_level_${level}_macro_var`] || getIntValue(v[`spell_slots_l${level}`]) || getIntValue(v[`spell_slots_l${level}_max`])) {
          finalSetAttrs[`spell_slots_l${level}_toggle`] = 'on';
        } else {
          finalSetAttrs[`spell_slots_l${level}_toggle`] = 0;
        }

        const hasSlots = getIntValue(v[`spell_slots_l${level}`]);
        const hasSpells = v[`spells_level_${level}_macro_var`];

        if ((hasSlots || showLevelIfAllSlotsAreUsed) && (hasSlots || hasSpells)) {
          finalSetAttrs[`spells_level_${level}_show`] = true;
        } else {
          finalSetAttrs[`spells_level_${level}_show`] = '';
        }
      }
    },
  });
};
const watchForSpellChanges = () => {
  const spellsWatch = ['change:spells_show_spell_level_if_all_slots_are_used'];

  for (let i = 0; i <= 9; i++) {
    spellsWatch.push(`change:spells_level_${i}_macro_var`);
    spellsWatch.push(`change:spell_slots_l${i}`);
    spellsWatch.push(`change:spell_slots_l${i}_max`);
  }

  on(spellsWatch.join(' '), () => {
    updateSpellShowHide();
  });
};
watchForSpellChanges();

const generateHigherLevelQueries = () => {
  const collectionArray = ['warlock_level', 'number_of_classes'];
  for (let i = 1; i <= 8; i++) {
    collectionArray.push(`cast_as_level_${i}`);
    collectionArray.push(`higher_level_query_${i}`);
  }
  for (let i = 1; i <= 9; i++) {
    collectionArray.push(`spell_slots_l${i}`);
  }

  getSetItems({
    collectionArray,
    callback: (v, finalSetAttrs) => {
      for (let i = 1; i <= 8; i++) {
        let higherLevelQuery = '';

        if (i < 6 && v.number_of_classes === 1 && v.warlock_level > 0 && Math.ceil(getIntValue(v.warlock_level) / 2) >= i) {
          let spellLevel = 1;
          if (v.warlock_level >= 9) {
            spellLevel = 5;
          } else if (v.warlock_level >= 7) {
            spellLevel = 4;
          } else if (v.warlock_level >= 5) {
            spellLevel = 3;
          } else if (v.warlock_level >= 3) {
            spellLevel = 2;
          }
          higherLevelQuery = spellLevel;
        } else {
          let levelQuery = '';
          for (let j = i; j <= 9; j++) {
            if (getIntValue(v[`spell_slots_l${j}`])) {
              levelQuery += `|${j}`;
            }
          }
          higherLevelQuery = `?{Spell Level${levelQuery}}`;
        }
        if (higherLevelQuery !== '') {
          finalSetAttrs[`higher_level_query_${i}`] = higherLevelQuery;
        } else {
          finalSetAttrs[`higher_level_query_${i}`] = i;
        }
        if (v[`spell_slots_l${i}`] === '0' && higherLevelQuery !== i) {
          finalSetAttrs[`cast_as_level_${i}`] = higherLevelQuery;
        } else {
          finalSetAttrs[`cast_as_level_${i}`] = '';
        }
      }
    },
  });
};
on('change:warlock_level change:spell_slots_l1 change:spell_slots_l2 change:spell_slots_l3 change:spell_slots_l4 change:spell_slots_l5 change:spell_slots_l6 change:spell_slots_l7 change:spell_slots_l8 change:spell_slots_l9', () => {
  generateHigherLevelQueries();
});

function updateD20Mod() {
  getSetItems({
    collectionArray: ['halfling_luck'],
    callback: (v, finalSetAttrs) => {
      if (v.halfling_luck === 'on') {
        finalSetAttrs.d20_mod = 'ro<1';
      } else {
        finalSetAttrs.d20_mod = '';
      }
    },
  });
}
on('change:halfling_luck', () => {
  updateD20Mod();
});

const updateAbilityChecksMacro = () => {
  const collectionArray = ['ability_checks_query_var', 'ability_checks_macro_var', 'ability_checks_show_totals'];
  for (const ability of ABILITIES) {
    collectionArray.push(`${ability}_check_mod`);
    collectionArray.push(`${ability}_check_mod_with_sign`);
  }

  getSetRepeatingItems({
    repeatingItems: ['repeating_skill'],
    collectionArray,
    collectionArrayAddItems: ['name', 'ability', 'total_with_sign'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      finalSetAttrs.ability_checks_query_var = '?{Ability Check';
      finalSetAttrs.ability_checks_macro_var = '';
      finalSetAttrs.skills_macro_var = '';


      for (const ability of ABILITIES) {
        finalSetAttrs.ability_checks_query_var += `|${capitalize(ability)},{{title=${capitalize(ability)}&#125;&#125; {{roll1=[[@{shaped_d20} + ${v[`${ability}_check_mod`]}]]&#125;&#125; @{roll_setting} + ${v[`${ability}_check_mod`]}]]&#125;&#125;`;
        if (v.ability_checks_show_totals === 'on') {
          finalSetAttrs.ability_checks_macro_var += `[${capitalize(ability)} ${v[`${ability}_check_mod_with_sign`]}](~shaped_${ability}_check)`;
        } else {
          finalSetAttrs.ability_checks_macro_var += `[${capitalize(ability)}](~shaped_${ability}_check)`;
        }
        finalSetAttrs.ability_checks_macro_var += ', ';
      }
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;
        finalSetAttrs.ability_checks_query_var += `|${v[`${repeatingString}name`]}, {{title=${v[`${repeatingString}name`]} (${capitalize(getAbilityShortName(v[`${repeatingString}ability`]))})&#125;&#125; {{roll1=[[@{shaped_d20} + @{${repeatingString}formula}]]&#125;&#125; @{roll_setting} + @{${repeatingString}formula}]]&#125;&#125;`;
        if (id !== ids[0]) {
          finalSetAttrs.ability_checks_macro_var += ', ';
          finalSetAttrs.skills_macro_var += ', ';
        }
        let skillButton;
        if (v.ability_checks_show_totals === 'on') {
          skillButton = `[${v[`${repeatingString}name`]} ${v[`${repeatingString}total_with_sign`]}](~repeating_skill_${id}_skill)`;
        } else {
          skillButton = `[${v[`${repeatingString}name`]}](~repeating_skill_${id}_skill)`;
        }
        finalSetAttrs.ability_checks_macro_var += skillButton;
        finalSetAttrs.skills_macro_var += skillButton;
      }
      finalSetAttrs.ability_checks_query_var += '}';
    },
  });
};

const updateShapedD20 = () => {
  getSetItems({
    collectionArray: ['roll_setting', 'roll_info', 'shaped_d20'],
    callback: (v, finalSetAttrs) => {
      finalSetAttrs.roll_info = '';
      finalSetAttrs.shaped_d20 = 'd20';

      if (v.roll_setting === 'adv {{ignore=[[0') {
        finalSetAttrs.roll_info = '{{advantage=1}}';
        finalSetAttrs.shaped_d20 = '2d20@{d20_mod}kh1';
      } else if (v.roll_setting === 'dis {{ignore=[[0') {
        finalSetAttrs.roll_info = '{{disadvantage=1}}';
        finalSetAttrs.shaped_d20 = '2d20@{d20_mod}kl1';
      }
    },
  });
};
on('change:roll_setting', () => {
  updateShapedD20();
});

const updateSkill = (rowId) => {
  const collectionArray = ['jack_of_all_trades_toggle', 'jack_of_all_trades', 'remarkable_athlete_toggle', 'remarkable_athlete', 'pb', 'exp', 'global_check_bonus'];
  for (const ability of ABILITIES) {
    collectionArray.push(`${ability}_mod`);
    collectionArray.push(`${ability}_check_bonus`);
  }

  getSetRepeatingItems({
    repeatingItems: ['repeating_skill'],
    collectionArray,
    collectionArrayAddItems: ['skill_d20', 'skill_info', 'proficiency', 'name', 'storage_name', 'ability', 'bonus', 'ability_key', 'formula', 'total', 'total_with_sign', 'passive_bonus', 'passive_total'],
    rowId,
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;

        const skillName = v[`${repeatingString}name`];
        if (isUndefinedOrEmpty(skillName)) {
          return;
        }

        finalSetAttrs[`${repeatingString}ability_key`] = getAbilityShortName(v[`${repeatingString}ability`]).toUpperCase();

        let total = 0;
        let totalFormula = '';
        const proficiency = v[`${repeatingString}proficiency`];
        if (!proficiency || proficiency === 'unproficient') {
          if ((v[`${repeatingString}ability`] === 'strength' || v[`${repeatingString}ability`] === 'dexterity' || v[`${repeatingString}ability`] === 'constitution') && v.remarkable_athlete_toggle === '@{remarkable_athlete}') {
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

        const abilityValue = getAbilityValue(v, v[`${repeatingString}ability`], 'strength');
        if (exists(abilityValue)) {
          total += abilityValue;
          totalFormula += `${addArithmeticOperator(totalFormula, abilityValue)}[${getAbilityShortName(v[`${repeatingString}ability`])}]`;
        }

        const skillBonus = getIntValue(v[`${repeatingString}bonus`]);
        if (exists(skillBonus)) {
          total += skillBonus;
          totalFormula += `${addArithmeticOperator(totalFormula, skillBonus)}[bonus]`;
        }

        if (exists(v[`${repeatingString}ability`])) {
          let checkBonus = v[`${v[`${repeatingString}ability`]}_check_bonus`];
          if (exists(checkBonus)) {
            checkBonus = getIntValue(checkBonus);
            total += checkBonus;
            totalFormula += `${addArithmeticOperator(totalFormula, checkBonus)}[${getAbilityShortName(v[`${repeatingString}ability`])} check bonus]`;
          }
        }

        const globalCheckBonus = v.global_check_bonus;
        if (exists(globalCheckBonus)) {
          if (!isNaN(globalCheckBonus)) {
            total += getIntValue(globalCheckBonus);
          }
          if (totalFormula) {
            totalFormula += ' + ';
          }
          totalFormula += '(@{global_check_bonus})[global check bonus]';
        }
        const passiveBonus = getIntValue(v[`${repeatingString}passive_bonus`]);
        let advantageOrDisadvantage = 0;

        finalSetAttrs[`${repeatingString}skill_info`] = '';

        if (v[`${repeatingString}skill_d20`] && v[`${repeatingString}skill_d20`].indexOf('kh1') !== -1) {
          finalSetAttrs[`${repeatingString}skill_info`] = '{{advantage=1}}';
          advantageOrDisadvantage = 5;
        } else if (v[`${repeatingString}skill_d20`] && v[`${repeatingString}skill_d20`].indexOf('kl1') !== -1) {
          finalSetAttrs[`${repeatingString}skill_info`] = '{{disadvantage=1}}';
          advantageOrDisadvantage = -5;
        } else {
          finalSetAttrs[`${repeatingString}skill_info`] = '';
        }

        const passiveTotal = 10 + total + passiveBonus + advantageOrDisadvantage;

        finalSetAttrs[`${repeatingString}total`] = total;
        finalSetAttrs[`${repeatingString}passive`] = passiveTotal;
        finalSetAttrs[`${repeatingString}total_with_sign`] = showSign(total);
        finalSetAttrs[`${repeatingString}formula`] = totalFormula;
      }
    },
    setFinalAttrsCallback: () => {
      updateAbilityChecksMacro();
    },
  });
};

on('change:repeating_skill', (eventInfo) => {
  const repeatingInfo = getRepeatingInfo('repeating_skill', eventInfo);
  if (repeatingInfo && repeatingInfo.field !== 'ability_key' && repeatingInfo.field !== 'total' && repeatingInfo.field !== 'total_with_sign' && repeatingInfo.field !== 'passive_total' && repeatingInfo.field !== 'passive_total_with_sign' && repeatingInfo.field !== 'formula') {
    updateSkill(repeatingInfo.rowId);
  }
});
on('remove:repeating_skill change:ability_checks_show_totals', () => {
  updateAbilityChecksMacro();
});
on('change:jack_of_all_trades_toggle change:jack_of_all_trades change:remarkable_athlete_toggle change:remarkable_athlete change:global_check_bonus change:strength_check_bonus change:dexterity_check_bonus change:constitution_check_bonus change:intelligence_check_bonus change:wisdom_check_bonus change:charisma_check_bonus', () => {
  updateSkill();
});

const updateSkillsFromSRD = () => {
  getSetRepeatingItems({
    repeatingItems: ['repeating_skill'],
    collectionArray: ['skills_srd', 'level', 'challenge', 'strength_mod', 'dexterity_mod', 'constitution_mod', 'intelligence_mod', 'wisdom_mod', 'charisma_mod', 'expertise_as_advantage'],
    collectionArrayAddItems: ['name', 'ability'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      const skillsFromSRD = v.skills_srd;
      const skillsObj = {};
      const pb = getPB(v.level, v.challenge);
      const expertise = pb * 2;
      let skillName;
      let repeatingString;

      if (!isUndefinedOrEmpty(skillsFromSRD)) {
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
                if (v.expertise_as_advantage === '1') {
                  finalSetAttrs[`${repeatingString}skill_d20`] = '2d20@{d20_mod}kh1';
                  finalSetAttrs[`${repeatingString}proficiency`] = 'proficient';
                } else {
                  finalSetAttrs[`${repeatingString}proficiency`] = 'expertise';
                }
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
    },
  });
};
on('change:skills_srd', () => {
  updateSkillsFromSRD();
});

const getHighestOfAbilityScoresForSavingThrow = (v, savingThrowName) => {
  let abilityName;
  let highestValue = 0;
  for (const ability of ABILITIES) {
    const abilityMod = getIntValue(v[`${ability}_mod`]);
    if (v[`${savingThrowName}_${ability}`] === '1' && (highestValue === 0 || abilityMod > highestValue)) {
      highestValue = abilityMod;
      abilityName = ability;
    }
  }
  return abilityName;
};
const findHighest = (arr) => {
  const highestAbility = Math.max.apply(Math, arr.map((ability) => ability.score));
  return arr.find((ability) => ability.score === highestAbility);
};

const getHighestAbilityScores = (v, savingThrowName) => {
  const abilities = [];
  for (const ability of ABILITIES) {
    if (v[`${savingThrowName}_${ability}`] === '1') {
      abilities.push({
        name: ability,
        score: getIntValue(v[`${ability}_calculated`]),
      });
    }
  }

  const highestAbilities = [];
  if (abilities.length > 0) {
    const highestAbilityObj = findHighest(abilities);

    highestAbilities.push(highestAbilityObj);
    abilities.splice(abilities.findIndex((ability) => ability.name === highestAbilityObj.name), 1);
  }
  if (abilities.length > 0) {
    const secondHighestAbilityObj = findHighest(abilities);
    highestAbilities.push(secondHighestAbilityObj);
  }

  return highestAbilities;
};
const getAverageOfHighestAbilityScoresForSavingThrow = (v, savingThrowName) => {
  const obj = {
    abilitiesUsed: [],
  };
  let sum = 0;

  const highestAbilities = getHighestAbilityScores(v, savingThrowName);
  for (const ability of highestAbilities) {
    obj.abilitiesUsed.push(getAbilityShortName(ability.name));
    sum += (getIntValue(v[`${ability.name}_calculated`]) - 10) / 2;
  }

  if (obj.abilitiesUsed.length > 0) {
    obj.avg = Math.floor(sum / obj.abilitiesUsed.length);
  }
  return obj;
};

const setCustomSaveProf = (v, finalSetAttrs, savingThrowName) => {
  const pbVar = '@{PB}';
  for (const ability of ABILITIES) {
    if (v[`${savingThrowName}_${ability}`] === '1' && v[`${ability}_save_prof`] === pbVar && !exists(v[`${savingThrowName}_save_prof`])) {
      finalSetAttrs[`${savingThrowName}_save_prof`] = pbVar;
    }
  }
};

const updateSavingThrow = (savingThrowName) => {
  const collectionArray = ['pb', `${savingThrowName}_save_prof`, `${savingThrowName}_save_bonus`, 'global_saving_throw_bonus', 'saving_throws_half_proficiency', 'average_of_abilities'];
  const customSaves = ['fortitude', 'reflex', 'will'];
  const customSavingThrow = customSaves.indexOf(savingThrowName) !== -1;
  for (const ability of ABILITIES) {
    collectionArray.push(`${ability}_calculated`);
    collectionArray.push(`${ability}_mod`);
    collectionArray.push(`${savingThrowName}_${ability}`);
    if (customSavingThrow) {
      collectionArray.push(`${ability}_save_prof`);
      for (const ability of ABILITIES) {
        collectionArray.push(`${savingThrowName}_${ability}`);
      }
    }
  }

  getSetItems({
    collectionArray,
    callback: (v, finalSetAttrs) => {
      let total = 0;
      let totalFormula = '';
      let ability;

      if (customSavingThrow) {
        if (v.average_of_abilities === '1') {
          const obj = getAverageOfHighestAbilityScoresForSavingThrow(v, savingThrowName);

          if (obj.avg) {
            total = obj.avg;
            totalFormula = `${obj.avg}[${obj.abilitiesUsed.join(' ')} avg]`;
          }
        } else {
          ability = getHighestOfAbilityScoresForSavingThrow(v, savingThrowName);
        }
        setCustomSaveProf(v, finalSetAttrs, savingThrowName);
      } else {
        ability = savingThrowName;
      }

      if (ability) {
        const abilityMod = getIntValue(v[`${ability}_mod`]);
        total = abilityMod;
        totalFormula = `${abilityMod}[${getAbilityShortName(ability)}]`;
      }

      const pb = getIntValue(v.pb);
      if (v[`${savingThrowName}_save_prof`] === '@{PB}') {
        total += pb;
        totalFormula += `${addArithmeticOperator(totalFormula, pb)}[proficient]`;
      } else if (v.saving_throws_half_proficiency === 'on') {
        const halfPB = Math.floor(pb / 2);
        total += halfPB;
        totalFormula += `${addArithmeticOperator(totalFormula, halfPB)}[half proficiency]`;
      }

      const abilitySavingThrowBonus = getIntValue(v[`${savingThrowName}_save_bonus`]);
      if (abilitySavingThrowBonus) {
        total += abilitySavingThrowBonus;
        totalFormula += `${addArithmeticOperator(totalFormula, abilitySavingThrowBonus)}[${getAbilityShortName(ability)}saving throw bonus]`;
      }

      const globalSavingThrowBonus = v.global_saving_throw_bonus;
      if (!isUndefinedOrEmpty(globalSavingThrowBonus)) {
        if (!isNaN(globalSavingThrowBonus)) {
          total += getIntValue(globalSavingThrowBonus);
        }
        totalFormula += `${addArithmeticOperator(totalFormula, globalSavingThrowBonus)}[global saving throw bonus]`;
      }

      finalSetAttrs[`${savingThrowName}_saving_throw_mod`] = totalFormula;
      finalSetAttrs[`${savingThrowName}_saving_throw_mod_with_sign`] = showSign(total);
    },
  });
};
const updateCustomSavingThrows = () => {
  updateSavingThrow('fortitude');
  updateSavingThrow('reflex');
  updateSavingThrow('will');
};
const updateSavingThrows = () => {
  updateSavingThrow('strength');
  updateSavingThrow('dexterity');
  updateSavingThrow('constitution');
  updateSavingThrow('intelligence');
  updateSavingThrow('wisdom');
  updateSavingThrow('charisma');
  updateCustomSavingThrows();
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
const watchAbilityChanges = () => {
  const classFeatureWatch = [];
  for (const ability of ABILITIES) {
    classFeatureWatch.push(`change:${ability}`);
    classFeatureWatch.push(`change:${ability}_mod`);
  }
  on(classFeatureWatch.join(' '), () => {
    updateCustomSavingThrows();
  });
};
watchAbilityChanges();
const watchForCustomSavingThrowChanges = (savingThrowName) => {
  const classFeatureWatch = [`change:${savingThrowName}_save_prof`, `change:${savingThrowName}_save_bonus`, 'change:average_of_abilities'];
  for (const ability of ABILITIES) {
    classFeatureWatch.push(`change:${savingThrowName}_${ability}`);
  }
  on(classFeatureWatch.join(' '), () => {
    updateSavingThrow(savingThrowName);
  });
};
watchForCustomSavingThrowChanges('fortitude');
watchForCustomSavingThrowChanges('reflex');
watchForCustomSavingThrowChanges('will');

const updateCustomSavingThrowToggle = () => {
  getSetItems({
    collectionArray: ['use_custom_saving_throws', 'saving_throw_macro_var_to_use'],
    callback: (v, finalSetAttrs) => {
      if (v.use_custom_saving_throws === '1') {
        finalSetAttrs.saving_throw_macro_var_to_use = '@{custom_saving_throw_macro_var}';
      } else {
        finalSetAttrs.saving_throw_macro_var_to_use = '@{saving_throw_macro_var}';
      }
    },
  });
};
on('change:use_custom_saving_throws', () => {
  updateCustomSavingThrowToggle();
});

const updateSavingThrowsFromSRD = () => {
  getSetItems({
    collectionArray: ['saving_throws_srd'],
    callback: (v, finalSetAttrs) => {
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
    },
  });
};
on('change:saving_throws_srd', () => {
  updateSavingThrowsFromSRD();
});

const updateSpellsFromSRD = () => {
  getSetItems({
    collectionArray: ['spells_srd'],
    callback: (v, finalSetAttrs) => {
      const spells = v.spells_srd.split(', ');

      for (const spell of spells) {
        const repeatingString = `repeating_spell_${generateRowID()}_`;
        finalSetAttrs[`${repeatingString}name`] = spell;
      }
    },
  });
};
on('change:spells_srd', () => {
  updateSpellsFromSRD();
});

const updateAttachers = () => {
  const collectionArray = ['attacher_initiative', 'attacher_death_saving_throw', 'attacher_hit_dice', 'attacher_attack', 'attacher_spell', 'attacher_skill', 'attacher_crit'];
  const itemsToPush = ['initiative', 'death_saving_throw', 'hit_dice', 'attack', 'spell', 'skill'];
  for (const ability of ABILITIES) {
    collectionArray.push(`attacher_${ability}_check`);
    collectionArray.push(`attacher_${ability}_saving_throw`);
    itemsToPush.push(`${ability}_check`);
    itemsToPush.push(`${ability}_saving_throw`);
  }

  getSetRepeatingItems({
    repeatingItems: ['repeating_attacher'],
    collectionArray,
    collectionArrayAddItems: ['name', 'freetext', 'freeform', 'crit_attacher'],
    itemsToPush,
    itemToPushSuffix: 'attacher',
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const itemToPush of itemsToPush) {
        finalSetAttrs[`attacher_${itemToPush}`] = '';
      }
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
    },
  });
};

on('change:repeating_attacher remove:repeating_attacher', () => {
  updateAttachers();
});

const updateNPCChallenge = () => {
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

  getSetItems({
    collectionArray: ['challenge', 'xp'],
    callback: (v, finalSetAttrs) => {
      const challenge = v.challenge;

      finalSetAttrs.xp = xpPerChallenge[challenge];
      finalSetAttrs.xp_readable = numberWithCommas(finalSetAttrs.xp);

      finalSetAttrs.level = challenge;
      if (finalSetAttrs.level < 1) {
        finalSetAttrs.level = 1;
      }
    },
  });
};

on('change:challenge', () => {
  updateNPCChallenge();
});

const updateNPCHPFromSRD = () => {
  getSetItems({
    collectionArray: ['hp_srd', 'constitution', 'constitution_mod', 'constitution_bonus', 'global_ability_bonus'],
    callback: (v, finalSetAttrs) => {
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
    },
  });
};
on('change:hp_srd', () => {
  updateNPCHPFromSRD();
});

const updateNPCHP = () => {
  getSetItems({
    collectionArray: ['HP', 'HP_max', 'hp_formula', 'hit_dice', 'hit_die', 'hp_extra', 'constitution_mod'],
    callback: (v, finalSetAttrs) => {
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
    },
  });
};
on('change:hit_dice change:hit_die change:hp_extra change:constitution_mod', () => {
  updateNPCHP();
});
const updateNPCHD = () => {
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
  const collectionArray = ['hit_dice', 'hit_die'];
  for (const key in hd) {
    if (hd.hasOwnProperty(key)) {
      collectionArray.push(`hd_${key}_max`);
      collectionArray.push(`hd_${key}_query`);
      collectionArray.push(`hd_${key}_toggle`);
    }
  }
  getSetItems({
    collectionArray,
    callback: (v, finalSetAttrs) => {
      const hdNum = getIntValue(v.hit_dice);
      const hdSize = v.hit_die;

      if (hdNum && hdSize) {
        hd[hdSize] = hdNum;

        updateHD(v, finalSetAttrs, hd);
      }
    },
  });
};
on('change:hit_dice change:hit_die', () => {
  updateNPCHD();
});

const updateNPCAC = () => {
  getSetItems({
    collectionArray: ['ac_srd', 'ac', 'ac_note', 'dexterity_mod'],
    callback: (v, finalSetAttrs) => {
      if (exists(v.ac_srd)) {
        const match = v.ac_srd.match(/(\d+)\s?(.*)/);
        if (match && match[1]) {
          finalSetAttrs.AC = match[1];
        }
        if (match && match[2]) {
          finalSetAttrs.ac_note = match[2].replace(/\(|\)/g, '');
        }
      }
    },
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

  finalSetAttrs.default_ability = highestAbilityName;
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
      const legendaryActionsMatch = section.match(/Can take (\d+) Legendary Actions/i);
      if (legendaryActionsMatch && legendaryActionsMatch[1]) {
        finalSetAttrs.legendary_action_amount = legendaryActionsMatch[1];
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
  for (const ability of ABILITIES) {
    collectionArray.push(ability);
  }

  getSetItems({
    collectionArray,
    callback: (v, finalSetAttrs) => {
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
    },
  });
};
on('change:content_srd', () => {
  updateNPCContent();
});

const displayTextForTraits = () => {
  getSetRepeatingItems({
    repeatingItems: ['repeating_trait'],
    collectionArrayAddItems: ['display_text', 'freetext'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;

        if (isUndefinedOrEmpty(v[`${repeatingString}display_text`])) {
          finalSetAttrs[`${repeatingString}display_text`] = v[`${repeatingString}freetext`];
        }
      }
    },
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
    finalSetAttrs[`${repeatingString}${name}_toggle`] = toggleVars[name];
  }
  return freetext;
};

const parseAction = (type, rowId) => {
  const collectionArray = ['level', 'challenge', 'global_attack_bonus', 'global_melee_attack_bonus', 'global_ranged_attack_bonus', 'global_damage_bonus', 'global_melee_damage_bonus', 'global_ranged_damage_bonus', 'default_ability'];
  for (const ability of ABILITIES) {
    collectionArray.push(`${ability}_mod`);
  }
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

  const typeRegex = /(melee|ranged|melee or ranged)\s*(spell|weapon)\s*attack/gi;
  const toHitRegex = /:\s?\+\s?(\d+)\s*(?:to hit)/gi;
  const reachRegex = /(?:reach)\s?(\d+)\s?(?:ft)/gi;
  const rangeRegex = /(?:range)\s?(\d+)\/(\d+)\s?(ft)/gi;
  const spellcastingRegex = /(\d+)\w+\slevel\s\((\d+)\s?slot(?:s)?\)/gi;
  const spellcastingLevelRegex = /(\d+)(?:st|dn|rd|th)-level spellcaster/i;
  const spellcastingAbilityRegex = /spellcasting ability is (\w+)/i;

  getSetRepeatingItems({
    repeatingItems: [`repeating_${type}`],
    collectionArray,
    collectionArrayAddItems: ['name', 'freetext'],
    rowId,
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
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
            } else if (actionType[1] === 'ranged') {
              finalSetAttrs[`${repeatingString}type`] = 'Ranged Weapon';
              rangedAttack = true;
            } else {
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
          finalSetAttrs[`${repeatingString}roll_toggle`] = toggleVars.roll;
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
            finalSetAttrs[`${repeatingString}saving_throw_toggle`] = toggleVars.saving_throw;
          }
          if (savingThrow[2]) {
            finalSetAttrs[`${repeatingString}saving_throw_vs_ability`] = savingThrow[2].toUpperCase();
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

        finalSetAttrs[`${repeatingString}extras_toggle`] = toggleVars.extras;
      }
    },
    setFinalAttrsCallback: () => {
      updateAction(type, rowId);
    },
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
  getSetRepeatingItems({
    repeatingItems: [`repeating_${type}`],
    collectionArray: [`${type}s_exist`],
    callback: (v, finalSetAttrs, ids) => {
      if (ids.length > 0) {
        finalSetAttrs[`${type}s_exist`] = 1;
      } else if (exists(v[`${type}s_exist`])) {
        finalSetAttrs[`${type}s_exist`] = 0;
      }
    },
  });
};
on('change:repeating_trait remove:repeating_trait', () => {
  countAction('trait');
  updateActionChatMacro('trait');
});
on('change:repeating_action remove:repeating_action', () => {
  countAction('action');
  updateActionChatMacro('action');
});
on('change:repeating_reaction remove:repeating_reaction', () => {
  countAction('reaction');
  updateActionChatMacro('reaction');
});
on('change:repeating_legendaryaction remove:repeating_legendaryaction', () => {
  countAction('legendaryaction');
  updateActionChatMacro('legendaryaction');
});
on('change:repeating_lairaction remove:repeating_lairaction', () => {
  countAction('lairaction');
  updateActionChatMacro('lairaction');
});
on('change:repeating_regionaleffect remove:repeating_regionaleffect', () => {
  countAction('regionaleffect');
  updateActionChatMacro('regionaleffect');
});

const switchToNPC = () => {
  getSetItems({
    collectionArray: ['is_npc', 'size'],
    callback: (v, finalSetAttrs) => {
      const isNPC = getIntValue(v.is_npc) === 1;

      if (isNPC && isUndefinedOrEmpty(v.size)) {
        finalSetAttrs.size = 'Large';
      }

      if (isNPC) {
        finalSetAttrs.hit_dice_output_option = '/w GM';
      } else {
        finalSetAttrs.hit_dice_output_option = '';
      }
    },
  });
};
on('change:is_npc', () => {
  switchToNPC();
});

const updateSize = () => {
  getSetItems({
    collectionArray: ['size'],
    callback: (v, finalSetAttrs) => {
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
    },
  });
};
on('change:size', () => {
  updateSize();
});

const updateType = () => {
  getSetItems({
    collectionArray: ['type'],
    callback: (v, finalSetAttrs) => {
      if (v.type) {
        finalSetAttrs.type = v.type.toLowerCase();
      }
    },
  });
};
on('change:type', () => {
  updateType();
});

const updateAlignment = () => {
  getSetItems({
    collectionArray: ['alignment', 'is_npc'],
    callback: (v, finalSetAttrs) => {
      if (v.alignment && v.is_npc === '1') {
        finalSetAttrs.alignment = v.alignment.toLowerCase();
      }
    },
  });
};
on('change:alignment', () => {
  updateAlignment();
});

const updateSenses = () => {
  getSetItems({
    collectionArray: ['senses'],
    callback: (v, finalSetAttrs) => {
      if (v.senses) {
        finalSetAttrs.senses_exist = 1;
        finalSetAttrs.senses = v.senses.toLowerCase();
      } else {
        finalSetAttrs.senses_exist = 0;
      }
    },
  });
};
on('change:senses', () => {
  updateSenses();
});

const updateLanguages = () => {
  getSetItems({
    collectionArray: ['languages', 'languages_exist', 'languages_chat_var'],
    callback: (v, finalSetAttrs) => {
      finalSetAttrs.languages_exist = 0;
      finalSetAttrs.languages_chat_var = '';

      if (v.languages) {
        finalSetAttrs.languages_exist = 1;
        finalSetAttrs.languages_chat_var = '{{Languages=@{languages}}}';
      }
    },
  });
};
on('change:languages', () => {
  updateLanguages();
});

const updateSpeed = () => {
  getSetItems({
    collectionArray: ['npc_speed'],
    callback: (v, finalSetAttrs) => {
      finalSetAttrs.npc_speed = v.npc_speed.toLowerCase();
      const match = finalSetAttrs.npc_speed.match(/^\s*(\d+)\s*ft/);
      if (match && match[1]) {
        finalSetAttrs.speed = match[1];
      }
    },
  });
};
on('change:npc_speed', () => {
  updateSpeed();
});

const updateACNote = () => {
  getSetItems({
    collectionArray: ['ac_note'],
    callback: (v, finalSetAttrs) => {
      finalSetAttrs.ac_note = v.ac_note.toLowerCase();
    },
  });
};
on('change:ac_note', () => {
  updateACNote();
});

const updateDamageResistancesVar = () => {
  getSetItems({
    collectionArray: ['damage_resistances_var', 'damage_vulnerabilities_exist', 'damage_resistances_exist', 'damage_immunities_exist', 'condition_immunities_exist'],
    callback: (v, finalSetAttrs) => {
      finalSetAttrs.damage_resistances_var = '';

      if (v.damage_vulnerabilities_exist) {
        finalSetAttrs.damage_resistances_var += '{{Damage Vulnerabilities=@{damage_vulnerabilities}}}';
      }
      if (v.damage_resistances_exist) {
        if (finalSetAttrs.damage_resistances_var !== '') {
          finalSetAttrs.damage_resistances_var += ' ';
        }
        finalSetAttrs.damage_resistances_var += '{{Damage Resistances=@{damage_resistances}}}';
      }
      if (v.damage_immunities_exist) {
        if (finalSetAttrs.damage_resistances_var !== '') {
          finalSetAttrs.damage_resistances_var += ' ';
        }
        finalSetAttrs.damage_resistances_var += '{{Damage Immunities=@{damage_immunities}}}';
      }
      if (v.condition_immunities_exist) {
        if (finalSetAttrs.damage_resistances_var !== '') {
          finalSetAttrs.damage_resistances_var += ' ';
        }
        finalSetAttrs.damage_resistances_var += '{{Condition Immunities=@{condition_immunities}}}';
      }
    },
  });
};

const updateDamageVulnerabilities = () => {
  getSetItems({
    collectionArray: ['damage_vulnerabilities'],
    callback: (v, finalSetAttrs) => {
      if (v.damage_vulnerabilities) {
        finalSetAttrs.damage_vulnerabilities_exist = 1;
        finalSetAttrs.damage_vulnerabilities = lowercaseDamageTypes(v.damage_vulnerabilities);
      } else {
        finalSetAttrs.damage_vulnerabilities_exist = 0;
      }
    },
    setFinalAttrsCallback: () => {
      updateDamageResistancesVar();
    },
  });
};
on('change:damage_vulnerabilities', () => {
  updateDamageVulnerabilities();
});
const updateDamageResistances = () => {
  getSetItems({
    collectionArray: ['damage_resistances'],
    callback: (v, finalSetAttrs) => {
      if (v.damage_resistances) {
        finalSetAttrs.damage_resistances_exist = 1;
        finalSetAttrs.damage_resistances = lowercaseDamageTypes(v.damage_resistances);
      } else {
        finalSetAttrs.damage_resistances_exist = 0;
      }
    },
    setFinalAttrsCallback: () => {
      updateDamageResistancesVar();
    },
  });
};
on('change:damage_resistances', () => {
  updateDamageResistances();
});
const updateDamageImmunities = () => {
  getSetItems({
    collectionArray: ['damage_immunities'],
    callback: (v, finalSetAttrs) => {
      if (v.damage_immunities) {
        finalSetAttrs.damage_immunities_exist = 1;
        finalSetAttrs.damage_immunities = lowercaseDamageTypes(v.damage_immunities);
      } else {
        finalSetAttrs.damage_immunities_exist = 0;
      }
    },
    setFinalAttrsCallback: () => {
      updateDamageResistancesVar();
    },
  });
};
on('change:damage_immunities', () => {
  updateDamageImmunities();
});
const updateConditionImmunities = () => {
  getSetItems({
    collectionArray: ['condition_immunities'],
    callback: (v, finalSetAttrs) => {
      if (v.condition_immunities) {
        finalSetAttrs.condition_immunities_exist = 1;
        finalSetAttrs.condition_immunities = lowercaseDamageTypes(v.condition_immunities);
      } else {
        finalSetAttrs.condition_immunities_exist = 0;
      }
    },
    setFinalAttrsCallback: () => {
      updateDamageResistancesVar();
    },
  });
};
on('change:condition_immunities', () => {
  updateConditionImmunities();
});

const oldValueToNew = (v, finalSetAttrs, repeatingString, newRepeatingString, field) => {
  finalSetAttrs[`${newRepeatingString}${field}`] = v[`${repeatingString}${field}`];
};
const resourcesToTraits = () => {
  getSetRepeatingItems({
    repeatingItems: ['repeating_resource'],
    collectionArrayAddItems: ['name', 'uses', 'uses_max', 'toggle_details', 'recharge', 'extras_toggle', 'freetext', 'freeform'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      const fieldsToSwap = ['name', 'uses', 'uses_max', 'toggle_details', 'recharge', 'extras_toggle', 'freetext', 'freeform'];
      for (const id of ids) {
        for (const field of fieldsToSwap) {
          oldValueToNew(v, finalSetAttrs, `${repeatingItem}_${id}_`, `repeating_trait_${generateRowID()}_`, field);
        }
      }
    },
  });
};
const classFeaturesToTraits = () => {
  getSetRepeatingItems({
    repeatingItems: ['repeating_classfeature'],
    collectionArrayAddItems: ['name', 'uses', 'uses_max', 'recharge', 'saving_throw_toggle', 'saving_throw_condition', 'saving_throw_ability', 'saving_throw_bonus', 'saving_throw_vs_ability', 'saving_throw_failure', 'saving_throw_success', 'damage_toggle', 'damage', 'damage_ability', 'damage_bonus', 'damage_type', 'second_damage_toggle', 'second_damage', 'second_damage_ability', 'second_damage_bonus', 'second_damage_type', 'heal', 'heal_ability', 'heal_bonus', 'heal_query_toggle', 'extras_toggle', 'emote', 'freetext', 'freeform'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      const fieldsToSwap = ['name', 'uses', 'uses_max', 'recharge', 'saving_throw_toggle', 'saving_throw_condition', 'saving_throw_ability', 'saving_throw_bonus', 'saving_throw_vs_ability', 'saving_throw_failure', 'saving_throw_success', 'damage_toggle', 'damage', 'damage_ability', 'damage_bonus', 'damage_type', 'second_damage_toggle', 'second_damage', 'second_damage_ability', 'second_damage_bonus', 'second_damage_type', 'heal', 'heal_ability', 'heal_bonus', 'heal_query_toggle', 'extras_toggle', 'emote', 'freetext', 'display_text', 'freeform'];

      for (const id of ids) {
        for (const field of fieldsToSwap) {
          oldValueToNew(v, finalSetAttrs, `${repeatingItem}_${id}_`, `repeating_trait_${generateRowID()}_`, field);
        }
      }
    },
  });
};

const generateSkills = () => {
  getSetRepeatingItems({
    repeatingItems: ['repeating_skill'],
    collectionArrayAddItems: ['storage_name', 'name', 'ability'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const prop in SKILLS) {
        if (SKILLS.hasOwnProperty(prop)) {
          let skillId = getSkillIdByStorageName(v, repeatingItem, ids, prop);

          if (!skillId) {
            skillId = generateRowID();
          }
          const repeatingString = `${repeatingItem}_${skillId}_`;

          finalSetAttrs[`${repeatingString}storage_name`] = prop;
          finalSetAttrs[`${repeatingString}name`] = getTranslationByKey(prop);
          finalSetAttrs[`${repeatingString}ability`] = SKILLS[prop];
          updateSkill(skillId);
        }
      }
    },
    setFinalAttrsCallback: () => {
      updateAbilityChecksMacro();
    },
  });
};
on('change:generate_skills', () => {
  generateSkills();
});

on('change:pb', () => {
  updateSkill();
  updateAttack();
  updateSpell();
  updateJackOfAllTrades();
  updateRemarkableAthlete();
  updateActions();
});
on('change:strength_mod change:dexterity_mod change:constitution_mod change:intelligence_mod change:wisdom_mod change:charisma_mod', () => {
  updateSkill();
  updateAttack();
  updateSpell();
  updateActions();
});

const extasToExtrasFix = (repeatingSection) => {
  getSetRepeatingItems({
    repeatingItems: [repeatingSection],
    collectionArrayAddItems: ['extas_toggle'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;

        if (!isUndefinedOrEmpty(v[`${repeatingString}extas_toggle`])) {
          finalSetAttrs[`${repeatingString}extras_toggle`] = v[`${repeatingString}extas_toggle`];
        }
      }
    },
  });
};

const armorPlusDexRemoval = () => {
  getSetRepeatingItems({
    repeatingItems: ['repeating_armor'],
    collectionArrayAddItems: ['type'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;
        const armorType = v[`${repeatingString}type`];
        if (armorType === 'Armor + Dex') {
          finalSetAttrs[`${repeatingString}type`] = 'Light Armor';
        }
      }
    },
  });
};

const fixRollTwo = () => {
  getSetItems({
    collectionArray: ['roll_setting'],
    callback: (v, finalSetAttrs) => {
      if (v.roll_setting === '@{attr_roll_2}') {
        finalSetAttrs.roll_setting = '{{roll2=[[d20@{d20_mod}';
      }
    },
  });
};

const atSyntaxToAbilityName = (v, finalSetAttrs, repeatingString, field) => {
  if (v[`${repeatingString}${field}`]) {
    finalSetAttrs[`${repeatingString}${field}`] = getAbilityName(v[`${repeatingString}${field}`]);
  }
};

const updateActionComponents = () => {
  getSetRepeatingItems({
    repeatingItems: ['repeating_attack', 'repeating_spell', 'repeating_trait', 'repeating_action', 'repeating_reaction', 'repeating_legendaryaction', 'repeating_lairaction', 'repeating_regionaleffect'],
    collectionArrayAddItems: ['attack_ability', 'damage_ability', 'second_damage_ability', 'heal_ability', 'saving_throw_ability', 'saving_throw_vs_ability'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;
        atSyntaxToAbilityName(v, finalSetAttrs, repeatingString, 'attack_ability');
        atSyntaxToAbilityName(v, finalSetAttrs, repeatingString, 'damage_ability');
        atSyntaxToAbilityName(v, finalSetAttrs, repeatingString, 'second_damage_ability');
        atSyntaxToAbilityName(v, finalSetAttrs, repeatingString, 'heal_ability');
        atSyntaxToAbilityName(v, finalSetAttrs, repeatingString, 'saving_throw_ability');

        if (v[`${repeatingString}saving_throw_vs_ability`]) {
          finalSetAttrs[`${repeatingString}saving_throw_vs_ability`] = v[`${repeatingString}saving_throw_vs_ability`].toUpperCase();
        }
      }
    },
  });
};

const newAttackToggle = () => {
  getSetRepeatingItems({
    repeatingItems: ['repeating_attack', 'repeating_spell', 'repeating_action', 'repeating_reaction', 'repeating_legendaryaction', 'repeating_lairaction', 'repeating_regionaleffect'],
    collectionArrayAddItems: ['roll_toggle'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;
        if (v[`${repeatingString}roll_toggle`] === '{{vs_ac=1}} @{roll_info} {{roll1=[[@{shaped_d20}cs>@{crit_range} + @{attack_formula}]]}} @{roll_setting}cs>@{crit_range} + @{attack_formula}]]}} {{targetAC=@{attacks_vs_target_ac}}} {{targetName=@{attacks_vs_target_name}}}') {
          finalSetAttrs[`${repeatingString}roll_toggle`] = toggleVars.roll;
        }
      }
    },
  });
};

const newAttackToggleTwo = () => {
  getSetRepeatingItems({
    repeatingItems: ['repeating_attack', 'repeating_spell', 'repeating_action', 'repeating_reaction', 'repeating_legendaryaction', 'repeating_lairaction', 'repeating_regionaleffect'],
    collectionArrayAddItems: ['roll_toggle'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;
        if (v[`${repeatingString}roll_toggle`] === '{{vs_ac=1}} {{vs_saving_throw=@{attacks_vs_a_saving_throw}}} @{roll_info} {{roll1=[[@{shaped_d20}cs>@{crit_range} + @{attack_formula}]]}} @{roll_setting}cs>@{crit_range} + @{attack_formula}]]}} {{targetAC=@{attacks_vs_target_ac}}} {{targetName=@{attacks_vs_target_name}}}') {
          finalSetAttrs[`${repeatingString}roll_toggle`] = toggleVars.roll;
        }
      }
    },
  });
};

const newAbilityDefaults = () => {
  getSetRepeatingItems({
    repeatingItems: ['repeating_attack', 'repeating_action', 'repeating_reaction', 'repeating_legendaryaction', 'repeating_lairaction', 'repeating_regionaleffect'],
    collectionArrayAddItems: ['roll_toggle', 'roll_ability', 'damage_toggle', 'damage_ability'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;
        if (!isUndefinedOrEmpty(v[`${repeatingString}roll_toggle`]) && isUndefined(v[`${repeatingString}roll_ability`])) {
          finalSetAttrs[`${repeatingString}roll_ability`] = 'strength';
        }
        if (!isUndefinedOrEmpty(v[`${repeatingString}damage_toggle`]) && isUndefined(v[`${repeatingString}damage_ability`])) {
          finalSetAttrs[`${repeatingString}damage_ability`] = 'strength';
        }
      }
    },
  });
};

const changeOldToggleToNew = (v, finalSetAttrs, field, oldValue, newValue) => {
  if (v[field] === `@{${oldValue}}`) {
    finalSetAttrs[field] = newValue;
  }
};
const removeToggleVar = () => {
  getSetItems({
    collectionArray: ['careful_spell_toggle', 'distant_spell_toggle', 'empowered_spell_toggle', 'extended_spell_toggle', 'heightened_spell_toggle', 'quickened_spell_toggle', 'subtle_spell_toggle', 'twinned_spell_toggle', 'initiative_tie_breaker', 'ammo_auto_use', 'hide_attack', 'hide_damage', 'hide_saving_throw_dc', 'hide_spell_content', 'hide_action_freetext', 'hide_saving_throw_failure', 'hide_saving_throw_success', 'hide_recharge', 'initiative_output_option', 'output_option', 'death_save_output_option', 'hit_dice_output_option', 'roll_setting', 'show_character_name', 'attacks_vs_target_ac', 'attacks_vs_target_name', 'initiative_roll', 'initiative_to_tracker'],
    callback: (v, finalSetAttrs) => {
      changeOldToggleToNew(v, finalSetAttrs, 'careful_spell_toggle', 'careful_spell_toggle_var', '1');
      changeOldToggleToNew(v, finalSetAttrs, 'distant_spell_toggle', 'distant_spell_toggle_var', '1');
      changeOldToggleToNew(v, finalSetAttrs, 'empowered_spell_toggle', 'empowered_spell_toggle_var', '1');
      changeOldToggleToNew(v, finalSetAttrs, 'extended_spell_toggle', 'extended_spell_toggle_var', '1');
      changeOldToggleToNew(v, finalSetAttrs, 'heightened_spell_toggle', 'heightened_spell_toggle_var', '1');
      changeOldToggleToNew(v, finalSetAttrs, 'quickened_spell_toggle', 'quickened_spell_toggle_var', '1');
      changeOldToggleToNew(v, finalSetAttrs, 'subtle_spell_toggle', 'subtle_spell_toggle_var', '1');
      changeOldToggleToNew(v, finalSetAttrs, 'twinned_spell_toggle', 'twinned_spell_toggle_var', '1');
      changeOldToggleToNew(v, finalSetAttrs, 'initiative_tie_breaker', 'initiative_tie_breaker_var', '[[@{initiative} / 100]][tie breaker]');
      changeOldToggleToNew(v, finalSetAttrs, 'ammo_auto_use', 'ammo_auto_use_var', '1');

      changeOldToggleToNew(v, finalSetAttrs, 'hide_attack', 'hide_attack_var', '{{hide_attack=1}}');
      changeOldToggleToNew(v, finalSetAttrs, 'hide_damage', 'hide_damage_var', '{{hide_damage=1}}');
      changeOldToggleToNew(v, finalSetAttrs, 'hide_saving_throw_dc', 'hide_saving_throw_dc_var', '{{hide_saving_throw_dc=1}}');
      changeOldToggleToNew(v, finalSetAttrs, 'hide_spell_content', 'hide_spell_content_var', '{{hide_spell_content=1}}');
      changeOldToggleToNew(v, finalSetAttrs, 'hide_action_freetext', 'hide_action_freetext_var', '{{hide_freetext=1}}');
      changeOldToggleToNew(v, finalSetAttrs, 'hide_saving_throw_failure', 'hide_saving_throw_failure_var', '{{hide_saving_throw_failure=1}}');
      changeOldToggleToNew(v, finalSetAttrs, 'hide_saving_throw_success', 'hide_saving_throw_success_var', '{{hide_saving_throw_success=1}}');
      changeOldToggleToNew(v, finalSetAttrs, 'hide_recharge', 'hide_recharge_var', '{{hide_recharge=1}}');

      changeOldToggleToNew(v, finalSetAttrs, 'initiative_output_option', 'output_to_all', '');
      changeOldToggleToNew(v, finalSetAttrs, 'initiative_output_option', 'output_to_gm', '/w GM');
      changeOldToggleToNew(v, finalSetAttrs, 'output_option', 'output_to_all', '');
      changeOldToggleToNew(v, finalSetAttrs, 'output_option', 'output_to_gm', '/w GM');
      changeOldToggleToNew(v, finalSetAttrs, 'death_save_output_option', 'output_to_all', '');
      changeOldToggleToNew(v, finalSetAttrs, 'death_save_output_option', 'output_to_gm', '/w GM');
      changeOldToggleToNew(v, finalSetAttrs, 'hit_dice_output_option', 'output_to_all', '');
      changeOldToggleToNew(v, finalSetAttrs, 'hit_dice_output_option', 'output_to_gm', '/w GM');

      changeOldToggleToNew(v, finalSetAttrs, 'roll_setting', 'roll_advantage', 'adv {{ignore=[[0');
      changeOldToggleToNew(v, finalSetAttrs, 'roll_setting', 'roll_disadvantage', 'dis {{ignore=[[0');
      changeOldToggleToNew(v, finalSetAttrs, 'roll_setting', 'roll_1', '{{ignore=[[0');
      changeOldToggleToNew(v, finalSetAttrs, 'roll_setting', 'roll_2', '{{roll2=[[d20@{d20_mod}');

      changeOldToggleToNew(v, finalSetAttrs, 'show_character_name', 'show_character_name_no', '');
      changeOldToggleToNew(v, finalSetAttrs, 'show_character_name', 'show_character_name_yes', '{{show_character_name=1}}');
      changeOldToggleToNew(v, finalSetAttrs, 'attacks_vs_target_ac', 'attacks_vs_target_ac_no', '');
      changeOldToggleToNew(v, finalSetAttrs, 'attacks_vs_target_ac', 'attacks_vs_target_ac_yes', '[[@{target|AC}]]');
      changeOldToggleToNew(v, finalSetAttrs, 'attacks_vs_target_name', 'attacks_vs_target_name_no', '');
      changeOldToggleToNew(v, finalSetAttrs, 'attacks_vs_target_name', 'attacks_vs_target_name_yes', '@{target|token_name}');

      changeOldToggleToNew(v, finalSetAttrs, 'initiative_roll', 'normal_initiative', '@{shaped_d20}');
      changeOldToggleToNew(v, finalSetAttrs, 'initiative_roll', 'advantage_on_initiative', '2d20@{d20_mod}kh1');
      changeOldToggleToNew(v, finalSetAttrs, 'initiative_roll', 'disadvantage_on_initiative', '2d20@{d20_mod}kl1');

      changeOldToggleToNew(v, finalSetAttrs, 'initiative_to_tracker', 'initiative_to_tracker_yes', '@{selected|initiative_formula} &{tracker}');
      changeOldToggleToNew(v, finalSetAttrs, 'initiative_to_tracker', 'initiative_to_tracker_no', '@{initiative_formula}');
    },
  });
};

const changeOldRepeatingToggleToNew = (v, finalSetAttrs, repeatingString, field, oldValue, newValue) => {
  if (v[`${repeatingString}${field}`] === `@{${oldValue}}`) {
    finalSetAttrs[`${repeatingString}${field}`] = newValue;
  }
};
const updateActionComponentsToRemoveExtraFields = () => {
  getSetRepeatingItems({
    repeatingItems: ['repeating_attack', 'repeating_spell', 'repeating_trait', 'repeating_action', 'repeating_reaction', 'repeating_legendaryaction', 'repeating_lairaction', 'repeating_regionaleffect'],
    collectionArrayAddItems: ['roll_toggle', 'content_toggle', 'saving_throw_toggle', 'damage_toggle', 'second_damage_toggle', 'extras_toggle', 'heal_toggle', 'heal_query_toggle', 'higher_level_toggle', 'special_effects_toggle'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;
        changeOldRepeatingToggleToNew(v, finalSetAttrs, repeatingString, 'roll_toggle', 'roll_toggle_var', '{{vs_ac=1}} @{roll_info} {{roll1=[[@{shaped_d20}cs>@{crit_range} + @{attack_formula}]]}} @{roll_setting}cs>@{crit_range} + @{attack_formula}]]}} {{targetAC=@{attacks_vs_target_ac}}} {{targetName=@{attacks_vs_target_name}}}');
        changeOldRepeatingToggleToNew(v, finalSetAttrs, repeatingString, 'content_toggle', 'content_toggle_var', '{{content=@{content}}}');
        changeOldRepeatingToggleToNew(v, finalSetAttrs, repeatingString, 'saving_throw_toggle', 'saving_throw_toggle_var', '{{saving_throw_condition=@{saving_throw_condition}}} {{saving_throw_dc=@{saving_throw_dc}}} {{saving_throw_vs_ability=@{saving_throw_vs_ability}}} {{saving_throw_failure=@{saving_throw_failure}}} {{saving_throw_success=@{saving_throw_success}}} {{targetName=@{attacks_vs_target_name}}}');
        changeOldRepeatingToggleToNew(v, finalSetAttrs, repeatingString, 'damage_toggle', 'damage_toggle_var', '{{damage=[[@{damage_formula}]]}} {{damage_type=@{damage_type}}} {{crit_damage=[[0d0 + @{damage_crit}[crit damage] @{damage_crit_formula}]]}}');
        changeOldRepeatingToggleToNew(v, finalSetAttrs, repeatingString, 'second_damage_toggle', 'second_damage_toggle_var', '{{second_damage=[[@{second_damage_formula}]]}} {{second_damage_type=@{second_damage_type}}} {{second_crit_damage=[[0d0 + @{second_damage_crit}[crit damage] @{second_damage_crit_formula}]]}}');
        changeOldRepeatingToggleToNew(v, finalSetAttrs, repeatingString, 'extras_toggle', 'extras_var', '{{emote=@{emote}}} {{freetext=@{freetext}}} @{freeform}');
        changeOldRepeatingToggleToNew(v, finalSetAttrs, repeatingString, 'heal_toggle', 'heal_toggle_var', '{{heal=[[@{heal_formula}]]}}');
        changeOldRepeatingToggleToNew(v, finalSetAttrs, repeatingString, 'heal_query_toggle', 'heal_query', '?{Heal Bonus Amount|}');
        changeOldRepeatingToggleToNew(v, finalSetAttrs, repeatingString, 'higher_level_toggle', 'higher_level_toggle_var', '{{cast_as_level=@{higher_level_query}}}');
        changeOldRepeatingToggleToNew(v, finalSetAttrs, repeatingString, 'special_effects_toggle', 'special_effects_var', '{{fx=@{type}-@{color} @{points_of_origin}}}');
      }
    },
  });
};

const updateSkillAbility = () => {
  getSetRepeatingItems({
    repeatingItems: ['repeating_skill'],
    collectionArrayAddItems: ['ability'],
    callback: (v, finalSetAttrs, ids, repeatingItem) => {
      for (const id of ids) {
        const repeatingString = `${repeatingItem}_${id}_`;
        atSyntaxToAbilityName(v, finalSetAttrs, repeatingString, 'ability');
      }
    },
  });
};

const updateArmorAbility = () => {
  getSetItems({
    collectionArray: ['ac_unarmored_ability'],
    callback: (v, finalSetAttrs) => {
      if (!isUndefinedOrEmpty(v.ac_unarmored_ability)) {
        finalSetAttrs.ac_unarmored_ability = getAbilityName(v.ac_unarmored_ability);
      }
    },
  });
};

const updateDefaultAbility = () => {
  getSetItems({
    collectionArray: ['default_ability'],
    callback: (v, finalSetAttrs) => {
      if (!isUndefinedOrEmpty(v.default_ability)) {
        finalSetAttrs.default_ability = getAbilityName(v.default_ability);
      }
    },
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

const sheetOpened = () => {
  getSetItems({
    collectionArray: ['version', 'strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma', 'import_data', 'roll_setting'],
    callback: (v, finalSetAttrs) => {
      const version = checkVersionFormat(v.version, finalSetAttrs);

      if (!version) {
        if (!v.import_data) {
          finalSetAttrs.edit_mode = 'on';
        }
        if (isUndefinedOrEmpty(v.roll_setting)) { // API Script import sets this when making characters
          finalSetAttrs.roll_setting = '{{ignore=[[0';
        }
        const setAbilities = {};
        if (isUndefinedOrEmpty(v.strength)) {
          setAbilities.strength = 10;
        }
        if (isUndefinedOrEmpty(v.dexterity)) {
          setAbilities.dexterity = 10;
        }
        if (isUndefinedOrEmpty(v.constitution)) {
          setAbilities.constitution = 10;
        }
        if (isUndefinedOrEmpty(v.intelligence)) {
          setAbilities.intelligence = 10;
        }
        if (isUndefinedOrEmpty(v.wisdom)) {
          setAbilities.wisdom = 10;
        }
        if (isUndefinedOrEmpty(v.charisma)) {
          setAbilities.charisma = 10;
        }
        setFinalAttrs(v, setAbilities, () => {
          updatePb();
          generateSkills();
          updateSavingThrows();
          updateLevels();
          updateInitiative();
          updateArmor();
          updateSpellShowHide();
          updateAbilityModifiers();
        });
      } else {
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
          updateNPCAC();
        }
        if (versionCompare(version, '2.1.10') < 0) {
          updateSavingThrows();
        }
        if (versionCompare(version, '2.1.13') < 0) {
          weighEquipment();
        }
        if (versionCompare(version, '2.1.15') < 0) {
          displayTextForTraits();
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
        if (versionCompare(version, '2.3.3') < 0) {
          updateAttachers();
        }
        if (versionCompare(version, '2.4.2') < 0) {
          updateAbilityModifiers();
          updateActionChatMacro('trait');
          updateActionChatMacro('action');
          updateActionChatMacro('reaction');
          updateActionChatMacro('legendaryaction');
        }
        if (versionCompare(version, '2.4.3') < 0) {
          setClassFeatures();
        }
        if (versionCompare(version, '2.4.7') < 0) {
          classFeaturesToTraits();
          updateAction('trait');
        }
        if (versionCompare(version, '2.4.8') < 0) {
          fixRollTwo();
        }
        if (versionCompare(version, '2.4.12') < 0) {
          armorPlusDexRemoval();
          updateArmor();
        }
        if (versionCompare(version, '3.1.0') < 0) {
          updateAttackChatMacro();
        }
        if (versionCompare(version, '3.1.1') < 0) {
          updateActionChatMacro('lairaction');
          updateActionChatMacro('regionaleffect');
          updateAbilityChecksMacro();
        }
        if (versionCompare(version, '3.2.1') < 0) {
          updateCritDamage();
        }
        if (versionCompare(version, '3.2.3') < 0) {
          updateDamageResistancesVar();
        }
        if (versionCompare(version, '3.5.0') < 0) {
          updateSpellChatMacro();
        }
        if (versionCompare(version, '3.5.1') < 0) {
          updateSpellSlots();
        }
        if (versionCompare(version, '3.6.1') < 0) {
          updateNPCHD();
          switchToNPC();
        }
        if (versionCompare(version, '4.1.4') < 0) {
          updateArmorAbility();
          updateActionComponents();
          updateSkillAbility();
        }
        if (versionCompare(version, '4.1.5') < 0) {
          updateSkill();
        }
        if (versionCompare(version, '4.2.0') < 0) {
          updateD20Mod();
          updateShapedD20();
        }
        if (versionCompare(version, '4.2.1') < 0) {
          updateActionComponentsToRemoveExtraFields();
          updateAbilityChecksMacro();
          removeToggleVar();
        }
        if (versionCompare(version, '4.2.3') < 0) {
          updateArmor();
        }
        if (versionCompare(version, '4.4.0') < 0) {
          updateCustomSavingThrows();
          newAttackToggle();
          generateHigherLevelQueries();
        }
        if (versionCompare(version, '4.4.1') < 0) {
          newAbilityDefaults();
        }
        if (versionCompare(version, '4.4.2') < 0) {
          updateSpellShowHide();
        }
        if (versionCompare(version, '5.0.0') < 0) {
          updateSpellToTranslations();
        }
        if (versionCompare(version, '5.0.3') < 0) {
          updateSpell();
          updateAttack();
          updateActions();
          updateCustomSavingThrowToggle();
        }
        if (versionCompare(version, '5.0.4') < 0) {
          updateDefaultAbility();
        }
        if (versionCompare(version, '5.0.6') < 0) {
          updateSpellLevelForCantrips();
        }
        if (versionCompare(version, '5.0.8') < 0) {
          newAttackToggleTwo();
        }
      }

      if (isUndefinedOrEmpty(version) || !version || version !== currentVersion) {
        finalSetAttrs.version = currentVersion;
      }
    },
  });
};
on('sheet:opened', () => {
  sheetOpened();
});

const importData = () => {
  getSetItems({
    collectionArray: ['import_data', 'version'],
    callback: (v, finalSetAttrs) => {
      if (v.import_data) {
        const importObject = JSON.parse(v.import_data);

        if (importObject.npc) {
          if (!v.version) {
            sheetOpened();
          }
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
      }
    },
  });
};

const deleteImportData = () => {
  getSetItems({
    collectionArray: ['import_data', 'version'],
    callback: (v, finalSetAttrs) => {
      const importObject = JSON.parse(v.import_data);
      if (importObject.npc && !v.version) {
        sheetOpened(); // NPC import will have wiped all the existing attributes
      }
      finalSetAttrs.import_data = '';
      finalSetAttrs.import_data_present = 'off';
    },
  });
};
on('change:accept_import', importData);
on('change:reject_import', deleteImportData);
