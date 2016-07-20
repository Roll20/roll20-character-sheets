import { getSetItems, getSetRepeatingItems, getSkillIdByStorageName, getFloatValue } from './utilities';
import { SKILLS } from './constants';

const setAdvantageOnStealth = (mode) => {
  getSetRepeatingItems('setAdvantageOnStealth', {
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

  getSetRepeatingItems('updateArmor', {
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
const updateEquipment = (rowId) => {
  getSetRepeatingItems('updateEquipment', {
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
const updateWeight = () => {
  getSetItems('updateWeight', {
    collectionArray: ['weight_attacks', 'weight_ammo', 'weight_armor', 'weight_equipment', 'weight_coinage'],
    callback: (v, finalSetAttrs) => {
      finalSetAttrs.weight_total = round((getFloatValue(v.weight_attacks) + getFloatValue(v.weight_ammo) + getFloatValue(v.weight_armor) + getFloatValue(v.weight_equipment) + getFloatValue(v.weight_coinage)), 2);
    },
  });
};

export { setAdvantageOnStealth, updateArmor, updateEquipment, weighEquipment, weighAmmo, updateWeight };
