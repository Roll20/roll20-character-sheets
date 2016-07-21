/* global generateRowID:falsee */
import { getSetRepeatingItems, isUndefinedOrEmpty } from './utilities';
import { TOGGLE_VARS } from './constants';

export class traits {
  calculatePercentDifference(oldValue, newValue) {
    return Math.abs(((oldValue - newValue) / oldValue) * 100);
  }
  set(obj) {
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

    getSetRepeatingItems('traits.set', {
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
              if ((prop === 'name' || prop === 'freetext') && (isUndefinedOrEmpty(v[`${repeatingString}${prop}`]) || this.calculatePercentDifference(v[`${repeatingString}${prop}`].length, obj[prop].length) < 10)) {
                finalSetAttrs[`${repeatingString}${prop}`] = obj[prop];
              } else if (v[`${repeatingString}${prop}`] !== obj[prop]) {
                finalSetAttrs[`${repeatingString}${prop}`] = obj[prop];
              }
            }
          }
          if (obj.type && isUndefinedOrEmpty(v[`${repeatingString}type`])) {
            finalSetAttrs[`${repeatingString}type`] = obj.type;
          }
          if (obj.saving_throw_ability || obj.saving_throw_bonus || obj.saving_throw_vs_ability) {
            finalSetAttrs[`${repeatingString}saving_throw_toggle`] = TOGGLE_VARS.saving_throw;
          }
          if (obj.damage || obj.damage_ability || obj.damage_bonus) {
            finalSetAttrs[`${repeatingString}damage_toggle`] = TOGGLE_VARS.damage;
          }
          if (obj.heal || obj.heal_ability || obj.heal_bonus || obj.heal_query_toggle) {
            finalSetAttrs[`${repeatingString}heal_toggle`] = TOGGLE_VARS.heal;
          }
          if (obj.freetext && isUndefinedOrEmpty(v[`${repeatingString}extras_toggle`])) {
            finalSetAttrs[`${repeatingString}extras_toggle`] = TOGGLE_VARS.extras;
          }
          if (obj.uses_max && !obj.uses && isUndefinedOrEmpty(v[`${repeatingString}uses`])) {
            finalSetAttrs[`${repeatingString}uses`] = obj.uses_max;
          }
          if (obj.freetext && repeatingItem === 'repeating_trait' && (isUndefinedOrEmpty(v[`${repeatingString}display_text`]) ||
            this.calculatePercentDifference(v[`${repeatingString}display_text`].length, obj.freetext.length) < 10)) {
            finalSetAttrs[`${repeatingString}display_text`] = obj.freetext;
          }
          finalSetAttrs[`${repeatingString}toggle_details`] = 0;
        }
      },
      returnCallback: () => {
        return itemId;
      },
    });
  }
}
