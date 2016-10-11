/* global on:false */

import { ABILITIES, SKILLS } from './constants';
import { getSetItems, getSetRepeatingItems, getSkillIdByStorageName, getIntValue, getFloatValue, sumRepeating, isUndefinedOrEmpty, getRepeatingInfo, exists, round } from './utilities';

export class Equipment {
  setAdvantageOnStealth(mode) {
    getSetRepeatingItems('equipment.setAdvantageOnStealth', {
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
  }
  updateArmor(rowId) {
    let stealthPenalty;
    getSetRepeatingItems('equipment.updateArmor', {
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
          this.setAdvantageOnStealth('dis');
        } else {
          this.setAdvantageOnStealth('normal');
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
  }
  update(rowId) {
    getSetRepeatingItems('equipment.update', {
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
  }
  weigh() {
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
  }
  updateWeight() {
    getSetItems('equipment.updateWeight', {
      collectionArray: ['weight_attacks', 'weight_ammo', 'weight_armor', 'weight_equipment', 'weight_coinage'],
      callback: (v, finalSetAttrs) => {
        finalSetAttrs.weight_total = round((getFloatValue(v.weight_attacks) + getFloatValue(v.weight_ammo) + getFloatValue(v.weight_armor) + getFloatValue(v.weight_equipment) + getFloatValue(v.weight_coinage)), 2);
      },
    });
  }
  weighAmmo() {
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
  }
  calculateGold() {
    getSetItems('equipment.calculateGold', {
      collectionArray: ['cp', 'copper_per_gold', 'sp', 'silver_per_gold', 'ep', 'electrum_per_gold', 'gp', 'pp', 'platinum_per_gold', 'weight_per_coin'],
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
        const weightPerCoin = getFloatValue(v.weight_per_coin, 10);

        finalSetAttrs.total_gp = ((copperPieces / copperPerGold) + (silverPieces / silverPerGold) + (electrumPieces / electrumPerGold) + goldPieces + (platinumPieces * platinumPerGold)).toFixed(2);
        finalSetAttrs.weight_coinage = (copperPieces + silverPieces + electrumPieces + goldPieces + platinumPieces) * weightPerCoin;
      },
    });
  }
  updateCarryingCapacity() {
    getSetItems('equipment.updateCarryingCapacity', {
      collectionArray: ['strength_calculated', 'weight_multiplier', 'carrying_capacity', 'max_push_drag_lift', 'encumbered', 'heavily_encumbered', ''],
      callback: (v, finalSetAttrs) => {
        const strength = getIntValue(v.strength_calculated);
        const weightMultiplier = getFloatValue(v.weight_multiplier, 1);
        finalSetAttrs.carrying_capacity = strength * 15 * weightMultiplier;
        finalSetAttrs.max_push_drag_lift = strength * 30 * weightMultiplier;
        finalSetAttrs.encumbered = strength * 5 * weightMultiplier;
        finalSetAttrs.heavily_encumbered = strength * 10 * weightMultiplier;
      },
    });
  }

  setup() {
    on('change:repeating_armor', (eventInfo) => {
      const repeatingInfo = getRepeatingInfo('repeating_armor', eventInfo);
      if (repeatingInfo && repeatingInfo.field !== 'ac_total') {
        this.updateArmor(repeatingInfo.rowId);
      }
    });
    on('change:dexterity_mod change:medium_armor_max_dex change:ac_unarmored_ability remove:repeating_armor', () => {
      this.updateArmor();
    });
    on('change:repeating_equipment', (eventInfo) => {
      this.update(getRepeatingInfo('repeating_equipment', eventInfo).rowId);
    });
    on('change:repeating_equipment:carried change:repeating_equipment:qty change:repeating_equipment:weight remove:repeating_equipment', () => {
      this.weigh();
    });
    on('change:repeating_ammo:weight change:repeating_ammo:qty', () => {
      this.weighAmmo();
    });
    on('change:weight_attacks change:weight_ammo change:weight_armor change:weight_equipment change:weight_coinage', () => {
      this.updateWeight();
    });
    on('change:cp change:copper_per_gold change:sp change:silver_per_gold change:ep change:electrum_per_gold change:gp change:pp change:platinum_per_gold change:weight_per_coin', () => {
      this.calculateGold();
    });
    on('change:strength_calculated change:weight_multiplier', () => {
      this.updateCarryingCapacity();
    });
  }
}
