/* global setAttrs:false, getAttrs:false, getSectionIDs:false */

import { currentVersion } from './version';

const capitalize = (string) => {
  return string.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1);
  });
};
const camelize = (str) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
    if (+match === 0) return '';
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
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
const isEmpty = (obj) => {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
};
const exists = (value) => {
  if (isUndefinedOrEmpty(value) || value === '' || value === '0' || value === 0) {
    return false;
  }
  return true;
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
const getAbilityMod = (score) => {
  return Math.floor((getIntValue(score) - 10) / 2);
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
const setFinalAttrs = (v, finalSetAttrs, name, callback) => {
  if (!isEmpty(finalSetAttrs)) {
    for (const key in finalSetAttrs) {
      if (finalSetAttrs.hasOwnProperty(key)) {
        if (v[key] === finalSetAttrs[key]) {
          delete finalSetAttrs[key];
        }
      }
    }
    if (!isEmpty(finalSetAttrs)) {
      console.info(name, 'setFinalAttrs', finalSetAttrs);
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
const showSign = (value) => {
  if (value >= 0) {
    value = `+${value}`;
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
const getSetItems = (name, obj) => {
  const collectionArray = obj.collectionArray || [];
  const finalSetAttrs = {};

  getAttrs(collectionArray, (v) => {
    if (obj.callback) {
      obj.callback(v, finalSetAttrs);
    }
    setFinalAttrs(v, finalSetAttrs, name, () => {
      if (obj.setFinalAttrsCallback) {
        obj.setFinalAttrsCallback();
      }
    });
    if (obj.returnCallback) {
      obj.returnCallback();
    }
  });
};
const getSetRepeatingItems = (name, obj) => {
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
          setFinalAttrs(v, finalSetAttrs, name, () => {
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
const checkVersionFormat = (version, finalSetAttrs) => {
  const versionRegex = /\d+\.\d+\.\d+/gi;
  const versionIsProperFormat = versionRegex.exec(version);

  if (version && !versionIsProperFormat) {
    finalSetAttrs.version = version = currentVersion;
  }
  return version;
};
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
      setFinalAttrs(v, finalSetAttrs, 'sumRepeating');
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
const setCritDamage = (v, finalSetAttrs, repeatingString) => {
  if (!v[`${repeatingString}damage_crit`] && v[`${repeatingString}damage`]) {
    finalSetAttrs[`${repeatingString}damage_crit`] = v[`${repeatingString}damage`];
  }
  if (!v[`${repeatingString}second_damage_crit`] && v[`${repeatingString}second_damage`]) {
    finalSetAttrs[`${repeatingString}second_damage_crit`] = v[`${repeatingString}second_damage`];
  }
};

export { capitalize, camelize, firstThree, round, calculatePercentDifference, isUndefined, isUndefinedOrEmpty, isEmpty, exists, getIntValue, getFloatValue, getAbilityMod, getAbilityModName, getAbilityName, getAbilityValue, getAbilityShortName, getRepeatingInfo, setFinalAttrs, fromVOrFinalSetAttrs, hasUpperCase, ordinalSpellLevel, versionCompare, addArithmeticOperator, showSign, numberWithCommas, findClosest, getCorrectAbilityBasedOnBonus, getAnyCorrectAbilityBasedOnBonus, lowercaseDamageTypes, getSetItems, getSetRepeatingItems, checkVersionFormat, sumRepeating, getSkillIdByStorageName, setCritDamage };
