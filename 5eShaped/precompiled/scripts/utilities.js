/* global setAttrs:false, getAttrs:false, getSectionIDs:false, removeRepeatingRow:false */

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
const decimalAdjust = (type, value, exp) => {
  // If the exp is undefined or zero...
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  /* eslint-disable */
  // Shift
  value = value.toString().split('e');
  value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  /* eslint-enable */
};
const round = (value, exp) => {
  return decimalAdjust('round', value, exp);
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
const getAbilityName = (varName) => {
  if (!varName) {
    return 'strength';
  } else if (typeof varName === 'string') {
    varName = varName.replace(/\W/g, '').toLowerCase();
  }
  return varName;
};
const getAbilityValue = (v, varName) => {
  if (exists(varName)) {
    varName = getAbilityName(varName);
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
    const s = ['TH', 'ST', 'ND', 'RD'];
    const v = level % 100;
    spellLevel = `${level + (s[(v - 20) % 10] || s[v] || s[0])}_LEVEL`;
  }
  return spellLevel;
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
const emptyRepeatingSection = (obj) => {
  if (obj.repeatingItems) {
    for (const repeatingItem of obj.repeatingItems) {
      getSectionIDs(repeatingItem, (ids) => {
        for (const id of ids) {
          removeRepeatingRow(`${repeatingItem}_${id}`);
        }
      });
    }
  }
};
const getSetRepeatingItems = (name, obj) => {
  const collectionArray = obj.collectionArray || [];

  if (obj.repeatingItems) {
    getSetItems(`${name} processing`, {
      collectionArray: ['processing'],
      callback: (v, finalSetAttrs) => {
        if (!isUndefinedOrEmpty(v.processing)) {
          finalSetAttrs.processing = v.processing.split(', ');
        } else {
          finalSetAttrs.processing = [];
        }
        if (finalSetAttrs.processing.indexOf(name) === -1) {
          finalSetAttrs.processing.push(name);
        }
        finalSetAttrs.processing = finalSetAttrs.processing.join(', ');
      },
    });
    const finalSetAttrs = {};
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
        collectionArray.push('processing');
        getAttrs(collectionArray, (v) => {
          if (obj.callback) {
            obj.callback(v, finalSetAttrs, ids, repeatingItem);
          }
          if (!isUndefinedOrEmpty(v.processing)) {
            finalSetAttrs.processing = v.processing.split(', ');
          } else {
            finalSetAttrs.processing = [];
          }
          const index = finalSetAttrs.processing.indexOf(name);
          if (index >= 0) {
            finalSetAttrs.processing.splice(index, 1);
          }
          if (finalSetAttrs.processing.length > 0) {
            finalSetAttrs.processing = finalSetAttrs.processing.join(', ');
          } else {
            finalSetAttrs.processing = '';
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

          const itemTotal = round((qty * fieldToAdd), -2);

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
        if (finalSetAttrs[sumItem.totalField]) {
          finalSetAttrs[sumItem.totalField] = round(finalSetAttrs[sumItem.totalField], -2);
        }
        if (finalSetAttrs[sumItem.totalFieldSecondary]) {
          finalSetAttrs[sumItem.totalFieldSecondary] = round(finalSetAttrs[sumItem.totalFieldSecondary], -2);
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
  let returnId;
  for (const id of ids) {
    const repeatingString = `${repeatingItem}_${id}_`;
    if (v[`${repeatingString}storage_name`] === prop || v[`${repeatingString}storage_name`] === camelize(prop)) {
      returnId = id;
      break;
    }
  }
  return returnId;
};
const setCritDamage = (v, finalSetAttrs, repeatingString) => {
  if (!v[`${repeatingString}damage_crit`] && v[`${repeatingString}damage`]) {
    finalSetAttrs[`${repeatingString}damage_crit`] = v[`${repeatingString}damage`];
  }
  if (!v[`${repeatingString}second_damage_crit`] && v[`${repeatingString}second_damage`]) {
    finalSetAttrs[`${repeatingString}second_damage_crit`] = v[`${repeatingString}second_damage`];
  }
};
const updateHD = (v, finalSetAttrs, hd) => {
  for (const key in hd) {
    if (hd.hasOwnProperty(key)) {
      if (hd[key] && hd[key] !== 0) {
        finalSetAttrs[`hd_${key}`] = hd[key];
        finalSetAttrs[`hd_${key}_max`] = hd[key];
        finalSetAttrs[`hd_${key}_query`] = '?{HD';
        for (let x = 1; x <= hd[key]; x++) {
          finalSetAttrs[`hd_${key}_query`] += `|${x}`;
        }
        finalSetAttrs[`hd_${key}_query`] += '}';
        finalSetAttrs[`hd_${key}_toggle`] = 1;
      } else {
        if (!isUndefinedOrEmpty(v[`hd_${key}`])) {
          finalSetAttrs[`hd_${key}`] = 0;
        }
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

export { capitalize, camelize, firstThree, round, emptyRepeatingSection, isUndefined, isUndefinedOrEmpty, isEmpty, exists, getIntValue, getFloatValue, getAbilityMod, getAbilityName, getAbilityValue, getAbilityShortName, getRepeatingInfo, setFinalAttrs, fromVOrFinalSetAttrs, hasUpperCase, ordinalSpellLevel, addArithmeticOperator, showSign, numberWithCommas, lowercaseDamageTypes, getSetItems, getSetRepeatingItems, sumRepeating, getSkillIdByStorageName, setCritDamage, updateHD };
