/* global on:false, generateRowID:false */

import { ABILITIES, TOGGLE_VARS } from './constants';
import { updateAttackToggle, updateSavingThrowToggle, updateDamageToggle, updateHealToggle, updateHigherLevelToggle } from './updateToggles';
import { getSetItems, getSetRepeatingItems, getIntValue, isUndefined, isUndefinedOrEmpty, setCritDamage, fromVOrFinalSetAttrs, lowercaseDamageTypes, getRepeatingInfo } from './utilities';
const levelToPsiCost = {
  1: 2,
  2: 3,
  3: 5,
  4: 6,
  5: 7,
  6: 9,
  7: 10,
  8: 11,
  9: 13,
};

export class Psionics {
  updateDefaultAbility() {
    getSetRepeatingItems('psionics.update', {
      repeatingItems: ['repeating_psionics'],
      collectionArray: ['default_ability'],
      collectionArrayAddItems: ['attack_ability', 'damage_ability', 'second_damage_ability', 'saving_throw_ability', 'heal_ability'],
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        for (const id of ids) {
          const repeatingString = `${repeatingItem}_${id}_`;

          finalSetAttrs[`${repeatingString}attack_ability`] = v.default_ability;
          if (v[`${repeatingString}damage_ability`]) {
            finalSetAttrs[`${repeatingString}damage_ability`] = v.default_ability;
          }
          if (v[`${repeatingString}second_damage_ability`]) {
            finalSetAttrs[`${repeatingString}second_damage_ability`] = v.default_ability;
          }
          finalSetAttrs[`${repeatingString}saving_throw_ability`] = v.default_ability;
          if (v[`${repeatingString}heal_ability`]) {
            finalSetAttrs[`${repeatingString}heal_ability`] = v.default_ability;
          }
        }
      },
    });
  }
  update(rowId) {
    const collectionArray = ['is_npc', 'pb', 'finesse_mod', 'global_psionics_attack_bonus', 'global_psionics_damage_bonus', 'global_psionics_dc_bonus', 'global_psionics_heal_bonus', 'default_ability', 'caster_level', 'base_dc'];
    for (const ability of ABILITIES) {
      collectionArray.push(`${ability}_mod`);
    }
    getSetRepeatingItems('psionics.update', {
      repeatingItems: ['repeating_psionics'],
      collectionArray,
      collectionArrayAddItems: ['name', 'discipline', 'power_level', 'manifesting_time', 'display', 'concentration', 'duration', 'type', 'roll_toggle', 'to_hit', 'attack_formula', 'proficiency', 'attack_ability', 'attack_bonus', 'saving_throw_toggle', 'saving_throw_ability', 'saving_throw_vs_ability', 'saving_throw_bonus', 'saving_throw_dc', 'damage_toggle', 'damage_formula', 'damage', 'damage_ability', 'damage_bonus', 'damage_type', 'damage_crit', 'second_damage_toggle', 'second_damage_formula', 'second_damage', 'second_damage_ability', 'second_damage_bonus', 'second_damage_type', 'second_damage_crit', 'damage_string', 'parsed', 'heal_toggle', 'heal', 'heal_ability', 'heal_bonus', 'heal_query_toggle', 'higher_level_toggle', 'higher_level_dice', 'higher_level_die', 'second_higher_level_dice', 'second_higher_level_die', 'higher_level_heal', 'meditate', 'meditate_output', 'materials', 'materials_show', 'extras_toggle', 'emote', 'freetext', 'freeform'],
      rowId,
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        for (const id of ids) {
          const repeatingString = `${repeatingItem}_${id}_`;

          if (isUndefinedOrEmpty(v[`${repeatingString}power_level`]) || v[`${repeatingString}power_level`] === 'TALENT') {
            finalSetAttrs[`${repeatingString}manifest_as_level`] = '';
          } else {
            const psionicLevel = getIntValue(v[`${repeatingString}power_level`]);
            finalSetAttrs[`${repeatingString}manifest_as_level`] = `@{manifest_as_level_${psionicLevel}}`;
          }

          if (!isUndefined(fromVOrFinalSetAttrs(v, finalSetAttrs, `${repeatingString}duration`)) && fromVOrFinalSetAttrs(v, finalSetAttrs, `${repeatingString}duration`).indexOf('CONCENTRATION') !== -1) {
            finalSetAttrs[`${repeatingString}concentration`] = 'Yes';
          } else {
            finalSetAttrs[`${repeatingString}concentration`] = '';
          }
          if (v[`${repeatingString}meditate`] === 'Yes') {
            finalSetAttrs[`${repeatingString}meditate_output`] = '?{Cast as|Meditate,{{meditate=1&#125;&#125;|Psionic,}';
          } else {
            finalSetAttrs[`${repeatingString}meditate_output`] = '';
          }
          if (!isUndefinedOrEmpty(v[`${repeatingString}materials`])) {
            finalSetAttrs[`${repeatingString}materials_show`] = 1;
          } else if (!isUndefinedOrEmpty(v[`${repeatingString}materials_show`])) {
            finalSetAttrs[`${repeatingString}materials_show`] = 0;
          }

          const attackOptions = {
            attackAbility: true,
            globalAttackBonus: v.global_psionics_attack_bonus,
            globalAttackBonusLabel: 'global psionics attack bonus',
            type: 'psionic',
          };
          updateAttackToggle(v, finalSetAttrs, repeatingString, attackOptions);

          const savingThrowOptions = {
            bonusDC: v.global_psionics_dc_bonus,
          };
          updateSavingThrowToggle(v, finalSetAttrs, repeatingString, savingThrowOptions);

          const damageOptions = {
            globalDamageBonus: v.global_psionics_damage_bonus,
            globalDamageBonusLabel: 'global psionics damage bonus',
            type: 'psionic',
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
            finalSetAttrs[`${repeatingString}extras_toggle`] = TOGGLE_VARS.extras;
          }
        }
      },
    });
  }
  updateChatMacro() {
    const psionicLevels = {
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
    const collectionArray = [];

    for (let i = 0; i <= 9; i++) {
      collectionArray.push(`psionics_level_${0}_macro_var`);
    }
    getSetRepeatingItems('psionics.updateChatMacro', {
      repeatingItems: ['repeating_psionics'],
      collectionArray,
      collectionArrayAddItems: ['name', 'power_level', 'is_prepared'],
      callback: (v, finalSetAttrs, ids, repeatingItem) => {
        for (const id of ids) {
          const repeatingString = `${repeatingItem}_${id}_`;
          const psionicName = v[`${repeatingString}name`];
          const psionicLevel = getIntValue(v[`${repeatingString}power_level`], 0);

          if (psionicName) {
            psionicLevels[psionicLevel].push(`[${psionicName}](~repeating_psionics_${id}_power)`);
          }
        }

        for (let i = 0; i <= 9; i++) {
          if (psionicLevels[i].length > 0) {
            finalSetAttrs[`psionics_level_${i}_macro_var`] = psionicLevels[i].join(', ');
          } else {
            finalSetAttrs[`psionics_level_${i}_macro_var`] = '';
          }
        }
      },
    });
  }
  generateHigherLevelQueries() {
    const collectionArray = ['psi_limit'];
    getSetItems('spells.generateHigherLevelQueries', {
      collectionArray,
      callback: (v, finalSetAttrs) => {
        const psiLimit = getIntValue(v.psi_limit);
        for (let i = 1; i <= 8; i++) {
          const spellLevels = [];

          for (let j = levelToPsiCost[i]; j <= psiLimit; j++) {
            spellLevels.push(j);
          }

          let higherLevelQuery;

          if (spellLevels.length > 1) {
            higherLevelQuery = `?{Psi Points|${spellLevels.join('|')}}`;
          } else if (spellLevels.length === 1) {
            higherLevelQuery = spellLevels[0];
          } else {
            higherLevelQuery = i;
          }
          finalSetAttrs[`psionic_higher_level_query_${i}`] = higherLevelQuery;
          finalSetAttrs[`manifest_as_level_${i}`] = higherLevelQuery;
        }
      },
    });
  }
  setup() {
    on('change:repeating_psionics', (eventInfo) => {
      const repeatingInfo = getRepeatingInfo('repeating_psionics', eventInfo);
      if (repeatingInfo && repeatingInfo.field !== 'roll_toggle' && repeatingInfo.field !== 'toggle_details' && repeatingInfo.field !== 'to_hit' && repeatingInfo.field !== 'attack_formula' && repeatingInfo.field !== 'damage_formula' && repeatingInfo.field !== 'damage_crit' && repeatingInfo.field !== 'second_damage_formula' && repeatingInfo.field !== 'second_damage_crit' && repeatingInfo.field !== 'damage_string' && repeatingInfo.field !== 'saving_throw_dc' && repeatingInfo.field !== 'heal_formula' && repeatingInfo.field !== 'psionic_higher_level_query' && repeatingInfo.field !== 'manifest_as_level' && repeatingInfo.field !== 'parsed') {
        this.update(repeatingInfo.rowId);
      }
    });
    on('change:default_ability', () => {
      this.updateDefaultAbility();
    });
    on('change:pb change:global_psionics_attack_bonus change:global_psionics_damage_bonus change:global_psionics_dc_bonus change:global_psionics_heal_bonus', () => {
      this.update();
    });
    on('change:repeating_psionics', (eventInfo) => {
      const repeatingInfo = getRepeatingInfo('repeating_psionics', eventInfo);
      if (repeatingInfo && (repeatingInfo.field === 'name' || repeatingInfo.field === 'power_level')) {
        this.updateChatMacro();
      }
    });
    on('remove:repeating_psionics', () => {
      this.updateChatMacro();
    });
    on('change:psi_limit', () => {
      this.generateHigherLevelQueries();
    });
  }
}
